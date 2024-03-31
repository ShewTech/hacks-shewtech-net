/* eslint-disable */
// @ts-nocheck

var GDAPI = (() => {
  var $o = Object.create,
    Gt = Object.defineProperty,
    Ho = Object.getPrototypeOf,
    Go = Object.prototype.hasOwnProperty,
    Xo = Object.getOwnPropertyNames,
    Vo = Object.getOwnPropertyDescriptor;
  var Yo = (e) => Gt(e, '__esModule', { value: !0 });
  var _ = (e, r) => () => (
      r || ((r = { exports: {} }), e(r.exports, r)), r.exports
    ),
    on = (e, r) => {
      for (var t in r) Gt(e, t, { get: r[t], enumerable: !0 });
    },
    Jo = (e, r, t) => {
      if ((r && typeof r == 'object') || typeof r == 'function')
        for (let i of Xo(r))
          !Go.call(e, i) &&
            i !== 'default' &&
            Gt(e, i, {
              get: () => r[i],
              enumerable: !(t = Vo(r, i)) || t.enumerable,
            });
      return e;
    },
    fn = (e) =>
      Jo(
        Yo(
          Gt(
            e != null ? $o(Ho(e)) : {},
            'default',
            e && e.__esModule && 'default' in e
              ? { get: () => e.default, enumerable: !0 }
              : { value: e, enumerable: !0 }
          )
        ),
        e
      );
  var ve = (e, r, t) =>
    new Promise((i, n) => {
      var a = (u) => {
          try {
            o(t.next(u));
          } catch (f) {
            n(f);
          }
        },
        s = (u) => {
          try {
            o(t.throw(u));
          } catch (f) {
            n(f);
          }
        },
        o = (u) => (u.done ? i(u.value) : Promise.resolve(u.value).then(a, s));
      o((t = t.apply(e, r)).next());
    });
  var un = _((Cc, ln) => {
    ln.exports = W;
    function W(e) {
      if (e) return Ko(e);
    }
    function Ko(e) {
      for (var r in W.prototype) e[r] = W.prototype[r];
      return e;
    }
    W.prototype.on = W.prototype.addEventListener = function (e, r) {
      return (
        (this._callbacks = this._callbacks || {}),
        (this._callbacks[e] = this._callbacks[e] || []).push(r),
        this
      );
    };
    W.prototype.once = function (e, r) {
      var t = this;
      this._callbacks = this._callbacks || {};
      function i() {
        t.off(e, i), r.apply(this, arguments);
      }
      return (i.fn = r), this.on(e, i), this;
    };
    W.prototype.off =
      W.prototype.removeListener =
      W.prototype.removeAllListeners =
      W.prototype.removeEventListener =
        function (e, r) {
          if (
            ((this._callbacks = this._callbacks || {}), arguments.length == 0)
          )
            return (this._callbacks = {}), this;
          var t = this._callbacks[e];
          if (!t) return this;
          if (arguments.length == 1) return delete this._callbacks[e], this;
          for (var i, n = 0; n < t.length; n++)
            if (((i = t[n]), i === r || i.fn === r)) {
              t.splice(n, 1);
              break;
            }
          return this;
        };
    W.prototype.emit = function (e) {
      this._callbacks = this._callbacks || {};
      var r = [].slice.call(arguments, 1),
        t = this._callbacks[e];
      if (t) {
        t = t.slice(0);
        for (var i = 0, n = t.length; i < n; ++i) t[i].apply(this, r);
      }
      return this;
    };
    W.prototype.listeners = function (e) {
      return (
        (this._callbacks = this._callbacks || {}), this._callbacks[e] || []
      );
    };
    W.prototype.hasListeners = function (e) {
      return !!this.listeners(e).length;
    };
  });
  var hn = _((Tc, cn) => {
    var dn = un();
    function vt() {
      dn.call(this);
    }
    vt.prototype = new dn();
    cn.exports = vt;
    vt.Stream = vt;
    vt.prototype.pipe = function (e, r) {
      var t = this;
      function i(l) {
        e.writable && e.write(l) === !1 && t.pause && t.pause();
      }
      t.on('data', i);
      function n() {
        t.readable && t.resume && t.resume();
      }
      e.on('drain', n),
        !e._isStdio &&
          (!r || r.end !== !1) &&
          (t.on('end', s), t.on('close', o));
      var a = !1;
      function s() {
        a || ((a = !0), e.end());
      }
      function o() {
        a || ((a = !0), typeof e.destroy == 'function' && e.destroy());
      }
      function u(l) {
        if ((f(), !this.hasListeners('error'))) throw l;
      }
      t.on('error', u), e.on('error', u);
      function f() {
        t.off('data', i),
          e.off('drain', n),
          t.off('end', s),
          t.off('close', o),
          t.off('error', u),
          e.off('error', u),
          t.off('end', f),
          t.off('close', f),
          e.off('end', f),
          e.off('close', f);
      }
      return (
        t.on('end', f),
        t.on('close', f),
        e.on('end', f),
        e.on('close', f),
        e.emit('pipe', t),
        e
      );
    };
  });
  var Dr = _((Dc, pn) => {
    pn.exports = hn();
  });
  var ue = _(($) => {
    'use strict';
    $.base64 = !0;
    $.array = !0;
    $.string = !0;
    $.arraybuffer =
      typeof ArrayBuffer != 'undefined' && typeof Uint8Array != 'undefined';
    $.nodebuffer = typeof Buffer != 'undefined';
    $.uint8array = typeof Uint8Array != 'undefined';
    if (typeof ArrayBuffer == 'undefined') $.blob = !1;
    else {
      Ir = new ArrayBuffer(0);
      try {
        $.blob = new Blob([Ir], { type: 'application/zip' }).size === 0;
      } catch (e) {
        try {
          (_n =
            self.BlobBuilder ||
            self.WebKitBlobBuilder ||
            self.MozBlobBuilder ||
            self.MSBlobBuilder),
            (Fr = new _n()),
            Fr.append(Ir),
            ($.blob = Fr.getBlob('application/zip').size === 0);
        } catch (r) {
          $.blob = !1;
        }
      }
    }
    var Ir, _n, Fr;
    try {
      $.nodestream = !!Dr().Readable;
    } catch (e) {
      $.nodestream = !1;
    }
  });
  var Nr = _((zr) => {
    'use strict';
    var Qo = F(),
      ef = ue(),
      ie = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    zr.encode = function (e) {
      for (
        var r = [],
          t,
          i,
          n,
          a,
          s,
          o,
          u,
          f = 0,
          l = e.length,
          p = l,
          c = Qo.getTypeOf(e) !== 'string';
        f < e.length;

      )
        (p = l - f),
          c
            ? ((t = e[f++]), (i = f < l ? e[f++] : 0), (n = f < l ? e[f++] : 0))
            : ((t = e.charCodeAt(f++)),
              (i = f < l ? e.charCodeAt(f++) : 0),
              (n = f < l ? e.charCodeAt(f++) : 0)),
          (a = t >> 2),
          (s = ((t & 3) << 4) | (i >> 4)),
          (o = p > 1 ? ((i & 15) << 2) | (n >> 6) : 64),
          (u = p > 2 ? n & 63 : 64),
          r.push(ie.charAt(a) + ie.charAt(s) + ie.charAt(o) + ie.charAt(u));
      return r.join('');
    };
    zr.decode = function (e) {
      var r,
        t,
        i,
        n,
        a,
        s,
        o,
        u = 0,
        f = 0,
        l = 'data:';
      if (e.substr(0, l.length) === l)
        throw new Error('Invalid base64 input, it looks like a data url.');
      e = e.replace(/[^A-Za-z0-9\+\/\=]/g, '');
      var p = (e.length * 3) / 4;
      if (
        (e.charAt(e.length - 1) === ie.charAt(64) && p--,
        e.charAt(e.length - 2) === ie.charAt(64) && p--,
        p % 1 != 0)
      )
        throw new Error('Invalid base64 input, bad content length.');
      var c;
      for (
        ef.uint8array ? (c = new Uint8Array(p | 0)) : (c = new Array(p | 0));
        u < e.length;

      )
        (n = ie.indexOf(e.charAt(u++))),
          (a = ie.indexOf(e.charAt(u++))),
          (s = ie.indexOf(e.charAt(u++))),
          (o = ie.indexOf(e.charAt(u++))),
          (r = (n << 2) | (a >> 4)),
          (t = ((a & 15) << 4) | (s >> 2)),
          (i = ((s & 3) << 6) | o),
          (c[f++] = r),
          s !== 64 && (c[f++] = t),
          o !== 64 && (c[f++] = i);
      return c;
    };
  });
  var gt = _((zc, vn) => {
    'use strict';
    vn.exports = {
      isNode: typeof Buffer != 'undefined',
      newBufferFrom: function (e, r) {
        if (Buffer.from && Buffer.from !== Uint8Array.from)
          return Buffer.from(e, r);
        if (typeof e == 'number')
          throw new Error('The "data" argument must not be a number');
        return new Buffer(e, r);
      },
      allocBuffer: function (e) {
        if (Buffer.alloc) return Buffer.alloc(e);
        var r = new Buffer(e);
        return r.fill(0), r;
      },
      isBuffer: function (e) {
        return Buffer.isBuffer(e);
      },
      isStream: function (e) {
        return (
          e &&
          typeof e.on == 'function' &&
          typeof e.pause == 'function' &&
          typeof e.resume == 'function'
        );
      },
    };
  });
  var mn = _((Nc, gn) => {
    'use strict';
    gn.exports =
      typeof setImmediate == 'function'
        ? setImmediate
        : function () {
            var r = [].slice.apply(arguments);
            r.splice(1, 0, 0), setTimeout.apply(null, r);
          };
  });
  var yn = _((Pc, bn) => {
    'use strict';
    var xn = global.MutationObserver || global.WebKitMutationObserver,
      mt;
    xn
      ? ((Pr = 0),
        (En = new xn(Xt)),
        (Br = global.document.createTextNode('')),
        En.observe(Br, { characterData: !0 }),
        (mt = function () {
          Br.data = Pr = ++Pr % 2;
        }))
      : !global.setImmediate && typeof global.MessageChannel != 'undefined'
        ? ((Lr = new global.MessageChannel()),
          (Lr.port1.onmessage = Xt),
          (mt = function () {
            Lr.port2.postMessage(0);
          }))
        : 'document' in global &&
            'onreadystatechange' in global.document.createElement('script')
          ? (mt = function () {
              var e = global.document.createElement('script');
              (e.onreadystatechange = function () {
                Xt(),
                  (e.onreadystatechange = null),
                  e.parentNode.removeChild(e),
                  (e = null);
              }),
                global.document.documentElement.appendChild(e);
            })
          : (mt = function () {
              setTimeout(Xt, 0);
            });
    var Pr,
      En,
      Br,
      Lr,
      Ur,
      bt = [];
    function Xt() {
      Ur = !0;
      for (var e, r, t = bt.length; t; ) {
        for (r = bt, bt = [], e = -1; ++e < t; ) r[e]();
        t = bt.length;
      }
      Ur = !1;
    }
    bn.exports = tf;
    function tf(e) {
      bt.push(e) === 1 && !Ur && mt();
    }
  });
  var Rn = _((Bc, wn) => {
    'use strict';
    var rf = yn();
    function Ge() {}
    var L = {},
      Sn = ['REJECTED'],
      Mr = ['FULFILLED'],
      kn = ['PENDING'];
    wn.exports = me;
    function me(e) {
      if (typeof e != 'function')
        throw new TypeError('resolver must be a function');
      (this.state = kn),
        (this.queue = []),
        (this.outcome = void 0),
        e !== Ge && jn(this, e);
    }
    me.prototype.finally = function (e) {
      if (typeof e != 'function') return this;
      var r = this.constructor;
      return this.then(t, i);
      function t(n) {
        function a() {
          return n;
        }
        return r.resolve(e()).then(a);
      }
      function i(n) {
        function a() {
          throw n;
        }
        return r.resolve(e()).then(a);
      }
    };
    me.prototype.catch = function (e) {
      return this.then(null, e);
    };
    me.prototype.then = function (e, r) {
      if (
        (typeof e != 'function' && this.state === Mr) ||
        (typeof r != 'function' && this.state === Sn)
      )
        return this;
      var t = new this.constructor(Ge);
      if (this.state !== kn) {
        var i = this.state === Mr ? e : r;
        Zr(t, i, this.outcome);
      } else this.queue.push(new xt(t, e, r));
      return t;
    };
    function xt(e, r, t) {
      (this.promise = e),
        typeof r == 'function' &&
          ((this.onFulfilled = r),
          (this.callFulfilled = this.otherCallFulfilled)),
        typeof t == 'function' &&
          ((this.onRejected = t), (this.callRejected = this.otherCallRejected));
    }
    xt.prototype.callFulfilled = function (e) {
      L.resolve(this.promise, e);
    };
    xt.prototype.otherCallFulfilled = function (e) {
      Zr(this.promise, this.onFulfilled, e);
    };
    xt.prototype.callRejected = function (e) {
      L.reject(this.promise, e);
    };
    xt.prototype.otherCallRejected = function (e) {
      Zr(this.promise, this.onRejected, e);
    };
    function Zr(e, r, t) {
      rf(function () {
        var i;
        try {
          i = r(t);
        } catch (n) {
          return L.reject(e, n);
        }
        i === e
          ? L.reject(e, new TypeError('Cannot resolve promise with itself'))
          : L.resolve(e, i);
      });
    }
    L.resolve = function (e, r) {
      var t = On(nf, r);
      if (t.status === 'error') return L.reject(e, t.value);
      var i = t.value;
      if (i) jn(e, i);
      else {
        (e.state = Mr), (e.outcome = r);
        for (var n = -1, a = e.queue.length; ++n < a; )
          e.queue[n].callFulfilled(r);
      }
      return e;
    };
    L.reject = function (e, r) {
      (e.state = Sn), (e.outcome = r);
      for (var t = -1, i = e.queue.length; ++t < i; )
        e.queue[t].callRejected(r);
      return e;
    };
    function nf(e) {
      var r = e && e.then;
      if (
        e &&
        (typeof e == 'object' || typeof e == 'function') &&
        typeof r == 'function'
      )
        return function () {
          r.apply(e, arguments);
        };
    }
    function jn(e, r) {
      var t = !1;
      function i(o) {
        t || ((t = !0), L.reject(e, o));
      }
      function n(o) {
        t || ((t = !0), L.resolve(e, o));
      }
      function a() {
        r(n, i);
      }
      var s = On(a);
      s.status === 'error' && i(s.value);
    }
    function On(e, r) {
      var t = {};
      try {
        (t.value = e(r)), (t.status = 'success');
      } catch (i) {
        (t.status = 'error'), (t.value = i);
      }
      return t;
    }
    me.resolve = af;
    function af(e) {
      return e instanceof this ? e : L.resolve(new this(Ge), e);
    }
    me.reject = sf;
    function sf(e) {
      var r = new this(Ge);
      return L.reject(r, e);
    }
    me.all = of;
    function of(e) {
      var r = this;
      if (Object.prototype.toString.call(e) !== '[object Array]')
        return this.reject(new TypeError('must be an array'));
      var t = e.length,
        i = !1;
      if (!t) return this.resolve([]);
      for (var n = new Array(t), a = 0, s = -1, o = new this(Ge); ++s < t; )
        u(e[s], s);
      return o;
      function u(f, l) {
        r.resolve(f).then(p, function (c) {
          i || ((i = !0), L.reject(o, c));
        });
        function p(c) {
          (n[l] = c), ++a === t && !i && ((i = !0), L.resolve(o, n));
        }
      }
    }
    me.race = ff;
    function ff(e) {
      var r = this;
      if (Object.prototype.toString.call(e) !== '[object Array]')
        return this.reject(new TypeError('must be an array'));
      var t = e.length,
        i = !1;
      if (!t) return this.resolve([]);
      for (var n = -1, a = new this(Ge); ++n < t; ) s(e[n]);
      return a;
      function s(o) {
        r.resolve(o).then(
          function (u) {
            i || ((i = !0), L.resolve(a, u));
          },
          function (u) {
            i || ((i = !0), L.reject(a, u));
          }
        );
      }
    }
  });
  var Xe = _((Lc, An) => {
    'use strict';
    var qr = null;
    typeof Promise != 'undefined' ? (qr = Promise) : (qr = Rn());
    An.exports = { Promise: qr };
  });
  var F = _((N) => {
    'use strict';
    var be = ue(),
      lf = Nr(),
      Ve = gt(),
      uf = mn(),
      Wr = Xe();
    function cf(e) {
      var r = null;
      return (
        be.uint8array
          ? (r = new Uint8Array(e.length))
          : (r = new Array(e.length)),
        Vt(e, r)
      );
    }
    N.newBlob = function (e, r) {
      N.checkSupport('blob');
      try {
        return new Blob([e], { type: r });
      } catch (n) {
        try {
          var t =
              self.BlobBuilder ||
              self.WebKitBlobBuilder ||
              self.MozBlobBuilder ||
              self.MSBlobBuilder,
            i = new t();
          return i.append(e), i.getBlob(r);
        } catch (a) {
          throw new Error("Bug : can't construct the Blob.");
        }
      }
    };
    function Et(e) {
      return e;
    }
    function Vt(e, r) {
      for (var t = 0; t < e.length; ++t) r[t] = e.charCodeAt(t) & 255;
      return r;
    }
    var Yt = {
      stringifyByChunk: function (e, r, t) {
        var i = [],
          n = 0,
          a = e.length;
        if (a <= t) return String.fromCharCode.apply(null, e);
        for (; n < a; )
          r === 'array' || r === 'nodebuffer'
            ? i.push(
                String.fromCharCode.apply(null, e.slice(n, Math.min(n + t, a)))
              )
            : i.push(
                String.fromCharCode.apply(
                  null,
                  e.subarray(n, Math.min(n + t, a))
                )
              ),
            (n += t);
        return i.join('');
      },
      stringifyByChar: function (e) {
        for (var r = '', t = 0; t < e.length; t++)
          r += String.fromCharCode(e[t]);
        return r;
      },
      applyCanBeUsed: {
        uint8array: (function () {
          try {
            return (
              be.uint8array &&
              String.fromCharCode.apply(null, new Uint8Array(1)).length === 1
            );
          } catch (e) {
            return !1;
          }
        })(),
        nodebuffer: (function () {
          try {
            return (
              be.nodebuffer &&
              String.fromCharCode.apply(null, Ve.allocBuffer(1)).length === 1
            );
          } catch (e) {
            return !1;
          }
        })(),
      },
    };
    function yt(e) {
      var r = 65536,
        t = N.getTypeOf(e),
        i = !0;
      if (
        (t === 'uint8array'
          ? (i = Yt.applyCanBeUsed.uint8array)
          : t === 'nodebuffer' && (i = Yt.applyCanBeUsed.nodebuffer),
        i)
      )
        for (; r > 1; )
          try {
            return Yt.stringifyByChunk(e, t, r);
          } catch (n) {
            r = Math.floor(r / 2);
          }
      return Yt.stringifyByChar(e);
    }
    N.applyFromCharCode = yt;
    function Jt(e, r) {
      for (var t = 0; t < e.length; t++) r[t] = e[t];
      return r;
    }
    var xe = {};
    xe.string = {
      string: Et,
      array: function (e) {
        return Vt(e, new Array(e.length));
      },
      arraybuffer: function (e) {
        return xe.string.uint8array(e).buffer;
      },
      uint8array: function (e) {
        return Vt(e, new Uint8Array(e.length));
      },
      nodebuffer: function (e) {
        return Vt(e, Ve.allocBuffer(e.length));
      },
    };
    xe.array = {
      string: yt,
      array: Et,
      arraybuffer: function (e) {
        return new Uint8Array(e).buffer;
      },
      uint8array: function (e) {
        return new Uint8Array(e);
      },
      nodebuffer: function (e) {
        return Ve.newBufferFrom(e);
      },
    };
    xe.arraybuffer = {
      string: function (e) {
        return yt(new Uint8Array(e));
      },
      array: function (e) {
        return Jt(new Uint8Array(e), new Array(e.byteLength));
      },
      arraybuffer: Et,
      uint8array: function (e) {
        return new Uint8Array(e);
      },
      nodebuffer: function (e) {
        return Ve.newBufferFrom(new Uint8Array(e));
      },
    };
    xe.uint8array = {
      string: yt,
      array: function (e) {
        return Jt(e, new Array(e.length));
      },
      arraybuffer: function (e) {
        return e.buffer;
      },
      uint8array: Et,
      nodebuffer: function (e) {
        return Ve.newBufferFrom(e);
      },
    };
    xe.nodebuffer = {
      string: yt,
      array: function (e) {
        return Jt(e, new Array(e.length));
      },
      arraybuffer: function (e) {
        return xe.nodebuffer.uint8array(e).buffer;
      },
      uint8array: function (e) {
        return Jt(e, new Uint8Array(e.length));
      },
      nodebuffer: Et,
    };
    N.transformTo = function (e, r) {
      if ((r || (r = ''), !e)) return r;
      N.checkSupport(e);
      var t = N.getTypeOf(r),
        i = xe[t][e](r);
      return i;
    };
    N.getTypeOf = function (e) {
      if (typeof e == 'string') return 'string';
      if (Object.prototype.toString.call(e) === '[object Array]')
        return 'array';
      if (be.nodebuffer && Ve.isBuffer(e)) return 'nodebuffer';
      if (be.uint8array && e instanceof Uint8Array) return 'uint8array';
      if (be.arraybuffer && e instanceof ArrayBuffer) return 'arraybuffer';
    };
    N.checkSupport = function (e) {
      var r = be[e.toLowerCase()];
      if (!r) throw new Error(e + ' is not supported by this platform');
    };
    N.MAX_VALUE_16BITS = 65535;
    N.MAX_VALUE_32BITS = -1;
    N.pretty = function (e) {
      var r = '',
        t,
        i;
      for (i = 0; i < (e || '').length; i++)
        (t = e.charCodeAt(i)),
          (r += '\\x' + (t < 16 ? '0' : '') + t.toString(16).toUpperCase());
      return r;
    };
    N.delay = function (e, r, t) {
      uf(function () {
        e.apply(t || null, r || []);
      });
    };
    N.inherits = function (e, r) {
      var t = function () {};
      (t.prototype = r.prototype), (e.prototype = new t());
    };
    N.extend = function () {
      var e = {},
        r,
        t;
      for (r = 0; r < arguments.length; r++)
        for (t in arguments[r])
          arguments[r].hasOwnProperty(t) &&
            typeof e[t] == 'undefined' &&
            (e[t] = arguments[r][t]);
      return e;
    };
    N.prepareContent = function (e, r, t, i, n) {
      var a = Wr.Promise.resolve(r).then(function (s) {
        var o =
          be.blob &&
          (s instanceof Blob ||
            ['[object File]', '[object Blob]'].indexOf(
              Object.prototype.toString.call(s)
            ) !== -1);
        return o && typeof FileReader != 'undefined'
          ? new Wr.Promise(function (u, f) {
              var l = new FileReader();
              (l.onload = function (p) {
                u(p.target.result);
              }),
                (l.onerror = function (p) {
                  f(p.target.error);
                }),
                l.readAsArrayBuffer(s);
            })
          : s;
      });
      return a.then(function (s) {
        var o = N.getTypeOf(s);
        return o
          ? (o === 'arraybuffer'
              ? (s = N.transformTo('uint8array', s))
              : o === 'string' &&
                (n ? (s = lf.decode(s)) : t && i !== !0 && (s = cf(s))),
            s)
          : Wr.Promise.reject(
              new Error(
                "Can't read the data of '" +
                  e +
                  "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"
              )
            );
      });
    };
  });
  var H = _((Mc, Cn) => {
    'use strict';
    function Tn(e) {
      (this.name = e || 'default'),
        (this.streamInfo = {}),
        (this.generatedError = null),
        (this.extraStreamInfo = {}),
        (this.isPaused = !0),
        (this.isFinished = !1),
        (this.isLocked = !1),
        (this._listeners = { data: [], end: [], error: [] }),
        (this.previous = null);
    }
    Tn.prototype = {
      push: function (e) {
        this.emit('data', e);
      },
      end: function () {
        if (this.isFinished) return !1;
        this.flush();
        try {
          this.emit('end'), this.cleanUp(), (this.isFinished = !0);
        } catch (e) {
          this.emit('error', e);
        }
        return !0;
      },
      error: function (e) {
        return this.isFinished
          ? !1
          : (this.isPaused
              ? (this.generatedError = e)
              : ((this.isFinished = !0),
                this.emit('error', e),
                this.previous && this.previous.error(e),
                this.cleanUp()),
            !0);
      },
      on: function (e, r) {
        return this._listeners[e].push(r), this;
      },
      cleanUp: function () {
        (this.streamInfo = this.generatedError = this.extraStreamInfo = null),
          (this._listeners = []);
      },
      emit: function (e, r) {
        if (this._listeners[e])
          for (var t = 0; t < this._listeners[e].length; t++)
            this._listeners[e][t].call(this, r);
      },
      pipe: function (e) {
        return e.registerPrevious(this);
      },
      registerPrevious: function (e) {
        if (this.isLocked)
          throw new Error("The stream '" + this + "' has already been used.");
        (this.streamInfo = e.streamInfo),
          this.mergeStreamInfo(),
          (this.previous = e);
        var r = this;
        return (
          e.on('data', function (t) {
            r.processChunk(t);
          }),
          e.on('end', function () {
            r.end();
          }),
          e.on('error', function (t) {
            r.error(t);
          }),
          this
        );
      },
      pause: function () {
        return this.isPaused || this.isFinished
          ? !1
          : ((this.isPaused = !0), this.previous && this.previous.pause(), !0);
      },
      resume: function () {
        if (!this.isPaused || this.isFinished) return !1;
        this.isPaused = !1;
        var e = !1;
        return (
          this.generatedError && (this.error(this.generatedError), (e = !0)),
          this.previous && this.previous.resume(),
          !e
        );
      },
      flush: function () {},
      processChunk: function (e) {
        this.push(e);
      },
      withStreamInfo: function (e, r) {
        return (this.extraStreamInfo[e] = r), this.mergeStreamInfo(), this;
      },
      mergeStreamInfo: function () {
        for (var e in this.extraStreamInfo)
          !this.extraStreamInfo.hasOwnProperty(e) ||
            (this.streamInfo[e] = this.extraStreamInfo[e]);
      },
      lock: function () {
        if (this.isLocked)
          throw new Error("The stream '" + this + "' has already been used.");
        (this.isLocked = !0), this.previous && this.previous.lock();
      },
      toString: function () {
        var e = 'Worker ' + this.name;
        return this.previous ? this.previous + ' -> ' + e : e;
      },
    };
    Cn.exports = Tn;
  });
  var De = _((Ee) => {
    'use strict';
    var Ye = F(),
      Te = ue(),
      df = gt(),
      Kt = H(),
      wt = new Array(256);
    for (var ye = 0; ye < 256; ye++)
      wt[ye] =
        ye >= 252
          ? 6
          : ye >= 248
            ? 5
            : ye >= 240
              ? 4
              : ye >= 224
                ? 3
                : ye >= 192
                  ? 2
                  : 1;
    wt[254] = wt[254] = 1;
    var hf = function (e) {
        var r,
          t,
          i,
          n,
          a,
          s = e.length,
          o = 0;
        for (n = 0; n < s; n++)
          (t = e.charCodeAt(n)),
            (t & 64512) == 55296 &&
              n + 1 < s &&
              ((i = e.charCodeAt(n + 1)),
              (i & 64512) == 56320 &&
                ((t = 65536 + ((t - 55296) << 10) + (i - 56320)), n++)),
            (o += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4);
        for (
          Te.uint8array ? (r = new Uint8Array(o)) : (r = new Array(o)),
            a = 0,
            n = 0;
          a < o;
          n++
        )
          (t = e.charCodeAt(n)),
            (t & 64512) == 55296 &&
              n + 1 < s &&
              ((i = e.charCodeAt(n + 1)),
              (i & 64512) == 56320 &&
                ((t = 65536 + ((t - 55296) << 10) + (i - 56320)), n++)),
            t < 128
              ? (r[a++] = t)
              : t < 2048
                ? ((r[a++] = 192 | (t >>> 6)), (r[a++] = 128 | (t & 63)))
                : t < 65536
                  ? ((r[a++] = 224 | (t >>> 12)),
                    (r[a++] = 128 | ((t >>> 6) & 63)),
                    (r[a++] = 128 | (t & 63)))
                  : ((r[a++] = 240 | (t >>> 18)),
                    (r[a++] = 128 | ((t >>> 12) & 63)),
                    (r[a++] = 128 | ((t >>> 6) & 63)),
                    (r[a++] = 128 | (t & 63)));
        return r;
      },
      pf = function (e, r) {
        var t;
        for (
          r = r || e.length, r > e.length && (r = e.length), t = r - 1;
          t >= 0 && (e[t] & 192) == 128;

        )
          t--;
        return t < 0 || t === 0 ? r : t + wt[e[t]] > r ? t : r;
      },
      _f = function (e) {
        var r,
          t,
          i,
          n,
          a,
          s = e.length,
          o = new Array(s * 2);
        for (i = 0, t = 0; t < s; ) {
          if (((n = e[t++]), n < 128)) {
            o[i++] = n;
            continue;
          }
          if (((a = wt[n]), a > 4)) {
            (o[i++] = 65533), (t += a - 1);
            continue;
          }
          for (n &= a === 2 ? 31 : a === 3 ? 15 : 7; a > 1 && t < s; )
            (n = (n << 6) | (e[t++] & 63)), a--;
          if (a > 1) {
            o[i++] = 65533;
            continue;
          }
          n < 65536
            ? (o[i++] = n)
            : ((n -= 65536),
              (o[i++] = 55296 | ((n >> 10) & 1023)),
              (o[i++] = 56320 | (n & 1023)));
        }
        return (
          o.length !== i &&
            (o.subarray ? (o = o.subarray(0, i)) : (o.length = i)),
          Ye.applyFromCharCode(o)
        );
      };
    Ee.utf8encode = function (r) {
      return Te.nodebuffer ? df.newBufferFrom(r, 'utf-8') : hf(r);
    };
    Ee.utf8decode = function (r) {
      return Te.nodebuffer
        ? Ye.transformTo('nodebuffer', r).toString('utf-8')
        : ((r = Ye.transformTo(Te.uint8array ? 'uint8array' : 'array', r)),
          _f(r));
    };
    function Qt() {
      Kt.call(this, 'utf-8 decode'), (this.leftOver = null);
    }
    Ye.inherits(Qt, Kt);
    Qt.prototype.processChunk = function (e) {
      var r = Ye.transformTo(Te.uint8array ? 'uint8array' : 'array', e.data);
      if (this.leftOver && this.leftOver.length) {
        if (Te.uint8array) {
          var t = r;
          (r = new Uint8Array(t.length + this.leftOver.length)),
            r.set(this.leftOver, 0),
            r.set(t, this.leftOver.length);
        } else r = this.leftOver.concat(r);
        this.leftOver = null;
      }
      var i = pf(r),
        n = r;
      i !== r.length &&
        (Te.uint8array
          ? ((n = r.subarray(0, i)), (this.leftOver = r.subarray(i, r.length)))
          : ((n = r.slice(0, i)), (this.leftOver = r.slice(i, r.length)))),
        this.push({ data: Ee.utf8decode(n), meta: e.meta });
    };
    Qt.prototype.flush = function () {
      this.leftOver &&
        this.leftOver.length &&
        (this.push({ data: Ee.utf8decode(this.leftOver), meta: {} }),
        (this.leftOver = null));
    };
    Ee.Utf8DecodeWorker = Qt;
    function $r() {
      Kt.call(this, 'utf-8 encode');
    }
    Ye.inherits($r, Kt);
    $r.prototype.processChunk = function (e) {
      this.push({ data: Ee.utf8encode(e.data), meta: e.meta });
    };
    Ee.Utf8EncodeWorker = $r;
  });
  var zn = _((qc, Dn) => {
    'use strict';
    var In = H(),
      Fn = F();
    function Hr(e) {
      In.call(this, 'ConvertWorker to ' + e), (this.destType = e);
    }
    Fn.inherits(Hr, In);
    Hr.prototype.processChunk = function (e) {
      this.push({ data: Fn.transformTo(this.destType, e.data), meta: e.meta });
    };
    Dn.exports = Hr;
  });
  var Bn = _((Wc, Nn) => {
    'use strict';
    var Pn = Dr().Readable,
      vf = F();
    vf.inherits(Gr, Pn);
    function Gr(e, r, t) {
      Pn.call(this, r), (this._helper = e);
      var i = this;
      e.on('data', function (n, a) {
        i.push(n) || i._helper.pause(), t && t(a);
      })
        .on('error', function (n) {
          i.emit('error', n);
        })
        .on('end', function () {
          i.push(null);
        });
    }
    Gr.prototype._read = function () {
      this._helper.resume();
    };
    Nn.exports = Gr;
  });
  var Xr = _(($c, Ln) => {
    'use strict';
    var Ie = F(),
      gf = zn(),
      mf = H(),
      bf = Nr(),
      xf = ue(),
      Ef = Xe(),
      Un = null;
    if (xf.nodestream)
      try {
        Un = Bn();
      } catch (e) {}
    function yf(e, r, t) {
      switch (e) {
        case 'blob':
          return Ie.newBlob(Ie.transformTo('arraybuffer', r), t);
        case 'base64':
          return bf.encode(r);
        default:
          return Ie.transformTo(e, r);
      }
    }
    function wf(e, r) {
      var t,
        i = 0,
        n = null,
        a = 0;
      for (t = 0; t < r.length; t++) a += r[t].length;
      switch (e) {
        case 'string':
          return r.join('');
        case 'array':
          return Array.prototype.concat.apply([], r);
        case 'uint8array':
          for (n = new Uint8Array(a), t = 0; t < r.length; t++)
            n.set(r[t], i), (i += r[t].length);
          return n;
        case 'nodebuffer':
          return Buffer.concat(r);
        default:
          throw new Error("concat : unsupported type '" + e + "'");
      }
    }
    function Sf(e, r) {
      return new Ef.Promise(function (t, i) {
        var n = [],
          a = e._internalType,
          s = e._outputType,
          o = e._mimeType;
        e.on('data', function (u, f) {
          n.push(u), r && r(f);
        })
          .on('error', function (u) {
            (n = []), i(u);
          })
          .on('end', function () {
            try {
              var u = yf(s, wf(a, n), o);
              t(u);
            } catch (f) {
              i(f);
            }
            n = [];
          })
          .resume();
      });
    }
    function Mn(e, r, t) {
      var i = r;
      switch (r) {
        case 'blob':
        case 'arraybuffer':
          i = 'uint8array';
          break;
        case 'base64':
          i = 'string';
          break;
      }
      try {
        (this._internalType = i),
          (this._outputType = r),
          (this._mimeType = t),
          Ie.checkSupport(i),
          (this._worker = e.pipe(new gf(i))),
          e.lock();
      } catch (n) {
        (this._worker = new mf('error')), this._worker.error(n);
      }
    }
    Mn.prototype = {
      accumulate: function (e) {
        return Sf(this, e);
      },
      on: function (e, r) {
        var t = this;
        return (
          e === 'data'
            ? this._worker.on(e, function (i) {
                r.call(t, i.data, i.meta);
              })
            : this._worker.on(e, function () {
                Ie.delay(r, arguments, t);
              }),
          this
        );
      },
      resume: function () {
        return Ie.delay(this._worker.resume, [], this._worker), this;
      },
      pause: function () {
        return this._worker.pause(), this;
      },
      toNodejsStream: function (e) {
        if ((Ie.checkSupport('nodestream'), this._outputType !== 'nodebuffer'))
          throw new Error(
            this._outputType + ' is not supported by this method'
          );
        return new Un(
          this,
          { objectMode: this._outputType !== 'nodebuffer' },
          e
        );
      },
    };
    Ln.exports = Mn;
  });
  var Vr = _((K) => {
    'use strict';
    K.base64 = !1;
    K.binary = !1;
    K.dir = !1;
    K.createFolders = !0;
    K.date = null;
    K.compression = null;
    K.compressionOptions = null;
    K.comment = null;
    K.unixPermissions = null;
    K.dosPermissions = null;
  });
  var Yr = _((Gc, Zn) => {
    'use strict';
    var er = F(),
      tr = H(),
      kf = 16 * 1024;
    function Je(e) {
      tr.call(this, 'DataWorker');
      var r = this;
      (this.dataIsReady = !1),
        (this.index = 0),
        (this.max = 0),
        (this.data = null),
        (this.type = ''),
        (this._tickScheduled = !1),
        e.then(
          function (t) {
            (r.dataIsReady = !0),
              (r.data = t),
              (r.max = (t && t.length) || 0),
              (r.type = er.getTypeOf(t)),
              r.isPaused || r._tickAndRepeat();
          },
          function (t) {
            r.error(t);
          }
        );
    }
    er.inherits(Je, tr);
    Je.prototype.cleanUp = function () {
      tr.prototype.cleanUp.call(this), (this.data = null);
    };
    Je.prototype.resume = function () {
      return tr.prototype.resume.call(this)
        ? (!this._tickScheduled &&
            this.dataIsReady &&
            ((this._tickScheduled = !0),
            er.delay(this._tickAndRepeat, [], this)),
          !0)
        : !1;
    };
    Je.prototype._tickAndRepeat = function () {
      (this._tickScheduled = !1),
        !(this.isPaused || this.isFinished) &&
          (this._tick(),
          this.isFinished ||
            (er.delay(this._tickAndRepeat, [], this),
            (this._tickScheduled = !0)));
    };
    Je.prototype._tick = function () {
      if (this.isPaused || this.isFinished) return !1;
      var e = kf,
        r = null,
        t = Math.min(this.max, this.index + e);
      if (this.index >= this.max) return this.end();
      switch (this.type) {
        case 'string':
          r = this.data.substring(this.index, t);
          break;
        case 'uint8array':
          r = this.data.subarray(this.index, t);
          break;
        case 'array':
        case 'nodebuffer':
          r = this.data.slice(this.index, t);
          break;
      }
      return (
        (this.index = t),
        this.push({
          data: r,
          meta: { percent: this.max ? (this.index / this.max) * 100 : 0 },
        })
      );
    };
    Zn.exports = Je;
  });
  var rr = _((Xc, qn) => {
    'use strict';
    var jf = F();
    function Of() {
      for (var e, r = [], t = 0; t < 256; t++) {
        e = t;
        for (var i = 0; i < 8; i++)
          e = e & 1 ? 3988292384 ^ (e >>> 1) : e >>> 1;
        r[t] = e;
      }
      return r;
    }
    var Wn = Of();
    function Rf(e, r, t, i) {
      var n = Wn,
        a = i + t;
      e = e ^ -1;
      for (var s = i; s < a; s++) e = (e >>> 8) ^ n[(e ^ r[s]) & 255];
      return e ^ -1;
    }
    function Af(e, r, t, i) {
      var n = Wn,
        a = i + t;
      e = e ^ -1;
      for (var s = i; s < a; s++)
        e = (e >>> 8) ^ n[(e ^ r.charCodeAt(s)) & 255];
      return e ^ -1;
    }
    qn.exports = function (r, t) {
      if (typeof r == 'undefined' || !r.length) return 0;
      var i = jf.getTypeOf(r) !== 'string';
      return i ? Rf(t | 0, r, r.length, 0) : Af(t | 0, r, r.length, 0);
    };
  });
  var Kr = _((Vc, $n) => {
    'use strict';
    var Hn = H(),
      Cf = rr(),
      Tf = F();
    function Jr() {
      Hn.call(this, 'Crc32Probe'), this.withStreamInfo('crc32', 0);
    }
    Tf.inherits(Jr, Hn);
    Jr.prototype.processChunk = function (e) {
      (this.streamInfo.crc32 = Cf(e.data, this.streamInfo.crc32 || 0)),
        this.push(e);
    };
    $n.exports = Jr;
  });
  var Xn = _((Yc, Gn) => {
    'use strict';
    var Df = F(),
      Qr = H();
    function ei(e) {
      Qr.call(this, 'DataLengthProbe for ' + e),
        (this.propName = e),
        this.withStreamInfo(e, 0);
    }
    Df.inherits(ei, Qr);
    ei.prototype.processChunk = function (e) {
      if (e) {
        var r = this.streamInfo[this.propName] || 0;
        this.streamInfo[this.propName] = r + e.data.length;
      }
      Qr.prototype.processChunk.call(this, e);
    };
    Gn.exports = ei;
  });
  var ir = _((Jc, Vn) => {
    'use strict';
    var Yn = Xe(),
      Jn = Yr(),
      If = Kr(),
      ti = Xn();
    function ri(e, r, t, i, n) {
      (this.compressedSize = e),
        (this.uncompressedSize = r),
        (this.crc32 = t),
        (this.compression = i),
        (this.compressedContent = n);
    }
    ri.prototype = {
      getContentWorker: function () {
        var e = new Jn(Yn.Promise.resolve(this.compressedContent))
            .pipe(this.compression.uncompressWorker())
            .pipe(new ti('data_length')),
          r = this;
        return (
          e.on('end', function () {
            if (this.streamInfo.data_length !== r.uncompressedSize)
              throw new Error('Bug : uncompressed data size mismatch');
          }),
          e
        );
      },
      getCompressedWorker: function () {
        return new Jn(Yn.Promise.resolve(this.compressedContent))
          .withStreamInfo('compressedSize', this.compressedSize)
          .withStreamInfo('uncompressedSize', this.uncompressedSize)
          .withStreamInfo('crc32', this.crc32)
          .withStreamInfo('compression', this.compression);
      },
    };
    ri.createWorkerFrom = function (e, r, t) {
      return e
        .pipe(new If())
        .pipe(new ti('uncompressedSize'))
        .pipe(r.compressWorker(t))
        .pipe(new ti('compressedSize'))
        .withStreamInfo('compression', r);
    };
    Vn.exports = ri;
  });
  var ta = _((Kc, Kn) => {
    'use strict';
    var Ff = Xr(),
      zf = Yr(),
      ii = De(),
      ni = ir(),
      Qn = H(),
      ai = function (e, r, t) {
        (this.name = e),
          (this.dir = t.dir),
          (this.date = t.date),
          (this.comment = t.comment),
          (this.unixPermissions = t.unixPermissions),
          (this.dosPermissions = t.dosPermissions),
          (this._data = r),
          (this._dataBinary = t.binary),
          (this.options = {
            compression: t.compression,
            compressionOptions: t.compressionOptions,
          });
      };
    ai.prototype = {
      internalStream: function (e) {
        var r = null,
          t = 'string';
        try {
          if (!e) throw new Error('No output type specified.');
          t = e.toLowerCase();
          var i = t === 'string' || t === 'text';
          (t === 'binarystring' || t === 'text') && (t = 'string'),
            (r = this._decompressWorker());
          var n = !this._dataBinary;
          n && !i && (r = r.pipe(new ii.Utf8EncodeWorker())),
            !n && i && (r = r.pipe(new ii.Utf8DecodeWorker()));
        } catch (a) {
          (r = new Qn('error')), r.error(a);
        }
        return new Ff(r, t, '');
      },
      async: function (e, r) {
        return this.internalStream(e).accumulate(r);
      },
      nodeStream: function (e, r) {
        return this.internalStream(e || 'nodebuffer').toNodejsStream(r);
      },
      _compressWorker: function (e, r) {
        if (
          this._data instanceof ni &&
          this._data.compression.magic === e.magic
        )
          return this._data.getCompressedWorker();
        var t = this._decompressWorker();
        return (
          this._dataBinary || (t = t.pipe(new ii.Utf8EncodeWorker())),
          ni.createWorkerFrom(t, e, r)
        );
      },
      _decompressWorker: function () {
        return this._data instanceof ni
          ? this._data.getContentWorker()
          : this._data instanceof Qn
            ? this._data
            : new zf(this._data);
      },
    };
    var ea = [
        'asText',
        'asBinary',
        'asNodeBuffer',
        'asUint8Array',
        'asArrayBuffer',
      ],
      Nf = function () {
        throw new Error(
          'This method has been removed in JSZip 3.0, please check the upgrade guide.'
        );
      };
    for (var si = 0; si < ea.length; si++) ai.prototype[ea[si]] = Nf;
    Kn.exports = ai;
  });
  var ce = _((U) => {
    'use strict';
    var Pf =
      typeof Uint8Array != 'undefined' &&
      typeof Uint16Array != 'undefined' &&
      typeof Int32Array != 'undefined';
    function Bf(e, r) {
      return Object.prototype.hasOwnProperty.call(e, r);
    }
    U.assign = function (e) {
      for (var r = Array.prototype.slice.call(arguments, 1); r.length; ) {
        var t = r.shift();
        if (!!t) {
          if (typeof t != 'object')
            throw new TypeError(t + 'must be non-object');
          for (var i in t) Bf(t, i) && (e[i] = t[i]);
        }
      }
      return e;
    };
    U.shrinkBuf = function (e, r) {
      return e.length === r
        ? e
        : e.subarray
          ? e.subarray(0, r)
          : ((e.length = r), e);
    };
    var Lf = {
        arraySet: function (e, r, t, i, n) {
          if (r.subarray && e.subarray) {
            e.set(r.subarray(t, t + i), n);
            return;
          }
          for (var a = 0; a < i; a++) e[n + a] = r[t + a];
        },
        flattenChunks: function (e) {
          var r, t, i, n, a, s;
          for (i = 0, r = 0, t = e.length; r < t; r++) i += e[r].length;
          for (s = new Uint8Array(i), n = 0, r = 0, t = e.length; r < t; r++)
            (a = e[r]), s.set(a, n), (n += a.length);
          return s;
        },
      },
      Uf = {
        arraySet: function (e, r, t, i, n) {
          for (var a = 0; a < i; a++) e[n + a] = r[t + a];
        },
        flattenChunks: function (e) {
          return [].concat.apply([], e);
        },
      };
    U.setTyped = function (e) {
      e
        ? ((U.Buf8 = Uint8Array),
          (U.Buf16 = Uint16Array),
          (U.Buf32 = Int32Array),
          U.assign(U, Lf))
        : ((U.Buf8 = Array),
          (U.Buf16 = Array),
          (U.Buf32 = Array),
          U.assign(U, Uf));
    };
    U.setTyped(Pf);
  });
  var Sa = _((Ke) => {
    'use strict';
    var Mf = ce(),
      Zf = 4,
      ra = 0,
      ia = 1,
      qf = 2;
    function Qe(e) {
      for (var r = e.length; --r >= 0; ) e[r] = 0;
    }
    var Wf = 0,
      na = 1,
      $f = 2,
      Hf = 3,
      Gf = 258,
      oi = 29,
      St = 256,
      kt = St + 1 + oi,
      et = 30,
      fi = 19,
      aa = 2 * kt + 1,
      Fe = 15,
      li = 16,
      Xf = 7,
      ui = 256,
      sa = 16,
      oa = 17,
      fa = 18,
      ci = [
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4,
        5, 5, 5, 5, 0,
      ],
      nr = [
        0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
        10, 11, 11, 12, 12, 13, 13,
      ],
      Vf = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
      la = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
      Yf = 512,
      de = new Array((kt + 2) * 2);
    Qe(de);
    var jt = new Array(et * 2);
    Qe(jt);
    var Ot = new Array(Yf);
    Qe(Ot);
    var Rt = new Array(Gf - Hf + 1);
    Qe(Rt);
    var di = new Array(oi);
    Qe(di);
    var ar = new Array(et);
    Qe(ar);
    function hi(e, r, t, i, n) {
      (this.static_tree = e),
        (this.extra_bits = r),
        (this.extra_base = t),
        (this.elems = i),
        (this.max_length = n),
        (this.has_stree = e && e.length);
    }
    var ua, ca, da;
    function pi(e, r) {
      (this.dyn_tree = e), (this.max_code = 0), (this.stat_desc = r);
    }
    function ha(e) {
      return e < 256 ? Ot[e] : Ot[256 + (e >>> 7)];
    }
    function At(e, r) {
      (e.pending_buf[e.pending++] = r & 255),
        (e.pending_buf[e.pending++] = (r >>> 8) & 255);
    }
    function Z(e, r, t) {
      e.bi_valid > li - t
        ? ((e.bi_buf |= (r << e.bi_valid) & 65535),
          At(e, e.bi_buf),
          (e.bi_buf = r >> (li - e.bi_valid)),
          (e.bi_valid += t - li))
        : ((e.bi_buf |= (r << e.bi_valid) & 65535), (e.bi_valid += t));
    }
    function ne(e, r, t) {
      Z(e, t[r * 2], t[r * 2 + 1]);
    }
    function pa(e, r) {
      var t = 0;
      do (t |= e & 1), (e >>>= 1), (t <<= 1);
      while (--r > 0);
      return t >>> 1;
    }
    function Jf(e) {
      e.bi_valid === 16
        ? (At(e, e.bi_buf), (e.bi_buf = 0), (e.bi_valid = 0))
        : e.bi_valid >= 8 &&
          ((e.pending_buf[e.pending++] = e.bi_buf & 255),
          (e.bi_buf >>= 8),
          (e.bi_valid -= 8));
    }
    function Kf(e, r) {
      var t = r.dyn_tree,
        i = r.max_code,
        n = r.stat_desc.static_tree,
        a = r.stat_desc.has_stree,
        s = r.stat_desc.extra_bits,
        o = r.stat_desc.extra_base,
        u = r.stat_desc.max_length,
        f,
        l,
        p,
        c,
        d,
        b,
        m = 0;
      for (c = 0; c <= Fe; c++) e.bl_count[c] = 0;
      for (t[e.heap[e.heap_max] * 2 + 1] = 0, f = e.heap_max + 1; f < aa; f++)
        (l = e.heap[f]),
          (c = t[t[l * 2 + 1] * 2 + 1] + 1),
          c > u && ((c = u), m++),
          (t[l * 2 + 1] = c),
          !(l > i) &&
            (e.bl_count[c]++,
            (d = 0),
            l >= o && (d = s[l - o]),
            (b = t[l * 2]),
            (e.opt_len += b * (c + d)),
            a && (e.static_len += b * (n[l * 2 + 1] + d)));
      if (m !== 0) {
        do {
          for (c = u - 1; e.bl_count[c] === 0; ) c--;
          e.bl_count[c]--, (e.bl_count[c + 1] += 2), e.bl_count[u]--, (m -= 2);
        } while (m > 0);
        for (c = u; c !== 0; c--)
          for (l = e.bl_count[c]; l !== 0; )
            (p = e.heap[--f]),
              !(p > i) &&
                (t[p * 2 + 1] !== c &&
                  ((e.opt_len += (c - t[p * 2 + 1]) * t[p * 2]),
                  (t[p * 2 + 1] = c)),
                l--);
      }
    }
    function _a(e, r, t) {
      var i = new Array(Fe + 1),
        n = 0,
        a,
        s;
      for (a = 1; a <= Fe; a++) i[a] = n = (n + t[a - 1]) << 1;
      for (s = 0; s <= r; s++) {
        var o = e[s * 2 + 1];
        o !== 0 && (e[s * 2] = pa(i[o]++, o));
      }
    }
    function Qf() {
      var e,
        r,
        t,
        i,
        n,
        a = new Array(Fe + 1);
      for (t = 0, i = 0; i < oi - 1; i++)
        for (di[i] = t, e = 0; e < 1 << ci[i]; e++) Rt[t++] = i;
      for (Rt[t - 1] = i, n = 0, i = 0; i < 16; i++)
        for (ar[i] = n, e = 0; e < 1 << nr[i]; e++) Ot[n++] = i;
      for (n >>= 7; i < et; i++)
        for (ar[i] = n << 7, e = 0; e < 1 << (nr[i] - 7); e++)
          Ot[256 + n++] = i;
      for (r = 0; r <= Fe; r++) a[r] = 0;
      for (e = 0; e <= 143; ) (de[e * 2 + 1] = 8), e++, a[8]++;
      for (; e <= 255; ) (de[e * 2 + 1] = 9), e++, a[9]++;
      for (; e <= 279; ) (de[e * 2 + 1] = 7), e++, a[7]++;
      for (; e <= 287; ) (de[e * 2 + 1] = 8), e++, a[8]++;
      for (_a(de, kt + 1, a), e = 0; e < et; e++)
        (jt[e * 2 + 1] = 5), (jt[e * 2] = pa(e, 5));
      (ua = new hi(de, ci, St + 1, kt, Fe)),
        (ca = new hi(jt, nr, 0, et, Fe)),
        (da = new hi(new Array(0), Vf, 0, fi, Xf));
    }
    function va(e) {
      var r;
      for (r = 0; r < kt; r++) e.dyn_ltree[r * 2] = 0;
      for (r = 0; r < et; r++) e.dyn_dtree[r * 2] = 0;
      for (r = 0; r < fi; r++) e.bl_tree[r * 2] = 0;
      (e.dyn_ltree[ui * 2] = 1),
        (e.opt_len = e.static_len = 0),
        (e.last_lit = e.matches = 0);
    }
    function ga(e) {
      e.bi_valid > 8
        ? At(e, e.bi_buf)
        : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf),
        (e.bi_buf = 0),
        (e.bi_valid = 0);
    }
    function el(e, r, t, i) {
      ga(e),
        i && (At(e, t), At(e, ~t)),
        Mf.arraySet(e.pending_buf, e.window, r, t, e.pending),
        (e.pending += t);
    }
    function ma(e, r, t, i) {
      var n = r * 2,
        a = t * 2;
      return e[n] < e[a] || (e[n] === e[a] && i[r] <= i[t]);
    }
    function _i(e, r, t) {
      for (
        var i = e.heap[t], n = t << 1;
        n <= e.heap_len &&
        (n < e.heap_len && ma(r, e.heap[n + 1], e.heap[n], e.depth) && n++,
        !ma(r, i, e.heap[n], e.depth));

      )
        (e.heap[t] = e.heap[n]), (t = n), (n <<= 1);
      e.heap[t] = i;
    }
    function ba(e, r, t) {
      var i,
        n,
        a = 0,
        s,
        o;
      if (e.last_lit !== 0)
        do
          (i =
            (e.pending_buf[e.d_buf + a * 2] << 8) |
            e.pending_buf[e.d_buf + a * 2 + 1]),
            (n = e.pending_buf[e.l_buf + a]),
            a++,
            i === 0
              ? ne(e, n, r)
              : ((s = Rt[n]),
                ne(e, s + St + 1, r),
                (o = ci[s]),
                o !== 0 && ((n -= di[s]), Z(e, n, o)),
                i--,
                (s = ha(i)),
                ne(e, s, t),
                (o = nr[s]),
                o !== 0 && ((i -= ar[s]), Z(e, i, o)));
        while (a < e.last_lit);
      ne(e, ui, r);
    }
    function vi(e, r) {
      var t = r.dyn_tree,
        i = r.stat_desc.static_tree,
        n = r.stat_desc.has_stree,
        a = r.stat_desc.elems,
        s,
        o,
        u = -1,
        f;
      for (e.heap_len = 0, e.heap_max = aa, s = 0; s < a; s++)
        t[s * 2] !== 0
          ? ((e.heap[++e.heap_len] = u = s), (e.depth[s] = 0))
          : (t[s * 2 + 1] = 0);
      for (; e.heap_len < 2; )
        (f = e.heap[++e.heap_len] = u < 2 ? ++u : 0),
          (t[f * 2] = 1),
          (e.depth[f] = 0),
          e.opt_len--,
          n && (e.static_len -= i[f * 2 + 1]);
      for (r.max_code = u, s = e.heap_len >> 1; s >= 1; s--) _i(e, t, s);
      f = a;
      do
        (s = e.heap[1]),
          (e.heap[1] = e.heap[e.heap_len--]),
          _i(e, t, 1),
          (o = e.heap[1]),
          (e.heap[--e.heap_max] = s),
          (e.heap[--e.heap_max] = o),
          (t[f * 2] = t[s * 2] + t[o * 2]),
          (e.depth[f] =
            (e.depth[s] >= e.depth[o] ? e.depth[s] : e.depth[o]) + 1),
          (t[s * 2 + 1] = t[o * 2 + 1] = f),
          (e.heap[1] = f++),
          _i(e, t, 1);
      while (e.heap_len >= 2);
      (e.heap[--e.heap_max] = e.heap[1]), Kf(e, r), _a(t, u, e.bl_count);
    }
    function xa(e, r, t) {
      var i,
        n = -1,
        a,
        s = r[0 * 2 + 1],
        o = 0,
        u = 7,
        f = 4;
      for (
        s === 0 && ((u = 138), (f = 3)), r[(t + 1) * 2 + 1] = 65535, i = 0;
        i <= t;
        i++
      )
        (a = s),
          (s = r[(i + 1) * 2 + 1]),
          !(++o < u && a === s) &&
            (o < f
              ? (e.bl_tree[a * 2] += o)
              : a !== 0
                ? (a !== n && e.bl_tree[a * 2]++, e.bl_tree[sa * 2]++)
                : o <= 10
                  ? e.bl_tree[oa * 2]++
                  : e.bl_tree[fa * 2]++,
            (o = 0),
            (n = a),
            s === 0
              ? ((u = 138), (f = 3))
              : a === s
                ? ((u = 6), (f = 3))
                : ((u = 7), (f = 4)));
    }
    function Ea(e, r, t) {
      var i,
        n = -1,
        a,
        s = r[0 * 2 + 1],
        o = 0,
        u = 7,
        f = 4;
      for (s === 0 && ((u = 138), (f = 3)), i = 0; i <= t; i++)
        if (((a = s), (s = r[(i + 1) * 2 + 1]), !(++o < u && a === s))) {
          if (o < f)
            do ne(e, a, e.bl_tree);
            while (--o != 0);
          else
            a !== 0
              ? (a !== n && (ne(e, a, e.bl_tree), o--),
                ne(e, sa, e.bl_tree),
                Z(e, o - 3, 2))
              : o <= 10
                ? (ne(e, oa, e.bl_tree), Z(e, o - 3, 3))
                : (ne(e, fa, e.bl_tree), Z(e, o - 11, 7));
          (o = 0),
            (n = a),
            s === 0
              ? ((u = 138), (f = 3))
              : a === s
                ? ((u = 6), (f = 3))
                : ((u = 7), (f = 4));
        }
    }
    function tl(e) {
      var r;
      for (
        xa(e, e.dyn_ltree, e.l_desc.max_code),
          xa(e, e.dyn_dtree, e.d_desc.max_code),
          vi(e, e.bl_desc),
          r = fi - 1;
        r >= 3 && e.bl_tree[la[r] * 2 + 1] === 0;
        r--
      );
      return (e.opt_len += 3 * (r + 1) + 5 + 5 + 4), r;
    }
    function rl(e, r, t, i) {
      var n;
      for (Z(e, r - 257, 5), Z(e, t - 1, 5), Z(e, i - 4, 4), n = 0; n < i; n++)
        Z(e, e.bl_tree[la[n] * 2 + 1], 3);
      Ea(e, e.dyn_ltree, r - 1), Ea(e, e.dyn_dtree, t - 1);
    }
    function il(e) {
      var r = 4093624447,
        t;
      for (t = 0; t <= 31; t++, r >>>= 1)
        if (r & 1 && e.dyn_ltree[t * 2] !== 0) return ra;
      if (
        e.dyn_ltree[9 * 2] !== 0 ||
        e.dyn_ltree[10 * 2] !== 0 ||
        e.dyn_ltree[13 * 2] !== 0
      )
        return ia;
      for (t = 32; t < St; t++) if (e.dyn_ltree[t * 2] !== 0) return ia;
      return ra;
    }
    var ya = !1;
    function nl(e) {
      ya || (Qf(), (ya = !0)),
        (e.l_desc = new pi(e.dyn_ltree, ua)),
        (e.d_desc = new pi(e.dyn_dtree, ca)),
        (e.bl_desc = new pi(e.bl_tree, da)),
        (e.bi_buf = 0),
        (e.bi_valid = 0),
        va(e);
    }
    function wa(e, r, t, i) {
      Z(e, (Wf << 1) + (i ? 1 : 0), 3), el(e, r, t, !0);
    }
    function al(e) {
      Z(e, na << 1, 3), ne(e, ui, de), Jf(e);
    }
    function sl(e, r, t, i) {
      var n,
        a,
        s = 0;
      e.level > 0
        ? (e.strm.data_type === qf && (e.strm.data_type = il(e)),
          vi(e, e.l_desc),
          vi(e, e.d_desc),
          (s = tl(e)),
          (n = (e.opt_len + 3 + 7) >>> 3),
          (a = (e.static_len + 3 + 7) >>> 3),
          a <= n && (n = a))
        : (n = a = t + 5),
        t + 4 <= n && r !== -1
          ? wa(e, r, t, i)
          : e.strategy === Zf || a === n
            ? (Z(e, (na << 1) + (i ? 1 : 0), 3), ba(e, de, jt))
            : (Z(e, ($f << 1) + (i ? 1 : 0), 3),
              rl(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, s + 1),
              ba(e, e.dyn_ltree, e.dyn_dtree)),
        va(e),
        i && ga(e);
    }
    function ol(e, r, t) {
      return (
        (e.pending_buf[e.d_buf + e.last_lit * 2] = (r >>> 8) & 255),
        (e.pending_buf[e.d_buf + e.last_lit * 2 + 1] = r & 255),
        (e.pending_buf[e.l_buf + e.last_lit] = t & 255),
        e.last_lit++,
        r === 0
          ? e.dyn_ltree[t * 2]++
          : (e.matches++,
            r--,
            e.dyn_ltree[(Rt[t] + St + 1) * 2]++,
            e.dyn_dtree[ha(r) * 2]++),
        e.last_lit === e.lit_bufsize - 1
      );
    }
    Ke._tr_init = nl;
    Ke._tr_stored_block = wa;
    Ke._tr_flush_block = sl;
    Ke._tr_tally = ol;
    Ke._tr_align = al;
  });
  var gi = _((td, ka) => {
    'use strict';
    function fl(e, r, t, i) {
      for (
        var n = (e & 65535) | 0, a = ((e >>> 16) & 65535) | 0, s = 0;
        t !== 0;

      ) {
        (s = t > 2e3 ? 2e3 : t), (t -= s);
        do (n = (n + r[i++]) | 0), (a = (a + n) | 0);
        while (--s);
        (n %= 65521), (a %= 65521);
      }
      return n | (a << 16) | 0;
    }
    ka.exports = fl;
  });
  var mi = _((rd, ja) => {
    'use strict';
    function ll() {
      for (var e, r = [], t = 0; t < 256; t++) {
        e = t;
        for (var i = 0; i < 8; i++)
          e = e & 1 ? 3988292384 ^ (e >>> 1) : e >>> 1;
        r[t] = e;
      }
      return r;
    }
    var ul = ll();
    function cl(e, r, t, i) {
      var n = ul,
        a = i + t;
      e ^= -1;
      for (var s = i; s < a; s++) e = (e >>> 8) ^ n[(e ^ r[s]) & 255];
      return e ^ -1;
    }
    ja.exports = cl;
  });
  var sr = _((id, Oa) => {
    'use strict';
    Oa.exports = {
      2: 'need dictionary',
      1: 'stream end',
      0: '',
      '-1': 'file error',
      '-2': 'stream error',
      '-3': 'data error',
      '-4': 'insufficient memory',
      '-5': 'buffer error',
      '-6': 'incompatible version',
    };
  });
  var Na = _((ae) => {
    'use strict';
    var M = ce(),
      X = Sa(),
      Ra = gi(),
      we = mi(),
      dl = sr(),
      ze = 0,
      hl = 1,
      pl = 3,
      Se = 4,
      Aa = 5,
      se = 0,
      Ca = 1,
      V = -2,
      _l = -3,
      bi = -5,
      vl = -1,
      gl = 1,
      or = 2,
      ml = 3,
      bl = 4,
      xl = 0,
      El = 2,
      fr = 8,
      yl = 9,
      wl = 15,
      Sl = 8,
      kl = 29,
      jl = 256,
      xi = jl + 1 + kl,
      Ol = 30,
      Rl = 19,
      Al = 2 * xi + 1,
      Cl = 15,
      j = 3,
      ke = 258,
      Q = ke + j + 1,
      Tl = 32,
      lr = 42,
      Ei = 69,
      ur = 73,
      cr = 91,
      dr = 103,
      Ne = 113,
      Ct = 666,
      P = 1,
      Tt = 2,
      Pe = 3,
      tt = 4,
      Dl = 3;
    function je(e, r) {
      return (e.msg = dl[r]), r;
    }
    function Ta(e) {
      return (e << 1) - (e > 4 ? 9 : 0);
    }
    function Oe(e) {
      for (var r = e.length; --r >= 0; ) e[r] = 0;
    }
    function Re(e) {
      var r = e.state,
        t = r.pending;
      t > e.avail_out && (t = e.avail_out),
        t !== 0 &&
          (M.arraySet(e.output, r.pending_buf, r.pending_out, t, e.next_out),
          (e.next_out += t),
          (r.pending_out += t),
          (e.total_out += t),
          (e.avail_out -= t),
          (r.pending -= t),
          r.pending === 0 && (r.pending_out = 0));
    }
    function B(e, r) {
      X._tr_flush_block(
        e,
        e.block_start >= 0 ? e.block_start : -1,
        e.strstart - e.block_start,
        r
      ),
        (e.block_start = e.strstart),
        Re(e.strm);
    }
    function R(e, r) {
      e.pending_buf[e.pending++] = r;
    }
    function Dt(e, r) {
      (e.pending_buf[e.pending++] = (r >>> 8) & 255),
        (e.pending_buf[e.pending++] = r & 255);
    }
    function Il(e, r, t, i) {
      var n = e.avail_in;
      return (
        n > i && (n = i),
        n === 0
          ? 0
          : ((e.avail_in -= n),
            M.arraySet(r, e.input, e.next_in, n, t),
            e.state.wrap === 1
              ? (e.adler = Ra(e.adler, r, n, t))
              : e.state.wrap === 2 && (e.adler = we(e.adler, r, n, t)),
            (e.next_in += n),
            (e.total_in += n),
            n)
      );
    }
    function Da(e, r) {
      var t = e.max_chain_length,
        i = e.strstart,
        n,
        a,
        s = e.prev_length,
        o = e.nice_match,
        u = e.strstart > e.w_size - Q ? e.strstart - (e.w_size - Q) : 0,
        f = e.window,
        l = e.w_mask,
        p = e.prev,
        c = e.strstart + ke,
        d = f[i + s - 1],
        b = f[i + s];
      e.prev_length >= e.good_match && (t >>= 2),
        o > e.lookahead && (o = e.lookahead);
      do
        if (
          ((n = r),
          !(
            f[n + s] !== b ||
            f[n + s - 1] !== d ||
            f[n] !== f[i] ||
            f[++n] !== f[i + 1]
          ))
        ) {
          (i += 2), n++;
          do;
          while (
            f[++i] === f[++n] &&
            f[++i] === f[++n] &&
            f[++i] === f[++n] &&
            f[++i] === f[++n] &&
            f[++i] === f[++n] &&
            f[++i] === f[++n] &&
            f[++i] === f[++n] &&
            f[++i] === f[++n] &&
            i < c
          );
          if (((a = ke - (c - i)), (i = c - ke), a > s)) {
            if (((e.match_start = r), (s = a), a >= o)) break;
            (d = f[i + s - 1]), (b = f[i + s]);
          }
        }
      while ((r = p[r & l]) > u && --t != 0);
      return s <= e.lookahead ? s : e.lookahead;
    }
    function Be(e) {
      var r = e.w_size,
        t,
        i,
        n,
        a,
        s;
      do {
        if (
          ((a = e.window_size - e.lookahead - e.strstart),
          e.strstart >= r + (r - Q))
        ) {
          M.arraySet(e.window, e.window, r, r, 0),
            (e.match_start -= r),
            (e.strstart -= r),
            (e.block_start -= r),
            (i = e.hash_size),
            (t = i);
          do (n = e.head[--t]), (e.head[t] = n >= r ? n - r : 0);
          while (--i);
          (i = r), (t = i);
          do (n = e.prev[--t]), (e.prev[t] = n >= r ? n - r : 0);
          while (--i);
          a += r;
        }
        if (e.strm.avail_in === 0) break;
        if (
          ((i = Il(e.strm, e.window, e.strstart + e.lookahead, a)),
          (e.lookahead += i),
          e.lookahead + e.insert >= j)
        )
          for (
            s = e.strstart - e.insert,
              e.ins_h = e.window[s],
              e.ins_h =
                ((e.ins_h << e.hash_shift) ^ e.window[s + 1]) & e.hash_mask;
            e.insert &&
            ((e.ins_h =
              ((e.ins_h << e.hash_shift) ^ e.window[s + j - 1]) & e.hash_mask),
            (e.prev[s & e.w_mask] = e.head[e.ins_h]),
            (e.head[e.ins_h] = s),
            s++,
            e.insert--,
            !(e.lookahead + e.insert < j));

          );
      } while (e.lookahead < Q && e.strm.avail_in !== 0);
    }
    function Fl(e, r) {
      var t = 65535;
      for (t > e.pending_buf_size - 5 && (t = e.pending_buf_size - 5); ; ) {
        if (e.lookahead <= 1) {
          if ((Be(e), e.lookahead === 0 && r === ze)) return P;
          if (e.lookahead === 0) break;
        }
        (e.strstart += e.lookahead), (e.lookahead = 0);
        var i = e.block_start + t;
        if (
          ((e.strstart === 0 || e.strstart >= i) &&
            ((e.lookahead = e.strstart - i),
            (e.strstart = i),
            B(e, !1),
            e.strm.avail_out === 0)) ||
          (e.strstart - e.block_start >= e.w_size - Q &&
            (B(e, !1), e.strm.avail_out === 0))
        )
          return P;
      }
      return (
        (e.insert = 0),
        r === Se
          ? (B(e, !0), e.strm.avail_out === 0 ? Pe : tt)
          : (e.strstart > e.block_start && (B(e, !1), e.strm.avail_out === 0),
            P)
      );
    }
    function yi(e, r) {
      for (var t, i; ; ) {
        if (e.lookahead < Q) {
          if ((Be(e), e.lookahead < Q && r === ze)) return P;
          if (e.lookahead === 0) break;
        }
        if (
          ((t = 0),
          e.lookahead >= j &&
            ((e.ins_h =
              ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + j - 1]) &
              e.hash_mask),
            (t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
            (e.head[e.ins_h] = e.strstart)),
          t !== 0 &&
            e.strstart - t <= e.w_size - Q &&
            (e.match_length = Da(e, t)),
          e.match_length >= j)
        )
          if (
            ((i = X._tr_tally(
              e,
              e.strstart - e.match_start,
              e.match_length - j
            )),
            (e.lookahead -= e.match_length),
            e.match_length <= e.max_lazy_match && e.lookahead >= j)
          ) {
            e.match_length--;
            do
              e.strstart++,
                (e.ins_h =
                  ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + j - 1]) &
                  e.hash_mask),
                (t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
                (e.head[e.ins_h] = e.strstart);
            while (--e.match_length != 0);
            e.strstart++;
          } else
            (e.strstart += e.match_length),
              (e.match_length = 0),
              (e.ins_h = e.window[e.strstart]),
              (e.ins_h =
                ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + 1]) &
                e.hash_mask);
        else
          (i = X._tr_tally(e, 0, e.window[e.strstart])),
            e.lookahead--,
            e.strstart++;
        if (i && (B(e, !1), e.strm.avail_out === 0)) return P;
      }
      return (
        (e.insert = e.strstart < j - 1 ? e.strstart : j - 1),
        r === Se
          ? (B(e, !0), e.strm.avail_out === 0 ? Pe : tt)
          : e.last_lit && (B(e, !1), e.strm.avail_out === 0)
            ? P
            : Tt
      );
    }
    function rt(e, r) {
      for (var t, i, n; ; ) {
        if (e.lookahead < Q) {
          if ((Be(e), e.lookahead < Q && r === ze)) return P;
          if (e.lookahead === 0) break;
        }
        if (
          ((t = 0),
          e.lookahead >= j &&
            ((e.ins_h =
              ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + j - 1]) &
              e.hash_mask),
            (t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
            (e.head[e.ins_h] = e.strstart)),
          (e.prev_length = e.match_length),
          (e.prev_match = e.match_start),
          (e.match_length = j - 1),
          t !== 0 &&
            e.prev_length < e.max_lazy_match &&
            e.strstart - t <= e.w_size - Q &&
            ((e.match_length = Da(e, t)),
            e.match_length <= 5 &&
              (e.strategy === gl ||
                (e.match_length === j && e.strstart - e.match_start > 4096)) &&
              (e.match_length = j - 1)),
          e.prev_length >= j && e.match_length <= e.prev_length)
        ) {
          (n = e.strstart + e.lookahead - j),
            (i = X._tr_tally(
              e,
              e.strstart - 1 - e.prev_match,
              e.prev_length - j
            )),
            (e.lookahead -= e.prev_length - 1),
            (e.prev_length -= 2);
          do
            ++e.strstart <= n &&
              ((e.ins_h =
                ((e.ins_h << e.hash_shift) ^ e.window[e.strstart + j - 1]) &
                e.hash_mask),
              (t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
              (e.head[e.ins_h] = e.strstart));
          while (--e.prev_length != 0);
          if (
            ((e.match_available = 0),
            (e.match_length = j - 1),
            e.strstart++,
            i && (B(e, !1), e.strm.avail_out === 0))
          )
            return P;
        } else if (e.match_available) {
          if (
            ((i = X._tr_tally(e, 0, e.window[e.strstart - 1])),
            i && B(e, !1),
            e.strstart++,
            e.lookahead--,
            e.strm.avail_out === 0)
          )
            return P;
        } else (e.match_available = 1), e.strstart++, e.lookahead--;
      }
      return (
        e.match_available &&
          ((i = X._tr_tally(e, 0, e.window[e.strstart - 1])),
          (e.match_available = 0)),
        (e.insert = e.strstart < j - 1 ? e.strstart : j - 1),
        r === Se
          ? (B(e, !0), e.strm.avail_out === 0 ? Pe : tt)
          : e.last_lit && (B(e, !1), e.strm.avail_out === 0)
            ? P
            : Tt
      );
    }
    function zl(e, r) {
      for (var t, i, n, a, s = e.window; ; ) {
        if (e.lookahead <= ke) {
          if ((Be(e), e.lookahead <= ke && r === ze)) return P;
          if (e.lookahead === 0) break;
        }
        if (
          ((e.match_length = 0),
          e.lookahead >= j &&
            e.strstart > 0 &&
            ((n = e.strstart - 1),
            (i = s[n]),
            i === s[++n] && i === s[++n] && i === s[++n]))
        ) {
          a = e.strstart + ke;
          do;
          while (
            i === s[++n] &&
            i === s[++n] &&
            i === s[++n] &&
            i === s[++n] &&
            i === s[++n] &&
            i === s[++n] &&
            i === s[++n] &&
            i === s[++n] &&
            n < a
          );
          (e.match_length = ke - (a - n)),
            e.match_length > e.lookahead && (e.match_length = e.lookahead);
        }
        if (
          (e.match_length >= j
            ? ((t = X._tr_tally(e, 1, e.match_length - j)),
              (e.lookahead -= e.match_length),
              (e.strstart += e.match_length),
              (e.match_length = 0))
            : ((t = X._tr_tally(e, 0, e.window[e.strstart])),
              e.lookahead--,
              e.strstart++),
          t && (B(e, !1), e.strm.avail_out === 0))
        )
          return P;
      }
      return (
        (e.insert = 0),
        r === Se
          ? (B(e, !0), e.strm.avail_out === 0 ? Pe : tt)
          : e.last_lit && (B(e, !1), e.strm.avail_out === 0)
            ? P
            : Tt
      );
    }
    function Nl(e, r) {
      for (var t; ; ) {
        if (e.lookahead === 0 && (Be(e), e.lookahead === 0)) {
          if (r === ze) return P;
          break;
        }
        if (
          ((e.match_length = 0),
          (t = X._tr_tally(e, 0, e.window[e.strstart])),
          e.lookahead--,
          e.strstart++,
          t && (B(e, !1), e.strm.avail_out === 0))
        )
          return P;
      }
      return (
        (e.insert = 0),
        r === Se
          ? (B(e, !0), e.strm.avail_out === 0 ? Pe : tt)
          : e.last_lit && (B(e, !1), e.strm.avail_out === 0)
            ? P
            : Tt
      );
    }
    function oe(e, r, t, i, n) {
      (this.good_length = e),
        (this.max_lazy = r),
        (this.nice_length = t),
        (this.max_chain = i),
        (this.func = n);
    }
    var it;
    it = [
      new oe(0, 0, 0, 0, Fl),
      new oe(4, 4, 8, 4, yi),
      new oe(4, 5, 16, 8, yi),
      new oe(4, 6, 32, 32, yi),
      new oe(4, 4, 16, 16, rt),
      new oe(8, 16, 32, 32, rt),
      new oe(8, 16, 128, 128, rt),
      new oe(8, 32, 128, 256, rt),
      new oe(32, 128, 258, 1024, rt),
      new oe(32, 258, 258, 4096, rt),
    ];
    function Pl(e) {
      (e.window_size = 2 * e.w_size),
        Oe(e.head),
        (e.max_lazy_match = it[e.level].max_lazy),
        (e.good_match = it[e.level].good_length),
        (e.nice_match = it[e.level].nice_length),
        (e.max_chain_length = it[e.level].max_chain),
        (e.strstart = 0),
        (e.block_start = 0),
        (e.lookahead = 0),
        (e.insert = 0),
        (e.match_length = e.prev_length = j - 1),
        (e.match_available = 0),
        (e.ins_h = 0);
    }
    function Bl() {
      (this.strm = null),
        (this.status = 0),
        (this.pending_buf = null),
        (this.pending_buf_size = 0),
        (this.pending_out = 0),
        (this.pending = 0),
        (this.wrap = 0),
        (this.gzhead = null),
        (this.gzindex = 0),
        (this.method = fr),
        (this.last_flush = -1),
        (this.w_size = 0),
        (this.w_bits = 0),
        (this.w_mask = 0),
        (this.window = null),
        (this.window_size = 0),
        (this.prev = null),
        (this.head = null),
        (this.ins_h = 0),
        (this.hash_size = 0),
        (this.hash_bits = 0),
        (this.hash_mask = 0),
        (this.hash_shift = 0),
        (this.block_start = 0),
        (this.match_length = 0),
        (this.prev_match = 0),
        (this.match_available = 0),
        (this.strstart = 0),
        (this.match_start = 0),
        (this.lookahead = 0),
        (this.prev_length = 0),
        (this.max_chain_length = 0),
        (this.max_lazy_match = 0),
        (this.level = 0),
        (this.strategy = 0),
        (this.good_match = 0),
        (this.nice_match = 0),
        (this.dyn_ltree = new M.Buf16(Al * 2)),
        (this.dyn_dtree = new M.Buf16((2 * Ol + 1) * 2)),
        (this.bl_tree = new M.Buf16((2 * Rl + 1) * 2)),
        Oe(this.dyn_ltree),
        Oe(this.dyn_dtree),
        Oe(this.bl_tree),
        (this.l_desc = null),
        (this.d_desc = null),
        (this.bl_desc = null),
        (this.bl_count = new M.Buf16(Cl + 1)),
        (this.heap = new M.Buf16(2 * xi + 1)),
        Oe(this.heap),
        (this.heap_len = 0),
        (this.heap_max = 0),
        (this.depth = new M.Buf16(2 * xi + 1)),
        Oe(this.depth),
        (this.l_buf = 0),
        (this.lit_bufsize = 0),
        (this.last_lit = 0),
        (this.d_buf = 0),
        (this.opt_len = 0),
        (this.static_len = 0),
        (this.matches = 0),
        (this.insert = 0),
        (this.bi_buf = 0),
        (this.bi_valid = 0);
    }
    function Ia(e) {
      var r;
      return !e || !e.state
        ? je(e, V)
        : ((e.total_in = e.total_out = 0),
          (e.data_type = El),
          (r = e.state),
          (r.pending = 0),
          (r.pending_out = 0),
          r.wrap < 0 && (r.wrap = -r.wrap),
          (r.status = r.wrap ? lr : Ne),
          (e.adler = r.wrap === 2 ? 0 : 1),
          (r.last_flush = ze),
          X._tr_init(r),
          se);
    }
    function Fa(e) {
      var r = Ia(e);
      return r === se && Pl(e.state), r;
    }
    function Ll(e, r) {
      return !e || !e.state || e.state.wrap !== 2
        ? V
        : ((e.state.gzhead = r), se);
    }
    function za(e, r, t, i, n, a) {
      if (!e) return V;
      var s = 1;
      if (
        (r === vl && (r = 6),
        i < 0 ? ((s = 0), (i = -i)) : i > 15 && ((s = 2), (i -= 16)),
        n < 1 ||
          n > yl ||
          t !== fr ||
          i < 8 ||
          i > 15 ||
          r < 0 ||
          r > 9 ||
          a < 0 ||
          a > bl)
      )
        return je(e, V);
      i === 8 && (i = 9);
      var o = new Bl();
      return (
        (e.state = o),
        (o.strm = e),
        (o.wrap = s),
        (o.gzhead = null),
        (o.w_bits = i),
        (o.w_size = 1 << o.w_bits),
        (o.w_mask = o.w_size - 1),
        (o.hash_bits = n + 7),
        (o.hash_size = 1 << o.hash_bits),
        (o.hash_mask = o.hash_size - 1),
        (o.hash_shift = ~~((o.hash_bits + j - 1) / j)),
        (o.window = new M.Buf8(o.w_size * 2)),
        (o.head = new M.Buf16(o.hash_size)),
        (o.prev = new M.Buf16(o.w_size)),
        (o.lit_bufsize = 1 << (n + 6)),
        (o.pending_buf_size = o.lit_bufsize * 4),
        (o.pending_buf = new M.Buf8(o.pending_buf_size)),
        (o.d_buf = 1 * o.lit_bufsize),
        (o.l_buf = (1 + 2) * o.lit_bufsize),
        (o.level = r),
        (o.strategy = a),
        (o.method = t),
        Fa(e)
      );
    }
    function Ul(e, r) {
      return za(e, r, fr, wl, Sl, xl);
    }
    function Ml(e, r) {
      var t, i, n, a;
      if (!e || !e.state || r > Aa || r < 0) return e ? je(e, V) : V;
      if (
        ((i = e.state),
        !e.output ||
          (!e.input && e.avail_in !== 0) ||
          (i.status === Ct && r !== Se))
      )
        return je(e, e.avail_out === 0 ? bi : V);
      if (
        ((i.strm = e), (t = i.last_flush), (i.last_flush = r), i.status === lr)
      )
        if (i.wrap === 2)
          (e.adler = 0),
            R(i, 31),
            R(i, 139),
            R(i, 8),
            i.gzhead
              ? (R(
                  i,
                  (i.gzhead.text ? 1 : 0) +
                    (i.gzhead.hcrc ? 2 : 0) +
                    (i.gzhead.extra ? 4 : 0) +
                    (i.gzhead.name ? 8 : 0) +
                    (i.gzhead.comment ? 16 : 0)
                ),
                R(i, i.gzhead.time & 255),
                R(i, (i.gzhead.time >> 8) & 255),
                R(i, (i.gzhead.time >> 16) & 255),
                R(i, (i.gzhead.time >> 24) & 255),
                R(
                  i,
                  i.level === 9 ? 2 : i.strategy >= or || i.level < 2 ? 4 : 0
                ),
                R(i, i.gzhead.os & 255),
                i.gzhead.extra &&
                  i.gzhead.extra.length &&
                  (R(i, i.gzhead.extra.length & 255),
                  R(i, (i.gzhead.extra.length >> 8) & 255)),
                i.gzhead.hcrc &&
                  (e.adler = we(e.adler, i.pending_buf, i.pending, 0)),
                (i.gzindex = 0),
                (i.status = Ei))
              : (R(i, 0),
                R(i, 0),
                R(i, 0),
                R(i, 0),
                R(i, 0),
                R(
                  i,
                  i.level === 9 ? 2 : i.strategy >= or || i.level < 2 ? 4 : 0
                ),
                R(i, Dl),
                (i.status = Ne));
        else {
          var s = (fr + ((i.w_bits - 8) << 4)) << 8,
            o = -1;
          i.strategy >= or || i.level < 2
            ? (o = 0)
            : i.level < 6
              ? (o = 1)
              : i.level === 6
                ? (o = 2)
                : (o = 3),
            (s |= o << 6),
            i.strstart !== 0 && (s |= Tl),
            (s += 31 - (s % 31)),
            (i.status = Ne),
            Dt(i, s),
            i.strstart !== 0 && (Dt(i, e.adler >>> 16), Dt(i, e.adler & 65535)),
            (e.adler = 1);
        }
      if (i.status === Ei)
        if (i.gzhead.extra) {
          for (
            n = i.pending;
            i.gzindex < (i.gzhead.extra.length & 65535) &&
            !(
              i.pending === i.pending_buf_size &&
              (i.gzhead.hcrc &&
                i.pending > n &&
                (e.adler = we(e.adler, i.pending_buf, i.pending - n, n)),
              Re(e),
              (n = i.pending),
              i.pending === i.pending_buf_size)
            );

          )
            R(i, i.gzhead.extra[i.gzindex] & 255), i.gzindex++;
          i.gzhead.hcrc &&
            i.pending > n &&
            (e.adler = we(e.adler, i.pending_buf, i.pending - n, n)),
            i.gzindex === i.gzhead.extra.length &&
              ((i.gzindex = 0), (i.status = ur));
        } else i.status = ur;
      if (i.status === ur)
        if (i.gzhead.name) {
          n = i.pending;
          do {
            if (
              i.pending === i.pending_buf_size &&
              (i.gzhead.hcrc &&
                i.pending > n &&
                (e.adler = we(e.adler, i.pending_buf, i.pending - n, n)),
              Re(e),
              (n = i.pending),
              i.pending === i.pending_buf_size)
            ) {
              a = 1;
              break;
            }
            i.gzindex < i.gzhead.name.length
              ? (a = i.gzhead.name.charCodeAt(i.gzindex++) & 255)
              : (a = 0),
              R(i, a);
          } while (a !== 0);
          i.gzhead.hcrc &&
            i.pending > n &&
            (e.adler = we(e.adler, i.pending_buf, i.pending - n, n)),
            a === 0 && ((i.gzindex = 0), (i.status = cr));
        } else i.status = cr;
      if (i.status === cr)
        if (i.gzhead.comment) {
          n = i.pending;
          do {
            if (
              i.pending === i.pending_buf_size &&
              (i.gzhead.hcrc &&
                i.pending > n &&
                (e.adler = we(e.adler, i.pending_buf, i.pending - n, n)),
              Re(e),
              (n = i.pending),
              i.pending === i.pending_buf_size)
            ) {
              a = 1;
              break;
            }
            i.gzindex < i.gzhead.comment.length
              ? (a = i.gzhead.comment.charCodeAt(i.gzindex++) & 255)
              : (a = 0),
              R(i, a);
          } while (a !== 0);
          i.gzhead.hcrc &&
            i.pending > n &&
            (e.adler = we(e.adler, i.pending_buf, i.pending - n, n)),
            a === 0 && (i.status = dr);
        } else i.status = dr;
      if (
        (i.status === dr &&
          (i.gzhead.hcrc
            ? (i.pending + 2 > i.pending_buf_size && Re(e),
              i.pending + 2 <= i.pending_buf_size &&
                (R(i, e.adler & 255),
                R(i, (e.adler >> 8) & 255),
                (e.adler = 0),
                (i.status = Ne)))
            : (i.status = Ne)),
        i.pending !== 0)
      ) {
        if ((Re(e), e.avail_out === 0)) return (i.last_flush = -1), se;
      } else if (e.avail_in === 0 && Ta(r) <= Ta(t) && r !== Se)
        return je(e, bi);
      if (i.status === Ct && e.avail_in !== 0) return je(e, bi);
      if (
        e.avail_in !== 0 ||
        i.lookahead !== 0 ||
        (r !== ze && i.status !== Ct)
      ) {
        var u =
          i.strategy === or
            ? Nl(i, r)
            : i.strategy === ml
              ? zl(i, r)
              : it[i.level].func(i, r);
        if (((u === Pe || u === tt) && (i.status = Ct), u === P || u === Pe))
          return e.avail_out === 0 && (i.last_flush = -1), se;
        if (
          u === Tt &&
          (r === hl
            ? X._tr_align(i)
            : r !== Aa &&
              (X._tr_stored_block(i, 0, 0, !1),
              r === pl &&
                (Oe(i.head),
                i.lookahead === 0 &&
                  ((i.strstart = 0), (i.block_start = 0), (i.insert = 0)))),
          Re(e),
          e.avail_out === 0)
        )
          return (i.last_flush = -1), se;
      }
      return r !== Se
        ? se
        : i.wrap <= 0
          ? Ca
          : (i.wrap === 2
              ? (R(i, e.adler & 255),
                R(i, (e.adler >> 8) & 255),
                R(i, (e.adler >> 16) & 255),
                R(i, (e.adler >> 24) & 255),
                R(i, e.total_in & 255),
                R(i, (e.total_in >> 8) & 255),
                R(i, (e.total_in >> 16) & 255),
                R(i, (e.total_in >> 24) & 255))
              : (Dt(i, e.adler >>> 16), Dt(i, e.adler & 65535)),
            Re(e),
            i.wrap > 0 && (i.wrap = -i.wrap),
            i.pending !== 0 ? se : Ca);
    }
    function Zl(e) {
      var r;
      return !e || !e.state
        ? V
        : ((r = e.state.status),
          r !== lr &&
          r !== Ei &&
          r !== ur &&
          r !== cr &&
          r !== dr &&
          r !== Ne &&
          r !== Ct
            ? je(e, V)
            : ((e.state = null), r === Ne ? je(e, _l) : se));
    }
    function ql(e, r) {
      var t = r.length,
        i,
        n,
        a,
        s,
        o,
        u,
        f,
        l;
      if (
        !e ||
        !e.state ||
        ((i = e.state),
        (s = i.wrap),
        s === 2 || (s === 1 && i.status !== lr) || i.lookahead)
      )
        return V;
      for (
        s === 1 && (e.adler = Ra(e.adler, r, t, 0)),
          i.wrap = 0,
          t >= i.w_size &&
            (s === 0 &&
              (Oe(i.head),
              (i.strstart = 0),
              (i.block_start = 0),
              (i.insert = 0)),
            (l = new M.Buf8(i.w_size)),
            M.arraySet(l, r, t - i.w_size, i.w_size, 0),
            (r = l),
            (t = i.w_size)),
          o = e.avail_in,
          u = e.next_in,
          f = e.input,
          e.avail_in = t,
          e.next_in = 0,
          e.input = r,
          Be(i);
        i.lookahead >= j;

      ) {
        (n = i.strstart), (a = i.lookahead - (j - 1));
        do
          (i.ins_h =
            ((i.ins_h << i.hash_shift) ^ i.window[n + j - 1]) & i.hash_mask),
            (i.prev[n & i.w_mask] = i.head[i.ins_h]),
            (i.head[i.ins_h] = n),
            n++;
        while (--a);
        (i.strstart = n), (i.lookahead = j - 1), Be(i);
      }
      return (
        (i.strstart += i.lookahead),
        (i.block_start = i.strstart),
        (i.insert = i.lookahead),
        (i.lookahead = 0),
        (i.match_length = i.prev_length = j - 1),
        (i.match_available = 0),
        (e.next_in = u),
        (e.input = f),
        (e.avail_in = o),
        (i.wrap = s),
        se
      );
    }
    ae.deflateInit = Ul;
    ae.deflateInit2 = za;
    ae.deflateReset = Fa;
    ae.deflateResetKeep = Ia;
    ae.deflateSetHeader = Ll;
    ae.deflate = Ml;
    ae.deflateEnd = Zl;
    ae.deflateSetDictionary = ql;
    ae.deflateInfo = 'pako deflate (from Nodeca project)';
  });
  var wi = _((nt) => {
    'use strict';
    var hr = ce(),
      Pa = !0,
      Ba = !0;
    try {
      String.fromCharCode.apply(null, [0]);
    } catch (e) {
      Pa = !1;
    }
    try {
      String.fromCharCode.apply(null, new Uint8Array(1));
    } catch (e) {
      Ba = !1;
    }
    var It = new hr.Buf8(256);
    for (var Ae = 0; Ae < 256; Ae++)
      It[Ae] =
        Ae >= 252
          ? 6
          : Ae >= 248
            ? 5
            : Ae >= 240
              ? 4
              : Ae >= 224
                ? 3
                : Ae >= 192
                  ? 2
                  : 1;
    It[254] = It[254] = 1;
    nt.string2buf = function (e) {
      var r,
        t,
        i,
        n,
        a,
        s = e.length,
        o = 0;
      for (n = 0; n < s; n++)
        (t = e.charCodeAt(n)),
          (t & 64512) == 55296 &&
            n + 1 < s &&
            ((i = e.charCodeAt(n + 1)),
            (i & 64512) == 56320 &&
              ((t = 65536 + ((t - 55296) << 10) + (i - 56320)), n++)),
          (o += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4);
      for (r = new hr.Buf8(o), a = 0, n = 0; a < o; n++)
        (t = e.charCodeAt(n)),
          (t & 64512) == 55296 &&
            n + 1 < s &&
            ((i = e.charCodeAt(n + 1)),
            (i & 64512) == 56320 &&
              ((t = 65536 + ((t - 55296) << 10) + (i - 56320)), n++)),
          t < 128
            ? (r[a++] = t)
            : t < 2048
              ? ((r[a++] = 192 | (t >>> 6)), (r[a++] = 128 | (t & 63)))
              : t < 65536
                ? ((r[a++] = 224 | (t >>> 12)),
                  (r[a++] = 128 | ((t >>> 6) & 63)),
                  (r[a++] = 128 | (t & 63)))
                : ((r[a++] = 240 | (t >>> 18)),
                  (r[a++] = 128 | ((t >>> 12) & 63)),
                  (r[a++] = 128 | ((t >>> 6) & 63)),
                  (r[a++] = 128 | (t & 63)));
      return r;
    };
    function La(e, r) {
      if (r < 65534 && ((e.subarray && Ba) || (!e.subarray && Pa)))
        return String.fromCharCode.apply(null, hr.shrinkBuf(e, r));
      for (var t = '', i = 0; i < r; i++) t += String.fromCharCode(e[i]);
      return t;
    }
    nt.buf2binstring = function (e) {
      return La(e, e.length);
    };
    nt.binstring2buf = function (e) {
      for (var r = new hr.Buf8(e.length), t = 0, i = r.length; t < i; t++)
        r[t] = e.charCodeAt(t);
      return r;
    };
    nt.buf2string = function (e, r) {
      var t,
        i,
        n,
        a,
        s = r || e.length,
        o = new Array(s * 2);
      for (i = 0, t = 0; t < s; ) {
        if (((n = e[t++]), n < 128)) {
          o[i++] = n;
          continue;
        }
        if (((a = It[n]), a > 4)) {
          (o[i++] = 65533), (t += a - 1);
          continue;
        }
        for (n &= a === 2 ? 31 : a === 3 ? 15 : 7; a > 1 && t < s; )
          (n = (n << 6) | (e[t++] & 63)), a--;
        if (a > 1) {
          o[i++] = 65533;
          continue;
        }
        n < 65536
          ? (o[i++] = n)
          : ((n -= 65536),
            (o[i++] = 55296 | ((n >> 10) & 1023)),
            (o[i++] = 56320 | (n & 1023)));
      }
      return La(o, i);
    };
    nt.utf8border = function (e, r) {
      var t;
      for (
        r = r || e.length, r > e.length && (r = e.length), t = r - 1;
        t >= 0 && (e[t] & 192) == 128;

      )
        t--;
      return t < 0 || t === 0 ? r : t + It[e[t]] > r ? t : r;
    };
  });
  var Si = _((sd, Ua) => {
    'use strict';
    function Wl() {
      (this.input = null),
        (this.next_in = 0),
        (this.avail_in = 0),
        (this.total_in = 0),
        (this.output = null),
        (this.next_out = 0),
        (this.avail_out = 0),
        (this.total_out = 0),
        (this.msg = ''),
        (this.state = null),
        (this.data_type = 2),
        (this.adler = 0);
    }
    Ua.exports = Wl;
  });
  var Wa = _((Ft) => {
    'use strict';
    var zt = Na(),
      Nt = ce(),
      ki = wi(),
      ji = sr(),
      $l = Si(),
      Ma = Object.prototype.toString,
      Hl = 0,
      Oi = 4,
      at = 0,
      Za = 1,
      qa = 2,
      Gl = -1,
      Xl = 0,
      Vl = 8;
    function Le(e) {
      if (!(this instanceof Le)) return new Le(e);
      this.options = Nt.assign(
        {
          level: Gl,
          method: Vl,
          chunkSize: 16384,
          windowBits: 15,
          memLevel: 8,
          strategy: Xl,
          to: '',
        },
        e || {}
      );
      var r = this.options;
      r.raw && r.windowBits > 0
        ? (r.windowBits = -r.windowBits)
        : r.gzip &&
          r.windowBits > 0 &&
          r.windowBits < 16 &&
          (r.windowBits += 16),
        (this.err = 0),
        (this.msg = ''),
        (this.ended = !1),
        (this.chunks = []),
        (this.strm = new $l()),
        (this.strm.avail_out = 0);
      var t = zt.deflateInit2(
        this.strm,
        r.level,
        r.method,
        r.windowBits,
        r.memLevel,
        r.strategy
      );
      if (t !== at) throw new Error(ji[t]);
      if (
        (r.header && zt.deflateSetHeader(this.strm, r.header), r.dictionary)
      ) {
        var i;
        if (
          (typeof r.dictionary == 'string'
            ? (i = ki.string2buf(r.dictionary))
            : Ma.call(r.dictionary) === '[object ArrayBuffer]'
              ? (i = new Uint8Array(r.dictionary))
              : (i = r.dictionary),
          (t = zt.deflateSetDictionary(this.strm, i)),
          t !== at)
        )
          throw new Error(ji[t]);
        this._dict_set = !0;
      }
    }
    Le.prototype.push = function (e, r) {
      var t = this.strm,
        i = this.options.chunkSize,
        n,
        a;
      if (this.ended) return !1;
      (a = r === ~~r ? r : r === !0 ? Oi : Hl),
        typeof e == 'string'
          ? (t.input = ki.string2buf(e))
          : Ma.call(e) === '[object ArrayBuffer]'
            ? (t.input = new Uint8Array(e))
            : (t.input = e),
        (t.next_in = 0),
        (t.avail_in = t.input.length);
      do {
        if (
          (t.avail_out === 0 &&
            ((t.output = new Nt.Buf8(i)), (t.next_out = 0), (t.avail_out = i)),
          (n = zt.deflate(t, a)),
          n !== Za && n !== at)
        )
          return this.onEnd(n), (this.ended = !0), !1;
        (t.avail_out === 0 || (t.avail_in === 0 && (a === Oi || a === qa))) &&
          (this.options.to === 'string'
            ? this.onData(ki.buf2binstring(Nt.shrinkBuf(t.output, t.next_out)))
            : this.onData(Nt.shrinkBuf(t.output, t.next_out)));
      } while ((t.avail_in > 0 || t.avail_out === 0) && n !== Za);
      return a === Oi
        ? ((n = zt.deflateEnd(this.strm)),
          this.onEnd(n),
          (this.ended = !0),
          n === at)
        : (a === qa && (this.onEnd(at), (t.avail_out = 0)), !0);
    };
    Le.prototype.onData = function (e) {
      this.chunks.push(e);
    };
    Le.prototype.onEnd = function (e) {
      e === at &&
        (this.options.to === 'string'
          ? (this.result = this.chunks.join(''))
          : (this.result = Nt.flattenChunks(this.chunks))),
        (this.chunks = []),
        (this.err = e),
        (this.msg = this.strm.msg);
    };
    function Ri(e, r) {
      var t = new Le(r);
      if ((t.push(e, !0), t.err)) throw t.msg || ji[t.err];
      return t.result;
    }
    function Yl(e, r) {
      return (r = r || {}), (r.raw = !0), Ri(e, r);
    }
    function Jl(e, r) {
      return (r = r || {}), (r.gzip = !0), Ri(e, r);
    }
    Ft.Deflate = Le;
    Ft.deflate = Ri;
    Ft.deflateRaw = Yl;
    Ft.gzip = Jl;
  });
  var Ha = _((fd, $a) => {
    'use strict';
    var pr = 30,
      Kl = 12;
    $a.exports = function (r, t) {
      var i,
        n,
        a,
        s,
        o,
        u,
        f,
        l,
        p,
        c,
        d,
        b,
        m,
        x,
        v,
        O,
        A,
        y,
        h,
        S,
        w,
        E,
        k,
        D,
        g;
      (i = r.state),
        (n = r.next_in),
        (D = r.input),
        (a = n + (r.avail_in - 5)),
        (s = r.next_out),
        (g = r.output),
        (o = s - (t - r.avail_out)),
        (u = s + (r.avail_out - 257)),
        (f = i.dmax),
        (l = i.wsize),
        (p = i.whave),
        (c = i.wnext),
        (d = i.window),
        (b = i.hold),
        (m = i.bits),
        (x = i.lencode),
        (v = i.distcode),
        (O = (1 << i.lenbits) - 1),
        (A = (1 << i.distbits) - 1);
      e: do {
        m < 15 && ((b += D[n++] << m), (m += 8), (b += D[n++] << m), (m += 8)),
          (y = x[b & O]);
        t: for (;;) {
          if (
            ((h = y >>> 24),
            (b >>>= h),
            (m -= h),
            (h = (y >>> 16) & 255),
            h === 0)
          )
            g[s++] = y & 65535;
          else if (h & 16) {
            (S = y & 65535),
              (h &= 15),
              h &&
                (m < h && ((b += D[n++] << m), (m += 8)),
                (S += b & ((1 << h) - 1)),
                (b >>>= h),
                (m -= h)),
              m < 15 &&
                ((b += D[n++] << m), (m += 8), (b += D[n++] << m), (m += 8)),
              (y = v[b & A]);
            r: for (;;) {
              if (
                ((h = y >>> 24),
                (b >>>= h),
                (m -= h),
                (h = (y >>> 16) & 255),
                h & 16)
              ) {
                if (
                  ((w = y & 65535),
                  (h &= 15),
                  m < h &&
                    ((b += D[n++] << m),
                    (m += 8),
                    m < h && ((b += D[n++] << m), (m += 8))),
                  (w += b & ((1 << h) - 1)),
                  w > f)
                ) {
                  (r.msg = 'invalid distance too far back'), (i.mode = pr);
                  break e;
                }
                if (((b >>>= h), (m -= h), (h = s - o), w > h)) {
                  if (((h = w - h), h > p && i.sane)) {
                    (r.msg = 'invalid distance too far back'), (i.mode = pr);
                    break e;
                  }
                  if (((E = 0), (k = d), c === 0)) {
                    if (((E += l - h), h < S)) {
                      S -= h;
                      do g[s++] = d[E++];
                      while (--h);
                      (E = s - w), (k = g);
                    }
                  } else if (c < h) {
                    if (((E += l + c - h), (h -= c), h < S)) {
                      S -= h;
                      do g[s++] = d[E++];
                      while (--h);
                      if (((E = 0), c < S)) {
                        (h = c), (S -= h);
                        do g[s++] = d[E++];
                        while (--h);
                        (E = s - w), (k = g);
                      }
                    }
                  } else if (((E += c - h), h < S)) {
                    S -= h;
                    do g[s++] = d[E++];
                    while (--h);
                    (E = s - w), (k = g);
                  }
                  for (; S > 2; )
                    (g[s++] = k[E++]),
                      (g[s++] = k[E++]),
                      (g[s++] = k[E++]),
                      (S -= 3);
                  S && ((g[s++] = k[E++]), S > 1 && (g[s++] = k[E++]));
                } else {
                  E = s - w;
                  do
                    (g[s++] = g[E++]),
                      (g[s++] = g[E++]),
                      (g[s++] = g[E++]),
                      (S -= 3);
                  while (S > 2);
                  S && ((g[s++] = g[E++]), S > 1 && (g[s++] = g[E++]));
                }
              } else if ((h & 64) == 0) {
                y = v[(y & 65535) + (b & ((1 << h) - 1))];
                continue r;
              } else {
                (r.msg = 'invalid distance code'), (i.mode = pr);
                break e;
              }
              break;
            }
          } else if ((h & 64) == 0) {
            y = x[(y & 65535) + (b & ((1 << h) - 1))];
            continue t;
          } else if (h & 32) {
            i.mode = Kl;
            break e;
          } else {
            (r.msg = 'invalid literal/length code'), (i.mode = pr);
            break e;
          }
          break;
        }
      } while (n < a && s < u);
      (S = m >> 3),
        (n -= S),
        (m -= S << 3),
        (b &= (1 << m) - 1),
        (r.next_in = n),
        (r.next_out = s),
        (r.avail_in = n < a ? 5 + (a - n) : 5 - (n - a)),
        (r.avail_out = s < u ? 257 + (u - s) : 257 - (s - u)),
        (i.hold = b),
        (i.bits = m);
    };
  });
  var Qa = _((ld, Ga) => {
    'use strict';
    var Xa = ce(),
      st = 15,
      Va = 852,
      Ya = 592,
      Ja = 0,
      Ai = 1,
      Ka = 2,
      Ql = [
        3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59,
        67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0,
      ],
      eu = [
        16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19,
        19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78,
      ],
      tu = [
        1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385,
        513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577,
        0, 0,
      ],
      ru = [
        16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23,
        24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64,
      ];
    Ga.exports = function (r, t, i, n, a, s, o, u) {
      var f = u.bits,
        l = 0,
        p = 0,
        c = 0,
        d = 0,
        b = 0,
        m = 0,
        x = 0,
        v = 0,
        O = 0,
        A = 0,
        y,
        h,
        S,
        w,
        E,
        k = null,
        D = 0,
        g,
        q = new Xa.Buf16(st + 1),
        He = new Xa.Buf16(st + 1),
        Wt = null,
        an = 0,
        sn,
        $t,
        Ht;
      for (l = 0; l <= st; l++) q[l] = 0;
      for (p = 0; p < n; p++) q[t[i + p]]++;
      for (b = f, d = st; d >= 1 && q[d] === 0; d--);
      if ((b > d && (b = d), d === 0))
        return (
          (a[s++] = (1 << 24) | (64 << 16) | 0),
          (a[s++] = (1 << 24) | (64 << 16) | 0),
          (u.bits = 1),
          0
        );
      for (c = 1; c < d && q[c] === 0; c++);
      for (b < c && (b = c), v = 1, l = 1; l <= st; l++)
        if (((v <<= 1), (v -= q[l]), v < 0)) return -1;
      if (v > 0 && (r === Ja || d !== 1)) return -1;
      for (He[1] = 0, l = 1; l < st; l++) He[l + 1] = He[l] + q[l];
      for (p = 0; p < n; p++) t[i + p] !== 0 && (o[He[t[i + p]]++] = p);
      if (
        (r === Ja
          ? ((k = Wt = o), (g = 19))
          : r === Ai
            ? ((k = Ql), (D -= 257), (Wt = eu), (an -= 257), (g = 256))
            : ((k = tu), (Wt = ru), (g = -1)),
        (A = 0),
        (p = 0),
        (l = c),
        (E = s),
        (m = b),
        (x = 0),
        (S = -1),
        (O = 1 << b),
        (w = O - 1),
        (r === Ai && O > Va) || (r === Ka && O > Ya))
      )
        return 1;
      for (;;) {
        (sn = l - x),
          o[p] < g
            ? (($t = 0), (Ht = o[p]))
            : o[p] > g
              ? (($t = Wt[an + o[p]]), (Ht = k[D + o[p]]))
              : (($t = 32 + 64), (Ht = 0)),
          (y = 1 << (l - x)),
          (h = 1 << m),
          (c = h);
        do (h -= y), (a[E + (A >> x) + h] = (sn << 24) | ($t << 16) | Ht | 0);
        while (h !== 0);
        for (y = 1 << (l - 1); A & y; ) y >>= 1;
        if ((y !== 0 ? ((A &= y - 1), (A += y)) : (A = 0), p++, --q[l] == 0)) {
          if (l === d) break;
          l = t[i + o[p]];
        }
        if (l > b && (A & w) !== S) {
          for (
            x === 0 && (x = b), E += c, m = l - x, v = 1 << m;
            m + x < d && ((v -= q[m + x]), !(v <= 0));

          )
            m++, (v <<= 1);
          if (((O += 1 << m), (r === Ai && O > Va) || (r === Ka && O > Ya)))
            return 1;
          (S = A & w), (a[S] = (b << 24) | (m << 16) | (E - s) | 0);
        }
      }
      return (
        A !== 0 && (a[E + A] = ((l - x) << 24) | (64 << 16) | 0),
        (u.bits = b),
        0
      );
    };
  });
  var Fs = _((ee) => {
    'use strict';
    var G = ce(),
      Ci = gi(),
      fe = mi(),
      iu = Ha(),
      Pt = Qa(),
      nu = 0,
      es = 1,
      ts = 2,
      rs = 4,
      au = 5,
      _r = 6,
      Ue = 0,
      su = 1,
      ou = 2,
      Y = -2,
      is = -3,
      Ti = -4,
      fu = -5,
      ns = 8,
      as = 1,
      ss = 2,
      os = 3,
      fs = 4,
      ls = 5,
      us = 6,
      cs = 7,
      ds = 8,
      hs = 9,
      ps = 10,
      vr = 11,
      he = 12,
      Di = 13,
      _s = 14,
      Ii = 15,
      vs = 16,
      gs = 17,
      ms = 18,
      bs = 19,
      gr = 20,
      mr = 21,
      xs = 22,
      Es = 23,
      ys = 24,
      ws = 25,
      Ss = 26,
      Fi = 27,
      ks = 28,
      js = 29,
      I = 30,
      zi = 31,
      lu = 32,
      uu = 852,
      cu = 592,
      du = 15,
      hu = du;
    function Os(e) {
      return (
        ((e >>> 24) & 255) +
        ((e >>> 8) & 65280) +
        ((e & 65280) << 8) +
        ((e & 255) << 24)
      );
    }
    function pu() {
      (this.mode = 0),
        (this.last = !1),
        (this.wrap = 0),
        (this.havedict = !1),
        (this.flags = 0),
        (this.dmax = 0),
        (this.check = 0),
        (this.total = 0),
        (this.head = null),
        (this.wbits = 0),
        (this.wsize = 0),
        (this.whave = 0),
        (this.wnext = 0),
        (this.window = null),
        (this.hold = 0),
        (this.bits = 0),
        (this.length = 0),
        (this.offset = 0),
        (this.extra = 0),
        (this.lencode = null),
        (this.distcode = null),
        (this.lenbits = 0),
        (this.distbits = 0),
        (this.ncode = 0),
        (this.nlen = 0),
        (this.ndist = 0),
        (this.have = 0),
        (this.next = null),
        (this.lens = new G.Buf16(320)),
        (this.work = new G.Buf16(288)),
        (this.lendyn = null),
        (this.distdyn = null),
        (this.sane = 0),
        (this.back = 0),
        (this.was = 0);
    }
    function Rs(e) {
      var r;
      return !e || !e.state
        ? Y
        : ((r = e.state),
          (e.total_in = e.total_out = r.total = 0),
          (e.msg = ''),
          r.wrap && (e.adler = r.wrap & 1),
          (r.mode = as),
          (r.last = 0),
          (r.havedict = 0),
          (r.dmax = 32768),
          (r.head = null),
          (r.hold = 0),
          (r.bits = 0),
          (r.lencode = r.lendyn = new G.Buf32(uu)),
          (r.distcode = r.distdyn = new G.Buf32(cu)),
          (r.sane = 1),
          (r.back = -1),
          Ue);
    }
    function As(e) {
      var r;
      return !e || !e.state
        ? Y
        : ((r = e.state), (r.wsize = 0), (r.whave = 0), (r.wnext = 0), Rs(e));
    }
    function Cs(e, r) {
      var t, i;
      return !e ||
        !e.state ||
        ((i = e.state),
        r < 0 ? ((t = 0), (r = -r)) : ((t = (r >> 4) + 1), r < 48 && (r &= 15)),
        r && (r < 8 || r > 15))
        ? Y
        : (i.window !== null && i.wbits !== r && (i.window = null),
          (i.wrap = t),
          (i.wbits = r),
          As(e));
    }
    function Ts(e, r) {
      var t, i;
      return e
        ? ((i = new pu()),
          (e.state = i),
          (i.window = null),
          (t = Cs(e, r)),
          t !== Ue && (e.state = null),
          t)
        : Y;
    }
    function _u(e) {
      return Ts(e, hu);
    }
    var Ds = !0,
      Ni,
      Pi;
    function vu(e) {
      if (Ds) {
        var r;
        for (Ni = new G.Buf32(512), Pi = new G.Buf32(32), r = 0; r < 144; )
          e.lens[r++] = 8;
        for (; r < 256; ) e.lens[r++] = 9;
        for (; r < 280; ) e.lens[r++] = 7;
        for (; r < 288; ) e.lens[r++] = 8;
        for (
          Pt(es, e.lens, 0, 288, Ni, 0, e.work, { bits: 9 }), r = 0;
          r < 32;

        )
          e.lens[r++] = 5;
        Pt(ts, e.lens, 0, 32, Pi, 0, e.work, { bits: 5 }), (Ds = !1);
      }
      (e.lencode = Ni), (e.lenbits = 9), (e.distcode = Pi), (e.distbits = 5);
    }
    function Is(e, r, t, i) {
      var n,
        a = e.state;
      return (
        a.window === null &&
          ((a.wsize = 1 << a.wbits),
          (a.wnext = 0),
          (a.whave = 0),
          (a.window = new G.Buf8(a.wsize))),
        i >= a.wsize
          ? (G.arraySet(a.window, r, t - a.wsize, a.wsize, 0),
            (a.wnext = 0),
            (a.whave = a.wsize))
          : ((n = a.wsize - a.wnext),
            n > i && (n = i),
            G.arraySet(a.window, r, t - i, n, a.wnext),
            (i -= n),
            i
              ? (G.arraySet(a.window, r, t - i, i, 0),
                (a.wnext = i),
                (a.whave = a.wsize))
              : ((a.wnext += n),
                a.wnext === a.wsize && (a.wnext = 0),
                a.whave < a.wsize && (a.whave += n))),
        0
      );
    }
    function gu(e, r) {
      var t,
        i,
        n,
        a,
        s,
        o,
        u,
        f,
        l,
        p,
        c,
        d,
        b,
        m,
        x = 0,
        v,
        O,
        A,
        y,
        h,
        S,
        w,
        E,
        k = new G.Buf8(4),
        D,
        g,
        q = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
      if (!e || !e.state || !e.output || (!e.input && e.avail_in !== 0))
        return Y;
      (t = e.state),
        t.mode === he && (t.mode = Di),
        (s = e.next_out),
        (n = e.output),
        (u = e.avail_out),
        (a = e.next_in),
        (i = e.input),
        (o = e.avail_in),
        (f = t.hold),
        (l = t.bits),
        (p = o),
        (c = u),
        (E = Ue);
      e: for (;;)
        switch (t.mode) {
          case as:
            if (t.wrap === 0) {
              t.mode = Di;
              break;
            }
            for (; l < 16; ) {
              if (o === 0) break e;
              o--, (f += i[a++] << l), (l += 8);
            }
            if (t.wrap & 2 && f === 35615) {
              (t.check = 0),
                (k[0] = f & 255),
                (k[1] = (f >>> 8) & 255),
                (t.check = fe(t.check, k, 2, 0)),
                (f = 0),
                (l = 0),
                (t.mode = ss);
              break;
            }
            if (
              ((t.flags = 0),
              t.head && (t.head.done = !1),
              !(t.wrap & 1) || (((f & 255) << 8) + (f >> 8)) % 31)
            ) {
              (e.msg = 'incorrect header check'), (t.mode = I);
              break;
            }
            if ((f & 15) !== ns) {
              (e.msg = 'unknown compression method'), (t.mode = I);
              break;
            }
            if (((f >>>= 4), (l -= 4), (w = (f & 15) + 8), t.wbits === 0))
              t.wbits = w;
            else if (w > t.wbits) {
              (e.msg = 'invalid window size'), (t.mode = I);
              break;
            }
            (t.dmax = 1 << w),
              (e.adler = t.check = 1),
              (t.mode = f & 512 ? ps : he),
              (f = 0),
              (l = 0);
            break;
          case ss:
            for (; l < 16; ) {
              if (o === 0) break e;
              o--, (f += i[a++] << l), (l += 8);
            }
            if (((t.flags = f), (t.flags & 255) !== ns)) {
              (e.msg = 'unknown compression method'), (t.mode = I);
              break;
            }
            if (t.flags & 57344) {
              (e.msg = 'unknown header flags set'), (t.mode = I);
              break;
            }
            t.head && (t.head.text = (f >> 8) & 1),
              t.flags & 512 &&
                ((k[0] = f & 255),
                (k[1] = (f >>> 8) & 255),
                (t.check = fe(t.check, k, 2, 0))),
              (f = 0),
              (l = 0),
              (t.mode = os);
          case os:
            for (; l < 32; ) {
              if (o === 0) break e;
              o--, (f += i[a++] << l), (l += 8);
            }
            t.head && (t.head.time = f),
              t.flags & 512 &&
                ((k[0] = f & 255),
                (k[1] = (f >>> 8) & 255),
                (k[2] = (f >>> 16) & 255),
                (k[3] = (f >>> 24) & 255),
                (t.check = fe(t.check, k, 4, 0))),
              (f = 0),
              (l = 0),
              (t.mode = fs);
          case fs:
            for (; l < 16; ) {
              if (o === 0) break e;
              o--, (f += i[a++] << l), (l += 8);
            }
            t.head && ((t.head.xflags = f & 255), (t.head.os = f >> 8)),
              t.flags & 512 &&
                ((k[0] = f & 255),
                (k[1] = (f >>> 8) & 255),
                (t.check = fe(t.check, k, 2, 0))),
              (f = 0),
              (l = 0),
              (t.mode = ls);
          case ls:
            if (t.flags & 1024) {
              for (; l < 16; ) {
                if (o === 0) break e;
                o--, (f += i[a++] << l), (l += 8);
              }
              (t.length = f),
                t.head && (t.head.extra_len = f),
                t.flags & 512 &&
                  ((k[0] = f & 255),
                  (k[1] = (f >>> 8) & 255),
                  (t.check = fe(t.check, k, 2, 0))),
                (f = 0),
                (l = 0);
            } else t.head && (t.head.extra = null);
            t.mode = us;
          case us:
            if (
              t.flags & 1024 &&
              ((d = t.length),
              d > o && (d = o),
              d &&
                (t.head &&
                  ((w = t.head.extra_len - t.length),
                  t.head.extra || (t.head.extra = new Array(t.head.extra_len)),
                  G.arraySet(t.head.extra, i, a, d, w)),
                t.flags & 512 && (t.check = fe(t.check, i, d, a)),
                (o -= d),
                (a += d),
                (t.length -= d)),
              t.length)
            )
              break e;
            (t.length = 0), (t.mode = cs);
          case cs:
            if (t.flags & 2048) {
              if (o === 0) break e;
              d = 0;
              do
                (w = i[a + d++]),
                  t.head &&
                    w &&
                    t.length < 65536 &&
                    (t.head.name += String.fromCharCode(w));
              while (w && d < o);
              if (
                (t.flags & 512 && (t.check = fe(t.check, i, d, a)),
                (o -= d),
                (a += d),
                w)
              )
                break e;
            } else t.head && (t.head.name = null);
            (t.length = 0), (t.mode = ds);
          case ds:
            if (t.flags & 4096) {
              if (o === 0) break e;
              d = 0;
              do
                (w = i[a + d++]),
                  t.head &&
                    w &&
                    t.length < 65536 &&
                    (t.head.comment += String.fromCharCode(w));
              while (w && d < o);
              if (
                (t.flags & 512 && (t.check = fe(t.check, i, d, a)),
                (o -= d),
                (a += d),
                w)
              )
                break e;
            } else t.head && (t.head.comment = null);
            t.mode = hs;
          case hs:
            if (t.flags & 512) {
              for (; l < 16; ) {
                if (o === 0) break e;
                o--, (f += i[a++] << l), (l += 8);
              }
              if (f !== (t.check & 65535)) {
                (e.msg = 'header crc mismatch'), (t.mode = I);
                break;
              }
              (f = 0), (l = 0);
            }
            t.head && ((t.head.hcrc = (t.flags >> 9) & 1), (t.head.done = !0)),
              (e.adler = t.check = 0),
              (t.mode = he);
            break;
          case ps:
            for (; l < 32; ) {
              if (o === 0) break e;
              o--, (f += i[a++] << l), (l += 8);
            }
            (e.adler = t.check = Os(f)), (f = 0), (l = 0), (t.mode = vr);
          case vr:
            if (t.havedict === 0)
              return (
                (e.next_out = s),
                (e.avail_out = u),
                (e.next_in = a),
                (e.avail_in = o),
                (t.hold = f),
                (t.bits = l),
                ou
              );
            (e.adler = t.check = 1), (t.mode = he);
          case he:
            if (r === au || r === _r) break e;
          case Di:
            if (t.last) {
              (f >>>= l & 7), (l -= l & 7), (t.mode = Fi);
              break;
            }
            for (; l < 3; ) {
              if (o === 0) break e;
              o--, (f += i[a++] << l), (l += 8);
            }
            switch (((t.last = f & 1), (f >>>= 1), (l -= 1), f & 3)) {
              case 0:
                t.mode = _s;
                break;
              case 1:
                if ((vu(t), (t.mode = gr), r === _r)) {
                  (f >>>= 2), (l -= 2);
                  break e;
                }
                break;
              case 2:
                t.mode = gs;
                break;
              case 3:
                (e.msg = 'invalid block type'), (t.mode = I);
            }
            (f >>>= 2), (l -= 2);
            break;
          case _s:
            for (f >>>= l & 7, l -= l & 7; l < 32; ) {
              if (o === 0) break e;
              o--, (f += i[a++] << l), (l += 8);
            }
            if ((f & 65535) != ((f >>> 16) ^ 65535)) {
              (e.msg = 'invalid stored block lengths'), (t.mode = I);
              break;
            }
            if (
              ((t.length = f & 65535),
              (f = 0),
              (l = 0),
              (t.mode = Ii),
              r === _r)
            )
              break e;
          case Ii:
            t.mode = vs;
          case vs:
            if (((d = t.length), d)) {
              if ((d > o && (d = o), d > u && (d = u), d === 0)) break e;
              G.arraySet(n, i, a, d, s),
                (o -= d),
                (a += d),
                (u -= d),
                (s += d),
                (t.length -= d);
              break;
            }
            t.mode = he;
            break;
          case gs:
            for (; l < 14; ) {
              if (o === 0) break e;
              o--, (f += i[a++] << l), (l += 8);
            }
            if (
              ((t.nlen = (f & 31) + 257),
              (f >>>= 5),
              (l -= 5),
              (t.ndist = (f & 31) + 1),
              (f >>>= 5),
              (l -= 5),
              (t.ncode = (f & 15) + 4),
              (f >>>= 4),
              (l -= 4),
              t.nlen > 286 || t.ndist > 30)
            ) {
              (e.msg = 'too many length or distance symbols'), (t.mode = I);
              break;
            }
            (t.have = 0), (t.mode = ms);
          case ms:
            for (; t.have < t.ncode; ) {
              for (; l < 3; ) {
                if (o === 0) break e;
                o--, (f += i[a++] << l), (l += 8);
              }
              (t.lens[q[t.have++]] = f & 7), (f >>>= 3), (l -= 3);
            }
            for (; t.have < 19; ) t.lens[q[t.have++]] = 0;
            if (
              ((t.lencode = t.lendyn),
              (t.lenbits = 7),
              (D = { bits: t.lenbits }),
              (E = Pt(nu, t.lens, 0, 19, t.lencode, 0, t.work, D)),
              (t.lenbits = D.bits),
              E)
            ) {
              (e.msg = 'invalid code lengths set'), (t.mode = I);
              break;
            }
            (t.have = 0), (t.mode = bs);
          case bs:
            for (; t.have < t.nlen + t.ndist; ) {
              for (
                ;
                (x = t.lencode[f & ((1 << t.lenbits) - 1)]),
                  (v = x >>> 24),
                  (O = (x >>> 16) & 255),
                  (A = x & 65535),
                  !(v <= l);

              ) {
                if (o === 0) break e;
                o--, (f += i[a++] << l), (l += 8);
              }
              if (A < 16) (f >>>= v), (l -= v), (t.lens[t.have++] = A);
              else {
                if (A === 16) {
                  for (g = v + 2; l < g; ) {
                    if (o === 0) break e;
                    o--, (f += i[a++] << l), (l += 8);
                  }
                  if (((f >>>= v), (l -= v), t.have === 0)) {
                    (e.msg = 'invalid bit length repeat'), (t.mode = I);
                    break;
                  }
                  (w = t.lens[t.have - 1]),
                    (d = 3 + (f & 3)),
                    (f >>>= 2),
                    (l -= 2);
                } else if (A === 17) {
                  for (g = v + 3; l < g; ) {
                    if (o === 0) break e;
                    o--, (f += i[a++] << l), (l += 8);
                  }
                  (f >>>= v),
                    (l -= v),
                    (w = 0),
                    (d = 3 + (f & 7)),
                    (f >>>= 3),
                    (l -= 3);
                } else {
                  for (g = v + 7; l < g; ) {
                    if (o === 0) break e;
                    o--, (f += i[a++] << l), (l += 8);
                  }
                  (f >>>= v),
                    (l -= v),
                    (w = 0),
                    (d = 11 + (f & 127)),
                    (f >>>= 7),
                    (l -= 7);
                }
                if (t.have + d > t.nlen + t.ndist) {
                  (e.msg = 'invalid bit length repeat'), (t.mode = I);
                  break;
                }
                for (; d--; ) t.lens[t.have++] = w;
              }
            }
            if (t.mode === I) break;
            if (t.lens[256] === 0) {
              (e.msg = 'invalid code -- missing end-of-block'), (t.mode = I);
              break;
            }
            if (
              ((t.lenbits = 9),
              (D = { bits: t.lenbits }),
              (E = Pt(es, t.lens, 0, t.nlen, t.lencode, 0, t.work, D)),
              (t.lenbits = D.bits),
              E)
            ) {
              (e.msg = 'invalid literal/lengths set'), (t.mode = I);
              break;
            }
            if (
              ((t.distbits = 6),
              (t.distcode = t.distdyn),
              (D = { bits: t.distbits }),
              (E = Pt(ts, t.lens, t.nlen, t.ndist, t.distcode, 0, t.work, D)),
              (t.distbits = D.bits),
              E)
            ) {
              (e.msg = 'invalid distances set'), (t.mode = I);
              break;
            }
            if (((t.mode = gr), r === _r)) break e;
          case gr:
            t.mode = mr;
          case mr:
            if (o >= 6 && u >= 258) {
              (e.next_out = s),
                (e.avail_out = u),
                (e.next_in = a),
                (e.avail_in = o),
                (t.hold = f),
                (t.bits = l),
                iu(e, c),
                (s = e.next_out),
                (n = e.output),
                (u = e.avail_out),
                (a = e.next_in),
                (i = e.input),
                (o = e.avail_in),
                (f = t.hold),
                (l = t.bits),
                t.mode === he && (t.back = -1);
              break;
            }
            for (
              t.back = 0;
              (x = t.lencode[f & ((1 << t.lenbits) - 1)]),
                (v = x >>> 24),
                (O = (x >>> 16) & 255),
                (A = x & 65535),
                !(v <= l);

            ) {
              if (o === 0) break e;
              o--, (f += i[a++] << l), (l += 8);
            }
            if (O && (O & 240) == 0) {
              for (
                y = v, h = O, S = A;
                (x = t.lencode[S + ((f & ((1 << (y + h)) - 1)) >> y)]),
                  (v = x >>> 24),
                  (O = (x >>> 16) & 255),
                  (A = x & 65535),
                  !(y + v <= l);

              ) {
                if (o === 0) break e;
                o--, (f += i[a++] << l), (l += 8);
              }
              (f >>>= y), (l -= y), (t.back += y);
            }
            if (
              ((f >>>= v), (l -= v), (t.back += v), (t.length = A), O === 0)
            ) {
              t.mode = Ss;
              break;
            }
            if (O & 32) {
              (t.back = -1), (t.mode = he);
              break;
            }
            if (O & 64) {
              (e.msg = 'invalid literal/length code'), (t.mode = I);
              break;
            }
            (t.extra = O & 15), (t.mode = xs);
          case xs:
            if (t.extra) {
              for (g = t.extra; l < g; ) {
                if (o === 0) break e;
                o--, (f += i[a++] << l), (l += 8);
              }
              (t.length += f & ((1 << t.extra) - 1)),
                (f >>>= t.extra),
                (l -= t.extra),
                (t.back += t.extra);
            }
            (t.was = t.length), (t.mode = Es);
          case Es:
            for (
              ;
              (x = t.distcode[f & ((1 << t.distbits) - 1)]),
                (v = x >>> 24),
                (O = (x >>> 16) & 255),
                (A = x & 65535),
                !(v <= l);

            ) {
              if (o === 0) break e;
              o--, (f += i[a++] << l), (l += 8);
            }
            if ((O & 240) == 0) {
              for (
                y = v, h = O, S = A;
                (x = t.distcode[S + ((f & ((1 << (y + h)) - 1)) >> y)]),
                  (v = x >>> 24),
                  (O = (x >>> 16) & 255),
                  (A = x & 65535),
                  !(y + v <= l);

              ) {
                if (o === 0) break e;
                o--, (f += i[a++] << l), (l += 8);
              }
              (f >>>= y), (l -= y), (t.back += y);
            }
            if (((f >>>= v), (l -= v), (t.back += v), O & 64)) {
              (e.msg = 'invalid distance code'), (t.mode = I);
              break;
            }
            (t.offset = A), (t.extra = O & 15), (t.mode = ys);
          case ys:
            if (t.extra) {
              for (g = t.extra; l < g; ) {
                if (o === 0) break e;
                o--, (f += i[a++] << l), (l += 8);
              }
              (t.offset += f & ((1 << t.extra) - 1)),
                (f >>>= t.extra),
                (l -= t.extra),
                (t.back += t.extra);
            }
            if (t.offset > t.dmax) {
              (e.msg = 'invalid distance too far back'), (t.mode = I);
              break;
            }
            t.mode = ws;
          case ws:
            if (u === 0) break e;
            if (((d = c - u), t.offset > d)) {
              if (((d = t.offset - d), d > t.whave && t.sane)) {
                (e.msg = 'invalid distance too far back'), (t.mode = I);
                break;
              }
              d > t.wnext
                ? ((d -= t.wnext), (b = t.wsize - d))
                : (b = t.wnext - d),
                d > t.length && (d = t.length),
                (m = t.window);
            } else (m = n), (b = s - t.offset), (d = t.length);
            d > u && (d = u), (u -= d), (t.length -= d);
            do n[s++] = m[b++];
            while (--d);
            t.length === 0 && (t.mode = mr);
            break;
          case Ss:
            if (u === 0) break e;
            (n[s++] = t.length), u--, (t.mode = mr);
            break;
          case Fi:
            if (t.wrap) {
              for (; l < 32; ) {
                if (o === 0) break e;
                o--, (f |= i[a++] << l), (l += 8);
              }
              if (
                ((c -= u),
                (e.total_out += c),
                (t.total += c),
                c &&
                  (e.adler = t.check =
                    t.flags
                      ? fe(t.check, n, c, s - c)
                      : Ci(t.check, n, c, s - c)),
                (c = u),
                (t.flags ? f : Os(f)) !== t.check)
              ) {
                (e.msg = 'incorrect data check'), (t.mode = I);
                break;
              }
              (f = 0), (l = 0);
            }
            t.mode = ks;
          case ks:
            if (t.wrap && t.flags) {
              for (; l < 32; ) {
                if (o === 0) break e;
                o--, (f += i[a++] << l), (l += 8);
              }
              if (f !== (t.total & 4294967295)) {
                (e.msg = 'incorrect length check'), (t.mode = I);
                break;
              }
              (f = 0), (l = 0);
            }
            t.mode = js;
          case js:
            E = su;
            break e;
          case I:
            E = is;
            break e;
          case zi:
            return Ti;
          case lu:
          default:
            return Y;
        }
      return (
        (e.next_out = s),
        (e.avail_out = u),
        (e.next_in = a),
        (e.avail_in = o),
        (t.hold = f),
        (t.bits = l),
        (t.wsize ||
          (c !== e.avail_out && t.mode < I && (t.mode < Fi || r !== rs))) &&
        Is(e, e.output, e.next_out, c - e.avail_out)
          ? ((t.mode = zi), Ti)
          : ((p -= e.avail_in),
            (c -= e.avail_out),
            (e.total_in += p),
            (e.total_out += c),
            (t.total += c),
            t.wrap &&
              c &&
              (e.adler = t.check =
                t.flags
                  ? fe(t.check, n, c, e.next_out - c)
                  : Ci(t.check, n, c, e.next_out - c)),
            (e.data_type =
              t.bits +
              (t.last ? 64 : 0) +
              (t.mode === he ? 128 : 0) +
              (t.mode === gr || t.mode === Ii ? 256 : 0)),
            ((p === 0 && c === 0) || r === rs) && E === Ue && (E = fu),
            E)
      );
    }
    function mu(e) {
      if (!e || !e.state) return Y;
      var r = e.state;
      return r.window && (r.window = null), (e.state = null), Ue;
    }
    function bu(e, r) {
      var t;
      return !e || !e.state || ((t = e.state), (t.wrap & 2) == 0)
        ? Y
        : ((t.head = r), (r.done = !1), Ue);
    }
    function xu(e, r) {
      var t = r.length,
        i,
        n,
        a;
      return !e || !e.state || ((i = e.state), i.wrap !== 0 && i.mode !== vr)
        ? Y
        : i.mode === vr && ((n = 1), (n = Ci(n, r, t, 0)), n !== i.check)
          ? is
          : ((a = Is(e, r, t, t)),
            a ? ((i.mode = zi), Ti) : ((i.havedict = 1), Ue));
    }
    ee.inflateReset = As;
    ee.inflateReset2 = Cs;
    ee.inflateResetKeep = Rs;
    ee.inflateInit = _u;
    ee.inflateInit2 = Ts;
    ee.inflate = gu;
    ee.inflateEnd = mu;
    ee.inflateGetHeader = bu;
    ee.inflateSetDictionary = xu;
    ee.inflateInfo = 'pako inflate (from Nodeca project)';
  });
  var Bi = _((cd, zs) => {
    'use strict';
    zs.exports = {
      Z_NO_FLUSH: 0,
      Z_PARTIAL_FLUSH: 1,
      Z_SYNC_FLUSH: 2,
      Z_FULL_FLUSH: 3,
      Z_FINISH: 4,
      Z_BLOCK: 5,
      Z_TREES: 6,
      Z_OK: 0,
      Z_STREAM_END: 1,
      Z_NEED_DICT: 2,
      Z_ERRNO: -1,
      Z_STREAM_ERROR: -2,
      Z_DATA_ERROR: -3,
      Z_BUF_ERROR: -5,
      Z_NO_COMPRESSION: 0,
      Z_BEST_SPEED: 1,
      Z_BEST_COMPRESSION: 9,
      Z_DEFAULT_COMPRESSION: -1,
      Z_FILTERED: 1,
      Z_HUFFMAN_ONLY: 2,
      Z_RLE: 3,
      Z_FIXED: 4,
      Z_DEFAULT_STRATEGY: 0,
      Z_BINARY: 0,
      Z_TEXT: 1,
      Z_UNKNOWN: 2,
      Z_DEFLATED: 8,
    };
  });
  var Ps = _((dd, Ns) => {
    'use strict';
    function Eu() {
      (this.text = 0),
        (this.time = 0),
        (this.xflags = 0),
        (this.os = 0),
        (this.extra = null),
        (this.extra_len = 0),
        (this.name = ''),
        (this.comment = ''),
        (this.hcrc = 0),
        (this.done = !1);
    }
    Ns.exports = Eu;
  });
  var Ls = _((Bt) => {
    'use strict';
    var ot = Fs(),
      Lt = ce(),
      br = wi(),
      z = Bi(),
      Li = sr(),
      yu = Si(),
      wu = Ps(),
      Bs = Object.prototype.toString;
    function Me(e) {
      if (!(this instanceof Me)) return new Me(e);
      this.options = Lt.assign(
        { chunkSize: 16384, windowBits: 0, to: '' },
        e || {}
      );
      var r = this.options;
      r.raw &&
        r.windowBits >= 0 &&
        r.windowBits < 16 &&
        ((r.windowBits = -r.windowBits),
        r.windowBits === 0 && (r.windowBits = -15)),
        r.windowBits >= 0 &&
          r.windowBits < 16 &&
          !(e && e.windowBits) &&
          (r.windowBits += 32),
        r.windowBits > 15 &&
          r.windowBits < 48 &&
          (r.windowBits & 15) == 0 &&
          (r.windowBits |= 15),
        (this.err = 0),
        (this.msg = ''),
        (this.ended = !1),
        (this.chunks = []),
        (this.strm = new yu()),
        (this.strm.avail_out = 0);
      var t = ot.inflateInit2(this.strm, r.windowBits);
      if (t !== z.Z_OK) throw new Error(Li[t]);
      if (
        ((this.header = new wu()),
        ot.inflateGetHeader(this.strm, this.header),
        r.dictionary &&
          (typeof r.dictionary == 'string'
            ? (r.dictionary = br.string2buf(r.dictionary))
            : Bs.call(r.dictionary) === '[object ArrayBuffer]' &&
              (r.dictionary = new Uint8Array(r.dictionary)),
          r.raw &&
            ((t = ot.inflateSetDictionary(this.strm, r.dictionary)),
            t !== z.Z_OK)))
      )
        throw new Error(Li[t]);
    }
    Me.prototype.push = function (e, r) {
      var t = this.strm,
        i = this.options.chunkSize,
        n = this.options.dictionary,
        a,
        s,
        o,
        u,
        f,
        l = !1;
      if (this.ended) return !1;
      (s = r === ~~r ? r : r === !0 ? z.Z_FINISH : z.Z_NO_FLUSH),
        typeof e == 'string'
          ? (t.input = br.binstring2buf(e))
          : Bs.call(e) === '[object ArrayBuffer]'
            ? (t.input = new Uint8Array(e))
            : (t.input = e),
        (t.next_in = 0),
        (t.avail_in = t.input.length);
      do {
        if (
          (t.avail_out === 0 &&
            ((t.output = new Lt.Buf8(i)), (t.next_out = 0), (t.avail_out = i)),
          (a = ot.inflate(t, z.Z_NO_FLUSH)),
          a === z.Z_NEED_DICT &&
            n &&
            (a = ot.inflateSetDictionary(this.strm, n)),
          a === z.Z_BUF_ERROR && l === !0 && ((a = z.Z_OK), (l = !1)),
          a !== z.Z_STREAM_END && a !== z.Z_OK)
        )
          return this.onEnd(a), (this.ended = !0), !1;
        t.next_out &&
          (t.avail_out === 0 ||
            a === z.Z_STREAM_END ||
            (t.avail_in === 0 && (s === z.Z_FINISH || s === z.Z_SYNC_FLUSH))) &&
          (this.options.to === 'string'
            ? ((o = br.utf8border(t.output, t.next_out)),
              (u = t.next_out - o),
              (f = br.buf2string(t.output, o)),
              (t.next_out = u),
              (t.avail_out = i - u),
              u && Lt.arraySet(t.output, t.output, o, u, 0),
              this.onData(f))
            : this.onData(Lt.shrinkBuf(t.output, t.next_out))),
          t.avail_in === 0 && t.avail_out === 0 && (l = !0);
      } while ((t.avail_in > 0 || t.avail_out === 0) && a !== z.Z_STREAM_END);
      return (
        a === z.Z_STREAM_END && (s = z.Z_FINISH),
        s === z.Z_FINISH
          ? ((a = ot.inflateEnd(this.strm)),
            this.onEnd(a),
            (this.ended = !0),
            a === z.Z_OK)
          : (s === z.Z_SYNC_FLUSH && (this.onEnd(z.Z_OK), (t.avail_out = 0)),
            !0)
      );
    };
    Me.prototype.onData = function (e) {
      this.chunks.push(e);
    };
    Me.prototype.onEnd = function (e) {
      e === z.Z_OK &&
        (this.options.to === 'string'
          ? (this.result = this.chunks.join(''))
          : (this.result = Lt.flattenChunks(this.chunks))),
        (this.chunks = []),
        (this.err = e),
        (this.msg = this.strm.msg);
    };
    function Ui(e, r) {
      var t = new Me(r);
      if ((t.push(e, !0), t.err)) throw t.msg || Li[t.err];
      return t.result;
    }
    function Su(e, r) {
      return (r = r || {}), (r.raw = !0), Ui(e, r);
    }
    Bt.Inflate = Me;
    Bt.inflate = Ui;
    Bt.inflateRaw = Su;
    Bt.ungzip = Ui;
  });
  var Zs = _((pd, Us) => {
    'use strict';
    var ku = ce().assign,
      ju = Wa(),
      Ou = Ls(),
      Ru = Bi(),
      Ms = {};
    ku(Ms, ju, Ou, Ru);
    Us.exports = Ms;
  });
  var Ws = _((xr) => {
    'use strict';
    var Au =
        typeof Uint8Array != 'undefined' &&
        typeof Uint16Array != 'undefined' &&
        typeof Uint32Array != 'undefined',
      Cu = Zs(),
      qs = F(),
      Er = H(),
      Tu = Au ? 'uint8array' : 'array';
    xr.magic = '\b\0';
    function Ze(e, r) {
      Er.call(this, 'FlateWorker/' + e),
        (this._pako = null),
        (this._pakoAction = e),
        (this._pakoOptions = r),
        (this.meta = {});
    }
    qs.inherits(Ze, Er);
    Ze.prototype.processChunk = function (e) {
      (this.meta = e.meta),
        this._pako === null && this._createPako(),
        this._pako.push(qs.transformTo(Tu, e.data), !1);
    };
    Ze.prototype.flush = function () {
      Er.prototype.flush.call(this),
        this._pako === null && this._createPako(),
        this._pako.push([], !0);
    };
    Ze.prototype.cleanUp = function () {
      Er.prototype.cleanUp.call(this), (this._pako = null);
    };
    Ze.prototype._createPako = function () {
      this._pako = new Cu[this._pakoAction]({
        raw: !0,
        level: this._pakoOptions.level || -1,
      });
      var e = this;
      this._pako.onData = function (r) {
        e.push({ data: r, meta: e.meta });
      };
    };
    xr.compressWorker = function (e) {
      return new Ze('Deflate', e);
    };
    xr.uncompressWorker = function () {
      return new Ze('Inflate', {});
    };
  });
  var Zi = _((Mi) => {
    'use strict';
    var $s = H();
    Mi.STORE = {
      magic: '\0\0',
      compressWorker: function (e) {
        return new $s('STORE compression');
      },
      uncompressWorker: function () {
        return new $s('STORE decompression');
      },
    };
    Mi.DEFLATE = Ws();
  });
  var qi = _((qe) => {
    'use strict';
    qe.LOCAL_FILE_HEADER = 'PK';
    qe.CENTRAL_FILE_HEADER = 'PK';
    qe.CENTRAL_DIRECTORY_END = 'PK';
    qe.ZIP64_CENTRAL_DIRECTORY_LOCATOR = 'PK\x07';
    qe.ZIP64_CENTRAL_DIRECTORY_END = 'PK';
    qe.DATA_DESCRIPTOR = 'PK\x07\b';
  });
  var Vs = _((md, Hs) => {
    'use strict';
    var ft = F(),
      lt = H(),
      Wi = De(),
      Gs = rr(),
      yr = qi(),
      T = function (e, r) {
        var t = '',
          i;
        for (i = 0; i < r; i++)
          (t += String.fromCharCode(e & 255)), (e = e >>> 8);
        return t;
      },
      Du = function (e, r) {
        var t = e;
        return e || (t = r ? 16893 : 33204), (t & 65535) << 16;
      },
      Iu = function (e, r) {
        return (e || 0) & 63;
      },
      Xs = function (e, r, t, i, n, a) {
        var s = e.file,
          o = e.compression,
          u = a !== Wi.utf8encode,
          f = ft.transformTo('string', a(s.name)),
          l = ft.transformTo('string', Wi.utf8encode(s.name)),
          p = s.comment,
          c = ft.transformTo('string', a(p)),
          d = ft.transformTo('string', Wi.utf8encode(p)),
          b = l.length !== s.name.length,
          m = d.length !== p.length,
          x,
          v,
          O = '',
          A = '',
          y = '',
          h = s.dir,
          S = s.date,
          w = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
        (!r || t) &&
          ((w.crc32 = e.crc32),
          (w.compressedSize = e.compressedSize),
          (w.uncompressedSize = e.uncompressedSize));
        var E = 0;
        r && (E |= 8), !u && (b || m) && (E |= 2048);
        var k = 0,
          D = 0;
        h && (k |= 16),
          n === 'UNIX'
            ? ((D = 798), (k |= Du(s.unixPermissions, h)))
            : ((D = 20), (k |= Iu(s.dosPermissions, h))),
          (x = S.getUTCHours()),
          (x = x << 6),
          (x = x | S.getUTCMinutes()),
          (x = x << 5),
          (x = x | (S.getUTCSeconds() / 2)),
          (v = S.getUTCFullYear() - 1980),
          (v = v << 4),
          (v = v | (S.getUTCMonth() + 1)),
          (v = v << 5),
          (v = v | S.getUTCDate()),
          b &&
            ((A = T(1, 1) + T(Gs(f), 4) + l), (O += 'up' + T(A.length, 2) + A)),
          m &&
            ((y = T(1, 1) + T(Gs(c), 4) + d), (O += 'uc' + T(y.length, 2) + y));
        var g = '';
        (g += `
\0`),
          (g += T(E, 2)),
          (g += o.magic),
          (g += T(x, 2)),
          (g += T(v, 2)),
          (g += T(w.crc32, 4)),
          (g += T(w.compressedSize, 4)),
          (g += T(w.uncompressedSize, 4)),
          (g += T(f.length, 2)),
          (g += T(O.length, 2));
        var q = yr.LOCAL_FILE_HEADER + g + f + O,
          He =
            yr.CENTRAL_FILE_HEADER +
            T(D, 2) +
            g +
            T(c.length, 2) +
            '\0\0\0\0' +
            T(k, 4) +
            T(i, 4) +
            f +
            O +
            c;
        return { fileRecord: q, dirRecord: He };
      },
      Fu = function (e, r, t, i, n) {
        var a = '',
          s = ft.transformTo('string', n(i));
        return (
          (a =
            yr.CENTRAL_DIRECTORY_END +
            '\0\0\0\0' +
            T(e, 2) +
            T(e, 2) +
            T(r, 4) +
            T(t, 4) +
            T(s.length, 2) +
            s),
          a
        );
      },
      zu = function (e) {
        var r = '';
        return (
          (r =
            yr.DATA_DESCRIPTOR +
            T(e.crc32, 4) +
            T(e.compressedSize, 4) +
            T(e.uncompressedSize, 4)),
          r
        );
      };
    function te(e, r, t, i) {
      lt.call(this, 'ZipFileWorker'),
        (this.bytesWritten = 0),
        (this.zipComment = r),
        (this.zipPlatform = t),
        (this.encodeFileName = i),
        (this.streamFiles = e),
        (this.accumulate = !1),
        (this.contentBuffer = []),
        (this.dirRecords = []),
        (this.currentSourceOffset = 0),
        (this.entriesCount = 0),
        (this.currentFile = null),
        (this._sources = []);
    }
    ft.inherits(te, lt);
    te.prototype.push = function (e) {
      var r = e.meta.percent || 0,
        t = this.entriesCount,
        i = this._sources.length;
      this.accumulate
        ? this.contentBuffer.push(e)
        : ((this.bytesWritten += e.data.length),
          lt.prototype.push.call(this, {
            data: e.data,
            meta: {
              currentFile: this.currentFile,
              percent: t ? (r + 100 * (t - i - 1)) / t : 100,
            },
          }));
    };
    te.prototype.openedSource = function (e) {
      (this.currentSourceOffset = this.bytesWritten),
        (this.currentFile = e.file.name);
      var r = this.streamFiles && !e.file.dir;
      if (r) {
        var t = Xs(
          e,
          r,
          !1,
          this.currentSourceOffset,
          this.zipPlatform,
          this.encodeFileName
        );
        this.push({ data: t.fileRecord, meta: { percent: 0 } });
      } else this.accumulate = !0;
    };
    te.prototype.closedSource = function (e) {
      this.accumulate = !1;
      var r = this.streamFiles && !e.file.dir,
        t = Xs(
          e,
          r,
          !0,
          this.currentSourceOffset,
          this.zipPlatform,
          this.encodeFileName
        );
      if ((this.dirRecords.push(t.dirRecord), r))
        this.push({ data: zu(e), meta: { percent: 100 } });
      else
        for (
          this.push({ data: t.fileRecord, meta: { percent: 0 } });
          this.contentBuffer.length;

        )
          this.push(this.contentBuffer.shift());
      this.currentFile = null;
    };
    te.prototype.flush = function () {
      for (var e = this.bytesWritten, r = 0; r < this.dirRecords.length; r++)
        this.push({ data: this.dirRecords[r], meta: { percent: 100 } });
      var t = this.bytesWritten - e,
        i = Fu(
          this.dirRecords.length,
          t,
          e,
          this.zipComment,
          this.encodeFileName
        );
      this.push({ data: i, meta: { percent: 100 } });
    };
    te.prototype.prepareNextSource = function () {
      (this.previous = this._sources.shift()),
        this.openedSource(this.previous.streamInfo),
        this.isPaused ? this.previous.pause() : this.previous.resume();
    };
    te.prototype.registerPrevious = function (e) {
      this._sources.push(e);
      var r = this;
      return (
        e.on('data', function (t) {
          r.processChunk(t);
        }),
        e.on('end', function () {
          r.closedSource(r.previous.streamInfo),
            r._sources.length ? r.prepareNextSource() : r.end();
        }),
        e.on('error', function (t) {
          r.error(t);
        }),
        this
      );
    };
    te.prototype.resume = function () {
      if (!lt.prototype.resume.call(this)) return !1;
      if (!this.previous && this._sources.length)
        return this.prepareNextSource(), !0;
      if (!this.previous && !this._sources.length && !this.generatedError)
        return this.end(), !0;
    };
    te.prototype.error = function (e) {
      var r = this._sources;
      if (!lt.prototype.error.call(this, e)) return !1;
      for (var t = 0; t < r.length; t++)
        try {
          r[t].error(e);
        } catch (i) {}
      return !0;
    };
    te.prototype.lock = function () {
      lt.prototype.lock.call(this);
      for (var e = this._sources, r = 0; r < e.length; r++) e[r].lock();
    };
    Hs.exports = te;
  });
  var Js = _((Ys) => {
    'use strict';
    var Nu = Zi(),
      Pu = Vs(),
      Bu = function (e, r) {
        var t = e || r,
          i = Nu[t];
        if (!i) throw new Error(t + ' is not a valid compression method !');
        return i;
      };
    Ys.generateWorker = function (e, r, t) {
      var i = new Pu(r.streamFiles, t, r.platform, r.encodeFileName),
        n = 0;
      try {
        e.forEach(function (a, s) {
          n++;
          var o = Bu(s.options.compression, r.compression),
            u = s.options.compressionOptions || r.compressionOptions || {},
            f = s.dir,
            l = s.date;
          s._compressWorker(o, u)
            .withStreamInfo('file', {
              name: a,
              dir: f,
              date: l,
              comment: s.comment || '',
              unixPermissions: s.unixPermissions,
              dosPermissions: s.dosPermissions,
            })
            .pipe(i);
        }),
          (i.entriesCount = n);
      } catch (a) {
        i.error(a);
      }
      return i;
    };
  });
  var Qs = _((xd, Ks) => {
    'use strict';
    var Lu = F(),
      wr = H();
    function Ut(e, r) {
      wr.call(this, 'Nodejs stream input adapter for ' + e),
        (this._upstreamEnded = !1),
        this._bindStream(r);
    }
    Lu.inherits(Ut, wr);
    Ut.prototype._bindStream = function (e) {
      var r = this;
      (this._stream = e),
        e.pause(),
        e
          .on('data', function (t) {
            r.push({ data: t, meta: { percent: 0 } });
          })
          .on('error', function (t) {
            r.isPaused ? (this.generatedError = t) : r.error(t);
          })
          .on('end', function () {
            r.isPaused ? (r._upstreamEnded = !0) : r.end();
          });
    };
    Ut.prototype.pause = function () {
      return wr.prototype.pause.call(this) ? (this._stream.pause(), !0) : !1;
    };
    Ut.prototype.resume = function () {
      return wr.prototype.resume.call(this)
        ? (this._upstreamEnded ? this.end() : this._stream.resume(), !0)
        : !1;
    };
    Ks.exports = Ut;
  });
  var lo = _((Ed, eo) => {
    'use strict';
    var Uu = De(),
      Mt = F(),
      to = H(),
      Mu = Xr(),
      ro = Vr(),
      io = ir(),
      Zu = ta(),
      qu = Js(),
      no = gt(),
      Wu = Qs(),
      oo = function (e, r, t) {
        var i = Mt.getTypeOf(r),
          n,
          a = Mt.extend(t || {}, ro);
        (a.date = a.date || new Date()),
          a.compression !== null &&
            (a.compression = a.compression.toUpperCase()),
          typeof a.unixPermissions == 'string' &&
            (a.unixPermissions = parseInt(a.unixPermissions, 8)),
          a.unixPermissions && a.unixPermissions & 16384 && (a.dir = !0),
          a.dosPermissions && a.dosPermissions & 16 && (a.dir = !0),
          a.dir && (e = ao(e)),
          a.createFolders && (n = $u(e)) && so.call(this, n, !0);
        var s = i === 'string' && a.binary === !1 && a.base64 === !1;
        (!t || typeof t.binary == 'undefined') && (a.binary = !s);
        var o = r instanceof io && r.uncompressedSize === 0;
        (o || a.dir || !r || r.length === 0) &&
          ((a.base64 = !1),
          (a.binary = !0),
          (r = ''),
          (a.compression = 'STORE'),
          (i = 'string'));
        var u = null;
        r instanceof io || r instanceof to
          ? (u = r)
          : no.isNode && no.isStream(r)
            ? (u = new Wu(e, r))
            : (u = Mt.prepareContent(
                e,
                r,
                a.binary,
                a.optimizedBinaryString,
                a.base64
              ));
        var f = new Zu(e, u, a);
        this.files[e] = f;
      },
      $u = function (e) {
        e.slice(-1) === '/' && (e = e.substring(0, e.length - 1));
        var r = e.lastIndexOf('/');
        return r > 0 ? e.substring(0, r) : '';
      },
      ao = function (e) {
        return e.slice(-1) !== '/' && (e += '/'), e;
      },
      so = function (e, r) {
        return (
          (r = typeof r != 'undefined' ? r : ro.createFolders),
          (e = ao(e)),
          this.files[e] ||
            oo.call(this, e, null, { dir: !0, createFolders: r }),
          this.files[e]
        );
      };
    function fo(e) {
      return Object.prototype.toString.call(e) === '[object RegExp]';
    }
    var Hu = {
      load: function () {
        throw new Error(
          'This method has been removed in JSZip 3.0, please check the upgrade guide.'
        );
      },
      forEach: function (e) {
        var r, t, i;
        for (r in this.files)
          !this.files.hasOwnProperty(r) ||
            ((i = this.files[r]),
            (t = r.slice(this.root.length, r.length)),
            t && r.slice(0, this.root.length) === this.root && e(t, i));
      },
      filter: function (e) {
        var r = [];
        return (
          this.forEach(function (t, i) {
            e(t, i) && r.push(i);
          }),
          r
        );
      },
      file: function (e, r, t) {
        if (arguments.length === 1)
          if (fo(e)) {
            var i = e;
            return this.filter(function (a, s) {
              return !s.dir && i.test(a);
            });
          } else {
            var n = this.files[this.root + e];
            return n && !n.dir ? n : null;
          }
        else (e = this.root + e), oo.call(this, e, r, t);
        return this;
      },
      folder: function (e) {
        if (!e) return this;
        if (fo(e))
          return this.filter(function (n, a) {
            return a.dir && e.test(n);
          });
        var r = this.root + e,
          t = so.call(this, r),
          i = this.clone();
        return (i.root = t.name), i;
      },
      remove: function (e) {
        e = this.root + e;
        var r = this.files[e];
        if (
          (r || (e.slice(-1) !== '/' && (e += '/'), (r = this.files[e])),
          r && !r.dir)
        )
          delete this.files[e];
        else
          for (
            var t = this.filter(function (n, a) {
                return a.name.slice(0, e.length) === e;
              }),
              i = 0;
            i < t.length;
            i++
          )
            delete this.files[t[i].name];
        return this;
      },
      generate: function (e) {
        throw new Error(
          'This method has been removed in JSZip 3.0, please check the upgrade guide.'
        );
      },
      generateInternalStream: function (e) {
        var r,
          t = {};
        try {
          if (
            ((t = Mt.extend(e || {}, {
              streamFiles: !1,
              compression: 'STORE',
              compressionOptions: null,
              type: '',
              platform: 'DOS',
              comment: null,
              mimeType: 'application/zip',
              encodeFileName: Uu.utf8encode,
            })),
            (t.type = t.type.toLowerCase()),
            (t.compression = t.compression.toUpperCase()),
            t.type === 'binarystring' && (t.type = 'string'),
            !t.type)
          )
            throw new Error('No output type specified.');
          Mt.checkSupport(t.type),
            (t.platform === 'darwin' ||
              t.platform === 'freebsd' ||
              t.platform === 'linux' ||
              t.platform === 'sunos') &&
              (t.platform = 'UNIX'),
            t.platform === 'win32' && (t.platform = 'DOS');
          var i = t.comment || this.comment || '';
          r = qu.generateWorker(this, t, i);
        } catch (n) {
          (r = new to('error')), r.error(n);
        }
        return new Mu(r, t.type || 'string', t.mimeType);
      },
      generateAsync: function (e, r) {
        return this.generateInternalStream(e).accumulate(r);
      },
      generateNodeStream: function (e, r) {
        return (
          (e = e || {}),
          e.type || (e.type = 'nodebuffer'),
          this.generateInternalStream(e).toNodejsStream(r)
        );
      },
    };
    eo.exports = Hu;
  });
  var $i = _((yd, uo) => {
    'use strict';
    var Gu = F();
    function co(e) {
      (this.data = e),
        (this.length = e.length),
        (this.index = 0),
        (this.zero = 0);
    }
    co.prototype = {
      checkOffset: function (e) {
        this.checkIndex(this.index + e);
      },
      checkIndex: function (e) {
        if (this.length < this.zero + e || e < 0)
          throw new Error(
            'End of data reached (data length = ' +
              this.length +
              ', asked index = ' +
              e +
              '). Corrupted zip ?'
          );
      },
      setIndex: function (e) {
        this.checkIndex(e), (this.index = e);
      },
      skip: function (e) {
        this.setIndex(this.index + e);
      },
      byteAt: function (e) {},
      readInt: function (e) {
        var r = 0,
          t;
        for (this.checkOffset(e), t = this.index + e - 1; t >= this.index; t--)
          r = (r << 8) + this.byteAt(t);
        return (this.index += e), r;
      },
      readString: function (e) {
        return Gu.transformTo('string', this.readData(e));
      },
      readData: function (e) {},
      lastIndexOfSignature: function (e) {},
      readAndCheckSignature: function (e) {},
      readDate: function () {
        var e = this.readInt(4);
        return new Date(
          Date.UTC(
            ((e >> 25) & 127) + 1980,
            ((e >> 21) & 15) - 1,
            (e >> 16) & 31,
            (e >> 11) & 31,
            (e >> 5) & 63,
            (e & 31) << 1
          )
        );
      },
    };
    uo.exports = co;
  });
  var Hi = _((wd, ho) => {
    'use strict';
    var po = $i(),
      Xu = F();
    function ut(e) {
      po.call(this, e);
      for (var r = 0; r < this.data.length; r++) e[r] = e[r] & 255;
    }
    Xu.inherits(ut, po);
    ut.prototype.byteAt = function (e) {
      return this.data[this.zero + e];
    };
    ut.prototype.lastIndexOfSignature = function (e) {
      for (
        var r = e.charCodeAt(0),
          t = e.charCodeAt(1),
          i = e.charCodeAt(2),
          n = e.charCodeAt(3),
          a = this.length - 4;
        a >= 0;
        --a
      )
        if (
          this.data[a] === r &&
          this.data[a + 1] === t &&
          this.data[a + 2] === i &&
          this.data[a + 3] === n
        )
          return a - this.zero;
      return -1;
    };
    ut.prototype.readAndCheckSignature = function (e) {
      var r = e.charCodeAt(0),
        t = e.charCodeAt(1),
        i = e.charCodeAt(2),
        n = e.charCodeAt(3),
        a = this.readData(4);
      return r === a[0] && t === a[1] && i === a[2] && n === a[3];
    };
    ut.prototype.readData = function (e) {
      if ((this.checkOffset(e), e === 0)) return [];
      var r = this.data.slice(
        this.zero + this.index,
        this.zero + this.index + e
      );
      return (this.index += e), r;
    };
    ho.exports = ut;
  });
  var go = _((Sd, _o) => {
    'use strict';
    var vo = $i(),
      Vu = F();
    function ct(e) {
      vo.call(this, e);
    }
    Vu.inherits(ct, vo);
    ct.prototype.byteAt = function (e) {
      return this.data.charCodeAt(this.zero + e);
    };
    ct.prototype.lastIndexOfSignature = function (e) {
      return this.data.lastIndexOf(e) - this.zero;
    };
    ct.prototype.readAndCheckSignature = function (e) {
      var r = this.readData(4);
      return e === r;
    };
    ct.prototype.readData = function (e) {
      this.checkOffset(e);
      var r = this.data.slice(
        this.zero + this.index,
        this.zero + this.index + e
      );
      return (this.index += e), r;
    };
    _o.exports = ct;
  });
  var Xi = _((kd, mo) => {
    'use strict';
    var bo = Hi(),
      Yu = F();
    function Gi(e) {
      bo.call(this, e);
    }
    Yu.inherits(Gi, bo);
    Gi.prototype.readData = function (e) {
      if ((this.checkOffset(e), e === 0)) return new Uint8Array(0);
      var r = this.data.subarray(
        this.zero + this.index,
        this.zero + this.index + e
      );
      return (this.index += e), r;
    };
    mo.exports = Gi;
  });
  var yo = _((jd, xo) => {
    'use strict';
    var Eo = Xi(),
      Ju = F();
    function Vi(e) {
      Eo.call(this, e);
    }
    Ju.inherits(Vi, Eo);
    Vi.prototype.readData = function (e) {
      this.checkOffset(e);
      var r = this.data.slice(
        this.zero + this.index,
        this.zero + this.index + e
      );
      return (this.index += e), r;
    };
    xo.exports = Vi;
  });
  var Yi = _((Od, wo) => {
    'use strict';
    var Sr = F(),
      So = ue(),
      Ku = Hi(),
      Qu = go(),
      ec = yo(),
      tc = Xi();
    wo.exports = function (e) {
      var r = Sr.getTypeOf(e);
      return (
        Sr.checkSupport(r),
        r === 'string' && !So.uint8array
          ? new Qu(e)
          : r === 'nodebuffer'
            ? new ec(e)
            : So.uint8array
              ? new tc(Sr.transformTo('uint8array', e))
              : new Ku(Sr.transformTo('array', e))
      );
    };
  });
  var Ro = _((Rd, ko) => {
    'use strict';
    var Ji = Yi(),
      Ce = F(),
      rc = ir(),
      jo = rr(),
      kr = De(),
      jr = Zi(),
      ic = ue(),
      nc = 0,
      ac = 3,
      sc = function (e) {
        for (var r in jr)
          if (!!jr.hasOwnProperty(r) && jr[r].magic === e) return jr[r];
        return null;
      };
    function Oo(e, r) {
      (this.options = e), (this.loadOptions = r);
    }
    Oo.prototype = {
      isEncrypted: function () {
        return (this.bitFlag & 1) == 1;
      },
      useUTF8: function () {
        return (this.bitFlag & 2048) == 2048;
      },
      readLocalPart: function (e) {
        var r, t;
        if (
          (e.skip(22),
          (this.fileNameLength = e.readInt(2)),
          (t = e.readInt(2)),
          (this.fileName = e.readData(this.fileNameLength)),
          e.skip(t),
          this.compressedSize === -1 || this.uncompressedSize === -1)
        )
          throw new Error(
            "Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)"
          );
        if (((r = sc(this.compressionMethod)), r === null))
          throw new Error(
            'Corrupted zip : compression ' +
              Ce.pretty(this.compressionMethod) +
              ' unknown (inner file : ' +
              Ce.transformTo('string', this.fileName) +
              ')'
          );
        this.decompressed = new rc(
          this.compressedSize,
          this.uncompressedSize,
          this.crc32,
          r,
          e.readData(this.compressedSize)
        );
      },
      readCentralPart: function (e) {
        (this.versionMadeBy = e.readInt(2)),
          e.skip(2),
          (this.bitFlag = e.readInt(2)),
          (this.compressionMethod = e.readString(2)),
          (this.date = e.readDate()),
          (this.crc32 = e.readInt(4)),
          (this.compressedSize = e.readInt(4)),
          (this.uncompressedSize = e.readInt(4));
        var r = e.readInt(2);
        if (
          ((this.extraFieldsLength = e.readInt(2)),
          (this.fileCommentLength = e.readInt(2)),
          (this.diskNumberStart = e.readInt(2)),
          (this.internalFileAttributes = e.readInt(2)),
          (this.externalFileAttributes = e.readInt(4)),
          (this.localHeaderOffset = e.readInt(4)),
          this.isEncrypted())
        )
          throw new Error('Encrypted zip are not supported');
        e.skip(r),
          this.readExtraFields(e),
          this.parseZIP64ExtraField(e),
          (this.fileComment = e.readData(this.fileCommentLength));
      },
      processAttributes: function () {
        (this.unixPermissions = null), (this.dosPermissions = null);
        var e = this.versionMadeBy >> 8;
        (this.dir = !!(this.externalFileAttributes & 16)),
          e === nc && (this.dosPermissions = this.externalFileAttributes & 63),
          e === ac &&
            (this.unixPermissions =
              (this.externalFileAttributes >> 16) & 65535),
          !this.dir && this.fileNameStr.slice(-1) === '/' && (this.dir = !0);
      },
      parseZIP64ExtraField: function (e) {
        if (!!this.extraFields[1]) {
          var r = Ji(this.extraFields[1].value);
          this.uncompressedSize === Ce.MAX_VALUE_32BITS &&
            (this.uncompressedSize = r.readInt(8)),
            this.compressedSize === Ce.MAX_VALUE_32BITS &&
              (this.compressedSize = r.readInt(8)),
            this.localHeaderOffset === Ce.MAX_VALUE_32BITS &&
              (this.localHeaderOffset = r.readInt(8)),
            this.diskNumberStart === Ce.MAX_VALUE_32BITS &&
              (this.diskNumberStart = r.readInt(4));
        }
      },
      readExtraFields: function (e) {
        var r = e.index + this.extraFieldsLength,
          t,
          i,
          n;
        for (this.extraFields || (this.extraFields = {}); e.index + 4 < r; )
          (t = e.readInt(2)),
            (i = e.readInt(2)),
            (n = e.readData(i)),
            (this.extraFields[t] = { id: t, length: i, value: n });
        e.setIndex(r);
      },
      handleUTF8: function () {
        var e = ic.uint8array ? 'uint8array' : 'array';
        if (this.useUTF8())
          (this.fileNameStr = kr.utf8decode(this.fileName)),
            (this.fileCommentStr = kr.utf8decode(this.fileComment));
        else {
          var r = this.findExtraFieldUnicodePath();
          if (r !== null) this.fileNameStr = r;
          else {
            var t = Ce.transformTo(e, this.fileName);
            this.fileNameStr = this.loadOptions.decodeFileName(t);
          }
          var i = this.findExtraFieldUnicodeComment();
          if (i !== null) this.fileCommentStr = i;
          else {
            var n = Ce.transformTo(e, this.fileComment);
            this.fileCommentStr = this.loadOptions.decodeFileName(n);
          }
        }
      },
      findExtraFieldUnicodePath: function () {
        var e = this.extraFields[28789];
        if (e) {
          var r = Ji(e.value);
          return r.readInt(1) !== 1 || jo(this.fileName) !== r.readInt(4)
            ? null
            : kr.utf8decode(r.readData(e.length - 5));
        }
        return null;
      },
      findExtraFieldUnicodeComment: function () {
        var e = this.extraFields[25461];
        if (e) {
          var r = Ji(e.value);
          return r.readInt(1) !== 1 || jo(this.fileComment) !== r.readInt(4)
            ? null
            : kr.utf8decode(r.readData(e.length - 5));
        }
        return null;
      },
    };
    ko.exports = Oo;
  });
  var To = _((Cd, Ao) => {
    'use strict';
    var oc = Yi(),
      pe = F(),
      re = qi(),
      fc = Ro(),
      Ad = De(),
      lc = ue();
    function Co(e) {
      (this.files = []), (this.loadOptions = e);
    }
    Co.prototype = {
      checkSignature: function (e) {
        if (!this.reader.readAndCheckSignature(e)) {
          this.reader.index -= 4;
          var r = this.reader.readString(4);
          throw new Error(
            'Corrupted zip or bug: unexpected signature (' +
              pe.pretty(r) +
              ', expected ' +
              pe.pretty(e) +
              ')'
          );
        }
      },
      isSignature: function (e, r) {
        var t = this.reader.index;
        this.reader.setIndex(e);
        var i = this.reader.readString(4),
          n = i === r;
        return this.reader.setIndex(t), n;
      },
      readBlockEndOfCentral: function () {
        (this.diskNumber = this.reader.readInt(2)),
          (this.diskWithCentralDirStart = this.reader.readInt(2)),
          (this.centralDirRecordsOnThisDisk = this.reader.readInt(2)),
          (this.centralDirRecords = this.reader.readInt(2)),
          (this.centralDirSize = this.reader.readInt(4)),
          (this.centralDirOffset = this.reader.readInt(4)),
          (this.zipCommentLength = this.reader.readInt(2));
        var e = this.reader.readData(this.zipCommentLength),
          r = lc.uint8array ? 'uint8array' : 'array',
          t = pe.transformTo(r, e);
        this.zipComment = this.loadOptions.decodeFileName(t);
      },
      readBlockZip64EndOfCentral: function () {
        (this.zip64EndOfCentralSize = this.reader.readInt(8)),
          this.reader.skip(4),
          (this.diskNumber = this.reader.readInt(4)),
          (this.diskWithCentralDirStart = this.reader.readInt(4)),
          (this.centralDirRecordsOnThisDisk = this.reader.readInt(8)),
          (this.centralDirRecords = this.reader.readInt(8)),
          (this.centralDirSize = this.reader.readInt(8)),
          (this.centralDirOffset = this.reader.readInt(8)),
          (this.zip64ExtensibleData = {});
        for (var e = this.zip64EndOfCentralSize - 44, r = 0, t, i, n; r < e; )
          (t = this.reader.readInt(2)),
            (i = this.reader.readInt(4)),
            (n = this.reader.readData(i)),
            (this.zip64ExtensibleData[t] = { id: t, length: i, value: n });
      },
      readBlockZip64EndOfCentralLocator: function () {
        if (
          ((this.diskWithZip64CentralDirStart = this.reader.readInt(4)),
          (this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8)),
          (this.disksCount = this.reader.readInt(4)),
          this.disksCount > 1)
        )
          throw new Error('Multi-volumes zip are not supported');
      },
      readLocalFiles: function () {
        var e, r;
        for (e = 0; e < this.files.length; e++)
          (r = this.files[e]),
            this.reader.setIndex(r.localHeaderOffset),
            this.checkSignature(re.LOCAL_FILE_HEADER),
            r.readLocalPart(this.reader),
            r.handleUTF8(),
            r.processAttributes();
      },
      readCentralDir: function () {
        var e;
        for (
          this.reader.setIndex(this.centralDirOffset);
          this.reader.readAndCheckSignature(re.CENTRAL_FILE_HEADER);

        )
          (e = new fc({ zip64: this.zip64 }, this.loadOptions)),
            e.readCentralPart(this.reader),
            this.files.push(e);
        if (
          this.centralDirRecords !== this.files.length &&
          this.centralDirRecords !== 0 &&
          this.files.length === 0
        )
          throw new Error(
            'Corrupted zip or bug: expected ' +
              this.centralDirRecords +
              ' records in central dir, got ' +
              this.files.length
          );
      },
      readEndOfCentral: function () {
        var e = this.reader.lastIndexOfSignature(re.CENTRAL_DIRECTORY_END);
        if (e < 0) {
          var r = !this.isSignature(0, re.LOCAL_FILE_HEADER);
          throw r
            ? new Error(
                "Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"
              )
            : new Error("Corrupted zip: can't find end of central directory");
        }
        this.reader.setIndex(e);
        var t = e;
        if (
          (this.checkSignature(re.CENTRAL_DIRECTORY_END),
          this.readBlockEndOfCentral(),
          this.diskNumber === pe.MAX_VALUE_16BITS ||
            this.diskWithCentralDirStart === pe.MAX_VALUE_16BITS ||
            this.centralDirRecordsOnThisDisk === pe.MAX_VALUE_16BITS ||
            this.centralDirRecords === pe.MAX_VALUE_16BITS ||
            this.centralDirSize === pe.MAX_VALUE_32BITS ||
            this.centralDirOffset === pe.MAX_VALUE_32BITS)
        ) {
          if (
            ((this.zip64 = !0),
            (e = this.reader.lastIndexOfSignature(
              re.ZIP64_CENTRAL_DIRECTORY_LOCATOR
            )),
            e < 0)
          )
            throw new Error(
              "Corrupted zip: can't find the ZIP64 end of central directory locator"
            );
          if (
            (this.reader.setIndex(e),
            this.checkSignature(re.ZIP64_CENTRAL_DIRECTORY_LOCATOR),
            this.readBlockZip64EndOfCentralLocator(),
            !this.isSignature(
              this.relativeOffsetEndOfZip64CentralDir,
              re.ZIP64_CENTRAL_DIRECTORY_END
            ) &&
              ((this.relativeOffsetEndOfZip64CentralDir =
                this.reader.lastIndexOfSignature(
                  re.ZIP64_CENTRAL_DIRECTORY_END
                )),
              this.relativeOffsetEndOfZip64CentralDir < 0))
          )
            throw new Error(
              "Corrupted zip: can't find the ZIP64 end of central directory"
            );
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),
            this.checkSignature(re.ZIP64_CENTRAL_DIRECTORY_END),
            this.readBlockZip64EndOfCentral();
        }
        var i = this.centralDirOffset + this.centralDirSize;
        this.zip64 && ((i += 20), (i += 12 + this.zip64EndOfCentralSize));
        var n = t - i;
        if (n > 0)
          this.isSignature(t, re.CENTRAL_FILE_HEADER) || (this.reader.zero = n);
        else if (n < 0)
          throw new Error('Corrupted zip: missing ' + Math.abs(n) + ' bytes.');
      },
      prepareReader: function (e) {
        this.reader = oc(e);
      },
      load: function (e) {
        this.prepareReader(e),
          this.readEndOfCentral(),
          this.readCentralDir(),
          this.readLocalFiles();
      },
    };
    Ao.exports = Co;
  });
  var zo = _((Td, Do) => {
    'use strict';
    var Io = F(),
      Or = Xe(),
      uc = De(),
      cc = To(),
      dc = Kr(),
      Fo = gt();
    function hc(e) {
      return new Or.Promise(function (r, t) {
        var i = e.decompressed.getContentWorker().pipe(new dc());
        i.on('error', function (n) {
          t(n);
        })
          .on('end', function () {
            i.streamInfo.crc32 !== e.decompressed.crc32
              ? t(new Error('Corrupted zip : CRC32 mismatch'))
              : r();
          })
          .resume();
      });
    }
    Do.exports = function (e, r) {
      var t = this;
      return (
        (r = Io.extend(r || {}, {
          base64: !1,
          checkCRC32: !1,
          optimizedBinaryString: !1,
          createFolders: !1,
          decodeFileName: uc.utf8decode,
        })),
        Fo.isNode && Fo.isStream(e)
          ? Or.Promise.reject(
              new Error("JSZip can't accept a stream when loading a zip file.")
            )
          : Io.prepareContent(
              'the loaded zip file',
              e,
              !0,
              r.optimizedBinaryString,
              r.base64
            )
              .then(function (i) {
                var n = new cc(r);
                return n.load(i), n;
              })
              .then(function (n) {
                var a = [Or.Promise.resolve(n)],
                  s = n.files;
                if (r.checkCRC32)
                  for (var o = 0; o < s.length; o++) a.push(hc(s[o]));
                return Or.Promise.all(a);
              })
              .then(function (n) {
                for (var a = n.shift(), s = a.files, o = 0; o < s.length; o++) {
                  var u = s[o];
                  t.file(u.fileNameStr, u.decompressed, {
                    binary: !0,
                    optimizedBinaryString: !0,
                    date: u.date,
                    dir: u.dir,
                    comment: u.fileCommentStr.length ? u.fileCommentStr : null,
                    unixPermissions: u.unixPermissions,
                    dosPermissions: u.dosPermissions,
                    createFolders: r.createFolders,
                  });
                }
                return a.zipComment.length && (t.comment = a.zipComment), t;
              })
      );
    };
  });
  var Ki = _((Dd, No) => {
    'use strict';
    function J() {
      if (!(this instanceof J)) return new J();
      if (arguments.length)
        throw new Error(
          'The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.'
        );
      (this.files = {}),
        (this.comment = null),
        (this.root = ''),
        (this.clone = function () {
          var e = new J();
          for (var r in this) typeof this[r] != 'function' && (e[r] = this[r]);
          return e;
        });
    }
    J.prototype = lo();
    J.prototype.loadAsync = zo();
    J.support = ue();
    J.defaults = Vr();
    J.version = '3.6.0';
    J.loadAsync = function (e, r) {
      return new J().loadAsync(e, r);
    };
    J.external = Xe();
    No.exports = J;
  });
  var kc = {};
  on(kc, {
    Callbacks: () => ht,
    Mod: () => qt,
    ModManager: () => ge,
    loadExtension: () => nn,
    loadModFile: () => rn,
    parseModManifest: () => Cr,
  });
  if (!gdjs.callbacksFirstRuntimeSceneLoaded) {
    gdjs.callbacksFirstRuntimeSceneLoaded = [];
    let e = gdjs.RuntimeScene,
      r = !1;
    (gdjs.RuntimeScene = function (...t) {
      if ((e.apply(this, t), !r)) {
        r = !0;
        for (let i of gdjs.callbacksFirstRuntimeSceneLoaded) i(this);
      }
    }),
      Object.assign(gdjs.RuntimeScene, e),
      (gdjs.RuntimeScene.prototype = Object.create(e.prototype));
  }
  if (!gdjs.callbacksRuntimeSceneLoaded) {
    gdjs.callbacksRuntimeSceneLoaded = [];
    let e = gdjs.RuntimeScene;
    (gdjs.RuntimeScene = function (...r) {
      e.apply(this, r);
      for (let t of gdjs.callbacksRuntimeSceneLoaded) t(this);
    }),
      Object.assign(gdjs.RuntimeScene, e),
      (gdjs.RuntimeScene.prototype = Object.create(e.prototype));
  }
  if (!gdjs.callbacksRuntimeScenePreEvents) {
    gdjs.callbacksRuntimeScenePreEvents = [];
    let e = gdjs.RuntimeScene.prototype.renderAndStep;
    gdjs.RuntimeScene.prototype.renderAndStep = function (...r) {
      for (let t of gdjs.callbacksRuntimeScenePreEvents) t(this);
      return e.apply(this, r);
    };
  }
  if (!gdjs.callbacksRuntimeScenePostEvents) {
    gdjs.callbacksRuntimeScenePostEvents = [];
    let e = gdjs.RuntimeScene.prototype.renderAndStep;
    gdjs.RuntimeScene.prototype.renderAndStep = function (...r) {
      let t = e.apply(this, r);
      for (let i of gdjs.callbacksRuntimeScenePostEvents) i(this);
      return t;
    };
  }
  if (!gdjs.callbacksRuntimeSceneUnloading) {
    gdjs.callbacksRuntimeSceneUnloading = [];
    let e = gdjs.RuntimeScene.prototype.unloadScene;
    gdjs.RuntimeScene.prototype.unloadScene = function (...r) {
      for (let t of gdjs.callbacksRuntimeSceneUnloading) t(this);
      return e.apply(this, r);
    };
  }
  if (!gdjs.callbacksRuntimeSceneUnloaded) {
    gdjs.callbacksRuntimeSceneUnloaded = [];
    let e = gdjs.RuntimeScene.prototype.unloadScene;
    gdjs.RuntimeScene.prototype.unloadScene = function (...r) {
      let t = e.apply(this, r);
      for (let i of gdjs.callbacksRuntimeSceneUnloaded) i(this);
      return t;
    };
  }
  if (!gdjs.callbacksRuntimeScenePaused) {
    gdjs.callbacksRuntimeScenePaused = [];
    let e = gdjs.SceneStack.prototype.push;
    gdjs.SceneStack.prototype.push = function (...r) {
      let t = e.apply(this, r);
      for (let i of gdjs.callbacksRuntimeScenePaused) i(GDAPI.currentScene);
      return t;
    };
  }
  if (!gdjs.callbacksRuntimeSceneResumed) {
    gdjs.callbacksRuntimeSceneResumed = [];
    let e = gdjs.SceneStack.prototype.pop;
    gdjs.SceneStack.prototype.pop = function (...r) {
      let t = e.apply(this, r);
      for (let i of gdjs.callbacksRuntimeSceneResumed) i(GDAPI.currentScene);
      return t;
    };
  }
  if (!gdjs.callbacksObjectDeletedFromScene) {
    gdjs.callbacksObjectDeletedFromScene = [];
    let e = gdjs.RuntimeObject.prototype.deleteFromScene;
    gdjs.RuntimeObject.prototype.deleteFromScene = function (...r) {
      let t = e.apply(this, r);
      for (let i of gdjs.callbacksObjectDeletedFromScene) i(this);
      return t;
    };
  }
  gdjs.RuntimeScene.prototype.registerObject =
    gdjs.RuntimeScene.prototype.registerObject ||
    function (e) {
      this._objects.put(e.name, e),
        this._instances.put(e.name, []),
        this._instancesCache.put(e.name, []),
        this._objectsCtor.put(e.name, gdjs.getObjectConstructor(e.type));
    };
  PIXI.Texture.fromURL = PIXI.Texture.fromURL || PIXI.Texture.from;
  var ht = {};
  on(ht, {
    CALLBACKS: () => C,
    registerCallback: () => pt,
    unregisterCallback: () => _t,
  });
  var C;
  (function (e) {
    (e[(e.FIRST_SCENE_LOADED = 0)] = 'FIRST_SCENE_LOADED'),
      (e[(e.SCENE_LOADED = 1)] = 'SCENE_LOADED'),
      (e[(e.PRE_EVENTS = 2)] = 'PRE_EVENTS'),
      (e[(e.POST_EVENTS = 3)] = 'POST_EVENTS'),
      (e[(e.SCENE_PAUSED = 4)] = 'SCENE_PAUSED'),
      (e[(e.SCENE_RESUMED = 5)] = 'SCENE_RESUMED'),
      (e[(e.SCENE_UNLOADING = 6)] = 'SCENE_UNLOADING'),
      (e[(e.SCENE_UNLOADED = 7)] = 'SCENE_UNLOADED'),
      (e[(e.OBJECT_DELETED_FROM_SCENE = 8)] = 'OBJECT_DELETED_FROM_SCENE');
  })(C || (C = {}));
  var pt = function (e, r) {
      e === 0
        ? gdjs.callbacksFirstRuntimeSceneLoaded.push(r)
        : e === 1
          ? gdjs.callbacksRuntimeSceneLoaded.push(r)
          : e === 2
            ? gdjs.callbacksRuntimeScenePreEvents.push(r)
            : e === 3
              ? gdjs.callbacksRuntimeScenePostEvents.push(r)
              : e === 4
                ? gdjs.callbacksRuntimeScenePaused.push(r)
                : e === 5
                  ? gdjs.callbacksRuntimeSceneResumed.push(r)
                  : e === 6
                    ? gdjs.callbacksRuntimeSceneUnloading.push(r)
                    : e === 7
                      ? gdjs.callbacksRuntimeSceneUnloaded.push(r)
                      : e === 8 && gdjs.callbacksObjectDeletedFromScene.push(r);
    },
    _t = function (e, r) {
      let t;
      if (e === 0) t = gdjs.callbacksFirstRuntimeSceneLoaded;
      else if (e === 1) t = gdjs.callbacksRuntimeSceneLoaded;
      else if (e === 2) t = gdjs.callbacksRuntimeScenePreEvents;
      else if (e === 3) t = gdjs.callbacksRuntimeScenePostEvents;
      else if (e === 4) t = gdjs.callbacksRuntimeScenePaused;
      else if (e === 5) t = gdjs.callbacksRuntimeSceneResumed;
      else if (e === 6) t = gdjs.callbacksRuntimeSceneUnloading;
      else if (e === 7) t = gdjs.callbacksRuntimeSceneUnloaded;
      else if (e === 8) t = gdjs.callbacksObjectDeletedFromScene;
      else return;
      let i = t.indexOf(r);
      i !== -1 && t.splice(i, 1);
    };
  var Tr = class {
      constructor() {
        this._mods = {};
        this._callbacks = {};
      }
      static get() {
        return this.instance;
      }
      add(r, t) {
        this.has(r) && this.unload(r), (this._mods[r] = t);
        let i = (this._callbacks[r] = {});
        if (t.preEvent) {
          let n = (a) => t.preEvent(a);
          pt(C.PRE_EVENTS, n), (i.preEvent = n);
        }
        if (t.postEvent) {
          let n = (a) => t.postEvent(a);
          pt(C.POST_EVENTS, n), (i.postEvent = n);
        }
        if (t.sceneChanged) {
          let n = (a) => t.sceneChanged(a);
          pt(C.SCENE_LOADED, n), (i.sceneChanged = n);
        }
      }
      get(r) {
        return this._mods[r] || null;
      }
      has(r) {
        return r in this._mods;
      }
      unload(r) {
        let t = this._mods[r];
        if (t == null) return;
        t.unload && t.unload();
        let i = this._callbacks[r];
        i.preEvent && _t(C.PRE_EVENTS, i.preEvent),
          i.postEvent && _t(C.POST_EVENTS, i.postEvent),
          i.sceneChanged && _t(C.SCENE_LOADED, i.sceneChanged),
          delete this._callbacks[r],
          delete this._mods[r];
      }
      getAllMods() {
        return Object.values(this._mods);
      }
    },
    ge = Tr;
  ge.instance = new Tr();
  var Zo = fn(Ki());
  var pc = function (e, r) {
      return ve(this, null, function* () {
        let t = yield e.file('resources/' + r.file).async('blob'),
          i = URL.createObjectURL(t);
        GDAPI.game
          .getImageManager()
          ._loadedTextures.put(r.name, yield PIXI.Texture.fromURL(i)),
          URL.revokeObjectURL(i);
      });
    },
    Po = pc;
  var _c = (e, r) =>
      ve(void 0, null, function* () {
        let t = yield e.file('resources/' + r.file).async('blob'),
          i = GDAPI.game.getSoundManager();
        (i._availableResources[r.name] = Object.assign(
          { metadata: '', userAdded: !1 },
          r,
          { file: URL.createObjectURL(t) }
        )),
          i.hasOwnProperty('loadAudio') &&
            (i.loadAudio(r.name, !1), i.loadAudio(r.name, !0));
      }),
    Bo = _c;
  var Qi = () => Promise.resolve(),
    vc = { image: Po, audio: Bo, font: Qi, video: Qi, json: Qi },
    Lo = (e, r) => Promise.all(r.map((t) => vc[t.kind](e, t)));
  var Mo = fn(Ki());
  var gc = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
  var mc = (e) => () => e;
  function We({ test: e }) {
    return mc(e)();
  }
  function $e(e) {
    return e === null
      ? 'null'
      : e === void 0
        ? 'undefined'
        : e === ''
          ? 'an empty string'
          : JSON.stringify(e);
  }
  function Rr(e, r) {
    var t, i, n;
    return typeof r == 'number'
      ? `${(t = e == null ? void 0 : e.p) !== null && t !== void 0 ? t : '.'}[${r}]`
      : gc.test(r)
        ? `${(i = e == null ? void 0 : e.p) !== null && i !== void 0 ? i : ''}.${r}`
        : `${(n = e == null ? void 0 : e.p) !== null && n !== void 0 ? n : '.'}[${JSON.stringify(r)}]`;
  }
  function en(e, r) {
    return (t) => {
      let i = e[r];
      return (e[r] = t), en(e, r).bind(null, i);
    };
  }
  function bc(e, r) {
    return (t) => {
      e[r] = t;
    };
  }
  function le({ errors: e, p: r } = {}, t) {
    return e == null || e.push(`${r != null ? r : '.'}: ${t}`), !1;
  }
  function dt(e) {
    return We({
      test: (r, t) =>
        r !== e ? le(t, `Expected a literal (got ${$e(e)})`) : !0,
    });
  }
  var _e = () =>
    We({
      test: (e, r) =>
        typeof e != 'string' ? le(r, `Expected a string (got ${$e(e)})`) : !0,
    });
  var Ld = new Map([
    ['true', !0],
    ['True', !0],
    ['1', !0],
    [1, !0],
    ['false', !1],
    ['False', !1],
    ['0', !1],
    [0, !1],
  ]);
  var tn = (e, { delimiter: r } = {}) =>
    We({
      test: (t, i) => {
        var n;
        if (
          typeof t == 'string' &&
          typeof r != 'undefined' &&
          typeof (i == null ? void 0 : i.coercions) != 'undefined'
        ) {
          if (typeof (i == null ? void 0 : i.coercion) == 'undefined')
            return le(i, 'Unbound coercion result');
          (t = t.split(r)),
            i.coercions.push([
              (n = i.p) !== null && n !== void 0 ? n : '.',
              i.coercion.bind(null, t),
            ]);
        }
        if (!Array.isArray(t)) return le(i, `Expected an array (got ${$e(t)})`);
        let a = !0;
        for (
          let s = 0, o = t.length;
          s < o &&
          ((a =
            e(
              t[s],
              Object.assign(Object.assign({}, i), {
                p: Rr(i, s),
                coercion: en(t, s),
              })
            ) && a),
          !(!a && (i == null ? void 0 : i.errors) == null));
          ++s
        );
        return a;
      },
    });
  var Zt = (e, { extra: r = null } = {}) => {
    let t = Object.keys(e);
    return We({
      test: (i, n) => {
        if (typeof i != 'object' || i === null)
          return le(n, `Expected an object (got ${$e(i)})`);
        let a = new Set([...t, ...Object.keys(i)]),
          s = {},
          o = !0;
        for (let u of a) {
          if (u === 'constructor' || u === '__proto__')
            o = le(
              Object.assign(Object.assign({}, n), { p: Rr(n, u) }),
              'Unsafe property name'
            );
          else {
            let f = Object.prototype.hasOwnProperty.call(e, u) ? e[u] : void 0,
              l = Object.prototype.hasOwnProperty.call(i, u) ? i[u] : void 0;
            typeof f != 'undefined'
              ? (o =
                  f(
                    l,
                    Object.assign(Object.assign({}, n), {
                      p: Rr(n, u),
                      coercion: en(i, u),
                    })
                  ) && o)
              : r === null
                ? (o = le(
                    Object.assign(Object.assign({}, n), { p: Rr(n, u) }),
                    `Extraneous property (got ${$e(l)})`
                  ))
                : Object.defineProperty(s, u, {
                    enumerable: !0,
                    get: () => l,
                    set: bc(i, u),
                  });
          }
          if (!o && (n == null ? void 0 : n.errors) == null) break;
        }
        return (
          r !== null &&
            (o || (n == null ? void 0 : n.errors) != null) &&
            (o = r(s, n) && o),
          o
        );
      },
    });
  };
  var Uo = (e, { exclusive: r = !1 } = {}) =>
    We({
      test: (t, i) => {
        var n, a, s;
        let o = [],
          u =
            typeof (i == null ? void 0 : i.errors) != 'undefined' ? [] : void 0;
        for (let f = 0, l = e.length; f < l; ++f) {
          let p =
              typeof (i == null ? void 0 : i.errors) != 'undefined'
                ? []
                : void 0,
            c =
              typeof (i == null ? void 0 : i.coercions) != 'undefined'
                ? []
                : void 0;
          if (
            e[f](
              t,
              Object.assign(Object.assign({}, i), {
                errors: p,
                coercions: c,
                p: `${(n = i == null ? void 0 : i.p) !== null && n !== void 0 ? n : '.'}#${f + 1}`,
              })
            )
          ) {
            if ((o.push([`#${f + 1}`, c]), !r)) break;
          } else u == null || u.push(p[0]);
        }
        if (o.length === 1) {
          let [, f] = o[0];
          return (
            typeof f != 'undefined' &&
              ((a = i == null ? void 0 : i.coercions) === null ||
                a === void 0 ||
                a.push(...f)),
            !0
          );
        }
        return (
          o.length > 1
            ? le(
                i,
                `Expected to match exactly a single predicate (matched ${o.join(', ')})`
              )
            : (s = i == null ? void 0 : i.errors) === null ||
              s === void 0 ||
              s.push(...u),
          !1
        );
      },
    });
  var Ar;
  (function (e) {
    (e.Forbids = 'Forbids'), (e.Requires = 'Requires');
  })(Ar || (Ar = {}));
  var Ud = {
    [Ar.Forbids]: { expect: !1, message: 'forbids using' },
    [Ar.Requires]: { expect: !0, message: 'requires using' },
  };
  var xc = () =>
      We({
        test: (e, r) =>
          (typeof Blob != 'undefined' && e instanceof Blob) ||
          (typeof Buffer != 'undefined' && e instanceof Buffer) ||
          (typeof ArrayBuffer != 'undefined' && e instanceof ArrayBuffer) ||
          (typeof Uint8Array != 'undefined' && e instanceof Uint8Array)
            ? !0
            : le(r, `Expected a file (got ${$e(e)})`),
      }),
    Ec = Zt({
      name: _e(),
      file: _e(),
      kind: Uo(
        [dt('image'), dt('audio'), dt('font'), dt('video'), dt('json')],
        { exclusive: !0 }
      ),
    }),
    yc = Zt({
      mainManifest: Zt({
        name: _e(),
        description: _e(),
        version: _e(),
        author: _e(),
        uid: _e(),
      }),
      includes: tn(_e()),
      resources: tn(Ec),
    }),
    wc = Zt({ manifest: yc, file: xc() }),
    Cr = function (e) {
      return ve(this, null, function* () {
        let r = yield (0, Mo.loadAsync)(e),
          t = r.file('data/GDMod.json'),
          i = r.file('data/includes.json'),
          n = r.file('data/resources.json');
        if (t == null || i == null || n == null)
          throw new Error('A manifest file is missing! Is this a GDMod mod?');
        try {
          var a = {
            manifest: {
              mainManifest: JSON.parse(yield t.async('string')),
              includes: JSON.parse(yield i.async('string')),
              resources: JSON.parse(yield n.async('string')),
            },
            file: e,
          };
        } catch (f) {
          throw new Error(
            'A manifest could not be parsed! Make sure it is valid JSON. ' + f
          );
        }
        a.manifest.resources = a.manifest.resources.map((f) =>
          typeof f == 'string'
            ? { name: f, file: f, kind: 'image' }
            : ('kind' in f || (f.kind = 'image'),
              'name' in f || (f.name = f.file),
              f)
        );
        let s = [];
        if (!wc(a, { errors: s }))
          throw (
            (console.warn(
              'Some errors have been detected while parsing manifests: ',
              s
            ),
            new Error(
              'The manifests are invalid! See the list of errors in the console.'
            ))
          );
        let o = a.manifest.includes.filter((f) => r.file('code/' + f) === null);
        if (o.length !== 0)
          throw new Error(
            'Cannot find following include files: ' + o.join(', ')
          );
        let u = a.manifest.resources.filter(
          (f) => r.file('resources/' + f.file) === null
        );
        if (u.length !== 0)
          throw new Error(
            'Cannot find following resource files: ' +
              u.map((f) => f.file).join(', ')
          );
        return a;
      });
    };
  var qt = class {
      sceneChanged(r) {}
      preEvent(r) {}
      postEvent(r) {}
      unload() {}
    },
    rn = function (e) {
      return ve(this, null, function* () {
        let {
            manifest: { resources: r, includes: t, mainManifest: i },
            file: n,
          } = e,
          a = yield (0, Zo.loadAsync)(n);
        r.length !== 0 && (yield Lo(a, r));
        let s = !1;
        if (t.length !== 0)
          for (let o of t) {
            let u = yield a.file('code/' + o).async('string'),
              f = window.eval(`(function() {${u}})()`);
            typeof f == 'function' &&
              !s &&
              (ge.get().add(i.uid, new f()), (s = !0));
          }
        s || ge.get().add(i.uid, new qt());
      });
    };
  var qo = {
      PlatformBehavior: [
        'Extensions/PlatformBehavior/platformruntimebehavior.js',
        'Extensions/PlatformBehavior/platformerobjectruntimebehavior.js',
        'PlatformBehavior/PlatformerObjectRuntimeBehavior.h',
      ],
      DestroyOutsideBehavior: [
        'Extensions/DestroyOutsideBehavior/destroyoutsideruntimebehavior.js',
      ],
      TiledSpriteObject: [
        'Extensions/TiledSpriteObject/tiledspriteruntimeobject.js',
        'Extensions/TiledSpriteObject/tiledspriteruntimeobject-pixi-renderer.js',
      ],
      DraggableBehavior: [
        'Extensions/DraggableBehavior/draggableruntimebehavior.js',
      ],
      TopDownMovementBehavior: [
        'Extensions/TopDownMovementBehavior/topdownmovementruntimebehavior.js',
      ],
      TextObject: [
        'Extensions/TextObject/textruntimeobject.js',
        'Extensions/TextObject/textruntimeobject-pixi-renderer.js',
      ],
      ParticleSystem: [
        'Extensions/ParticleSystem/particleemitterobject.js',
        'Extensions/ParticleSystem/particleemitterobject-pixi-renderer.js',
        'Extensions/ParticleSystem/pixi-particles-pixi-renderer.min.js',
        'ParticleSystem/ParticleEmitterObject.h',
      ],
      PanelSpriteObject: [
        'Extensions/PanelSpriteObject/panelspriteruntimeobject.js',
        'Extensions/PanelSpriteObject/panelspriteruntimeobject-pixi-renderer.js',
        'PanelSpriteObject/PanelSpriteObject.h',
        'Extensions/TiledSpriteObject/panelspriteruntimeobject.js',
      ],
      AnchorBehavior: ['Extensions/AnchorBehavior/anchorruntimebehavior.js'],
      PrimitiveDrawing: [
        'Extensions/PrimitiveDrawing/shapepainterruntimeobject.js',
        'Extensions/PrimitiveDrawing/shapepainterruntimeobject-pixi-renderer.js',
        'PrimitiveDrawing/ShapePainterObject.h',
      ],
      TextEntryObject: [
        'Extensions/TextEntryObject/textentryruntimeobject.js',
        'Extensions/TextEntryObject/textentryruntimeobject-pixi-renderer.js',
        'TextObject/TextObject.h',
      ],
      Inventory: [
        'Extensions/Inventory/inventory.js',
        'Extensions/Inventory/inventorytools.js',
      ],
      LinkedObjects: ['Extensions/LinkedObjects/linkedobjects.js'],
      SystemInfo: ['Extensions/SystemInfo/systeminfotools.js'],
      Shopify: [
        'Extensions/Shopify/shopify-buy.umd.polyfilled.min.js',
        'Extensions/Shopify/shopifytools.js',
      ],
      PathfindingBehavior: [
        'Extensions/PathfindingBehavior/pathfindingruntimebehavior.js',
        'Extensions/PathfindingBehavior/pathfindingobstacleruntimebehavior.js',
        'PathfindingBehavior/PathfindingObstacleRuntimeBehavior.h',
      ],
      PhysicsBehavior: [
        'Extensions/PhysicsBehavior/box2djs/box2d.js',
        'Extensions/PhysicsBehavior/physicsruntimebehavior.js',
      ],
      AdMob: ['Extensions/AdMob/admobtools.js'],
      AdvancedWindow: [
        'Extensions/AdvancedWindow/electron-advancedwindowtools.js',
      ],
      BBText: [
        'Extensions/BBText/bbtextruntimeobject.js',
        'Extensions/BBText/bbtextruntimeobject-pixi-renderer.js',
        'Extensions/BBText/pixi-multistyle-text/dist/pixi-multistyle-text.umd.js',
      ],
      DebuggerTools: ['Extensions/DebuggerTools/debuggertools.js'],
      DeviceSensors: ['Extensions/DeviceSensors/devicesensortools.js'],
      DeviceVibration: ['Extensions/DeviceVibration/devicevibrationtools.js'],
      DialogueTree: [
        'Extensions/DialogueTree/dialoguetools.js',
        'Extensions/DialogueTree/bondage.js/dist/bondage.min.js',
      ],
      Effects: [
        'Extensions/Effects/pixi-filters/filter-adjustment.js',
        'Extensions/Effects/adjustment-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-kawase-blur.js',
        'Extensions/Effects/pixi-filters/filter-advanced-bloom.js',
        'Extensions/Effects/advanced-bloom-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-ascii.js',
        'Extensions/Effects/ascii-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-bevel.js',
        'Extensions/Effects/bevel-pixi-filter.js',
        'Extensions/Effects/black-and-white-pixi-filter.js',
        'Extensions/Effects/blending-mode-pixi-filter.js',
        'Extensions/Effects/blur-pixi-filter.js',
        'Extensions/Effects/brightness-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-bulge-pinch.js',
        'Extensions/Effects/bulge-pinch-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-crt.js',
        'Extensions/Effects/crt-pixi-filter.js',
        'Extensions/Effects/color-map-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-color-map.js',
        'Extensions/Effects/pixi-filters/filter-color-replace.js',
        'Extensions/Effects/color-replace-pixi-filter.js',
        'Extensions/Effects/displacement-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-dot.js',
        'Extensions/Effects/dot-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-drop-shadow.js',
        'Extensions/Effects/drop-shadow-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-glitch.js',
        'Extensions/Effects/glitch-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-glow.js',
        'Extensions/Effects/glow-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-godray.js',
        'Extensions/Effects/godray-pixi-filter.js',
        'Extensions/Effects/kawase-blur-pixi-filter.js',
        'Extensions/Effects/light-night-pixi-filter.js',
        'Extensions/Effects/night-pixi-filter.js',
        'Extensions/Effects/noise-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-old-film.js',
        'Extensions/Effects/old-film-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-outline.js',
        'Extensions/Effects/outline-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-pixelate.js',
        'Extensions/Effects/pixelate-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-rgb-split.js',
        'Extensions/Effects/rgb-split-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-radial-blur.js',
        'Extensions/Effects/radial-blur-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-reflection.js',
        'Extensions/Effects/reflection-pixi-filter.js',
        'Extensions/Effects/sepia-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-tilt-shift.js',
        'Extensions/Effects/tilt-shift-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-twist.js',
        'Extensions/Effects/twist-pixi-filter.js',
        'Extensions/Effects/pixi-filters/filter-zoom-blur.js',
        'Extensions/Effects/zoom-blur-pixi-filter.js',
      ],
      MyDummyExtension: [
        'Extensions/ExampleJsExtension/examplejsextensiontools.js',
        'Extensions/ExampleJsExtension/dummyeffect.js',
        'Extensions/ExampleJsExtension/dummyruntimeobject.js',
        'Extensions/ExampleJsExtension/dummyruntimeobject-pixi-renderer.js',
        'Extensions/ExampleJsExtension/dummyruntimebehavior.js',
        'Extensions/ExampleJsExtension/dummywithshareddataruntimebehavior.js',
      ],
      FacebookInstantGames: [
        'Extensions/FacebookInstantGames/facebookinstantgamestools.js',
      ],
      FileSystem: ['Extensions/FileSystem/filesystemtools.js'],
      Firebase: [
        'Extensions/Firebase/B_firebasejs/A_firebase-base.js',
        'Extensions/Firebase/B_firebasejs/B_firebase-performance.js',
        'Extensions/Firebase/C_firebasetools/C_firebasetools.js',
        'Extensions/Firebase/C_firebasetools/D_performancetools.js',
        'Extensions/Firebase/B_firebasejs/B_firebase-analytics.js',
        'Extensions/Firebase/C_firebasetools/D_analyticstools.js',
        'Extensions/Firebase/B_firebasejs/B_firebase-auth.js',
        'Extensions/Firebase/C_firebasetools/D_authtools.js',
        'Extensions/Firebase/B_firebasejs/B_firebase-functions.js',
        'Extensions/Firebase/C_firebasetools/D_functionstools.js',
        'Extensions/Firebase/B_firebasejs/B_firebase-database.js',
        'Extensions/Firebase/C_firebasetools/D_databasetools.js',
        'Extensions/Firebase/B_firebasejs/B_firebase-firestore.js',
        'Extensions/Firebase/C_firebasetools/D_cloudfirestoretools.js',
        'Extensions/Firebase/B_firebasejs/B_firebase-remote-config.js',
        'Extensions/Firebase/C_firebasetools/D_remoteconfigtools.js',
        'Extensions/Firebase/A_utils/A_UIDArray.js',
        'Extensions/Firebase/B_firebasejs/B_firebase-storage.js',
        'Extensions/Firebase/C_firebasetools/D_storagetools.js',
      ],
      Lighting: [
        'Extensions/Lighting/lightruntimeobject.js',
        'Extensions/Lighting/lightruntimeobject-pixi-renderer.js',
        'Extensions/Lighting/lightobstacleruntimebehavior.js',
      ],
      P2P: ['Extensions/P2P/A_peer.js', 'Extensions/P2P/B_p2ptools.js'],
      Physics2: [
        'Extensions/Physics2Behavior/physics2tools.js',
        'Extensions/Physics2Behavior/physics2runtimebehavior.js',
        'Extensions/Physics2Behavior/box2d.js',
      ],
      Screenshot: ['Extensions/Screenshot/screenshottools.js'],
      SpatialSound: [
        'Extensions/SpatialSound/howler.spatial.min.js',
        'Extensions/SpatialSound/spatialsoundtools.js',
      ],
      TileMap: [
        'Extensions/TileMap/tilemapruntimeobject.js',
        'Extensions/TileMap/tilemapruntimeobject-pixi-renderer.js',
        'Extensions/TileMap/pixi-tilemap/dist/pixi-tilemap.umd.js',
        'Extensions/TileMap/pako/dist/pako.min.js',
        'Extensions/TileMap/pixi-tilemap-helper.js',
      ],
      Tween: [
        'Extensions/TweenBehavior/shifty.js',
        'Extensions/TweenBehavior/tweenruntimebehavior.js',
      ],
      Video: [
        'Extensions/Video/videoruntimeobject.js',
        'Extensions/Video/videoruntimeobject-pixi-renderer.js',
      ],
    },
    Sc = 'https://resources.gdevelop-app.com/GDJS-5.0.0-{{version}}/Runtime/',
    Wo = new Set(),
    nn = function (e, r = 'beta105') {
      if (Wo.has(e)) return Promise.resolve();
      if (qo[e] === void 0) return Promise.reject('Extension not found!');
      Wo.add(e);
      let t = qo[e].map(
        (i) =>
          new Promise((n) => {
            let a = document.createElement('script');
            (a.src = Sc.replace('{{version}}', r) + i),
              (a.onload = function () {
                document.body.removeChild(a), n();
              }),
              document.body.appendChild(a);
          })
      );
      return Promise.all(t).then();
    };
  setTimeout(() => {
    Object.defineProperty(window.GDAPI, 'game', {
      get: function () {
        return window.GDAPI_game;
      },
    }),
      Object.defineProperty(window.GDAPI, 'currentScene', {
        get: function () {
          return GDAPI.game != null
            ? GDAPI.game._sceneStack.getCurrentScene()
            : null;
        },
      });
  });
  return kc;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL2VtaXR0ZXItY29tcG9uZW50L2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zdHJlYW0vaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2pzemlwL2xpYi9yZWFkYWJsZS1zdHJlYW0tYnJvd3Nlci5qcyIsICIuLi9ub2RlX21vZHVsZXMvanN6aXAvbGliL3N1cHBvcnQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2pzemlwL2xpYi9iYXNlNjQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2pzemlwL2xpYi9ub2RlanNVdGlscy5qcyIsICIuLi9ub2RlX21vZHVsZXMvc2V0LWltbWVkaWF0ZS1zaGltL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9pbW1lZGlhdGUvbGliL2Jyb3dzZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2xpZS9saWIvYnJvd3Nlci5qcyIsICIuLi9ub2RlX21vZHVsZXMvanN6aXAvbGliL2V4dGVybmFsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9qc3ppcC9saWIvdXRpbHMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2pzemlwL2xpYi9zdHJlYW0vR2VuZXJpY1dvcmtlci5qcyIsICIuLi9ub2RlX21vZHVsZXMvanN6aXAvbGliL3V0ZjguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2pzemlwL2xpYi9zdHJlYW0vQ29udmVydFdvcmtlci5qcyIsICIuLi9ub2RlX21vZHVsZXMvanN6aXAvbGliL25vZGVqcy9Ob2RlanNTdHJlYW1PdXRwdXRBZGFwdGVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9qc3ppcC9saWIvc3RyZWFtL1N0cmVhbUhlbHBlci5qcyIsICIuLi9ub2RlX21vZHVsZXMvanN6aXAvbGliL2RlZmF1bHRzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9qc3ppcC9saWIvc3RyZWFtL0RhdGFXb3JrZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2pzemlwL2xpYi9jcmMzMi5qcyIsICIuLi9ub2RlX21vZHVsZXMvanN6aXAvbGliL3N0cmVhbS9DcmMzMlByb2JlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9qc3ppcC9saWIvc3RyZWFtL0RhdGFMZW5ndGhQcm9iZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvanN6aXAvbGliL2NvbXByZXNzZWRPYmplY3QuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2pzemlwL2xpYi96aXBPYmplY3QuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Bha28vbGliL3V0aWxzL2NvbW1vbi5qcyIsICIuLi9ub2RlX21vZHVsZXMvcGFrby9saWIvemxpYi90cmVlcy5qcyIsICIuLi9ub2RlX21vZHVsZXMvcGFrby9saWIvemxpYi9hZGxlcjMyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wYWtvL2xpYi96bGliL2NyYzMyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wYWtvL2xpYi96bGliL21lc3NhZ2VzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wYWtvL2xpYi96bGliL2RlZmxhdGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Bha28vbGliL3V0aWxzL3N0cmluZ3MuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Bha28vbGliL3psaWIvenN0cmVhbS5qcyIsICIuLi9ub2RlX21vZHVsZXMvcGFrby9saWIvZGVmbGF0ZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvcGFrby9saWIvemxpYi9pbmZmYXN0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wYWtvL2xpYi96bGliL2luZnRyZWVzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wYWtvL2xpYi96bGliL2luZmxhdGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3Bha28vbGliL3psaWIvY29uc3RhbnRzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wYWtvL2xpYi96bGliL2d6aGVhZGVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wYWtvL2xpYi9pbmZsYXRlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wYWtvL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9qc3ppcC9saWIvZmxhdGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2pzemlwL2xpYi9jb21wcmVzc2lvbnMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2pzemlwL2xpYi9zaWduYXR1cmUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2pzemlwL2xpYi9nZW5lcmF0ZS9aaXBGaWxlV29ya2VyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9qc3ppcC9saWIvZ2VuZXJhdGUvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2pzemlwL2xpYi9ub2RlanMvTm9kZWpzU3RyZWFtSW5wdXRBZGFwdGVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9qc3ppcC9saWIvb2JqZWN0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9qc3ppcC9saWIvcmVhZGVyL0RhdGFSZWFkZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2pzemlwL2xpYi9yZWFkZXIvQXJyYXlSZWFkZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2pzemlwL2xpYi9yZWFkZXIvU3RyaW5nUmVhZGVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9qc3ppcC9saWIvcmVhZGVyL1VpbnQ4QXJyYXlSZWFkZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2pzemlwL2xpYi9yZWFkZXIvTm9kZUJ1ZmZlclJlYWRlci5qcyIsICIuLi9ub2RlX21vZHVsZXMvanN6aXAvbGliL3JlYWRlci9yZWFkZXJGb3IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2pzemlwL2xpYi96aXBFbnRyeS5qcyIsICIuLi9ub2RlX21vZHVsZXMvanN6aXAvbGliL3ppcEVudHJpZXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2pzemlwL2xpYi9sb2FkLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9qc3ppcC9saWIvaW5kZXguanMiLCAiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9Qb2x5ZmlsbC5qcyIsICIuLi9zcmMvQ2FsbGJhY2tzLnRzIiwgIi4uL3NyYy9Nb2RNYW5hZ2VyLnRzIiwgIi4uL3NyYy9Nb2QvaW5kZXgudHMiLCAiLi4vc3JjL0xvYWRlcnMvSW1hZ2VMb2FkZXIudHMiLCAiLi4vc3JjL0xvYWRlcnMvQXVkaW9Mb2FkZXIudHMiLCAiLi4vc3JjL0xvYWRlcnMvaW5kZXgudHMiLCAiLi4vc3JjL01vZC9NYW5pZmVzdFBhcnNlci50cyIsICIuLi9ub2RlX21vZHVsZXMvdHlwYW5pb24vbGliL2luZGV4Lm1qcyIsICIuLi9zcmMvRXh0ZW5zaW9uc0xvYWRlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXG4vKipcbiAqIEV4cG9zZSBgRW1pdHRlcmAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59O1xuXG4vKipcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xuICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub24gPVxuRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgKHRoaXMuX2NhbGxiYWNrc1tldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdIHx8IFtdKVxuICAgIC5wdXNoKGZuKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG5cbiAgZnVuY3Rpb24gb24oKSB7XG4gICAgc2VsZi5vZmYoZXZlbnQsIG9uKTtcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgb24uZm4gPSBmbjtcbiAgdGhpcy5vbihldmVudCwgb24pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICAvLyBhbGxcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gc3BlY2lmaWMgZXZlbnRcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG4gIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcblxuICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXG4gIHZhciBjYjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICBjYiA9IGNhbGxiYWNrc1tpXTtcbiAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge01peGVkfSAuLi5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcblxuICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW107XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgcmV0dXJuICEhIHRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XG59O1xuIiwgIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2VtaXR0ZXInKTtcblxuZnVuY3Rpb24gU3RyZWFtKCkge1xuICBFbWl0dGVyLmNhbGwodGhpcyk7XG59XG5TdHJlYW0ucHJvdG90eXBlID0gbmV3IEVtaXR0ZXIoKTtcbm1vZHVsZS5leHBvcnRzID0gU3RyZWFtO1xuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC40LnhcblN0cmVhbS5TdHJlYW0gPSBTdHJlYW07XG5cblN0cmVhbS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uKGRlc3QsIG9wdGlvbnMpIHtcbiAgdmFyIHNvdXJjZSA9IHRoaXM7XG5cbiAgZnVuY3Rpb24gb25kYXRhKGNodW5rKSB7XG4gICAgaWYgKGRlc3Qud3JpdGFibGUpIHtcbiAgICAgIGlmIChmYWxzZSA9PT0gZGVzdC53cml0ZShjaHVuaykgJiYgc291cmNlLnBhdXNlKSB7XG4gICAgICAgIHNvdXJjZS5wYXVzZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNvdXJjZS5vbignZGF0YScsIG9uZGF0YSk7XG5cbiAgZnVuY3Rpb24gb25kcmFpbigpIHtcbiAgICBpZiAoc291cmNlLnJlYWRhYmxlICYmIHNvdXJjZS5yZXN1bWUpIHtcbiAgICAgIHNvdXJjZS5yZXN1bWUoKTtcbiAgICB9XG4gIH1cblxuICBkZXN0Lm9uKCdkcmFpbicsIG9uZHJhaW4pO1xuXG4gIC8vIElmIHRoZSAnZW5kJyBvcHRpb24gaXMgbm90IHN1cHBsaWVkLCBkZXN0LmVuZCgpIHdpbGwgYmUgY2FsbGVkIHdoZW5cbiAgLy8gc291cmNlIGdldHMgdGhlICdlbmQnIG9yICdjbG9zZScgZXZlbnRzLiAgT25seSBkZXN0LmVuZCgpIG9uY2UuXG4gIGlmICghZGVzdC5faXNTdGRpbyAmJiAoIW9wdGlvbnMgfHwgb3B0aW9ucy5lbmQgIT09IGZhbHNlKSkge1xuICAgIHNvdXJjZS5vbignZW5kJywgb25lbmQpO1xuICAgIHNvdXJjZS5vbignY2xvc2UnLCBvbmNsb3NlKTtcbiAgfVxuXG4gIHZhciBkaWRPbkVuZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBvbmVuZCgpIHtcbiAgICBpZiAoZGlkT25FbmQpIHJldHVybjtcbiAgICBkaWRPbkVuZCA9IHRydWU7XG5cbiAgICBkZXN0LmVuZCgpO1xuICB9XG5cblxuICBmdW5jdGlvbiBvbmNsb3NlKCkge1xuICAgIGlmIChkaWRPbkVuZCkgcmV0dXJuO1xuICAgIGRpZE9uRW5kID0gdHJ1ZTtcblxuICAgIGlmICh0eXBlb2YgZGVzdC5kZXN0cm95ID09PSAnZnVuY3Rpb24nKSBkZXN0LmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8vIGRvbid0IGxlYXZlIGRhbmdsaW5nIHBpcGVzIHdoZW4gdGhlcmUgYXJlIGVycm9ycy5cbiAgZnVuY3Rpb24gb25lcnJvcihlcikge1xuICAgIGNsZWFudXAoKTtcbiAgICBpZiAoIXRoaXMuaGFzTGlzdGVuZXJzKCdlcnJvcicpKSB7XG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkIHN0cmVhbSBlcnJvciBpbiBwaXBlLlxuICAgIH1cbiAgfVxuXG4gIHNvdXJjZS5vbignZXJyb3InLCBvbmVycm9yKTtcbiAgZGVzdC5vbignZXJyb3InLCBvbmVycm9yKTtcblxuICAvLyByZW1vdmUgYWxsIHRoZSBldmVudCBsaXN0ZW5lcnMgdGhhdCB3ZXJlIGFkZGVkLlxuICBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgIHNvdXJjZS5vZmYoJ2RhdGEnLCBvbmRhdGEpO1xuICAgIGRlc3Qub2ZmKCdkcmFpbicsIG9uZHJhaW4pO1xuXG4gICAgc291cmNlLm9mZignZW5kJywgb25lbmQpO1xuICAgIHNvdXJjZS5vZmYoJ2Nsb3NlJywgb25jbG9zZSk7XG5cbiAgICBzb3VyY2Uub2ZmKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgIGRlc3Qub2ZmKCdlcnJvcicsIG9uZXJyb3IpO1xuXG4gICAgc291cmNlLm9mZignZW5kJywgY2xlYW51cCk7XG4gICAgc291cmNlLm9mZignY2xvc2UnLCBjbGVhbnVwKTtcblxuICAgIGRlc3Qub2ZmKCdlbmQnLCBjbGVhbnVwKTtcbiAgICBkZXN0Lm9mZignY2xvc2UnLCBjbGVhbnVwKTtcbiAgfVxuXG4gIHNvdXJjZS5vbignZW5kJywgY2xlYW51cCk7XG4gIHNvdXJjZS5vbignY2xvc2UnLCBjbGVhbnVwKTtcblxuICBkZXN0Lm9uKCdlbmQnLCBjbGVhbnVwKTtcbiAgZGVzdC5vbignY2xvc2UnLCBjbGVhbnVwKTtcblxuICBkZXN0LmVtaXQoJ3BpcGUnLCBzb3VyY2UpO1xuXG4gIC8vIEFsbG93IGZvciB1bml4LWxpa2UgdXNhZ2U6IEEucGlwZShCKS5waXBlKEMpXG4gIHJldHVybiBkZXN0O1xufVxuIiwgIi8qXG4gKiBUaGlzIGZpbGUgaXMgdXNlZCBieSBtb2R1bGUgYnVuZGxlcnMgKGJyb3dzZXJpZnkvd2VicGFjay9ldGMpIHdoZW5cbiAqIGluY2x1ZGluZyBhIHN0cmVhbSBpbXBsZW1lbnRhdGlvbi4gV2UgdXNlIFwicmVhZGFibGUtc3RyZWFtXCIgdG8gZ2V0IGFcbiAqIGNvbnNpc3RlbnQgYmVoYXZpb3IgYmV0d2VlbiBub2RlanMgdmVyc2lvbnMgYnV0IGJ1bmRsZXJzIG9mdGVuIGhhdmUgYSBzaGltXG4gKiBmb3IgXCJzdHJlYW1cIi4gVXNpbmcgdGhpcyBzaGltIGdyZWF0bHkgaW1wcm92ZSB0aGUgY29tcGF0aWJpbGl0eSBhbmQgZ3JlYXRseVxuICogcmVkdWNlIHRoZSBmaW5hbCBzaXplIG9mIHRoZSBidW5kbGUgKG9ubHkgb25lIHN0cmVhbSBpbXBsZW1lbnRhdGlvbiwgbm90XG4gKiB0d28pLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHJlYW1cIik7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmJhc2U2NCA9IHRydWU7XG5leHBvcnRzLmFycmF5ID0gdHJ1ZTtcbmV4cG9ydHMuc3RyaW5nID0gdHJ1ZTtcbmV4cG9ydHMuYXJyYXlidWZmZXIgPSB0eXBlb2YgQXJyYXlCdWZmZXIgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIFVpbnQ4QXJyYXkgIT09IFwidW5kZWZpbmVkXCI7XG5leHBvcnRzLm5vZGVidWZmZXIgPSB0eXBlb2YgQnVmZmVyICE9PSBcInVuZGVmaW5lZFwiO1xuLy8gY29udGFpbnMgdHJ1ZSBpZiBKU1ppcCBjYW4gcmVhZC9nZW5lcmF0ZSBVaW50OEFycmF5LCBmYWxzZSBvdGhlcndpc2UuXG5leHBvcnRzLnVpbnQ4YXJyYXkgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGV4cG9ydHMuYmxvYiA9IGZhbHNlO1xufVxuZWxzZSB7XG4gICAgdmFyIGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcigwKTtcbiAgICB0cnkge1xuICAgICAgICBleHBvcnRzLmJsb2IgPSBuZXcgQmxvYihbYnVmZmVyXSwge1xuICAgICAgICAgICAgdHlwZTogXCJhcHBsaWNhdGlvbi96aXBcIlxuICAgICAgICB9KS5zaXplID09PSAwO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIEJ1aWxkZXIgPSBzZWxmLkJsb2JCdWlsZGVyIHx8IHNlbGYuV2ViS2l0QmxvYkJ1aWxkZXIgfHwgc2VsZi5Nb3pCbG9iQnVpbGRlciB8fCBzZWxmLk1TQmxvYkJ1aWxkZXI7XG4gICAgICAgICAgICB2YXIgYnVpbGRlciA9IG5ldyBCdWlsZGVyKCk7XG4gICAgICAgICAgICBidWlsZGVyLmFwcGVuZChidWZmZXIpO1xuICAgICAgICAgICAgZXhwb3J0cy5ibG9iID0gYnVpbGRlci5nZXRCbG9iKCdhcHBsaWNhdGlvbi96aXAnKS5zaXplID09PSAwO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBleHBvcnRzLmJsb2IgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxudHJ5IHtcbiAgICBleHBvcnRzLm5vZGVzdHJlYW0gPSAhIXJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbScpLlJlYWRhYmxlO1xufSBjYXRjaChlKSB7XG4gICAgZXhwb3J0cy5ub2Rlc3RyZWFtID0gZmFsc2U7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIHN1cHBvcnQgPSByZXF1aXJlKCcuL3N1cHBvcnQnKTtcbi8vIHByaXZhdGUgcHJvcGVydHlcbnZhciBfa2V5U3RyID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPVwiO1xuXG5cbi8vIHB1YmxpYyBtZXRob2QgZm9yIGVuY29kaW5nXG5leHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgdmFyIG91dHB1dCA9IFtdO1xuICAgIHZhciBjaHIxLCBjaHIyLCBjaHIzLCBlbmMxLCBlbmMyLCBlbmMzLCBlbmM0O1xuICAgIHZhciBpID0gMCwgbGVuID0gaW5wdXQubGVuZ3RoLCByZW1haW5pbmdCeXRlcyA9IGxlbjtcblxuICAgIHZhciBpc0FycmF5ID0gdXRpbHMuZ2V0VHlwZU9mKGlucHV0KSAhPT0gXCJzdHJpbmdcIjtcbiAgICB3aGlsZSAoaSA8IGlucHV0Lmxlbmd0aCkge1xuICAgICAgICByZW1haW5pbmdCeXRlcyA9IGxlbiAtIGk7XG5cbiAgICAgICAgaWYgKCFpc0FycmF5KSB7XG4gICAgICAgICAgICBjaHIxID0gaW5wdXQuY2hhckNvZGVBdChpKyspO1xuICAgICAgICAgICAgY2hyMiA9IGkgPCBsZW4gPyBpbnB1dC5jaGFyQ29kZUF0KGkrKykgOiAwO1xuICAgICAgICAgICAgY2hyMyA9IGkgPCBsZW4gPyBpbnB1dC5jaGFyQ29kZUF0KGkrKykgOiAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hyMSA9IGlucHV0W2krK107XG4gICAgICAgICAgICBjaHIyID0gaSA8IGxlbiA/IGlucHV0W2krK10gOiAwO1xuICAgICAgICAgICAgY2hyMyA9IGkgPCBsZW4gPyBpbnB1dFtpKytdIDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGVuYzEgPSBjaHIxID4+IDI7XG4gICAgICAgIGVuYzIgPSAoKGNocjEgJiAzKSA8PCA0KSB8IChjaHIyID4+IDQpO1xuICAgICAgICBlbmMzID0gcmVtYWluaW5nQnl0ZXMgPiAxID8gKCgoY2hyMiAmIDE1KSA8PCAyKSB8IChjaHIzID4+IDYpKSA6IDY0O1xuICAgICAgICBlbmM0ID0gcmVtYWluaW5nQnl0ZXMgPiAyID8gKGNocjMgJiA2MykgOiA2NDtcblxuICAgICAgICBvdXRwdXQucHVzaChfa2V5U3RyLmNoYXJBdChlbmMxKSArIF9rZXlTdHIuY2hhckF0KGVuYzIpICsgX2tleVN0ci5jaGFyQXQoZW5jMykgKyBfa2V5U3RyLmNoYXJBdChlbmM0KSk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0LmpvaW4oXCJcIik7XG59O1xuXG4vLyBwdWJsaWMgbWV0aG9kIGZvciBkZWNvZGluZ1xuZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuICAgIHZhciBjaHIxLCBjaHIyLCBjaHIzO1xuICAgIHZhciBlbmMxLCBlbmMyLCBlbmMzLCBlbmM0O1xuICAgIHZhciBpID0gMCwgcmVzdWx0SW5kZXggPSAwO1xuXG4gICAgdmFyIGRhdGFVcmxQcmVmaXggPSBcImRhdGE6XCI7XG5cbiAgICBpZiAoaW5wdXQuc3Vic3RyKDAsIGRhdGFVcmxQcmVmaXgubGVuZ3RoKSA9PT0gZGF0YVVybFByZWZpeCkge1xuICAgICAgICAvLyBUaGlzIGlzIGEgY29tbW9uIGVycm9yOiBwZW9wbGUgZ2l2ZSBhIGRhdGEgdXJsXG4gICAgICAgIC8vIChkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1IuLi4pIHdpdGggYSB7YmFzZTY0OiB0cnVlfSBhbmRcbiAgICAgICAgLy8gd29uZGVycyB3aHkgdGhpbmdzIGRvbid0IHdvcmsuXG4gICAgICAgIC8vIFdlIGNhbiBkZXRlY3QgdGhhdCB0aGUgc3RyaW5nIGlucHV0IGxvb2tzIGxpa2UgYSBkYXRhIHVybCBidXQgd2VcbiAgICAgICAgLy8gKmNhbid0KiBiZSBzdXJlIGl0IGlzIG9uZTogcmVtb3ZpbmcgZXZlcnl0aGluZyB1cCB0byB0aGUgY29tbWEgd291bGRcbiAgICAgICAgLy8gYmUgdG9vIGRhbmdlcm91cy5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBiYXNlNjQgaW5wdXQsIGl0IGxvb2tzIGxpa2UgYSBkYXRhIHVybC5cIik7XG4gICAgfVxuXG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9bXkEtWmEtejAtOVxcK1xcL1xcPV0vZywgXCJcIik7XG5cbiAgICB2YXIgdG90YWxMZW5ndGggPSBpbnB1dC5sZW5ndGggKiAzIC8gNDtcbiAgICBpZihpbnB1dC5jaGFyQXQoaW5wdXQubGVuZ3RoIC0gMSkgPT09IF9rZXlTdHIuY2hhckF0KDY0KSkge1xuICAgICAgICB0b3RhbExlbmd0aC0tO1xuICAgIH1cbiAgICBpZihpbnB1dC5jaGFyQXQoaW5wdXQubGVuZ3RoIC0gMikgPT09IF9rZXlTdHIuY2hhckF0KDY0KSkge1xuICAgICAgICB0b3RhbExlbmd0aC0tO1xuICAgIH1cbiAgICBpZiAodG90YWxMZW5ndGggJSAxICE9PSAwKSB7XG4gICAgICAgIC8vIHRvdGFsTGVuZ3RoIGlzIG5vdCBhbiBpbnRlZ2VyLCB0aGUgbGVuZ3RoIGRvZXMgbm90IG1hdGNoIGEgdmFsaWRcbiAgICAgICAgLy8gYmFzZTY0IGNvbnRlbnQuIFRoYXQgY2FuIGhhcHBlbiBpZjpcbiAgICAgICAgLy8gLSB0aGUgaW5wdXQgaXMgbm90IGEgYmFzZTY0IGNvbnRlbnRcbiAgICAgICAgLy8gLSB0aGUgaW5wdXQgaXMgKmFsbW9zdCogYSBiYXNlNjQgY29udGVudCwgd2l0aCBhIGV4dHJhIGNoYXJzIGF0IHRoZVxuICAgICAgICAvLyAgIGJlZ2lubmluZyBvciBhdCB0aGUgZW5kXG4gICAgICAgIC8vIC0gdGhlIGlucHV0IHVzZXMgYSBiYXNlNjQgdmFyaWFudCAoYmFzZTY0dXJsIGZvciBleGFtcGxlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGJhc2U2NCBpbnB1dCwgYmFkIGNvbnRlbnQgbGVuZ3RoLlwiKTtcbiAgICB9XG4gICAgdmFyIG91dHB1dDtcbiAgICBpZiAoc3VwcG9ydC51aW50OGFycmF5KSB7XG4gICAgICAgIG91dHB1dCA9IG5ldyBVaW50OEFycmF5KHRvdGFsTGVuZ3RofDApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG91dHB1dCA9IG5ldyBBcnJheSh0b3RhbExlbmd0aHwwKTtcbiAgICB9XG5cbiAgICB3aGlsZSAoaSA8IGlucHV0Lmxlbmd0aCkge1xuXG4gICAgICAgIGVuYzEgPSBfa2V5U3RyLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpO1xuICAgICAgICBlbmMyID0gX2tleVN0ci5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKTtcbiAgICAgICAgZW5jMyA9IF9rZXlTdHIuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSk7XG4gICAgICAgIGVuYzQgPSBfa2V5U3RyLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpO1xuXG4gICAgICAgIGNocjEgPSAoZW5jMSA8PCAyKSB8IChlbmMyID4+IDQpO1xuICAgICAgICBjaHIyID0gKChlbmMyICYgMTUpIDw8IDQpIHwgKGVuYzMgPj4gMik7XG4gICAgICAgIGNocjMgPSAoKGVuYzMgJiAzKSA8PCA2KSB8IGVuYzQ7XG5cbiAgICAgICAgb3V0cHV0W3Jlc3VsdEluZGV4KytdID0gY2hyMTtcblxuICAgICAgICBpZiAoZW5jMyAhPT0gNjQpIHtcbiAgICAgICAgICAgIG91dHB1dFtyZXN1bHRJbmRleCsrXSA9IGNocjI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVuYzQgIT09IDY0KSB7XG4gICAgICAgICAgICBvdXRwdXRbcmVzdWx0SW5kZXgrK10gPSBjaHIzO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIC8qKlxuICAgICAqIFRydWUgaWYgdGhpcyBpcyBydW5uaW5nIGluIE5vZGVqcywgd2lsbCBiZSB1bmRlZmluZWQgaW4gYSBicm93c2VyLlxuICAgICAqIEluIGEgYnJvd3NlciwgYnJvd3NlcmlmeSB3b24ndCBpbmNsdWRlIHRoaXMgZmlsZSBhbmQgdGhlIHdob2xlIG1vZHVsZVxuICAgICAqIHdpbGwgYmUgcmVzb2x2ZWQgYW4gZW1wdHkgb2JqZWN0LlxuICAgICAqL1xuICAgIGlzTm9kZSA6IHR5cGVvZiBCdWZmZXIgIT09IFwidW5kZWZpbmVkXCIsXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IG5vZGVqcyBCdWZmZXIgZnJvbSBhbiBleGlzdGluZyBjb250ZW50LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIHRoZSBkYXRhIHRvIHBhc3MgdG8gdGhlIGNvbnN0cnVjdG9yLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbmNvZGluZyB0aGUgZW5jb2RpbmcgdG8gdXNlLlxuICAgICAqIEByZXR1cm4ge0J1ZmZlcn0gYSBuZXcgQnVmZmVyLlxuICAgICAqL1xuICAgIG5ld0J1ZmZlckZyb206IGZ1bmN0aW9uKGRhdGEsIGVuY29kaW5nKSB7XG4gICAgICAgIGlmIChCdWZmZXIuZnJvbSAmJiBCdWZmZXIuZnJvbSAhPT0gVWludDhBcnJheS5mcm9tKSB7XG4gICAgICAgICAgICByZXR1cm4gQnVmZmVyLmZyb20oZGF0YSwgZW5jb2RpbmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgLy8gU2FmZWd1YXJkIGZvciBvbGQgTm9kZS5qcyB2ZXJzaW9ucy4gT24gbmV3ZXIgdmVyc2lvbnMsXG4gICAgICAgICAgICAgICAgLy8gQnVmZmVyLmZyb20obnVtYmVyKSAvIEJ1ZmZlcihudW1iZXIsIGVuY29kaW5nKSBhbHJlYWR5IHRocm93LlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBcXFwiZGF0YVxcXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcihkYXRhLCBlbmNvZGluZyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBub2RlanMgQnVmZmVyIHdpdGggdGhlIHNwZWNpZmllZCBzaXplLlxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gc2l6ZSB0aGUgc2l6ZSBvZiB0aGUgYnVmZmVyLlxuICAgICAqIEByZXR1cm4ge0J1ZmZlcn0gYSBuZXcgQnVmZmVyLlxuICAgICAqL1xuICAgIGFsbG9jQnVmZmVyOiBmdW5jdGlvbiAoc2l6ZSkge1xuICAgICAgICBpZiAoQnVmZmVyLmFsbG9jKSB7XG4gICAgICAgICAgICByZXR1cm4gQnVmZmVyLmFsbG9jKHNpemUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGJ1ZiA9IG5ldyBCdWZmZXIoc2l6ZSk7XG4gICAgICAgICAgICBidWYuZmlsbCgwKTtcbiAgICAgICAgICAgIHJldHVybiBidWY7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEZpbmQgb3V0IGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlci5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYiB0aGUgb2JqZWN0IHRvIHRlc3QuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiB0aGUgb2JqZWN0IGlzIGEgQnVmZmVyLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgaXNCdWZmZXIgOiBmdW5jdGlvbihiKXtcbiAgICAgICAgcmV0dXJuIEJ1ZmZlci5pc0J1ZmZlcihiKTtcbiAgICB9LFxuXG4gICAgaXNTdHJlYW0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogJiZcbiAgICAgICAgICAgIHR5cGVvZiBvYmoub24gPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAgICAgdHlwZW9mIG9iai5wYXVzZSA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgICAgICB0eXBlb2Ygb2JqLnJlc3VtZSA9PT0gXCJmdW5jdGlvblwiO1xuICAgIH1cbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nID8gc2V0SW1tZWRpYXRlIDpcblx0ZnVuY3Rpb24gc2V0SW1tZWRpYXRlKCkge1xuXHRcdHZhciBhcmdzID0gW10uc2xpY2UuYXBwbHkoYXJndW1lbnRzKTtcblx0XHRhcmdzLnNwbGljZSgxLCAwLCAwKTtcblx0XHRzZXRUaW1lb3V0LmFwcGx5KG51bGwsIGFyZ3MpO1xuXHR9O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciBNdXRhdGlvbiA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xuXG52YXIgc2NoZWR1bGVEcmFpbjtcblxue1xuICBpZiAoTXV0YXRpb24pIHtcbiAgICB2YXIgY2FsbGVkID0gMDtcbiAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb24obmV4dFRpY2spO1xuICAgIHZhciBlbGVtZW50ID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQsIHtcbiAgICAgIGNoYXJhY3RlckRhdGE6IHRydWVcbiAgICB9KTtcbiAgICBzY2hlZHVsZURyYWluID0gZnVuY3Rpb24gKCkge1xuICAgICAgZWxlbWVudC5kYXRhID0gKGNhbGxlZCA9ICsrY2FsbGVkICUgMik7XG4gICAgfTtcbiAgfSBlbHNlIGlmICghZ2xvYmFsLnNldEltbWVkaWF0ZSAmJiB0eXBlb2YgZ2xvYmFsLk1lc3NhZ2VDaGFubmVsICE9PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBjaGFubmVsID0gbmV3IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCgpO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbmV4dFRpY2s7XG4gICAgc2NoZWR1bGVEcmFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4gICAgfTtcbiAgfSBlbHNlIGlmICgnZG9jdW1lbnQnIGluIGdsb2JhbCAmJiAnb25yZWFkeXN0YXRlY2hhbmdlJyBpbiBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JykpIHtcbiAgICBzY2hlZHVsZURyYWluID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG4gICAgICB2YXIgc2NyaXB0RWwgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBzY3JpcHRFbC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG5leHRUaWNrKCk7XG5cbiAgICAgICAgc2NyaXB0RWwub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgc2NyaXB0RWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHRFbCk7XG4gICAgICAgIHNjcmlwdEVsID0gbnVsbDtcbiAgICAgIH07XG4gICAgICBnbG9iYWwuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKHNjcmlwdEVsKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHNjaGVkdWxlRHJhaW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzZXRUaW1lb3V0KG5leHRUaWNrLCAwKTtcbiAgICB9O1xuICB9XG59XG5cbnZhciBkcmFpbmluZztcbnZhciBxdWV1ZSA9IFtdO1xuLy9uYW1lZCBuZXh0VGljayBmb3IgbGVzcyBjb25mdXNpbmcgc3RhY2sgdHJhY2VzXG5mdW5jdGlvbiBuZXh0VGljaygpIHtcbiAgZHJhaW5pbmcgPSB0cnVlO1xuICB2YXIgaSwgb2xkUXVldWU7XG4gIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gIHdoaWxlIChsZW4pIHtcbiAgICBvbGRRdWV1ZSA9IHF1ZXVlO1xuICAgIHF1ZXVlID0gW107XG4gICAgaSA9IC0xO1xuICAgIHdoaWxlICgrK2kgPCBsZW4pIHtcbiAgICAgIG9sZFF1ZXVlW2ldKCk7XG4gICAgfVxuICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgfVxuICBkcmFpbmluZyA9IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGltbWVkaWF0ZTtcbmZ1bmN0aW9uIGltbWVkaWF0ZSh0YXNrKSB7XG4gIGlmIChxdWV1ZS5wdXNoKHRhc2spID09PSAxICYmICFkcmFpbmluZykge1xuICAgIHNjaGVkdWxlRHJhaW4oKTtcbiAgfVxufVxuIiwgIid1c2Ugc3RyaWN0JztcbnZhciBpbW1lZGlhdGUgPSByZXF1aXJlKCdpbW1lZGlhdGUnKTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmZ1bmN0aW9uIElOVEVSTkFMKCkge31cblxudmFyIGhhbmRsZXJzID0ge307XG5cbnZhciBSRUpFQ1RFRCA9IFsnUkVKRUNURUQnXTtcbnZhciBGVUxGSUxMRUQgPSBbJ0ZVTEZJTExFRCddO1xudmFyIFBFTkRJTkcgPSBbJ1BFTkRJTkcnXTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlO1xuXG5mdW5jdGlvbiBQcm9taXNlKHJlc29sdmVyKSB7XG4gIGlmICh0eXBlb2YgcmVzb2x2ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdyZXNvbHZlciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuICB0aGlzLnN0YXRlID0gUEVORElORztcbiAgdGhpcy5xdWV1ZSA9IFtdO1xuICB0aGlzLm91dGNvbWUgPSB2b2lkIDA7XG4gIGlmIChyZXNvbHZlciAhPT0gSU5URVJOQUwpIHtcbiAgICBzYWZlbHlSZXNvbHZlVGhlbmFibGUodGhpcywgcmVzb2x2ZXIpO1xuICB9XG59XG5cblByb21pc2UucHJvdG90eXBlW1wiZmluYWxseVwiXSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdmFyIHAgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gdGhpcy50aGVuKHJlc29sdmUsIHJlamVjdCk7XG5cbiAgZnVuY3Rpb24gcmVzb2x2ZSh2YWx1ZSkge1xuICAgIGZ1bmN0aW9uIHllcyAoKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBwLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbih5ZXMpO1xuICB9XG4gIGZ1bmN0aW9uIHJlamVjdChyZWFzb24pIHtcbiAgICBmdW5jdGlvbiBubyAoKSB7XG4gICAgICB0aHJvdyByZWFzb247XG4gICAgfVxuICAgIHJldHVybiBwLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihubyk7XG4gIH1cbn07XG5Qcm9taXNlLnByb3RvdHlwZVtcImNhdGNoXCJdID0gZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGVkKTtcbn07XG5Qcm9taXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gIGlmICh0eXBlb2Ygb25GdWxmaWxsZWQgIT09ICdmdW5jdGlvbicgJiYgdGhpcy5zdGF0ZSA9PT0gRlVMRklMTEVEIHx8XG4gICAgdHlwZW9mIG9uUmVqZWN0ZWQgIT09ICdmdW5jdGlvbicgJiYgdGhpcy5zdGF0ZSA9PT0gUkVKRUNURUQpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB2YXIgcHJvbWlzZSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKElOVEVSTkFMKTtcbiAgaWYgKHRoaXMuc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICB2YXIgcmVzb2x2ZXIgPSB0aGlzLnN0YXRlID09PSBGVUxGSUxMRUQgPyBvbkZ1bGZpbGxlZCA6IG9uUmVqZWN0ZWQ7XG4gICAgdW53cmFwKHByb21pc2UsIHJlc29sdmVyLCB0aGlzLm91dGNvbWUpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucXVldWUucHVzaChuZXcgUXVldWVJdGVtKHByb21pc2UsIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5mdW5jdGlvbiBRdWV1ZUl0ZW0ocHJvbWlzZSwgb25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgaWYgKHR5cGVvZiBvbkZ1bGZpbGxlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRoaXMub25GdWxmaWxsZWQgPSBvbkZ1bGZpbGxlZDtcbiAgICB0aGlzLmNhbGxGdWxmaWxsZWQgPSB0aGlzLm90aGVyQ2FsbEZ1bGZpbGxlZDtcbiAgfVxuICBpZiAodHlwZW9mIG9uUmVqZWN0ZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLm9uUmVqZWN0ZWQgPSBvblJlamVjdGVkO1xuICAgIHRoaXMuY2FsbFJlamVjdGVkID0gdGhpcy5vdGhlckNhbGxSZWplY3RlZDtcbiAgfVxufVxuUXVldWVJdGVtLnByb3RvdHlwZS5jYWxsRnVsZmlsbGVkID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGhhbmRsZXJzLnJlc29sdmUodGhpcy5wcm9taXNlLCB2YWx1ZSk7XG59O1xuUXVldWVJdGVtLnByb3RvdHlwZS5vdGhlckNhbGxGdWxmaWxsZWQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdW53cmFwKHRoaXMucHJvbWlzZSwgdGhpcy5vbkZ1bGZpbGxlZCwgdmFsdWUpO1xufTtcblF1ZXVlSXRlbS5wcm90b3R5cGUuY2FsbFJlamVjdGVkID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGhhbmRsZXJzLnJlamVjdCh0aGlzLnByb21pc2UsIHZhbHVlKTtcbn07XG5RdWV1ZUl0ZW0ucHJvdG90eXBlLm90aGVyQ2FsbFJlamVjdGVkID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHVud3JhcCh0aGlzLnByb21pc2UsIHRoaXMub25SZWplY3RlZCwgdmFsdWUpO1xufTtcblxuZnVuY3Rpb24gdW53cmFwKHByb21pc2UsIGZ1bmMsIHZhbHVlKSB7XG4gIGltbWVkaWF0ZShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJldHVyblZhbHVlO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm5WYWx1ZSA9IGZ1bmModmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBoYW5kbGVycy5yZWplY3QocHJvbWlzZSwgZSk7XG4gICAgfVxuICAgIGlmIChyZXR1cm5WYWx1ZSA9PT0gcHJvbWlzZSkge1xuICAgICAgaGFuZGxlcnMucmVqZWN0KHByb21pc2UsIG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCByZXNvbHZlIHByb21pc2Ugd2l0aCBpdHNlbGYnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhhbmRsZXJzLnJlc29sdmUocHJvbWlzZSwgcmV0dXJuVmFsdWUpO1xuICAgIH1cbiAgfSk7XG59XG5cbmhhbmRsZXJzLnJlc29sdmUgPSBmdW5jdGlvbiAoc2VsZiwgdmFsdWUpIHtcbiAgdmFyIHJlc3VsdCA9IHRyeUNhdGNoKGdldFRoZW4sIHZhbHVlKTtcbiAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICByZXR1cm4gaGFuZGxlcnMucmVqZWN0KHNlbGYsIHJlc3VsdC52YWx1ZSk7XG4gIH1cbiAgdmFyIHRoZW5hYmxlID0gcmVzdWx0LnZhbHVlO1xuXG4gIGlmICh0aGVuYWJsZSkge1xuICAgIHNhZmVseVJlc29sdmVUaGVuYWJsZShzZWxmLCB0aGVuYWJsZSk7XG4gIH0gZWxzZSB7XG4gICAgc2VsZi5zdGF0ZSA9IEZVTEZJTExFRDtcbiAgICBzZWxmLm91dGNvbWUgPSB2YWx1ZTtcbiAgICB2YXIgaSA9IC0xO1xuICAgIHZhciBsZW4gPSBzZWxmLnF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZSAoKytpIDwgbGVuKSB7XG4gICAgICBzZWxmLnF1ZXVlW2ldLmNhbGxGdWxmaWxsZWQodmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2VsZjtcbn07XG5oYW5kbGVycy5yZWplY3QgPSBmdW5jdGlvbiAoc2VsZiwgZXJyb3IpIHtcbiAgc2VsZi5zdGF0ZSA9IFJFSkVDVEVEO1xuICBzZWxmLm91dGNvbWUgPSBlcnJvcjtcbiAgdmFyIGkgPSAtMTtcbiAgdmFyIGxlbiA9IHNlbGYucXVldWUubGVuZ3RoO1xuICB3aGlsZSAoKytpIDwgbGVuKSB7XG4gICAgc2VsZi5xdWV1ZVtpXS5jYWxsUmVqZWN0ZWQoZXJyb3IpO1xuICB9XG4gIHJldHVybiBzZWxmO1xufTtcblxuZnVuY3Rpb24gZ2V0VGhlbihvYmopIHtcbiAgLy8gTWFrZSBzdXJlIHdlIG9ubHkgYWNjZXNzIHRoZSBhY2Nlc3NvciBvbmNlIGFzIHJlcXVpcmVkIGJ5IHRoZSBzcGVjXG4gIHZhciB0aGVuID0gb2JqICYmIG9iai50aGVuO1xuICBpZiAob2JqICYmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSAmJiB0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmdW5jdGlvbiBhcHB5VGhlbigpIHtcbiAgICAgIHRoZW4uYXBwbHkob2JqLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gc2FmZWx5UmVzb2x2ZVRoZW5hYmxlKHNlbGYsIHRoZW5hYmxlKSB7XG4gIC8vIEVpdGhlciBmdWxmaWxsLCByZWplY3Qgb3IgcmVqZWN0IHdpdGggZXJyb3JcbiAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBvbkVycm9yKHZhbHVlKSB7XG4gICAgaWYgKGNhbGxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjYWxsZWQgPSB0cnVlO1xuICAgIGhhbmRsZXJzLnJlamVjdChzZWxmLCB2YWx1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBvblN1Y2Nlc3ModmFsdWUpIHtcbiAgICBpZiAoY2FsbGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNhbGxlZCA9IHRydWU7XG4gICAgaGFuZGxlcnMucmVzb2x2ZShzZWxmLCB2YWx1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cnlUb1Vud3JhcCgpIHtcbiAgICB0aGVuYWJsZShvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IHRyeUNhdGNoKHRyeVRvVW53cmFwKTtcbiAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICBvbkVycm9yKHJlc3VsdC52YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdHJ5Q2F0Y2goZnVuYywgdmFsdWUpIHtcbiAgdmFyIG91dCA9IHt9O1xuICB0cnkge1xuICAgIG91dC52YWx1ZSA9IGZ1bmModmFsdWUpO1xuICAgIG91dC5zdGF0dXMgPSAnc3VjY2Vzcyc7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBvdXQuc3RhdHVzID0gJ2Vycm9yJztcbiAgICBvdXQudmFsdWUgPSBlO1xuICB9XG4gIHJldHVybiBvdXQ7XG59XG5cblByb21pc2UucmVzb2x2ZSA9IHJlc29sdmU7XG5mdW5jdGlvbiByZXNvbHZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIHRoaXMpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIGhhbmRsZXJzLnJlc29sdmUobmV3IHRoaXMoSU5URVJOQUwpLCB2YWx1ZSk7XG59XG5cblByb21pc2UucmVqZWN0ID0gcmVqZWN0O1xuZnVuY3Rpb24gcmVqZWN0KHJlYXNvbikge1xuICB2YXIgcHJvbWlzZSA9IG5ldyB0aGlzKElOVEVSTkFMKTtcbiAgcmV0dXJuIGhhbmRsZXJzLnJlamVjdChwcm9taXNlLCByZWFzb24pO1xufVxuXG5Qcm9taXNlLmFsbCA9IGFsbDtcbmZ1bmN0aW9uIGFsbChpdGVyYWJsZSkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcmFibGUpICE9PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgcmV0dXJuIHRoaXMucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ211c3QgYmUgYW4gYXJyYXknKSk7XG4gIH1cblxuICB2YXIgbGVuID0gaXRlcmFibGUubGVuZ3RoO1xuICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gIGlmICghbGVuKSB7XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZShbXSk7XG4gIH1cblxuICB2YXIgdmFsdWVzID0gbmV3IEFycmF5KGxlbik7XG4gIHZhciByZXNvbHZlZCA9IDA7XG4gIHZhciBpID0gLTE7XG4gIHZhciBwcm9taXNlID0gbmV3IHRoaXMoSU5URVJOQUwpO1xuXG4gIHdoaWxlICgrK2kgPCBsZW4pIHtcbiAgICBhbGxSZXNvbHZlcihpdGVyYWJsZVtpXSwgaSk7XG4gIH1cbiAgcmV0dXJuIHByb21pc2U7XG4gIGZ1bmN0aW9uIGFsbFJlc29sdmVyKHZhbHVlLCBpKSB7XG4gICAgc2VsZi5yZXNvbHZlKHZhbHVlKS50aGVuKHJlc29sdmVGcm9tQWxsLCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGlmICghY2FsbGVkKSB7XG4gICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgIGhhbmRsZXJzLnJlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gcmVzb2x2ZUZyb21BbGwob3V0VmFsdWUpIHtcbiAgICAgIHZhbHVlc1tpXSA9IG91dFZhbHVlO1xuICAgICAgaWYgKCsrcmVzb2x2ZWQgPT09IGxlbiAmJiAhY2FsbGVkKSB7XG4gICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgIGhhbmRsZXJzLnJlc29sdmUocHJvbWlzZSwgdmFsdWVzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuUHJvbWlzZS5yYWNlID0gcmFjZTtcbmZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZXJhYmxlKSAhPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgIHJldHVybiB0aGlzLnJlamVjdChuZXcgVHlwZUVycm9yKCdtdXN0IGJlIGFuIGFycmF5JykpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGl0ZXJhYmxlLmxlbmd0aDtcbiAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICBpZiAoIWxlbikge1xuICAgIHJldHVybiB0aGlzLnJlc29sdmUoW10pO1xuICB9XG5cbiAgdmFyIGkgPSAtMTtcbiAgdmFyIHByb21pc2UgPSBuZXcgdGhpcyhJTlRFUk5BTCk7XG5cbiAgd2hpbGUgKCsraSA8IGxlbikge1xuICAgIHJlc29sdmVyKGl0ZXJhYmxlW2ldKTtcbiAgfVxuICByZXR1cm4gcHJvbWlzZTtcbiAgZnVuY3Rpb24gcmVzb2x2ZXIodmFsdWUpIHtcbiAgICBzZWxmLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICBoYW5kbGVycy5yZXNvbHZlKHByb21pc2UsIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGlmICghY2FsbGVkKSB7XG4gICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgIGhhbmRsZXJzLnJlamVjdChwcm9taXNlLCBlcnJvcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsICIvKiBnbG9iYWwgUHJvbWlzZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBsb2FkIHRoZSBnbG9iYWwgb2JqZWN0IGZpcnN0OlxuLy8gLSBpdCBzaG91bGQgYmUgYmV0dGVyIGludGVncmF0ZWQgaW4gdGhlIHN5c3RlbSAodW5oYW5kbGVkUmVqZWN0aW9uIGluIG5vZGUpXG4vLyAtIHRoZSBlbnZpcm9ubWVudCBtYXkgaGF2ZSBhIGN1c3RvbSBQcm9taXNlIGltcGxlbWVudGF0aW9uIChzZWUgem9uZS5qcylcbnZhciBFUzZQcm9taXNlID0gbnVsbDtcbmlmICh0eXBlb2YgUHJvbWlzZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIEVTNlByb21pc2UgPSBQcm9taXNlO1xufSBlbHNlIHtcbiAgICBFUzZQcm9taXNlID0gcmVxdWlyZShcImxpZVwiKTtcbn1cblxuLyoqXG4gKiBMZXQgdGhlIHVzZXIgdXNlL2NoYW5nZSBzb21lIGltcGxlbWVudGF0aW9ucy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgUHJvbWlzZTogRVM2UHJvbWlzZVxufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBzdXBwb3J0ID0gcmVxdWlyZSgnLi9zdXBwb3J0Jyk7XG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnLi9iYXNlNjQnKTtcbnZhciBub2RlanNVdGlscyA9IHJlcXVpcmUoJy4vbm9kZWpzVXRpbHMnKTtcbnZhciBzZXRJbW1lZGlhdGUgPSByZXF1aXJlKCdzZXQtaW1tZWRpYXRlLXNoaW0nKTtcbnZhciBleHRlcm5hbCA9IHJlcXVpcmUoXCIuL2V4dGVybmFsXCIpO1xuXG5cbi8qKlxuICogQ29udmVydCBhIHN0cmluZyB0aGF0IHBhc3MgYXMgYSBcImJpbmFyeSBzdHJpbmdcIjogaXQgc2hvdWxkIHJlcHJlc2VudCBhIGJ5dGVcbiAqIGFycmF5IGJ1dCBtYXkgaGF2ZSA+IDI1NSBjaGFyIGNvZGVzLiBCZSBzdXJlIHRvIHRha2Ugb25seSB0aGUgZmlyc3QgYnl0ZVxuICogYW5kIHJldHVybnMgdGhlIGJ5dGUgYXJyYXkuXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIHRoZSBzdHJpbmcgdG8gdHJhbnNmb3JtLlxuICogQHJldHVybiB7QXJyYXl8VWludDhBcnJheX0gdGhlIHN0cmluZyBpbiBhIGJpbmFyeSBmb3JtYXQuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZzJiaW5hcnkoc3RyKSB7XG4gICAgdmFyIHJlc3VsdCA9IG51bGw7XG4gICAgaWYgKHN1cHBvcnQudWludDhhcnJheSkge1xuICAgICAgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoc3RyLmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBBcnJheShzdHIubGVuZ3RoKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cmluZ1RvQXJyYXlMaWtlKHN0ciwgcmVzdWx0KTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgYmxvYiB3aXRoIHRoZSBnaXZlbiBjb250ZW50IGFuZCB0aGUgZ2l2ZW4gdHlwZS5cbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5QnVmZmVyfSBwYXJ0IHRoZSBjb250ZW50IHRvIHB1dCBpbiB0aGUgYmxvYi4gRE8gTk9UIHVzZVxuICogYW4gVWludDhBcnJheSBiZWNhdXNlIHRoZSBzdG9jayBicm93c2VyIG9mIGFuZHJvaWQgNCB3b24ndCBhY2NlcHQgaXQgKGl0XG4gKiB3aWxsIGJlIHNpbGVudGx5IGNvbnZlcnRlZCB0byBhIHN0cmluZywgXCJbb2JqZWN0IFVpbnQ4QXJyYXldXCIpLlxuICpcbiAqIFVzZSBvbmx5IE9ORSBwYXJ0IHRvIGJ1aWxkIHRoZSBibG9iIHRvIGF2b2lkIGEgbWVtb3J5IGxlYWsgaW4gSUUxMSAvIEVkZ2U6XG4gKiB3aGVuIGEgbGFyZ2UgYW1vdW50IG9mIEFycmF5IGlzIHVzZWQgdG8gY3JlYXRlIHRoZSBCbG9iLCB0aGUgYW1vdW50IG9mXG4gKiBtZW1vcnkgY29uc3VtZWQgaXMgbmVhcmx5IDEwMCB0aW1lcyB0aGUgb3JpZ2luYWwgZGF0YSBhbW91bnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgdGhlIG1pbWUgdHlwZSBvZiB0aGUgYmxvYi5cbiAqIEByZXR1cm4ge0Jsb2J9IHRoZSBjcmVhdGVkIGJsb2IuXG4gKi9cbmV4cG9ydHMubmV3QmxvYiA9IGZ1bmN0aW9uKHBhcnQsIHR5cGUpIHtcbiAgICBleHBvcnRzLmNoZWNrU3VwcG9ydChcImJsb2JcIik7XG5cbiAgICB0cnkge1xuICAgICAgICAvLyBCbG9iIGNvbnN0cnVjdG9yXG4gICAgICAgIHJldHVybiBuZXcgQmxvYihbcGFydF0sIHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIGRlcHJlY2F0ZWQsIGJyb3dzZXIgb25seSwgb2xkIHdheVxuICAgICAgICAgICAgdmFyIEJ1aWxkZXIgPSBzZWxmLkJsb2JCdWlsZGVyIHx8IHNlbGYuV2ViS2l0QmxvYkJ1aWxkZXIgfHwgc2VsZi5Nb3pCbG9iQnVpbGRlciB8fCBzZWxmLk1TQmxvYkJ1aWxkZXI7XG4gICAgICAgICAgICB2YXIgYnVpbGRlciA9IG5ldyBCdWlsZGVyKCk7XG4gICAgICAgICAgICBidWlsZGVyLmFwcGVuZChwYXJ0KTtcbiAgICAgICAgICAgIHJldHVybiBidWlsZGVyLmdldEJsb2IodHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcblxuICAgICAgICAgICAgLy8gd2VsbCwgZnVjayA/IVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQnVnIDogY2FuJ3QgY29uc3RydWN0IHRoZSBCbG9iLlwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59O1xuLyoqXG4gKiBUaGUgaWRlbnRpdHkgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXQgdGhlIGlucHV0LlxuICogQHJldHVybiB7T2JqZWN0fSB0aGUgc2FtZSBpbnB1dC5cbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkoaW5wdXQpIHtcbiAgICByZXR1cm4gaW5wdXQ7XG59XG5cbi8qKlxuICogRmlsbCBpbiBhbiBhcnJheSB3aXRoIGEgc3RyaW5nLlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciB0aGUgc3RyaW5nIHRvIHVzZS5cbiAqIEBwYXJhbSB7QXJyYXl8QXJyYXlCdWZmZXJ8VWludDhBcnJheXxCdWZmZXJ9IGFycmF5IHRoZSBhcnJheSB0byBmaWxsIGluICh3aWxsIGJlIG11dGF0ZWQpLlxuICogQHJldHVybiB7QXJyYXl8QXJyYXlCdWZmZXJ8VWludDhBcnJheXxCdWZmZXJ9IHRoZSB1cGRhdGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBzdHJpbmdUb0FycmF5TGlrZShzdHIsIGFycmF5KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgYXJyYXlbaV0gPSBzdHIuY2hhckNvZGVBdChpKSAmIDB4RkY7XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBBbiBoZWxwZXIgZm9yIHRoZSBmdW5jdGlvbiBhcnJheUxpa2VUb1N0cmluZy5cbiAqIFRoaXMgY29udGFpbnMgc3RhdGljIGluZm9ybWF0aW9uIGFuZCBmdW5jdGlvbnMgdGhhdFxuICogY2FuIGJlIG9wdGltaXplZCBieSB0aGUgYnJvd3NlciBKSVQgY29tcGlsZXIuXG4gKi9cbnZhciBhcnJheVRvU3RyaW5nSGVscGVyID0ge1xuICAgIC8qKlxuICAgICAqIFRyYW5zZm9ybSBhbiBhcnJheSBvZiBpbnQgaW50byBhIHN0cmluZywgY2h1bmsgYnkgY2h1bmsuXG4gICAgICogU2VlIHRoZSBwZXJmb3JtYW5jZXMgbm90ZXMgb24gYXJyYXlMaWtlVG9TdHJpbmcuXG4gICAgICogQHBhcmFtIHtBcnJheXxBcnJheUJ1ZmZlcnxVaW50OEFycmF5fEJ1ZmZlcn0gYXJyYXkgdGhlIGFycmF5IHRvIHRyYW5zZm9ybS5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSB0aGUgdHlwZSBvZiB0aGUgYXJyYXkuXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBjaHVuayB0aGUgY2h1bmsgc2l6ZS5cbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSByZXN1bHRpbmcgc3RyaW5nLlxuICAgICAqIEB0aHJvd3MgRXJyb3IgaWYgdGhlIGNodW5rIGlzIHRvbyBiaWcgZm9yIHRoZSBzdGFjay5cbiAgICAgKi9cbiAgICBzdHJpbmdpZnlCeUNodW5rOiBmdW5jdGlvbihhcnJheSwgdHlwZSwgY2h1bmspIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdLCBrID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoO1xuICAgICAgICAvLyBzaG9ydGN1dFxuICAgICAgICBpZiAobGVuIDw9IGNodW5rKSB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBhcnJheSk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGsgPCBsZW4pIHtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBcImFycmF5XCIgfHwgdHlwZSA9PT0gXCJub2RlYnVmZmVyXCIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGFycmF5LnNsaWNlKGssIE1hdGgubWluKGsgKyBjaHVuaywgbGVuKSkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgYXJyYXkuc3ViYXJyYXkoaywgTWF0aC5taW4oayArIGNodW5rLCBsZW4pKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgayArPSBjaHVuaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBDYWxsIFN0cmluZy5mcm9tQ2hhckNvZGUgb24gZXZlcnkgaXRlbSBpbiB0aGUgYXJyYXkuXG4gICAgICogVGhpcyBpcyB0aGUgbmFpdmUgaW1wbGVtZW50YXRpb24sIHdoaWNoIGdlbmVyYXRlIEEgTE9UIG9mIGludGVybWVkaWF0ZSBzdHJpbmcuXG4gICAgICogVGhpcyBzaG91bGQgYmUgdXNlZCB3aGVuIGV2ZXJ5dGhpbmcgZWxzZSBmYWlsLlxuICAgICAqIEBwYXJhbSB7QXJyYXl8QXJyYXlCdWZmZXJ8VWludDhBcnJheXxCdWZmZXJ9IGFycmF5IHRoZSBhcnJheSB0byB0cmFuc2Zvcm0uXG4gICAgICogQHJldHVybiB7U3RyaW5nfSB0aGUgcmVzdWx0LlxuICAgICAqL1xuICAgIHN0cmluZ2lmeUJ5Q2hhcjogZnVuY3Rpb24oYXJyYXkpe1xuICAgICAgICB2YXIgcmVzdWx0U3RyID0gXCJcIjtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHRTdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShhcnJheVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdFN0cjtcbiAgICB9LFxuICAgIGFwcGx5Q2FuQmVVc2VkIDoge1xuICAgICAgICAvKipcbiAgICAgICAgICogdHJ1ZSBpZiB0aGUgYnJvd3NlciBhY2NlcHRzIHRvIHVzZSBTdHJpbmcuZnJvbUNoYXJDb2RlIG9uIFVpbnQ4QXJyYXlcbiAgICAgICAgICovXG4gICAgICAgIHVpbnQ4YXJyYXkgOiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydC51aW50OGFycmF5ICYmIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgbmV3IFVpbnQ4QXJyYXkoMSkpLmxlbmd0aCA9PT0gMTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCksXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0cnVlIGlmIHRoZSBicm93c2VyIGFjY2VwdHMgdG8gdXNlIFN0cmluZy5mcm9tQ2hhckNvZGUgb24gbm9kZWpzIEJ1ZmZlci5cbiAgICAgICAgICovXG4gICAgICAgIG5vZGVidWZmZXIgOiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydC5ub2RlYnVmZmVyICYmIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgbm9kZWpzVXRpbHMuYWxsb2NCdWZmZXIoMSkpLmxlbmd0aCA9PT0gMTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKClcbiAgICB9XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybSBhbiBhcnJheS1saWtlIG9iamVjdCB0byBhIHN0cmluZy5cbiAqIEBwYXJhbSB7QXJyYXl8QXJyYXlCdWZmZXJ8VWludDhBcnJheXxCdWZmZXJ9IGFycmF5IHRoZSBhcnJheSB0byB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSByZXN1bHQuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZVRvU3RyaW5nKGFycmF5KSB7XG4gICAgLy8gUGVyZm9ybWFuY2VzIG5vdGVzIDpcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgYXJyYXkpIGlzIHRoZSBmYXN0ZXN0LCBzZWVcbiAgICAvLyBzZWUgaHR0cDovL2pzcGVyZi5jb20vY29udmVydGluZy1hLXVpbnQ4YXJyYXktdG8tYS1zdHJpbmcvMlxuICAgIC8vIGJ1dCB0aGUgc3RhY2sgaXMgbGltaXRlZCAoYW5kIHdlIGNhbiBnZXQgaHVnZSBhcnJheXMgISkuXG4gICAgLy9cbiAgICAvLyByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShhcnJheVtpXSk7IGdlbmVyYXRlIHRvbyBtYW55IHN0cmluZ3MgIVxuICAgIC8vXG4gICAgLy8gVGhpcyBjb2RlIGlzIGluc3BpcmVkIGJ5IGh0dHA6Ly9qc3BlcmYuY29tL2FycmF5YnVmZmVyLXRvLXN0cmluZy1hcHBseS1wZXJmb3JtYW5jZS8yXG4gICAgLy8gVE9ETyA6IHdlIG5vdyBoYXZlIHdvcmtlcnMgdGhhdCBzcGxpdCB0aGUgd29yay4gRG8gd2Ugc3RpbGwgbmVlZCB0aGF0ID9cbiAgICB2YXIgY2h1bmsgPSA2NTUzNixcbiAgICAgICAgdHlwZSA9IGV4cG9ydHMuZ2V0VHlwZU9mKGFycmF5KSxcbiAgICAgICAgY2FuVXNlQXBwbHkgPSB0cnVlO1xuICAgIGlmICh0eXBlID09PSBcInVpbnQ4YXJyYXlcIikge1xuICAgICAgICBjYW5Vc2VBcHBseSA9IGFycmF5VG9TdHJpbmdIZWxwZXIuYXBwbHlDYW5CZVVzZWQudWludDhhcnJheTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwibm9kZWJ1ZmZlclwiKSB7XG4gICAgICAgIGNhblVzZUFwcGx5ID0gYXJyYXlUb1N0cmluZ0hlbHBlci5hcHBseUNhbkJlVXNlZC5ub2RlYnVmZmVyO1xuICAgIH1cblxuICAgIGlmIChjYW5Vc2VBcHBseSkge1xuICAgICAgICB3aGlsZSAoY2h1bmsgPiAxKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnJheVRvU3RyaW5nSGVscGVyLnN0cmluZ2lmeUJ5Q2h1bmsoYXJyYXksIHR5cGUsIGNodW5rKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjaHVuayA9IE1hdGguZmxvb3IoY2h1bmsgLyAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIG5vIGFwcGx5IG9yIGNodW5rIGVycm9yIDogc2xvdyBhbmQgcGFpbmZ1bCBhbGdvcml0aG1cbiAgICAvLyBkZWZhdWx0IGJyb3dzZXIgb24gYW5kcm9pZCA0LipcbiAgICByZXR1cm4gYXJyYXlUb1N0cmluZ0hlbHBlci5zdHJpbmdpZnlCeUNoYXIoYXJyYXkpO1xufVxuXG5leHBvcnRzLmFwcGx5RnJvbUNoYXJDb2RlID0gYXJyYXlMaWtlVG9TdHJpbmc7XG5cblxuLyoqXG4gKiBDb3B5IHRoZSBkYXRhIGZyb20gYW4gYXJyYXktbGlrZSB0byBhbiBvdGhlciBhcnJheS1saWtlLlxuICogQHBhcmFtIHtBcnJheXxBcnJheUJ1ZmZlcnxVaW50OEFycmF5fEJ1ZmZlcn0gYXJyYXlGcm9tIHRoZSBvcmlnaW4gYXJyYXkuXG4gKiBAcGFyYW0ge0FycmF5fEFycmF5QnVmZmVyfFVpbnQ4QXJyYXl8QnVmZmVyfSBhcnJheVRvIHRoZSBkZXN0aW5hdGlvbiBhcnJheSB3aGljaCB3aWxsIGJlIG11dGF0ZWQuXG4gKiBAcmV0dXJuIHtBcnJheXxBcnJheUJ1ZmZlcnxVaW50OEFycmF5fEJ1ZmZlcn0gdGhlIHVwZGF0ZWQgZGVzdGluYXRpb24gYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZVRvQXJyYXlMaWtlKGFycmF5RnJvbSwgYXJyYXlUbykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlGcm9tLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFycmF5VG9baV0gPSBhcnJheUZyb21baV07XG4gICAgfVxuICAgIHJldHVybiBhcnJheVRvO1xufVxuXG4vLyBhIG1hdHJpeCBjb250YWluaW5nIGZ1bmN0aW9ucyB0byB0cmFuc2Zvcm0gZXZlcnl0aGluZyBpbnRvIGV2ZXJ5dGhpbmcuXG52YXIgdHJhbnNmb3JtID0ge307XG5cbi8vIHN0cmluZyB0byA/XG50cmFuc2Zvcm1bXCJzdHJpbmdcIl0gPSB7XG4gICAgXCJzdHJpbmdcIjogaWRlbnRpdHksXG4gICAgXCJhcnJheVwiOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gc3RyaW5nVG9BcnJheUxpa2UoaW5wdXQsIG5ldyBBcnJheShpbnB1dC5sZW5ndGgpKTtcbiAgICB9LFxuICAgIFwiYXJyYXlidWZmZXJcIjogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybVtcInN0cmluZ1wiXVtcInVpbnQ4YXJyYXlcIl0oaW5wdXQpLmJ1ZmZlcjtcbiAgICB9LFxuICAgIFwidWludDhhcnJheVwiOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gc3RyaW5nVG9BcnJheUxpa2UoaW5wdXQsIG5ldyBVaW50OEFycmF5KGlucHV0Lmxlbmd0aCkpO1xuICAgIH0sXG4gICAgXCJub2RlYnVmZmVyXCI6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBzdHJpbmdUb0FycmF5TGlrZShpbnB1dCwgbm9kZWpzVXRpbHMuYWxsb2NCdWZmZXIoaW5wdXQubGVuZ3RoKSk7XG4gICAgfVxufTtcblxuLy8gYXJyYXkgdG8gP1xudHJhbnNmb3JtW1wiYXJyYXlcIl0gPSB7XG4gICAgXCJzdHJpbmdcIjogYXJyYXlMaWtlVG9TdHJpbmcsXG4gICAgXCJhcnJheVwiOiBpZGVudGl0eSxcbiAgICBcImFycmF5YnVmZmVyXCI6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiAobmV3IFVpbnQ4QXJyYXkoaW5wdXQpKS5idWZmZXI7XG4gICAgfSxcbiAgICBcInVpbnQ4YXJyYXlcIjogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGlucHV0KTtcbiAgICB9LFxuICAgIFwibm9kZWJ1ZmZlclwiOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gbm9kZWpzVXRpbHMubmV3QnVmZmVyRnJvbShpbnB1dCk7XG4gICAgfVxufTtcblxuLy8gYXJyYXlidWZmZXIgdG8gP1xudHJhbnNmb3JtW1wiYXJyYXlidWZmZXJcIl0gPSB7XG4gICAgXCJzdHJpbmdcIjogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5TGlrZVRvU3RyaW5nKG5ldyBVaW50OEFycmF5KGlucHV0KSk7XG4gICAgfSxcbiAgICBcImFycmF5XCI6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBhcnJheUxpa2VUb0FycmF5TGlrZShuZXcgVWludDhBcnJheShpbnB1dCksIG5ldyBBcnJheShpbnB1dC5ieXRlTGVuZ3RoKSk7XG4gICAgfSxcbiAgICBcImFycmF5YnVmZmVyXCI6IGlkZW50aXR5LFxuICAgIFwidWludDhhcnJheVwiOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoaW5wdXQpO1xuICAgIH0sXG4gICAgXCJub2RlYnVmZmVyXCI6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBub2RlanNVdGlscy5uZXdCdWZmZXJGcm9tKG5ldyBVaW50OEFycmF5KGlucHV0KSk7XG4gICAgfVxufTtcblxuLy8gdWludDhhcnJheSB0byA/XG50cmFuc2Zvcm1bXCJ1aW50OGFycmF5XCJdID0ge1xuICAgIFwic3RyaW5nXCI6IGFycmF5TGlrZVRvU3RyaW5nLFxuICAgIFwiYXJyYXlcIjogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXlMaWtlKGlucHV0LCBuZXcgQXJyYXkoaW5wdXQubGVuZ3RoKSk7XG4gICAgfSxcbiAgICBcImFycmF5YnVmZmVyXCI6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBpbnB1dC5idWZmZXI7XG4gICAgfSxcbiAgICBcInVpbnQ4YXJyYXlcIjogaWRlbnRpdHksXG4gICAgXCJub2RlYnVmZmVyXCI6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBub2RlanNVdGlscy5uZXdCdWZmZXJGcm9tKGlucHV0KTtcbiAgICB9XG59O1xuXG4vLyBub2RlYnVmZmVyIHRvID9cbnRyYW5zZm9ybVtcIm5vZGVidWZmZXJcIl0gPSB7XG4gICAgXCJzdHJpbmdcIjogYXJyYXlMaWtlVG9TdHJpbmcsXG4gICAgXCJhcnJheVwiOiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICByZXR1cm4gYXJyYXlMaWtlVG9BcnJheUxpa2UoaW5wdXQsIG5ldyBBcnJheShpbnB1dC5sZW5ndGgpKTtcbiAgICB9LFxuICAgIFwiYXJyYXlidWZmZXJcIjogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybVtcIm5vZGVidWZmZXJcIl1bXCJ1aW50OGFycmF5XCJdKGlucHV0KS5idWZmZXI7XG4gICAgfSxcbiAgICBcInVpbnQ4YXJyYXlcIjogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXlMaWtlKGlucHV0LCBuZXcgVWludDhBcnJheShpbnB1dC5sZW5ndGgpKTtcbiAgICB9LFxuICAgIFwibm9kZWJ1ZmZlclwiOiBpZGVudGl0eVxufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gYW4gaW5wdXQgaW50byBhbnkgdHlwZS5cbiAqIFRoZSBzdXBwb3J0ZWQgb3V0cHV0IHR5cGUgYXJlIDogc3RyaW5nLCBhcnJheSwgdWludDhhcnJheSwgYXJyYXlidWZmZXIsIG5vZGVidWZmZXIuXG4gKiBJZiBubyBvdXRwdXQgdHlwZSBpcyBzcGVjaWZpZWQsIHRoZSB1bm1vZGlmaWVkIGlucHV0IHdpbGwgYmUgcmV0dXJuZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gb3V0cHV0VHlwZSB0aGUgb3V0cHV0IHR5cGUuXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheXxBcnJheUJ1ZmZlcnxVaW50OEFycmF5fEJ1ZmZlcn0gaW5wdXQgdGhlIGlucHV0IHRvIGNvbnZlcnQuXG4gKiBAdGhyb3dzIHtFcnJvcn0gYW4gRXJyb3IgaWYgdGhlIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IHRoZSByZXF1ZXN0ZWQgb3V0cHV0IHR5cGUuXG4gKi9cbmV4cG9ydHMudHJhbnNmb3JtVG8gPSBmdW5jdGlvbihvdXRwdXRUeXBlLCBpbnB1dCkge1xuICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgLy8gdW5kZWZpbmVkLCBudWxsLCBldGNcbiAgICAgICAgLy8gYW4gZW1wdHkgc3RyaW5nIHdvbid0IGhhcm0uXG4gICAgICAgIGlucHV0ID0gXCJcIjtcbiAgICB9XG4gICAgaWYgKCFvdXRwdXRUeXBlKSB7XG4gICAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG4gICAgZXhwb3J0cy5jaGVja1N1cHBvcnQob3V0cHV0VHlwZSk7XG4gICAgdmFyIGlucHV0VHlwZSA9IGV4cG9ydHMuZ2V0VHlwZU9mKGlucHV0KTtcbiAgICB2YXIgcmVzdWx0ID0gdHJhbnNmb3JtW2lucHV0VHlwZV1bb3V0cHV0VHlwZV0oaW5wdXQpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgdHlwZSBvZiB0aGUgaW5wdXQuXG4gKiBUaGUgdHlwZSB3aWxsIGJlIGluIGEgZm9ybWF0IHZhbGlkIGZvciBKU1ppcC51dGlscy50cmFuc2Zvcm1UbyA6IHN0cmluZywgYXJyYXksIHVpbnQ4YXJyYXksIGFycmF5YnVmZmVyLlxuICogQHBhcmFtIHtPYmplY3R9IGlucHV0IHRoZSBpbnB1dCB0byBpZGVudGlmeS5cbiAqIEByZXR1cm4ge1N0cmluZ30gdGhlIChsb3dlcmNhc2UpIHR5cGUgb2YgdGhlIGlucHV0LlxuICovXG5leHBvcnRzLmdldFR5cGVPZiA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgICB9XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09IFwiW29iamVjdCBBcnJheV1cIikge1xuICAgICAgICByZXR1cm4gXCJhcnJheVwiO1xuICAgIH1cbiAgICBpZiAoc3VwcG9ydC5ub2RlYnVmZmVyICYmIG5vZGVqc1V0aWxzLmlzQnVmZmVyKGlucHV0KSkge1xuICAgICAgICByZXR1cm4gXCJub2RlYnVmZmVyXCI7XG4gICAgfVxuICAgIGlmIChzdXBwb3J0LnVpbnQ4YXJyYXkgJiYgaW5wdXQgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgIHJldHVybiBcInVpbnQ4YXJyYXlcIjtcbiAgICB9XG4gICAgaWYgKHN1cHBvcnQuYXJyYXlidWZmZXIgJiYgaW5wdXQgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gXCJhcnJheWJ1ZmZlclwiO1xuICAgIH1cbn07XG5cbi8qKlxuICogVGhyb3cgYW4gZXhjZXB0aW9uIGlmIHRoZSB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSB0aGUgdHlwZSB0byBjaGVjay5cbiAqIEB0aHJvd3Mge0Vycm9yfSBhbiBFcnJvciBpZiB0aGUgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgdGhlIHJlcXVlc3RlZCB0eXBlLlxuICovXG5leHBvcnRzLmNoZWNrU3VwcG9ydCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICB2YXIgc3VwcG9ydGVkID0gc3VwcG9ydFt0eXBlLnRvTG93ZXJDYXNlKCldO1xuICAgIGlmICghc3VwcG9ydGVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcih0eXBlICsgXCIgaXMgbm90IHN1cHBvcnRlZCBieSB0aGlzIHBsYXRmb3JtXCIpO1xuICAgIH1cbn07XG5cbmV4cG9ydHMuTUFYX1ZBTFVFXzE2QklUUyA9IDY1NTM1O1xuZXhwb3J0cy5NQVhfVkFMVUVfMzJCSVRTID0gLTE7IC8vIHdlbGwsIFwiXFx4RkZcXHhGRlxceEZGXFx4RkZcXHhGRlxceEZGXFx4RkZcXHhGRlwiIGlzIHBhcnNlZCBhcyAtMVxuXG4vKipcbiAqIFByZXR0aWZ5IGEgc3RyaW5nIHJlYWQgYXMgYmluYXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciB0aGUgc3RyaW5nIHRvIHByZXR0aWZ5LlxuICogQHJldHVybiB7c3RyaW5nfSBhIHByZXR0eSBzdHJpbmcuXG4gKi9cbmV4cG9ydHMucHJldHR5ID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgdmFyIHJlcyA9ICcnLFxuICAgICAgICBjb2RlLCBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCAoc3RyIHx8IFwiXCIpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvZGUgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgcmVzICs9ICdcXFxceCcgKyAoY29kZSA8IDE2ID8gXCIwXCIgOiBcIlwiKSArIGNvZGUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59O1xuXG4vKipcbiAqIERlZmVyIHRoZSBjYWxsIG9mIGEgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayB0aGUgZnVuY3Rpb24gdG8gY2FsbCBhc3luY2hyb25vdXNseS5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgdGhlIGFyZ3VtZW50cyB0byBnaXZlIHRvIHRoZSBjYWxsYmFjay5cbiAqL1xuZXhwb3J0cy5kZWxheSA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBhcmdzLCBzZWxmKSB7XG4gICAgc2V0SW1tZWRpYXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsbGJhY2suYXBwbHkoc2VsZiB8fCBudWxsLCBhcmdzIHx8IFtdKTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogRXh0ZW5kcyBhIHByb3RvdHlwZSB3aXRoIGFuIG90aGVyLCB3aXRob3V0IGNhbGxpbmcgYSBjb25zdHJ1Y3RvciB3aXRoXG4gKiBzaWRlIGVmZmVjdHMuIEluc3BpcmVkIGJ5IG5vZGVqcycgYHV0aWxzLmluaGVyaXRzYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3RvciB0aGUgY29uc3RydWN0b3IgdG8gYXVnbWVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3VwZXJDdG9yIHRoZSBwYXJlbnQgY29uc3RydWN0b3IgdG8gdXNlXG4gKi9cbmV4cG9ydHMuaW5oZXJpdHMgPSBmdW5jdGlvbiAoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgdmFyIE9iaiA9IGZ1bmN0aW9uKCkge307XG4gICAgT2JqLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGU7XG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgT2JqKCk7XG59O1xuXG4vKipcbiAqIE1lcmdlIHRoZSBvYmplY3RzIHBhc3NlZCBhcyBwYXJhbWV0ZXJzIGludG8gYSBuZXcgb25lLlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSB2YXJfYXJncyBBbGwgb2JqZWN0cyB0byBtZXJnZS5cbiAqIEByZXR1cm4ge09iamVjdH0gYSBuZXcgb2JqZWN0IHdpdGggdGhlIGRhdGEgb2YgdGhlIG90aGVycy5cbiAqL1xuZXhwb3J0cy5leHRlbmQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzdWx0ID0ge30sIGksIGF0dHI7XG4gICAgZm9yIChpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyAvLyBhcmd1bWVudHMgaXMgbm90IGVudW1lcmFibGUgaW4gc29tZSBicm93c2Vyc1xuICAgICAgICBmb3IgKGF0dHIgaW4gYXJndW1lbnRzW2ldKSB7XG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzW2ldLmhhc093blByb3BlcnR5KGF0dHIpICYmIHR5cGVvZiByZXN1bHRbYXR0cl0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbYXR0cl0gPSBhcmd1bWVudHNbaV1bYXR0cl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtIGFyYml0cmFyeSBjb250ZW50IGludG8gYSBQcm9taXNlLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgYSBuYW1lIGZvciB0aGUgY29udGVudCBiZWluZyBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gaW5wdXREYXRhIHRoZSBjb250ZW50IHRvIHByb2Nlc3MuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzQmluYXJ5IHRydWUgaWYgdGhlIGNvbnRlbnQgaXMgbm90IGFuIHVuaWNvZGUgc3RyaW5nXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzT3B0aW1pemVkQmluYXJ5U3RyaW5nIHRydWUgaWYgdGhlIHN0cmluZyBjb250ZW50IG9ubHkgaGFzIG9uZSBieXRlIHBlciBjaGFyYWN0ZXIuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzQmFzZTY0IHRydWUgaWYgdGhlIHN0cmluZyBjb250ZW50IGlzIGVuY29kZWQgd2l0aCBiYXNlNjQuXG4gKiBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgaW4gYSBmb3JtYXQgdXNhYmxlIGJ5IEpTWmlwLlxuICovXG5leHBvcnRzLnByZXBhcmVDb250ZW50ID0gZnVuY3Rpb24obmFtZSwgaW5wdXREYXRhLCBpc0JpbmFyeSwgaXNPcHRpbWl6ZWRCaW5hcnlTdHJpbmcsIGlzQmFzZTY0KSB7XG5cbiAgICAvLyBpZiBpbnB1dERhdGEgaXMgYWxyZWFkeSBhIHByb21pc2UsIHRoaXMgZmxhdHRlbiBpdC5cbiAgICB2YXIgcHJvbWlzZSA9IGV4dGVybmFsLlByb21pc2UucmVzb2x2ZShpbnB1dERhdGEpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHZhciBpc0Jsb2IgPSBzdXBwb3J0LmJsb2IgJiYgKGRhdGEgaW5zdGFuY2VvZiBCbG9iIHx8IFsnW29iamVjdCBGaWxlXScsICdbb2JqZWN0IEJsb2JdJ10uaW5kZXhPZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGF0YSkpICE9PSAtMSk7XG5cbiAgICAgICAgaWYgKGlzQmxvYiAmJiB0eXBlb2YgRmlsZVJlYWRlciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBleHRlcm5hbC5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZS50YXJnZXQucmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZS50YXJnZXQuZXJyb3IpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHZhciBkYXRhVHlwZSA9IGV4cG9ydHMuZ2V0VHlwZU9mKGRhdGEpO1xuXG4gICAgICAgIGlmICghZGF0YVR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiBleHRlcm5hbC5Qcm9taXNlLnJlamVjdChcbiAgICAgICAgICAgICAgICBuZXcgRXJyb3IoXCJDYW4ndCByZWFkIHRoZSBkYXRhIG9mICdcIiArIG5hbWUgKyBcIicuIElzIGl0IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbiBhIHN1cHBvcnRlZCBKYXZhU2NyaXB0IHR5cGUgKFN0cmluZywgQmxvYiwgQXJyYXlCdWZmZXIsIGV0YykgP1wiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzcGVjaWFsIGNhc2UgOiBpdCdzIHdheSBlYXNpZXIgdG8gd29yayB3aXRoIFVpbnQ4QXJyYXkgdGhhbiB3aXRoIEFycmF5QnVmZmVyXG4gICAgICAgIGlmIChkYXRhVHlwZSA9PT0gXCJhcnJheWJ1ZmZlclwiKSB7XG4gICAgICAgICAgICBkYXRhID0gZXhwb3J0cy50cmFuc2Zvcm1UbyhcInVpbnQ4YXJyYXlcIiwgZGF0YSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YVR5cGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGlmIChpc0Jhc2U2NCkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBiYXNlNjQuZGVjb2RlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNCaW5hcnkpIHtcbiAgICAgICAgICAgICAgICAvLyBvcHRpbWl6ZWRCaW5hcnlTdHJpbmcgPT09IHRydWUgbWVhbnMgdGhhdCB0aGUgZmlsZSBoYXMgYWxyZWFkeSBiZWVuIGZpbHRlcmVkIHdpdGggYSAweEZGIG1hc2tcbiAgICAgICAgICAgICAgICBpZiAoaXNPcHRpbWl6ZWRCaW5hcnlTdHJpbmcgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIHN0cmluZywgbm90IGluIGEgYmFzZTY0IGZvcm1hdC5cbiAgICAgICAgICAgICAgICAgICAgLy8gQmUgc3VyZSB0aGF0IHRoaXMgaXMgYSBjb3JyZWN0IFwiYmluYXJ5IHN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBzdHJpbmcyYmluYXJ5KGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9KTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgd29ya2VyIHRoYXQgZG9lcyBub3RoaW5nIGJ1dCBwYXNzaW5nIGNodW5rcyB0byB0aGUgbmV4dCBvbmUuIFRoaXMgaXMgbGlrZVxuICogYSBub2RlanMgc3RyZWFtIGJ1dCB3aXRoIHNvbWUgZGlmZmVyZW5jZXMuIE9uIHRoZSBnb29kIHNpZGUgOlxuICogLSBpdCB3b3JrcyBvbiBJRSA2LTkgd2l0aG91dCBhbnkgaXNzdWUgLyBwb2x5ZmlsbFxuICogLSBpdCB3ZWlnaHRzIGxlc3MgdGhhbiB0aGUgZnVsbCBkZXBlbmRlbmNpZXMgYnVuZGxlZCB3aXRoIGJyb3dzZXJpZnlcbiAqIC0gaXQgZm9yd2FyZHMgZXJyb3JzIChubyBuZWVkIHRvIGRlY2xhcmUgYW4gZXJyb3IgaGFuZGxlciBFVkVSWVdIRVJFKVxuICpcbiAqIEEgY2h1bmsgaXMgYW4gb2JqZWN0IHdpdGggMiBhdHRyaWJ1dGVzIDogYG1ldGFgIGFuZCBgZGF0YWAuIFRoZSBmb3JtZXIgaXMgYW5cbiAqIG9iamVjdCBjb250YWluaW5nIGFueXRoaW5nIChgcGVyY2VudGAgZm9yIGV4YW1wbGUpLCBzZWUgZWFjaCB3b3JrZXIgZm9yIG1vcmVcbiAqIGRldGFpbHMuIFRoZSBsYXR0ZXIgaXMgdGhlIHJlYWwgZGF0YSAoU3RyaW5nLCBVaW50OEFycmF5LCBldGMpLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgdGhlIG5hbWUgb2YgdGhlIHN0cmVhbSAobWFpbmx5IHVzZWQgZm9yIGRlYnVnZ2luZyBwdXJwb3NlcylcbiAqL1xuZnVuY3Rpb24gR2VuZXJpY1dvcmtlcihuYW1lKSB7XG4gICAgLy8gdGhlIG5hbWUgb2YgdGhlIHdvcmtlclxuICAgIHRoaXMubmFtZSA9IG5hbWUgfHwgXCJkZWZhdWx0XCI7XG4gICAgLy8gYW4gb2JqZWN0IGNvbnRhaW5pbmcgbWV0YWRhdGEgYWJvdXQgdGhlIHdvcmtlcnMgY2hhaW5cbiAgICB0aGlzLnN0cmVhbUluZm8gPSB7fTtcbiAgICAvLyBhbiBlcnJvciB3aGljaCBoYXBwZW5lZCB3aGVuIHRoZSB3b3JrZXIgd2FzIHBhdXNlZFxuICAgIHRoaXMuZ2VuZXJhdGVkRXJyb3IgPSBudWxsO1xuICAgIC8vIGFuIG9iamVjdCBjb250YWluaW5nIG1ldGFkYXRhIHRvIGJlIG1lcmdlZCBieSB0aGlzIHdvcmtlciBpbnRvIHRoZSBnZW5lcmFsIG1ldGFkYXRhXG4gICAgdGhpcy5leHRyYVN0cmVhbUluZm8gPSB7fTtcbiAgICAvLyB0cnVlIGlmIHRoZSBzdHJlYW0gaXMgcGF1c2VkIChhbmQgc2hvdWxkIG5vdCBkbyBhbnl0aGluZyksIGZhbHNlIG90aGVyd2lzZVxuICAgIHRoaXMuaXNQYXVzZWQgPSB0cnVlO1xuICAgIC8vIHRydWUgaWYgdGhlIHN0cmVhbSBpcyBmaW5pc2hlZCAoYW5kIHNob3VsZCBub3QgZG8gYW55dGhpbmcpLCBmYWxzZSBvdGhlcndpc2VcbiAgICB0aGlzLmlzRmluaXNoZWQgPSBmYWxzZTtcbiAgICAvLyB0cnVlIGlmIHRoZSBzdHJlYW0gaXMgbG9ja2VkIHRvIHByZXZlbnQgZnVydGhlciBzdHJ1Y3R1cmUgdXBkYXRlcyAocGlwZSksIGZhbHNlIG90aGVyd2lzZVxuICAgIHRoaXMuaXNMb2NrZWQgPSBmYWxzZTtcbiAgICAvLyB0aGUgZXZlbnQgbGlzdGVuZXJzXG4gICAgdGhpcy5fbGlzdGVuZXJzID0ge1xuICAgICAgICAnZGF0YSc6W10sXG4gICAgICAgICdlbmQnOltdLFxuICAgICAgICAnZXJyb3InOltdXG4gICAgfTtcbiAgICAvLyB0aGUgcHJldmlvdXMgd29ya2VyLCBpZiBhbnlcbiAgICB0aGlzLnByZXZpb3VzID0gbnVsbDtcbn1cblxuR2VuZXJpY1dvcmtlci5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogUHVzaCBhIGNodW5rIHRvIHRoZSBuZXh0IHdvcmtlcnMuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNodW5rIHRoZSBjaHVuayB0byBwdXNoXG4gICAgICovXG4gICAgcHVzaCA6IGZ1bmN0aW9uIChjaHVuaykge1xuICAgICAgICB0aGlzLmVtaXQoXCJkYXRhXCIsIGNodW5rKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEVuZCB0aGUgc3RyZWFtLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgdGhpcyBjYWxsIGVuZGVkIHRoZSB3b3JrZXIsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBlbmQgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRmluaXNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImVuZFwiKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYW5VcCgpO1xuICAgICAgICAgICAgdGhpcy5pc0ZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiZXJyb3JcIiwgZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBFbmQgdGhlIHN0cmVhbSB3aXRoIGFuIGVycm9yLlxuICAgICAqIEBwYXJhbSB7RXJyb3J9IGUgdGhlIGVycm9yIHdoaWNoIGNhdXNlZCB0aGUgcHJlbWF0dXJlIGVuZC5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIHRoaXMgY2FsbCBlbmRlZCB0aGUgd29ya2VyIHdpdGggYW4gZXJyb3IsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBlcnJvciA6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRmluaXNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuaXNQYXVzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVkRXJyb3IgPSBlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc0ZpbmlzaGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5lbWl0KFwiZXJyb3JcIiwgZSk7XG5cbiAgICAgICAgICAgIC8vIGluIHRoZSB3b3JrZXJzIGNoYWluIGV4cGxvZGVkIGluIHRoZSBtaWRkbGUgb2YgdGhlIGNoYWluLFxuICAgICAgICAgICAgLy8gdGhlIGVycm9yIGV2ZW50IHdpbGwgZ28gZG93bndhcmQgYnV0IHdlIGFsc28gbmVlZCB0byBub3RpZnlcbiAgICAgICAgICAgIC8vIHdvcmtlcnMgdXB3YXJkIHRoYXQgdGhlcmUgaGFzIGJlZW4gYW4gZXJyb3IuXG4gICAgICAgICAgICBpZih0aGlzLnByZXZpb3VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91cy5lcnJvcihlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jbGVhblVwKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBBZGQgYSBjYWxsYmFjayBvbiBhbiBldmVudC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgKGRhdGEsIGVuZCwgZXJyb3IpXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgdGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkXG4gICAgICogQHJldHVybiB7R2VuZXJpY1dvcmtlcn0gdGhlIGN1cnJlbnQgb2JqZWN0IGZvciBjaGFpbmFiaWxpdHlcbiAgICAgKi9cbiAgICBvbiA6IGZ1bmN0aW9uIChuYW1lLCBsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9saXN0ZW5lcnNbbmFtZV0ucHVzaChsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQ2xlYW4gYW55IHJlZmVyZW5jZXMgd2hlbiBhIHdvcmtlciBpcyBlbmRpbmcuXG4gICAgICovXG4gICAgY2xlYW5VcCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zdHJlYW1JbmZvID0gdGhpcy5nZW5lcmF0ZWRFcnJvciA9IHRoaXMuZXh0cmFTdHJlYW1JbmZvID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW107XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyIGFuIGV2ZW50LiBUaGlzIHdpbGwgY2FsbCByZWdpc3RlcmVkIGNhbGxiYWNrIHdpdGggdGhlIHByb3ZpZGVkIGFyZy5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgKGRhdGEsIGVuZCwgZXJyb3IpXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGFyZyB0aGUgYXJndW1lbnQgdG8gY2FsbCB0aGUgY2FsbGJhY2sgd2l0aC5cbiAgICAgKi9cbiAgICBlbWl0IDogZnVuY3Rpb24gKG5hbWUsIGFyZykge1xuICAgICAgICBpZiAodGhpcy5fbGlzdGVuZXJzW25hbWVdKSB7XG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5fbGlzdGVuZXJzW25hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW25hbWVdW2ldLmNhbGwodGhpcywgYXJnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogQ2hhaW4gYSB3b3JrZXIgd2l0aCBhbiBvdGhlci5cbiAgICAgKiBAcGFyYW0ge1dvcmtlcn0gbmV4dCB0aGUgd29ya2VyIHJlY2VpdmluZyBldmVudHMgZnJvbSB0aGUgY3VycmVudCBvbmUuXG4gICAgICogQHJldHVybiB7d29ya2VyfSB0aGUgbmV4dCB3b3JrZXIgZm9yIGNoYWluYWJpbGl0eVxuICAgICAqL1xuICAgIHBpcGUgOiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgICByZXR1cm4gbmV4dC5yZWdpc3RlclByZXZpb3VzKHRoaXMpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogU2FtZSBhcyBgcGlwZWAgaW4gdGhlIG90aGVyIGRpcmVjdGlvbi5cbiAgICAgKiBVc2luZyBhbiBBUEkgd2l0aCBgcGlwZShuZXh0KWAgaXMgdmVyeSBlYXN5LlxuICAgICAqIEltcGxlbWVudGluZyB0aGUgQVBJIHdpdGggdGhlIHBvaW50IG9mIHZpZXcgb2YgdGhlIG5leHQgb25lIHJlZ2lzdGVyaW5nXG4gICAgICogYSBzb3VyY2UgaXMgZWFzaWVyLCBzZWUgdGhlIFppcEZpbGVXb3JrZXIuXG4gICAgICogQHBhcmFtIHtXb3JrZXJ9IHByZXZpb3VzIHRoZSBwcmV2aW91cyB3b3JrZXIsIHNlbmRpbmcgZXZlbnRzIHRvIHRoaXMgb25lXG4gICAgICogQHJldHVybiB7V29ya2VyfSB0aGUgY3VycmVudCB3b3JrZXIgZm9yIGNoYWluYWJpbGl0eVxuICAgICAqL1xuICAgIHJlZ2lzdGVyUHJldmlvdXMgOiBmdW5jdGlvbiAocHJldmlvdXMpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNMb2NrZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHJlYW0gJ1wiICsgdGhpcyArIFwiJyBoYXMgYWxyZWFkeSBiZWVuIHVzZWQuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2hhcmluZyB0aGUgc3RyZWFtSW5mby4uLlxuICAgICAgICB0aGlzLnN0cmVhbUluZm8gPSBwcmV2aW91cy5zdHJlYW1JbmZvO1xuICAgICAgICAvLyAuLi4gYW5kIGFkZGluZyBvdXIgb3duIGJpdHNcbiAgICAgICAgdGhpcy5tZXJnZVN0cmVhbUluZm8oKTtcbiAgICAgICAgdGhpcy5wcmV2aW91cyA9ICBwcmV2aW91cztcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBwcmV2aW91cy5vbignZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xuICAgICAgICAgICAgc2VsZi5wcm9jZXNzQ2h1bmsoY2h1bmspO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJldmlvdXMub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuZW5kKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBwcmV2aW91cy5vbignZXJyb3InLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgc2VsZi5lcnJvcihlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogUGF1c2UgdGhlIHN0cmVhbSBzbyBpdCBkb2Vzbid0IHNlbmQgZXZlbnRzIGFueW1vcmUuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGNhbGwgcGF1c2VkIHRoZSB3b3JrZXIsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBwYXVzZSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYodGhpcy5pc1BhdXNlZCB8fCB0aGlzLmlzRmluaXNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gdHJ1ZTtcblxuICAgICAgICBpZih0aGlzLnByZXZpb3VzKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBSZXN1bWUgYSBwYXVzZWQgc3RyZWFtLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgdGhpcyBjYWxsIHJlc3VtZWQgdGhlIHdvcmtlciwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIHJlc3VtZSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYoIXRoaXMuaXNQYXVzZWQgfHwgdGhpcy5pc0ZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGlmIHRydWUsIHRoZSB3b3JrZXIgdHJpZWQgdG8gcmVzdW1lIGJ1dCBmYWlsZWRcbiAgICAgICAgdmFyIHdpdGhFcnJvciA9IGZhbHNlO1xuICAgICAgICBpZih0aGlzLmdlbmVyYXRlZEVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKHRoaXMuZ2VuZXJhdGVkRXJyb3IpO1xuICAgICAgICAgICAgd2l0aEVycm9yID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnByZXZpb3VzKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzLnJlc3VtZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICF3aXRoRXJyb3I7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBGbHVzaCBhbnkgcmVtYWluaW5nIGJ5dGVzIGFzIHRoZSBzdHJlYW0gaXMgZW5kaW5nLlxuICAgICAqL1xuICAgIGZsdXNoIDogZnVuY3Rpb24gKCkge30sXG4gICAgLyoqXG4gICAgICogUHJvY2VzcyBhIGNodW5rLiBUaGlzIGlzIHVzdWFsbHkgdGhlIG1ldGhvZCBvdmVycmlkZGVuLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjaHVuayB0aGUgY2h1bmsgdG8gcHJvY2Vzcy5cbiAgICAgKi9cbiAgICBwcm9jZXNzQ2h1bmsgOiBmdW5jdGlvbihjaHVuaykge1xuICAgICAgICB0aGlzLnB1c2goY2h1bmspO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQWRkIGEga2V5L3ZhbHVlIHRvIGJlIGFkZGVkIGluIHRoZSB3b3JrZXJzIGNoYWluIHN0cmVhbUluZm8gb25jZSBhY3RpdmF0ZWQuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleSB0aGUga2V5IHRvIHVzZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSB0aGUgYXNzb2NpYXRlZCB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1dvcmtlcn0gdGhlIGN1cnJlbnQgd29ya2VyIGZvciBjaGFpbmFiaWxpdHlcbiAgICAgKi9cbiAgICB3aXRoU3RyZWFtSW5mbyA6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZXh0cmFTdHJlYW1JbmZvW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5tZXJnZVN0cmVhbUluZm8oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBNZXJnZSB0aGlzIHdvcmtlcidzIHN0cmVhbUluZm8gaW50byB0aGUgY2hhaW4ncyBzdHJlYW1JbmZvLlxuICAgICAqL1xuICAgIG1lcmdlU3RyZWFtSW5mbyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gdGhpcy5leHRyYVN0cmVhbUluZm8pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5leHRyYVN0cmVhbUluZm8uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdHJlYW1JbmZvW2tleV0gPSB0aGlzLmV4dHJhU3RyZWFtSW5mb1trZXldO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIExvY2sgdGhlIHN0cmVhbSB0byBwcmV2ZW50IGZ1cnRoZXIgdXBkYXRlcyBvbiB0aGUgd29ya2VycyBjaGFpbi5cbiAgICAgKiBBZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kLCBhbGwgY2FsbHMgdG8gcGlwZSB3aWxsIGZhaWwuXG4gICAgICovXG4gICAgbG9jazogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc0xvY2tlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0cmVhbSAnXCIgKyB0aGlzICsgXCInIGhhcyBhbHJlYWR5IGJlZW4gdXNlZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0xvY2tlZCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzLmxvY2soKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIFByZXR0eSBwcmludCB0aGUgd29ya2VycyBjaGFpbi5cbiAgICAgKi9cbiAgICB0b1N0cmluZyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1lID0gXCJXb3JrZXIgXCIgKyB0aGlzLm5hbWU7XG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2aW91cyArIFwiIC0+IFwiICsgbWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbWU7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdlbmVyaWNXb3JrZXI7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgc3VwcG9ydCA9IHJlcXVpcmUoJy4vc3VwcG9ydCcpO1xudmFyIG5vZGVqc1V0aWxzID0gcmVxdWlyZSgnLi9ub2RlanNVdGlscycpO1xudmFyIEdlbmVyaWNXb3JrZXIgPSByZXF1aXJlKCcuL3N0cmVhbS9HZW5lcmljV29ya2VyJyk7XG5cbi8qKlxuICogVGhlIGZvbGxvd2luZyBmdW5jdGlvbnMgY29tZSBmcm9tIHBha28sIGZyb20gcGFrby9saWIvdXRpbHMvc3RyaW5nc1xuICogcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgcGFrbyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWNhL3Bha28vXG4gKi9cblxuLy8gVGFibGUgd2l0aCB1dGY4IGxlbmd0aHMgKGNhbGN1bGF0ZWQgYnkgZmlyc3QgYnl0ZSBvZiBzZXF1ZW5jZSlcbi8vIE5vdGUsIHRoYXQgNSAmIDYtYnl0ZSB2YWx1ZXMgYW5kIHNvbWUgNC1ieXRlIHZhbHVlcyBjYW4gbm90IGJlIHJlcHJlc2VudGVkIGluIEpTLFxuLy8gYmVjYXVzZSBtYXggcG9zc2libGUgY29kZXBvaW50IGlzIDB4MTBmZmZmXG52YXIgX3V0ZjhsZW4gPSBuZXcgQXJyYXkoMjU2KTtcbmZvciAodmFyIGk9MDsgaTwyNTY7IGkrKykge1xuICBfdXRmOGxlbltpXSA9IChpID49IDI1MiA/IDYgOiBpID49IDI0OCA/IDUgOiBpID49IDI0MCA/IDQgOiBpID49IDIyNCA/IDMgOiBpID49IDE5MiA/IDIgOiAxKTtcbn1cbl91dGY4bGVuWzI1NF09X3V0ZjhsZW5bMjU0XT0xOyAvLyBJbnZhbGlkIHNlcXVlbmNlIHN0YXJ0XG5cbi8vIGNvbnZlcnQgc3RyaW5nIHRvIGFycmF5ICh0eXBlZCwgd2hlbiBwb3NzaWJsZSlcbnZhciBzdHJpbmcyYnVmID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHZhciBidWYsIGMsIGMyLCBtX3BvcywgaSwgc3RyX2xlbiA9IHN0ci5sZW5ndGgsIGJ1Zl9sZW4gPSAwO1xuXG4gICAgLy8gY291bnQgYmluYXJ5IHNpemVcbiAgICBmb3IgKG1fcG9zID0gMDsgbV9wb3MgPCBzdHJfbGVuOyBtX3BvcysrKSB7XG4gICAgICAgIGMgPSBzdHIuY2hhckNvZGVBdChtX3Bvcyk7XG4gICAgICAgIGlmICgoYyAmIDB4ZmMwMCkgPT09IDB4ZDgwMCAmJiAobV9wb3MrMSA8IHN0cl9sZW4pKSB7XG4gICAgICAgICAgICBjMiA9IHN0ci5jaGFyQ29kZUF0KG1fcG9zKzEpO1xuICAgICAgICAgICAgaWYgKChjMiAmIDB4ZmMwMCkgPT09IDB4ZGMwMCkge1xuICAgICAgICAgICAgICAgIGMgPSAweDEwMDAwICsgKChjIC0gMHhkODAwKSA8PCAxMCkgKyAoYzIgLSAweGRjMDApO1xuICAgICAgICAgICAgICAgIG1fcG9zKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnVmX2xlbiArPSBjIDwgMHg4MCA/IDEgOiBjIDwgMHg4MDAgPyAyIDogYyA8IDB4MTAwMDAgPyAzIDogNDtcbiAgICB9XG5cbiAgICAvLyBhbGxvY2F0ZSBidWZmZXJcbiAgICBpZiAoc3VwcG9ydC51aW50OGFycmF5KSB7XG4gICAgICAgIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGJ1Zl9sZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1ZiA9IG5ldyBBcnJheShidWZfbGVuKTtcbiAgICB9XG5cbiAgICAvLyBjb252ZXJ0XG4gICAgZm9yIChpPTAsIG1fcG9zID0gMDsgaSA8IGJ1Zl9sZW47IG1fcG9zKyspIHtcbiAgICAgICAgYyA9IHN0ci5jaGFyQ29kZUF0KG1fcG9zKTtcbiAgICAgICAgaWYgKChjICYgMHhmYzAwKSA9PT0gMHhkODAwICYmIChtX3BvcysxIDwgc3RyX2xlbikpIHtcbiAgICAgICAgICAgIGMyID0gc3RyLmNoYXJDb2RlQXQobV9wb3MrMSk7XG4gICAgICAgICAgICBpZiAoKGMyICYgMHhmYzAwKSA9PT0gMHhkYzAwKSB7XG4gICAgICAgICAgICAgICAgYyA9IDB4MTAwMDAgKyAoKGMgLSAweGQ4MDApIDw8IDEwKSArIChjMiAtIDB4ZGMwMCk7XG4gICAgICAgICAgICAgICAgbV9wb3MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYyA8IDB4ODApIHtcbiAgICAgICAgICAgIC8qIG9uZSBieXRlICovXG4gICAgICAgICAgICBidWZbaSsrXSA9IGM7XG4gICAgICAgIH0gZWxzZSBpZiAoYyA8IDB4ODAwKSB7XG4gICAgICAgICAgICAvKiB0d28gYnl0ZXMgKi9cbiAgICAgICAgICAgIGJ1ZltpKytdID0gMHhDMCB8IChjID4+PiA2KTtcbiAgICAgICAgICAgIGJ1ZltpKytdID0gMHg4MCB8IChjICYgMHgzZik7XG4gICAgICAgIH0gZWxzZSBpZiAoYyA8IDB4MTAwMDApIHtcbiAgICAgICAgICAgIC8qIHRocmVlIGJ5dGVzICovXG4gICAgICAgICAgICBidWZbaSsrXSA9IDB4RTAgfCAoYyA+Pj4gMTIpO1xuICAgICAgICAgICAgYnVmW2krK10gPSAweDgwIHwgKGMgPj4+IDYgJiAweDNmKTtcbiAgICAgICAgICAgIGJ1ZltpKytdID0gMHg4MCB8IChjICYgMHgzZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKiBmb3VyIGJ5dGVzICovXG4gICAgICAgICAgICBidWZbaSsrXSA9IDB4ZjAgfCAoYyA+Pj4gMTgpO1xuICAgICAgICAgICAgYnVmW2krK10gPSAweDgwIHwgKGMgPj4+IDEyICYgMHgzZik7XG4gICAgICAgICAgICBidWZbaSsrXSA9IDB4ODAgfCAoYyA+Pj4gNiAmIDB4M2YpO1xuICAgICAgICAgICAgYnVmW2krK10gPSAweDgwIHwgKGMgJiAweDNmKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBidWY7XG59O1xuXG4vLyBDYWxjdWxhdGUgbWF4IHBvc3NpYmxlIHBvc2l0aW9uIGluIHV0ZjggYnVmZmVyLFxuLy8gdGhhdCB3aWxsIG5vdCBicmVhayBzZXF1ZW5jZS4gSWYgdGhhdCdzIG5vdCBwb3NzaWJsZVxuLy8gLSAodmVyeSBzbWFsbCBsaW1pdHMpIHJldHVybiBtYXggc2l6ZSBhcyBpcy5cbi8vXG4vLyBidWZbXSAtIHV0ZjggYnl0ZXMgYXJyYXlcbi8vIG1heCAgIC0gbGVuZ3RoIGxpbWl0IChtYW5kYXRvcnkpO1xudmFyIHV0Zjhib3JkZXIgPSBmdW5jdGlvbihidWYsIG1heCkge1xuICAgIHZhciBwb3M7XG5cbiAgICBtYXggPSBtYXggfHwgYnVmLmxlbmd0aDtcbiAgICBpZiAobWF4ID4gYnVmLmxlbmd0aCkgeyBtYXggPSBidWYubGVuZ3RoOyB9XG5cbiAgICAvLyBnbyBiYWNrIGZyb20gbGFzdCBwb3NpdGlvbiwgdW50aWwgc3RhcnQgb2Ygc2VxdWVuY2UgZm91bmRcbiAgICBwb3MgPSBtYXgtMTtcbiAgICB3aGlsZSAocG9zID49IDAgJiYgKGJ1Zltwb3NdICYgMHhDMCkgPT09IDB4ODApIHsgcG9zLS07IH1cblxuICAgIC8vIEZ1Y2t1cCAtIHZlcnkgc21hbGwgYW5kIGJyb2tlbiBzZXF1ZW5jZSxcbiAgICAvLyByZXR1cm4gbWF4LCBiZWNhdXNlIHdlIHNob3VsZCByZXR1cm4gc29tZXRoaW5nIGFueXdheS5cbiAgICBpZiAocG9zIDwgMCkgeyByZXR1cm4gbWF4OyB9XG5cbiAgICAvLyBJZiB3ZSBjYW1lIHRvIHN0YXJ0IG9mIGJ1ZmZlciAtIHRoYXQgbWVhbnMgdnVmZmVyIGlzIHRvbyBzbWFsbCxcbiAgICAvLyByZXR1cm4gbWF4IHRvby5cbiAgICBpZiAocG9zID09PSAwKSB7IHJldHVybiBtYXg7IH1cblxuICAgIHJldHVybiAocG9zICsgX3V0ZjhsZW5bYnVmW3Bvc11dID4gbWF4KSA/IHBvcyA6IG1heDtcbn07XG5cbi8vIGNvbnZlcnQgYXJyYXkgdG8gc3RyaW5nXG52YXIgYnVmMnN0cmluZyA9IGZ1bmN0aW9uIChidWYpIHtcbiAgICB2YXIgc3RyLCBpLCBvdXQsIGMsIGNfbGVuO1xuICAgIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuXG4gICAgLy8gUmVzZXJ2ZSBtYXggcG9zc2libGUgbGVuZ3RoICgyIHdvcmRzIHBlciBjaGFyKVxuICAgIC8vIE5COiBieSB1bmtub3duIHJlYXNvbnMsIEFycmF5IGlzIHNpZ25pZmljYW50bHkgZmFzdGVyIGZvclxuICAgIC8vICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5IHRoYW4gVWludDE2QXJyYXkuXG4gICAgdmFyIHV0ZjE2YnVmID0gbmV3IEFycmF5KGxlbioyKTtcblxuICAgIGZvciAob3V0PTAsIGk9MDsgaTxsZW47KSB7XG4gICAgICAgIGMgPSBidWZbaSsrXTtcbiAgICAgICAgLy8gcXVpY2sgcHJvY2VzcyBhc2NpaVxuICAgICAgICBpZiAoYyA8IDB4ODApIHsgdXRmMTZidWZbb3V0KytdID0gYzsgY29udGludWU7IH1cblxuICAgICAgICBjX2xlbiA9IF91dGY4bGVuW2NdO1xuICAgICAgICAvLyBza2lwIDUgJiA2IGJ5dGUgY29kZXNcbiAgICAgICAgaWYgKGNfbGVuID4gNCkgeyB1dGYxNmJ1ZltvdXQrK10gPSAweGZmZmQ7IGkgKz0gY19sZW4tMTsgY29udGludWU7IH1cblxuICAgICAgICAvLyBhcHBseSBtYXNrIG9uIGZpcnN0IGJ5dGVcbiAgICAgICAgYyAmPSBjX2xlbiA9PT0gMiA/IDB4MWYgOiBjX2xlbiA9PT0gMyA/IDB4MGYgOiAweDA3O1xuICAgICAgICAvLyBqb2luIHRoZSByZXN0XG4gICAgICAgIHdoaWxlIChjX2xlbiA+IDEgJiYgaSA8IGxlbikge1xuICAgICAgICAgICAgYyA9IChjIDw8IDYpIHwgKGJ1ZltpKytdICYgMHgzZik7XG4gICAgICAgICAgICBjX2xlbi0tO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGVybWluYXRlZCBieSBlbmQgb2Ygc3RyaW5nP1xuICAgICAgICBpZiAoY19sZW4gPiAxKSB7IHV0ZjE2YnVmW291dCsrXSA9IDB4ZmZmZDsgY29udGludWU7IH1cblxuICAgICAgICBpZiAoYyA8IDB4MTAwMDApIHtcbiAgICAgICAgICAgIHV0ZjE2YnVmW291dCsrXSA9IGM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjIC09IDB4MTAwMDA7XG4gICAgICAgICAgICB1dGYxNmJ1ZltvdXQrK10gPSAweGQ4MDAgfCAoKGMgPj4gMTApICYgMHgzZmYpO1xuICAgICAgICAgICAgdXRmMTZidWZbb3V0KytdID0gMHhkYzAwIHwgKGMgJiAweDNmZik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzaHJpbmtCdWYodXRmMTZidWYsIG91dClcbiAgICBpZiAodXRmMTZidWYubGVuZ3RoICE9PSBvdXQpIHtcbiAgICAgICAgaWYodXRmMTZidWYuc3ViYXJyYXkpIHtcbiAgICAgICAgICAgIHV0ZjE2YnVmID0gdXRmMTZidWYuc3ViYXJyYXkoMCwgb3V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHV0ZjE2YnVmLmxlbmd0aCA9IG91dDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIHV0ZjE2YnVmKTtcbiAgICByZXR1cm4gdXRpbHMuYXBwbHlGcm9tQ2hhckNvZGUodXRmMTZidWYpO1xufTtcblxuXG4vLyBUaGF0J3MgYWxsIGZvciB0aGUgcGFrbyBmdW5jdGlvbnMuXG5cblxuLyoqXG4gKiBUcmFuc2Zvcm0gYSBqYXZhc2NyaXB0IHN0cmluZyBpbnRvIGFuIGFycmF5ICh0eXBlZCBpZiBwb3NzaWJsZSkgb2YgYnl0ZXMsXG4gKiBVVEYtOCBlbmNvZGVkLlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciB0aGUgc3RyaW5nIHRvIGVuY29kZVxuICogQHJldHVybiB7QXJyYXl8VWludDhBcnJheXxCdWZmZXJ9IHRoZSBVVEYtOCBlbmNvZGVkIHN0cmluZy5cbiAqL1xuZXhwb3J0cy51dGY4ZW5jb2RlID0gZnVuY3Rpb24gdXRmOGVuY29kZShzdHIpIHtcbiAgICBpZiAoc3VwcG9ydC5ub2RlYnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBub2RlanNVdGlscy5uZXdCdWZmZXJGcm9tKHN0ciwgXCJ1dGYtOFwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyaW5nMmJ1ZihzdHIpO1xufTtcblxuXG4vKipcbiAqIFRyYW5zZm9ybSBhIGJ5dGVzIGFycmF5IChvciBhIHJlcHJlc2VudGF0aW9uKSByZXByZXNlbnRpbmcgYW4gVVRGLTggZW5jb2RlZFxuICogc3RyaW5nIGludG8gYSBqYXZhc2NyaXB0IHN0cmluZy5cbiAqIEBwYXJhbSB7QXJyYXl8VWludDhBcnJheXxCdWZmZXJ9IGJ1ZiB0aGUgZGF0YSBkZSBkZWNvZGVcbiAqIEByZXR1cm4ge1N0cmluZ30gdGhlIGRlY29kZWQgc3RyaW5nLlxuICovXG5leHBvcnRzLnV0ZjhkZWNvZGUgPSBmdW5jdGlvbiB1dGY4ZGVjb2RlKGJ1Zikge1xuICAgIGlmIChzdXBwb3J0Lm5vZGVidWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLnRyYW5zZm9ybVRvKFwibm9kZWJ1ZmZlclwiLCBidWYpLnRvU3RyaW5nKFwidXRmLThcIik7XG4gICAgfVxuXG4gICAgYnVmID0gdXRpbHMudHJhbnNmb3JtVG8oc3VwcG9ydC51aW50OGFycmF5ID8gXCJ1aW50OGFycmF5XCIgOiBcImFycmF5XCIsIGJ1Zik7XG5cbiAgICByZXR1cm4gYnVmMnN0cmluZyhidWYpO1xufTtcblxuLyoqXG4gKiBBIHdvcmtlciB0byBkZWNvZGUgdXRmOCBlbmNvZGVkIGJpbmFyeSBjaHVua3MgaW50byBzdHJpbmcgY2h1bmtzLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFV0ZjhEZWNvZGVXb3JrZXIoKSB7XG4gICAgR2VuZXJpY1dvcmtlci5jYWxsKHRoaXMsIFwidXRmLTggZGVjb2RlXCIpO1xuICAgIC8vIHRoZSBsYXN0IGJ5dGVzIGlmIGEgY2h1bmsgZGlkbid0IGVuZCB3aXRoIGEgY29tcGxldGUgY29kZXBvaW50LlxuICAgIHRoaXMubGVmdE92ZXIgPSBudWxsO1xufVxudXRpbHMuaW5oZXJpdHMoVXRmOERlY29kZVdvcmtlciwgR2VuZXJpY1dvcmtlcik7XG5cbi8qKlxuICogQHNlZSBHZW5lcmljV29ya2VyLnByb2Nlc3NDaHVua1xuICovXG5VdGY4RGVjb2RlV29ya2VyLnByb3RvdHlwZS5wcm9jZXNzQ2h1bmsgPSBmdW5jdGlvbiAoY2h1bmspIHtcblxuICAgIHZhciBkYXRhID0gdXRpbHMudHJhbnNmb3JtVG8oc3VwcG9ydC51aW50OGFycmF5ID8gXCJ1aW50OGFycmF5XCIgOiBcImFycmF5XCIsIGNodW5rLmRhdGEpO1xuXG4gICAgLy8gMXN0IHN0ZXAsIHJlLXVzZSB3aGF0J3MgbGVmdCBvZiB0aGUgcHJldmlvdXMgY2h1bmtcbiAgICBpZiAodGhpcy5sZWZ0T3ZlciAmJiB0aGlzLmxlZnRPdmVyLmxlbmd0aCkge1xuICAgICAgICBpZihzdXBwb3J0LnVpbnQ4YXJyYXkpIHtcbiAgICAgICAgICAgIHZhciBwcmV2aW91c0RhdGEgPSBkYXRhO1xuICAgICAgICAgICAgZGF0YSA9IG5ldyBVaW50OEFycmF5KHByZXZpb3VzRGF0YS5sZW5ndGggKyB0aGlzLmxlZnRPdmVyLmxlbmd0aCk7XG4gICAgICAgICAgICBkYXRhLnNldCh0aGlzLmxlZnRPdmVyLCAwKTtcbiAgICAgICAgICAgIGRhdGEuc2V0KHByZXZpb3VzRGF0YSwgdGhpcy5sZWZ0T3Zlci5sZW5ndGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YSA9IHRoaXMubGVmdE92ZXIuY29uY2F0KGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGVmdE92ZXIgPSBudWxsO1xuICAgIH1cblxuICAgIHZhciBuZXh0Qm91bmRhcnkgPSB1dGY4Ym9yZGVyKGRhdGEpO1xuICAgIHZhciB1c2FibGVEYXRhID0gZGF0YTtcbiAgICBpZiAobmV4dEJvdW5kYXJ5ICE9PSBkYXRhLmxlbmd0aCkge1xuICAgICAgICBpZiAoc3VwcG9ydC51aW50OGFycmF5KSB7XG4gICAgICAgICAgICB1c2FibGVEYXRhID0gZGF0YS5zdWJhcnJheSgwLCBuZXh0Qm91bmRhcnkpO1xuICAgICAgICAgICAgdGhpcy5sZWZ0T3ZlciA9IGRhdGEuc3ViYXJyYXkobmV4dEJvdW5kYXJ5LCBkYXRhLmxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1c2FibGVEYXRhID0gZGF0YS5zbGljZSgwLCBuZXh0Qm91bmRhcnkpO1xuICAgICAgICAgICAgdGhpcy5sZWZ0T3ZlciA9IGRhdGEuc2xpY2UobmV4dEJvdW5kYXJ5LCBkYXRhLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnB1c2goe1xuICAgICAgICBkYXRhIDogZXhwb3J0cy51dGY4ZGVjb2RlKHVzYWJsZURhdGEpLFxuICAgICAgICBtZXRhIDogY2h1bmsubWV0YVxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBAc2VlIEdlbmVyaWNXb3JrZXIuZmx1c2hcbiAqL1xuVXRmOERlY29kZVdvcmtlci5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYodGhpcy5sZWZ0T3ZlciAmJiB0aGlzLmxlZnRPdmVyLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnB1c2goe1xuICAgICAgICAgICAgZGF0YSA6IGV4cG9ydHMudXRmOGRlY29kZSh0aGlzLmxlZnRPdmVyKSxcbiAgICAgICAgICAgIG1ldGEgOiB7fVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5sZWZ0T3ZlciA9IG51bGw7XG4gICAgfVxufTtcbmV4cG9ydHMuVXRmOERlY29kZVdvcmtlciA9IFV0ZjhEZWNvZGVXb3JrZXI7XG5cbi8qKlxuICogQSB3b3JrZXIgdG8gZW5kY29kZSBzdHJpbmcgY2h1bmtzIGludG8gdXRmOCBlbmNvZGVkIGJpbmFyeSBjaHVua3MuXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVXRmOEVuY29kZVdvcmtlcigpIHtcbiAgICBHZW5lcmljV29ya2VyLmNhbGwodGhpcywgXCJ1dGYtOCBlbmNvZGVcIik7XG59XG51dGlscy5pbmhlcml0cyhVdGY4RW5jb2RlV29ya2VyLCBHZW5lcmljV29ya2VyKTtcblxuLyoqXG4gKiBAc2VlIEdlbmVyaWNXb3JrZXIucHJvY2Vzc0NodW5rXG4gKi9cblV0ZjhFbmNvZGVXb3JrZXIucHJvdG90eXBlLnByb2Nlc3NDaHVuayA9IGZ1bmN0aW9uIChjaHVuaykge1xuICAgIHRoaXMucHVzaCh7XG4gICAgICAgIGRhdGEgOiBleHBvcnRzLnV0ZjhlbmNvZGUoY2h1bmsuZGF0YSksXG4gICAgICAgIG1ldGEgOiBjaHVuay5tZXRhXG4gICAgfSk7XG59O1xuZXhwb3J0cy5VdGY4RW5jb2RlV29ya2VyID0gVXRmOEVuY29kZVdvcmtlcjtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBHZW5lcmljV29ya2VyID0gcmVxdWlyZSgnLi9HZW5lcmljV29ya2VyJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIEEgd29ya2VyIHdoaWNoIGNvbnZlcnQgY2h1bmtzIHRvIGEgc3BlY2lmaWVkIHR5cGUuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBkZXN0VHlwZSB0aGUgZGVzdGluYXRpb24gdHlwZS5cbiAqL1xuZnVuY3Rpb24gQ29udmVydFdvcmtlcihkZXN0VHlwZSkge1xuICAgIEdlbmVyaWNXb3JrZXIuY2FsbCh0aGlzLCBcIkNvbnZlcnRXb3JrZXIgdG8gXCIgKyBkZXN0VHlwZSk7XG4gICAgdGhpcy5kZXN0VHlwZSA9IGRlc3RUeXBlO1xufVxudXRpbHMuaW5oZXJpdHMoQ29udmVydFdvcmtlciwgR2VuZXJpY1dvcmtlcik7XG5cbi8qKlxuICogQHNlZSBHZW5lcmljV29ya2VyLnByb2Nlc3NDaHVua1xuICovXG5Db252ZXJ0V29ya2VyLnByb3RvdHlwZS5wcm9jZXNzQ2h1bmsgPSBmdW5jdGlvbiAoY2h1bmspIHtcbiAgICB0aGlzLnB1c2goe1xuICAgICAgICBkYXRhIDogdXRpbHMudHJhbnNmb3JtVG8odGhpcy5kZXN0VHlwZSwgY2h1bmsuZGF0YSksXG4gICAgICAgIG1ldGEgOiBjaHVuay5tZXRhXG4gICAgfSk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBDb252ZXJ0V29ya2VyO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWRhYmxlID0gcmVxdWlyZSgncmVhZGFibGUtc3RyZWFtJykuUmVhZGFibGU7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG51dGlscy5pbmhlcml0cyhOb2RlanNTdHJlYW1PdXRwdXRBZGFwdGVyLCBSZWFkYWJsZSk7XG5cbi8qKlxuKiBBIG5vZGVqcyBzdHJlYW0gdXNpbmcgYSB3b3JrZXIgYXMgc291cmNlLlxuKiBAc2VlIHRoZSBTb3VyY2VXcmFwcGVyIGluIGh0dHA6Ly9ub2RlanMub3JnL2FwaS9zdHJlYW0uaHRtbFxuKiBAY29uc3RydWN0b3JcbiogQHBhcmFtIHtTdHJlYW1IZWxwZXJ9IGhlbHBlciB0aGUgaGVscGVyIHdyYXBwaW5nIHRoZSB3b3JrZXJcbiogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgdGhlIG5vZGVqcyBzdHJlYW0gb3B0aW9uc1xuKiBAcGFyYW0ge0Z1bmN0aW9ufSB1cGRhdGVDYiB0aGUgdXBkYXRlIGNhbGxiYWNrLlxuKi9cbmZ1bmN0aW9uIE5vZGVqc1N0cmVhbU91dHB1dEFkYXB0ZXIoaGVscGVyLCBvcHRpb25zLCB1cGRhdGVDYikge1xuICAgIFJlYWRhYmxlLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5faGVscGVyID0gaGVscGVyO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGhlbHBlci5vbihcImRhdGFcIiwgZnVuY3Rpb24gKGRhdGEsIG1ldGEpIHtcbiAgICAgICAgaWYgKCFzZWxmLnB1c2goZGF0YSkpIHtcbiAgICAgICAgICAgIHNlbGYuX2hlbHBlci5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHVwZGF0ZUNiKSB7XG4gICAgICAgICAgICB1cGRhdGVDYihtZXRhKTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgLm9uKFwiZXJyb3JcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBzZWxmLmVtaXQoJ2Vycm9yJywgZSk7XG4gICAgfSlcbiAgICAub24oXCJlbmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLnB1c2gobnVsbCk7XG4gICAgfSk7XG59XG5cblxuTm9kZWpzU3RyZWFtT3V0cHV0QWRhcHRlci5wcm90b3R5cGUuX3JlYWQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9oZWxwZXIucmVzdW1lKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGVqc1N0cmVhbU91dHB1dEFkYXB0ZXI7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIENvbnZlcnRXb3JrZXIgPSByZXF1aXJlKCcuL0NvbnZlcnRXb3JrZXInKTtcbnZhciBHZW5lcmljV29ya2VyID0gcmVxdWlyZSgnLi9HZW5lcmljV29ya2VyJyk7XG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnLi4vYmFzZTY0Jyk7XG52YXIgc3VwcG9ydCA9IHJlcXVpcmUoXCIuLi9zdXBwb3J0XCIpO1xudmFyIGV4dGVybmFsID0gcmVxdWlyZShcIi4uL2V4dGVybmFsXCIpO1xuXG52YXIgTm9kZWpzU3RyZWFtT3V0cHV0QWRhcHRlciA9IG51bGw7XG5pZiAoc3VwcG9ydC5ub2Rlc3RyZWFtKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgTm9kZWpzU3RyZWFtT3V0cHV0QWRhcHRlciA9IHJlcXVpcmUoJy4uL25vZGVqcy9Ob2RlanNTdHJlYW1PdXRwdXRBZGFwdGVyJyk7XG4gICAgfSBjYXRjaChlKSB7fVxufVxuXG4vKipcbiAqIEFwcGx5IHRoZSBmaW5hbCB0cmFuc2Zvcm1hdGlvbiBvZiB0aGUgZGF0YS4gSWYgdGhlIHVzZXIgd2FudHMgYSBCbG9iIGZvclxuICogZXhhbXBsZSwgaXQncyBlYXNpZXIgdG8gd29yayB3aXRoIGFuIFU4aW50QXJyYXkgYW5kIGZpbmFsbHkgZG8gdGhlXG4gKiBBcnJheUJ1ZmZlci9CbG9iIGNvbnZlcnNpb24uXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSB0aGUgbmFtZSBvZiB0aGUgZmluYWwgdHlwZVxuICogQHBhcmFtIHtTdHJpbmd8VWludDhBcnJheXxCdWZmZXJ9IGNvbnRlbnQgdGhlIGNvbnRlbnQgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge1N0cmluZ30gbWltZVR5cGUgdGhlIG1pbWUgdHlwZSBvZiB0aGUgY29udGVudCwgaWYgYXBwbGljYWJsZS5cbiAqIEByZXR1cm4ge1N0cmluZ3xVaW50OEFycmF5fEFycmF5QnVmZmVyfEJ1ZmZlcnxCbG9ifSB0aGUgY29udGVudCBpbiB0aGUgcmlnaHQgZm9ybWF0LlxuICovXG5mdW5jdGlvbiB0cmFuc2Zvcm1aaXBPdXRwdXQodHlwZSwgY29udGVudCwgbWltZVR5cGUpIHtcbiAgICBzd2l0Y2godHlwZSkge1xuICAgICAgICBjYXNlIFwiYmxvYlwiIDpcbiAgICAgICAgICAgIHJldHVybiB1dGlscy5uZXdCbG9iKHV0aWxzLnRyYW5zZm9ybVRvKFwiYXJyYXlidWZmZXJcIiwgY29udGVudCksIG1pbWVUeXBlKTtcbiAgICAgICAgY2FzZSBcImJhc2U2NFwiIDpcbiAgICAgICAgICAgIHJldHVybiBiYXNlNjQuZW5jb2RlKGNvbnRlbnQpO1xuICAgICAgICBkZWZhdWx0IDpcbiAgICAgICAgICAgIHJldHVybiB1dGlscy50cmFuc2Zvcm1Ubyh0eXBlLCBjb250ZW50KTtcbiAgICB9XG59XG5cbi8qKlxuICogQ29uY2F0ZW5hdGUgYW4gYXJyYXkgb2YgZGF0YSBvZiB0aGUgZ2l2ZW4gdHlwZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIHRoZSB0eXBlIG9mIHRoZSBkYXRhIGluIHRoZSBnaXZlbiBhcnJheS5cbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGFBcnJheSB0aGUgYXJyYXkgY29udGFpbmluZyB0aGUgZGF0YSBjaHVua3MgdG8gY29uY2F0ZW5hdGVcbiAqIEByZXR1cm4ge1N0cmluZ3xVaW50OEFycmF5fEJ1ZmZlcn0gdGhlIGNvbmNhdGVuYXRlZCBkYXRhXG4gKiBAdGhyb3dzIEVycm9yIGlmIHRoZSBhc2tlZCB0eXBlIGlzIHVuc3VwcG9ydGVkXG4gKi9cbmZ1bmN0aW9uIGNvbmNhdCAodHlwZSwgZGF0YUFycmF5KSB7XG4gICAgdmFyIGksIGluZGV4ID0gMCwgcmVzID0gbnVsbCwgdG90YWxMZW5ndGggPSAwO1xuICAgIGZvcihpID0gMDsgaSA8IGRhdGFBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICB0b3RhbExlbmd0aCArPSBkYXRhQXJyYXlbaV0ubGVuZ3RoO1xuICAgIH1cbiAgICBzd2l0Y2godHlwZSkge1xuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgICByZXR1cm4gZGF0YUFycmF5LmpvaW4oXCJcIik7XG4gICAgICAgICAgY2FzZSBcImFycmF5XCI6XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgZGF0YUFycmF5KTtcbiAgICAgICAgY2FzZSBcInVpbnQ4YXJyYXlcIjpcbiAgICAgICAgICAgIHJlcyA9IG5ldyBVaW50OEFycmF5KHRvdGFsTGVuZ3RoKTtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGRhdGFBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHJlcy5zZXQoZGF0YUFycmF5W2ldLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgaW5kZXggKz0gZGF0YUFycmF5W2ldLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIGNhc2UgXCJub2RlYnVmZmVyXCI6XG4gICAgICAgICAgICByZXR1cm4gQnVmZmVyLmNvbmNhdChkYXRhQXJyYXkpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29uY2F0IDogdW5zdXBwb3J0ZWQgdHlwZSAnXCIgICsgdHlwZSArIFwiJ1wiKTtcbiAgICB9XG59XG5cbi8qKlxuICogTGlzdGVuIGEgU3RyZWFtSGVscGVyLCBhY2N1bXVsYXRlIGl0cyBjb250ZW50IGFuZCBjb25jYXRlbmF0ZSBpdCBpbnRvIGFcbiAqIGNvbXBsZXRlIGJsb2NrLlxuICogQHBhcmFtIHtTdHJlYW1IZWxwZXJ9IGhlbHBlciB0aGUgaGVscGVyIHRvIHVzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHVwZGF0ZUNhbGxiYWNrIGEgY2FsbGJhY2sgY2FsbGVkIG9uIGVhY2ggdXBkYXRlLiBDYWxsZWRcbiAqIHdpdGggb25lIGFyZyA6XG4gKiAtIHRoZSBtZXRhZGF0YSBsaW5rZWQgdG8gdGhlIHVwZGF0ZSByZWNlaXZlZC5cbiAqIEByZXR1cm4gUHJvbWlzZSB0aGUgcHJvbWlzZSBmb3IgdGhlIGFjY3VtdWxhdGlvbi5cbiAqL1xuZnVuY3Rpb24gYWNjdW11bGF0ZShoZWxwZXIsIHVwZGF0ZUNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIG5ldyBleHRlcm5hbC5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgICB2YXIgZGF0YUFycmF5ID0gW107XG4gICAgICAgIHZhciBjaHVua1R5cGUgPSBoZWxwZXIuX2ludGVybmFsVHlwZSxcbiAgICAgICAgICAgIHJlc3VsdFR5cGUgPSBoZWxwZXIuX291dHB1dFR5cGUsXG4gICAgICAgICAgICBtaW1lVHlwZSA9IGhlbHBlci5fbWltZVR5cGU7XG4gICAgICAgIGhlbHBlclxuICAgICAgICAub24oJ2RhdGEnLCBmdW5jdGlvbiAoZGF0YSwgbWV0YSkge1xuICAgICAgICAgICAgZGF0YUFycmF5LnB1c2goZGF0YSk7XG4gICAgICAgICAgICBpZih1cGRhdGVDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHVwZGF0ZUNhbGxiYWNrKG1ldGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2Vycm9yJywgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBkYXRhQXJyYXkgPSBbXTtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2VuZCcsIGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdHJhbnNmb3JtWmlwT3V0cHV0KHJlc3VsdFR5cGUsIGNvbmNhdChjaHVua1R5cGUsIGRhdGFBcnJheSksIG1pbWVUeXBlKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0YUFycmF5ID0gW107XG4gICAgICAgIH0pXG4gICAgICAgIC5yZXN1bWUoKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBBbiBoZWxwZXIgdG8gZWFzaWx5IHVzZSB3b3JrZXJzIG91dHNpZGUgb2YgSlNaaXAuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7V29ya2VyfSB3b3JrZXIgdGhlIHdvcmtlciB0byB3cmFwXG4gKiBAcGFyYW0ge1N0cmluZ30gb3V0cHV0VHlwZSB0aGUgdHlwZSBvZiBkYXRhIGV4cGVjdGVkIGJ5IHRoZSB1c2VcbiAqIEBwYXJhbSB7U3RyaW5nfSBtaW1lVHlwZSB0aGUgbWltZSB0eXBlIG9mIHRoZSBjb250ZW50LCBpZiBhcHBsaWNhYmxlLlxuICovXG5mdW5jdGlvbiBTdHJlYW1IZWxwZXIod29ya2VyLCBvdXRwdXRUeXBlLCBtaW1lVHlwZSkge1xuICAgIHZhciBpbnRlcm5hbFR5cGUgPSBvdXRwdXRUeXBlO1xuICAgIHN3aXRjaChvdXRwdXRUeXBlKSB7XG4gICAgICAgIGNhc2UgXCJibG9iXCI6XG4gICAgICAgIGNhc2UgXCJhcnJheWJ1ZmZlclwiOlxuICAgICAgICAgICAgaW50ZXJuYWxUeXBlID0gXCJ1aW50OGFycmF5XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYmFzZTY0XCI6XG4gICAgICAgICAgICBpbnRlcm5hbFR5cGUgPSBcInN0cmluZ1wiO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICAvLyB0aGUgdHlwZSB1c2VkIGludGVybmFsbHlcbiAgICAgICAgdGhpcy5faW50ZXJuYWxUeXBlID0gaW50ZXJuYWxUeXBlO1xuICAgICAgICAvLyB0aGUgdHlwZSB1c2VkIHRvIG91dHB1dCByZXN1bHRzXG4gICAgICAgIHRoaXMuX291dHB1dFR5cGUgPSBvdXRwdXRUeXBlO1xuICAgICAgICAvLyB0aGUgbWltZSB0eXBlXG4gICAgICAgIHRoaXMuX21pbWVUeXBlID0gbWltZVR5cGU7XG4gICAgICAgIHV0aWxzLmNoZWNrU3VwcG9ydChpbnRlcm5hbFR5cGUpO1xuICAgICAgICB0aGlzLl93b3JrZXIgPSB3b3JrZXIucGlwZShuZXcgQ29udmVydFdvcmtlcihpbnRlcm5hbFR5cGUpKTtcbiAgICAgICAgLy8gdGhlIGxhc3Qgd29ya2VycyBjYW4gYmUgcmV3aXJlZCB3aXRob3V0IGlzc3VlcyBidXQgd2UgbmVlZCB0b1xuICAgICAgICAvLyBwcmV2ZW50IGFueSB1cGRhdGVzIG9uIHByZXZpb3VzIHdvcmtlcnMuXG4gICAgICAgIHdvcmtlci5sb2NrKCk7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHRoaXMuX3dvcmtlciA9IG5ldyBHZW5lcmljV29ya2VyKFwiZXJyb3JcIik7XG4gICAgICAgIHRoaXMuX3dvcmtlci5lcnJvcihlKTtcbiAgICB9XG59XG5cblN0cmVhbUhlbHBlci5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogTGlzdGVuIGEgU3RyZWFtSGVscGVyLCBhY2N1bXVsYXRlIGl0cyBjb250ZW50IGFuZCBjb25jYXRlbmF0ZSBpdCBpbnRvIGFcbiAgICAgKiBjb21wbGV0ZSBibG9jay5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB1cGRhdGVDYiB0aGUgdXBkYXRlIGNhbGxiYWNrLlxuICAgICAqIEByZXR1cm4gUHJvbWlzZSB0aGUgcHJvbWlzZSBmb3IgdGhlIGFjY3VtdWxhdGlvbi5cbiAgICAgKi9cbiAgICBhY2N1bXVsYXRlIDogZnVuY3Rpb24gKHVwZGF0ZUNiKSB7XG4gICAgICAgIHJldHVybiBhY2N1bXVsYXRlKHRoaXMsIHVwZGF0ZUNiKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEFkZCBhIGxpc3RlbmVyIG9uIGFuIGV2ZW50IHRyaWdnZXJlZCBvbiBhIHN0cmVhbS5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZ0IHRoZSBuYW1lIG9mIHRoZSBldmVudFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIHRoZSBsaXN0ZW5lclxuICAgICAqIEByZXR1cm4ge1N0cmVhbUhlbHBlcn0gdGhlIGN1cnJlbnQgaGVscGVyLlxuICAgICAqL1xuICAgIG9uIDogZnVuY3Rpb24gKGV2dCwgZm4pIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmKGV2dCA9PT0gXCJkYXRhXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX3dvcmtlci5vbihldnQsIGZ1bmN0aW9uIChjaHVuaykge1xuICAgICAgICAgICAgICAgIGZuLmNhbGwoc2VsZiwgY2h1bmsuZGF0YSwgY2h1bmsubWV0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3dvcmtlci5vbihldnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB1dGlscy5kZWxheShmbiwgYXJndW1lbnRzLCBzZWxmKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogUmVzdW1lIHRoZSBmbG93IG9mIGNodW5rcy5cbiAgICAgKiBAcmV0dXJuIHtTdHJlYW1IZWxwZXJ9IHRoZSBjdXJyZW50IGhlbHBlci5cbiAgICAgKi9cbiAgICByZXN1bWUgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHV0aWxzLmRlbGF5KHRoaXMuX3dvcmtlci5yZXN1bWUsIFtdLCB0aGlzLl93b3JrZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFBhdXNlIHRoZSBmbG93IG9mIGNodW5rcy5cbiAgICAgKiBAcmV0dXJuIHtTdHJlYW1IZWxwZXJ9IHRoZSBjdXJyZW50IGhlbHBlci5cbiAgICAgKi9cbiAgICBwYXVzZSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fd29ya2VyLnBhdXNlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgbm9kZWpzIHN0cmVhbSBmb3IgdGhpcyBoZWxwZXIuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gdXBkYXRlQ2IgdGhlIHVwZGF0ZSBjYWxsYmFjay5cbiAgICAgKiBAcmV0dXJuIHtOb2RlanNTdHJlYW1PdXRwdXRBZGFwdGVyfSB0aGUgbm9kZWpzIHN0cmVhbS5cbiAgICAgKi9cbiAgICB0b05vZGVqc1N0cmVhbSA6IGZ1bmN0aW9uICh1cGRhdGVDYikge1xuICAgICAgICB1dGlscy5jaGVja1N1cHBvcnQoXCJub2Rlc3RyZWFtXCIpO1xuICAgICAgICBpZiAodGhpcy5fb3V0cHV0VHlwZSAhPT0gXCJub2RlYnVmZmVyXCIpIHtcbiAgICAgICAgICAgIC8vIGFuIG9iamVjdCBzdHJlYW0gY29udGFpbmluZyBibG9iL2FycmF5YnVmZmVyL3VpbnQ4YXJyYXkvc3RyaW5nXG4gICAgICAgICAgICAvLyBpcyBzdHJhbmdlIGFuZCBJIGRvbid0IGtub3cgaWYgaXQgd291bGQgYmUgdXNlZnVsLlxuICAgICAgICAgICAgLy8gSSB5b3UgZmluZCB0aGlzIGNvbW1lbnQgYW5kIGhhdmUgYSBnb29kIHVzZWNhc2UsIHBsZWFzZSBvcGVuIGFcbiAgICAgICAgICAgIC8vIGJ1ZyByZXBvcnQgIVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuX291dHB1dFR5cGUgKyBcIiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgbWV0aG9kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBOb2RlanNTdHJlYW1PdXRwdXRBZGFwdGVyKHRoaXMsIHtcbiAgICAgICAgICAgIG9iamVjdE1vZGUgOiB0aGlzLl9vdXRwdXRUeXBlICE9PSBcIm5vZGVidWZmZXJcIlxuICAgICAgICB9LCB1cGRhdGVDYik7XG4gICAgfVxufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmVhbUhlbHBlcjtcbiIsICIndXNlIHN0cmljdCc7XG5leHBvcnRzLmJhc2U2NCA9IGZhbHNlO1xuZXhwb3J0cy5iaW5hcnkgPSBmYWxzZTtcbmV4cG9ydHMuZGlyID0gZmFsc2U7XG5leHBvcnRzLmNyZWF0ZUZvbGRlcnMgPSB0cnVlO1xuZXhwb3J0cy5kYXRlID0gbnVsbDtcbmV4cG9ydHMuY29tcHJlc3Npb24gPSBudWxsO1xuZXhwb3J0cy5jb21wcmVzc2lvbk9wdGlvbnMgPSBudWxsO1xuZXhwb3J0cy5jb21tZW50ID0gbnVsbDtcbmV4cG9ydHMudW5peFBlcm1pc3Npb25zID0gbnVsbDtcbmV4cG9ydHMuZG9zUGVybWlzc2lvbnMgPSBudWxsO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBHZW5lcmljV29ya2VyID0gcmVxdWlyZSgnLi9HZW5lcmljV29ya2VyJyk7XG5cbi8vIHRoZSBzaXplIG9mIHRoZSBnZW5lcmF0ZWQgY2h1bmtzXG4vLyBUT0RPIGV4cG9zZSB0aGlzIGFzIGEgcHVibGljIHZhcmlhYmxlXG52YXIgREVGQVVMVF9CTE9DS19TSVpFID0gMTYgKiAxMDI0O1xuXG4vKipcbiAqIEEgd29ya2VyIHRoYXQgcmVhZHMgYSBjb250ZW50IGFuZCBlbWl0cyBjaHVua3MuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7UHJvbWlzZX0gZGF0YVAgdGhlIHByb21pc2Ugb2YgdGhlIGRhdGEgdG8gc3BsaXRcbiAqL1xuZnVuY3Rpb24gRGF0YVdvcmtlcihkYXRhUCkge1xuICAgIEdlbmVyaWNXb3JrZXIuY2FsbCh0aGlzLCBcIkRhdGFXb3JrZXJcIik7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuZGF0YUlzUmVhZHkgPSBmYWxzZTtcbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgICB0aGlzLm1heCA9IDA7XG4gICAgdGhpcy5kYXRhID0gbnVsbDtcbiAgICB0aGlzLnR5cGUgPSBcIlwiO1xuXG4gICAgdGhpcy5fdGlja1NjaGVkdWxlZCA9IGZhbHNlO1xuXG4gICAgZGF0YVAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBzZWxmLmRhdGFJc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgc2VsZi5kYXRhID0gZGF0YTtcbiAgICAgICAgc2VsZi5tYXggPSBkYXRhICYmIGRhdGEubGVuZ3RoIHx8IDA7XG4gICAgICAgIHNlbGYudHlwZSA9IHV0aWxzLmdldFR5cGVPZihkYXRhKTtcbiAgICAgICAgaWYoIXNlbGYuaXNQYXVzZWQpIHtcbiAgICAgICAgICAgIHNlbGYuX3RpY2tBbmRSZXBlYXQoKTtcbiAgICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHNlbGYuZXJyb3IoZSk7XG4gICAgfSk7XG59XG5cbnV0aWxzLmluaGVyaXRzKERhdGFXb3JrZXIsIEdlbmVyaWNXb3JrZXIpO1xuXG4vKipcbiAqIEBzZWUgR2VuZXJpY1dvcmtlci5jbGVhblVwXG4gKi9cbkRhdGFXb3JrZXIucHJvdG90eXBlLmNsZWFuVXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgR2VuZXJpY1dvcmtlci5wcm90b3R5cGUuY2xlYW5VcC5jYWxsKHRoaXMpO1xuICAgIHRoaXMuZGF0YSA9IG51bGw7XG59O1xuXG4vKipcbiAqIEBzZWUgR2VuZXJpY1dvcmtlci5yZXN1bWVcbiAqL1xuRGF0YVdvcmtlci5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24gKCkge1xuICAgIGlmKCFHZW5lcmljV29ya2VyLnByb3RvdHlwZS5yZXN1bWUuY2FsbCh0aGlzKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl90aWNrU2NoZWR1bGVkICYmIHRoaXMuZGF0YUlzUmVhZHkpIHtcbiAgICAgICAgdGhpcy5fdGlja1NjaGVkdWxlZCA9IHRydWU7XG4gICAgICAgIHV0aWxzLmRlbGF5KHRoaXMuX3RpY2tBbmRSZXBlYXQsIFtdLCB0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIFRyaWdnZXIgYSB0aWNrIGEgc2NoZWR1bGUgYW4gb3RoZXIgY2FsbCB0byB0aGlzIGZ1bmN0aW9uLlxuICovXG5EYXRhV29ya2VyLnByb3RvdHlwZS5fdGlja0FuZFJlcGVhdCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3RpY2tTY2hlZHVsZWQgPSBmYWxzZTtcbiAgICBpZih0aGlzLmlzUGF1c2VkIHx8IHRoaXMuaXNGaW5pc2hlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3RpY2soKTtcbiAgICBpZighdGhpcy5pc0ZpbmlzaGVkKSB7XG4gICAgICAgIHV0aWxzLmRlbGF5KHRoaXMuX3RpY2tBbmRSZXBlYXQsIFtdLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fdGlja1NjaGVkdWxlZCA9IHRydWU7XG4gICAgfVxufTtcblxuLyoqXG4gKiBSZWFkIGFuZCBwdXNoIGEgY2h1bmsuXG4gKi9cbkRhdGFXb3JrZXIucHJvdG90eXBlLl90aWNrID0gZnVuY3Rpb24oKSB7XG5cbiAgICBpZih0aGlzLmlzUGF1c2VkIHx8IHRoaXMuaXNGaW5pc2hlZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHNpemUgPSBERUZBVUxUX0JMT0NLX1NJWkU7XG4gICAgdmFyIGRhdGEgPSBudWxsLCBuZXh0SW5kZXggPSBNYXRoLm1pbih0aGlzLm1heCwgdGhpcy5pbmRleCArIHNpemUpO1xuICAgIGlmICh0aGlzLmluZGV4ID49IHRoaXMubWF4KSB7XG4gICAgICAgIC8vIEVPRlxuICAgICAgICByZXR1cm4gdGhpcy5lbmQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzd2l0Y2godGhpcy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMuZGF0YS5zdWJzdHJpbmcodGhpcy5pbmRleCwgbmV4dEluZGV4KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInVpbnQ4YXJyYXlcIjpcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5kYXRhLnN1YmFycmF5KHRoaXMuaW5kZXgsIG5leHRJbmRleCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJhcnJheVwiOlxuICAgICAgICAgICAgY2FzZSBcIm5vZGVidWZmZXJcIjpcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5kYXRhLnNsaWNlKHRoaXMuaW5kZXgsIG5leHRJbmRleCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluZGV4ID0gbmV4dEluZGV4O1xuICAgICAgICByZXR1cm4gdGhpcy5wdXNoKHtcbiAgICAgICAgICAgIGRhdGEgOiBkYXRhLFxuICAgICAgICAgICAgbWV0YSA6IHtcbiAgICAgICAgICAgICAgICBwZXJjZW50IDogdGhpcy5tYXggPyB0aGlzLmluZGV4IC8gdGhpcy5tYXggKiAxMDAgOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0YVdvcmtlcjtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuLyoqXG4gKiBUaGUgZm9sbG93aW5nIGZ1bmN0aW9ucyBjb21lIGZyb20gcGFrbywgZnJvbSBwYWtvL2xpYi96bGliL2NyYzMyLmpzXG4gKiByZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBwYWtvIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlY2EvcGFrby9cbiAqL1xuXG4vLyBVc2Ugb3JkaW5hcnkgYXJyYXksIHNpbmNlIHVudHlwZWQgbWFrZXMgbm8gYm9vc3QgaGVyZVxuZnVuY3Rpb24gbWFrZVRhYmxlKCkge1xuICAgIHZhciBjLCB0YWJsZSA9IFtdO1xuXG4gICAgZm9yKHZhciBuID0wOyBuIDwgMjU2OyBuKyspe1xuICAgICAgICBjID0gbjtcbiAgICAgICAgZm9yKHZhciBrID0wOyBrIDwgODsgaysrKXtcbiAgICAgICAgICAgIGMgPSAoKGMmMSkgPyAoMHhFREI4ODMyMCBeIChjID4+PiAxKSkgOiAoYyA+Pj4gMSkpO1xuICAgICAgICB9XG4gICAgICAgIHRhYmxlW25dID0gYztcbiAgICB9XG5cbiAgICByZXR1cm4gdGFibGU7XG59XG5cbi8vIENyZWF0ZSB0YWJsZSBvbiBsb2FkLiBKdXN0IDI1NSBzaWduZWQgbG9uZ3MuIE5vdCBhIHByb2JsZW0uXG52YXIgY3JjVGFibGUgPSBtYWtlVGFibGUoKTtcblxuXG5mdW5jdGlvbiBjcmMzMihjcmMsIGJ1ZiwgbGVuLCBwb3MpIHtcbiAgICB2YXIgdCA9IGNyY1RhYmxlLCBlbmQgPSBwb3MgKyBsZW47XG5cbiAgICBjcmMgPSBjcmMgXiAoLTEpO1xuXG4gICAgZm9yICh2YXIgaSA9IHBvczsgaSA8IGVuZDsgaSsrICkge1xuICAgICAgICBjcmMgPSAoY3JjID4+PiA4KSBeIHRbKGNyYyBeIGJ1ZltpXSkgJiAweEZGXTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGNyYyBeICgtMSkpOyAvLyA+Pj4gMDtcbn1cblxuLy8gVGhhdCdzIGFsbCBmb3IgdGhlIHBha28gZnVuY3Rpb25zLlxuXG4vKipcbiAqIENvbXB1dGUgdGhlIGNyYzMyIG9mIGEgc3RyaW5nLlxuICogVGhpcyBpcyBhbG1vc3QgdGhlIHNhbWUgYXMgdGhlIGZ1bmN0aW9uIGNyYzMyLCBidXQgZm9yIHN0cmluZ3MuIFVzaW5nIHRoZVxuICogc2FtZSBmdW5jdGlvbiBmb3IgdGhlIHR3byB1c2UgY2FzZXMgbGVhZHMgdG8gaG9ycmlibGUgcGVyZm9ybWFuY2VzLlxuICogQHBhcmFtIHtOdW1iZXJ9IGNyYyB0aGUgc3RhcnRpbmcgdmFsdWUgb2YgdGhlIGNyYy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgdGhlIHN0cmluZyB0byB1c2UuXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuIHRoZSBsZW5ndGggb2YgdGhlIHN0cmluZy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBwb3MgdGhlIHN0YXJ0aW5nIHBvc2l0aW9uIGZvciB0aGUgY3JjMzIgY29tcHV0YXRpb24uXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IHRoZSBjb21wdXRlZCBjcmMzMi5cbiAqL1xuZnVuY3Rpb24gY3JjMzJzdHIoY3JjLCBzdHIsIGxlbiwgcG9zKSB7XG4gICAgdmFyIHQgPSBjcmNUYWJsZSwgZW5kID0gcG9zICsgbGVuO1xuXG4gICAgY3JjID0gY3JjIF4gKC0xKTtcblxuICAgIGZvciAodmFyIGkgPSBwb3M7IGkgPCBlbmQ7IGkrKyApIHtcbiAgICAgICAgY3JjID0gKGNyYyA+Pj4gOCkgXiB0WyhjcmMgXiBzdHIuY2hhckNvZGVBdChpKSkgJiAweEZGXTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGNyYyBeICgtMSkpOyAvLyA+Pj4gMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmMzMndyYXBwZXIoaW5wdXQsIGNyYykge1xuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09IFwidW5kZWZpbmVkXCIgfHwgIWlucHV0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICB2YXIgaXNBcnJheSA9IHV0aWxzLmdldFR5cGVPZihpbnB1dCkgIT09IFwic3RyaW5nXCI7XG5cbiAgICBpZihpc0FycmF5KSB7XG4gICAgICAgIHJldHVybiBjcmMzMihjcmN8MCwgaW5wdXQsIGlucHV0Lmxlbmd0aCwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNyYzMyc3RyKGNyY3wwLCBpbnB1dCwgaW5wdXQubGVuZ3RoLCAwKTtcbiAgICB9XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIEdlbmVyaWNXb3JrZXIgPSByZXF1aXJlKCcuL0dlbmVyaWNXb3JrZXInKTtcbnZhciBjcmMzMiA9IHJlcXVpcmUoJy4uL2NyYzMyJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIEEgd29ya2VyIHdoaWNoIGNhbGN1bGF0ZSB0aGUgY3JjMzIgb2YgdGhlIGRhdGEgZmxvd2luZyB0aHJvdWdoLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENyYzMyUHJvYmUoKSB7XG4gICAgR2VuZXJpY1dvcmtlci5jYWxsKHRoaXMsIFwiQ3JjMzJQcm9iZVwiKTtcbiAgICB0aGlzLndpdGhTdHJlYW1JbmZvKFwiY3JjMzJcIiwgMCk7XG59XG51dGlscy5pbmhlcml0cyhDcmMzMlByb2JlLCBHZW5lcmljV29ya2VyKTtcblxuLyoqXG4gKiBAc2VlIEdlbmVyaWNXb3JrZXIucHJvY2Vzc0NodW5rXG4gKi9cbkNyYzMyUHJvYmUucHJvdG90eXBlLnByb2Nlc3NDaHVuayA9IGZ1bmN0aW9uIChjaHVuaykge1xuICAgIHRoaXMuc3RyZWFtSW5mby5jcmMzMiA9IGNyYzMyKGNodW5rLmRhdGEsIHRoaXMuc3RyZWFtSW5mby5jcmMzMiB8fCAwKTtcbiAgICB0aGlzLnB1c2goY2h1bmspO1xufTtcbm1vZHVsZS5leHBvcnRzID0gQ3JjMzJQcm9iZTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgR2VuZXJpY1dvcmtlciA9IHJlcXVpcmUoJy4vR2VuZXJpY1dvcmtlcicpO1xuXG4vKipcbiAqIEEgd29ya2VyIHdoaWNoIGNhbGN1bGF0ZSB0aGUgdG90YWwgbGVuZ3RoIG9mIHRoZSBkYXRhIGZsb3dpbmcgdGhyb3VnaC5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BOYW1lIHRoZSBuYW1lIHVzZWQgdG8gZXhwb3NlIHRoZSBsZW5ndGhcbiAqL1xuZnVuY3Rpb24gRGF0YUxlbmd0aFByb2JlKHByb3BOYW1lKSB7XG4gICAgR2VuZXJpY1dvcmtlci5jYWxsKHRoaXMsIFwiRGF0YUxlbmd0aFByb2JlIGZvciBcIiArIHByb3BOYW1lKTtcbiAgICB0aGlzLnByb3BOYW1lID0gcHJvcE5hbWU7XG4gICAgdGhpcy53aXRoU3RyZWFtSW5mbyhwcm9wTmFtZSwgMCk7XG59XG51dGlscy5pbmhlcml0cyhEYXRhTGVuZ3RoUHJvYmUsIEdlbmVyaWNXb3JrZXIpO1xuXG4vKipcbiAqIEBzZWUgR2VuZXJpY1dvcmtlci5wcm9jZXNzQ2h1bmtcbiAqL1xuRGF0YUxlbmd0aFByb2JlLnByb3RvdHlwZS5wcm9jZXNzQ2h1bmsgPSBmdW5jdGlvbiAoY2h1bmspIHtcbiAgICBpZihjaHVuaykge1xuICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5zdHJlYW1JbmZvW3RoaXMucHJvcE5hbWVdIHx8IDA7XG4gICAgICAgIHRoaXMuc3RyZWFtSW5mb1t0aGlzLnByb3BOYW1lXSA9IGxlbmd0aCArIGNodW5rLmRhdGEubGVuZ3RoO1xuICAgIH1cbiAgICBHZW5lcmljV29ya2VyLnByb3RvdHlwZS5wcm9jZXNzQ2h1bmsuY2FsbCh0aGlzLCBjaHVuayk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBEYXRhTGVuZ3RoUHJvYmU7XG5cbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBleHRlcm5hbCA9IHJlcXVpcmUoXCIuL2V4dGVybmFsXCIpO1xudmFyIERhdGFXb3JrZXIgPSByZXF1aXJlKCcuL3N0cmVhbS9EYXRhV29ya2VyJyk7XG52YXIgQ3JjMzJQcm9iZSA9IHJlcXVpcmUoJy4vc3RyZWFtL0NyYzMyUHJvYmUnKTtcbnZhciBEYXRhTGVuZ3RoUHJvYmUgPSByZXF1aXJlKCcuL3N0cmVhbS9EYXRhTGVuZ3RoUHJvYmUnKTtcblxuLyoqXG4gKiBSZXByZXNlbnQgYSBjb21wcmVzc2VkIG9iamVjdCwgd2l0aCBldmVyeXRoaW5nIG5lZWRlZCB0byBkZWNvbXByZXNzIGl0LlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge251bWJlcn0gY29tcHJlc3NlZFNpemUgdGhlIHNpemUgb2YgdGhlIGRhdGEgY29tcHJlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB1bmNvbXByZXNzZWRTaXplIHRoZSBzaXplIG9mIHRoZSBkYXRhIGFmdGVyIGRlY29tcHJlc3Npb24uXG4gKiBAcGFyYW0ge251bWJlcn0gY3JjMzIgdGhlIGNyYzMyIG9mIHRoZSBkZWNvbXByZXNzZWQgZmlsZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSBjb21wcmVzc2lvbiB0aGUgdHlwZSBvZiBjb21wcmVzc2lvbiwgc2VlIGxpYi9jb21wcmVzc2lvbnMuanMuXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheUJ1ZmZlcnxVaW50OEFycmF5fEJ1ZmZlcn0gZGF0YSB0aGUgY29tcHJlc3NlZCBkYXRhLlxuICovXG5mdW5jdGlvbiBDb21wcmVzc2VkT2JqZWN0KGNvbXByZXNzZWRTaXplLCB1bmNvbXByZXNzZWRTaXplLCBjcmMzMiwgY29tcHJlc3Npb24sIGRhdGEpIHtcbiAgICB0aGlzLmNvbXByZXNzZWRTaXplID0gY29tcHJlc3NlZFNpemU7XG4gICAgdGhpcy51bmNvbXByZXNzZWRTaXplID0gdW5jb21wcmVzc2VkU2l6ZTtcbiAgICB0aGlzLmNyYzMyID0gY3JjMzI7XG4gICAgdGhpcy5jb21wcmVzc2lvbiA9IGNvbXByZXNzaW9uO1xuICAgIHRoaXMuY29tcHJlc3NlZENvbnRlbnQgPSBkYXRhO1xufVxuXG5Db21wcmVzc2VkT2JqZWN0LnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSB3b3JrZXIgdG8gZ2V0IHRoZSB1bmNvbXByZXNzZWQgY29udGVudC5cbiAgICAgKiBAcmV0dXJuIHtHZW5lcmljV29ya2VyfSB0aGUgd29ya2VyLlxuICAgICAqL1xuICAgIGdldENvbnRlbnRXb3JrZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdvcmtlciA9IG5ldyBEYXRhV29ya2VyKGV4dGVybmFsLlByb21pc2UucmVzb2x2ZSh0aGlzLmNvbXByZXNzZWRDb250ZW50KSlcbiAgICAgICAgICAgIC5waXBlKHRoaXMuY29tcHJlc3Npb24udW5jb21wcmVzc1dvcmtlcigpKVxuICAgICAgICAgICAgLnBpcGUobmV3IERhdGFMZW5ndGhQcm9iZShcImRhdGFfbGVuZ3RoXCIpKTtcblxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHdvcmtlci5vbihcImVuZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdHJlYW1JbmZvWydkYXRhX2xlbmd0aCddICE9PSB0aGF0LnVuY29tcHJlc3NlZFNpemUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCdWcgOiB1bmNvbXByZXNzZWQgZGF0YSBzaXplIG1pc21hdGNoXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHdvcmtlcjtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHdvcmtlciB0byBnZXQgdGhlIGNvbXByZXNzZWQgY29udGVudC5cbiAgICAgKiBAcmV0dXJuIHtHZW5lcmljV29ya2VyfSB0aGUgd29ya2VyLlxuICAgICAqL1xuICAgIGdldENvbXByZXNzZWRXb3JrZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRhV29ya2VyKGV4dGVybmFsLlByb21pc2UucmVzb2x2ZSh0aGlzLmNvbXByZXNzZWRDb250ZW50KSlcbiAgICAgICAgICAgIC53aXRoU3RyZWFtSW5mbyhcImNvbXByZXNzZWRTaXplXCIsIHRoaXMuY29tcHJlc3NlZFNpemUpXG4gICAgICAgICAgICAud2l0aFN0cmVhbUluZm8oXCJ1bmNvbXByZXNzZWRTaXplXCIsIHRoaXMudW5jb21wcmVzc2VkU2l6ZSlcbiAgICAgICAgICAgIC53aXRoU3RyZWFtSW5mbyhcImNyYzMyXCIsIHRoaXMuY3JjMzIpXG4gICAgICAgICAgICAud2l0aFN0cmVhbUluZm8oXCJjb21wcmVzc2lvblwiLCB0aGlzLmNvbXByZXNzaW9uKVxuICAgICAgICAgICAgO1xuICAgIH1cbn07XG5cbi8qKlxuICogQ2hhaW4gdGhlIGdpdmVuIHdvcmtlciB3aXRoIG90aGVyIHdvcmtlcnMgdG8gY29tcHJlc3MgdGhlIGNvbnRlbnQgd2l0aCB0aGVcbiAqIGdpdmVuIGNvbXByZXNzaW9uLlxuICogQHBhcmFtIHtHZW5lcmljV29ya2VyfSB1bmNvbXByZXNzZWRXb3JrZXIgdGhlIHdvcmtlciB0byBwaXBlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbXByZXNzaW9uIHRoZSBjb21wcmVzc2lvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gY29tcHJlc3Npb25PcHRpb25zIHRoZSBvcHRpb25zIHRvIHVzZSB3aGVuIGNvbXByZXNzaW5nLlxuICogQHJldHVybiB7R2VuZXJpY1dvcmtlcn0gdGhlIG5ldyB3b3JrZXIgY29tcHJlc3NpbmcgdGhlIGNvbnRlbnQuXG4gKi9cbkNvbXByZXNzZWRPYmplY3QuY3JlYXRlV29ya2VyRnJvbSA9IGZ1bmN0aW9uICh1bmNvbXByZXNzZWRXb3JrZXIsIGNvbXByZXNzaW9uLCBjb21wcmVzc2lvbk9wdGlvbnMpIHtcbiAgICByZXR1cm4gdW5jb21wcmVzc2VkV29ya2VyXG4gICAgICAgIC5waXBlKG5ldyBDcmMzMlByb2JlKCkpXG4gICAgICAgIC5waXBlKG5ldyBEYXRhTGVuZ3RoUHJvYmUoXCJ1bmNvbXByZXNzZWRTaXplXCIpKVxuICAgICAgICAucGlwZShjb21wcmVzc2lvbi5jb21wcmVzc1dvcmtlcihjb21wcmVzc2lvbk9wdGlvbnMpKVxuICAgICAgICAucGlwZShuZXcgRGF0YUxlbmd0aFByb2JlKFwiY29tcHJlc3NlZFNpemVcIikpXG4gICAgICAgIC53aXRoU3RyZWFtSW5mbyhcImNvbXByZXNzaW9uXCIsIGNvbXByZXNzaW9uKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcHJlc3NlZE9iamVjdDtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBTdHJlYW1IZWxwZXIgPSByZXF1aXJlKCcuL3N0cmVhbS9TdHJlYW1IZWxwZXInKTtcbnZhciBEYXRhV29ya2VyID0gcmVxdWlyZSgnLi9zdHJlYW0vRGF0YVdvcmtlcicpO1xudmFyIHV0ZjggPSByZXF1aXJlKCcuL3V0ZjgnKTtcbnZhciBDb21wcmVzc2VkT2JqZWN0ID0gcmVxdWlyZSgnLi9jb21wcmVzc2VkT2JqZWN0Jyk7XG52YXIgR2VuZXJpY1dvcmtlciA9IHJlcXVpcmUoJy4vc3RyZWFtL0dlbmVyaWNXb3JrZXInKTtcblxuLyoqXG4gKiBBIHNpbXBsZSBvYmplY3QgcmVwcmVzZW50aW5nIGEgZmlsZSBpbiB0aGUgemlwIGZpbGUuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIHRoZSBuYW1lIG9mIHRoZSBmaWxlXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheUJ1ZmZlcnxVaW50OEFycmF5fEJ1ZmZlcn0gZGF0YSB0aGUgZGF0YVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgdGhlIG9wdGlvbnMgb2YgdGhlIGZpbGVcbiAqL1xudmFyIFppcE9iamVjdCA9IGZ1bmN0aW9uKG5hbWUsIGRhdGEsIG9wdGlvbnMpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZGlyID0gb3B0aW9ucy5kaXI7XG4gICAgdGhpcy5kYXRlID0gb3B0aW9ucy5kYXRlO1xuICAgIHRoaXMuY29tbWVudCA9IG9wdGlvbnMuY29tbWVudDtcbiAgICB0aGlzLnVuaXhQZXJtaXNzaW9ucyA9IG9wdGlvbnMudW5peFBlcm1pc3Npb25zO1xuICAgIHRoaXMuZG9zUGVybWlzc2lvbnMgPSBvcHRpb25zLmRvc1Blcm1pc3Npb25zO1xuXG4gICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5fZGF0YUJpbmFyeSA9IG9wdGlvbnMuYmluYXJ5O1xuICAgIC8vIGtlZXAgb25seSB0aGUgY29tcHJlc3Npb25cbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAgIGNvbXByZXNzaW9uIDogb3B0aW9ucy5jb21wcmVzc2lvbixcbiAgICAgICAgY29tcHJlc3Npb25PcHRpb25zIDogb3B0aW9ucy5jb21wcmVzc2lvbk9wdGlvbnNcbiAgICB9O1xufTtcblxuWmlwT2JqZWN0LnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gaW50ZXJuYWwgc3RyZWFtIGZvciB0aGUgY29udGVudCBvZiB0aGlzIG9iamVjdC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSB0aGUgdHlwZSBvZiBlYWNoIGNodW5rLlxuICAgICAqIEByZXR1cm4gU3RyZWFtSGVscGVyIHRoZSBzdHJlYW0uXG4gICAgICovXG4gICAgaW50ZXJuYWxTdHJlYW06IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBudWxsLCBvdXRwdXRUeXBlID0gXCJzdHJpbmdcIjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghdHlwZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIG91dHB1dCB0eXBlIHNwZWNpZmllZC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdXRwdXRUeXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdmFyIGFza1VuaWNvZGVTdHJpbmcgPSBvdXRwdXRUeXBlID09PSBcInN0cmluZ1wiIHx8IG91dHB1dFR5cGUgPT09IFwidGV4dFwiO1xuICAgICAgICAgICAgaWYgKG91dHB1dFR5cGUgPT09IFwiYmluYXJ5c3RyaW5nXCIgfHwgb3V0cHV0VHlwZSA9PT0gXCJ0ZXh0XCIpIHtcbiAgICAgICAgICAgICAgICBvdXRwdXRUeXBlID0gXCJzdHJpbmdcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2RlY29tcHJlc3NXb3JrZXIoKTtcblxuICAgICAgICAgICAgdmFyIGlzVW5pY29kZVN0cmluZyA9ICF0aGlzLl9kYXRhQmluYXJ5O1xuXG4gICAgICAgICAgICBpZiAoaXNVbmljb2RlU3RyaW5nICYmICFhc2tVbmljb2RlU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnBpcGUobmV3IHV0ZjguVXRmOEVuY29kZVdvcmtlcigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNVbmljb2RlU3RyaW5nICYmIGFza1VuaWNvZGVTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQucGlwZShuZXcgdXRmOC5VdGY4RGVjb2RlV29ya2VyKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBuZXcgR2VuZXJpY1dvcmtlcihcImVycm9yXCIpO1xuICAgICAgICAgICAgcmVzdWx0LmVycm9yKGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBTdHJlYW1IZWxwZXIocmVzdWx0LCBvdXRwdXRUeXBlLCBcIlwiKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUHJlcGFyZSB0aGUgY29udGVudCBpbiB0aGUgYXNrZWQgdHlwZS5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSB0aGUgdHlwZSBvZiB0aGUgcmVzdWx0LlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uVXBkYXRlIGEgZnVuY3Rpb24gdG8gY2FsbCBvbiBlYWNoIGludGVybmFsIHVwZGF0ZS5cbiAgICAgKiBAcmV0dXJuIFByb21pc2UgdGhlIHByb21pc2Ugb2YgdGhlIHJlc3VsdC5cbiAgICAgKi9cbiAgICBhc3luYzogZnVuY3Rpb24gKHR5cGUsIG9uVXBkYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVybmFsU3RyZWFtKHR5cGUpLmFjY3VtdWxhdGUob25VcGRhdGUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQcmVwYXJlIHRoZSBjb250ZW50IGFzIGEgbm9kZWpzIHN0cmVhbS5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSB0aGUgdHlwZSBvZiBlYWNoIGNodW5rLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uVXBkYXRlIGEgZnVuY3Rpb24gdG8gY2FsbCBvbiBlYWNoIGludGVybmFsIHVwZGF0ZS5cbiAgICAgKiBAcmV0dXJuIFN0cmVhbSB0aGUgc3RyZWFtLlxuICAgICAqL1xuICAgIG5vZGVTdHJlYW06IGZ1bmN0aW9uICh0eXBlLCBvblVwZGF0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcm5hbFN0cmVhbSh0eXBlIHx8IFwibm9kZWJ1ZmZlclwiKS50b05vZGVqc1N0cmVhbShvblVwZGF0ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIHdvcmtlciBmb3IgdGhlIGNvbXByZXNzZWQgY29udGVudC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb21wcmVzc2lvbiB0aGUgY29tcHJlc3Npb24gb2JqZWN0IHRvIHVzZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29tcHJlc3Npb25PcHRpb25zIHRoZSBvcHRpb25zIHRvIHVzZSB3aGVuIGNvbXByZXNzaW5nLlxuICAgICAqIEByZXR1cm4gV29ya2VyIHRoZSB3b3JrZXIuXG4gICAgICovXG4gICAgX2NvbXByZXNzV29ya2VyOiBmdW5jdGlvbiAoY29tcHJlc3Npb24sIGNvbXByZXNzaW9uT3B0aW9ucykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLl9kYXRhIGluc3RhbmNlb2YgQ29tcHJlc3NlZE9iamVjdCAmJlxuICAgICAgICAgICAgdGhpcy5fZGF0YS5jb21wcmVzc2lvbi5tYWdpYyA9PT0gY29tcHJlc3Npb24ubWFnaWNcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YS5nZXRDb21wcmVzc2VkV29ya2VyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fZGVjb21wcmVzc1dvcmtlcigpO1xuICAgICAgICAgICAgaWYoIXRoaXMuX2RhdGFCaW5hcnkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQucGlwZShuZXcgdXRmOC5VdGY4RW5jb2RlV29ya2VyKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIENvbXByZXNzZWRPYmplY3QuY3JlYXRlV29ya2VyRnJvbShyZXN1bHQsIGNvbXByZXNzaW9uLCBjb21wcmVzc2lvbk9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSB3b3JrZXIgZm9yIHRoZSBkZWNvbXByZXNzZWQgY29udGVudC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEByZXR1cm4gV29ya2VyIHRoZSB3b3JrZXIuXG4gICAgICovXG4gICAgX2RlY29tcHJlc3NXb3JrZXIgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhIGluc3RhbmNlb2YgQ29tcHJlc3NlZE9iamVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGEuZ2V0Q29udGVudFdvcmtlcigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBHZW5lcmljV29ya2VyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0YVdvcmtlcih0aGlzLl9kYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciByZW1vdmVkTWV0aG9kcyA9IFtcImFzVGV4dFwiLCBcImFzQmluYXJ5XCIsIFwiYXNOb2RlQnVmZmVyXCIsIFwiYXNVaW50OEFycmF5XCIsIFwiYXNBcnJheUJ1ZmZlclwiXTtcbnZhciByZW1vdmVkRm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBtZXRob2QgaGFzIGJlZW4gcmVtb3ZlZCBpbiBKU1ppcCAzLjAsIHBsZWFzZSBjaGVjayB0aGUgdXBncmFkZSBndWlkZS5cIik7XG59O1xuXG5mb3IodmFyIGkgPSAwOyBpIDwgcmVtb3ZlZE1ldGhvZHMubGVuZ3RoOyBpKyspIHtcbiAgICBaaXBPYmplY3QucHJvdG90eXBlW3JlbW92ZWRNZXRob2RzW2ldXSA9IHJlbW92ZWRGbjtcbn1cbm1vZHVsZS5leHBvcnRzID0gWmlwT2JqZWN0O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuXG52YXIgVFlQRURfT0sgPSAgKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJykgJiZcbiAgICAgICAgICAgICAgICAodHlwZW9mIFVpbnQxNkFycmF5ICE9PSAndW5kZWZpbmVkJykgJiZcbiAgICAgICAgICAgICAgICAodHlwZW9mIEludDMyQXJyYXkgIT09ICd1bmRlZmluZWQnKTtcblxuZnVuY3Rpb24gX2hhcyhvYmosIGtleSkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbn1cblxuZXhwb3J0cy5hc3NpZ24gPSBmdW5jdGlvbiAob2JqIC8qZnJvbTEsIGZyb20yLCBmcm9tMywgLi4uKi8pIHtcbiAgdmFyIHNvdXJjZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICB3aGlsZSAoc291cmNlcy5sZW5ndGgpIHtcbiAgICB2YXIgc291cmNlID0gc291cmNlcy5zaGlmdCgpO1xuICAgIGlmICghc291cmNlKSB7IGNvbnRpbnVlOyB9XG5cbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3Ioc291cmNlICsgJ211c3QgYmUgbm9uLW9iamVjdCcpO1xuICAgIH1cblxuICAgIGZvciAodmFyIHAgaW4gc291cmNlKSB7XG4gICAgICBpZiAoX2hhcyhzb3VyY2UsIHApKSB7XG4gICAgICAgIG9ialtwXSA9IHNvdXJjZVtwXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxuXG4vLyByZWR1Y2UgYnVmZmVyIHNpemUsIGF2b2lkaW5nIG1lbSBjb3B5XG5leHBvcnRzLnNocmlua0J1ZiA9IGZ1bmN0aW9uIChidWYsIHNpemUpIHtcbiAgaWYgKGJ1Zi5sZW5ndGggPT09IHNpemUpIHsgcmV0dXJuIGJ1ZjsgfVxuICBpZiAoYnVmLnN1YmFycmF5KSB7IHJldHVybiBidWYuc3ViYXJyYXkoMCwgc2l6ZSk7IH1cbiAgYnVmLmxlbmd0aCA9IHNpemU7XG4gIHJldHVybiBidWY7XG59O1xuXG5cbnZhciBmblR5cGVkID0ge1xuICBhcnJheVNldDogZnVuY3Rpb24gKGRlc3QsIHNyYywgc3JjX29mZnMsIGxlbiwgZGVzdF9vZmZzKSB7XG4gICAgaWYgKHNyYy5zdWJhcnJheSAmJiBkZXN0LnN1YmFycmF5KSB7XG4gICAgICBkZXN0LnNldChzcmMuc3ViYXJyYXkoc3JjX29mZnMsIHNyY19vZmZzICsgbGVuKSwgZGVzdF9vZmZzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRmFsbGJhY2sgdG8gb3JkaW5hcnkgYXJyYXlcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBkZXN0W2Rlc3Rfb2ZmcyArIGldID0gc3JjW3NyY19vZmZzICsgaV07XG4gICAgfVxuICB9LFxuICAvLyBKb2luIGFycmF5IG9mIGNodW5rcyB0byBzaW5nbGUgYXJyYXkuXG4gIGZsYXR0ZW5DaHVua3M6IGZ1bmN0aW9uIChjaHVua3MpIHtcbiAgICB2YXIgaSwgbCwgbGVuLCBwb3MsIGNodW5rLCByZXN1bHQ7XG5cbiAgICAvLyBjYWxjdWxhdGUgZGF0YSBsZW5ndGhcbiAgICBsZW4gPSAwO1xuICAgIGZvciAoaSA9IDAsIGwgPSBjaHVua3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBsZW4gKz0gY2h1bmtzW2ldLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvLyBqb2luIGNodW5rc1xuICAgIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KGxlbik7XG4gICAgcG9zID0gMDtcbiAgICBmb3IgKGkgPSAwLCBsID0gY2h1bmtzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgY2h1bmsgPSBjaHVua3NbaV07XG4gICAgICByZXN1bHQuc2V0KGNodW5rLCBwb3MpO1xuICAgICAgcG9zICs9IGNodW5rLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuXG52YXIgZm5VbnR5cGVkID0ge1xuICBhcnJheVNldDogZnVuY3Rpb24gKGRlc3QsIHNyYywgc3JjX29mZnMsIGxlbiwgZGVzdF9vZmZzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgZGVzdFtkZXN0X29mZnMgKyBpXSA9IHNyY1tzcmNfb2ZmcyArIGldO1xuICAgIH1cbiAgfSxcbiAgLy8gSm9pbiBhcnJheSBvZiBjaHVua3MgdG8gc2luZ2xlIGFycmF5LlxuICBmbGF0dGVuQ2h1bmtzOiBmdW5jdGlvbiAoY2h1bmtzKSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgY2h1bmtzKTtcbiAgfVxufTtcblxuXG4vLyBFbmFibGUvRGlzYWJsZSB0eXBlZCBhcnJheXMgdXNlLCBmb3IgdGVzdGluZ1xuLy9cbmV4cG9ydHMuc2V0VHlwZWQgPSBmdW5jdGlvbiAob24pIHtcbiAgaWYgKG9uKSB7XG4gICAgZXhwb3J0cy5CdWY4ICA9IFVpbnQ4QXJyYXk7XG4gICAgZXhwb3J0cy5CdWYxNiA9IFVpbnQxNkFycmF5O1xuICAgIGV4cG9ydHMuQnVmMzIgPSBJbnQzMkFycmF5O1xuICAgIGV4cG9ydHMuYXNzaWduKGV4cG9ydHMsIGZuVHlwZWQpO1xuICB9IGVsc2Uge1xuICAgIGV4cG9ydHMuQnVmOCAgPSBBcnJheTtcbiAgICBleHBvcnRzLkJ1ZjE2ID0gQXJyYXk7XG4gICAgZXhwb3J0cy5CdWYzMiA9IEFycmF5O1xuICAgIGV4cG9ydHMuYXNzaWduKGV4cG9ydHMsIGZuVW50eXBlZCk7XG4gIH1cbn07XG5cbmV4cG9ydHMuc2V0VHlwZWQoVFlQRURfT0spO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLy8gKEMpIDE5OTUtMjAxMyBKZWFuLWxvdXAgR2FpbGx5IGFuZCBNYXJrIEFkbGVyXG4vLyAoQykgMjAxNC0yMDE3IFZpdGFseSBQdXpyaW4gYW5kIEFuZHJleSBUdXBpdHNpblxuLy9cbi8vIFRoaXMgc29mdHdhcmUgaXMgcHJvdmlkZWQgJ2FzLWlzJywgd2l0aG91dCBhbnkgZXhwcmVzcyBvciBpbXBsaWVkXG4vLyB3YXJyYW50eS4gSW4gbm8gZXZlbnQgd2lsbCB0aGUgYXV0aG9ycyBiZSBoZWxkIGxpYWJsZSBmb3IgYW55IGRhbWFnZXNcbi8vIGFyaXNpbmcgZnJvbSB0aGUgdXNlIG9mIHRoaXMgc29mdHdhcmUuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIGFueW9uZSB0byB1c2UgdGhpcyBzb2Z0d2FyZSBmb3IgYW55IHB1cnBvc2UsXG4vLyBpbmNsdWRpbmcgY29tbWVyY2lhbCBhcHBsaWNhdGlvbnMsIGFuZCB0byBhbHRlciBpdCBhbmQgcmVkaXN0cmlidXRlIGl0XG4vLyBmcmVlbHksIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyByZXN0cmljdGlvbnM6XG4vL1xuLy8gMS4gVGhlIG9yaWdpbiBvZiB0aGlzIHNvZnR3YXJlIG11c3Qgbm90IGJlIG1pc3JlcHJlc2VudGVkOyB5b3UgbXVzdCBub3Rcbi8vICAgY2xhaW0gdGhhdCB5b3Ugd3JvdGUgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLiBJZiB5b3UgdXNlIHRoaXMgc29mdHdhcmVcbi8vICAgaW4gYSBwcm9kdWN0LCBhbiBhY2tub3dsZWRnbWVudCBpbiB0aGUgcHJvZHVjdCBkb2N1bWVudGF0aW9uIHdvdWxkIGJlXG4vLyAgIGFwcHJlY2lhdGVkIGJ1dCBpcyBub3QgcmVxdWlyZWQuXG4vLyAyLiBBbHRlcmVkIHNvdXJjZSB2ZXJzaW9ucyBtdXN0IGJlIHBsYWlubHkgbWFya2VkIGFzIHN1Y2gsIGFuZCBtdXN0IG5vdCBiZVxuLy8gICBtaXNyZXByZXNlbnRlZCBhcyBiZWluZyB0aGUgb3JpZ2luYWwgc29mdHdhcmUuXG4vLyAzLiBUaGlzIG5vdGljZSBtYXkgbm90IGJlIHJlbW92ZWQgb3IgYWx0ZXJlZCBmcm9tIGFueSBzb3VyY2UgZGlzdHJpYnV0aW9uLlxuXG4vKiBlc2xpbnQtZGlzYWJsZSBzcGFjZS11bmFyeS1vcHMgKi9cblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvY29tbW9uJyk7XG5cbi8qIFB1YmxpYyBjb25zdGFudHMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG5cbi8vdmFyIFpfRklMVEVSRUQgICAgICAgICAgPSAxO1xuLy92YXIgWl9IVUZGTUFOX09OTFkgICAgICA9IDI7XG4vL3ZhciBaX1JMRSAgICAgICAgICAgICAgID0gMztcbnZhciBaX0ZJWEVEICAgICAgICAgICAgICAgPSA0O1xuLy92YXIgWl9ERUZBVUxUX1NUUkFURUdZICA9IDA7XG5cbi8qIFBvc3NpYmxlIHZhbHVlcyBvZiB0aGUgZGF0YV90eXBlIGZpZWxkICh0aG91Z2ggc2VlIGluZmxhdGUoKSkgKi9cbnZhciBaX0JJTkFSWSAgICAgICAgICAgICAgPSAwO1xudmFyIFpfVEVYVCAgICAgICAgICAgICAgICA9IDE7XG4vL3ZhciBaX0FTQ0lJICAgICAgICAgICAgID0gMTsgLy8gPSBaX1RFWFRcbnZhciBaX1VOS05PV04gICAgICAgICAgICAgPSAyO1xuXG4vKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG5cbmZ1bmN0aW9uIHplcm8oYnVmKSB7IHZhciBsZW4gPSBidWYubGVuZ3RoOyB3aGlsZSAoLS1sZW4gPj0gMCkgeyBidWZbbGVuXSA9IDA7IH0gfVxuXG4vLyBGcm9tIHp1dGlsLmhcblxudmFyIFNUT1JFRF9CTE9DSyA9IDA7XG52YXIgU1RBVElDX1RSRUVTID0gMTtcbnZhciBEWU5fVFJFRVMgICAgPSAyO1xuLyogVGhlIHRocmVlIGtpbmRzIG9mIGJsb2NrIHR5cGUgKi9cblxudmFyIE1JTl9NQVRDSCAgICA9IDM7XG52YXIgTUFYX01BVENIICAgID0gMjU4O1xuLyogVGhlIG1pbmltdW0gYW5kIG1heGltdW0gbWF0Y2ggbGVuZ3RocyAqL1xuXG4vLyBGcm9tIGRlZmxhdGUuaFxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBJbnRlcm5hbCBjb21wcmVzc2lvbiBzdGF0ZS5cbiAqL1xuXG52YXIgTEVOR1RIX0NPREVTICA9IDI5O1xuLyogbnVtYmVyIG9mIGxlbmd0aCBjb2Rlcywgbm90IGNvdW50aW5nIHRoZSBzcGVjaWFsIEVORF9CTE9DSyBjb2RlICovXG5cbnZhciBMSVRFUkFMUyAgICAgID0gMjU2O1xuLyogbnVtYmVyIG9mIGxpdGVyYWwgYnl0ZXMgMC4uMjU1ICovXG5cbnZhciBMX0NPREVTICAgICAgID0gTElURVJBTFMgKyAxICsgTEVOR1RIX0NPREVTO1xuLyogbnVtYmVyIG9mIExpdGVyYWwgb3IgTGVuZ3RoIGNvZGVzLCBpbmNsdWRpbmcgdGhlIEVORF9CTE9DSyBjb2RlICovXG5cbnZhciBEX0NPREVTICAgICAgID0gMzA7XG4vKiBudW1iZXIgb2YgZGlzdGFuY2UgY29kZXMgKi9cblxudmFyIEJMX0NPREVTICAgICAgPSAxOTtcbi8qIG51bWJlciBvZiBjb2RlcyB1c2VkIHRvIHRyYW5zZmVyIHRoZSBiaXQgbGVuZ3RocyAqL1xuXG52YXIgSEVBUF9TSVpFICAgICA9IDIgKiBMX0NPREVTICsgMTtcbi8qIG1heGltdW0gaGVhcCBzaXplICovXG5cbnZhciBNQVhfQklUUyAgICAgID0gMTU7XG4vKiBBbGwgY29kZXMgbXVzdCBub3QgZXhjZWVkIE1BWF9CSVRTIGJpdHMgKi9cblxudmFyIEJ1Zl9zaXplICAgICAgPSAxNjtcbi8qIHNpemUgb2YgYml0IGJ1ZmZlciBpbiBiaV9idWYgKi9cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvbnN0YW50c1xuICovXG5cbnZhciBNQVhfQkxfQklUUyA9IDc7XG4vKiBCaXQgbGVuZ3RoIGNvZGVzIG11c3Qgbm90IGV4Y2VlZCBNQVhfQkxfQklUUyBiaXRzICovXG5cbnZhciBFTkRfQkxPQ0sgICA9IDI1Njtcbi8qIGVuZCBvZiBibG9jayBsaXRlcmFsIGNvZGUgKi9cblxudmFyIFJFUF8zXzYgICAgID0gMTY7XG4vKiByZXBlYXQgcHJldmlvdXMgYml0IGxlbmd0aCAzLTYgdGltZXMgKDIgYml0cyBvZiByZXBlYXQgY291bnQpICovXG5cbnZhciBSRVBaXzNfMTAgICA9IDE3O1xuLyogcmVwZWF0IGEgemVybyBsZW5ndGggMy0xMCB0aW1lcyAgKDMgYml0cyBvZiByZXBlYXQgY291bnQpICovXG5cbnZhciBSRVBaXzExXzEzOCA9IDE4O1xuLyogcmVwZWF0IGEgemVybyBsZW5ndGggMTEtMTM4IHRpbWVzICAoNyBiaXRzIG9mIHJlcGVhdCBjb3VudCkgKi9cblxuLyogZXNsaW50LWRpc2FibGUgY29tbWEtc3BhY2luZyxhcnJheS1icmFja2V0LXNwYWNpbmcgKi9cbnZhciBleHRyYV9sYml0cyA9ICAgLyogZXh0cmEgYml0cyBmb3IgZWFjaCBsZW5ndGggY29kZSAqL1xuICBbMCwwLDAsMCwwLDAsMCwwLDEsMSwxLDEsMiwyLDIsMiwzLDMsMywzLDQsNCw0LDQsNSw1LDUsNSwwXTtcblxudmFyIGV4dHJhX2RiaXRzID0gICAvKiBleHRyYSBiaXRzIGZvciBlYWNoIGRpc3RhbmNlIGNvZGUgKi9cbiAgWzAsMCwwLDAsMSwxLDIsMiwzLDMsNCw0LDUsNSw2LDYsNyw3LDgsOCw5LDksMTAsMTAsMTEsMTEsMTIsMTIsMTMsMTNdO1xuXG52YXIgZXh0cmFfYmxiaXRzID0gIC8qIGV4dHJhIGJpdHMgZm9yIGVhY2ggYml0IGxlbmd0aCBjb2RlICovXG4gIFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDIsMyw3XTtcblxudmFyIGJsX29yZGVyID1cbiAgWzE2LDE3LDE4LDAsOCw3LDksNiwxMCw1LDExLDQsMTIsMywxMywyLDE0LDEsMTVdO1xuLyogZXNsaW50LWVuYWJsZSBjb21tYS1zcGFjaW5nLGFycmF5LWJyYWNrZXQtc3BhY2luZyAqL1xuXG4vKiBUaGUgbGVuZ3RocyBvZiB0aGUgYml0IGxlbmd0aCBjb2RlcyBhcmUgc2VudCBpbiBvcmRlciBvZiBkZWNyZWFzaW5nXG4gKiBwcm9iYWJpbGl0eSwgdG8gYXZvaWQgdHJhbnNtaXR0aW5nIHRoZSBsZW5ndGhzIGZvciB1bnVzZWQgYml0IGxlbmd0aCBjb2Rlcy5cbiAqL1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIExvY2FsIGRhdGEuIFRoZXNlIGFyZSBpbml0aWFsaXplZCBvbmx5IG9uY2UuXG4gKi9cblxuLy8gV2UgcHJlLWZpbGwgYXJyYXlzIHdpdGggMCB0byBhdm9pZCB1bmluaXRpYWxpemVkIGdhcHNcblxudmFyIERJU1RfQ09ERV9MRU4gPSA1MTI7IC8qIHNlZSBkZWZpbml0aW9uIG9mIGFycmF5IGRpc3RfY29kZSBiZWxvdyAqL1xuXG4vLyAhISEhIFVzZSBmbGF0IGFycmF5IGluc3RlYWQgb2Ygc3RydWN0dXJlLCBGcmVxID0gaSoyLCBMZW4gPSBpKjIrMVxudmFyIHN0YXRpY19sdHJlZSAgPSBuZXcgQXJyYXkoKExfQ09ERVMgKyAyKSAqIDIpO1xuemVybyhzdGF0aWNfbHRyZWUpO1xuLyogVGhlIHN0YXRpYyBsaXRlcmFsIHRyZWUuIFNpbmNlIHRoZSBiaXQgbGVuZ3RocyBhcmUgaW1wb3NlZCwgdGhlcmUgaXMgbm9cbiAqIG5lZWQgZm9yIHRoZSBMX0NPREVTIGV4dHJhIGNvZGVzIHVzZWQgZHVyaW5nIGhlYXAgY29uc3RydWN0aW9uLiBIb3dldmVyXG4gKiBUaGUgY29kZXMgMjg2IGFuZCAyODcgYXJlIG5lZWRlZCB0byBidWlsZCBhIGNhbm9uaWNhbCB0cmVlIChzZWUgX3RyX2luaXRcbiAqIGJlbG93KS5cbiAqL1xuXG52YXIgc3RhdGljX2R0cmVlICA9IG5ldyBBcnJheShEX0NPREVTICogMik7XG56ZXJvKHN0YXRpY19kdHJlZSk7XG4vKiBUaGUgc3RhdGljIGRpc3RhbmNlIHRyZWUuIChBY3R1YWxseSBhIHRyaXZpYWwgdHJlZSBzaW5jZSBhbGwgY29kZXMgdXNlXG4gKiA1IGJpdHMuKVxuICovXG5cbnZhciBfZGlzdF9jb2RlICAgID0gbmV3IEFycmF5KERJU1RfQ09ERV9MRU4pO1xuemVybyhfZGlzdF9jb2RlKTtcbi8qIERpc3RhbmNlIGNvZGVzLiBUaGUgZmlyc3QgMjU2IHZhbHVlcyBjb3JyZXNwb25kIHRvIHRoZSBkaXN0YW5jZXNcbiAqIDMgLi4gMjU4LCB0aGUgbGFzdCAyNTYgdmFsdWVzIGNvcnJlc3BvbmQgdG8gdGhlIHRvcCA4IGJpdHMgb2ZcbiAqIHRoZSAxNSBiaXQgZGlzdGFuY2VzLlxuICovXG5cbnZhciBfbGVuZ3RoX2NvZGUgID0gbmV3IEFycmF5KE1BWF9NQVRDSCAtIE1JTl9NQVRDSCArIDEpO1xuemVybyhfbGVuZ3RoX2NvZGUpO1xuLyogbGVuZ3RoIGNvZGUgZm9yIGVhY2ggbm9ybWFsaXplZCBtYXRjaCBsZW5ndGggKDAgPT0gTUlOX01BVENIKSAqL1xuXG52YXIgYmFzZV9sZW5ndGggICA9IG5ldyBBcnJheShMRU5HVEhfQ09ERVMpO1xuemVybyhiYXNlX2xlbmd0aCk7XG4vKiBGaXJzdCBub3JtYWxpemVkIGxlbmd0aCBmb3IgZWFjaCBjb2RlICgwID0gTUlOX01BVENIKSAqL1xuXG52YXIgYmFzZV9kaXN0ICAgICA9IG5ldyBBcnJheShEX0NPREVTKTtcbnplcm8oYmFzZV9kaXN0KTtcbi8qIEZpcnN0IG5vcm1hbGl6ZWQgZGlzdGFuY2UgZm9yIGVhY2ggY29kZSAoMCA9IGRpc3RhbmNlIG9mIDEpICovXG5cblxuZnVuY3Rpb24gU3RhdGljVHJlZURlc2Moc3RhdGljX3RyZWUsIGV4dHJhX2JpdHMsIGV4dHJhX2Jhc2UsIGVsZW1zLCBtYXhfbGVuZ3RoKSB7XG5cbiAgdGhpcy5zdGF0aWNfdHJlZSAgPSBzdGF0aWNfdHJlZTsgIC8qIHN0YXRpYyB0cmVlIG9yIE5VTEwgKi9cbiAgdGhpcy5leHRyYV9iaXRzICAgPSBleHRyYV9iaXRzOyAgIC8qIGV4dHJhIGJpdHMgZm9yIGVhY2ggY29kZSBvciBOVUxMICovXG4gIHRoaXMuZXh0cmFfYmFzZSAgID0gZXh0cmFfYmFzZTsgICAvKiBiYXNlIGluZGV4IGZvciBleHRyYV9iaXRzICovXG4gIHRoaXMuZWxlbXMgICAgICAgID0gZWxlbXM7ICAgICAgICAvKiBtYXggbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSB0cmVlICovXG4gIHRoaXMubWF4X2xlbmd0aCAgID0gbWF4X2xlbmd0aDsgICAvKiBtYXggYml0IGxlbmd0aCBmb3IgdGhlIGNvZGVzICovXG5cbiAgLy8gc2hvdyBpZiBgc3RhdGljX3RyZWVgIGhhcyBkYXRhIG9yIGR1bW15IC0gbmVlZGVkIGZvciBtb25vbW9ycGhpYyBvYmplY3RzXG4gIHRoaXMuaGFzX3N0cmVlICAgID0gc3RhdGljX3RyZWUgJiYgc3RhdGljX3RyZWUubGVuZ3RoO1xufVxuXG5cbnZhciBzdGF0aWNfbF9kZXNjO1xudmFyIHN0YXRpY19kX2Rlc2M7XG52YXIgc3RhdGljX2JsX2Rlc2M7XG5cblxuZnVuY3Rpb24gVHJlZURlc2MoZHluX3RyZWUsIHN0YXRfZGVzYykge1xuICB0aGlzLmR5bl90cmVlID0gZHluX3RyZWU7ICAgICAvKiB0aGUgZHluYW1pYyB0cmVlICovXG4gIHRoaXMubWF4X2NvZGUgPSAwOyAgICAgICAgICAgIC8qIGxhcmdlc3QgY29kZSB3aXRoIG5vbiB6ZXJvIGZyZXF1ZW5jeSAqL1xuICB0aGlzLnN0YXRfZGVzYyA9IHN0YXRfZGVzYzsgICAvKiB0aGUgY29ycmVzcG9uZGluZyBzdGF0aWMgdHJlZSAqL1xufVxuXG5cblxuZnVuY3Rpb24gZF9jb2RlKGRpc3QpIHtcbiAgcmV0dXJuIGRpc3QgPCAyNTYgPyBfZGlzdF9jb2RlW2Rpc3RdIDogX2Rpc3RfY29kZVsyNTYgKyAoZGlzdCA+Pj4gNyldO1xufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogT3V0cHV0IGEgc2hvcnQgTFNCIGZpcnN0IG9uIHRoZSBzdHJlYW0uXG4gKiBJTiBhc3NlcnRpb246IHRoZXJlIGlzIGVub3VnaCByb29tIGluIHBlbmRpbmdCdWYuXG4gKi9cbmZ1bmN0aW9uIHB1dF9zaG9ydChzLCB3KSB7XG4vLyAgICBwdXRfYnl0ZShzLCAodWNoKSgodykgJiAweGZmKSk7XG4vLyAgICBwdXRfYnl0ZShzLCAodWNoKSgodXNoKSh3KSA+PiA4KSk7XG4gIHMucGVuZGluZ19idWZbcy5wZW5kaW5nKytdID0gKHcpICYgMHhmZjtcbiAgcy5wZW5kaW5nX2J1ZltzLnBlbmRpbmcrK10gPSAodyA+Pj4gOCkgJiAweGZmO1xufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogU2VuZCBhIHZhbHVlIG9uIGEgZ2l2ZW4gbnVtYmVyIG9mIGJpdHMuXG4gKiBJTiBhc3NlcnRpb246IGxlbmd0aCA8PSAxNiBhbmQgdmFsdWUgZml0cyBpbiBsZW5ndGggYml0cy5cbiAqL1xuZnVuY3Rpb24gc2VuZF9iaXRzKHMsIHZhbHVlLCBsZW5ndGgpIHtcbiAgaWYgKHMuYmlfdmFsaWQgPiAoQnVmX3NpemUgLSBsZW5ndGgpKSB7XG4gICAgcy5iaV9idWYgfD0gKHZhbHVlIDw8IHMuYmlfdmFsaWQpICYgMHhmZmZmO1xuICAgIHB1dF9zaG9ydChzLCBzLmJpX2J1Zik7XG4gICAgcy5iaV9idWYgPSB2YWx1ZSA+PiAoQnVmX3NpemUgLSBzLmJpX3ZhbGlkKTtcbiAgICBzLmJpX3ZhbGlkICs9IGxlbmd0aCAtIEJ1Zl9zaXplO1xuICB9IGVsc2Uge1xuICAgIHMuYmlfYnVmIHw9ICh2YWx1ZSA8PCBzLmJpX3ZhbGlkKSAmIDB4ZmZmZjtcbiAgICBzLmJpX3ZhbGlkICs9IGxlbmd0aDtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHNlbmRfY29kZShzLCBjLCB0cmVlKSB7XG4gIHNlbmRfYml0cyhzLCB0cmVlW2MgKiAyXS8qLkNvZGUqLywgdHJlZVtjICogMiArIDFdLyouTGVuKi8pO1xufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogUmV2ZXJzZSB0aGUgZmlyc3QgbGVuIGJpdHMgb2YgYSBjb2RlLCB1c2luZyBzdHJhaWdodGZvcndhcmQgY29kZSAoYSBmYXN0ZXJcbiAqIG1ldGhvZCB3b3VsZCB1c2UgYSB0YWJsZSlcbiAqIElOIGFzc2VydGlvbjogMSA8PSBsZW4gPD0gMTVcbiAqL1xuZnVuY3Rpb24gYmlfcmV2ZXJzZShjb2RlLCBsZW4pIHtcbiAgdmFyIHJlcyA9IDA7XG4gIGRvIHtcbiAgICByZXMgfD0gY29kZSAmIDE7XG4gICAgY29kZSA+Pj49IDE7XG4gICAgcmVzIDw8PSAxO1xuICB9IHdoaWxlICgtLWxlbiA+IDApO1xuICByZXR1cm4gcmVzID4+PiAxO1xufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogRmx1c2ggdGhlIGJpdCBidWZmZXIsIGtlZXBpbmcgYXQgbW9zdCA3IGJpdHMgaW4gaXQuXG4gKi9cbmZ1bmN0aW9uIGJpX2ZsdXNoKHMpIHtcbiAgaWYgKHMuYmlfdmFsaWQgPT09IDE2KSB7XG4gICAgcHV0X3Nob3J0KHMsIHMuYmlfYnVmKTtcbiAgICBzLmJpX2J1ZiA9IDA7XG4gICAgcy5iaV92YWxpZCA9IDA7XG5cbiAgfSBlbHNlIGlmIChzLmJpX3ZhbGlkID49IDgpIHtcbiAgICBzLnBlbmRpbmdfYnVmW3MucGVuZGluZysrXSA9IHMuYmlfYnVmICYgMHhmZjtcbiAgICBzLmJpX2J1ZiA+Pj0gODtcbiAgICBzLmJpX3ZhbGlkIC09IDg7XG4gIH1cbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvbXB1dGUgdGhlIG9wdGltYWwgYml0IGxlbmd0aHMgZm9yIGEgdHJlZSBhbmQgdXBkYXRlIHRoZSB0b3RhbCBiaXQgbGVuZ3RoXG4gKiBmb3IgdGhlIGN1cnJlbnQgYmxvY2suXG4gKiBJTiBhc3NlcnRpb246IHRoZSBmaWVsZHMgZnJlcSBhbmQgZGFkIGFyZSBzZXQsIGhlYXBbaGVhcF9tYXhdIGFuZFxuICogICAgYWJvdmUgYXJlIHRoZSB0cmVlIG5vZGVzIHNvcnRlZCBieSBpbmNyZWFzaW5nIGZyZXF1ZW5jeS5cbiAqIE9VVCBhc3NlcnRpb25zOiB0aGUgZmllbGQgbGVuIGlzIHNldCB0byB0aGUgb3B0aW1hbCBiaXQgbGVuZ3RoLCB0aGVcbiAqICAgICBhcnJheSBibF9jb3VudCBjb250YWlucyB0aGUgZnJlcXVlbmNpZXMgZm9yIGVhY2ggYml0IGxlbmd0aC5cbiAqICAgICBUaGUgbGVuZ3RoIG9wdF9sZW4gaXMgdXBkYXRlZDsgc3RhdGljX2xlbiBpcyBhbHNvIHVwZGF0ZWQgaWYgc3RyZWUgaXNcbiAqICAgICBub3QgbnVsbC5cbiAqL1xuZnVuY3Rpb24gZ2VuX2JpdGxlbihzLCBkZXNjKVxuLy8gICAgZGVmbGF0ZV9zdGF0ZSAqcztcbi8vICAgIHRyZWVfZGVzYyAqZGVzYzsgICAgLyogdGhlIHRyZWUgZGVzY3JpcHRvciAqL1xue1xuICB2YXIgdHJlZSAgICAgICAgICAgID0gZGVzYy5keW5fdHJlZTtcbiAgdmFyIG1heF9jb2RlICAgICAgICA9IGRlc2MubWF4X2NvZGU7XG4gIHZhciBzdHJlZSAgICAgICAgICAgPSBkZXNjLnN0YXRfZGVzYy5zdGF0aWNfdHJlZTtcbiAgdmFyIGhhc19zdHJlZSAgICAgICA9IGRlc2Muc3RhdF9kZXNjLmhhc19zdHJlZTtcbiAgdmFyIGV4dHJhICAgICAgICAgICA9IGRlc2Muc3RhdF9kZXNjLmV4dHJhX2JpdHM7XG4gIHZhciBiYXNlICAgICAgICAgICAgPSBkZXNjLnN0YXRfZGVzYy5leHRyYV9iYXNlO1xuICB2YXIgbWF4X2xlbmd0aCAgICAgID0gZGVzYy5zdGF0X2Rlc2MubWF4X2xlbmd0aDtcbiAgdmFyIGg7ICAgICAgICAgICAgICAvKiBoZWFwIGluZGV4ICovXG4gIHZhciBuLCBtOyAgICAgICAgICAgLyogaXRlcmF0ZSBvdmVyIHRoZSB0cmVlIGVsZW1lbnRzICovXG4gIHZhciBiaXRzOyAgICAgICAgICAgLyogYml0IGxlbmd0aCAqL1xuICB2YXIgeGJpdHM7ICAgICAgICAgIC8qIGV4dHJhIGJpdHMgKi9cbiAgdmFyIGY7ICAgICAgICAgICAgICAvKiBmcmVxdWVuY3kgKi9cbiAgdmFyIG92ZXJmbG93ID0gMDsgICAvKiBudW1iZXIgb2YgZWxlbWVudHMgd2l0aCBiaXQgbGVuZ3RoIHRvbyBsYXJnZSAqL1xuXG4gIGZvciAoYml0cyA9IDA7IGJpdHMgPD0gTUFYX0JJVFM7IGJpdHMrKykge1xuICAgIHMuYmxfY291bnRbYml0c10gPSAwO1xuICB9XG5cbiAgLyogSW4gYSBmaXJzdCBwYXNzLCBjb21wdXRlIHRoZSBvcHRpbWFsIGJpdCBsZW5ndGhzICh3aGljaCBtYXlcbiAgICogb3ZlcmZsb3cgaW4gdGhlIGNhc2Ugb2YgdGhlIGJpdCBsZW5ndGggdHJlZSkuXG4gICAqL1xuICB0cmVlW3MuaGVhcFtzLmhlYXBfbWF4XSAqIDIgKyAxXS8qLkxlbiovID0gMDsgLyogcm9vdCBvZiB0aGUgaGVhcCAqL1xuXG4gIGZvciAoaCA9IHMuaGVhcF9tYXggKyAxOyBoIDwgSEVBUF9TSVpFOyBoKyspIHtcbiAgICBuID0gcy5oZWFwW2hdO1xuICAgIGJpdHMgPSB0cmVlW3RyZWVbbiAqIDIgKyAxXS8qLkRhZCovICogMiArIDFdLyouTGVuKi8gKyAxO1xuICAgIGlmIChiaXRzID4gbWF4X2xlbmd0aCkge1xuICAgICAgYml0cyA9IG1heF9sZW5ndGg7XG4gICAgICBvdmVyZmxvdysrO1xuICAgIH1cbiAgICB0cmVlW24gKiAyICsgMV0vKi5MZW4qLyA9IGJpdHM7XG4gICAgLyogV2Ugb3ZlcndyaXRlIHRyZWVbbl0uRGFkIHdoaWNoIGlzIG5vIGxvbmdlciBuZWVkZWQgKi9cblxuICAgIGlmIChuID4gbWF4X2NvZGUpIHsgY29udGludWU7IH0gLyogbm90IGEgbGVhZiBub2RlICovXG5cbiAgICBzLmJsX2NvdW50W2JpdHNdKys7XG4gICAgeGJpdHMgPSAwO1xuICAgIGlmIChuID49IGJhc2UpIHtcbiAgICAgIHhiaXRzID0gZXh0cmFbbiAtIGJhc2VdO1xuICAgIH1cbiAgICBmID0gdHJlZVtuICogMl0vKi5GcmVxKi87XG4gICAgcy5vcHRfbGVuICs9IGYgKiAoYml0cyArIHhiaXRzKTtcbiAgICBpZiAoaGFzX3N0cmVlKSB7XG4gICAgICBzLnN0YXRpY19sZW4gKz0gZiAqIChzdHJlZVtuICogMiArIDFdLyouTGVuKi8gKyB4Yml0cyk7XG4gICAgfVxuICB9XG4gIGlmIChvdmVyZmxvdyA9PT0gMCkgeyByZXR1cm47IH1cblxuICAvLyBUcmFjZSgoc3RkZXJyLFwiXFxuYml0IGxlbmd0aCBvdmVyZmxvd1xcblwiKSk7XG4gIC8qIFRoaXMgaGFwcGVucyBmb3IgZXhhbXBsZSBvbiBvYmoyIGFuZCBwaWMgb2YgdGhlIENhbGdhcnkgY29ycHVzICovXG5cbiAgLyogRmluZCB0aGUgZmlyc3QgYml0IGxlbmd0aCB3aGljaCBjb3VsZCBpbmNyZWFzZTogKi9cbiAgZG8ge1xuICAgIGJpdHMgPSBtYXhfbGVuZ3RoIC0gMTtcbiAgICB3aGlsZSAocy5ibF9jb3VudFtiaXRzXSA9PT0gMCkgeyBiaXRzLS07IH1cbiAgICBzLmJsX2NvdW50W2JpdHNdLS07ICAgICAgLyogbW92ZSBvbmUgbGVhZiBkb3duIHRoZSB0cmVlICovXG4gICAgcy5ibF9jb3VudFtiaXRzICsgMV0gKz0gMjsgLyogbW92ZSBvbmUgb3ZlcmZsb3cgaXRlbSBhcyBpdHMgYnJvdGhlciAqL1xuICAgIHMuYmxfY291bnRbbWF4X2xlbmd0aF0tLTtcbiAgICAvKiBUaGUgYnJvdGhlciBvZiB0aGUgb3ZlcmZsb3cgaXRlbSBhbHNvIG1vdmVzIG9uZSBzdGVwIHVwLFxuICAgICAqIGJ1dCB0aGlzIGRvZXMgbm90IGFmZmVjdCBibF9jb3VudFttYXhfbGVuZ3RoXVxuICAgICAqL1xuICAgIG92ZXJmbG93IC09IDI7XG4gIH0gd2hpbGUgKG92ZXJmbG93ID4gMCk7XG5cbiAgLyogTm93IHJlY29tcHV0ZSBhbGwgYml0IGxlbmd0aHMsIHNjYW5uaW5nIGluIGluY3JlYXNpbmcgZnJlcXVlbmN5LlxuICAgKiBoIGlzIHN0aWxsIGVxdWFsIHRvIEhFQVBfU0laRS4gKEl0IGlzIHNpbXBsZXIgdG8gcmVjb25zdHJ1Y3QgYWxsXG4gICAqIGxlbmd0aHMgaW5zdGVhZCBvZiBmaXhpbmcgb25seSB0aGUgd3Jvbmcgb25lcy4gVGhpcyBpZGVhIGlzIHRha2VuXG4gICAqIGZyb20gJ2FyJyB3cml0dGVuIGJ5IEhhcnVoaWtvIE9rdW11cmEuKVxuICAgKi9cbiAgZm9yIChiaXRzID0gbWF4X2xlbmd0aDsgYml0cyAhPT0gMDsgYml0cy0tKSB7XG4gICAgbiA9IHMuYmxfY291bnRbYml0c107XG4gICAgd2hpbGUgKG4gIT09IDApIHtcbiAgICAgIG0gPSBzLmhlYXBbLS1oXTtcbiAgICAgIGlmIChtID4gbWF4X2NvZGUpIHsgY29udGludWU7IH1cbiAgICAgIGlmICh0cmVlW20gKiAyICsgMV0vKi5MZW4qLyAhPT0gYml0cykge1xuICAgICAgICAvLyBUcmFjZSgoc3RkZXJyLFwiY29kZSAlZCBiaXRzICVkLT4lZFxcblwiLCBtLCB0cmVlW21dLkxlbiwgYml0cykpO1xuICAgICAgICBzLm9wdF9sZW4gKz0gKGJpdHMgLSB0cmVlW20gKiAyICsgMV0vKi5MZW4qLykgKiB0cmVlW20gKiAyXS8qLkZyZXEqLztcbiAgICAgICAgdHJlZVttICogMiArIDFdLyouTGVuKi8gPSBiaXRzO1xuICAgICAgfVxuICAgICAgbi0tO1xuICAgIH1cbiAgfVxufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogR2VuZXJhdGUgdGhlIGNvZGVzIGZvciBhIGdpdmVuIHRyZWUgYW5kIGJpdCBjb3VudHMgKHdoaWNoIG5lZWQgbm90IGJlXG4gKiBvcHRpbWFsKS5cbiAqIElOIGFzc2VydGlvbjogdGhlIGFycmF5IGJsX2NvdW50IGNvbnRhaW5zIHRoZSBiaXQgbGVuZ3RoIHN0YXRpc3RpY3MgZm9yXG4gKiB0aGUgZ2l2ZW4gdHJlZSBhbmQgdGhlIGZpZWxkIGxlbiBpcyBzZXQgZm9yIGFsbCB0cmVlIGVsZW1lbnRzLlxuICogT1VUIGFzc2VydGlvbjogdGhlIGZpZWxkIGNvZGUgaXMgc2V0IGZvciBhbGwgdHJlZSBlbGVtZW50cyBvZiBub25cbiAqICAgICB6ZXJvIGNvZGUgbGVuZ3RoLlxuICovXG5mdW5jdGlvbiBnZW5fY29kZXModHJlZSwgbWF4X2NvZGUsIGJsX2NvdW50KVxuLy8gICAgY3RfZGF0YSAqdHJlZTsgICAgICAgICAgICAgLyogdGhlIHRyZWUgdG8gZGVjb3JhdGUgKi9cbi8vICAgIGludCBtYXhfY29kZTsgICAgICAgICAgICAgIC8qIGxhcmdlc3QgY29kZSB3aXRoIG5vbiB6ZXJvIGZyZXF1ZW5jeSAqL1xuLy8gICAgdXNoZiAqYmxfY291bnQ7ICAgICAgICAgICAgLyogbnVtYmVyIG9mIGNvZGVzIGF0IGVhY2ggYml0IGxlbmd0aCAqL1xue1xuICB2YXIgbmV4dF9jb2RlID0gbmV3IEFycmF5KE1BWF9CSVRTICsgMSk7IC8qIG5leHQgY29kZSB2YWx1ZSBmb3IgZWFjaCBiaXQgbGVuZ3RoICovXG4gIHZhciBjb2RlID0gMDsgICAgICAgICAgICAgIC8qIHJ1bm5pbmcgY29kZSB2YWx1ZSAqL1xuICB2YXIgYml0czsgICAgICAgICAgICAgICAgICAvKiBiaXQgaW5kZXggKi9cbiAgdmFyIG47ICAgICAgICAgICAgICAgICAgICAgLyogY29kZSBpbmRleCAqL1xuXG4gIC8qIFRoZSBkaXN0cmlidXRpb24gY291bnRzIGFyZSBmaXJzdCB1c2VkIHRvIGdlbmVyYXRlIHRoZSBjb2RlIHZhbHVlc1xuICAgKiB3aXRob3V0IGJpdCByZXZlcnNhbC5cbiAgICovXG4gIGZvciAoYml0cyA9IDE7IGJpdHMgPD0gTUFYX0JJVFM7IGJpdHMrKykge1xuICAgIG5leHRfY29kZVtiaXRzXSA9IGNvZGUgPSAoY29kZSArIGJsX2NvdW50W2JpdHMgLSAxXSkgPDwgMTtcbiAgfVxuICAvKiBDaGVjayB0aGF0IHRoZSBiaXQgY291bnRzIGluIGJsX2NvdW50IGFyZSBjb25zaXN0ZW50LiBUaGUgbGFzdCBjb2RlXG4gICAqIG11c3QgYmUgYWxsIG9uZXMuXG4gICAqL1xuICAvL0Fzc2VydCAoY29kZSArIGJsX2NvdW50W01BWF9CSVRTXS0xID09ICgxPDxNQVhfQklUUyktMSxcbiAgLy8gICAgICAgIFwiaW5jb25zaXN0ZW50IGJpdCBjb3VudHNcIik7XG4gIC8vVHJhY2V2KChzdGRlcnIsXCJcXG5nZW5fY29kZXM6IG1heF9jb2RlICVkIFwiLCBtYXhfY29kZSkpO1xuXG4gIGZvciAobiA9IDA7ICBuIDw9IG1heF9jb2RlOyBuKyspIHtcbiAgICB2YXIgbGVuID0gdHJlZVtuICogMiArIDFdLyouTGVuKi87XG4gICAgaWYgKGxlbiA9PT0gMCkgeyBjb250aW51ZTsgfVxuICAgIC8qIE5vdyByZXZlcnNlIHRoZSBiaXRzICovXG4gICAgdHJlZVtuICogMl0vKi5Db2RlKi8gPSBiaV9yZXZlcnNlKG5leHRfY29kZVtsZW5dKyssIGxlbik7XG5cbiAgICAvL1RyYWNlY3YodHJlZSAhPSBzdGF0aWNfbHRyZWUsIChzdGRlcnIsXCJcXG5uICUzZCAlYyBsICUyZCBjICU0eCAoJXgpIFwiLFxuICAgIC8vICAgICBuLCAoaXNncmFwaChuKSA/IG4gOiAnICcpLCBsZW4sIHRyZWVbbl0uQ29kZSwgbmV4dF9jb2RlW2xlbl0tMSkpO1xuICB9XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBJbml0aWFsaXplIHRoZSB2YXJpb3VzICdjb25zdGFudCcgdGFibGVzLlxuICovXG5mdW5jdGlvbiB0cl9zdGF0aWNfaW5pdCgpIHtcbiAgdmFyIG47ICAgICAgICAvKiBpdGVyYXRlcyBvdmVyIHRyZWUgZWxlbWVudHMgKi9cbiAgdmFyIGJpdHM7ICAgICAvKiBiaXQgY291bnRlciAqL1xuICB2YXIgbGVuZ3RoOyAgIC8qIGxlbmd0aCB2YWx1ZSAqL1xuICB2YXIgY29kZTsgICAgIC8qIGNvZGUgdmFsdWUgKi9cbiAgdmFyIGRpc3Q7ICAgICAvKiBkaXN0YW5jZSBpbmRleCAqL1xuICB2YXIgYmxfY291bnQgPSBuZXcgQXJyYXkoTUFYX0JJVFMgKyAxKTtcbiAgLyogbnVtYmVyIG9mIGNvZGVzIGF0IGVhY2ggYml0IGxlbmd0aCBmb3IgYW4gb3B0aW1hbCB0cmVlICovXG5cbiAgLy8gZG8gY2hlY2sgaW4gX3RyX2luaXQoKVxuICAvL2lmIChzdGF0aWNfaW5pdF9kb25lKSByZXR1cm47XG5cbiAgLyogRm9yIHNvbWUgZW1iZWRkZWQgdGFyZ2V0cywgZ2xvYmFsIHZhcmlhYmxlcyBhcmUgbm90IGluaXRpYWxpemVkOiAqL1xuLyojaWZkZWYgTk9fSU5JVF9HTE9CQUxfUE9JTlRFUlNcbiAgc3RhdGljX2xfZGVzYy5zdGF0aWNfdHJlZSA9IHN0YXRpY19sdHJlZTtcbiAgc3RhdGljX2xfZGVzYy5leHRyYV9iaXRzID0gZXh0cmFfbGJpdHM7XG4gIHN0YXRpY19kX2Rlc2Muc3RhdGljX3RyZWUgPSBzdGF0aWNfZHRyZWU7XG4gIHN0YXRpY19kX2Rlc2MuZXh0cmFfYml0cyA9IGV4dHJhX2RiaXRzO1xuICBzdGF0aWNfYmxfZGVzYy5leHRyYV9iaXRzID0gZXh0cmFfYmxiaXRzO1xuI2VuZGlmKi9cblxuICAvKiBJbml0aWFsaXplIHRoZSBtYXBwaW5nIGxlbmd0aCAoMC4uMjU1KSAtPiBsZW5ndGggY29kZSAoMC4uMjgpICovXG4gIGxlbmd0aCA9IDA7XG4gIGZvciAoY29kZSA9IDA7IGNvZGUgPCBMRU5HVEhfQ09ERVMgLSAxOyBjb2RlKyspIHtcbiAgICBiYXNlX2xlbmd0aFtjb2RlXSA9IGxlbmd0aDtcbiAgICBmb3IgKG4gPSAwOyBuIDwgKDEgPDwgZXh0cmFfbGJpdHNbY29kZV0pOyBuKyspIHtcbiAgICAgIF9sZW5ndGhfY29kZVtsZW5ndGgrK10gPSBjb2RlO1xuICAgIH1cbiAgfVxuICAvL0Fzc2VydCAobGVuZ3RoID09IDI1NiwgXCJ0cl9zdGF0aWNfaW5pdDogbGVuZ3RoICE9IDI1NlwiKTtcbiAgLyogTm90ZSB0aGF0IHRoZSBsZW5ndGggMjU1IChtYXRjaCBsZW5ndGggMjU4KSBjYW4gYmUgcmVwcmVzZW50ZWRcbiAgICogaW4gdHdvIGRpZmZlcmVudCB3YXlzOiBjb2RlIDI4NCArIDUgYml0cyBvciBjb2RlIDI4NSwgc28gd2VcbiAgICogb3ZlcndyaXRlIGxlbmd0aF9jb2RlWzI1NV0gdG8gdXNlIHRoZSBiZXN0IGVuY29kaW5nOlxuICAgKi9cbiAgX2xlbmd0aF9jb2RlW2xlbmd0aCAtIDFdID0gY29kZTtcblxuICAvKiBJbml0aWFsaXplIHRoZSBtYXBwaW5nIGRpc3QgKDAuLjMySykgLT4gZGlzdCBjb2RlICgwLi4yOSkgKi9cbiAgZGlzdCA9IDA7XG4gIGZvciAoY29kZSA9IDA7IGNvZGUgPCAxNjsgY29kZSsrKSB7XG4gICAgYmFzZV9kaXN0W2NvZGVdID0gZGlzdDtcbiAgICBmb3IgKG4gPSAwOyBuIDwgKDEgPDwgZXh0cmFfZGJpdHNbY29kZV0pOyBuKyspIHtcbiAgICAgIF9kaXN0X2NvZGVbZGlzdCsrXSA9IGNvZGU7XG4gICAgfVxuICB9XG4gIC8vQXNzZXJ0IChkaXN0ID09IDI1NiwgXCJ0cl9zdGF0aWNfaW5pdDogZGlzdCAhPSAyNTZcIik7XG4gIGRpc3QgPj49IDc7IC8qIGZyb20gbm93IG9uLCBhbGwgZGlzdGFuY2VzIGFyZSBkaXZpZGVkIGJ5IDEyOCAqL1xuICBmb3IgKDsgY29kZSA8IERfQ09ERVM7IGNvZGUrKykge1xuICAgIGJhc2VfZGlzdFtjb2RlXSA9IGRpc3QgPDwgNztcbiAgICBmb3IgKG4gPSAwOyBuIDwgKDEgPDwgKGV4dHJhX2RiaXRzW2NvZGVdIC0gNykpOyBuKyspIHtcbiAgICAgIF9kaXN0X2NvZGVbMjU2ICsgZGlzdCsrXSA9IGNvZGU7XG4gICAgfVxuICB9XG4gIC8vQXNzZXJ0IChkaXN0ID09IDI1NiwgXCJ0cl9zdGF0aWNfaW5pdDogMjU2K2Rpc3QgIT0gNTEyXCIpO1xuXG4gIC8qIENvbnN0cnVjdCB0aGUgY29kZXMgb2YgdGhlIHN0YXRpYyBsaXRlcmFsIHRyZWUgKi9cbiAgZm9yIChiaXRzID0gMDsgYml0cyA8PSBNQVhfQklUUzsgYml0cysrKSB7XG4gICAgYmxfY291bnRbYml0c10gPSAwO1xuICB9XG5cbiAgbiA9IDA7XG4gIHdoaWxlIChuIDw9IDE0Mykge1xuICAgIHN0YXRpY19sdHJlZVtuICogMiArIDFdLyouTGVuKi8gPSA4O1xuICAgIG4rKztcbiAgICBibF9jb3VudFs4XSsrO1xuICB9XG4gIHdoaWxlIChuIDw9IDI1NSkge1xuICAgIHN0YXRpY19sdHJlZVtuICogMiArIDFdLyouTGVuKi8gPSA5O1xuICAgIG4rKztcbiAgICBibF9jb3VudFs5XSsrO1xuICB9XG4gIHdoaWxlIChuIDw9IDI3OSkge1xuICAgIHN0YXRpY19sdHJlZVtuICogMiArIDFdLyouTGVuKi8gPSA3O1xuICAgIG4rKztcbiAgICBibF9jb3VudFs3XSsrO1xuICB9XG4gIHdoaWxlIChuIDw9IDI4Nykge1xuICAgIHN0YXRpY19sdHJlZVtuICogMiArIDFdLyouTGVuKi8gPSA4O1xuICAgIG4rKztcbiAgICBibF9jb3VudFs4XSsrO1xuICB9XG4gIC8qIENvZGVzIDI4NiBhbmQgMjg3IGRvIG5vdCBleGlzdCwgYnV0IHdlIG11c3QgaW5jbHVkZSB0aGVtIGluIHRoZVxuICAgKiB0cmVlIGNvbnN0cnVjdGlvbiB0byBnZXQgYSBjYW5vbmljYWwgSHVmZm1hbiB0cmVlIChsb25nZXN0IGNvZGVcbiAgICogYWxsIG9uZXMpXG4gICAqL1xuICBnZW5fY29kZXMoc3RhdGljX2x0cmVlLCBMX0NPREVTICsgMSwgYmxfY291bnQpO1xuXG4gIC8qIFRoZSBzdGF0aWMgZGlzdGFuY2UgdHJlZSBpcyB0cml2aWFsOiAqL1xuICBmb3IgKG4gPSAwOyBuIDwgRF9DT0RFUzsgbisrKSB7XG4gICAgc3RhdGljX2R0cmVlW24gKiAyICsgMV0vKi5MZW4qLyA9IDU7XG4gICAgc3RhdGljX2R0cmVlW24gKiAyXS8qLkNvZGUqLyA9IGJpX3JldmVyc2UobiwgNSk7XG4gIH1cblxuICAvLyBOb3cgZGF0YSByZWFkeSBhbmQgd2UgY2FuIGluaXQgc3RhdGljIHRyZWVzXG4gIHN0YXRpY19sX2Rlc2MgPSBuZXcgU3RhdGljVHJlZURlc2Moc3RhdGljX2x0cmVlLCBleHRyYV9sYml0cywgTElURVJBTFMgKyAxLCBMX0NPREVTLCBNQVhfQklUUyk7XG4gIHN0YXRpY19kX2Rlc2MgPSBuZXcgU3RhdGljVHJlZURlc2Moc3RhdGljX2R0cmVlLCBleHRyYV9kYml0cywgMCwgICAgICAgICAgRF9DT0RFUywgTUFYX0JJVFMpO1xuICBzdGF0aWNfYmxfZGVzYyA9IG5ldyBTdGF0aWNUcmVlRGVzYyhuZXcgQXJyYXkoMCksIGV4dHJhX2JsYml0cywgMCwgICAgICAgICBCTF9DT0RFUywgTUFYX0JMX0JJVFMpO1xuXG4gIC8vc3RhdGljX2luaXRfZG9uZSA9IHRydWU7XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBJbml0aWFsaXplIGEgbmV3IGJsb2NrLlxuICovXG5mdW5jdGlvbiBpbml0X2Jsb2NrKHMpIHtcbiAgdmFyIG47IC8qIGl0ZXJhdGVzIG92ZXIgdHJlZSBlbGVtZW50cyAqL1xuXG4gIC8qIEluaXRpYWxpemUgdGhlIHRyZWVzLiAqL1xuICBmb3IgKG4gPSAwOyBuIDwgTF9DT0RFUzsgIG4rKykgeyBzLmR5bl9sdHJlZVtuICogMl0vKi5GcmVxKi8gPSAwOyB9XG4gIGZvciAobiA9IDA7IG4gPCBEX0NPREVTOyAgbisrKSB7IHMuZHluX2R0cmVlW24gKiAyXS8qLkZyZXEqLyA9IDA7IH1cbiAgZm9yIChuID0gMDsgbiA8IEJMX0NPREVTOyBuKyspIHsgcy5ibF90cmVlW24gKiAyXS8qLkZyZXEqLyA9IDA7IH1cblxuICBzLmR5bl9sdHJlZVtFTkRfQkxPQ0sgKiAyXS8qLkZyZXEqLyA9IDE7XG4gIHMub3B0X2xlbiA9IHMuc3RhdGljX2xlbiA9IDA7XG4gIHMubGFzdF9saXQgPSBzLm1hdGNoZXMgPSAwO1xufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogRmx1c2ggdGhlIGJpdCBidWZmZXIgYW5kIGFsaWduIHRoZSBvdXRwdXQgb24gYSBieXRlIGJvdW5kYXJ5XG4gKi9cbmZ1bmN0aW9uIGJpX3dpbmR1cChzKVxue1xuICBpZiAocy5iaV92YWxpZCA+IDgpIHtcbiAgICBwdXRfc2hvcnQocywgcy5iaV9idWYpO1xuICB9IGVsc2UgaWYgKHMuYmlfdmFsaWQgPiAwKSB7XG4gICAgLy9wdXRfYnl0ZShzLCAoQnl0ZSlzLT5iaV9idWYpO1xuICAgIHMucGVuZGluZ19idWZbcy5wZW5kaW5nKytdID0gcy5iaV9idWY7XG4gIH1cbiAgcy5iaV9idWYgPSAwO1xuICBzLmJpX3ZhbGlkID0gMDtcbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5IGEgc3RvcmVkIGJsb2NrLCBzdG9yaW5nIGZpcnN0IHRoZSBsZW5ndGggYW5kIGl0c1xuICogb25lJ3MgY29tcGxlbWVudCBpZiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIGNvcHlfYmxvY2socywgYnVmLCBsZW4sIGhlYWRlcilcbi8vRGVmbGF0ZVN0YXRlICpzO1xuLy9jaGFyZiAgICAqYnVmOyAgICAvKiB0aGUgaW5wdXQgZGF0YSAqL1xuLy91bnNpZ25lZCBsZW47ICAgICAvKiBpdHMgbGVuZ3RoICovXG4vL2ludCAgICAgIGhlYWRlcjsgIC8qIHRydWUgaWYgYmxvY2sgaGVhZGVyIG11c3QgYmUgd3JpdHRlbiAqL1xue1xuICBiaV93aW5kdXAocyk7ICAgICAgICAvKiBhbGlnbiBvbiBieXRlIGJvdW5kYXJ5ICovXG5cbiAgaWYgKGhlYWRlcikge1xuICAgIHB1dF9zaG9ydChzLCBsZW4pO1xuICAgIHB1dF9zaG9ydChzLCB+bGVuKTtcbiAgfVxuLy8gIHdoaWxlIChsZW4tLSkge1xuLy8gICAgcHV0X2J5dGUocywgKmJ1ZisrKTtcbi8vICB9XG4gIHV0aWxzLmFycmF5U2V0KHMucGVuZGluZ19idWYsIHMud2luZG93LCBidWYsIGxlbiwgcy5wZW5kaW5nKTtcbiAgcy5wZW5kaW5nICs9IGxlbjtcbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb21wYXJlcyB0byBzdWJ0cmVlcywgdXNpbmcgdGhlIHRyZWUgZGVwdGggYXMgdGllIGJyZWFrZXIgd2hlblxuICogdGhlIHN1YnRyZWVzIGhhdmUgZXF1YWwgZnJlcXVlbmN5LiBUaGlzIG1pbmltaXplcyB0aGUgd29yc3QgY2FzZSBsZW5ndGguXG4gKi9cbmZ1bmN0aW9uIHNtYWxsZXIodHJlZSwgbiwgbSwgZGVwdGgpIHtcbiAgdmFyIF9uMiA9IG4gKiAyO1xuICB2YXIgX20yID0gbSAqIDI7XG4gIHJldHVybiAodHJlZVtfbjJdLyouRnJlcSovIDwgdHJlZVtfbTJdLyouRnJlcSovIHx8XG4gICAgICAgICAodHJlZVtfbjJdLyouRnJlcSovID09PSB0cmVlW19tMl0vKi5GcmVxKi8gJiYgZGVwdGhbbl0gPD0gZGVwdGhbbV0pKTtcbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBSZXN0b3JlIHRoZSBoZWFwIHByb3BlcnR5IGJ5IG1vdmluZyBkb3duIHRoZSB0cmVlIHN0YXJ0aW5nIGF0IG5vZGUgayxcbiAqIGV4Y2hhbmdpbmcgYSBub2RlIHdpdGggdGhlIHNtYWxsZXN0IG9mIGl0cyB0d28gc29ucyBpZiBuZWNlc3NhcnksIHN0b3BwaW5nXG4gKiB3aGVuIHRoZSBoZWFwIHByb3BlcnR5IGlzIHJlLWVzdGFibGlzaGVkIChlYWNoIGZhdGhlciBzbWFsbGVyIHRoYW4gaXRzXG4gKiB0d28gc29ucykuXG4gKi9cbmZ1bmN0aW9uIHBxZG93bmhlYXAocywgdHJlZSwgaylcbi8vICAgIGRlZmxhdGVfc3RhdGUgKnM7XG4vLyAgICBjdF9kYXRhICp0cmVlOyAgLyogdGhlIHRyZWUgdG8gcmVzdG9yZSAqL1xuLy8gICAgaW50IGs7ICAgICAgICAgICAgICAgLyogbm9kZSB0byBtb3ZlIGRvd24gKi9cbntcbiAgdmFyIHYgPSBzLmhlYXBba107XG4gIHZhciBqID0gayA8PCAxOyAgLyogbGVmdCBzb24gb2YgayAqL1xuICB3aGlsZSAoaiA8PSBzLmhlYXBfbGVuKSB7XG4gICAgLyogU2V0IGogdG8gdGhlIHNtYWxsZXN0IG9mIHRoZSB0d28gc29uczogKi9cbiAgICBpZiAoaiA8IHMuaGVhcF9sZW4gJiZcbiAgICAgIHNtYWxsZXIodHJlZSwgcy5oZWFwW2ogKyAxXSwgcy5oZWFwW2pdLCBzLmRlcHRoKSkge1xuICAgICAgaisrO1xuICAgIH1cbiAgICAvKiBFeGl0IGlmIHYgaXMgc21hbGxlciB0aGFuIGJvdGggc29ucyAqL1xuICAgIGlmIChzbWFsbGVyKHRyZWUsIHYsIHMuaGVhcFtqXSwgcy5kZXB0aCkpIHsgYnJlYWs7IH1cblxuICAgIC8qIEV4Y2hhbmdlIHYgd2l0aCB0aGUgc21hbGxlc3Qgc29uICovXG4gICAgcy5oZWFwW2tdID0gcy5oZWFwW2pdO1xuICAgIGsgPSBqO1xuXG4gICAgLyogQW5kIGNvbnRpbnVlIGRvd24gdGhlIHRyZWUsIHNldHRpbmcgaiB0byB0aGUgbGVmdCBzb24gb2YgayAqL1xuICAgIGogPDw9IDE7XG4gIH1cbiAgcy5oZWFwW2tdID0gdjtcbn1cblxuXG4vLyBpbmxpbmVkIG1hbnVhbGx5XG4vLyB2YXIgU01BTExFU1QgPSAxO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFNlbmQgdGhlIGJsb2NrIGRhdGEgY29tcHJlc3NlZCB1c2luZyB0aGUgZ2l2ZW4gSHVmZm1hbiB0cmVlc1xuICovXG5mdW5jdGlvbiBjb21wcmVzc19ibG9jayhzLCBsdHJlZSwgZHRyZWUpXG4vLyAgICBkZWZsYXRlX3N0YXRlICpzO1xuLy8gICAgY29uc3QgY3RfZGF0YSAqbHRyZWU7IC8qIGxpdGVyYWwgdHJlZSAqL1xuLy8gICAgY29uc3QgY3RfZGF0YSAqZHRyZWU7IC8qIGRpc3RhbmNlIHRyZWUgKi9cbntcbiAgdmFyIGRpc3Q7ICAgICAgICAgICAvKiBkaXN0YW5jZSBvZiBtYXRjaGVkIHN0cmluZyAqL1xuICB2YXIgbGM7ICAgICAgICAgICAgIC8qIG1hdGNoIGxlbmd0aCBvciB1bm1hdGNoZWQgY2hhciAoaWYgZGlzdCA9PSAwKSAqL1xuICB2YXIgbHggPSAwOyAgICAgICAgIC8qIHJ1bm5pbmcgaW5kZXggaW4gbF9idWYgKi9cbiAgdmFyIGNvZGU7ICAgICAgICAgICAvKiB0aGUgY29kZSB0byBzZW5kICovXG4gIHZhciBleHRyYTsgICAgICAgICAgLyogbnVtYmVyIG9mIGV4dHJhIGJpdHMgdG8gc2VuZCAqL1xuXG4gIGlmIChzLmxhc3RfbGl0ICE9PSAwKSB7XG4gICAgZG8ge1xuICAgICAgZGlzdCA9IChzLnBlbmRpbmdfYnVmW3MuZF9idWYgKyBseCAqIDJdIDw8IDgpIHwgKHMucGVuZGluZ19idWZbcy5kX2J1ZiArIGx4ICogMiArIDFdKTtcbiAgICAgIGxjID0gcy5wZW5kaW5nX2J1ZltzLmxfYnVmICsgbHhdO1xuICAgICAgbHgrKztcblxuICAgICAgaWYgKGRpc3QgPT09IDApIHtcbiAgICAgICAgc2VuZF9jb2RlKHMsIGxjLCBsdHJlZSk7IC8qIHNlbmQgYSBsaXRlcmFsIGJ5dGUgKi9cbiAgICAgICAgLy9UcmFjZWN2KGlzZ3JhcGgobGMpLCAoc3RkZXJyLFwiICclYycgXCIsIGxjKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBIZXJlLCBsYyBpcyB0aGUgbWF0Y2ggbGVuZ3RoIC0gTUlOX01BVENIICovXG4gICAgICAgIGNvZGUgPSBfbGVuZ3RoX2NvZGVbbGNdO1xuICAgICAgICBzZW5kX2NvZGUocywgY29kZSArIExJVEVSQUxTICsgMSwgbHRyZWUpOyAvKiBzZW5kIHRoZSBsZW5ndGggY29kZSAqL1xuICAgICAgICBleHRyYSA9IGV4dHJhX2xiaXRzW2NvZGVdO1xuICAgICAgICBpZiAoZXh0cmEgIT09IDApIHtcbiAgICAgICAgICBsYyAtPSBiYXNlX2xlbmd0aFtjb2RlXTtcbiAgICAgICAgICBzZW5kX2JpdHMocywgbGMsIGV4dHJhKTsgICAgICAgLyogc2VuZCB0aGUgZXh0cmEgbGVuZ3RoIGJpdHMgKi9cbiAgICAgICAgfVxuICAgICAgICBkaXN0LS07IC8qIGRpc3QgaXMgbm93IHRoZSBtYXRjaCBkaXN0YW5jZSAtIDEgKi9cbiAgICAgICAgY29kZSA9IGRfY29kZShkaXN0KTtcbiAgICAgICAgLy9Bc3NlcnQgKGNvZGUgPCBEX0NPREVTLCBcImJhZCBkX2NvZGVcIik7XG5cbiAgICAgICAgc2VuZF9jb2RlKHMsIGNvZGUsIGR0cmVlKTsgICAgICAgLyogc2VuZCB0aGUgZGlzdGFuY2UgY29kZSAqL1xuICAgICAgICBleHRyYSA9IGV4dHJhX2RiaXRzW2NvZGVdO1xuICAgICAgICBpZiAoZXh0cmEgIT09IDApIHtcbiAgICAgICAgICBkaXN0IC09IGJhc2VfZGlzdFtjb2RlXTtcbiAgICAgICAgICBzZW5kX2JpdHMocywgZGlzdCwgZXh0cmEpOyAgIC8qIHNlbmQgdGhlIGV4dHJhIGRpc3RhbmNlIGJpdHMgKi9cbiAgICAgICAgfVxuICAgICAgfSAvKiBsaXRlcmFsIG9yIG1hdGNoIHBhaXIgPyAqL1xuXG4gICAgICAvKiBDaGVjayB0aGF0IHRoZSBvdmVybGF5IGJldHdlZW4gcGVuZGluZ19idWYgYW5kIGRfYnVmK2xfYnVmIGlzIG9rOiAqL1xuICAgICAgLy9Bc3NlcnQoKHVJbnQpKHMtPnBlbmRpbmcpIDwgcy0+bGl0X2J1ZnNpemUgKyAyKmx4LFxuICAgICAgLy8gICAgICAgXCJwZW5kaW5nQnVmIG92ZXJmbG93XCIpO1xuXG4gICAgfSB3aGlsZSAobHggPCBzLmxhc3RfbGl0KTtcbiAgfVxuXG4gIHNlbmRfY29kZShzLCBFTkRfQkxPQ0ssIGx0cmVlKTtcbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvbnN0cnVjdCBvbmUgSHVmZm1hbiB0cmVlIGFuZCBhc3NpZ25zIHRoZSBjb2RlIGJpdCBzdHJpbmdzIGFuZCBsZW5ndGhzLlxuICogVXBkYXRlIHRoZSB0b3RhbCBiaXQgbGVuZ3RoIGZvciB0aGUgY3VycmVudCBibG9jay5cbiAqIElOIGFzc2VydGlvbjogdGhlIGZpZWxkIGZyZXEgaXMgc2V0IGZvciBhbGwgdHJlZSBlbGVtZW50cy5cbiAqIE9VVCBhc3NlcnRpb25zOiB0aGUgZmllbGRzIGxlbiBhbmQgY29kZSBhcmUgc2V0IHRvIHRoZSBvcHRpbWFsIGJpdCBsZW5ndGhcbiAqICAgICBhbmQgY29ycmVzcG9uZGluZyBjb2RlLiBUaGUgbGVuZ3RoIG9wdF9sZW4gaXMgdXBkYXRlZDsgc3RhdGljX2xlbiBpc1xuICogICAgIGFsc28gdXBkYXRlZCBpZiBzdHJlZSBpcyBub3QgbnVsbC4gVGhlIGZpZWxkIG1heF9jb2RlIGlzIHNldC5cbiAqL1xuZnVuY3Rpb24gYnVpbGRfdHJlZShzLCBkZXNjKVxuLy8gICAgZGVmbGF0ZV9zdGF0ZSAqcztcbi8vICAgIHRyZWVfZGVzYyAqZGVzYzsgLyogdGhlIHRyZWUgZGVzY3JpcHRvciAqL1xue1xuICB2YXIgdHJlZSAgICAgPSBkZXNjLmR5bl90cmVlO1xuICB2YXIgc3RyZWUgICAgPSBkZXNjLnN0YXRfZGVzYy5zdGF0aWNfdHJlZTtcbiAgdmFyIGhhc19zdHJlZSA9IGRlc2Muc3RhdF9kZXNjLmhhc19zdHJlZTtcbiAgdmFyIGVsZW1zICAgID0gZGVzYy5zdGF0X2Rlc2MuZWxlbXM7XG4gIHZhciBuLCBtOyAgICAgICAgICAvKiBpdGVyYXRlIG92ZXIgaGVhcCBlbGVtZW50cyAqL1xuICB2YXIgbWF4X2NvZGUgPSAtMTsgLyogbGFyZ2VzdCBjb2RlIHdpdGggbm9uIHplcm8gZnJlcXVlbmN5ICovXG4gIHZhciBub2RlOyAgICAgICAgICAvKiBuZXcgbm9kZSBiZWluZyBjcmVhdGVkICovXG5cbiAgLyogQ29uc3RydWN0IHRoZSBpbml0aWFsIGhlYXAsIHdpdGggbGVhc3QgZnJlcXVlbnQgZWxlbWVudCBpblxuICAgKiBoZWFwW1NNQUxMRVNUXS4gVGhlIHNvbnMgb2YgaGVhcFtuXSBhcmUgaGVhcFsyKm5dIGFuZCBoZWFwWzIqbisxXS5cbiAgICogaGVhcFswXSBpcyBub3QgdXNlZC5cbiAgICovXG4gIHMuaGVhcF9sZW4gPSAwO1xuICBzLmhlYXBfbWF4ID0gSEVBUF9TSVpFO1xuXG4gIGZvciAobiA9IDA7IG4gPCBlbGVtczsgbisrKSB7XG4gICAgaWYgKHRyZWVbbiAqIDJdLyouRnJlcSovICE9PSAwKSB7XG4gICAgICBzLmhlYXBbKytzLmhlYXBfbGVuXSA9IG1heF9jb2RlID0gbjtcbiAgICAgIHMuZGVwdGhbbl0gPSAwO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRyZWVbbiAqIDIgKyAxXS8qLkxlbiovID0gMDtcbiAgICB9XG4gIH1cblxuICAvKiBUaGUgcGt6aXAgZm9ybWF0IHJlcXVpcmVzIHRoYXQgYXQgbGVhc3Qgb25lIGRpc3RhbmNlIGNvZGUgZXhpc3RzLFxuICAgKiBhbmQgdGhhdCBhdCBsZWFzdCBvbmUgYml0IHNob3VsZCBiZSBzZW50IGV2ZW4gaWYgdGhlcmUgaXMgb25seSBvbmVcbiAgICogcG9zc2libGUgY29kZS4gU28gdG8gYXZvaWQgc3BlY2lhbCBjaGVja3MgbGF0ZXIgb24gd2UgZm9yY2UgYXQgbGVhc3RcbiAgICogdHdvIGNvZGVzIG9mIG5vbiB6ZXJvIGZyZXF1ZW5jeS5cbiAgICovXG4gIHdoaWxlIChzLmhlYXBfbGVuIDwgMikge1xuICAgIG5vZGUgPSBzLmhlYXBbKytzLmhlYXBfbGVuXSA9IChtYXhfY29kZSA8IDIgPyArK21heF9jb2RlIDogMCk7XG4gICAgdHJlZVtub2RlICogMl0vKi5GcmVxKi8gPSAxO1xuICAgIHMuZGVwdGhbbm9kZV0gPSAwO1xuICAgIHMub3B0X2xlbi0tO1xuXG4gICAgaWYgKGhhc19zdHJlZSkge1xuICAgICAgcy5zdGF0aWNfbGVuIC09IHN0cmVlW25vZGUgKiAyICsgMV0vKi5MZW4qLztcbiAgICB9XG4gICAgLyogbm9kZSBpcyAwIG9yIDEgc28gaXQgZG9lcyBub3QgaGF2ZSBleHRyYSBiaXRzICovXG4gIH1cbiAgZGVzYy5tYXhfY29kZSA9IG1heF9jb2RlO1xuXG4gIC8qIFRoZSBlbGVtZW50cyBoZWFwW2hlYXBfbGVuLzIrMSAuLiBoZWFwX2xlbl0gYXJlIGxlYXZlcyBvZiB0aGUgdHJlZSxcbiAgICogZXN0YWJsaXNoIHN1Yi1oZWFwcyBvZiBpbmNyZWFzaW5nIGxlbmd0aHM6XG4gICAqL1xuICBmb3IgKG4gPSAocy5oZWFwX2xlbiA+PiAxLyppbnQgLzIqLyk7IG4gPj0gMTsgbi0tKSB7IHBxZG93bmhlYXAocywgdHJlZSwgbik7IH1cblxuICAvKiBDb25zdHJ1Y3QgdGhlIEh1ZmZtYW4gdHJlZSBieSByZXBlYXRlZGx5IGNvbWJpbmluZyB0aGUgbGVhc3QgdHdvXG4gICAqIGZyZXF1ZW50IG5vZGVzLlxuICAgKi9cbiAgbm9kZSA9IGVsZW1zOyAgICAgICAgICAgICAgLyogbmV4dCBpbnRlcm5hbCBub2RlIG9mIHRoZSB0cmVlICovXG4gIGRvIHtcbiAgICAvL3BxcmVtb3ZlKHMsIHRyZWUsIG4pOyAgLyogbiA9IG5vZGUgb2YgbGVhc3QgZnJlcXVlbmN5ICovXG4gICAgLyoqKiBwcXJlbW92ZSAqKiovXG4gICAgbiA9IHMuaGVhcFsxLypTTUFMTEVTVCovXTtcbiAgICBzLmhlYXBbMS8qU01BTExFU1QqL10gPSBzLmhlYXBbcy5oZWFwX2xlbi0tXTtcbiAgICBwcWRvd25oZWFwKHMsIHRyZWUsIDEvKlNNQUxMRVNUKi8pO1xuICAgIC8qKiovXG5cbiAgICBtID0gcy5oZWFwWzEvKlNNQUxMRVNUKi9dOyAvKiBtID0gbm9kZSBvZiBuZXh0IGxlYXN0IGZyZXF1ZW5jeSAqL1xuXG4gICAgcy5oZWFwWy0tcy5oZWFwX21heF0gPSBuOyAvKiBrZWVwIHRoZSBub2RlcyBzb3J0ZWQgYnkgZnJlcXVlbmN5ICovXG4gICAgcy5oZWFwWy0tcy5oZWFwX21heF0gPSBtO1xuXG4gICAgLyogQ3JlYXRlIGEgbmV3IG5vZGUgZmF0aGVyIG9mIG4gYW5kIG0gKi9cbiAgICB0cmVlW25vZGUgKiAyXS8qLkZyZXEqLyA9IHRyZWVbbiAqIDJdLyouRnJlcSovICsgdHJlZVttICogMl0vKi5GcmVxKi87XG4gICAgcy5kZXB0aFtub2RlXSA9IChzLmRlcHRoW25dID49IHMuZGVwdGhbbV0gPyBzLmRlcHRoW25dIDogcy5kZXB0aFttXSkgKyAxO1xuICAgIHRyZWVbbiAqIDIgKyAxXS8qLkRhZCovID0gdHJlZVttICogMiArIDFdLyouRGFkKi8gPSBub2RlO1xuXG4gICAgLyogYW5kIGluc2VydCB0aGUgbmV3IG5vZGUgaW4gdGhlIGhlYXAgKi9cbiAgICBzLmhlYXBbMS8qU01BTExFU1QqL10gPSBub2RlKys7XG4gICAgcHFkb3duaGVhcChzLCB0cmVlLCAxLypTTUFMTEVTVCovKTtcblxuICB9IHdoaWxlIChzLmhlYXBfbGVuID49IDIpO1xuXG4gIHMuaGVhcFstLXMuaGVhcF9tYXhdID0gcy5oZWFwWzEvKlNNQUxMRVNUKi9dO1xuXG4gIC8qIEF0IHRoaXMgcG9pbnQsIHRoZSBmaWVsZHMgZnJlcSBhbmQgZGFkIGFyZSBzZXQuIFdlIGNhbiBub3dcbiAgICogZ2VuZXJhdGUgdGhlIGJpdCBsZW5ndGhzLlxuICAgKi9cbiAgZ2VuX2JpdGxlbihzLCBkZXNjKTtcblxuICAvKiBUaGUgZmllbGQgbGVuIGlzIG5vdyBzZXQsIHdlIGNhbiBnZW5lcmF0ZSB0aGUgYml0IGNvZGVzICovXG4gIGdlbl9jb2Rlcyh0cmVlLCBtYXhfY29kZSwgcy5ibF9jb3VudCk7XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBTY2FuIGEgbGl0ZXJhbCBvciBkaXN0YW5jZSB0cmVlIHRvIGRldGVybWluZSB0aGUgZnJlcXVlbmNpZXMgb2YgdGhlIGNvZGVzXG4gKiBpbiB0aGUgYml0IGxlbmd0aCB0cmVlLlxuICovXG5mdW5jdGlvbiBzY2FuX3RyZWUocywgdHJlZSwgbWF4X2NvZGUpXG4vLyAgICBkZWZsYXRlX3N0YXRlICpzO1xuLy8gICAgY3RfZGF0YSAqdHJlZTsgICAvKiB0aGUgdHJlZSB0byBiZSBzY2FubmVkICovXG4vLyAgICBpbnQgbWF4X2NvZGU7ICAgIC8qIGFuZCBpdHMgbGFyZ2VzdCBjb2RlIG9mIG5vbiB6ZXJvIGZyZXF1ZW5jeSAqL1xue1xuICB2YXIgbjsgICAgICAgICAgICAgICAgICAgICAvKiBpdGVyYXRlcyBvdmVyIGFsbCB0cmVlIGVsZW1lbnRzICovXG4gIHZhciBwcmV2bGVuID0gLTE7ICAgICAgICAgIC8qIGxhc3QgZW1pdHRlZCBsZW5ndGggKi9cbiAgdmFyIGN1cmxlbjsgICAgICAgICAgICAgICAgLyogbGVuZ3RoIG9mIGN1cnJlbnQgY29kZSAqL1xuXG4gIHZhciBuZXh0bGVuID0gdHJlZVswICogMiArIDFdLyouTGVuKi87IC8qIGxlbmd0aCBvZiBuZXh0IGNvZGUgKi9cblxuICB2YXIgY291bnQgPSAwOyAgICAgICAgICAgICAvKiByZXBlYXQgY291bnQgb2YgdGhlIGN1cnJlbnQgY29kZSAqL1xuICB2YXIgbWF4X2NvdW50ID0gNzsgICAgICAgICAvKiBtYXggcmVwZWF0IGNvdW50ICovXG4gIHZhciBtaW5fY291bnQgPSA0OyAgICAgICAgIC8qIG1pbiByZXBlYXQgY291bnQgKi9cblxuICBpZiAobmV4dGxlbiA9PT0gMCkge1xuICAgIG1heF9jb3VudCA9IDEzODtcbiAgICBtaW5fY291bnQgPSAzO1xuICB9XG4gIHRyZWVbKG1heF9jb2RlICsgMSkgKiAyICsgMV0vKi5MZW4qLyA9IDB4ZmZmZjsgLyogZ3VhcmQgKi9cblxuICBmb3IgKG4gPSAwOyBuIDw9IG1heF9jb2RlOyBuKyspIHtcbiAgICBjdXJsZW4gPSBuZXh0bGVuO1xuICAgIG5leHRsZW4gPSB0cmVlWyhuICsgMSkgKiAyICsgMV0vKi5MZW4qLztcblxuICAgIGlmICgrK2NvdW50IDwgbWF4X2NvdW50ICYmIGN1cmxlbiA9PT0gbmV4dGxlbikge1xuICAgICAgY29udGludWU7XG5cbiAgICB9IGVsc2UgaWYgKGNvdW50IDwgbWluX2NvdW50KSB7XG4gICAgICBzLmJsX3RyZWVbY3VybGVuICogMl0vKi5GcmVxKi8gKz0gY291bnQ7XG5cbiAgICB9IGVsc2UgaWYgKGN1cmxlbiAhPT0gMCkge1xuXG4gICAgICBpZiAoY3VybGVuICE9PSBwcmV2bGVuKSB7IHMuYmxfdHJlZVtjdXJsZW4gKiAyXS8qLkZyZXEqLysrOyB9XG4gICAgICBzLmJsX3RyZWVbUkVQXzNfNiAqIDJdLyouRnJlcSovKys7XG5cbiAgICB9IGVsc2UgaWYgKGNvdW50IDw9IDEwKSB7XG4gICAgICBzLmJsX3RyZWVbUkVQWl8zXzEwICogMl0vKi5GcmVxKi8rKztcblxuICAgIH0gZWxzZSB7XG4gICAgICBzLmJsX3RyZWVbUkVQWl8xMV8xMzggKiAyXS8qLkZyZXEqLysrO1xuICAgIH1cblxuICAgIGNvdW50ID0gMDtcbiAgICBwcmV2bGVuID0gY3VybGVuO1xuXG4gICAgaWYgKG5leHRsZW4gPT09IDApIHtcbiAgICAgIG1heF9jb3VudCA9IDEzODtcbiAgICAgIG1pbl9jb3VudCA9IDM7XG5cbiAgICB9IGVsc2UgaWYgKGN1cmxlbiA9PT0gbmV4dGxlbikge1xuICAgICAgbWF4X2NvdW50ID0gNjtcbiAgICAgIG1pbl9jb3VudCA9IDM7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgbWF4X2NvdW50ID0gNztcbiAgICAgIG1pbl9jb3VudCA9IDQ7XG4gICAgfVxuICB9XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBTZW5kIGEgbGl0ZXJhbCBvciBkaXN0YW5jZSB0cmVlIGluIGNvbXByZXNzZWQgZm9ybSwgdXNpbmcgdGhlIGNvZGVzIGluXG4gKiBibF90cmVlLlxuICovXG5mdW5jdGlvbiBzZW5kX3RyZWUocywgdHJlZSwgbWF4X2NvZGUpXG4vLyAgICBkZWZsYXRlX3N0YXRlICpzO1xuLy8gICAgY3RfZGF0YSAqdHJlZTsgLyogdGhlIHRyZWUgdG8gYmUgc2Nhbm5lZCAqL1xuLy8gICAgaW50IG1heF9jb2RlOyAgICAgICAvKiBhbmQgaXRzIGxhcmdlc3QgY29kZSBvZiBub24gemVybyBmcmVxdWVuY3kgKi9cbntcbiAgdmFyIG47ICAgICAgICAgICAgICAgICAgICAgLyogaXRlcmF0ZXMgb3ZlciBhbGwgdHJlZSBlbGVtZW50cyAqL1xuICB2YXIgcHJldmxlbiA9IC0xOyAgICAgICAgICAvKiBsYXN0IGVtaXR0ZWQgbGVuZ3RoICovXG4gIHZhciBjdXJsZW47ICAgICAgICAgICAgICAgIC8qIGxlbmd0aCBvZiBjdXJyZW50IGNvZGUgKi9cblxuICB2YXIgbmV4dGxlbiA9IHRyZWVbMCAqIDIgKyAxXS8qLkxlbiovOyAvKiBsZW5ndGggb2YgbmV4dCBjb2RlICovXG5cbiAgdmFyIGNvdW50ID0gMDsgICAgICAgICAgICAgLyogcmVwZWF0IGNvdW50IG9mIHRoZSBjdXJyZW50IGNvZGUgKi9cbiAgdmFyIG1heF9jb3VudCA9IDc7ICAgICAgICAgLyogbWF4IHJlcGVhdCBjb3VudCAqL1xuICB2YXIgbWluX2NvdW50ID0gNDsgICAgICAgICAvKiBtaW4gcmVwZWF0IGNvdW50ICovXG5cbiAgLyogdHJlZVttYXhfY29kZSsxXS5MZW4gPSAtMTsgKi8gIC8qIGd1YXJkIGFscmVhZHkgc2V0ICovXG4gIGlmIChuZXh0bGVuID09PSAwKSB7XG4gICAgbWF4X2NvdW50ID0gMTM4O1xuICAgIG1pbl9jb3VudCA9IDM7XG4gIH1cblxuICBmb3IgKG4gPSAwOyBuIDw9IG1heF9jb2RlOyBuKyspIHtcbiAgICBjdXJsZW4gPSBuZXh0bGVuO1xuICAgIG5leHRsZW4gPSB0cmVlWyhuICsgMSkgKiAyICsgMV0vKi5MZW4qLztcblxuICAgIGlmICgrK2NvdW50IDwgbWF4X2NvdW50ICYmIGN1cmxlbiA9PT0gbmV4dGxlbikge1xuICAgICAgY29udGludWU7XG5cbiAgICB9IGVsc2UgaWYgKGNvdW50IDwgbWluX2NvdW50KSB7XG4gICAgICBkbyB7IHNlbmRfY29kZShzLCBjdXJsZW4sIHMuYmxfdHJlZSk7IH0gd2hpbGUgKC0tY291bnQgIT09IDApO1xuXG4gICAgfSBlbHNlIGlmIChjdXJsZW4gIT09IDApIHtcbiAgICAgIGlmIChjdXJsZW4gIT09IHByZXZsZW4pIHtcbiAgICAgICAgc2VuZF9jb2RlKHMsIGN1cmxlbiwgcy5ibF90cmVlKTtcbiAgICAgICAgY291bnQtLTtcbiAgICAgIH1cbiAgICAgIC8vQXNzZXJ0KGNvdW50ID49IDMgJiYgY291bnQgPD0gNiwgXCIgM182P1wiKTtcbiAgICAgIHNlbmRfY29kZShzLCBSRVBfM182LCBzLmJsX3RyZWUpO1xuICAgICAgc2VuZF9iaXRzKHMsIGNvdW50IC0gMywgMik7XG5cbiAgICB9IGVsc2UgaWYgKGNvdW50IDw9IDEwKSB7XG4gICAgICBzZW5kX2NvZGUocywgUkVQWl8zXzEwLCBzLmJsX3RyZWUpO1xuICAgICAgc2VuZF9iaXRzKHMsIGNvdW50IC0gMywgMyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgc2VuZF9jb2RlKHMsIFJFUFpfMTFfMTM4LCBzLmJsX3RyZWUpO1xuICAgICAgc2VuZF9iaXRzKHMsIGNvdW50IC0gMTEsIDcpO1xuICAgIH1cblxuICAgIGNvdW50ID0gMDtcbiAgICBwcmV2bGVuID0gY3VybGVuO1xuICAgIGlmIChuZXh0bGVuID09PSAwKSB7XG4gICAgICBtYXhfY291bnQgPSAxMzg7XG4gICAgICBtaW5fY291bnQgPSAzO1xuXG4gICAgfSBlbHNlIGlmIChjdXJsZW4gPT09IG5leHRsZW4pIHtcbiAgICAgIG1heF9jb3VudCA9IDY7XG4gICAgICBtaW5fY291bnQgPSAzO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIG1heF9jb3VudCA9IDc7XG4gICAgICBtaW5fY291bnQgPSA0O1xuICAgIH1cbiAgfVxufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29uc3RydWN0IHRoZSBIdWZmbWFuIHRyZWUgZm9yIHRoZSBiaXQgbGVuZ3RocyBhbmQgcmV0dXJuIHRoZSBpbmRleCBpblxuICogYmxfb3JkZXIgb2YgdGhlIGxhc3QgYml0IGxlbmd0aCBjb2RlIHRvIHNlbmQuXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkX2JsX3RyZWUocykge1xuICB2YXIgbWF4X2JsaW5kZXg7ICAvKiBpbmRleCBvZiBsYXN0IGJpdCBsZW5ndGggY29kZSBvZiBub24gemVybyBmcmVxICovXG5cbiAgLyogRGV0ZXJtaW5lIHRoZSBiaXQgbGVuZ3RoIGZyZXF1ZW5jaWVzIGZvciBsaXRlcmFsIGFuZCBkaXN0YW5jZSB0cmVlcyAqL1xuICBzY2FuX3RyZWUocywgcy5keW5fbHRyZWUsIHMubF9kZXNjLm1heF9jb2RlKTtcbiAgc2Nhbl90cmVlKHMsIHMuZHluX2R0cmVlLCBzLmRfZGVzYy5tYXhfY29kZSk7XG5cbiAgLyogQnVpbGQgdGhlIGJpdCBsZW5ndGggdHJlZTogKi9cbiAgYnVpbGRfdHJlZShzLCBzLmJsX2Rlc2MpO1xuICAvKiBvcHRfbGVuIG5vdyBpbmNsdWRlcyB0aGUgbGVuZ3RoIG9mIHRoZSB0cmVlIHJlcHJlc2VudGF0aW9ucywgZXhjZXB0XG4gICAqIHRoZSBsZW5ndGhzIG9mIHRoZSBiaXQgbGVuZ3RocyBjb2RlcyBhbmQgdGhlIDUrNSs0IGJpdHMgZm9yIHRoZSBjb3VudHMuXG4gICAqL1xuXG4gIC8qIERldGVybWluZSB0aGUgbnVtYmVyIG9mIGJpdCBsZW5ndGggY29kZXMgdG8gc2VuZC4gVGhlIHBremlwIGZvcm1hdFxuICAgKiByZXF1aXJlcyB0aGF0IGF0IGxlYXN0IDQgYml0IGxlbmd0aCBjb2RlcyBiZSBzZW50LiAoYXBwbm90ZS50eHQgc2F5c1xuICAgKiAzIGJ1dCB0aGUgYWN0dWFsIHZhbHVlIHVzZWQgaXMgNC4pXG4gICAqL1xuICBmb3IgKG1heF9ibGluZGV4ID0gQkxfQ09ERVMgLSAxOyBtYXhfYmxpbmRleCA+PSAzOyBtYXhfYmxpbmRleC0tKSB7XG4gICAgaWYgKHMuYmxfdHJlZVtibF9vcmRlclttYXhfYmxpbmRleF0gKiAyICsgMV0vKi5MZW4qLyAhPT0gMCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIC8qIFVwZGF0ZSBvcHRfbGVuIHRvIGluY2x1ZGUgdGhlIGJpdCBsZW5ndGggdHJlZSBhbmQgY291bnRzICovXG4gIHMub3B0X2xlbiArPSAzICogKG1heF9ibGluZGV4ICsgMSkgKyA1ICsgNSArIDQ7XG4gIC8vVHJhY2V2KChzdGRlcnIsIFwiXFxuZHluIHRyZWVzOiBkeW4gJWxkLCBzdGF0ICVsZFwiLFxuICAvLyAgICAgICAgcy0+b3B0X2xlbiwgcy0+c3RhdGljX2xlbikpO1xuXG4gIHJldHVybiBtYXhfYmxpbmRleDtcbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFNlbmQgdGhlIGhlYWRlciBmb3IgYSBibG9jayB1c2luZyBkeW5hbWljIEh1ZmZtYW4gdHJlZXM6IHRoZSBjb3VudHMsIHRoZVxuICogbGVuZ3RocyBvZiB0aGUgYml0IGxlbmd0aCBjb2RlcywgdGhlIGxpdGVyYWwgdHJlZSBhbmQgdGhlIGRpc3RhbmNlIHRyZWUuXG4gKiBJTiBhc3NlcnRpb246IGxjb2RlcyA+PSAyNTcsIGRjb2RlcyA+PSAxLCBibGNvZGVzID49IDQuXG4gKi9cbmZ1bmN0aW9uIHNlbmRfYWxsX3RyZWVzKHMsIGxjb2RlcywgZGNvZGVzLCBibGNvZGVzKVxuLy8gICAgZGVmbGF0ZV9zdGF0ZSAqcztcbi8vICAgIGludCBsY29kZXMsIGRjb2RlcywgYmxjb2RlczsgLyogbnVtYmVyIG9mIGNvZGVzIGZvciBlYWNoIHRyZWUgKi9cbntcbiAgdmFyIHJhbms7ICAgICAgICAgICAgICAgICAgICAvKiBpbmRleCBpbiBibF9vcmRlciAqL1xuXG4gIC8vQXNzZXJ0IChsY29kZXMgPj0gMjU3ICYmIGRjb2RlcyA+PSAxICYmIGJsY29kZXMgPj0gNCwgXCJub3QgZW5vdWdoIGNvZGVzXCIpO1xuICAvL0Fzc2VydCAobGNvZGVzIDw9IExfQ09ERVMgJiYgZGNvZGVzIDw9IERfQ09ERVMgJiYgYmxjb2RlcyA8PSBCTF9DT0RFUyxcbiAgLy8gICAgICAgIFwidG9vIG1hbnkgY29kZXNcIik7XG4gIC8vVHJhY2V2KChzdGRlcnIsIFwiXFxuYmwgY291bnRzOiBcIikpO1xuICBzZW5kX2JpdHMocywgbGNvZGVzIC0gMjU3LCA1KTsgLyogbm90ICsyNTUgYXMgc3RhdGVkIGluIGFwcG5vdGUudHh0ICovXG4gIHNlbmRfYml0cyhzLCBkY29kZXMgLSAxLCAgIDUpO1xuICBzZW5kX2JpdHMocywgYmxjb2RlcyAtIDQsICA0KTsgLyogbm90IC0zIGFzIHN0YXRlZCBpbiBhcHBub3RlLnR4dCAqL1xuICBmb3IgKHJhbmsgPSAwOyByYW5rIDwgYmxjb2RlczsgcmFuaysrKSB7XG4gICAgLy9UcmFjZXYoKHN0ZGVyciwgXCJcXG5ibCBjb2RlICUyZCBcIiwgYmxfb3JkZXJbcmFua10pKTtcbiAgICBzZW5kX2JpdHMocywgcy5ibF90cmVlW2JsX29yZGVyW3JhbmtdICogMiArIDFdLyouTGVuKi8sIDMpO1xuICB9XG4gIC8vVHJhY2V2KChzdGRlcnIsIFwiXFxuYmwgdHJlZTogc2VudCAlbGRcIiwgcy0+Yml0c19zZW50KSk7XG5cbiAgc2VuZF90cmVlKHMsIHMuZHluX2x0cmVlLCBsY29kZXMgLSAxKTsgLyogbGl0ZXJhbCB0cmVlICovXG4gIC8vVHJhY2V2KChzdGRlcnIsIFwiXFxubGl0IHRyZWU6IHNlbnQgJWxkXCIsIHMtPmJpdHNfc2VudCkpO1xuXG4gIHNlbmRfdHJlZShzLCBzLmR5bl9kdHJlZSwgZGNvZGVzIC0gMSk7IC8qIGRpc3RhbmNlIHRyZWUgKi9cbiAgLy9UcmFjZXYoKHN0ZGVyciwgXCJcXG5kaXN0IHRyZWU6IHNlbnQgJWxkXCIsIHMtPmJpdHNfc2VudCkpO1xufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ2hlY2sgaWYgdGhlIGRhdGEgdHlwZSBpcyBURVhUIG9yIEJJTkFSWSwgdXNpbmcgdGhlIGZvbGxvd2luZyBhbGdvcml0aG06XG4gKiAtIFRFWFQgaWYgdGhlIHR3byBjb25kaXRpb25zIGJlbG93IGFyZSBzYXRpc2ZpZWQ6XG4gKiAgICBhKSBUaGVyZSBhcmUgbm8gbm9uLXBvcnRhYmxlIGNvbnRyb2wgY2hhcmFjdGVycyBiZWxvbmdpbmcgdG8gdGhlXG4gKiAgICAgICBcImJsYWNrIGxpc3RcIiAoMC4uNiwgMTQuLjI1LCAyOC4uMzEpLlxuICogICAgYikgVGhlcmUgaXMgYXQgbGVhc3Qgb25lIHByaW50YWJsZSBjaGFyYWN0ZXIgYmVsb25naW5nIHRvIHRoZVxuICogICAgICAgXCJ3aGl0ZSBsaXN0XCIgKDkge1RBQn0sIDEwIHtMRn0sIDEzIHtDUn0sIDMyLi4yNTUpLlxuICogLSBCSU5BUlkgb3RoZXJ3aXNlLlxuICogLSBUaGUgZm9sbG93aW5nIHBhcnRpYWxseS1wb3J0YWJsZSBjb250cm9sIGNoYXJhY3RlcnMgZm9ybSBhXG4gKiAgIFwiZ3JheSBsaXN0XCIgdGhhdCBpcyBpZ25vcmVkIGluIHRoaXMgZGV0ZWN0aW9uIGFsZ29yaXRobTpcbiAqICAgKDcge0JFTH0sIDgge0JTfSwgMTEge1ZUfSwgMTIge0ZGfSwgMjYge1NVQn0sIDI3IHtFU0N9KS5cbiAqIElOIGFzc2VydGlvbjogdGhlIGZpZWxkcyBGcmVxIG9mIGR5bl9sdHJlZSBhcmUgc2V0LlxuICovXG5mdW5jdGlvbiBkZXRlY3RfZGF0YV90eXBlKHMpIHtcbiAgLyogYmxhY2tfbWFzayBpcyB0aGUgYml0IG1hc2sgb2YgYmxhY2stbGlzdGVkIGJ5dGVzXG4gICAqIHNldCBiaXRzIDAuLjYsIDE0Li4yNSwgYW5kIDI4Li4zMVxuICAgKiAweGYzZmZjMDdmID0gYmluYXJ5IDExMTEwMDExMTExMTExMTExMTAwMDAwMDAxMTExMTExXG4gICAqL1xuICB2YXIgYmxhY2tfbWFzayA9IDB4ZjNmZmMwN2Y7XG4gIHZhciBuO1xuXG4gIC8qIENoZWNrIGZvciBub24tdGV4dHVhbCAoXCJibGFjay1saXN0ZWRcIikgYnl0ZXMuICovXG4gIGZvciAobiA9IDA7IG4gPD0gMzE7IG4rKywgYmxhY2tfbWFzayA+Pj49IDEpIHtcbiAgICBpZiAoKGJsYWNrX21hc2sgJiAxKSAmJiAocy5keW5fbHRyZWVbbiAqIDJdLyouRnJlcSovICE9PSAwKSkge1xuICAgICAgcmV0dXJuIFpfQklOQVJZO1xuICAgIH1cbiAgfVxuXG4gIC8qIENoZWNrIGZvciB0ZXh0dWFsIChcIndoaXRlLWxpc3RlZFwiKSBieXRlcy4gKi9cbiAgaWYgKHMuZHluX2x0cmVlWzkgKiAyXS8qLkZyZXEqLyAhPT0gMCB8fCBzLmR5bl9sdHJlZVsxMCAqIDJdLyouRnJlcSovICE9PSAwIHx8XG4gICAgICBzLmR5bl9sdHJlZVsxMyAqIDJdLyouRnJlcSovICE9PSAwKSB7XG4gICAgcmV0dXJuIFpfVEVYVDtcbiAgfVxuICBmb3IgKG4gPSAzMjsgbiA8IExJVEVSQUxTOyBuKyspIHtcbiAgICBpZiAocy5keW5fbHRyZWVbbiAqIDJdLyouRnJlcSovICE9PSAwKSB7XG4gICAgICByZXR1cm4gWl9URVhUO1xuICAgIH1cbiAgfVxuXG4gIC8qIFRoZXJlIGFyZSBubyBcImJsYWNrLWxpc3RlZFwiIG9yIFwid2hpdGUtbGlzdGVkXCIgYnl0ZXM6XG4gICAqIHRoaXMgc3RyZWFtIGVpdGhlciBpcyBlbXB0eSBvciBoYXMgdG9sZXJhdGVkIChcImdyYXktbGlzdGVkXCIpIGJ5dGVzIG9ubHkuXG4gICAqL1xuICByZXR1cm4gWl9CSU5BUlk7XG59XG5cblxudmFyIHN0YXRpY19pbml0X2RvbmUgPSBmYWxzZTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBJbml0aWFsaXplIHRoZSB0cmVlIGRhdGEgc3RydWN0dXJlcyBmb3IgYSBuZXcgemxpYiBzdHJlYW0uXG4gKi9cbmZ1bmN0aW9uIF90cl9pbml0KHMpXG57XG5cbiAgaWYgKCFzdGF0aWNfaW5pdF9kb25lKSB7XG4gICAgdHJfc3RhdGljX2luaXQoKTtcbiAgICBzdGF0aWNfaW5pdF9kb25lID0gdHJ1ZTtcbiAgfVxuXG4gIHMubF9kZXNjICA9IG5ldyBUcmVlRGVzYyhzLmR5bl9sdHJlZSwgc3RhdGljX2xfZGVzYyk7XG4gIHMuZF9kZXNjICA9IG5ldyBUcmVlRGVzYyhzLmR5bl9kdHJlZSwgc3RhdGljX2RfZGVzYyk7XG4gIHMuYmxfZGVzYyA9IG5ldyBUcmVlRGVzYyhzLmJsX3RyZWUsIHN0YXRpY19ibF9kZXNjKTtcblxuICBzLmJpX2J1ZiA9IDA7XG4gIHMuYmlfdmFsaWQgPSAwO1xuXG4gIC8qIEluaXRpYWxpemUgdGhlIGZpcnN0IGJsb2NrIG9mIHRoZSBmaXJzdCBmaWxlOiAqL1xuICBpbml0X2Jsb2NrKHMpO1xufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogU2VuZCBhIHN0b3JlZCBibG9ja1xuICovXG5mdW5jdGlvbiBfdHJfc3RvcmVkX2Jsb2NrKHMsIGJ1Ziwgc3RvcmVkX2xlbiwgbGFzdClcbi8vRGVmbGF0ZVN0YXRlICpzO1xuLy9jaGFyZiAqYnVmOyAgICAgICAvKiBpbnB1dCBibG9jayAqL1xuLy91bGcgc3RvcmVkX2xlbjsgICAvKiBsZW5ndGggb2YgaW5wdXQgYmxvY2sgKi9cbi8vaW50IGxhc3Q7ICAgICAgICAgLyogb25lIGlmIHRoaXMgaXMgdGhlIGxhc3QgYmxvY2sgZm9yIGEgZmlsZSAqL1xue1xuICBzZW5kX2JpdHMocywgKFNUT1JFRF9CTE9DSyA8PCAxKSArIChsYXN0ID8gMSA6IDApLCAzKTsgICAgLyogc2VuZCBibG9jayB0eXBlICovXG4gIGNvcHlfYmxvY2socywgYnVmLCBzdG9yZWRfbGVuLCB0cnVlKTsgLyogd2l0aCBoZWFkZXIgKi9cbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFNlbmQgb25lIGVtcHR5IHN0YXRpYyBibG9jayB0byBnaXZlIGVub3VnaCBsb29rYWhlYWQgZm9yIGluZmxhdGUuXG4gKiBUaGlzIHRha2VzIDEwIGJpdHMsIG9mIHdoaWNoIDcgbWF5IHJlbWFpbiBpbiB0aGUgYml0IGJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gX3RyX2FsaWduKHMpIHtcbiAgc2VuZF9iaXRzKHMsIFNUQVRJQ19UUkVFUyA8PCAxLCAzKTtcbiAgc2VuZF9jb2RlKHMsIEVORF9CTE9DSywgc3RhdGljX2x0cmVlKTtcbiAgYmlfZmx1c2gocyk7XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBEZXRlcm1pbmUgdGhlIGJlc3QgZW5jb2RpbmcgZm9yIHRoZSBjdXJyZW50IGJsb2NrOiBkeW5hbWljIHRyZWVzLCBzdGF0aWNcbiAqIHRyZWVzIG9yIHN0b3JlLCBhbmQgb3V0cHV0IHRoZSBlbmNvZGVkIGJsb2NrIHRvIHRoZSB6aXAgZmlsZS5cbiAqL1xuZnVuY3Rpb24gX3RyX2ZsdXNoX2Jsb2NrKHMsIGJ1Ziwgc3RvcmVkX2xlbiwgbGFzdClcbi8vRGVmbGF0ZVN0YXRlICpzO1xuLy9jaGFyZiAqYnVmOyAgICAgICAvKiBpbnB1dCBibG9jaywgb3IgTlVMTCBpZiB0b28gb2xkICovXG4vL3VsZyBzdG9yZWRfbGVuOyAgIC8qIGxlbmd0aCBvZiBpbnB1dCBibG9jayAqL1xuLy9pbnQgbGFzdDsgICAgICAgICAvKiBvbmUgaWYgdGhpcyBpcyB0aGUgbGFzdCBibG9jayBmb3IgYSBmaWxlICovXG57XG4gIHZhciBvcHRfbGVuYiwgc3RhdGljX2xlbmI7ICAvKiBvcHRfbGVuIGFuZCBzdGF0aWNfbGVuIGluIGJ5dGVzICovXG4gIHZhciBtYXhfYmxpbmRleCA9IDA7ICAgICAgICAvKiBpbmRleCBvZiBsYXN0IGJpdCBsZW5ndGggY29kZSBvZiBub24gemVybyBmcmVxICovXG5cbiAgLyogQnVpbGQgdGhlIEh1ZmZtYW4gdHJlZXMgdW5sZXNzIGEgc3RvcmVkIGJsb2NrIGlzIGZvcmNlZCAqL1xuICBpZiAocy5sZXZlbCA+IDApIHtcblxuICAgIC8qIENoZWNrIGlmIHRoZSBmaWxlIGlzIGJpbmFyeSBvciB0ZXh0ICovXG4gICAgaWYgKHMuc3RybS5kYXRhX3R5cGUgPT09IFpfVU5LTk9XTikge1xuICAgICAgcy5zdHJtLmRhdGFfdHlwZSA9IGRldGVjdF9kYXRhX3R5cGUocyk7XG4gICAgfVxuXG4gICAgLyogQ29uc3RydWN0IHRoZSBsaXRlcmFsIGFuZCBkaXN0YW5jZSB0cmVlcyAqL1xuICAgIGJ1aWxkX3RyZWUocywgcy5sX2Rlc2MpO1xuICAgIC8vIFRyYWNldigoc3RkZXJyLCBcIlxcbmxpdCBkYXRhOiBkeW4gJWxkLCBzdGF0ICVsZFwiLCBzLT5vcHRfbGVuLFxuICAgIC8vICAgICAgICBzLT5zdGF0aWNfbGVuKSk7XG5cbiAgICBidWlsZF90cmVlKHMsIHMuZF9kZXNjKTtcbiAgICAvLyBUcmFjZXYoKHN0ZGVyciwgXCJcXG5kaXN0IGRhdGE6IGR5biAlbGQsIHN0YXQgJWxkXCIsIHMtPm9wdF9sZW4sXG4gICAgLy8gICAgICAgIHMtPnN0YXRpY19sZW4pKTtcbiAgICAvKiBBdCB0aGlzIHBvaW50LCBvcHRfbGVuIGFuZCBzdGF0aWNfbGVuIGFyZSB0aGUgdG90YWwgYml0IGxlbmd0aHMgb2ZcbiAgICAgKiB0aGUgY29tcHJlc3NlZCBibG9jayBkYXRhLCBleGNsdWRpbmcgdGhlIHRyZWUgcmVwcmVzZW50YXRpb25zLlxuICAgICAqL1xuXG4gICAgLyogQnVpbGQgdGhlIGJpdCBsZW5ndGggdHJlZSBmb3IgdGhlIGFib3ZlIHR3byB0cmVlcywgYW5kIGdldCB0aGUgaW5kZXhcbiAgICAgKiBpbiBibF9vcmRlciBvZiB0aGUgbGFzdCBiaXQgbGVuZ3RoIGNvZGUgdG8gc2VuZC5cbiAgICAgKi9cbiAgICBtYXhfYmxpbmRleCA9IGJ1aWxkX2JsX3RyZWUocyk7XG5cbiAgICAvKiBEZXRlcm1pbmUgdGhlIGJlc3QgZW5jb2RpbmcuIENvbXB1dGUgdGhlIGJsb2NrIGxlbmd0aHMgaW4gYnl0ZXMuICovXG4gICAgb3B0X2xlbmIgPSAocy5vcHRfbGVuICsgMyArIDcpID4+PiAzO1xuICAgIHN0YXRpY19sZW5iID0gKHMuc3RhdGljX2xlbiArIDMgKyA3KSA+Pj4gMztcblxuICAgIC8vIFRyYWNldigoc3RkZXJyLCBcIlxcbm9wdCAlbHUoJWx1KSBzdGF0ICVsdSglbHUpIHN0b3JlZCAlbHUgbGl0ICV1IFwiLFxuICAgIC8vICAgICAgICBvcHRfbGVuYiwgcy0+b3B0X2xlbiwgc3RhdGljX2xlbmIsIHMtPnN0YXRpY19sZW4sIHN0b3JlZF9sZW4sXG4gICAgLy8gICAgICAgIHMtPmxhc3RfbGl0KSk7XG5cbiAgICBpZiAoc3RhdGljX2xlbmIgPD0gb3B0X2xlbmIpIHsgb3B0X2xlbmIgPSBzdGF0aWNfbGVuYjsgfVxuXG4gIH0gZWxzZSB7XG4gICAgLy8gQXNzZXJ0KGJ1ZiAhPSAoY2hhciopMCwgXCJsb3N0IGJ1ZlwiKTtcbiAgICBvcHRfbGVuYiA9IHN0YXRpY19sZW5iID0gc3RvcmVkX2xlbiArIDU7IC8qIGZvcmNlIGEgc3RvcmVkIGJsb2NrICovXG4gIH1cblxuICBpZiAoKHN0b3JlZF9sZW4gKyA0IDw9IG9wdF9sZW5iKSAmJiAoYnVmICE9PSAtMSkpIHtcbiAgICAvKiA0OiB0d28gd29yZHMgZm9yIHRoZSBsZW5ndGhzICovXG5cbiAgICAvKiBUaGUgdGVzdCBidWYgIT0gTlVMTCBpcyBvbmx5IG5lY2Vzc2FyeSBpZiBMSVRfQlVGU0laRSA+IFdTSVpFLlxuICAgICAqIE90aGVyd2lzZSB3ZSBjYW4ndCBoYXZlIHByb2Nlc3NlZCBtb3JlIHRoYW4gV1NJWkUgaW5wdXQgYnl0ZXMgc2luY2VcbiAgICAgKiB0aGUgbGFzdCBibG9jayBmbHVzaCwgYmVjYXVzZSBjb21wcmVzc2lvbiB3b3VsZCBoYXZlIGJlZW5cbiAgICAgKiBzdWNjZXNzZnVsLiBJZiBMSVRfQlVGU0laRSA8PSBXU0laRSwgaXQgaXMgbmV2ZXIgdG9vIGxhdGUgdG9cbiAgICAgKiB0cmFuc2Zvcm0gYSBibG9jayBpbnRvIGEgc3RvcmVkIGJsb2NrLlxuICAgICAqL1xuICAgIF90cl9zdG9yZWRfYmxvY2socywgYnVmLCBzdG9yZWRfbGVuLCBsYXN0KTtcblxuICB9IGVsc2UgaWYgKHMuc3RyYXRlZ3kgPT09IFpfRklYRUQgfHwgc3RhdGljX2xlbmIgPT09IG9wdF9sZW5iKSB7XG5cbiAgICBzZW5kX2JpdHMocywgKFNUQVRJQ19UUkVFUyA8PCAxKSArIChsYXN0ID8gMSA6IDApLCAzKTtcbiAgICBjb21wcmVzc19ibG9jayhzLCBzdGF0aWNfbHRyZWUsIHN0YXRpY19kdHJlZSk7XG5cbiAgfSBlbHNlIHtcbiAgICBzZW5kX2JpdHMocywgKERZTl9UUkVFUyA8PCAxKSArIChsYXN0ID8gMSA6IDApLCAzKTtcbiAgICBzZW5kX2FsbF90cmVlcyhzLCBzLmxfZGVzYy5tYXhfY29kZSArIDEsIHMuZF9kZXNjLm1heF9jb2RlICsgMSwgbWF4X2JsaW5kZXggKyAxKTtcbiAgICBjb21wcmVzc19ibG9jayhzLCBzLmR5bl9sdHJlZSwgcy5keW5fZHRyZWUpO1xuICB9XG4gIC8vIEFzc2VydCAocy0+Y29tcHJlc3NlZF9sZW4gPT0gcy0+Yml0c19zZW50LCBcImJhZCBjb21wcmVzc2VkIHNpemVcIik7XG4gIC8qIFRoZSBhYm92ZSBjaGVjayBpcyBtYWRlIG1vZCAyXjMyLCBmb3IgZmlsZXMgbGFyZ2VyIHRoYW4gNTEyIE1CXG4gICAqIGFuZCB1TG9uZyBpbXBsZW1lbnRlZCBvbiAzMiBiaXRzLlxuICAgKi9cbiAgaW5pdF9ibG9jayhzKTtcblxuICBpZiAobGFzdCkge1xuICAgIGJpX3dpbmR1cChzKTtcbiAgfVxuICAvLyBUcmFjZXYoKHN0ZGVycixcIlxcbmNvbXBybGVuICVsdSglbHUpIFwiLCBzLT5jb21wcmVzc2VkX2xlbj4+MyxcbiAgLy8gICAgICAgcy0+Y29tcHJlc3NlZF9sZW4tNypsYXN0KSk7XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogU2F2ZSB0aGUgbWF0Y2ggaW5mbyBhbmQgdGFsbHkgdGhlIGZyZXF1ZW5jeSBjb3VudHMuIFJldHVybiB0cnVlIGlmXG4gKiB0aGUgY3VycmVudCBibG9jayBtdXN0IGJlIGZsdXNoZWQuXG4gKi9cbmZ1bmN0aW9uIF90cl90YWxseShzLCBkaXN0LCBsYylcbi8vICAgIGRlZmxhdGVfc3RhdGUgKnM7XG4vLyAgICB1bnNpZ25lZCBkaXN0OyAgLyogZGlzdGFuY2Ugb2YgbWF0Y2hlZCBzdHJpbmcgKi9cbi8vICAgIHVuc2lnbmVkIGxjOyAgICAvKiBtYXRjaCBsZW5ndGgtTUlOX01BVENIIG9yIHVubWF0Y2hlZCBjaGFyIChpZiBkaXN0PT0wKSAqL1xue1xuICAvL3ZhciBvdXRfbGVuZ3RoLCBpbl9sZW5ndGgsIGRjb2RlO1xuXG4gIHMucGVuZGluZ19idWZbcy5kX2J1ZiArIHMubGFzdF9saXQgKiAyXSAgICAgPSAoZGlzdCA+Pj4gOCkgJiAweGZmO1xuICBzLnBlbmRpbmdfYnVmW3MuZF9idWYgKyBzLmxhc3RfbGl0ICogMiArIDFdID0gZGlzdCAmIDB4ZmY7XG5cbiAgcy5wZW5kaW5nX2J1ZltzLmxfYnVmICsgcy5sYXN0X2xpdF0gPSBsYyAmIDB4ZmY7XG4gIHMubGFzdF9saXQrKztcblxuICBpZiAoZGlzdCA9PT0gMCkge1xuICAgIC8qIGxjIGlzIHRoZSB1bm1hdGNoZWQgY2hhciAqL1xuICAgIHMuZHluX2x0cmVlW2xjICogMl0vKi5GcmVxKi8rKztcbiAgfSBlbHNlIHtcbiAgICBzLm1hdGNoZXMrKztcbiAgICAvKiBIZXJlLCBsYyBpcyB0aGUgbWF0Y2ggbGVuZ3RoIC0gTUlOX01BVENIICovXG4gICAgZGlzdC0tOyAgICAgICAgICAgICAvKiBkaXN0ID0gbWF0Y2ggZGlzdGFuY2UgLSAxICovXG4gICAgLy9Bc3NlcnQoKHVzaClkaXN0IDwgKHVzaClNQVhfRElTVChzKSAmJlxuICAgIC8vICAgICAgICh1c2gpbGMgPD0gKHVzaCkoTUFYX01BVENILU1JTl9NQVRDSCkgJiZcbiAgICAvLyAgICAgICAodXNoKWRfY29kZShkaXN0KSA8ICh1c2gpRF9DT0RFUywgIFwiX3RyX3RhbGx5OiBiYWQgbWF0Y2hcIik7XG5cbiAgICBzLmR5bl9sdHJlZVsoX2xlbmd0aF9jb2RlW2xjXSArIExJVEVSQUxTICsgMSkgKiAyXS8qLkZyZXEqLysrO1xuICAgIHMuZHluX2R0cmVlW2RfY29kZShkaXN0KSAqIDJdLyouRnJlcSovKys7XG4gIH1cblxuLy8gKCEpIFRoaXMgYmxvY2sgaXMgZGlzYWJsZWQgaW4gemxpYiBkZWZhdWx0cyxcbi8vIGRvbid0IGVuYWJsZSBpdCBmb3IgYmluYXJ5IGNvbXBhdGliaWxpdHlcblxuLy8jaWZkZWYgVFJVTkNBVEVfQkxPQ0tcbi8vICAvKiBUcnkgdG8gZ3Vlc3MgaWYgaXQgaXMgcHJvZml0YWJsZSB0byBzdG9wIHRoZSBjdXJyZW50IGJsb2NrIGhlcmUgKi9cbi8vICBpZiAoKHMubGFzdF9saXQgJiAweDFmZmYpID09PSAwICYmIHMubGV2ZWwgPiAyKSB7XG4vLyAgICAvKiBDb21wdXRlIGFuIHVwcGVyIGJvdW5kIGZvciB0aGUgY29tcHJlc3NlZCBsZW5ndGggKi9cbi8vICAgIG91dF9sZW5ndGggPSBzLmxhc3RfbGl0Kjg7XG4vLyAgICBpbl9sZW5ndGggPSBzLnN0cnN0YXJ0IC0gcy5ibG9ja19zdGFydDtcbi8vXG4vLyAgICBmb3IgKGRjb2RlID0gMDsgZGNvZGUgPCBEX0NPREVTOyBkY29kZSsrKSB7XG4vLyAgICAgIG91dF9sZW5ndGggKz0gcy5keW5fZHRyZWVbZGNvZGUqMl0vKi5GcmVxKi8gKiAoNSArIGV4dHJhX2RiaXRzW2Rjb2RlXSk7XG4vLyAgICB9XG4vLyAgICBvdXRfbGVuZ3RoID4+Pj0gMztcbi8vICAgIC8vVHJhY2V2KChzdGRlcnIsXCJcXG5sYXN0X2xpdCAldSwgaW4gJWxkLCBvdXQgfiVsZCglbGQlJSkgXCIsXG4vLyAgICAvLyAgICAgICBzLT5sYXN0X2xpdCwgaW5fbGVuZ3RoLCBvdXRfbGVuZ3RoLFxuLy8gICAgLy8gICAgICAgMTAwTCAtIG91dF9sZW5ndGgqMTAwTC9pbl9sZW5ndGgpKTtcbi8vICAgIGlmIChzLm1hdGNoZXMgPCAocy5sYXN0X2xpdD4+MSkvKmludCAvMiovICYmIG91dF9sZW5ndGggPCAoaW5fbGVuZ3RoPj4xKS8qaW50IC8yKi8pIHtcbi8vICAgICAgcmV0dXJuIHRydWU7XG4vLyAgICB9XG4vLyAgfVxuLy8jZW5kaWZcblxuICByZXR1cm4gKHMubGFzdF9saXQgPT09IHMubGl0X2J1ZnNpemUgLSAxKTtcbiAgLyogV2UgYXZvaWQgZXF1YWxpdHkgd2l0aCBsaXRfYnVmc2l6ZSBiZWNhdXNlIG9mIHdyYXBhcm91bmQgYXQgNjRLXG4gICAqIG9uIDE2IGJpdCBtYWNoaW5lcyBhbmQgYmVjYXVzZSBzdG9yZWQgYmxvY2tzIGFyZSByZXN0cmljdGVkIHRvXG4gICAqIDY0Sy0xIGJ5dGVzLlxuICAgKi9cbn1cblxuZXhwb3J0cy5fdHJfaW5pdCAgPSBfdHJfaW5pdDtcbmV4cG9ydHMuX3RyX3N0b3JlZF9ibG9jayA9IF90cl9zdG9yZWRfYmxvY2s7XG5leHBvcnRzLl90cl9mbHVzaF9ibG9jayAgPSBfdHJfZmx1c2hfYmxvY2s7XG5leHBvcnRzLl90cl90YWxseSA9IF90cl90YWxseTtcbmV4cG9ydHMuX3RyX2FsaWduID0gX3RyX2FsaWduO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLy8gTm90ZTogYWRsZXIzMiB0YWtlcyAxMiUgZm9yIGxldmVsIDAgYW5kIDIlIGZvciBsZXZlbCA2LlxuLy8gSXQgaXNuJ3Qgd29ydGggaXQgdG8gbWFrZSBhZGRpdGlvbmFsIG9wdGltaXphdGlvbnMgYXMgaW4gb3JpZ2luYWwuXG4vLyBTbWFsbCBzaXplIGlzIHByZWZlcmFibGUuXG5cbi8vIChDKSAxOTk1LTIwMTMgSmVhbi1sb3VwIEdhaWxseSBhbmQgTWFyayBBZGxlclxuLy8gKEMpIDIwMTQtMjAxNyBWaXRhbHkgUHV6cmluIGFuZCBBbmRyZXkgVHVwaXRzaW5cbi8vXG4vLyBUaGlzIHNvZnR3YXJlIGlzIHByb3ZpZGVkICdhcy1pcycsIHdpdGhvdXQgYW55IGV4cHJlc3Mgb3IgaW1wbGllZFxuLy8gd2FycmFudHkuIEluIG5vIGV2ZW50IHdpbGwgdGhlIGF1dGhvcnMgYmUgaGVsZCBsaWFibGUgZm9yIGFueSBkYW1hZ2VzXG4vLyBhcmlzaW5nIGZyb20gdGhlIHVzZSBvZiB0aGlzIHNvZnR3YXJlLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byBhbnlvbmUgdG8gdXNlIHRoaXMgc29mdHdhcmUgZm9yIGFueSBwdXJwb3NlLFxuLy8gaW5jbHVkaW5nIGNvbW1lcmNpYWwgYXBwbGljYXRpb25zLCBhbmQgdG8gYWx0ZXIgaXQgYW5kIHJlZGlzdHJpYnV0ZSBpdFxuLy8gZnJlZWx5LCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgcmVzdHJpY3Rpb25zOlxuLy9cbi8vIDEuIFRoZSBvcmlnaW4gb2YgdGhpcyBzb2Z0d2FyZSBtdXN0IG5vdCBiZSBtaXNyZXByZXNlbnRlZDsgeW91IG11c3Qgbm90XG4vLyAgIGNsYWltIHRoYXQgeW91IHdyb3RlIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS4gSWYgeW91IHVzZSB0aGlzIHNvZnR3YXJlXG4vLyAgIGluIGEgcHJvZHVjdCwgYW4gYWNrbm93bGVkZ21lbnQgaW4gdGhlIHByb2R1Y3QgZG9jdW1lbnRhdGlvbiB3b3VsZCBiZVxuLy8gICBhcHByZWNpYXRlZCBidXQgaXMgbm90IHJlcXVpcmVkLlxuLy8gMi4gQWx0ZXJlZCBzb3VyY2UgdmVyc2lvbnMgbXVzdCBiZSBwbGFpbmx5IG1hcmtlZCBhcyBzdWNoLCBhbmQgbXVzdCBub3QgYmVcbi8vICAgbWlzcmVwcmVzZW50ZWQgYXMgYmVpbmcgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLlxuLy8gMy4gVGhpcyBub3RpY2UgbWF5IG5vdCBiZSByZW1vdmVkIG9yIGFsdGVyZWQgZnJvbSBhbnkgc291cmNlIGRpc3RyaWJ1dGlvbi5cblxuZnVuY3Rpb24gYWRsZXIzMihhZGxlciwgYnVmLCBsZW4sIHBvcykge1xuICB2YXIgczEgPSAoYWRsZXIgJiAweGZmZmYpIHwwLFxuICAgICAgczIgPSAoKGFkbGVyID4+PiAxNikgJiAweGZmZmYpIHwwLFxuICAgICAgbiA9IDA7XG5cbiAgd2hpbGUgKGxlbiAhPT0gMCkge1xuICAgIC8vIFNldCBsaW1pdCB+IHR3aWNlIGxlc3MgdGhhbiA1NTUyLCB0byBrZWVwXG4gICAgLy8gczIgaW4gMzEtYml0cywgYmVjYXVzZSB3ZSBmb3JjZSBzaWduZWQgaW50cy5cbiAgICAvLyBpbiBvdGhlciBjYXNlICU9IHdpbGwgZmFpbC5cbiAgICBuID0gbGVuID4gMjAwMCA/IDIwMDAgOiBsZW47XG4gICAgbGVuIC09IG47XG5cbiAgICBkbyB7XG4gICAgICBzMSA9IChzMSArIGJ1Zltwb3MrK10pIHwwO1xuICAgICAgczIgPSAoczIgKyBzMSkgfDA7XG4gICAgfSB3aGlsZSAoLS1uKTtcblxuICAgIHMxICU9IDY1NTIxO1xuICAgIHMyICU9IDY1NTIxO1xuICB9XG5cbiAgcmV0dXJuIChzMSB8IChzMiA8PCAxNikpIHwwO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gYWRsZXIzMjtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8vIE5vdGU6IHdlIGNhbid0IGdldCBzaWduaWZpY2FudCBzcGVlZCBib29zdCBoZXJlLlxuLy8gU28gd3JpdGUgY29kZSB0byBtaW5pbWl6ZSBzaXplIC0gbm8gcHJlZ2VuZXJhdGVkIHRhYmxlc1xuLy8gYW5kIGFycmF5IHRvb2xzIGRlcGVuZGVuY2llcy5cblxuLy8gKEMpIDE5OTUtMjAxMyBKZWFuLWxvdXAgR2FpbGx5IGFuZCBNYXJrIEFkbGVyXG4vLyAoQykgMjAxNC0yMDE3IFZpdGFseSBQdXpyaW4gYW5kIEFuZHJleSBUdXBpdHNpblxuLy9cbi8vIFRoaXMgc29mdHdhcmUgaXMgcHJvdmlkZWQgJ2FzLWlzJywgd2l0aG91dCBhbnkgZXhwcmVzcyBvciBpbXBsaWVkXG4vLyB3YXJyYW50eS4gSW4gbm8gZXZlbnQgd2lsbCB0aGUgYXV0aG9ycyBiZSBoZWxkIGxpYWJsZSBmb3IgYW55IGRhbWFnZXNcbi8vIGFyaXNpbmcgZnJvbSB0aGUgdXNlIG9mIHRoaXMgc29mdHdhcmUuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIGFueW9uZSB0byB1c2UgdGhpcyBzb2Z0d2FyZSBmb3IgYW55IHB1cnBvc2UsXG4vLyBpbmNsdWRpbmcgY29tbWVyY2lhbCBhcHBsaWNhdGlvbnMsIGFuZCB0byBhbHRlciBpdCBhbmQgcmVkaXN0cmlidXRlIGl0XG4vLyBmcmVlbHksIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyByZXN0cmljdGlvbnM6XG4vL1xuLy8gMS4gVGhlIG9yaWdpbiBvZiB0aGlzIHNvZnR3YXJlIG11c3Qgbm90IGJlIG1pc3JlcHJlc2VudGVkOyB5b3UgbXVzdCBub3Rcbi8vICAgY2xhaW0gdGhhdCB5b3Ugd3JvdGUgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLiBJZiB5b3UgdXNlIHRoaXMgc29mdHdhcmVcbi8vICAgaW4gYSBwcm9kdWN0LCBhbiBhY2tub3dsZWRnbWVudCBpbiB0aGUgcHJvZHVjdCBkb2N1bWVudGF0aW9uIHdvdWxkIGJlXG4vLyAgIGFwcHJlY2lhdGVkIGJ1dCBpcyBub3QgcmVxdWlyZWQuXG4vLyAyLiBBbHRlcmVkIHNvdXJjZSB2ZXJzaW9ucyBtdXN0IGJlIHBsYWlubHkgbWFya2VkIGFzIHN1Y2gsIGFuZCBtdXN0IG5vdCBiZVxuLy8gICBtaXNyZXByZXNlbnRlZCBhcyBiZWluZyB0aGUgb3JpZ2luYWwgc29mdHdhcmUuXG4vLyAzLiBUaGlzIG5vdGljZSBtYXkgbm90IGJlIHJlbW92ZWQgb3IgYWx0ZXJlZCBmcm9tIGFueSBzb3VyY2UgZGlzdHJpYnV0aW9uLlxuXG4vLyBVc2Ugb3JkaW5hcnkgYXJyYXksIHNpbmNlIHVudHlwZWQgbWFrZXMgbm8gYm9vc3QgaGVyZVxuZnVuY3Rpb24gbWFrZVRhYmxlKCkge1xuICB2YXIgYywgdGFibGUgPSBbXTtcblxuICBmb3IgKHZhciBuID0gMDsgbiA8IDI1NjsgbisrKSB7XG4gICAgYyA9IG47XG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCA4OyBrKyspIHtcbiAgICAgIGMgPSAoKGMgJiAxKSA/ICgweEVEQjg4MzIwIF4gKGMgPj4+IDEpKSA6IChjID4+PiAxKSk7XG4gICAgfVxuICAgIHRhYmxlW25dID0gYztcbiAgfVxuXG4gIHJldHVybiB0YWJsZTtcbn1cblxuLy8gQ3JlYXRlIHRhYmxlIG9uIGxvYWQuIEp1c3QgMjU1IHNpZ25lZCBsb25ncy4gTm90IGEgcHJvYmxlbS5cbnZhciBjcmNUYWJsZSA9IG1ha2VUYWJsZSgpO1xuXG5cbmZ1bmN0aW9uIGNyYzMyKGNyYywgYnVmLCBsZW4sIHBvcykge1xuICB2YXIgdCA9IGNyY1RhYmxlLFxuICAgICAgZW5kID0gcG9zICsgbGVuO1xuXG4gIGNyYyBePSAtMTtcblxuICBmb3IgKHZhciBpID0gcG9zOyBpIDwgZW5kOyBpKyspIHtcbiAgICBjcmMgPSAoY3JjID4+PiA4KSBeIHRbKGNyYyBeIGJ1ZltpXSkgJiAweEZGXTtcbiAgfVxuXG4gIHJldHVybiAoY3JjIF4gKC0xKSk7IC8vID4+PiAwO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gY3JjMzI7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vLyAoQykgMTk5NS0yMDEzIEplYW4tbG91cCBHYWlsbHkgYW5kIE1hcmsgQWRsZXJcbi8vIChDKSAyMDE0LTIwMTcgVml0YWx5IFB1enJpbiBhbmQgQW5kcmV5IFR1cGl0c2luXG4vL1xuLy8gVGhpcyBzb2Z0d2FyZSBpcyBwcm92aWRlZCAnYXMtaXMnLCB3aXRob3V0IGFueSBleHByZXNzIG9yIGltcGxpZWRcbi8vIHdhcnJhbnR5LiBJbiBubyBldmVudCB3aWxsIHRoZSBhdXRob3JzIGJlIGhlbGQgbGlhYmxlIGZvciBhbnkgZGFtYWdlc1xuLy8gYXJpc2luZyBmcm9tIHRoZSB1c2Ugb2YgdGhpcyBzb2Z0d2FyZS5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gYW55b25lIHRvIHVzZSB0aGlzIHNvZnR3YXJlIGZvciBhbnkgcHVycG9zZSxcbi8vIGluY2x1ZGluZyBjb21tZXJjaWFsIGFwcGxpY2F0aW9ucywgYW5kIHRvIGFsdGVyIGl0IGFuZCByZWRpc3RyaWJ1dGUgaXRcbi8vIGZyZWVseSwgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIHJlc3RyaWN0aW9uczpcbi8vXG4vLyAxLiBUaGUgb3JpZ2luIG9mIHRoaXMgc29mdHdhcmUgbXVzdCBub3QgYmUgbWlzcmVwcmVzZW50ZWQ7IHlvdSBtdXN0IG5vdFxuLy8gICBjbGFpbSB0aGF0IHlvdSB3cm90ZSB0aGUgb3JpZ2luYWwgc29mdHdhcmUuIElmIHlvdSB1c2UgdGhpcyBzb2Z0d2FyZVxuLy8gICBpbiBhIHByb2R1Y3QsIGFuIGFja25vd2xlZGdtZW50IGluIHRoZSBwcm9kdWN0IGRvY3VtZW50YXRpb24gd291bGQgYmVcbi8vICAgYXBwcmVjaWF0ZWQgYnV0IGlzIG5vdCByZXF1aXJlZC5cbi8vIDIuIEFsdGVyZWQgc291cmNlIHZlcnNpb25zIG11c3QgYmUgcGxhaW5seSBtYXJrZWQgYXMgc3VjaCwgYW5kIG11c3Qgbm90IGJlXG4vLyAgIG1pc3JlcHJlc2VudGVkIGFzIGJlaW5nIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS5cbi8vIDMuIFRoaXMgbm90aWNlIG1heSBub3QgYmUgcmVtb3ZlZCBvciBhbHRlcmVkIGZyb20gYW55IHNvdXJjZSBkaXN0cmlidXRpb24uXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAyOiAgICAgICduZWVkIGRpY3Rpb25hcnknLCAgICAgLyogWl9ORUVEX0RJQ1QgICAgICAgMiAgKi9cbiAgMTogICAgICAnc3RyZWFtIGVuZCcsICAgICAgICAgIC8qIFpfU1RSRUFNX0VORCAgICAgIDEgICovXG4gIDA6ICAgICAgJycsICAgICAgICAgICAgICAgICAgICAvKiBaX09LICAgICAgICAgICAgICAwICAqL1xuICAnLTEnOiAgICdmaWxlIGVycm9yJywgICAgICAgICAgLyogWl9FUlJOTyAgICAgICAgICgtMSkgKi9cbiAgJy0yJzogICAnc3RyZWFtIGVycm9yJywgICAgICAgIC8qIFpfU1RSRUFNX0VSUk9SICAoLTIpICovXG4gICctMyc6ICAgJ2RhdGEgZXJyb3InLCAgICAgICAgICAvKiBaX0RBVEFfRVJST1IgICAgKC0zKSAqL1xuICAnLTQnOiAgICdpbnN1ZmZpY2llbnQgbWVtb3J5JywgLyogWl9NRU1fRVJST1IgICAgICgtNCkgKi9cbiAgJy01JzogICAnYnVmZmVyIGVycm9yJywgICAgICAgIC8qIFpfQlVGX0VSUk9SICAgICAoLTUpICovXG4gICctNic6ICAgJ2luY29tcGF0aWJsZSB2ZXJzaW9uJyAvKiBaX1ZFUlNJT05fRVJST1IgKC02KSAqL1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8vIChDKSAxOTk1LTIwMTMgSmVhbi1sb3VwIEdhaWxseSBhbmQgTWFyayBBZGxlclxuLy8gKEMpIDIwMTQtMjAxNyBWaXRhbHkgUHV6cmluIGFuZCBBbmRyZXkgVHVwaXRzaW5cbi8vXG4vLyBUaGlzIHNvZnR3YXJlIGlzIHByb3ZpZGVkICdhcy1pcycsIHdpdGhvdXQgYW55IGV4cHJlc3Mgb3IgaW1wbGllZFxuLy8gd2FycmFudHkuIEluIG5vIGV2ZW50IHdpbGwgdGhlIGF1dGhvcnMgYmUgaGVsZCBsaWFibGUgZm9yIGFueSBkYW1hZ2VzXG4vLyBhcmlzaW5nIGZyb20gdGhlIHVzZSBvZiB0aGlzIHNvZnR3YXJlLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byBhbnlvbmUgdG8gdXNlIHRoaXMgc29mdHdhcmUgZm9yIGFueSBwdXJwb3NlLFxuLy8gaW5jbHVkaW5nIGNvbW1lcmNpYWwgYXBwbGljYXRpb25zLCBhbmQgdG8gYWx0ZXIgaXQgYW5kIHJlZGlzdHJpYnV0ZSBpdFxuLy8gZnJlZWx5LCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgcmVzdHJpY3Rpb25zOlxuLy9cbi8vIDEuIFRoZSBvcmlnaW4gb2YgdGhpcyBzb2Z0d2FyZSBtdXN0IG5vdCBiZSBtaXNyZXByZXNlbnRlZDsgeW91IG11c3Qgbm90XG4vLyAgIGNsYWltIHRoYXQgeW91IHdyb3RlIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS4gSWYgeW91IHVzZSB0aGlzIHNvZnR3YXJlXG4vLyAgIGluIGEgcHJvZHVjdCwgYW4gYWNrbm93bGVkZ21lbnQgaW4gdGhlIHByb2R1Y3QgZG9jdW1lbnRhdGlvbiB3b3VsZCBiZVxuLy8gICBhcHByZWNpYXRlZCBidXQgaXMgbm90IHJlcXVpcmVkLlxuLy8gMi4gQWx0ZXJlZCBzb3VyY2UgdmVyc2lvbnMgbXVzdCBiZSBwbGFpbmx5IG1hcmtlZCBhcyBzdWNoLCBhbmQgbXVzdCBub3QgYmVcbi8vICAgbWlzcmVwcmVzZW50ZWQgYXMgYmVpbmcgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLlxuLy8gMy4gVGhpcyBub3RpY2UgbWF5IG5vdCBiZSByZW1vdmVkIG9yIGFsdGVyZWQgZnJvbSBhbnkgc291cmNlIGRpc3RyaWJ1dGlvbi5cblxudmFyIHV0aWxzICAgPSByZXF1aXJlKCcuLi91dGlscy9jb21tb24nKTtcbnZhciB0cmVlcyAgID0gcmVxdWlyZSgnLi90cmVlcycpO1xudmFyIGFkbGVyMzIgPSByZXF1aXJlKCcuL2FkbGVyMzInKTtcbnZhciBjcmMzMiAgID0gcmVxdWlyZSgnLi9jcmMzMicpO1xudmFyIG1zZyAgICAgPSByZXF1aXJlKCcuL21lc3NhZ2VzJyk7XG5cbi8qIFB1YmxpYyBjb25zdGFudHMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG5cbi8qIEFsbG93ZWQgZmx1c2ggdmFsdWVzOyBzZWUgZGVmbGF0ZSgpIGFuZCBpbmZsYXRlKCkgYmVsb3cgZm9yIGRldGFpbHMgKi9cbnZhciBaX05PX0ZMVVNIICAgICAgPSAwO1xudmFyIFpfUEFSVElBTF9GTFVTSCA9IDE7XG4vL3ZhciBaX1NZTkNfRkxVU0ggICAgPSAyO1xudmFyIFpfRlVMTF9GTFVTSCAgICA9IDM7XG52YXIgWl9GSU5JU0ggICAgICAgID0gNDtcbnZhciBaX0JMT0NLICAgICAgICAgPSA1O1xuLy92YXIgWl9UUkVFUyAgICAgICAgID0gNjtcblxuXG4vKiBSZXR1cm4gY29kZXMgZm9yIHRoZSBjb21wcmVzc2lvbi9kZWNvbXByZXNzaW9uIGZ1bmN0aW9ucy4gTmVnYXRpdmUgdmFsdWVzXG4gKiBhcmUgZXJyb3JzLCBwb3NpdGl2ZSB2YWx1ZXMgYXJlIHVzZWQgZm9yIHNwZWNpYWwgYnV0IG5vcm1hbCBldmVudHMuXG4gKi9cbnZhciBaX09LICAgICAgICAgICAgPSAwO1xudmFyIFpfU1RSRUFNX0VORCAgICA9IDE7XG4vL3ZhciBaX05FRURfRElDVCAgICAgPSAyO1xuLy92YXIgWl9FUlJOTyAgICAgICAgID0gLTE7XG52YXIgWl9TVFJFQU1fRVJST1IgID0gLTI7XG52YXIgWl9EQVRBX0VSUk9SICAgID0gLTM7XG4vL3ZhciBaX01FTV9FUlJPUiAgICAgPSAtNDtcbnZhciBaX0JVRl9FUlJPUiAgICAgPSAtNTtcbi8vdmFyIFpfVkVSU0lPTl9FUlJPUiA9IC02O1xuXG5cbi8qIGNvbXByZXNzaW9uIGxldmVscyAqL1xuLy92YXIgWl9OT19DT01QUkVTU0lPTiAgICAgID0gMDtcbi8vdmFyIFpfQkVTVF9TUEVFRCAgICAgICAgICA9IDE7XG4vL3ZhciBaX0JFU1RfQ09NUFJFU1NJT04gICAgPSA5O1xudmFyIFpfREVGQVVMVF9DT01QUkVTU0lPTiA9IC0xO1xuXG5cbnZhciBaX0ZJTFRFUkVEICAgICAgICAgICAgPSAxO1xudmFyIFpfSFVGRk1BTl9PTkxZICAgICAgICA9IDI7XG52YXIgWl9STEUgICAgICAgICAgICAgICAgID0gMztcbnZhciBaX0ZJWEVEICAgICAgICAgICAgICAgPSA0O1xudmFyIFpfREVGQVVMVF9TVFJBVEVHWSAgICA9IDA7XG5cbi8qIFBvc3NpYmxlIHZhbHVlcyBvZiB0aGUgZGF0YV90eXBlIGZpZWxkICh0aG91Z2ggc2VlIGluZmxhdGUoKSkgKi9cbi8vdmFyIFpfQklOQVJZICAgICAgICAgICAgICA9IDA7XG4vL3ZhciBaX1RFWFQgICAgICAgICAgICAgICAgPSAxO1xuLy92YXIgWl9BU0NJSSAgICAgICAgICAgICAgID0gMTsgLy8gPSBaX1RFWFRcbnZhciBaX1VOS05PV04gICAgICAgICAgICAgPSAyO1xuXG5cbi8qIFRoZSBkZWZsYXRlIGNvbXByZXNzaW9uIG1ldGhvZCAqL1xudmFyIFpfREVGTEFURUQgID0gODtcblxuLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cblxuXG52YXIgTUFYX01FTV9MRVZFTCA9IDk7XG4vKiBNYXhpbXVtIHZhbHVlIGZvciBtZW1MZXZlbCBpbiBkZWZsYXRlSW5pdDIgKi9cbnZhciBNQVhfV0JJVFMgPSAxNTtcbi8qIDMySyBMWjc3IHdpbmRvdyAqL1xudmFyIERFRl9NRU1fTEVWRUwgPSA4O1xuXG5cbnZhciBMRU5HVEhfQ09ERVMgID0gMjk7XG4vKiBudW1iZXIgb2YgbGVuZ3RoIGNvZGVzLCBub3QgY291bnRpbmcgdGhlIHNwZWNpYWwgRU5EX0JMT0NLIGNvZGUgKi9cbnZhciBMSVRFUkFMUyAgICAgID0gMjU2O1xuLyogbnVtYmVyIG9mIGxpdGVyYWwgYnl0ZXMgMC4uMjU1ICovXG52YXIgTF9DT0RFUyAgICAgICA9IExJVEVSQUxTICsgMSArIExFTkdUSF9DT0RFUztcbi8qIG51bWJlciBvZiBMaXRlcmFsIG9yIExlbmd0aCBjb2RlcywgaW5jbHVkaW5nIHRoZSBFTkRfQkxPQ0sgY29kZSAqL1xudmFyIERfQ09ERVMgICAgICAgPSAzMDtcbi8qIG51bWJlciBvZiBkaXN0YW5jZSBjb2RlcyAqL1xudmFyIEJMX0NPREVTICAgICAgPSAxOTtcbi8qIG51bWJlciBvZiBjb2RlcyB1c2VkIHRvIHRyYW5zZmVyIHRoZSBiaXQgbGVuZ3RocyAqL1xudmFyIEhFQVBfU0laRSAgICAgPSAyICogTF9DT0RFUyArIDE7XG4vKiBtYXhpbXVtIGhlYXAgc2l6ZSAqL1xudmFyIE1BWF9CSVRTICA9IDE1O1xuLyogQWxsIGNvZGVzIG11c3Qgbm90IGV4Y2VlZCBNQVhfQklUUyBiaXRzICovXG5cbnZhciBNSU5fTUFUQ0ggPSAzO1xudmFyIE1BWF9NQVRDSCA9IDI1ODtcbnZhciBNSU5fTE9PS0FIRUFEID0gKE1BWF9NQVRDSCArIE1JTl9NQVRDSCArIDEpO1xuXG52YXIgUFJFU0VUX0RJQ1QgPSAweDIwO1xuXG52YXIgSU5JVF9TVEFURSA9IDQyO1xudmFyIEVYVFJBX1NUQVRFID0gNjk7XG52YXIgTkFNRV9TVEFURSA9IDczO1xudmFyIENPTU1FTlRfU1RBVEUgPSA5MTtcbnZhciBIQ1JDX1NUQVRFID0gMTAzO1xudmFyIEJVU1lfU1RBVEUgPSAxMTM7XG52YXIgRklOSVNIX1NUQVRFID0gNjY2O1xuXG52YXIgQlNfTkVFRF9NT1JFICAgICAgPSAxOyAvKiBibG9jayBub3QgY29tcGxldGVkLCBuZWVkIG1vcmUgaW5wdXQgb3IgbW9yZSBvdXRwdXQgKi9cbnZhciBCU19CTE9DS19ET05FICAgICA9IDI7IC8qIGJsb2NrIGZsdXNoIHBlcmZvcm1lZCAqL1xudmFyIEJTX0ZJTklTSF9TVEFSVEVEID0gMzsgLyogZmluaXNoIHN0YXJ0ZWQsIG5lZWQgb25seSBtb3JlIG91dHB1dCBhdCBuZXh0IGRlZmxhdGUgKi9cbnZhciBCU19GSU5JU0hfRE9ORSAgICA9IDQ7IC8qIGZpbmlzaCBkb25lLCBhY2NlcHQgbm8gbW9yZSBpbnB1dCBvciBvdXRwdXQgKi9cblxudmFyIE9TX0NPREUgPSAweDAzOyAvLyBVbml4IDopIC4gRG9uJ3QgZGV0ZWN0LCB1c2UgdGhpcyBkZWZhdWx0LlxuXG5mdW5jdGlvbiBlcnIoc3RybSwgZXJyb3JDb2RlKSB7XG4gIHN0cm0ubXNnID0gbXNnW2Vycm9yQ29kZV07XG4gIHJldHVybiBlcnJvckNvZGU7XG59XG5cbmZ1bmN0aW9uIHJhbmsoZikge1xuICByZXR1cm4gKChmKSA8PCAxKSAtICgoZikgPiA0ID8gOSA6IDApO1xufVxuXG5mdW5jdGlvbiB6ZXJvKGJ1ZikgeyB2YXIgbGVuID0gYnVmLmxlbmd0aDsgd2hpbGUgKC0tbGVuID49IDApIHsgYnVmW2xlbl0gPSAwOyB9IH1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBGbHVzaCBhcyBtdWNoIHBlbmRpbmcgb3V0cHV0IGFzIHBvc3NpYmxlLiBBbGwgZGVmbGF0ZSgpIG91dHB1dCBnb2VzXG4gKiB0aHJvdWdoIHRoaXMgZnVuY3Rpb24gc28gc29tZSBhcHBsaWNhdGlvbnMgbWF5IHdpc2ggdG8gbW9kaWZ5IGl0XG4gKiB0byBhdm9pZCBhbGxvY2F0aW5nIGEgbGFyZ2Ugc3RybS0+b3V0cHV0IGJ1ZmZlciBhbmQgY29weWluZyBpbnRvIGl0LlxuICogKFNlZSBhbHNvIHJlYWRfYnVmKCkpLlxuICovXG5mdW5jdGlvbiBmbHVzaF9wZW5kaW5nKHN0cm0pIHtcbiAgdmFyIHMgPSBzdHJtLnN0YXRlO1xuXG4gIC8vX3RyX2ZsdXNoX2JpdHMocyk7XG4gIHZhciBsZW4gPSBzLnBlbmRpbmc7XG4gIGlmIChsZW4gPiBzdHJtLmF2YWlsX291dCkge1xuICAgIGxlbiA9IHN0cm0uYXZhaWxfb3V0O1xuICB9XG4gIGlmIChsZW4gPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgdXRpbHMuYXJyYXlTZXQoc3RybS5vdXRwdXQsIHMucGVuZGluZ19idWYsIHMucGVuZGluZ19vdXQsIGxlbiwgc3RybS5uZXh0X291dCk7XG4gIHN0cm0ubmV4dF9vdXQgKz0gbGVuO1xuICBzLnBlbmRpbmdfb3V0ICs9IGxlbjtcbiAgc3RybS50b3RhbF9vdXQgKz0gbGVuO1xuICBzdHJtLmF2YWlsX291dCAtPSBsZW47XG4gIHMucGVuZGluZyAtPSBsZW47XG4gIGlmIChzLnBlbmRpbmcgPT09IDApIHtcbiAgICBzLnBlbmRpbmdfb3V0ID0gMDtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGZsdXNoX2Jsb2NrX29ubHkocywgbGFzdCkge1xuICB0cmVlcy5fdHJfZmx1c2hfYmxvY2socywgKHMuYmxvY2tfc3RhcnQgPj0gMCA/IHMuYmxvY2tfc3RhcnQgOiAtMSksIHMuc3Ryc3RhcnQgLSBzLmJsb2NrX3N0YXJ0LCBsYXN0KTtcbiAgcy5ibG9ja19zdGFydCA9IHMuc3Ryc3RhcnQ7XG4gIGZsdXNoX3BlbmRpbmcocy5zdHJtKTtcbn1cblxuXG5mdW5jdGlvbiBwdXRfYnl0ZShzLCBiKSB7XG4gIHMucGVuZGluZ19idWZbcy5wZW5kaW5nKytdID0gYjtcbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBQdXQgYSBzaG9ydCBpbiB0aGUgcGVuZGluZyBidWZmZXIuIFRoZSAxNi1iaXQgdmFsdWUgaXMgcHV0IGluIE1TQiBvcmRlci5cbiAqIElOIGFzc2VydGlvbjogdGhlIHN0cmVhbSBzdGF0ZSBpcyBjb3JyZWN0IGFuZCB0aGVyZSBpcyBlbm91Z2ggcm9vbSBpblxuICogcGVuZGluZ19idWYuXG4gKi9cbmZ1bmN0aW9uIHB1dFNob3J0TVNCKHMsIGIpIHtcbi8vICBwdXRfYnl0ZShzLCAoQnl0ZSkoYiA+PiA4KSk7XG4vLyAgcHV0X2J5dGUocywgKEJ5dGUpKGIgJiAweGZmKSk7XG4gIHMucGVuZGluZ19idWZbcy5wZW5kaW5nKytdID0gKGIgPj4+IDgpICYgMHhmZjtcbiAgcy5wZW5kaW5nX2J1ZltzLnBlbmRpbmcrK10gPSBiICYgMHhmZjtcbn1cblxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFJlYWQgYSBuZXcgYnVmZmVyIGZyb20gdGhlIGN1cnJlbnQgaW5wdXQgc3RyZWFtLCB1cGRhdGUgdGhlIGFkbGVyMzJcbiAqIGFuZCB0b3RhbCBudW1iZXIgb2YgYnl0ZXMgcmVhZC4gIEFsbCBkZWZsYXRlKCkgaW5wdXQgZ29lcyB0aHJvdWdoXG4gKiB0aGlzIGZ1bmN0aW9uIHNvIHNvbWUgYXBwbGljYXRpb25zIG1heSB3aXNoIHRvIG1vZGlmeSBpdCB0byBhdm9pZFxuICogYWxsb2NhdGluZyBhIGxhcmdlIHN0cm0tPmlucHV0IGJ1ZmZlciBhbmQgY29weWluZyBmcm9tIGl0LlxuICogKFNlZSBhbHNvIGZsdXNoX3BlbmRpbmcoKSkuXG4gKi9cbmZ1bmN0aW9uIHJlYWRfYnVmKHN0cm0sIGJ1Ziwgc3RhcnQsIHNpemUpIHtcbiAgdmFyIGxlbiA9IHN0cm0uYXZhaWxfaW47XG5cbiAgaWYgKGxlbiA+IHNpemUpIHsgbGVuID0gc2l6ZTsgfVxuICBpZiAobGVuID09PSAwKSB7IHJldHVybiAwOyB9XG5cbiAgc3RybS5hdmFpbF9pbiAtPSBsZW47XG5cbiAgLy8gem1lbWNweShidWYsIHN0cm0tPm5leHRfaW4sIGxlbik7XG4gIHV0aWxzLmFycmF5U2V0KGJ1Ziwgc3RybS5pbnB1dCwgc3RybS5uZXh0X2luLCBsZW4sIHN0YXJ0KTtcbiAgaWYgKHN0cm0uc3RhdGUud3JhcCA9PT0gMSkge1xuICAgIHN0cm0uYWRsZXIgPSBhZGxlcjMyKHN0cm0uYWRsZXIsIGJ1ZiwgbGVuLCBzdGFydCk7XG4gIH1cblxuICBlbHNlIGlmIChzdHJtLnN0YXRlLndyYXAgPT09IDIpIHtcbiAgICBzdHJtLmFkbGVyID0gY3JjMzIoc3RybS5hZGxlciwgYnVmLCBsZW4sIHN0YXJ0KTtcbiAgfVxuXG4gIHN0cm0ubmV4dF9pbiArPSBsZW47XG4gIHN0cm0udG90YWxfaW4gKz0gbGVuO1xuXG4gIHJldHVybiBsZW47XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBTZXQgbWF0Y2hfc3RhcnQgdG8gdGhlIGxvbmdlc3QgbWF0Y2ggc3RhcnRpbmcgYXQgdGhlIGdpdmVuIHN0cmluZyBhbmRcbiAqIHJldHVybiBpdHMgbGVuZ3RoLiBNYXRjaGVzIHNob3J0ZXIgb3IgZXF1YWwgdG8gcHJldl9sZW5ndGggYXJlIGRpc2NhcmRlZCxcbiAqIGluIHdoaWNoIGNhc2UgdGhlIHJlc3VsdCBpcyBlcXVhbCB0byBwcmV2X2xlbmd0aCBhbmQgbWF0Y2hfc3RhcnQgaXNcbiAqIGdhcmJhZ2UuXG4gKiBJTiBhc3NlcnRpb25zOiBjdXJfbWF0Y2ggaXMgdGhlIGhlYWQgb2YgdGhlIGhhc2ggY2hhaW4gZm9yIHRoZSBjdXJyZW50XG4gKiAgIHN0cmluZyAoc3Ryc3RhcnQpIGFuZCBpdHMgZGlzdGFuY2UgaXMgPD0gTUFYX0RJU1QsIGFuZCBwcmV2X2xlbmd0aCA+PSAxXG4gKiBPVVQgYXNzZXJ0aW9uOiB0aGUgbWF0Y2ggbGVuZ3RoIGlzIG5vdCBncmVhdGVyIHRoYW4gcy0+bG9va2FoZWFkLlxuICovXG5mdW5jdGlvbiBsb25nZXN0X21hdGNoKHMsIGN1cl9tYXRjaCkge1xuICB2YXIgY2hhaW5fbGVuZ3RoID0gcy5tYXhfY2hhaW5fbGVuZ3RoOyAgICAgIC8qIG1heCBoYXNoIGNoYWluIGxlbmd0aCAqL1xuICB2YXIgc2NhbiA9IHMuc3Ryc3RhcnQ7IC8qIGN1cnJlbnQgc3RyaW5nICovXG4gIHZhciBtYXRjaDsgICAgICAgICAgICAgICAgICAgICAgIC8qIG1hdGNoZWQgc3RyaW5nICovXG4gIHZhciBsZW47ICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogbGVuZ3RoIG9mIGN1cnJlbnQgbWF0Y2ggKi9cbiAgdmFyIGJlc3RfbGVuID0gcy5wcmV2X2xlbmd0aDsgICAgICAgICAgICAgIC8qIGJlc3QgbWF0Y2ggbGVuZ3RoIHNvIGZhciAqL1xuICB2YXIgbmljZV9tYXRjaCA9IHMubmljZV9tYXRjaDsgICAgICAgICAgICAgLyogc3RvcCBpZiBtYXRjaCBsb25nIGVub3VnaCAqL1xuICB2YXIgbGltaXQgPSAocy5zdHJzdGFydCA+IChzLndfc2l6ZSAtIE1JTl9MT09LQUhFQUQpKSA/XG4gICAgICBzLnN0cnN0YXJ0IC0gKHMud19zaXplIC0gTUlOX0xPT0tBSEVBRCkgOiAwLypOSUwqLztcblxuICB2YXIgX3dpbiA9IHMud2luZG93OyAvLyBzaG9ydGN1dFxuXG4gIHZhciB3bWFzayA9IHMud19tYXNrO1xuICB2YXIgcHJldiAgPSBzLnByZXY7XG5cbiAgLyogU3RvcCB3aGVuIGN1cl9tYXRjaCBiZWNvbWVzIDw9IGxpbWl0LiBUbyBzaW1wbGlmeSB0aGUgY29kZSxcbiAgICogd2UgcHJldmVudCBtYXRjaGVzIHdpdGggdGhlIHN0cmluZyBvZiB3aW5kb3cgaW5kZXggMC5cbiAgICovXG5cbiAgdmFyIHN0cmVuZCA9IHMuc3Ryc3RhcnQgKyBNQVhfTUFUQ0g7XG4gIHZhciBzY2FuX2VuZDEgID0gX3dpbltzY2FuICsgYmVzdF9sZW4gLSAxXTtcbiAgdmFyIHNjYW5fZW5kICAgPSBfd2luW3NjYW4gKyBiZXN0X2xlbl07XG5cbiAgLyogVGhlIGNvZGUgaXMgb3B0aW1pemVkIGZvciBIQVNIX0JJVFMgPj0gOCBhbmQgTUFYX01BVENILTIgbXVsdGlwbGUgb2YgMTYuXG4gICAqIEl0IGlzIGVhc3kgdG8gZ2V0IHJpZCBvZiB0aGlzIG9wdGltaXphdGlvbiBpZiBuZWNlc3NhcnkuXG4gICAqL1xuICAvLyBBc3NlcnQocy0+aGFzaF9iaXRzID49IDggJiYgTUFYX01BVENIID09IDI1OCwgXCJDb2RlIHRvbyBjbGV2ZXJcIik7XG5cbiAgLyogRG8gbm90IHdhc3RlIHRvbyBtdWNoIHRpbWUgaWYgd2UgYWxyZWFkeSBoYXZlIGEgZ29vZCBtYXRjaDogKi9cbiAgaWYgKHMucHJldl9sZW5ndGggPj0gcy5nb29kX21hdGNoKSB7XG4gICAgY2hhaW5fbGVuZ3RoID4+PSAyO1xuICB9XG4gIC8qIERvIG5vdCBsb29rIGZvciBtYXRjaGVzIGJleW9uZCB0aGUgZW5kIG9mIHRoZSBpbnB1dC4gVGhpcyBpcyBuZWNlc3NhcnlcbiAgICogdG8gbWFrZSBkZWZsYXRlIGRldGVybWluaXN0aWMuXG4gICAqL1xuICBpZiAobmljZV9tYXRjaCA+IHMubG9va2FoZWFkKSB7IG5pY2VfbWF0Y2ggPSBzLmxvb2thaGVhZDsgfVxuXG4gIC8vIEFzc2VydCgodWxnKXMtPnN0cnN0YXJ0IDw9IHMtPndpbmRvd19zaXplLU1JTl9MT09LQUhFQUQsIFwibmVlZCBsb29rYWhlYWRcIik7XG5cbiAgZG8ge1xuICAgIC8vIEFzc2VydChjdXJfbWF0Y2ggPCBzLT5zdHJzdGFydCwgXCJubyBmdXR1cmVcIik7XG4gICAgbWF0Y2ggPSBjdXJfbWF0Y2g7XG5cbiAgICAvKiBTa2lwIHRvIG5leHQgbWF0Y2ggaWYgdGhlIG1hdGNoIGxlbmd0aCBjYW5ub3QgaW5jcmVhc2VcbiAgICAgKiBvciBpZiB0aGUgbWF0Y2ggbGVuZ3RoIGlzIGxlc3MgdGhhbiAyLiAgTm90ZSB0aGF0IHRoZSBjaGVja3MgYmVsb3dcbiAgICAgKiBmb3IgaW5zdWZmaWNpZW50IGxvb2thaGVhZCBvbmx5IG9jY3VyIG9jY2FzaW9uYWxseSBmb3IgcGVyZm9ybWFuY2VcbiAgICAgKiByZWFzb25zLiAgVGhlcmVmb3JlIHVuaW5pdGlhbGl6ZWQgbWVtb3J5IHdpbGwgYmUgYWNjZXNzZWQsIGFuZFxuICAgICAqIGNvbmRpdGlvbmFsIGp1bXBzIHdpbGwgYmUgbWFkZSB0aGF0IGRlcGVuZCBvbiB0aG9zZSB2YWx1ZXMuXG4gICAgICogSG93ZXZlciB0aGUgbGVuZ3RoIG9mIHRoZSBtYXRjaCBpcyBsaW1pdGVkIHRvIHRoZSBsb29rYWhlYWQsIHNvXG4gICAgICogdGhlIG91dHB1dCBvZiBkZWZsYXRlIGlzIG5vdCBhZmZlY3RlZCBieSB0aGUgdW5pbml0aWFsaXplZCB2YWx1ZXMuXG4gICAgICovXG5cbiAgICBpZiAoX3dpblttYXRjaCArIGJlc3RfbGVuXSAgICAgIT09IHNjYW5fZW5kICB8fFxuICAgICAgICBfd2luW21hdGNoICsgYmVzdF9sZW4gLSAxXSAhPT0gc2Nhbl9lbmQxIHx8XG4gICAgICAgIF93aW5bbWF0Y2hdICAgICAgICAgICAgICAgICE9PSBfd2luW3NjYW5dIHx8XG4gICAgICAgIF93aW5bKyttYXRjaF0gICAgICAgICAgICAgICE9PSBfd2luW3NjYW4gKyAxXSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyogVGhlIGNoZWNrIGF0IGJlc3RfbGVuLTEgY2FuIGJlIHJlbW92ZWQgYmVjYXVzZSBpdCB3aWxsIGJlIG1hZGVcbiAgICAgKiBhZ2FpbiBsYXRlci4gKFRoaXMgaGV1cmlzdGljIGlzIG5vdCBhbHdheXMgYSB3aW4uKVxuICAgICAqIEl0IGlzIG5vdCBuZWNlc3NhcnkgdG8gY29tcGFyZSBzY2FuWzJdIGFuZCBtYXRjaFsyXSBzaW5jZSB0aGV5XG4gICAgICogYXJlIGFsd2F5cyBlcXVhbCB3aGVuIHRoZSBvdGhlciBieXRlcyBtYXRjaCwgZ2l2ZW4gdGhhdFxuICAgICAqIHRoZSBoYXNoIGtleXMgYXJlIGVxdWFsIGFuZCB0aGF0IEhBU0hfQklUUyA+PSA4LlxuICAgICAqL1xuICAgIHNjYW4gKz0gMjtcbiAgICBtYXRjaCsrO1xuICAgIC8vIEFzc2VydCgqc2NhbiA9PSAqbWF0Y2gsIFwibWF0Y2hbMl0/XCIpO1xuXG4gICAgLyogV2UgY2hlY2sgZm9yIGluc3VmZmljaWVudCBsb29rYWhlYWQgb25seSBldmVyeSA4dGggY29tcGFyaXNvbjtcbiAgICAgKiB0aGUgMjU2dGggY2hlY2sgd2lsbCBiZSBtYWRlIGF0IHN0cnN0YXJ0KzI1OC5cbiAgICAgKi9cbiAgICBkbyB7XG4gICAgICAvKmpzaGludCBub2VtcHR5OmZhbHNlKi9cbiAgICB9IHdoaWxlIChfd2luWysrc2Nhbl0gPT09IF93aW5bKyttYXRjaF0gJiYgX3dpblsrK3NjYW5dID09PSBfd2luWysrbWF0Y2hdICYmXG4gICAgICAgICAgICAgX3dpblsrK3NjYW5dID09PSBfd2luWysrbWF0Y2hdICYmIF93aW5bKytzY2FuXSA9PT0gX3dpblsrK21hdGNoXSAmJlxuICAgICAgICAgICAgIF93aW5bKytzY2FuXSA9PT0gX3dpblsrK21hdGNoXSAmJiBfd2luWysrc2Nhbl0gPT09IF93aW5bKyttYXRjaF0gJiZcbiAgICAgICAgICAgICBfd2luWysrc2Nhbl0gPT09IF93aW5bKyttYXRjaF0gJiYgX3dpblsrK3NjYW5dID09PSBfd2luWysrbWF0Y2hdICYmXG4gICAgICAgICAgICAgc2NhbiA8IHN0cmVuZCk7XG5cbiAgICAvLyBBc3NlcnQoc2NhbiA8PSBzLT53aW5kb3crKHVuc2lnbmVkKShzLT53aW5kb3dfc2l6ZS0xKSwgXCJ3aWxkIHNjYW5cIik7XG5cbiAgICBsZW4gPSBNQVhfTUFUQ0ggLSAoc3RyZW5kIC0gc2Nhbik7XG4gICAgc2NhbiA9IHN0cmVuZCAtIE1BWF9NQVRDSDtcblxuICAgIGlmIChsZW4gPiBiZXN0X2xlbikge1xuICAgICAgcy5tYXRjaF9zdGFydCA9IGN1cl9tYXRjaDtcbiAgICAgIGJlc3RfbGVuID0gbGVuO1xuICAgICAgaWYgKGxlbiA+PSBuaWNlX21hdGNoKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgc2Nhbl9lbmQxICA9IF93aW5bc2NhbiArIGJlc3RfbGVuIC0gMV07XG4gICAgICBzY2FuX2VuZCAgID0gX3dpbltzY2FuICsgYmVzdF9sZW5dO1xuICAgIH1cbiAgfSB3aGlsZSAoKGN1cl9tYXRjaCA9IHByZXZbY3VyX21hdGNoICYgd21hc2tdKSA+IGxpbWl0ICYmIC0tY2hhaW5fbGVuZ3RoICE9PSAwKTtcblxuICBpZiAoYmVzdF9sZW4gPD0gcy5sb29rYWhlYWQpIHtcbiAgICByZXR1cm4gYmVzdF9sZW47XG4gIH1cbiAgcmV0dXJuIHMubG9va2FoZWFkO1xufVxuXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogRmlsbCB0aGUgd2luZG93IHdoZW4gdGhlIGxvb2thaGVhZCBiZWNvbWVzIGluc3VmZmljaWVudC5cbiAqIFVwZGF0ZXMgc3Ryc3RhcnQgYW5kIGxvb2thaGVhZC5cbiAqXG4gKiBJTiBhc3NlcnRpb246IGxvb2thaGVhZCA8IE1JTl9MT09LQUhFQURcbiAqIE9VVCBhc3NlcnRpb25zOiBzdHJzdGFydCA8PSB3aW5kb3dfc2l6ZS1NSU5fTE9PS0FIRUFEXG4gKiAgICBBdCBsZWFzdCBvbmUgYnl0ZSBoYXMgYmVlbiByZWFkLCBvciBhdmFpbF9pbiA9PSAwOyByZWFkcyBhcmVcbiAqICAgIHBlcmZvcm1lZCBmb3IgYXQgbGVhc3QgdHdvIGJ5dGVzIChyZXF1aXJlZCBmb3IgdGhlIHppcCB0cmFuc2xhdGVfZW9sXG4gKiAgICBvcHRpb24gLS0gbm90IHN1cHBvcnRlZCBoZXJlKS5cbiAqL1xuZnVuY3Rpb24gZmlsbF93aW5kb3cocykge1xuICB2YXIgX3dfc2l6ZSA9IHMud19zaXplO1xuICB2YXIgcCwgbiwgbSwgbW9yZSwgc3RyO1xuXG4gIC8vQXNzZXJ0KHMtPmxvb2thaGVhZCA8IE1JTl9MT09LQUhFQUQsIFwiYWxyZWFkeSBlbm91Z2ggbG9va2FoZWFkXCIpO1xuXG4gIGRvIHtcbiAgICBtb3JlID0gcy53aW5kb3dfc2l6ZSAtIHMubG9va2FoZWFkIC0gcy5zdHJzdGFydDtcblxuICAgIC8vIEpTIGludHMgaGF2ZSAzMiBiaXQsIGJsb2NrIGJlbG93IG5vdCBuZWVkZWRcbiAgICAvKiBEZWFsIHdpdGggIUAjJCUgNjRLIGxpbWl0OiAqL1xuICAgIC8vaWYgKHNpemVvZihpbnQpIDw9IDIpIHtcbiAgICAvLyAgICBpZiAobW9yZSA9PSAwICYmIHMtPnN0cnN0YXJ0ID09IDAgJiYgcy0+bG9va2FoZWFkID09IDApIHtcbiAgICAvLyAgICAgICAgbW9yZSA9IHdzaXplO1xuICAgIC8vXG4gICAgLy8gIH0gZWxzZSBpZiAobW9yZSA9PSAodW5zaWduZWQpKC0xKSkge1xuICAgIC8vICAgICAgICAvKiBWZXJ5IHVubGlrZWx5LCBidXQgcG9zc2libGUgb24gMTYgYml0IG1hY2hpbmUgaWZcbiAgICAvLyAgICAgICAgICogc3Ryc3RhcnQgPT0gMCAmJiBsb29rYWhlYWQgPT0gMSAoaW5wdXQgZG9uZSBhIGJ5dGUgYXQgdGltZSlcbiAgICAvLyAgICAgICAgICovXG4gICAgLy8gICAgICAgIG1vcmUtLTtcbiAgICAvLyAgICB9XG4gICAgLy99XG5cblxuICAgIC8qIElmIHRoZSB3aW5kb3cgaXMgYWxtb3N0IGZ1bGwgYW5kIHRoZXJlIGlzIGluc3VmZmljaWVudCBsb29rYWhlYWQsXG4gICAgICogbW92ZSB0aGUgdXBwZXIgaGFsZiB0byB0aGUgbG93ZXIgb25lIHRvIG1ha2Ugcm9vbSBpbiB0aGUgdXBwZXIgaGFsZi5cbiAgICAgKi9cbiAgICBpZiAocy5zdHJzdGFydCA+PSBfd19zaXplICsgKF93X3NpemUgLSBNSU5fTE9PS0FIRUFEKSkge1xuXG4gICAgICB1dGlscy5hcnJheVNldChzLndpbmRvdywgcy53aW5kb3csIF93X3NpemUsIF93X3NpemUsIDApO1xuICAgICAgcy5tYXRjaF9zdGFydCAtPSBfd19zaXplO1xuICAgICAgcy5zdHJzdGFydCAtPSBfd19zaXplO1xuICAgICAgLyogd2Ugbm93IGhhdmUgc3Ryc3RhcnQgPj0gTUFYX0RJU1QgKi9cbiAgICAgIHMuYmxvY2tfc3RhcnQgLT0gX3dfc2l6ZTtcblxuICAgICAgLyogU2xpZGUgdGhlIGhhc2ggdGFibGUgKGNvdWxkIGJlIGF2b2lkZWQgd2l0aCAzMiBiaXQgdmFsdWVzXG4gICAgICAgYXQgdGhlIGV4cGVuc2Ugb2YgbWVtb3J5IHVzYWdlKS4gV2Ugc2xpZGUgZXZlbiB3aGVuIGxldmVsID09IDBcbiAgICAgICB0byBrZWVwIHRoZSBoYXNoIHRhYmxlIGNvbnNpc3RlbnQgaWYgd2Ugc3dpdGNoIGJhY2sgdG8gbGV2ZWwgPiAwXG4gICAgICAgbGF0ZXIuIChVc2luZyBsZXZlbCAwIHBlcm1hbmVudGx5IGlzIG5vdCBhbiBvcHRpbWFsIHVzYWdlIG9mXG4gICAgICAgemxpYiwgc28gd2UgZG9uJ3QgY2FyZSBhYm91dCB0aGlzIHBhdGhvbG9naWNhbCBjYXNlLilcbiAgICAgICAqL1xuXG4gICAgICBuID0gcy5oYXNoX3NpemU7XG4gICAgICBwID0gbjtcbiAgICAgIGRvIHtcbiAgICAgICAgbSA9IHMuaGVhZFstLXBdO1xuICAgICAgICBzLmhlYWRbcF0gPSAobSA+PSBfd19zaXplID8gbSAtIF93X3NpemUgOiAwKTtcbiAgICAgIH0gd2hpbGUgKC0tbik7XG5cbiAgICAgIG4gPSBfd19zaXplO1xuICAgICAgcCA9IG47XG4gICAgICBkbyB7XG4gICAgICAgIG0gPSBzLnByZXZbLS1wXTtcbiAgICAgICAgcy5wcmV2W3BdID0gKG0gPj0gX3dfc2l6ZSA/IG0gLSBfd19zaXplIDogMCk7XG4gICAgICAgIC8qIElmIG4gaXMgbm90IG9uIGFueSBoYXNoIGNoYWluLCBwcmV2W25dIGlzIGdhcmJhZ2UgYnV0XG4gICAgICAgICAqIGl0cyB2YWx1ZSB3aWxsIG5ldmVyIGJlIHVzZWQuXG4gICAgICAgICAqL1xuICAgICAgfSB3aGlsZSAoLS1uKTtcblxuICAgICAgbW9yZSArPSBfd19zaXplO1xuICAgIH1cbiAgICBpZiAocy5zdHJtLmF2YWlsX2luID09PSAwKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvKiBJZiB0aGVyZSB3YXMgbm8gc2xpZGluZzpcbiAgICAgKiAgICBzdHJzdGFydCA8PSBXU0laRStNQVhfRElTVC0xICYmIGxvb2thaGVhZCA8PSBNSU5fTE9PS0FIRUFEIC0gMSAmJlxuICAgICAqICAgIG1vcmUgPT0gd2luZG93X3NpemUgLSBsb29rYWhlYWQgLSBzdHJzdGFydFxuICAgICAqID0+IG1vcmUgPj0gd2luZG93X3NpemUgLSAoTUlOX0xPT0tBSEVBRC0xICsgV1NJWkUgKyBNQVhfRElTVC0xKVxuICAgICAqID0+IG1vcmUgPj0gd2luZG93X3NpemUgLSAyKldTSVpFICsgMlxuICAgICAqIEluIHRoZSBCSUdfTUVNIG9yIE1NQVAgY2FzZSAobm90IHlldCBzdXBwb3J0ZWQpLFxuICAgICAqICAgd2luZG93X3NpemUgPT0gaW5wdXRfc2l6ZSArIE1JTl9MT09LQUhFQUQgICYmXG4gICAgICogICBzdHJzdGFydCArIHMtPmxvb2thaGVhZCA8PSBpbnB1dF9zaXplID0+IG1vcmUgPj0gTUlOX0xPT0tBSEVBRC5cbiAgICAgKiBPdGhlcndpc2UsIHdpbmRvd19zaXplID09IDIqV1NJWkUgc28gbW9yZSA+PSAyLlxuICAgICAqIElmIHRoZXJlIHdhcyBzbGlkaW5nLCBtb3JlID49IFdTSVpFLiBTbyBpbiBhbGwgY2FzZXMsIG1vcmUgPj0gMi5cbiAgICAgKi9cbiAgICAvL0Fzc2VydChtb3JlID49IDIsIFwibW9yZSA8IDJcIik7XG4gICAgbiA9IHJlYWRfYnVmKHMuc3RybSwgcy53aW5kb3csIHMuc3Ryc3RhcnQgKyBzLmxvb2thaGVhZCwgbW9yZSk7XG4gICAgcy5sb29rYWhlYWQgKz0gbjtcblxuICAgIC8qIEluaXRpYWxpemUgdGhlIGhhc2ggdmFsdWUgbm93IHRoYXQgd2UgaGF2ZSBzb21lIGlucHV0OiAqL1xuICAgIGlmIChzLmxvb2thaGVhZCArIHMuaW5zZXJ0ID49IE1JTl9NQVRDSCkge1xuICAgICAgc3RyID0gcy5zdHJzdGFydCAtIHMuaW5zZXJ0O1xuICAgICAgcy5pbnNfaCA9IHMud2luZG93W3N0cl07XG5cbiAgICAgIC8qIFVQREFURV9IQVNIKHMsIHMtPmluc19oLCBzLT53aW5kb3dbc3RyICsgMV0pOyAqL1xuICAgICAgcy5pbnNfaCA9ICgocy5pbnNfaCA8PCBzLmhhc2hfc2hpZnQpIF4gcy53aW5kb3dbc3RyICsgMV0pICYgcy5oYXNoX21hc2s7XG4vLyNpZiBNSU5fTUFUQ0ggIT0gM1xuLy8gICAgICAgIENhbGwgdXBkYXRlX2hhc2goKSBNSU5fTUFUQ0gtMyBtb3JlIHRpbWVzXG4vLyNlbmRpZlxuICAgICAgd2hpbGUgKHMuaW5zZXJ0KSB7XG4gICAgICAgIC8qIFVQREFURV9IQVNIKHMsIHMtPmluc19oLCBzLT53aW5kb3dbc3RyICsgTUlOX01BVENILTFdKTsgKi9cbiAgICAgICAgcy5pbnNfaCA9ICgocy5pbnNfaCA8PCBzLmhhc2hfc2hpZnQpIF4gcy53aW5kb3dbc3RyICsgTUlOX01BVENIIC0gMV0pICYgcy5oYXNoX21hc2s7XG5cbiAgICAgICAgcy5wcmV2W3N0ciAmIHMud19tYXNrXSA9IHMuaGVhZFtzLmluc19oXTtcbiAgICAgICAgcy5oZWFkW3MuaW5zX2hdID0gc3RyO1xuICAgICAgICBzdHIrKztcbiAgICAgICAgcy5pbnNlcnQtLTtcbiAgICAgICAgaWYgKHMubG9va2FoZWFkICsgcy5pbnNlcnQgPCBNSU5fTUFUQ0gpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvKiBJZiB0aGUgd2hvbGUgaW5wdXQgaGFzIGxlc3MgdGhhbiBNSU5fTUFUQ0ggYnl0ZXMsIGluc19oIGlzIGdhcmJhZ2UsXG4gICAgICogYnV0IHRoaXMgaXMgbm90IGltcG9ydGFudCBzaW5jZSBvbmx5IGxpdGVyYWwgYnl0ZXMgd2lsbCBiZSBlbWl0dGVkLlxuICAgICAqL1xuXG4gIH0gd2hpbGUgKHMubG9va2FoZWFkIDwgTUlOX0xPT0tBSEVBRCAmJiBzLnN0cm0uYXZhaWxfaW4gIT09IDApO1xuXG4gIC8qIElmIHRoZSBXSU5fSU5JVCBieXRlcyBhZnRlciB0aGUgZW5kIG9mIHRoZSBjdXJyZW50IGRhdGEgaGF2ZSBuZXZlciBiZWVuXG4gICAqIHdyaXR0ZW4sIHRoZW4gemVybyB0aG9zZSBieXRlcyBpbiBvcmRlciB0byBhdm9pZCBtZW1vcnkgY2hlY2sgcmVwb3J0cyBvZlxuICAgKiB0aGUgdXNlIG9mIHVuaW5pdGlhbGl6ZWQgKG9yIHVuaW5pdGlhbGlzZWQgYXMgSnVsaWFuIHdyaXRlcykgYnl0ZXMgYnlcbiAgICogdGhlIGxvbmdlc3QgbWF0Y2ggcm91dGluZXMuICBVcGRhdGUgdGhlIGhpZ2ggd2F0ZXIgbWFyayBmb3IgdGhlIG5leHRcbiAgICogdGltZSB0aHJvdWdoIGhlcmUuICBXSU5fSU5JVCBpcyBzZXQgdG8gTUFYX01BVENIIHNpbmNlIHRoZSBsb25nZXN0IG1hdGNoXG4gICAqIHJvdXRpbmVzIGFsbG93IHNjYW5uaW5nIHRvIHN0cnN0YXJ0ICsgTUFYX01BVENILCBpZ25vcmluZyBsb29rYWhlYWQuXG4gICAqL1xuLy8gIGlmIChzLmhpZ2hfd2F0ZXIgPCBzLndpbmRvd19zaXplKSB7XG4vLyAgICB2YXIgY3VyciA9IHMuc3Ryc3RhcnQgKyBzLmxvb2thaGVhZDtcbi8vICAgIHZhciBpbml0ID0gMDtcbi8vXG4vLyAgICBpZiAocy5oaWdoX3dhdGVyIDwgY3Vycikge1xuLy8gICAgICAvKiBQcmV2aW91cyBoaWdoIHdhdGVyIG1hcmsgYmVsb3cgY3VycmVudCBkYXRhIC0tIHplcm8gV0lOX0lOSVRcbi8vICAgICAgICogYnl0ZXMgb3IgdXAgdG8gZW5kIG9mIHdpbmRvdywgd2hpY2hldmVyIGlzIGxlc3MuXG4vLyAgICAgICAqL1xuLy8gICAgICBpbml0ID0gcy53aW5kb3dfc2l6ZSAtIGN1cnI7XG4vLyAgICAgIGlmIChpbml0ID4gV0lOX0lOSVQpXG4vLyAgICAgICAgaW5pdCA9IFdJTl9JTklUO1xuLy8gICAgICB6bWVtemVybyhzLT53aW5kb3cgKyBjdXJyLCAodW5zaWduZWQpaW5pdCk7XG4vLyAgICAgIHMtPmhpZ2hfd2F0ZXIgPSBjdXJyICsgaW5pdDtcbi8vICAgIH1cbi8vICAgIGVsc2UgaWYgKHMtPmhpZ2hfd2F0ZXIgPCAodWxnKWN1cnIgKyBXSU5fSU5JVCkge1xuLy8gICAgICAvKiBIaWdoIHdhdGVyIG1hcmsgYXQgb3IgYWJvdmUgY3VycmVudCBkYXRhLCBidXQgYmVsb3cgY3VycmVudCBkYXRhXG4vLyAgICAgICAqIHBsdXMgV0lOX0lOSVQgLS0gemVybyBvdXQgdG8gY3VycmVudCBkYXRhIHBsdXMgV0lOX0lOSVQsIG9yIHVwXG4vLyAgICAgICAqIHRvIGVuZCBvZiB3aW5kb3csIHdoaWNoZXZlciBpcyBsZXNzLlxuLy8gICAgICAgKi9cbi8vICAgICAgaW5pdCA9ICh1bGcpY3VyciArIFdJTl9JTklUIC0gcy0+aGlnaF93YXRlcjtcbi8vICAgICAgaWYgKGluaXQgPiBzLT53aW5kb3dfc2l6ZSAtIHMtPmhpZ2hfd2F0ZXIpXG4vLyAgICAgICAgaW5pdCA9IHMtPndpbmRvd19zaXplIC0gcy0+aGlnaF93YXRlcjtcbi8vICAgICAgem1lbXplcm8ocy0+d2luZG93ICsgcy0+aGlnaF93YXRlciwgKHVuc2lnbmVkKWluaXQpO1xuLy8gICAgICBzLT5oaWdoX3dhdGVyICs9IGluaXQ7XG4vLyAgICB9XG4vLyAgfVxuLy9cbi8vICBBc3NlcnQoKHVsZylzLT5zdHJzdGFydCA8PSBzLT53aW5kb3dfc2l6ZSAtIE1JTl9MT09LQUhFQUQsXG4vLyAgICBcIm5vdCBlbm91Z2ggcm9vbSBmb3Igc2VhcmNoXCIpO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHkgd2l0aG91dCBjb21wcmVzc2lvbiBhcyBtdWNoIGFzIHBvc3NpYmxlIGZyb20gdGhlIGlucHV0IHN0cmVhbSwgcmV0dXJuXG4gKiB0aGUgY3VycmVudCBibG9jayBzdGF0ZS5cbiAqIFRoaXMgZnVuY3Rpb24gZG9lcyBub3QgaW5zZXJ0IG5ldyBzdHJpbmdzIGluIHRoZSBkaWN0aW9uYXJ5IHNpbmNlXG4gKiB1bmNvbXByZXNzaWJsZSBkYXRhIGlzIHByb2JhYmx5IG5vdCB1c2VmdWwuIFRoaXMgZnVuY3Rpb24gaXMgdXNlZFxuICogb25seSBmb3IgdGhlIGxldmVsPTAgY29tcHJlc3Npb24gb3B0aW9uLlxuICogTk9URTogdGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgb3B0aW1pemVkIHRvIGF2b2lkIGV4dHJhIGNvcHlpbmcgZnJvbVxuICogd2luZG93IHRvIHBlbmRpbmdfYnVmLlxuICovXG5mdW5jdGlvbiBkZWZsYXRlX3N0b3JlZChzLCBmbHVzaCkge1xuICAvKiBTdG9yZWQgYmxvY2tzIGFyZSBsaW1pdGVkIHRvIDB4ZmZmZiBieXRlcywgcGVuZGluZ19idWYgaXMgbGltaXRlZFxuICAgKiB0byBwZW5kaW5nX2J1Zl9zaXplLCBhbmQgZWFjaCBzdG9yZWQgYmxvY2sgaGFzIGEgNSBieXRlIGhlYWRlcjpcbiAgICovXG4gIHZhciBtYXhfYmxvY2tfc2l6ZSA9IDB4ZmZmZjtcblxuICBpZiAobWF4X2Jsb2NrX3NpemUgPiBzLnBlbmRpbmdfYnVmX3NpemUgLSA1KSB7XG4gICAgbWF4X2Jsb2NrX3NpemUgPSBzLnBlbmRpbmdfYnVmX3NpemUgLSA1O1xuICB9XG5cbiAgLyogQ29weSBhcyBtdWNoIGFzIHBvc3NpYmxlIGZyb20gaW5wdXQgdG8gb3V0cHV0OiAqL1xuICBmb3IgKDs7KSB7XG4gICAgLyogRmlsbCB0aGUgd2luZG93IGFzIG11Y2ggYXMgcG9zc2libGU6ICovXG4gICAgaWYgKHMubG9va2FoZWFkIDw9IDEpIHtcblxuICAgICAgLy9Bc3NlcnQocy0+c3Ryc3RhcnQgPCBzLT53X3NpemUrTUFYX0RJU1QocykgfHxcbiAgICAgIC8vICBzLT5ibG9ja19zdGFydCA+PSAobG9uZylzLT53X3NpemUsIFwic2xpZGUgdG9vIGxhdGVcIik7XG4vLyAgICAgIGlmICghKHMuc3Ryc3RhcnQgPCBzLndfc2l6ZSArIChzLndfc2l6ZSAtIE1JTl9MT09LQUhFQUQpIHx8XG4vLyAgICAgICAgcy5ibG9ja19zdGFydCA+PSBzLndfc2l6ZSkpIHtcbi8vICAgICAgICB0aHJvdyAgbmV3IEVycm9yKFwic2xpZGUgdG9vIGxhdGVcIik7XG4vLyAgICAgIH1cblxuICAgICAgZmlsbF93aW5kb3cocyk7XG4gICAgICBpZiAocy5sb29rYWhlYWQgPT09IDAgJiYgZmx1c2ggPT09IFpfTk9fRkxVU0gpIHtcbiAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgIH1cblxuICAgICAgaWYgKHMubG9va2FoZWFkID09PSAwKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgLyogZmx1c2ggdGhlIGN1cnJlbnQgYmxvY2sgKi9cbiAgICB9XG4gICAgLy9Bc3NlcnQocy0+YmxvY2tfc3RhcnQgPj0gMEwsIFwiYmxvY2sgZ29uZVwiKTtcbi8vICAgIGlmIChzLmJsb2NrX3N0YXJ0IDwgMCkgdGhyb3cgbmV3IEVycm9yKFwiYmxvY2sgZ29uZVwiKTtcblxuICAgIHMuc3Ryc3RhcnQgKz0gcy5sb29rYWhlYWQ7XG4gICAgcy5sb29rYWhlYWQgPSAwO1xuXG4gICAgLyogRW1pdCBhIHN0b3JlZCBibG9jayBpZiBwZW5kaW5nX2J1ZiB3aWxsIGJlIGZ1bGw6ICovXG4gICAgdmFyIG1heF9zdGFydCA9IHMuYmxvY2tfc3RhcnQgKyBtYXhfYmxvY2tfc2l6ZTtcblxuICAgIGlmIChzLnN0cnN0YXJ0ID09PSAwIHx8IHMuc3Ryc3RhcnQgPj0gbWF4X3N0YXJ0KSB7XG4gICAgICAvKiBzdHJzdGFydCA9PSAwIGlzIHBvc3NpYmxlIHdoZW4gd3JhcGFyb3VuZCBvbiAxNi1iaXQgbWFjaGluZSAqL1xuICAgICAgcy5sb29rYWhlYWQgPSBzLnN0cnN0YXJ0IC0gbWF4X3N0YXJ0O1xuICAgICAgcy5zdHJzdGFydCA9IG1heF9zdGFydDtcbiAgICAgIC8qKiogRkxVU0hfQkxPQ0socywgMCk7ICoqKi9cbiAgICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgICAgaWYgKHMuc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgIH1cbiAgICAgIC8qKiovXG5cblxuICAgIH1cbiAgICAvKiBGbHVzaCBpZiB3ZSBtYXkgaGF2ZSB0byBzbGlkZSwgb3RoZXJ3aXNlIGJsb2NrX3N0YXJ0IG1heSBiZWNvbWVcbiAgICAgKiBuZWdhdGl2ZSBhbmQgdGhlIGRhdGEgd2lsbCBiZSBnb25lOlxuICAgICAqL1xuICAgIGlmIChzLnN0cnN0YXJ0IC0gcy5ibG9ja19zdGFydCA+PSAocy53X3NpemUgLSBNSU5fTE9PS0FIRUFEKSkge1xuICAgICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAwKTsgKioqL1xuICAgICAgZmx1c2hfYmxvY2tfb25seShzLCBmYWxzZSk7XG4gICAgICBpZiAocy5zdHJtLmF2YWlsX291dCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgICAgfVxuICAgICAgLyoqKi9cbiAgICB9XG4gIH1cblxuICBzLmluc2VydCA9IDA7XG5cbiAgaWYgKGZsdXNoID09PSBaX0ZJTklTSCkge1xuICAgIC8qKiogRkxVU0hfQkxPQ0socywgMSk7ICoqKi9cbiAgICBmbHVzaF9ibG9ja19vbmx5KHMsIHRydWUpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfRklOSVNIX1NUQVJURUQ7XG4gICAgfVxuICAgIC8qKiovXG4gICAgcmV0dXJuIEJTX0ZJTklTSF9ET05FO1xuICB9XG5cbiAgaWYgKHMuc3Ryc3RhcnQgPiBzLmJsb2NrX3N0YXJ0KSB7XG4gICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAwKTsgKioqL1xuICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgIH1cbiAgICAvKioqL1xuICB9XG5cbiAgcmV0dXJuIEJTX05FRURfTU9SRTtcbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb21wcmVzcyBhcyBtdWNoIGFzIHBvc3NpYmxlIGZyb20gdGhlIGlucHV0IHN0cmVhbSwgcmV0dXJuIHRoZSBjdXJyZW50XG4gKiBibG9jayBzdGF0ZS5cbiAqIFRoaXMgZnVuY3Rpb24gZG9lcyBub3QgcGVyZm9ybSBsYXp5IGV2YWx1YXRpb24gb2YgbWF0Y2hlcyBhbmQgaW5zZXJ0c1xuICogbmV3IHN0cmluZ3MgaW4gdGhlIGRpY3Rpb25hcnkgb25seSBmb3IgdW5tYXRjaGVkIHN0cmluZ3Mgb3IgZm9yIHNob3J0XG4gKiBtYXRjaGVzLiBJdCBpcyB1c2VkIG9ubHkgZm9yIHRoZSBmYXN0IGNvbXByZXNzaW9uIG9wdGlvbnMuXG4gKi9cbmZ1bmN0aW9uIGRlZmxhdGVfZmFzdChzLCBmbHVzaCkge1xuICB2YXIgaGFzaF9oZWFkOyAgICAgICAgLyogaGVhZCBvZiB0aGUgaGFzaCBjaGFpbiAqL1xuICB2YXIgYmZsdXNoOyAgICAgICAgICAgLyogc2V0IGlmIGN1cnJlbnQgYmxvY2sgbXVzdCBiZSBmbHVzaGVkICovXG5cbiAgZm9yICg7Oykge1xuICAgIC8qIE1ha2Ugc3VyZSB0aGF0IHdlIGFsd2F5cyBoYXZlIGVub3VnaCBsb29rYWhlYWQsIGV4Y2VwdFxuICAgICAqIGF0IHRoZSBlbmQgb2YgdGhlIGlucHV0IGZpbGUuIFdlIG5lZWQgTUFYX01BVENIIGJ5dGVzXG4gICAgICogZm9yIHRoZSBuZXh0IG1hdGNoLCBwbHVzIE1JTl9NQVRDSCBieXRlcyB0byBpbnNlcnQgdGhlXG4gICAgICogc3RyaW5nIGZvbGxvd2luZyB0aGUgbmV4dCBtYXRjaC5cbiAgICAgKi9cbiAgICBpZiAocy5sb29rYWhlYWQgPCBNSU5fTE9PS0FIRUFEKSB7XG4gICAgICBmaWxsX3dpbmRvdyhzKTtcbiAgICAgIGlmIChzLmxvb2thaGVhZCA8IE1JTl9MT09LQUhFQUQgJiYgZmx1c2ggPT09IFpfTk9fRkxVU0gpIHtcbiAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgIH1cbiAgICAgIGlmIChzLmxvb2thaGVhZCA9PT0gMCkge1xuICAgICAgICBicmVhazsgLyogZmx1c2ggdGhlIGN1cnJlbnQgYmxvY2sgKi9cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBJbnNlcnQgdGhlIHN0cmluZyB3aW5kb3dbc3Ryc3RhcnQgLi4gc3Ryc3RhcnQrMl0gaW4gdGhlXG4gICAgICogZGljdGlvbmFyeSwgYW5kIHNldCBoYXNoX2hlYWQgdG8gdGhlIGhlYWQgb2YgdGhlIGhhc2ggY2hhaW46XG4gICAgICovXG4gICAgaGFzaF9oZWFkID0gMC8qTklMKi87XG4gICAgaWYgKHMubG9va2FoZWFkID49IE1JTl9NQVRDSCkge1xuICAgICAgLyoqKiBJTlNFUlRfU1RSSU5HKHMsIHMuc3Ryc3RhcnQsIGhhc2hfaGVhZCk7ICoqKi9cbiAgICAgIHMuaW5zX2ggPSAoKHMuaW5zX2ggPDwgcy5oYXNoX3NoaWZ0KSBeIHMud2luZG93W3Muc3Ryc3RhcnQgKyBNSU5fTUFUQ0ggLSAxXSkgJiBzLmhhc2hfbWFzaztcbiAgICAgIGhhc2hfaGVhZCA9IHMucHJldltzLnN0cnN0YXJ0ICYgcy53X21hc2tdID0gcy5oZWFkW3MuaW5zX2hdO1xuICAgICAgcy5oZWFkW3MuaW5zX2hdID0gcy5zdHJzdGFydDtcbiAgICAgIC8qKiovXG4gICAgfVxuXG4gICAgLyogRmluZCB0aGUgbG9uZ2VzdCBtYXRjaCwgZGlzY2FyZGluZyB0aG9zZSA8PSBwcmV2X2xlbmd0aC5cbiAgICAgKiBBdCB0aGlzIHBvaW50IHdlIGhhdmUgYWx3YXlzIG1hdGNoX2xlbmd0aCA8IE1JTl9NQVRDSFxuICAgICAqL1xuICAgIGlmIChoYXNoX2hlYWQgIT09IDAvKk5JTCovICYmICgocy5zdHJzdGFydCAtIGhhc2hfaGVhZCkgPD0gKHMud19zaXplIC0gTUlOX0xPT0tBSEVBRCkpKSB7XG4gICAgICAvKiBUbyBzaW1wbGlmeSB0aGUgY29kZSwgd2UgcHJldmVudCBtYXRjaGVzIHdpdGggdGhlIHN0cmluZ1xuICAgICAgICogb2Ygd2luZG93IGluZGV4IDAgKGluIHBhcnRpY3VsYXIgd2UgaGF2ZSB0byBhdm9pZCBhIG1hdGNoXG4gICAgICAgKiBvZiB0aGUgc3RyaW5nIHdpdGggaXRzZWxmIGF0IHRoZSBzdGFydCBvZiB0aGUgaW5wdXQgZmlsZSkuXG4gICAgICAgKi9cbiAgICAgIHMubWF0Y2hfbGVuZ3RoID0gbG9uZ2VzdF9tYXRjaChzLCBoYXNoX2hlYWQpO1xuICAgICAgLyogbG9uZ2VzdF9tYXRjaCgpIHNldHMgbWF0Y2hfc3RhcnQgKi9cbiAgICB9XG4gICAgaWYgKHMubWF0Y2hfbGVuZ3RoID49IE1JTl9NQVRDSCkge1xuICAgICAgLy8gY2hlY2tfbWF0Y2gocywgcy5zdHJzdGFydCwgcy5tYXRjaF9zdGFydCwgcy5tYXRjaF9sZW5ndGgpOyAvLyBmb3IgZGVidWcgb25seVxuXG4gICAgICAvKioqIF90cl90YWxseV9kaXN0KHMsIHMuc3Ryc3RhcnQgLSBzLm1hdGNoX3N0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgcy5tYXRjaF9sZW5ndGggLSBNSU5fTUFUQ0gsIGJmbHVzaCk7ICoqKi9cbiAgICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCBzLnN0cnN0YXJ0IC0gcy5tYXRjaF9zdGFydCwgcy5tYXRjaF9sZW5ndGggLSBNSU5fTUFUQ0gpO1xuXG4gICAgICBzLmxvb2thaGVhZCAtPSBzLm1hdGNoX2xlbmd0aDtcblxuICAgICAgLyogSW5zZXJ0IG5ldyBzdHJpbmdzIGluIHRoZSBoYXNoIHRhYmxlIG9ubHkgaWYgdGhlIG1hdGNoIGxlbmd0aFxuICAgICAgICogaXMgbm90IHRvbyBsYXJnZS4gVGhpcyBzYXZlcyB0aW1lIGJ1dCBkZWdyYWRlcyBjb21wcmVzc2lvbi5cbiAgICAgICAqL1xuICAgICAgaWYgKHMubWF0Y2hfbGVuZ3RoIDw9IHMubWF4X2xhenlfbWF0Y2gvKm1heF9pbnNlcnRfbGVuZ3RoKi8gJiYgcy5sb29rYWhlYWQgPj0gTUlOX01BVENIKSB7XG4gICAgICAgIHMubWF0Y2hfbGVuZ3RoLS07IC8qIHN0cmluZyBhdCBzdHJzdGFydCBhbHJlYWR5IGluIHRhYmxlICovXG4gICAgICAgIGRvIHtcbiAgICAgICAgICBzLnN0cnN0YXJ0Kys7XG4gICAgICAgICAgLyoqKiBJTlNFUlRfU1RSSU5HKHMsIHMuc3Ryc3RhcnQsIGhhc2hfaGVhZCk7ICoqKi9cbiAgICAgICAgICBzLmluc19oID0gKChzLmluc19oIDw8IHMuaGFzaF9zaGlmdCkgXiBzLndpbmRvd1tzLnN0cnN0YXJ0ICsgTUlOX01BVENIIC0gMV0pICYgcy5oYXNoX21hc2s7XG4gICAgICAgICAgaGFzaF9oZWFkID0gcy5wcmV2W3Muc3Ryc3RhcnQgJiBzLndfbWFza10gPSBzLmhlYWRbcy5pbnNfaF07XG4gICAgICAgICAgcy5oZWFkW3MuaW5zX2hdID0gcy5zdHJzdGFydDtcbiAgICAgICAgICAvKioqL1xuICAgICAgICAgIC8qIHN0cnN0YXJ0IG5ldmVyIGV4Y2VlZHMgV1NJWkUtTUFYX01BVENILCBzbyB0aGVyZSBhcmVcbiAgICAgICAgICAgKiBhbHdheXMgTUlOX01BVENIIGJ5dGVzIGFoZWFkLlxuICAgICAgICAgICAqL1xuICAgICAgICB9IHdoaWxlICgtLXMubWF0Y2hfbGVuZ3RoICE9PSAwKTtcbiAgICAgICAgcy5zdHJzdGFydCsrO1xuICAgICAgfSBlbHNlXG4gICAgICB7XG4gICAgICAgIHMuc3Ryc3RhcnQgKz0gcy5tYXRjaF9sZW5ndGg7XG4gICAgICAgIHMubWF0Y2hfbGVuZ3RoID0gMDtcbiAgICAgICAgcy5pbnNfaCA9IHMud2luZG93W3Muc3Ryc3RhcnRdO1xuICAgICAgICAvKiBVUERBVEVfSEFTSChzLCBzLmluc19oLCBzLndpbmRvd1tzLnN0cnN0YXJ0KzFdKTsgKi9cbiAgICAgICAgcy5pbnNfaCA9ICgocy5pbnNfaCA8PCBzLmhhc2hfc2hpZnQpIF4gcy53aW5kb3dbcy5zdHJzdGFydCArIDFdKSAmIHMuaGFzaF9tYXNrO1xuXG4vLyNpZiBNSU5fTUFUQ0ggIT0gM1xuLy8gICAgICAgICAgICAgICAgQ2FsbCBVUERBVEVfSEFTSCgpIE1JTl9NQVRDSC0zIG1vcmUgdGltZXNcbi8vI2VuZGlmXG4gICAgICAgIC8qIElmIGxvb2thaGVhZCA8IE1JTl9NQVRDSCwgaW5zX2ggaXMgZ2FyYmFnZSwgYnV0IGl0IGRvZXMgbm90XG4gICAgICAgICAqIG1hdHRlciBzaW5jZSBpdCB3aWxsIGJlIHJlY29tcHV0ZWQgYXQgbmV4dCBkZWZsYXRlIGNhbGwuXG4gICAgICAgICAqL1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvKiBObyBtYXRjaCwgb3V0cHV0IGEgbGl0ZXJhbCBieXRlICovXG4gICAgICAvL1RyYWNldnYoKHN0ZGVycixcIiVjXCIsIHMud2luZG93W3Muc3Ryc3RhcnRdKSk7XG4gICAgICAvKioqIF90cl90YWxseV9saXQocywgcy53aW5kb3dbcy5zdHJzdGFydF0sIGJmbHVzaCk7ICoqKi9cbiAgICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCAwLCBzLndpbmRvd1tzLnN0cnN0YXJ0XSk7XG5cbiAgICAgIHMubG9va2FoZWFkLS07XG4gICAgICBzLnN0cnN0YXJ0Kys7XG4gICAgfVxuICAgIGlmIChiZmx1c2gpIHtcbiAgICAgIC8qKiogRkxVU0hfQkxPQ0socywgMCk7ICoqKi9cbiAgICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgICAgaWYgKHMuc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgIH1cbiAgICAgIC8qKiovXG4gICAgfVxuICB9XG4gIHMuaW5zZXJ0ID0gKChzLnN0cnN0YXJ0IDwgKE1JTl9NQVRDSCAtIDEpKSA/IHMuc3Ryc3RhcnQgOiBNSU5fTUFUQ0ggLSAxKTtcbiAgaWYgKGZsdXNoID09PSBaX0ZJTklTSCkge1xuICAgIC8qKiogRkxVU0hfQkxPQ0socywgMSk7ICoqKi9cbiAgICBmbHVzaF9ibG9ja19vbmx5KHMsIHRydWUpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfRklOSVNIX1NUQVJURUQ7XG4gICAgfVxuICAgIC8qKiovXG4gICAgcmV0dXJuIEJTX0ZJTklTSF9ET05FO1xuICB9XG4gIGlmIChzLmxhc3RfbGl0KSB7XG4gICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAwKTsgKioqL1xuICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgIH1cbiAgICAvKioqL1xuICB9XG4gIHJldHVybiBCU19CTE9DS19ET05FO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFNhbWUgYXMgYWJvdmUsIGJ1dCBhY2hpZXZlcyBiZXR0ZXIgY29tcHJlc3Npb24uIFdlIHVzZSBhIGxhenlcbiAqIGV2YWx1YXRpb24gZm9yIG1hdGNoZXM6IGEgbWF0Y2ggaXMgZmluYWxseSBhZG9wdGVkIG9ubHkgaWYgdGhlcmUgaXNcbiAqIG5vIGJldHRlciBtYXRjaCBhdCB0aGUgbmV4dCB3aW5kb3cgcG9zaXRpb24uXG4gKi9cbmZ1bmN0aW9uIGRlZmxhdGVfc2xvdyhzLCBmbHVzaCkge1xuICB2YXIgaGFzaF9oZWFkOyAgICAgICAgICAvKiBoZWFkIG9mIGhhc2ggY2hhaW4gKi9cbiAgdmFyIGJmbHVzaDsgICAgICAgICAgICAgIC8qIHNldCBpZiBjdXJyZW50IGJsb2NrIG11c3QgYmUgZmx1c2hlZCAqL1xuXG4gIHZhciBtYXhfaW5zZXJ0O1xuXG4gIC8qIFByb2Nlc3MgdGhlIGlucHV0IGJsb2NrLiAqL1xuICBmb3IgKDs7KSB7XG4gICAgLyogTWFrZSBzdXJlIHRoYXQgd2UgYWx3YXlzIGhhdmUgZW5vdWdoIGxvb2thaGVhZCwgZXhjZXB0XG4gICAgICogYXQgdGhlIGVuZCBvZiB0aGUgaW5wdXQgZmlsZS4gV2UgbmVlZCBNQVhfTUFUQ0ggYnl0ZXNcbiAgICAgKiBmb3IgdGhlIG5leHQgbWF0Y2gsIHBsdXMgTUlOX01BVENIIGJ5dGVzIHRvIGluc2VydCB0aGVcbiAgICAgKiBzdHJpbmcgZm9sbG93aW5nIHRoZSBuZXh0IG1hdGNoLlxuICAgICAqL1xuICAgIGlmIChzLmxvb2thaGVhZCA8IE1JTl9MT09LQUhFQUQpIHtcbiAgICAgIGZpbGxfd2luZG93KHMpO1xuICAgICAgaWYgKHMubG9va2FoZWFkIDwgTUlOX0xPT0tBSEVBRCAmJiBmbHVzaCA9PT0gWl9OT19GTFVTSCkge1xuICAgICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgICAgfVxuICAgICAgaWYgKHMubG9va2FoZWFkID09PSAwKSB7IGJyZWFrOyB9IC8qIGZsdXNoIHRoZSBjdXJyZW50IGJsb2NrICovXG4gICAgfVxuXG4gICAgLyogSW5zZXJ0IHRoZSBzdHJpbmcgd2luZG93W3N0cnN0YXJ0IC4uIHN0cnN0YXJ0KzJdIGluIHRoZVxuICAgICAqIGRpY3Rpb25hcnksIGFuZCBzZXQgaGFzaF9oZWFkIHRvIHRoZSBoZWFkIG9mIHRoZSBoYXNoIGNoYWluOlxuICAgICAqL1xuICAgIGhhc2hfaGVhZCA9IDAvKk5JTCovO1xuICAgIGlmIChzLmxvb2thaGVhZCA+PSBNSU5fTUFUQ0gpIHtcbiAgICAgIC8qKiogSU5TRVJUX1NUUklORyhzLCBzLnN0cnN0YXJ0LCBoYXNoX2hlYWQpOyAqKiovXG4gICAgICBzLmluc19oID0gKChzLmluc19oIDw8IHMuaGFzaF9zaGlmdCkgXiBzLndpbmRvd1tzLnN0cnN0YXJ0ICsgTUlOX01BVENIIC0gMV0pICYgcy5oYXNoX21hc2s7XG4gICAgICBoYXNoX2hlYWQgPSBzLnByZXZbcy5zdHJzdGFydCAmIHMud19tYXNrXSA9IHMuaGVhZFtzLmluc19oXTtcbiAgICAgIHMuaGVhZFtzLmluc19oXSA9IHMuc3Ryc3RhcnQ7XG4gICAgICAvKioqL1xuICAgIH1cblxuICAgIC8qIEZpbmQgdGhlIGxvbmdlc3QgbWF0Y2gsIGRpc2NhcmRpbmcgdGhvc2UgPD0gcHJldl9sZW5ndGguXG4gICAgICovXG4gICAgcy5wcmV2X2xlbmd0aCA9IHMubWF0Y2hfbGVuZ3RoO1xuICAgIHMucHJldl9tYXRjaCA9IHMubWF0Y2hfc3RhcnQ7XG4gICAgcy5tYXRjaF9sZW5ndGggPSBNSU5fTUFUQ0ggLSAxO1xuXG4gICAgaWYgKGhhc2hfaGVhZCAhPT0gMC8qTklMKi8gJiYgcy5wcmV2X2xlbmd0aCA8IHMubWF4X2xhenlfbWF0Y2ggJiZcbiAgICAgICAgcy5zdHJzdGFydCAtIGhhc2hfaGVhZCA8PSAocy53X3NpemUgLSBNSU5fTE9PS0FIRUFEKS8qTUFYX0RJU1QocykqLykge1xuICAgICAgLyogVG8gc2ltcGxpZnkgdGhlIGNvZGUsIHdlIHByZXZlbnQgbWF0Y2hlcyB3aXRoIHRoZSBzdHJpbmdcbiAgICAgICAqIG9mIHdpbmRvdyBpbmRleCAwIChpbiBwYXJ0aWN1bGFyIHdlIGhhdmUgdG8gYXZvaWQgYSBtYXRjaFxuICAgICAgICogb2YgdGhlIHN0cmluZyB3aXRoIGl0c2VsZiBhdCB0aGUgc3RhcnQgb2YgdGhlIGlucHV0IGZpbGUpLlxuICAgICAgICovXG4gICAgICBzLm1hdGNoX2xlbmd0aCA9IGxvbmdlc3RfbWF0Y2gocywgaGFzaF9oZWFkKTtcbiAgICAgIC8qIGxvbmdlc3RfbWF0Y2goKSBzZXRzIG1hdGNoX3N0YXJ0ICovXG5cbiAgICAgIGlmIChzLm1hdGNoX2xlbmd0aCA8PSA1ICYmXG4gICAgICAgICAocy5zdHJhdGVneSA9PT0gWl9GSUxURVJFRCB8fCAocy5tYXRjaF9sZW5ndGggPT09IE1JTl9NQVRDSCAmJiBzLnN0cnN0YXJ0IC0gcy5tYXRjaF9zdGFydCA+IDQwOTYvKlRPT19GQVIqLykpKSB7XG5cbiAgICAgICAgLyogSWYgcHJldl9tYXRjaCBpcyBhbHNvIE1JTl9NQVRDSCwgbWF0Y2hfc3RhcnQgaXMgZ2FyYmFnZVxuICAgICAgICAgKiBidXQgd2Ugd2lsbCBpZ25vcmUgdGhlIGN1cnJlbnQgbWF0Y2ggYW55d2F5LlxuICAgICAgICAgKi9cbiAgICAgICAgcy5tYXRjaF9sZW5ndGggPSBNSU5fTUFUQ0ggLSAxO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiBJZiB0aGVyZSB3YXMgYSBtYXRjaCBhdCB0aGUgcHJldmlvdXMgc3RlcCBhbmQgdGhlIGN1cnJlbnRcbiAgICAgKiBtYXRjaCBpcyBub3QgYmV0dGVyLCBvdXRwdXQgdGhlIHByZXZpb3VzIG1hdGNoOlxuICAgICAqL1xuICAgIGlmIChzLnByZXZfbGVuZ3RoID49IE1JTl9NQVRDSCAmJiBzLm1hdGNoX2xlbmd0aCA8PSBzLnByZXZfbGVuZ3RoKSB7XG4gICAgICBtYXhfaW5zZXJ0ID0gcy5zdHJzdGFydCArIHMubG9va2FoZWFkIC0gTUlOX01BVENIO1xuICAgICAgLyogRG8gbm90IGluc2VydCBzdHJpbmdzIGluIGhhc2ggdGFibGUgYmV5b25kIHRoaXMuICovXG5cbiAgICAgIC8vY2hlY2tfbWF0Y2gocywgcy5zdHJzdGFydC0xLCBzLnByZXZfbWF0Y2gsIHMucHJldl9sZW5ndGgpO1xuXG4gICAgICAvKioqX3RyX3RhbGx5X2Rpc3Qocywgcy5zdHJzdGFydCAtIDEgLSBzLnByZXZfbWF0Y2gsXG4gICAgICAgICAgICAgICAgICAgICBzLnByZXZfbGVuZ3RoIC0gTUlOX01BVENILCBiZmx1c2gpOyoqKi9cbiAgICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCBzLnN0cnN0YXJ0IC0gMSAtIHMucHJldl9tYXRjaCwgcy5wcmV2X2xlbmd0aCAtIE1JTl9NQVRDSCk7XG4gICAgICAvKiBJbnNlcnQgaW4gaGFzaCB0YWJsZSBhbGwgc3RyaW5ncyB1cCB0byB0aGUgZW5kIG9mIHRoZSBtYXRjaC5cbiAgICAgICAqIHN0cnN0YXJ0LTEgYW5kIHN0cnN0YXJ0IGFyZSBhbHJlYWR5IGluc2VydGVkLiBJZiB0aGVyZSBpcyBub3RcbiAgICAgICAqIGVub3VnaCBsb29rYWhlYWQsIHRoZSBsYXN0IHR3byBzdHJpbmdzIGFyZSBub3QgaW5zZXJ0ZWQgaW5cbiAgICAgICAqIHRoZSBoYXNoIHRhYmxlLlxuICAgICAgICovXG4gICAgICBzLmxvb2thaGVhZCAtPSBzLnByZXZfbGVuZ3RoIC0gMTtcbiAgICAgIHMucHJldl9sZW5ndGggLT0gMjtcbiAgICAgIGRvIHtcbiAgICAgICAgaWYgKCsrcy5zdHJzdGFydCA8PSBtYXhfaW5zZXJ0KSB7XG4gICAgICAgICAgLyoqKiBJTlNFUlRfU1RSSU5HKHMsIHMuc3Ryc3RhcnQsIGhhc2hfaGVhZCk7ICoqKi9cbiAgICAgICAgICBzLmluc19oID0gKChzLmluc19oIDw8IHMuaGFzaF9zaGlmdCkgXiBzLndpbmRvd1tzLnN0cnN0YXJ0ICsgTUlOX01BVENIIC0gMV0pICYgcy5oYXNoX21hc2s7XG4gICAgICAgICAgaGFzaF9oZWFkID0gcy5wcmV2W3Muc3Ryc3RhcnQgJiBzLndfbWFza10gPSBzLmhlYWRbcy5pbnNfaF07XG4gICAgICAgICAgcy5oZWFkW3MuaW5zX2hdID0gcy5zdHJzdGFydDtcbiAgICAgICAgICAvKioqL1xuICAgICAgICB9XG4gICAgICB9IHdoaWxlICgtLXMucHJldl9sZW5ndGggIT09IDApO1xuICAgICAgcy5tYXRjaF9hdmFpbGFibGUgPSAwO1xuICAgICAgcy5tYXRjaF9sZW5ndGggPSBNSU5fTUFUQ0ggLSAxO1xuICAgICAgcy5zdHJzdGFydCsrO1xuXG4gICAgICBpZiAoYmZsdXNoKSB7XG4gICAgICAgIC8qKiogRkxVU0hfQkxPQ0socywgMCk7ICoqKi9cbiAgICAgICAgZmx1c2hfYmxvY2tfb25seShzLCBmYWxzZSk7XG4gICAgICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgICAgfVxuICAgICAgICAvKioqL1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmIChzLm1hdGNoX2F2YWlsYWJsZSkge1xuICAgICAgLyogSWYgdGhlcmUgd2FzIG5vIG1hdGNoIGF0IHRoZSBwcmV2aW91cyBwb3NpdGlvbiwgb3V0cHV0IGFcbiAgICAgICAqIHNpbmdsZSBsaXRlcmFsLiBJZiB0aGVyZSB3YXMgYSBtYXRjaCBidXQgdGhlIGN1cnJlbnQgbWF0Y2hcbiAgICAgICAqIGlzIGxvbmdlciwgdHJ1bmNhdGUgdGhlIHByZXZpb3VzIG1hdGNoIHRvIGEgc2luZ2xlIGxpdGVyYWwuXG4gICAgICAgKi9cbiAgICAgIC8vVHJhY2V2digoc3RkZXJyLFwiJWNcIiwgcy0+d2luZG93W3MtPnN0cnN0YXJ0LTFdKSk7XG4gICAgICAvKioqIF90cl90YWxseV9saXQocywgcy53aW5kb3dbcy5zdHJzdGFydC0xXSwgYmZsdXNoKTsgKioqL1xuICAgICAgYmZsdXNoID0gdHJlZXMuX3RyX3RhbGx5KHMsIDAsIHMud2luZG93W3Muc3Ryc3RhcnQgLSAxXSk7XG5cbiAgICAgIGlmIChiZmx1c2gpIHtcbiAgICAgICAgLyoqKiBGTFVTSF9CTE9DS19PTkxZKHMsIDApICoqKi9cbiAgICAgICAgZmx1c2hfYmxvY2tfb25seShzLCBmYWxzZSk7XG4gICAgICAgIC8qKiovXG4gICAgICB9XG4gICAgICBzLnN0cnN0YXJ0Kys7XG4gICAgICBzLmxvb2thaGVhZC0tO1xuICAgICAgaWYgKHMuc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLyogVGhlcmUgaXMgbm8gcHJldmlvdXMgbWF0Y2ggdG8gY29tcGFyZSB3aXRoLCB3YWl0IGZvclxuICAgICAgICogdGhlIG5leHQgc3RlcCB0byBkZWNpZGUuXG4gICAgICAgKi9cbiAgICAgIHMubWF0Y2hfYXZhaWxhYmxlID0gMTtcbiAgICAgIHMuc3Ryc3RhcnQrKztcbiAgICAgIHMubG9va2FoZWFkLS07XG4gICAgfVxuICB9XG4gIC8vQXNzZXJ0IChmbHVzaCAhPSBaX05PX0ZMVVNILCBcIm5vIGZsdXNoP1wiKTtcbiAgaWYgKHMubWF0Y2hfYXZhaWxhYmxlKSB7XG4gICAgLy9UcmFjZXZ2KChzdGRlcnIsXCIlY1wiLCBzLT53aW5kb3dbcy0+c3Ryc3RhcnQtMV0pKTtcbiAgICAvKioqIF90cl90YWxseV9saXQocywgcy53aW5kb3dbcy5zdHJzdGFydC0xXSwgYmZsdXNoKTsgKioqL1xuICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCAwLCBzLndpbmRvd1tzLnN0cnN0YXJ0IC0gMV0pO1xuXG4gICAgcy5tYXRjaF9hdmFpbGFibGUgPSAwO1xuICB9XG4gIHMuaW5zZXJ0ID0gcy5zdHJzdGFydCA8IE1JTl9NQVRDSCAtIDEgPyBzLnN0cnN0YXJ0IDogTUlOX01BVENIIC0gMTtcbiAgaWYgKGZsdXNoID09PSBaX0ZJTklTSCkge1xuICAgIC8qKiogRkxVU0hfQkxPQ0socywgMSk7ICoqKi9cbiAgICBmbHVzaF9ibG9ja19vbmx5KHMsIHRydWUpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfRklOSVNIX1NUQVJURUQ7XG4gICAgfVxuICAgIC8qKiovXG4gICAgcmV0dXJuIEJTX0ZJTklTSF9ET05FO1xuICB9XG4gIGlmIChzLmxhc3RfbGl0KSB7XG4gICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAwKTsgKioqL1xuICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgIH1cbiAgICAvKioqL1xuICB9XG5cbiAgcmV0dXJuIEJTX0JMT0NLX0RPTkU7XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBGb3IgWl9STEUsIHNpbXBseSBsb29rIGZvciBydW5zIG9mIGJ5dGVzLCBnZW5lcmF0ZSBtYXRjaGVzIG9ubHkgb2YgZGlzdGFuY2VcbiAqIG9uZS4gIERvIG5vdCBtYWludGFpbiBhIGhhc2ggdGFibGUuICAoSXQgd2lsbCBiZSByZWdlbmVyYXRlZCBpZiB0aGlzIHJ1biBvZlxuICogZGVmbGF0ZSBzd2l0Y2hlcyBhd2F5IGZyb20gWl9STEUuKVxuICovXG5mdW5jdGlvbiBkZWZsYXRlX3JsZShzLCBmbHVzaCkge1xuICB2YXIgYmZsdXNoOyAgICAgICAgICAgIC8qIHNldCBpZiBjdXJyZW50IGJsb2NrIG11c3QgYmUgZmx1c2hlZCAqL1xuICB2YXIgcHJldjsgICAgICAgICAgICAgIC8qIGJ5dGUgYXQgZGlzdGFuY2Ugb25lIHRvIG1hdGNoICovXG4gIHZhciBzY2FuLCBzdHJlbmQ7ICAgICAgLyogc2NhbiBnb2VzIHVwIHRvIHN0cmVuZCBmb3IgbGVuZ3RoIG9mIHJ1biAqL1xuXG4gIHZhciBfd2luID0gcy53aW5kb3c7XG5cbiAgZm9yICg7Oykge1xuICAgIC8qIE1ha2Ugc3VyZSB0aGF0IHdlIGFsd2F5cyBoYXZlIGVub3VnaCBsb29rYWhlYWQsIGV4Y2VwdFxuICAgICAqIGF0IHRoZSBlbmQgb2YgdGhlIGlucHV0IGZpbGUuIFdlIG5lZWQgTUFYX01BVENIIGJ5dGVzXG4gICAgICogZm9yIHRoZSBsb25nZXN0IHJ1biwgcGx1cyBvbmUgZm9yIHRoZSB1bnJvbGxlZCBsb29wLlxuICAgICAqL1xuICAgIGlmIChzLmxvb2thaGVhZCA8PSBNQVhfTUFUQ0gpIHtcbiAgICAgIGZpbGxfd2luZG93KHMpO1xuICAgICAgaWYgKHMubG9va2FoZWFkIDw9IE1BWF9NQVRDSCAmJiBmbHVzaCA9PT0gWl9OT19GTFVTSCkge1xuICAgICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgICAgfVxuICAgICAgaWYgKHMubG9va2FoZWFkID09PSAwKSB7IGJyZWFrOyB9IC8qIGZsdXNoIHRoZSBjdXJyZW50IGJsb2NrICovXG4gICAgfVxuXG4gICAgLyogU2VlIGhvdyBtYW55IHRpbWVzIHRoZSBwcmV2aW91cyBieXRlIHJlcGVhdHMgKi9cbiAgICBzLm1hdGNoX2xlbmd0aCA9IDA7XG4gICAgaWYgKHMubG9va2FoZWFkID49IE1JTl9NQVRDSCAmJiBzLnN0cnN0YXJ0ID4gMCkge1xuICAgICAgc2NhbiA9IHMuc3Ryc3RhcnQgLSAxO1xuICAgICAgcHJldiA9IF93aW5bc2Nhbl07XG4gICAgICBpZiAocHJldiA9PT0gX3dpblsrK3NjYW5dICYmIHByZXYgPT09IF93aW5bKytzY2FuXSAmJiBwcmV2ID09PSBfd2luWysrc2Nhbl0pIHtcbiAgICAgICAgc3RyZW5kID0gcy5zdHJzdGFydCArIE1BWF9NQVRDSDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIC8qanNoaW50IG5vZW1wdHk6ZmFsc2UqL1xuICAgICAgICB9IHdoaWxlIChwcmV2ID09PSBfd2luWysrc2Nhbl0gJiYgcHJldiA9PT0gX3dpblsrK3NjYW5dICYmXG4gICAgICAgICAgICAgICAgIHByZXYgPT09IF93aW5bKytzY2FuXSAmJiBwcmV2ID09PSBfd2luWysrc2Nhbl0gJiZcbiAgICAgICAgICAgICAgICAgcHJldiA9PT0gX3dpblsrK3NjYW5dICYmIHByZXYgPT09IF93aW5bKytzY2FuXSAmJlxuICAgICAgICAgICAgICAgICBwcmV2ID09PSBfd2luWysrc2Nhbl0gJiYgcHJldiA9PT0gX3dpblsrK3NjYW5dICYmXG4gICAgICAgICAgICAgICAgIHNjYW4gPCBzdHJlbmQpO1xuICAgICAgICBzLm1hdGNoX2xlbmd0aCA9IE1BWF9NQVRDSCAtIChzdHJlbmQgLSBzY2FuKTtcbiAgICAgICAgaWYgKHMubWF0Y2hfbGVuZ3RoID4gcy5sb29rYWhlYWQpIHtcbiAgICAgICAgICBzLm1hdGNoX2xlbmd0aCA9IHMubG9va2FoZWFkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvL0Fzc2VydChzY2FuIDw9IHMtPndpbmRvdysodUludCkocy0+d2luZG93X3NpemUtMSksIFwid2lsZCBzY2FuXCIpO1xuICAgIH1cblxuICAgIC8qIEVtaXQgbWF0Y2ggaWYgaGF2ZSBydW4gb2YgTUlOX01BVENIIG9yIGxvbmdlciwgZWxzZSBlbWl0IGxpdGVyYWwgKi9cbiAgICBpZiAocy5tYXRjaF9sZW5ndGggPj0gTUlOX01BVENIKSB7XG4gICAgICAvL2NoZWNrX21hdGNoKHMsIHMuc3Ryc3RhcnQsIHMuc3Ryc3RhcnQgLSAxLCBzLm1hdGNoX2xlbmd0aCk7XG5cbiAgICAgIC8qKiogX3RyX3RhbGx5X2Rpc3QocywgMSwgcy5tYXRjaF9sZW5ndGggLSBNSU5fTUFUQ0gsIGJmbHVzaCk7ICoqKi9cbiAgICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCAxLCBzLm1hdGNoX2xlbmd0aCAtIE1JTl9NQVRDSCk7XG5cbiAgICAgIHMubG9va2FoZWFkIC09IHMubWF0Y2hfbGVuZ3RoO1xuICAgICAgcy5zdHJzdGFydCArPSBzLm1hdGNoX2xlbmd0aDtcbiAgICAgIHMubWF0Y2hfbGVuZ3RoID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgLyogTm8gbWF0Y2gsIG91dHB1dCBhIGxpdGVyYWwgYnl0ZSAqL1xuICAgICAgLy9UcmFjZXZ2KChzdGRlcnIsXCIlY1wiLCBzLT53aW5kb3dbcy0+c3Ryc3RhcnRdKSk7XG4gICAgICAvKioqIF90cl90YWxseV9saXQocywgcy53aW5kb3dbcy5zdHJzdGFydF0sIGJmbHVzaCk7ICoqKi9cbiAgICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCAwLCBzLndpbmRvd1tzLnN0cnN0YXJ0XSk7XG5cbiAgICAgIHMubG9va2FoZWFkLS07XG4gICAgICBzLnN0cnN0YXJ0Kys7XG4gICAgfVxuICAgIGlmIChiZmx1c2gpIHtcbiAgICAgIC8qKiogRkxVU0hfQkxPQ0socywgMCk7ICoqKi9cbiAgICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgICAgaWYgKHMuc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIEJTX05FRURfTU9SRTtcbiAgICAgIH1cbiAgICAgIC8qKiovXG4gICAgfVxuICB9XG4gIHMuaW5zZXJ0ID0gMDtcbiAgaWYgKGZsdXNoID09PSBaX0ZJTklTSCkge1xuICAgIC8qKiogRkxVU0hfQkxPQ0socywgMSk7ICoqKi9cbiAgICBmbHVzaF9ibG9ja19vbmx5KHMsIHRydWUpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfRklOSVNIX1NUQVJURUQ7XG4gICAgfVxuICAgIC8qKiovXG4gICAgcmV0dXJuIEJTX0ZJTklTSF9ET05FO1xuICB9XG4gIGlmIChzLmxhc3RfbGl0KSB7XG4gICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAwKTsgKioqL1xuICAgIGZsdXNoX2Jsb2NrX29ubHkocywgZmFsc2UpO1xuICAgIGlmIChzLnN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgIH1cbiAgICAvKioqL1xuICB9XG4gIHJldHVybiBCU19CTE9DS19ET05FO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEZvciBaX0hVRkZNQU5fT05MWSwgZG8gbm90IGxvb2sgZm9yIG1hdGNoZXMuICBEbyBub3QgbWFpbnRhaW4gYSBoYXNoIHRhYmxlLlxuICogKEl0IHdpbGwgYmUgcmVnZW5lcmF0ZWQgaWYgdGhpcyBydW4gb2YgZGVmbGF0ZSBzd2l0Y2hlcyBhd2F5IGZyb20gSHVmZm1hbi4pXG4gKi9cbmZ1bmN0aW9uIGRlZmxhdGVfaHVmZihzLCBmbHVzaCkge1xuICB2YXIgYmZsdXNoOyAgICAgICAgICAgICAvKiBzZXQgaWYgY3VycmVudCBibG9jayBtdXN0IGJlIGZsdXNoZWQgKi9cblxuICBmb3IgKDs7KSB7XG4gICAgLyogTWFrZSBzdXJlIHRoYXQgd2UgaGF2ZSBhIGxpdGVyYWwgdG8gd3JpdGUuICovXG4gICAgaWYgKHMubG9va2FoZWFkID09PSAwKSB7XG4gICAgICBmaWxsX3dpbmRvdyhzKTtcbiAgICAgIGlmIChzLmxvb2thaGVhZCA9PT0gMCkge1xuICAgICAgICBpZiAoZmx1c2ggPT09IFpfTk9fRkxVU0gpIHtcbiAgICAgICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrOyAgICAgIC8qIGZsdXNoIHRoZSBjdXJyZW50IGJsb2NrICovXG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogT3V0cHV0IGEgbGl0ZXJhbCBieXRlICovXG4gICAgcy5tYXRjaF9sZW5ndGggPSAwO1xuICAgIC8vVHJhY2V2digoc3RkZXJyLFwiJWNcIiwgcy0+d2luZG93W3MtPnN0cnN0YXJ0XSkpO1xuICAgIC8qKiogX3RyX3RhbGx5X2xpdChzLCBzLndpbmRvd1tzLnN0cnN0YXJ0XSwgYmZsdXNoKTsgKioqL1xuICAgIGJmbHVzaCA9IHRyZWVzLl90cl90YWxseShzLCAwLCBzLndpbmRvd1tzLnN0cnN0YXJ0XSk7XG4gICAgcy5sb29rYWhlYWQtLTtcbiAgICBzLnN0cnN0YXJ0Kys7XG4gICAgaWYgKGJmbHVzaCkge1xuICAgICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAwKTsgKioqL1xuICAgICAgZmx1c2hfYmxvY2tfb25seShzLCBmYWxzZSk7XG4gICAgICBpZiAocy5zdHJtLmF2YWlsX291dCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gQlNfTkVFRF9NT1JFO1xuICAgICAgfVxuICAgICAgLyoqKi9cbiAgICB9XG4gIH1cbiAgcy5pbnNlcnQgPSAwO1xuICBpZiAoZmx1c2ggPT09IFpfRklOSVNIKSB7XG4gICAgLyoqKiBGTFVTSF9CTE9DSyhzLCAxKTsgKioqL1xuICAgIGZsdXNoX2Jsb2NrX29ubHkocywgdHJ1ZSk7XG4gICAgaWYgKHMuc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgIHJldHVybiBCU19GSU5JU0hfU1RBUlRFRDtcbiAgICB9XG4gICAgLyoqKi9cbiAgICByZXR1cm4gQlNfRklOSVNIX0RPTkU7XG4gIH1cbiAgaWYgKHMubGFzdF9saXQpIHtcbiAgICAvKioqIEZMVVNIX0JMT0NLKHMsIDApOyAqKiovXG4gICAgZmx1c2hfYmxvY2tfb25seShzLCBmYWxzZSk7XG4gICAgaWYgKHMuc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgIHJldHVybiBCU19ORUVEX01PUkU7XG4gICAgfVxuICAgIC8qKiovXG4gIH1cbiAgcmV0dXJuIEJTX0JMT0NLX0RPTkU7XG59XG5cbi8qIFZhbHVlcyBmb3IgbWF4X2xhenlfbWF0Y2gsIGdvb2RfbWF0Y2ggYW5kIG1heF9jaGFpbl9sZW5ndGgsIGRlcGVuZGluZyBvblxuICogdGhlIGRlc2lyZWQgcGFjayBsZXZlbCAoMC4uOSkuIFRoZSB2YWx1ZXMgZ2l2ZW4gYmVsb3cgaGF2ZSBiZWVuIHR1bmVkIHRvXG4gKiBleGNsdWRlIHdvcnN0IGNhc2UgcGVyZm9ybWFuY2UgZm9yIHBhdGhvbG9naWNhbCBmaWxlcy4gQmV0dGVyIHZhbHVlcyBtYXkgYmVcbiAqIGZvdW5kIGZvciBzcGVjaWZpYyBmaWxlcy5cbiAqL1xuZnVuY3Rpb24gQ29uZmlnKGdvb2RfbGVuZ3RoLCBtYXhfbGF6eSwgbmljZV9sZW5ndGgsIG1heF9jaGFpbiwgZnVuYykge1xuICB0aGlzLmdvb2RfbGVuZ3RoID0gZ29vZF9sZW5ndGg7XG4gIHRoaXMubWF4X2xhenkgPSBtYXhfbGF6eTtcbiAgdGhpcy5uaWNlX2xlbmd0aCA9IG5pY2VfbGVuZ3RoO1xuICB0aGlzLm1heF9jaGFpbiA9IG1heF9jaGFpbjtcbiAgdGhpcy5mdW5jID0gZnVuYztcbn1cblxudmFyIGNvbmZpZ3VyYXRpb25fdGFibGU7XG5cbmNvbmZpZ3VyYXRpb25fdGFibGUgPSBbXG4gIC8qICAgICAgZ29vZCBsYXp5IG5pY2UgY2hhaW4gKi9cbiAgbmV3IENvbmZpZygwLCAwLCAwLCAwLCBkZWZsYXRlX3N0b3JlZCksICAgICAgICAgIC8qIDAgc3RvcmUgb25seSAqL1xuICBuZXcgQ29uZmlnKDQsIDQsIDgsIDQsIGRlZmxhdGVfZmFzdCksICAgICAgICAgICAgLyogMSBtYXggc3BlZWQsIG5vIGxhenkgbWF0Y2hlcyAqL1xuICBuZXcgQ29uZmlnKDQsIDUsIDE2LCA4LCBkZWZsYXRlX2Zhc3QpLCAgICAgICAgICAgLyogMiAqL1xuICBuZXcgQ29uZmlnKDQsIDYsIDMyLCAzMiwgZGVmbGF0ZV9mYXN0KSwgICAgICAgICAgLyogMyAqL1xuXG4gIG5ldyBDb25maWcoNCwgNCwgMTYsIDE2LCBkZWZsYXRlX3Nsb3cpLCAgICAgICAgICAvKiA0IGxhenkgbWF0Y2hlcyAqL1xuICBuZXcgQ29uZmlnKDgsIDE2LCAzMiwgMzIsIGRlZmxhdGVfc2xvdyksICAgICAgICAgLyogNSAqL1xuICBuZXcgQ29uZmlnKDgsIDE2LCAxMjgsIDEyOCwgZGVmbGF0ZV9zbG93KSwgICAgICAgLyogNiAqL1xuICBuZXcgQ29uZmlnKDgsIDMyLCAxMjgsIDI1NiwgZGVmbGF0ZV9zbG93KSwgICAgICAgLyogNyAqL1xuICBuZXcgQ29uZmlnKDMyLCAxMjgsIDI1OCwgMTAyNCwgZGVmbGF0ZV9zbG93KSwgICAgLyogOCAqL1xuICBuZXcgQ29uZmlnKDMyLCAyNTgsIDI1OCwgNDA5NiwgZGVmbGF0ZV9zbG93KSAgICAgLyogOSBtYXggY29tcHJlc3Npb24gKi9cbl07XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBJbml0aWFsaXplIHRoZSBcImxvbmdlc3QgbWF0Y2hcIiByb3V0aW5lcyBmb3IgYSBuZXcgemxpYiBzdHJlYW1cbiAqL1xuZnVuY3Rpb24gbG1faW5pdChzKSB7XG4gIHMud2luZG93X3NpemUgPSAyICogcy53X3NpemU7XG5cbiAgLyoqKiBDTEVBUl9IQVNIKHMpOyAqKiovXG4gIHplcm8ocy5oZWFkKTsgLy8gRmlsbCB3aXRoIE5JTCAoPSAwKTtcblxuICAvKiBTZXQgdGhlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzOlxuICAgKi9cbiAgcy5tYXhfbGF6eV9tYXRjaCA9IGNvbmZpZ3VyYXRpb25fdGFibGVbcy5sZXZlbF0ubWF4X2xhenk7XG4gIHMuZ29vZF9tYXRjaCA9IGNvbmZpZ3VyYXRpb25fdGFibGVbcy5sZXZlbF0uZ29vZF9sZW5ndGg7XG4gIHMubmljZV9tYXRjaCA9IGNvbmZpZ3VyYXRpb25fdGFibGVbcy5sZXZlbF0ubmljZV9sZW5ndGg7XG4gIHMubWF4X2NoYWluX2xlbmd0aCA9IGNvbmZpZ3VyYXRpb25fdGFibGVbcy5sZXZlbF0ubWF4X2NoYWluO1xuXG4gIHMuc3Ryc3RhcnQgPSAwO1xuICBzLmJsb2NrX3N0YXJ0ID0gMDtcbiAgcy5sb29rYWhlYWQgPSAwO1xuICBzLmluc2VydCA9IDA7XG4gIHMubWF0Y2hfbGVuZ3RoID0gcy5wcmV2X2xlbmd0aCA9IE1JTl9NQVRDSCAtIDE7XG4gIHMubWF0Y2hfYXZhaWxhYmxlID0gMDtcbiAgcy5pbnNfaCA9IDA7XG59XG5cblxuZnVuY3Rpb24gRGVmbGF0ZVN0YXRlKCkge1xuICB0aGlzLnN0cm0gPSBudWxsOyAgICAgICAgICAgIC8qIHBvaW50ZXIgYmFjayB0byB0aGlzIHpsaWIgc3RyZWFtICovXG4gIHRoaXMuc3RhdHVzID0gMDsgICAgICAgICAgICAvKiBhcyB0aGUgbmFtZSBpbXBsaWVzICovXG4gIHRoaXMucGVuZGluZ19idWYgPSBudWxsOyAgICAgIC8qIG91dHB1dCBzdGlsbCBwZW5kaW5nICovXG4gIHRoaXMucGVuZGluZ19idWZfc2l6ZSA9IDA7ICAvKiBzaXplIG9mIHBlbmRpbmdfYnVmICovXG4gIHRoaXMucGVuZGluZ19vdXQgPSAwOyAgICAgICAvKiBuZXh0IHBlbmRpbmcgYnl0ZSB0byBvdXRwdXQgdG8gdGhlIHN0cmVhbSAqL1xuICB0aGlzLnBlbmRpbmcgPSAwOyAgICAgICAgICAgLyogbmIgb2YgYnl0ZXMgaW4gdGhlIHBlbmRpbmcgYnVmZmVyICovXG4gIHRoaXMud3JhcCA9IDA7ICAgICAgICAgICAgICAvKiBiaXQgMCB0cnVlIGZvciB6bGliLCBiaXQgMSB0cnVlIGZvciBnemlwICovXG4gIHRoaXMuZ3poZWFkID0gbnVsbDsgICAgICAgICAvKiBnemlwIGhlYWRlciBpbmZvcm1hdGlvbiB0byB3cml0ZSAqL1xuICB0aGlzLmd6aW5kZXggPSAwOyAgICAgICAgICAgLyogd2hlcmUgaW4gZXh0cmEsIG5hbWUsIG9yIGNvbW1lbnQgKi9cbiAgdGhpcy5tZXRob2QgPSBaX0RFRkxBVEVEOyAvKiBjYW4gb25seSBiZSBERUZMQVRFRCAqL1xuICB0aGlzLmxhc3RfZmx1c2ggPSAtMTsgICAvKiB2YWx1ZSBvZiBmbHVzaCBwYXJhbSBmb3IgcHJldmlvdXMgZGVmbGF0ZSBjYWxsICovXG5cbiAgdGhpcy53X3NpemUgPSAwOyAgLyogTFo3NyB3aW5kb3cgc2l6ZSAoMzJLIGJ5IGRlZmF1bHQpICovXG4gIHRoaXMud19iaXRzID0gMDsgIC8qIGxvZzIod19zaXplKSAgKDguLjE2KSAqL1xuICB0aGlzLndfbWFzayA9IDA7ICAvKiB3X3NpemUgLSAxICovXG5cbiAgdGhpcy53aW5kb3cgPSBudWxsO1xuICAvKiBTbGlkaW5nIHdpbmRvdy4gSW5wdXQgYnl0ZXMgYXJlIHJlYWQgaW50byB0aGUgc2Vjb25kIGhhbGYgb2YgdGhlIHdpbmRvdyxcbiAgICogYW5kIG1vdmUgdG8gdGhlIGZpcnN0IGhhbGYgbGF0ZXIgdG8ga2VlcCBhIGRpY3Rpb25hcnkgb2YgYXQgbGVhc3Qgd1NpemVcbiAgICogYnl0ZXMuIFdpdGggdGhpcyBvcmdhbml6YXRpb24sIG1hdGNoZXMgYXJlIGxpbWl0ZWQgdG8gYSBkaXN0YW5jZSBvZlxuICAgKiB3U2l6ZS1NQVhfTUFUQ0ggYnl0ZXMsIGJ1dCB0aGlzIGVuc3VyZXMgdGhhdCBJTyBpcyBhbHdheXNcbiAgICogcGVyZm9ybWVkIHdpdGggYSBsZW5ndGggbXVsdGlwbGUgb2YgdGhlIGJsb2NrIHNpemUuXG4gICAqL1xuXG4gIHRoaXMud2luZG93X3NpemUgPSAwO1xuICAvKiBBY3R1YWwgc2l6ZSBvZiB3aW5kb3c6IDIqd1NpemUsIGV4Y2VwdCB3aGVuIHRoZSB1c2VyIGlucHV0IGJ1ZmZlclxuICAgKiBpcyBkaXJlY3RseSB1c2VkIGFzIHNsaWRpbmcgd2luZG93LlxuICAgKi9cblxuICB0aGlzLnByZXYgPSBudWxsO1xuICAvKiBMaW5rIHRvIG9sZGVyIHN0cmluZyB3aXRoIHNhbWUgaGFzaCBpbmRleC4gVG8gbGltaXQgdGhlIHNpemUgb2YgdGhpc1xuICAgKiBhcnJheSB0byA2NEssIHRoaXMgbGluayBpcyBtYWludGFpbmVkIG9ubHkgZm9yIHRoZSBsYXN0IDMySyBzdHJpbmdzLlxuICAgKiBBbiBpbmRleCBpbiB0aGlzIGFycmF5IGlzIHRodXMgYSB3aW5kb3cgaW5kZXggbW9kdWxvIDMySy5cbiAgICovXG5cbiAgdGhpcy5oZWFkID0gbnVsbDsgICAvKiBIZWFkcyBvZiB0aGUgaGFzaCBjaGFpbnMgb3IgTklMLiAqL1xuXG4gIHRoaXMuaW5zX2ggPSAwOyAgICAgICAvKiBoYXNoIGluZGV4IG9mIHN0cmluZyB0byBiZSBpbnNlcnRlZCAqL1xuICB0aGlzLmhhc2hfc2l6ZSA9IDA7ICAgLyogbnVtYmVyIG9mIGVsZW1lbnRzIGluIGhhc2ggdGFibGUgKi9cbiAgdGhpcy5oYXNoX2JpdHMgPSAwOyAgIC8qIGxvZzIoaGFzaF9zaXplKSAqL1xuICB0aGlzLmhhc2hfbWFzayA9IDA7ICAgLyogaGFzaF9zaXplLTEgKi9cblxuICB0aGlzLmhhc2hfc2hpZnQgPSAwO1xuICAvKiBOdW1iZXIgb2YgYml0cyBieSB3aGljaCBpbnNfaCBtdXN0IGJlIHNoaWZ0ZWQgYXQgZWFjaCBpbnB1dFxuICAgKiBzdGVwLiBJdCBtdXN0IGJlIHN1Y2ggdGhhdCBhZnRlciBNSU5fTUFUQ0ggc3RlcHMsIHRoZSBvbGRlc3RcbiAgICogYnl0ZSBubyBsb25nZXIgdGFrZXMgcGFydCBpbiB0aGUgaGFzaCBrZXksIHRoYXQgaXM6XG4gICAqICAgaGFzaF9zaGlmdCAqIE1JTl9NQVRDSCA+PSBoYXNoX2JpdHNcbiAgICovXG5cbiAgdGhpcy5ibG9ja19zdGFydCA9IDA7XG4gIC8qIFdpbmRvdyBwb3NpdGlvbiBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBjdXJyZW50IG91dHB1dCBibG9jay4gR2V0c1xuICAgKiBuZWdhdGl2ZSB3aGVuIHRoZSB3aW5kb3cgaXMgbW92ZWQgYmFja3dhcmRzLlxuICAgKi9cblxuICB0aGlzLm1hdGNoX2xlbmd0aCA9IDA7ICAgICAgLyogbGVuZ3RoIG9mIGJlc3QgbWF0Y2ggKi9cbiAgdGhpcy5wcmV2X21hdGNoID0gMDsgICAgICAgIC8qIHByZXZpb3VzIG1hdGNoICovXG4gIHRoaXMubWF0Y2hfYXZhaWxhYmxlID0gMDsgICAvKiBzZXQgaWYgcHJldmlvdXMgbWF0Y2ggZXhpc3RzICovXG4gIHRoaXMuc3Ryc3RhcnQgPSAwOyAgICAgICAgICAvKiBzdGFydCBvZiBzdHJpbmcgdG8gaW5zZXJ0ICovXG4gIHRoaXMubWF0Y2hfc3RhcnQgPSAwOyAgICAgICAvKiBzdGFydCBvZiBtYXRjaGluZyBzdHJpbmcgKi9cbiAgdGhpcy5sb29rYWhlYWQgPSAwOyAgICAgICAgIC8qIG51bWJlciBvZiB2YWxpZCBieXRlcyBhaGVhZCBpbiB3aW5kb3cgKi9cblxuICB0aGlzLnByZXZfbGVuZ3RoID0gMDtcbiAgLyogTGVuZ3RoIG9mIHRoZSBiZXN0IG1hdGNoIGF0IHByZXZpb3VzIHN0ZXAuIE1hdGNoZXMgbm90IGdyZWF0ZXIgdGhhbiB0aGlzXG4gICAqIGFyZSBkaXNjYXJkZWQuIFRoaXMgaXMgdXNlZCBpbiB0aGUgbGF6eSBtYXRjaCBldmFsdWF0aW9uLlxuICAgKi9cblxuICB0aGlzLm1heF9jaGFpbl9sZW5ndGggPSAwO1xuICAvKiBUbyBzcGVlZCB1cCBkZWZsYXRpb24sIGhhc2ggY2hhaW5zIGFyZSBuZXZlciBzZWFyY2hlZCBiZXlvbmQgdGhpc1xuICAgKiBsZW5ndGguICBBIGhpZ2hlciBsaW1pdCBpbXByb3ZlcyBjb21wcmVzc2lvbiByYXRpbyBidXQgZGVncmFkZXMgdGhlXG4gICAqIHNwZWVkLlxuICAgKi9cblxuICB0aGlzLm1heF9sYXp5X21hdGNoID0gMDtcbiAgLyogQXR0ZW1wdCB0byBmaW5kIGEgYmV0dGVyIG1hdGNoIG9ubHkgd2hlbiB0aGUgY3VycmVudCBtYXRjaCBpcyBzdHJpY3RseVxuICAgKiBzbWFsbGVyIHRoYW4gdGhpcyB2YWx1ZS4gVGhpcyBtZWNoYW5pc20gaXMgdXNlZCBvbmx5IGZvciBjb21wcmVzc2lvblxuICAgKiBsZXZlbHMgPj0gNC5cbiAgICovXG4gIC8vIFRoYXQncyBhbGlhcyB0byBtYXhfbGF6eV9tYXRjaCwgZG9uJ3QgdXNlIGRpcmVjdGx5XG4gIC8vdGhpcy5tYXhfaW5zZXJ0X2xlbmd0aCA9IDA7XG4gIC8qIEluc2VydCBuZXcgc3RyaW5ncyBpbiB0aGUgaGFzaCB0YWJsZSBvbmx5IGlmIHRoZSBtYXRjaCBsZW5ndGggaXMgbm90XG4gICAqIGdyZWF0ZXIgdGhhbiB0aGlzIGxlbmd0aC4gVGhpcyBzYXZlcyB0aW1lIGJ1dCBkZWdyYWRlcyBjb21wcmVzc2lvbi5cbiAgICogbWF4X2luc2VydF9sZW5ndGggaXMgdXNlZCBvbmx5IGZvciBjb21wcmVzc2lvbiBsZXZlbHMgPD0gMy5cbiAgICovXG5cbiAgdGhpcy5sZXZlbCA9IDA7ICAgICAvKiBjb21wcmVzc2lvbiBsZXZlbCAoMS4uOSkgKi9cbiAgdGhpcy5zdHJhdGVneSA9IDA7ICAvKiBmYXZvciBvciBmb3JjZSBIdWZmbWFuIGNvZGluZyovXG5cbiAgdGhpcy5nb29kX21hdGNoID0gMDtcbiAgLyogVXNlIGEgZmFzdGVyIHNlYXJjaCB3aGVuIHRoZSBwcmV2aW91cyBtYXRjaCBpcyBsb25nZXIgdGhhbiB0aGlzICovXG5cbiAgdGhpcy5uaWNlX21hdGNoID0gMDsgLyogU3RvcCBzZWFyY2hpbmcgd2hlbiBjdXJyZW50IG1hdGNoIGV4Y2VlZHMgdGhpcyAqL1xuXG4gICAgICAgICAgICAgIC8qIHVzZWQgYnkgdHJlZXMuYzogKi9cblxuICAvKiBEaWRuJ3QgdXNlIGN0X2RhdGEgdHlwZWRlZiBiZWxvdyB0byBzdXBwcmVzcyBjb21waWxlciB3YXJuaW5nICovXG5cbiAgLy8gc3RydWN0IGN0X2RhdGFfcyBkeW5fbHRyZWVbSEVBUF9TSVpFXTsgICAvKiBsaXRlcmFsIGFuZCBsZW5ndGggdHJlZSAqL1xuICAvLyBzdHJ1Y3QgY3RfZGF0YV9zIGR5bl9kdHJlZVsyKkRfQ09ERVMrMV07IC8qIGRpc3RhbmNlIHRyZWUgKi9cbiAgLy8gc3RydWN0IGN0X2RhdGFfcyBibF90cmVlWzIqQkxfQ09ERVMrMV07ICAvKiBIdWZmbWFuIHRyZWUgZm9yIGJpdCBsZW5ndGhzICovXG5cbiAgLy8gVXNlIGZsYXQgYXJyYXkgb2YgRE9VQkxFIHNpemUsIHdpdGggaW50ZXJsZWF2ZWQgZmF0YSxcbiAgLy8gYmVjYXVzZSBKUyBkb2VzIG5vdCBzdXBwb3J0IGVmZmVjdGl2ZVxuICB0aGlzLmR5bl9sdHJlZSAgPSBuZXcgdXRpbHMuQnVmMTYoSEVBUF9TSVpFICogMik7XG4gIHRoaXMuZHluX2R0cmVlICA9IG5ldyB1dGlscy5CdWYxNigoMiAqIERfQ09ERVMgKyAxKSAqIDIpO1xuICB0aGlzLmJsX3RyZWUgICAgPSBuZXcgdXRpbHMuQnVmMTYoKDIgKiBCTF9DT0RFUyArIDEpICogMik7XG4gIHplcm8odGhpcy5keW5fbHRyZWUpO1xuICB6ZXJvKHRoaXMuZHluX2R0cmVlKTtcbiAgemVybyh0aGlzLmJsX3RyZWUpO1xuXG4gIHRoaXMubF9kZXNjICAgPSBudWxsOyAgICAgICAgIC8qIGRlc2MuIGZvciBsaXRlcmFsIHRyZWUgKi9cbiAgdGhpcy5kX2Rlc2MgICA9IG51bGw7ICAgICAgICAgLyogZGVzYy4gZm9yIGRpc3RhbmNlIHRyZWUgKi9cbiAgdGhpcy5ibF9kZXNjICA9IG51bGw7ICAgICAgICAgLyogZGVzYy4gZm9yIGJpdCBsZW5ndGggdHJlZSAqL1xuXG4gIC8vdXNoIGJsX2NvdW50W01BWF9CSVRTKzFdO1xuICB0aGlzLmJsX2NvdW50ID0gbmV3IHV0aWxzLkJ1ZjE2KE1BWF9CSVRTICsgMSk7XG4gIC8qIG51bWJlciBvZiBjb2RlcyBhdCBlYWNoIGJpdCBsZW5ndGggZm9yIGFuIG9wdGltYWwgdHJlZSAqL1xuXG4gIC8vaW50IGhlYXBbMipMX0NPREVTKzFdOyAgICAgIC8qIGhlYXAgdXNlZCB0byBidWlsZCB0aGUgSHVmZm1hbiB0cmVlcyAqL1xuICB0aGlzLmhlYXAgPSBuZXcgdXRpbHMuQnVmMTYoMiAqIExfQ09ERVMgKyAxKTsgIC8qIGhlYXAgdXNlZCB0byBidWlsZCB0aGUgSHVmZm1hbiB0cmVlcyAqL1xuICB6ZXJvKHRoaXMuaGVhcCk7XG5cbiAgdGhpcy5oZWFwX2xlbiA9IDA7ICAgICAgICAgICAgICAgLyogbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBoZWFwICovXG4gIHRoaXMuaGVhcF9tYXggPSAwOyAgICAgICAgICAgICAgIC8qIGVsZW1lbnQgb2YgbGFyZ2VzdCBmcmVxdWVuY3kgKi9cbiAgLyogVGhlIHNvbnMgb2YgaGVhcFtuXSBhcmUgaGVhcFsyKm5dIGFuZCBoZWFwWzIqbisxXS4gaGVhcFswXSBpcyBub3QgdXNlZC5cbiAgICogVGhlIHNhbWUgaGVhcCBhcnJheSBpcyB1c2VkIHRvIGJ1aWxkIGFsbCB0cmVlcy5cbiAgICovXG5cbiAgdGhpcy5kZXB0aCA9IG5ldyB1dGlscy5CdWYxNigyICogTF9DT0RFUyArIDEpOyAvL3VjaCBkZXB0aFsyKkxfQ09ERVMrMV07XG4gIHplcm8odGhpcy5kZXB0aCk7XG4gIC8qIERlcHRoIG9mIGVhY2ggc3VidHJlZSB1c2VkIGFzIHRpZSBicmVha2VyIGZvciB0cmVlcyBvZiBlcXVhbCBmcmVxdWVuY3lcbiAgICovXG5cbiAgdGhpcy5sX2J1ZiA9IDA7ICAgICAgICAgIC8qIGJ1ZmZlciBpbmRleCBmb3IgbGl0ZXJhbHMgb3IgbGVuZ3RocyAqL1xuXG4gIHRoaXMubGl0X2J1ZnNpemUgPSAwO1xuICAvKiBTaXplIG9mIG1hdGNoIGJ1ZmZlciBmb3IgbGl0ZXJhbHMvbGVuZ3Rocy4gIFRoZXJlIGFyZSA0IHJlYXNvbnMgZm9yXG4gICAqIGxpbWl0aW5nIGxpdF9idWZzaXplIHRvIDY0SzpcbiAgICogICAtIGZyZXF1ZW5jaWVzIGNhbiBiZSBrZXB0IGluIDE2IGJpdCBjb3VudGVyc1xuICAgKiAgIC0gaWYgY29tcHJlc3Npb24gaXMgbm90IHN1Y2Nlc3NmdWwgZm9yIHRoZSBmaXJzdCBibG9jaywgYWxsIGlucHV0XG4gICAqICAgICBkYXRhIGlzIHN0aWxsIGluIHRoZSB3aW5kb3cgc28gd2UgY2FuIHN0aWxsIGVtaXQgYSBzdG9yZWQgYmxvY2sgZXZlblxuICAgKiAgICAgd2hlbiBpbnB1dCBjb21lcyBmcm9tIHN0YW5kYXJkIGlucHV0LiAgKFRoaXMgY2FuIGFsc28gYmUgZG9uZSBmb3JcbiAgICogICAgIGFsbCBibG9ja3MgaWYgbGl0X2J1ZnNpemUgaXMgbm90IGdyZWF0ZXIgdGhhbiAzMksuKVxuICAgKiAgIC0gaWYgY29tcHJlc3Npb24gaXMgbm90IHN1Y2Nlc3NmdWwgZm9yIGEgZmlsZSBzbWFsbGVyIHRoYW4gNjRLLCB3ZSBjYW5cbiAgICogICAgIGV2ZW4gZW1pdCBhIHN0b3JlZCBmaWxlIGluc3RlYWQgb2YgYSBzdG9yZWQgYmxvY2sgKHNhdmluZyA1IGJ5dGVzKS5cbiAgICogICAgIFRoaXMgaXMgYXBwbGljYWJsZSBvbmx5IGZvciB6aXAgKG5vdCBnemlwIG9yIHpsaWIpLlxuICAgKiAgIC0gY3JlYXRpbmcgbmV3IEh1ZmZtYW4gdHJlZXMgbGVzcyBmcmVxdWVudGx5IG1heSBub3QgcHJvdmlkZSBmYXN0XG4gICAqICAgICBhZGFwdGF0aW9uIHRvIGNoYW5nZXMgaW4gdGhlIGlucHV0IGRhdGEgc3RhdGlzdGljcy4gKFRha2UgZm9yXG4gICAqICAgICBleGFtcGxlIGEgYmluYXJ5IGZpbGUgd2l0aCBwb29ybHkgY29tcHJlc3NpYmxlIGNvZGUgZm9sbG93ZWQgYnlcbiAgICogICAgIGEgaGlnaGx5IGNvbXByZXNzaWJsZSBzdHJpbmcgdGFibGUuKSBTbWFsbGVyIGJ1ZmZlciBzaXplcyBnaXZlXG4gICAqICAgICBmYXN0IGFkYXB0YXRpb24gYnV0IGhhdmUgb2YgY291cnNlIHRoZSBvdmVyaGVhZCBvZiB0cmFuc21pdHRpbmdcbiAgICogICAgIHRyZWVzIG1vcmUgZnJlcXVlbnRseS5cbiAgICogICAtIEkgY2FuJ3QgY291bnQgYWJvdmUgNFxuICAgKi9cblxuICB0aGlzLmxhc3RfbGl0ID0gMDsgICAgICAvKiBydW5uaW5nIGluZGV4IGluIGxfYnVmICovXG5cbiAgdGhpcy5kX2J1ZiA9IDA7XG4gIC8qIEJ1ZmZlciBpbmRleCBmb3IgZGlzdGFuY2VzLiBUbyBzaW1wbGlmeSB0aGUgY29kZSwgZF9idWYgYW5kIGxfYnVmIGhhdmVcbiAgICogdGhlIHNhbWUgbnVtYmVyIG9mIGVsZW1lbnRzLiBUbyB1c2UgZGlmZmVyZW50IGxlbmd0aHMsIGFuIGV4dHJhIGZsYWdcbiAgICogYXJyYXkgd291bGQgYmUgbmVjZXNzYXJ5LlxuICAgKi9cblxuICB0aGlzLm9wdF9sZW4gPSAwOyAgICAgICAvKiBiaXQgbGVuZ3RoIG9mIGN1cnJlbnQgYmxvY2sgd2l0aCBvcHRpbWFsIHRyZWVzICovXG4gIHRoaXMuc3RhdGljX2xlbiA9IDA7ICAgIC8qIGJpdCBsZW5ndGggb2YgY3VycmVudCBibG9jayB3aXRoIHN0YXRpYyB0cmVlcyAqL1xuICB0aGlzLm1hdGNoZXMgPSAwOyAgICAgICAvKiBudW1iZXIgb2Ygc3RyaW5nIG1hdGNoZXMgaW4gY3VycmVudCBibG9jayAqL1xuICB0aGlzLmluc2VydCA9IDA7ICAgICAgICAvKiBieXRlcyBhdCBlbmQgb2Ygd2luZG93IGxlZnQgdG8gaW5zZXJ0ICovXG5cblxuICB0aGlzLmJpX2J1ZiA9IDA7XG4gIC8qIE91dHB1dCBidWZmZXIuIGJpdHMgYXJlIGluc2VydGVkIHN0YXJ0aW5nIGF0IHRoZSBib3R0b20gKGxlYXN0XG4gICAqIHNpZ25pZmljYW50IGJpdHMpLlxuICAgKi9cbiAgdGhpcy5iaV92YWxpZCA9IDA7XG4gIC8qIE51bWJlciBvZiB2YWxpZCBiaXRzIGluIGJpX2J1Zi4gIEFsbCBiaXRzIGFib3ZlIHRoZSBsYXN0IHZhbGlkIGJpdFxuICAgKiBhcmUgYWx3YXlzIHplcm8uXG4gICAqL1xuXG4gIC8vIFVzZWQgZm9yIHdpbmRvdyBtZW1vcnkgaW5pdC4gV2Ugc2FmZWx5IGlnbm9yZSBpdCBmb3IgSlMuIFRoYXQgbWFrZXNcbiAgLy8gc2Vuc2Ugb25seSBmb3IgcG9pbnRlcnMgYW5kIG1lbW9yeSBjaGVjayB0b29scy5cbiAgLy90aGlzLmhpZ2hfd2F0ZXIgPSAwO1xuICAvKiBIaWdoIHdhdGVyIG1hcmsgb2Zmc2V0IGluIHdpbmRvdyBmb3IgaW5pdGlhbGl6ZWQgYnl0ZXMgLS0gYnl0ZXMgYWJvdmVcbiAgICogdGhpcyBhcmUgc2V0IHRvIHplcm8gaW4gb3JkZXIgdG8gYXZvaWQgbWVtb3J5IGNoZWNrIHdhcm5pbmdzIHdoZW5cbiAgICogbG9uZ2VzdCBtYXRjaCByb3V0aW5lcyBhY2Nlc3MgYnl0ZXMgcGFzdCB0aGUgaW5wdXQuICBUaGlzIGlzIHRoZW5cbiAgICogdXBkYXRlZCB0byB0aGUgbmV3IGhpZ2ggd2F0ZXIgbWFyay5cbiAgICovXG59XG5cblxuZnVuY3Rpb24gZGVmbGF0ZVJlc2V0S2VlcChzdHJtKSB7XG4gIHZhciBzO1xuXG4gIGlmICghc3RybSB8fCAhc3RybS5zdGF0ZSkge1xuICAgIHJldHVybiBlcnIoc3RybSwgWl9TVFJFQU1fRVJST1IpO1xuICB9XG5cbiAgc3RybS50b3RhbF9pbiA9IHN0cm0udG90YWxfb3V0ID0gMDtcbiAgc3RybS5kYXRhX3R5cGUgPSBaX1VOS05PV047XG5cbiAgcyA9IHN0cm0uc3RhdGU7XG4gIHMucGVuZGluZyA9IDA7XG4gIHMucGVuZGluZ19vdXQgPSAwO1xuXG4gIGlmIChzLndyYXAgPCAwKSB7XG4gICAgcy53cmFwID0gLXMud3JhcDtcbiAgICAvKiB3YXMgbWFkZSBuZWdhdGl2ZSBieSBkZWZsYXRlKC4uLiwgWl9GSU5JU0gpOyAqL1xuICB9XG4gIHMuc3RhdHVzID0gKHMud3JhcCA/IElOSVRfU1RBVEUgOiBCVVNZX1NUQVRFKTtcbiAgc3RybS5hZGxlciA9IChzLndyYXAgPT09IDIpID9cbiAgICAwICAvLyBjcmMzMigwLCBaX05VTEwsIDApXG4gIDpcbiAgICAxOyAvLyBhZGxlcjMyKDAsIFpfTlVMTCwgMClcbiAgcy5sYXN0X2ZsdXNoID0gWl9OT19GTFVTSDtcbiAgdHJlZXMuX3RyX2luaXQocyk7XG4gIHJldHVybiBaX09LO1xufVxuXG5cbmZ1bmN0aW9uIGRlZmxhdGVSZXNldChzdHJtKSB7XG4gIHZhciByZXQgPSBkZWZsYXRlUmVzZXRLZWVwKHN0cm0pO1xuICBpZiAocmV0ID09PSBaX09LKSB7XG4gICAgbG1faW5pdChzdHJtLnN0YXRlKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5cbmZ1bmN0aW9uIGRlZmxhdGVTZXRIZWFkZXIoc3RybSwgaGVhZCkge1xuICBpZiAoIXN0cm0gfHwgIXN0cm0uc3RhdGUpIHsgcmV0dXJuIFpfU1RSRUFNX0VSUk9SOyB9XG4gIGlmIChzdHJtLnN0YXRlLndyYXAgIT09IDIpIHsgcmV0dXJuIFpfU1RSRUFNX0VSUk9SOyB9XG4gIHN0cm0uc3RhdGUuZ3poZWFkID0gaGVhZDtcbiAgcmV0dXJuIFpfT0s7XG59XG5cblxuZnVuY3Rpb24gZGVmbGF0ZUluaXQyKHN0cm0sIGxldmVsLCBtZXRob2QsIHdpbmRvd0JpdHMsIG1lbUxldmVsLCBzdHJhdGVneSkge1xuICBpZiAoIXN0cm0pIHsgLy8gPT09IFpfTlVMTFxuICAgIHJldHVybiBaX1NUUkVBTV9FUlJPUjtcbiAgfVxuICB2YXIgd3JhcCA9IDE7XG5cbiAgaWYgKGxldmVsID09PSBaX0RFRkFVTFRfQ09NUFJFU1NJT04pIHtcbiAgICBsZXZlbCA9IDY7XG4gIH1cblxuICBpZiAod2luZG93Qml0cyA8IDApIHsgLyogc3VwcHJlc3MgemxpYiB3cmFwcGVyICovXG4gICAgd3JhcCA9IDA7XG4gICAgd2luZG93Qml0cyA9IC13aW5kb3dCaXRzO1xuICB9XG5cbiAgZWxzZSBpZiAod2luZG93Qml0cyA+IDE1KSB7XG4gICAgd3JhcCA9IDI7ICAgICAgICAgICAvKiB3cml0ZSBnemlwIHdyYXBwZXIgaW5zdGVhZCAqL1xuICAgIHdpbmRvd0JpdHMgLT0gMTY7XG4gIH1cblxuXG4gIGlmIChtZW1MZXZlbCA8IDEgfHwgbWVtTGV2ZWwgPiBNQVhfTUVNX0xFVkVMIHx8IG1ldGhvZCAhPT0gWl9ERUZMQVRFRCB8fFxuICAgIHdpbmRvd0JpdHMgPCA4IHx8IHdpbmRvd0JpdHMgPiAxNSB8fCBsZXZlbCA8IDAgfHwgbGV2ZWwgPiA5IHx8XG4gICAgc3RyYXRlZ3kgPCAwIHx8IHN0cmF0ZWd5ID4gWl9GSVhFRCkge1xuICAgIHJldHVybiBlcnIoc3RybSwgWl9TVFJFQU1fRVJST1IpO1xuICB9XG5cblxuICBpZiAod2luZG93Qml0cyA9PT0gOCkge1xuICAgIHdpbmRvd0JpdHMgPSA5O1xuICB9XG4gIC8qIHVudGlsIDI1Ni1ieXRlIHdpbmRvdyBidWcgZml4ZWQgKi9cblxuICB2YXIgcyA9IG5ldyBEZWZsYXRlU3RhdGUoKTtcblxuICBzdHJtLnN0YXRlID0gcztcbiAgcy5zdHJtID0gc3RybTtcblxuICBzLndyYXAgPSB3cmFwO1xuICBzLmd6aGVhZCA9IG51bGw7XG4gIHMud19iaXRzID0gd2luZG93Qml0cztcbiAgcy53X3NpemUgPSAxIDw8IHMud19iaXRzO1xuICBzLndfbWFzayA9IHMud19zaXplIC0gMTtcblxuICBzLmhhc2hfYml0cyA9IG1lbUxldmVsICsgNztcbiAgcy5oYXNoX3NpemUgPSAxIDw8IHMuaGFzaF9iaXRzO1xuICBzLmhhc2hfbWFzayA9IHMuaGFzaF9zaXplIC0gMTtcbiAgcy5oYXNoX3NoaWZ0ID0gfn4oKHMuaGFzaF9iaXRzICsgTUlOX01BVENIIC0gMSkgLyBNSU5fTUFUQ0gpO1xuXG4gIHMud2luZG93ID0gbmV3IHV0aWxzLkJ1Zjgocy53X3NpemUgKiAyKTtcbiAgcy5oZWFkID0gbmV3IHV0aWxzLkJ1ZjE2KHMuaGFzaF9zaXplKTtcbiAgcy5wcmV2ID0gbmV3IHV0aWxzLkJ1ZjE2KHMud19zaXplKTtcblxuICAvLyBEb24ndCBuZWVkIG1lbSBpbml0IG1hZ2ljIGZvciBKUy5cbiAgLy9zLmhpZ2hfd2F0ZXIgPSAwOyAgLyogbm90aGluZyB3cml0dGVuIHRvIHMtPndpbmRvdyB5ZXQgKi9cblxuICBzLmxpdF9idWZzaXplID0gMSA8PCAobWVtTGV2ZWwgKyA2KTsgLyogMTZLIGVsZW1lbnRzIGJ5IGRlZmF1bHQgKi9cblxuICBzLnBlbmRpbmdfYnVmX3NpemUgPSBzLmxpdF9idWZzaXplICogNDtcblxuICAvL292ZXJsYXkgPSAodXNoZiAqKSBaQUxMT0Moc3RybSwgcy0+bGl0X2J1ZnNpemUsIHNpemVvZih1c2gpKzIpO1xuICAvL3MtPnBlbmRpbmdfYnVmID0gKHVjaGYgKikgb3ZlcmxheTtcbiAgcy5wZW5kaW5nX2J1ZiA9IG5ldyB1dGlscy5CdWY4KHMucGVuZGluZ19idWZfc2l6ZSk7XG5cbiAgLy8gSXQgaXMgb2Zmc2V0IGZyb20gYHMucGVuZGluZ19idWZgIChzaXplIGlzIGBzLmxpdF9idWZzaXplICogMmApXG4gIC8vcy0+ZF9idWYgPSBvdmVybGF5ICsgcy0+bGl0X2J1ZnNpemUvc2l6ZW9mKHVzaCk7XG4gIHMuZF9idWYgPSAxICogcy5saXRfYnVmc2l6ZTtcblxuICAvL3MtPmxfYnVmID0gcy0+cGVuZGluZ19idWYgKyAoMStzaXplb2YodXNoKSkqcy0+bGl0X2J1ZnNpemU7XG4gIHMubF9idWYgPSAoMSArIDIpICogcy5saXRfYnVmc2l6ZTtcblxuICBzLmxldmVsID0gbGV2ZWw7XG4gIHMuc3RyYXRlZ3kgPSBzdHJhdGVneTtcbiAgcy5tZXRob2QgPSBtZXRob2Q7XG5cbiAgcmV0dXJuIGRlZmxhdGVSZXNldChzdHJtKTtcbn1cblxuZnVuY3Rpb24gZGVmbGF0ZUluaXQoc3RybSwgbGV2ZWwpIHtcbiAgcmV0dXJuIGRlZmxhdGVJbml0MihzdHJtLCBsZXZlbCwgWl9ERUZMQVRFRCwgTUFYX1dCSVRTLCBERUZfTUVNX0xFVkVMLCBaX0RFRkFVTFRfU1RSQVRFR1kpO1xufVxuXG5cbmZ1bmN0aW9uIGRlZmxhdGUoc3RybSwgZmx1c2gpIHtcbiAgdmFyIG9sZF9mbHVzaCwgcztcbiAgdmFyIGJlZywgdmFsOyAvLyBmb3IgZ3ppcCBoZWFkZXIgd3JpdGUgb25seVxuXG4gIGlmICghc3RybSB8fCAhc3RybS5zdGF0ZSB8fFxuICAgIGZsdXNoID4gWl9CTE9DSyB8fCBmbHVzaCA8IDApIHtcbiAgICByZXR1cm4gc3RybSA/IGVycihzdHJtLCBaX1NUUkVBTV9FUlJPUikgOiBaX1NUUkVBTV9FUlJPUjtcbiAgfVxuXG4gIHMgPSBzdHJtLnN0YXRlO1xuXG4gIGlmICghc3RybS5vdXRwdXQgfHxcbiAgICAgICghc3RybS5pbnB1dCAmJiBzdHJtLmF2YWlsX2luICE9PSAwKSB8fFxuICAgICAgKHMuc3RhdHVzID09PSBGSU5JU0hfU1RBVEUgJiYgZmx1c2ggIT09IFpfRklOSVNIKSkge1xuICAgIHJldHVybiBlcnIoc3RybSwgKHN0cm0uYXZhaWxfb3V0ID09PSAwKSA/IFpfQlVGX0VSUk9SIDogWl9TVFJFQU1fRVJST1IpO1xuICB9XG5cbiAgcy5zdHJtID0gc3RybTsgLyoganVzdCBpbiBjYXNlICovXG4gIG9sZF9mbHVzaCA9IHMubGFzdF9mbHVzaDtcbiAgcy5sYXN0X2ZsdXNoID0gZmx1c2g7XG5cbiAgLyogV3JpdGUgdGhlIGhlYWRlciAqL1xuICBpZiAocy5zdGF0dXMgPT09IElOSVRfU1RBVEUpIHtcblxuICAgIGlmIChzLndyYXAgPT09IDIpIHsgLy8gR1pJUCBoZWFkZXJcbiAgICAgIHN0cm0uYWRsZXIgPSAwOyAgLy9jcmMzMigwTCwgWl9OVUxMLCAwKTtcbiAgICAgIHB1dF9ieXRlKHMsIDMxKTtcbiAgICAgIHB1dF9ieXRlKHMsIDEzOSk7XG4gICAgICBwdXRfYnl0ZShzLCA4KTtcbiAgICAgIGlmICghcy5nemhlYWQpIHsgLy8gcy0+Z3poZWFkID09IFpfTlVMTFxuICAgICAgICBwdXRfYnl0ZShzLCAwKTtcbiAgICAgICAgcHV0X2J5dGUocywgMCk7XG4gICAgICAgIHB1dF9ieXRlKHMsIDApO1xuICAgICAgICBwdXRfYnl0ZShzLCAwKTtcbiAgICAgICAgcHV0X2J5dGUocywgMCk7XG4gICAgICAgIHB1dF9ieXRlKHMsIHMubGV2ZWwgPT09IDkgPyAyIDpcbiAgICAgICAgICAgICAgICAgICAgKHMuc3RyYXRlZ3kgPj0gWl9IVUZGTUFOX09OTFkgfHwgcy5sZXZlbCA8IDIgP1xuICAgICAgICAgICAgICAgICAgICAgNCA6IDApKTtcbiAgICAgICAgcHV0X2J5dGUocywgT1NfQ09ERSk7XG4gICAgICAgIHMuc3RhdHVzID0gQlVTWV9TVEFURTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBwdXRfYnl0ZShzLCAocy5nemhlYWQudGV4dCA/IDEgOiAwKSArXG4gICAgICAgICAgICAgICAgICAgIChzLmd6aGVhZC5oY3JjID8gMiA6IDApICtcbiAgICAgICAgICAgICAgICAgICAgKCFzLmd6aGVhZC5leHRyYSA/IDAgOiA0KSArXG4gICAgICAgICAgICAgICAgICAgICghcy5nemhlYWQubmFtZSA/IDAgOiA4KSArXG4gICAgICAgICAgICAgICAgICAgICghcy5nemhlYWQuY29tbWVudCA/IDAgOiAxNilcbiAgICAgICAgKTtcbiAgICAgICAgcHV0X2J5dGUocywgcy5nemhlYWQudGltZSAmIDB4ZmYpO1xuICAgICAgICBwdXRfYnl0ZShzLCAocy5nemhlYWQudGltZSA+PiA4KSAmIDB4ZmYpO1xuICAgICAgICBwdXRfYnl0ZShzLCAocy5nemhlYWQudGltZSA+PiAxNikgJiAweGZmKTtcbiAgICAgICAgcHV0X2J5dGUocywgKHMuZ3poZWFkLnRpbWUgPj4gMjQpICYgMHhmZik7XG4gICAgICAgIHB1dF9ieXRlKHMsIHMubGV2ZWwgPT09IDkgPyAyIDpcbiAgICAgICAgICAgICAgICAgICAgKHMuc3RyYXRlZ3kgPj0gWl9IVUZGTUFOX09OTFkgfHwgcy5sZXZlbCA8IDIgP1xuICAgICAgICAgICAgICAgICAgICAgNCA6IDApKTtcbiAgICAgICAgcHV0X2J5dGUocywgcy5nemhlYWQub3MgJiAweGZmKTtcbiAgICAgICAgaWYgKHMuZ3poZWFkLmV4dHJhICYmIHMuZ3poZWFkLmV4dHJhLmxlbmd0aCkge1xuICAgICAgICAgIHB1dF9ieXRlKHMsIHMuZ3poZWFkLmV4dHJhLmxlbmd0aCAmIDB4ZmYpO1xuICAgICAgICAgIHB1dF9ieXRlKHMsIChzLmd6aGVhZC5leHRyYS5sZW5ndGggPj4gOCkgJiAweGZmKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocy5nemhlYWQuaGNyYykge1xuICAgICAgICAgIHN0cm0uYWRsZXIgPSBjcmMzMihzdHJtLmFkbGVyLCBzLnBlbmRpbmdfYnVmLCBzLnBlbmRpbmcsIDApO1xuICAgICAgICB9XG4gICAgICAgIHMuZ3ppbmRleCA9IDA7XG4gICAgICAgIHMuc3RhdHVzID0gRVhUUkFfU1RBVEU7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgLy8gREVGTEFURSBoZWFkZXJcbiAgICB7XG4gICAgICB2YXIgaGVhZGVyID0gKFpfREVGTEFURUQgKyAoKHMud19iaXRzIC0gOCkgPDwgNCkpIDw8IDg7XG4gICAgICB2YXIgbGV2ZWxfZmxhZ3MgPSAtMTtcblxuICAgICAgaWYgKHMuc3RyYXRlZ3kgPj0gWl9IVUZGTUFOX09OTFkgfHwgcy5sZXZlbCA8IDIpIHtcbiAgICAgICAgbGV2ZWxfZmxhZ3MgPSAwO1xuICAgICAgfSBlbHNlIGlmIChzLmxldmVsIDwgNikge1xuICAgICAgICBsZXZlbF9mbGFncyA9IDE7XG4gICAgICB9IGVsc2UgaWYgKHMubGV2ZWwgPT09IDYpIHtcbiAgICAgICAgbGV2ZWxfZmxhZ3MgPSAyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV2ZWxfZmxhZ3MgPSAzO1xuICAgICAgfVxuICAgICAgaGVhZGVyIHw9IChsZXZlbF9mbGFncyA8PCA2KTtcbiAgICAgIGlmIChzLnN0cnN0YXJ0ICE9PSAwKSB7IGhlYWRlciB8PSBQUkVTRVRfRElDVDsgfVxuICAgICAgaGVhZGVyICs9IDMxIC0gKGhlYWRlciAlIDMxKTtcblxuICAgICAgcy5zdGF0dXMgPSBCVVNZX1NUQVRFO1xuICAgICAgcHV0U2hvcnRNU0IocywgaGVhZGVyKTtcblxuICAgICAgLyogU2F2ZSB0aGUgYWRsZXIzMiBvZiB0aGUgcHJlc2V0IGRpY3Rpb25hcnk6ICovXG4gICAgICBpZiAocy5zdHJzdGFydCAhPT0gMCkge1xuICAgICAgICBwdXRTaG9ydE1TQihzLCBzdHJtLmFkbGVyID4+PiAxNik7XG4gICAgICAgIHB1dFNob3J0TVNCKHMsIHN0cm0uYWRsZXIgJiAweGZmZmYpO1xuICAgICAgfVxuICAgICAgc3RybS5hZGxlciA9IDE7IC8vIGFkbGVyMzIoMEwsIFpfTlVMTCwgMCk7XG4gICAgfVxuICB9XG5cbi8vI2lmZGVmIEdaSVBcbiAgaWYgKHMuc3RhdHVzID09PSBFWFRSQV9TVEFURSkge1xuICAgIGlmIChzLmd6aGVhZC5leHRyYS8qICE9IFpfTlVMTCovKSB7XG4gICAgICBiZWcgPSBzLnBlbmRpbmc7ICAvKiBzdGFydCBvZiBieXRlcyB0byB1cGRhdGUgY3JjICovXG5cbiAgICAgIHdoaWxlIChzLmd6aW5kZXggPCAocy5nemhlYWQuZXh0cmEubGVuZ3RoICYgMHhmZmZmKSkge1xuICAgICAgICBpZiAocy5wZW5kaW5nID09PSBzLnBlbmRpbmdfYnVmX3NpemUpIHtcbiAgICAgICAgICBpZiAocy5nemhlYWQuaGNyYyAmJiBzLnBlbmRpbmcgPiBiZWcpIHtcbiAgICAgICAgICAgIHN0cm0uYWRsZXIgPSBjcmMzMihzdHJtLmFkbGVyLCBzLnBlbmRpbmdfYnVmLCBzLnBlbmRpbmcgLSBiZWcsIGJlZyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZsdXNoX3BlbmRpbmcoc3RybSk7XG4gICAgICAgICAgYmVnID0gcy5wZW5kaW5nO1xuICAgICAgICAgIGlmIChzLnBlbmRpbmcgPT09IHMucGVuZGluZ19idWZfc2l6ZSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHB1dF9ieXRlKHMsIHMuZ3poZWFkLmV4dHJhW3MuZ3ppbmRleF0gJiAweGZmKTtcbiAgICAgICAgcy5nemluZGV4Kys7XG4gICAgICB9XG4gICAgICBpZiAocy5nemhlYWQuaGNyYyAmJiBzLnBlbmRpbmcgPiBiZWcpIHtcbiAgICAgICAgc3RybS5hZGxlciA9IGNyYzMyKHN0cm0uYWRsZXIsIHMucGVuZGluZ19idWYsIHMucGVuZGluZyAtIGJlZywgYmVnKTtcbiAgICAgIH1cbiAgICAgIGlmIChzLmd6aW5kZXggPT09IHMuZ3poZWFkLmV4dHJhLmxlbmd0aCkge1xuICAgICAgICBzLmd6aW5kZXggPSAwO1xuICAgICAgICBzLnN0YXR1cyA9IE5BTUVfU1RBVEU7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcy5zdGF0dXMgPSBOQU1FX1NUQVRFO1xuICAgIH1cbiAgfVxuICBpZiAocy5zdGF0dXMgPT09IE5BTUVfU1RBVEUpIHtcbiAgICBpZiAocy5nemhlYWQubmFtZS8qICE9IFpfTlVMTCovKSB7XG4gICAgICBiZWcgPSBzLnBlbmRpbmc7ICAvKiBzdGFydCBvZiBieXRlcyB0byB1cGRhdGUgY3JjICovXG4gICAgICAvL2ludCB2YWw7XG5cbiAgICAgIGRvIHtcbiAgICAgICAgaWYgKHMucGVuZGluZyA9PT0gcy5wZW5kaW5nX2J1Zl9zaXplKSB7XG4gICAgICAgICAgaWYgKHMuZ3poZWFkLmhjcmMgJiYgcy5wZW5kaW5nID4gYmVnKSB7XG4gICAgICAgICAgICBzdHJtLmFkbGVyID0gY3JjMzIoc3RybS5hZGxlciwgcy5wZW5kaW5nX2J1Ziwgcy5wZW5kaW5nIC0gYmVnLCBiZWcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmbHVzaF9wZW5kaW5nKHN0cm0pO1xuICAgICAgICAgIGJlZyA9IHMucGVuZGluZztcbiAgICAgICAgICBpZiAocy5wZW5kaW5nID09PSBzLnBlbmRpbmdfYnVmX3NpemUpIHtcbiAgICAgICAgICAgIHZhbCA9IDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSlMgc3BlY2lmaWM6IGxpdHRsZSBtYWdpYyB0byBhZGQgemVybyB0ZXJtaW5hdG9yIHRvIGVuZCBvZiBzdHJpbmdcbiAgICAgICAgaWYgKHMuZ3ppbmRleCA8IHMuZ3poZWFkLm5hbWUubGVuZ3RoKSB7XG4gICAgICAgICAgdmFsID0gcy5nemhlYWQubmFtZS5jaGFyQ29kZUF0KHMuZ3ppbmRleCsrKSAmIDB4ZmY7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsID0gMDtcbiAgICAgICAgfVxuICAgICAgICBwdXRfYnl0ZShzLCB2YWwpO1xuICAgICAgfSB3aGlsZSAodmFsICE9PSAwKTtcblxuICAgICAgaWYgKHMuZ3poZWFkLmhjcmMgJiYgcy5wZW5kaW5nID4gYmVnKSB7XG4gICAgICAgIHN0cm0uYWRsZXIgPSBjcmMzMihzdHJtLmFkbGVyLCBzLnBlbmRpbmdfYnVmLCBzLnBlbmRpbmcgLSBiZWcsIGJlZyk7XG4gICAgICB9XG4gICAgICBpZiAodmFsID09PSAwKSB7XG4gICAgICAgIHMuZ3ppbmRleCA9IDA7XG4gICAgICAgIHMuc3RhdHVzID0gQ09NTUVOVF9TVEFURTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzLnN0YXR1cyA9IENPTU1FTlRfU1RBVEU7XG4gICAgfVxuICB9XG4gIGlmIChzLnN0YXR1cyA9PT0gQ09NTUVOVF9TVEFURSkge1xuICAgIGlmIChzLmd6aGVhZC5jb21tZW50LyogIT0gWl9OVUxMKi8pIHtcbiAgICAgIGJlZyA9IHMucGVuZGluZzsgIC8qIHN0YXJ0IG9mIGJ5dGVzIHRvIHVwZGF0ZSBjcmMgKi9cbiAgICAgIC8vaW50IHZhbDtcblxuICAgICAgZG8ge1xuICAgICAgICBpZiAocy5wZW5kaW5nID09PSBzLnBlbmRpbmdfYnVmX3NpemUpIHtcbiAgICAgICAgICBpZiAocy5nemhlYWQuaGNyYyAmJiBzLnBlbmRpbmcgPiBiZWcpIHtcbiAgICAgICAgICAgIHN0cm0uYWRsZXIgPSBjcmMzMihzdHJtLmFkbGVyLCBzLnBlbmRpbmdfYnVmLCBzLnBlbmRpbmcgLSBiZWcsIGJlZyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZsdXNoX3BlbmRpbmcoc3RybSk7XG4gICAgICAgICAgYmVnID0gcy5wZW5kaW5nO1xuICAgICAgICAgIGlmIChzLnBlbmRpbmcgPT09IHMucGVuZGluZ19idWZfc2l6ZSkge1xuICAgICAgICAgICAgdmFsID0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBKUyBzcGVjaWZpYzogbGl0dGxlIG1hZ2ljIHRvIGFkZCB6ZXJvIHRlcm1pbmF0b3IgdG8gZW5kIG9mIHN0cmluZ1xuICAgICAgICBpZiAocy5nemluZGV4IDwgcy5nemhlYWQuY29tbWVudC5sZW5ndGgpIHtcbiAgICAgICAgICB2YWwgPSBzLmd6aGVhZC5jb21tZW50LmNoYXJDb2RlQXQocy5nemluZGV4KyspICYgMHhmZjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWwgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHB1dF9ieXRlKHMsIHZhbCk7XG4gICAgICB9IHdoaWxlICh2YWwgIT09IDApO1xuXG4gICAgICBpZiAocy5nemhlYWQuaGNyYyAmJiBzLnBlbmRpbmcgPiBiZWcpIHtcbiAgICAgICAgc3RybS5hZGxlciA9IGNyYzMyKHN0cm0uYWRsZXIsIHMucGVuZGluZ19idWYsIHMucGVuZGluZyAtIGJlZywgYmVnKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWwgPT09IDApIHtcbiAgICAgICAgcy5zdGF0dXMgPSBIQ1JDX1NUQVRFO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHMuc3RhdHVzID0gSENSQ19TVEFURTtcbiAgICB9XG4gIH1cbiAgaWYgKHMuc3RhdHVzID09PSBIQ1JDX1NUQVRFKSB7XG4gICAgaWYgKHMuZ3poZWFkLmhjcmMpIHtcbiAgICAgIGlmIChzLnBlbmRpbmcgKyAyID4gcy5wZW5kaW5nX2J1Zl9zaXplKSB7XG4gICAgICAgIGZsdXNoX3BlbmRpbmcoc3RybSk7XG4gICAgICB9XG4gICAgICBpZiAocy5wZW5kaW5nICsgMiA8PSBzLnBlbmRpbmdfYnVmX3NpemUpIHtcbiAgICAgICAgcHV0X2J5dGUocywgc3RybS5hZGxlciAmIDB4ZmYpO1xuICAgICAgICBwdXRfYnl0ZShzLCAoc3RybS5hZGxlciA+PiA4KSAmIDB4ZmYpO1xuICAgICAgICBzdHJtLmFkbGVyID0gMDsgLy9jcmMzMigwTCwgWl9OVUxMLCAwKTtcbiAgICAgICAgcy5zdGF0dXMgPSBCVVNZX1NUQVRFO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHMuc3RhdHVzID0gQlVTWV9TVEFURTtcbiAgICB9XG4gIH1cbi8vI2VuZGlmXG5cbiAgLyogRmx1c2ggYXMgbXVjaCBwZW5kaW5nIG91dHB1dCBhcyBwb3NzaWJsZSAqL1xuICBpZiAocy5wZW5kaW5nICE9PSAwKSB7XG4gICAgZmx1c2hfcGVuZGluZyhzdHJtKTtcbiAgICBpZiAoc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgIC8qIFNpbmNlIGF2YWlsX291dCBpcyAwLCBkZWZsYXRlIHdpbGwgYmUgY2FsbGVkIGFnYWluIHdpdGhcbiAgICAgICAqIG1vcmUgb3V0cHV0IHNwYWNlLCBidXQgcG9zc2libHkgd2l0aCBib3RoIHBlbmRpbmcgYW5kXG4gICAgICAgKiBhdmFpbF9pbiBlcXVhbCB0byB6ZXJvLiBUaGVyZSB3b24ndCBiZSBhbnl0aGluZyB0byBkbyxcbiAgICAgICAqIGJ1dCB0aGlzIGlzIG5vdCBhbiBlcnJvciBzaXR1YXRpb24gc28gbWFrZSBzdXJlIHdlXG4gICAgICAgKiByZXR1cm4gT0sgaW5zdGVhZCBvZiBCVUZfRVJST1IgYXQgbmV4dCBjYWxsIG9mIGRlZmxhdGU6XG4gICAgICAgKi9cbiAgICAgIHMubGFzdF9mbHVzaCA9IC0xO1xuICAgICAgcmV0dXJuIFpfT0s7XG4gICAgfVxuXG4gICAgLyogTWFrZSBzdXJlIHRoZXJlIGlzIHNvbWV0aGluZyB0byBkbyBhbmQgYXZvaWQgZHVwbGljYXRlIGNvbnNlY3V0aXZlXG4gICAgICogZmx1c2hlcy4gRm9yIHJlcGVhdGVkIGFuZCB1c2VsZXNzIGNhbGxzIHdpdGggWl9GSU5JU0gsIHdlIGtlZXBcbiAgICAgKiByZXR1cm5pbmcgWl9TVFJFQU1fRU5EIGluc3RlYWQgb2YgWl9CVUZfRVJST1IuXG4gICAgICovXG4gIH0gZWxzZSBpZiAoc3RybS5hdmFpbF9pbiA9PT0gMCAmJiByYW5rKGZsdXNoKSA8PSByYW5rKG9sZF9mbHVzaCkgJiZcbiAgICBmbHVzaCAhPT0gWl9GSU5JU0gpIHtcbiAgICByZXR1cm4gZXJyKHN0cm0sIFpfQlVGX0VSUk9SKTtcbiAgfVxuXG4gIC8qIFVzZXIgbXVzdCBub3QgcHJvdmlkZSBtb3JlIGlucHV0IGFmdGVyIHRoZSBmaXJzdCBGSU5JU0g6ICovXG4gIGlmIChzLnN0YXR1cyA9PT0gRklOSVNIX1NUQVRFICYmIHN0cm0uYXZhaWxfaW4gIT09IDApIHtcbiAgICByZXR1cm4gZXJyKHN0cm0sIFpfQlVGX0VSUk9SKTtcbiAgfVxuXG4gIC8qIFN0YXJ0IGEgbmV3IGJsb2NrIG9yIGNvbnRpbnVlIHRoZSBjdXJyZW50IG9uZS5cbiAgICovXG4gIGlmIChzdHJtLmF2YWlsX2luICE9PSAwIHx8IHMubG9va2FoZWFkICE9PSAwIHx8XG4gICAgKGZsdXNoICE9PSBaX05PX0ZMVVNIICYmIHMuc3RhdHVzICE9PSBGSU5JU0hfU1RBVEUpKSB7XG4gICAgdmFyIGJzdGF0ZSA9IChzLnN0cmF0ZWd5ID09PSBaX0hVRkZNQU5fT05MWSkgPyBkZWZsYXRlX2h1ZmYocywgZmx1c2gpIDpcbiAgICAgIChzLnN0cmF0ZWd5ID09PSBaX1JMRSA/IGRlZmxhdGVfcmxlKHMsIGZsdXNoKSA6XG4gICAgICAgIGNvbmZpZ3VyYXRpb25fdGFibGVbcy5sZXZlbF0uZnVuYyhzLCBmbHVzaCkpO1xuXG4gICAgaWYgKGJzdGF0ZSA9PT0gQlNfRklOSVNIX1NUQVJURUQgfHwgYnN0YXRlID09PSBCU19GSU5JU0hfRE9ORSkge1xuICAgICAgcy5zdGF0dXMgPSBGSU5JU0hfU1RBVEU7XG4gICAgfVxuICAgIGlmIChic3RhdGUgPT09IEJTX05FRURfTU9SRSB8fCBic3RhdGUgPT09IEJTX0ZJTklTSF9TVEFSVEVEKSB7XG4gICAgICBpZiAoc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgICAgcy5sYXN0X2ZsdXNoID0gLTE7XG4gICAgICAgIC8qIGF2b2lkIEJVRl9FUlJPUiBuZXh0IGNhbGwsIHNlZSBhYm92ZSAqL1xuICAgICAgfVxuICAgICAgcmV0dXJuIFpfT0s7XG4gICAgICAvKiBJZiBmbHVzaCAhPSBaX05PX0ZMVVNIICYmIGF2YWlsX291dCA9PSAwLCB0aGUgbmV4dCBjYWxsXG4gICAgICAgKiBvZiBkZWZsYXRlIHNob3VsZCB1c2UgdGhlIHNhbWUgZmx1c2ggcGFyYW1ldGVyIHRvIG1ha2Ugc3VyZVxuICAgICAgICogdGhhdCB0aGUgZmx1c2ggaXMgY29tcGxldGUuIFNvIHdlIGRvbid0IGhhdmUgdG8gb3V0cHV0IGFuXG4gICAgICAgKiBlbXB0eSBibG9jayBoZXJlLCB0aGlzIHdpbGwgYmUgZG9uZSBhdCBuZXh0IGNhbGwuIFRoaXMgYWxzb1xuICAgICAgICogZW5zdXJlcyB0aGF0IGZvciBhIHZlcnkgc21hbGwgb3V0cHV0IGJ1ZmZlciwgd2UgZW1pdCBhdCBtb3N0XG4gICAgICAgKiBvbmUgZW1wdHkgYmxvY2suXG4gICAgICAgKi9cbiAgICB9XG4gICAgaWYgKGJzdGF0ZSA9PT0gQlNfQkxPQ0tfRE9ORSkge1xuICAgICAgaWYgKGZsdXNoID09PSBaX1BBUlRJQUxfRkxVU0gpIHtcbiAgICAgICAgdHJlZXMuX3RyX2FsaWduKHMpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZmx1c2ggIT09IFpfQkxPQ0spIHsgLyogRlVMTF9GTFVTSCBvciBTWU5DX0ZMVVNIICovXG5cbiAgICAgICAgdHJlZXMuX3RyX3N0b3JlZF9ibG9jayhzLCAwLCAwLCBmYWxzZSk7XG4gICAgICAgIC8qIEZvciBhIGZ1bGwgZmx1c2gsIHRoaXMgZW1wdHkgYmxvY2sgd2lsbCBiZSByZWNvZ25pemVkXG4gICAgICAgICAqIGFzIGEgc3BlY2lhbCBtYXJrZXIgYnkgaW5mbGF0ZV9zeW5jKCkuXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoZmx1c2ggPT09IFpfRlVMTF9GTFVTSCkge1xuICAgICAgICAgIC8qKiogQ0xFQVJfSEFTSChzKTsgKioqLyAgICAgICAgICAgICAvKiBmb3JnZXQgaGlzdG9yeSAqL1xuICAgICAgICAgIHplcm8ocy5oZWFkKTsgLy8gRmlsbCB3aXRoIE5JTCAoPSAwKTtcblxuICAgICAgICAgIGlmIChzLmxvb2thaGVhZCA9PT0gMCkge1xuICAgICAgICAgICAgcy5zdHJzdGFydCA9IDA7XG4gICAgICAgICAgICBzLmJsb2NrX3N0YXJ0ID0gMDtcbiAgICAgICAgICAgIHMuaW5zZXJ0ID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZsdXNoX3BlbmRpbmcoc3RybSk7XG4gICAgICBpZiAoc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgICAgcy5sYXN0X2ZsdXNoID0gLTE7IC8qIGF2b2lkIEJVRl9FUlJPUiBhdCBuZXh0IGNhbGwsIHNlZSBhYm92ZSAqL1xuICAgICAgICByZXR1cm4gWl9PSztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy9Bc3NlcnQoc3RybS0+YXZhaWxfb3V0ID4gMCwgXCJidWcyXCIpO1xuICAvL2lmIChzdHJtLmF2YWlsX291dCA8PSAwKSB7IHRocm93IG5ldyBFcnJvcihcImJ1ZzJcIik7fVxuXG4gIGlmIChmbHVzaCAhPT0gWl9GSU5JU0gpIHsgcmV0dXJuIFpfT0s7IH1cbiAgaWYgKHMud3JhcCA8PSAwKSB7IHJldHVybiBaX1NUUkVBTV9FTkQ7IH1cblxuICAvKiBXcml0ZSB0aGUgdHJhaWxlciAqL1xuICBpZiAocy53cmFwID09PSAyKSB7XG4gICAgcHV0X2J5dGUocywgc3RybS5hZGxlciAmIDB4ZmYpO1xuICAgIHB1dF9ieXRlKHMsIChzdHJtLmFkbGVyID4+IDgpICYgMHhmZik7XG4gICAgcHV0X2J5dGUocywgKHN0cm0uYWRsZXIgPj4gMTYpICYgMHhmZik7XG4gICAgcHV0X2J5dGUocywgKHN0cm0uYWRsZXIgPj4gMjQpICYgMHhmZik7XG4gICAgcHV0X2J5dGUocywgc3RybS50b3RhbF9pbiAmIDB4ZmYpO1xuICAgIHB1dF9ieXRlKHMsIChzdHJtLnRvdGFsX2luID4+IDgpICYgMHhmZik7XG4gICAgcHV0X2J5dGUocywgKHN0cm0udG90YWxfaW4gPj4gMTYpICYgMHhmZik7XG4gICAgcHV0X2J5dGUocywgKHN0cm0udG90YWxfaW4gPj4gMjQpICYgMHhmZik7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgcHV0U2hvcnRNU0Iocywgc3RybS5hZGxlciA+Pj4gMTYpO1xuICAgIHB1dFNob3J0TVNCKHMsIHN0cm0uYWRsZXIgJiAweGZmZmYpO1xuICB9XG5cbiAgZmx1c2hfcGVuZGluZyhzdHJtKTtcbiAgLyogSWYgYXZhaWxfb3V0IGlzIHplcm8sIHRoZSBhcHBsaWNhdGlvbiB3aWxsIGNhbGwgZGVmbGF0ZSBhZ2FpblxuICAgKiB0byBmbHVzaCB0aGUgcmVzdC5cbiAgICovXG4gIGlmIChzLndyYXAgPiAwKSB7IHMud3JhcCA9IC1zLndyYXA7IH1cbiAgLyogd3JpdGUgdGhlIHRyYWlsZXIgb25seSBvbmNlISAqL1xuICByZXR1cm4gcy5wZW5kaW5nICE9PSAwID8gWl9PSyA6IFpfU1RSRUFNX0VORDtcbn1cblxuZnVuY3Rpb24gZGVmbGF0ZUVuZChzdHJtKSB7XG4gIHZhciBzdGF0dXM7XG5cbiAgaWYgKCFzdHJtLyo9PSBaX05VTEwqLyB8fCAhc3RybS5zdGF0ZS8qPT0gWl9OVUxMKi8pIHtcbiAgICByZXR1cm4gWl9TVFJFQU1fRVJST1I7XG4gIH1cblxuICBzdGF0dXMgPSBzdHJtLnN0YXRlLnN0YXR1cztcbiAgaWYgKHN0YXR1cyAhPT0gSU5JVF9TVEFURSAmJlxuICAgIHN0YXR1cyAhPT0gRVhUUkFfU1RBVEUgJiZcbiAgICBzdGF0dXMgIT09IE5BTUVfU1RBVEUgJiZcbiAgICBzdGF0dXMgIT09IENPTU1FTlRfU1RBVEUgJiZcbiAgICBzdGF0dXMgIT09IEhDUkNfU1RBVEUgJiZcbiAgICBzdGF0dXMgIT09IEJVU1lfU1RBVEUgJiZcbiAgICBzdGF0dXMgIT09IEZJTklTSF9TVEFURVxuICApIHtcbiAgICByZXR1cm4gZXJyKHN0cm0sIFpfU1RSRUFNX0VSUk9SKTtcbiAgfVxuXG4gIHN0cm0uc3RhdGUgPSBudWxsO1xuXG4gIHJldHVybiBzdGF0dXMgPT09IEJVU1lfU1RBVEUgPyBlcnIoc3RybSwgWl9EQVRBX0VSUk9SKSA6IFpfT0s7XG59XG5cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogSW5pdGlhbGl6ZXMgdGhlIGNvbXByZXNzaW9uIGRpY3Rpb25hcnkgZnJvbSB0aGUgZ2l2ZW4gYnl0ZVxuICogc2VxdWVuY2Ugd2l0aG91dCBwcm9kdWNpbmcgYW55IGNvbXByZXNzZWQgb3V0cHV0LlxuICovXG5mdW5jdGlvbiBkZWZsYXRlU2V0RGljdGlvbmFyeShzdHJtLCBkaWN0aW9uYXJ5KSB7XG4gIHZhciBkaWN0TGVuZ3RoID0gZGljdGlvbmFyeS5sZW5ndGg7XG5cbiAgdmFyIHM7XG4gIHZhciBzdHIsIG47XG4gIHZhciB3cmFwO1xuICB2YXIgYXZhaWw7XG4gIHZhciBuZXh0O1xuICB2YXIgaW5wdXQ7XG4gIHZhciB0bXBEaWN0O1xuXG4gIGlmICghc3RybS8qPT0gWl9OVUxMKi8gfHwgIXN0cm0uc3RhdGUvKj09IFpfTlVMTCovKSB7XG4gICAgcmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xuICB9XG5cbiAgcyA9IHN0cm0uc3RhdGU7XG4gIHdyYXAgPSBzLndyYXA7XG5cbiAgaWYgKHdyYXAgPT09IDIgfHwgKHdyYXAgPT09IDEgJiYgcy5zdGF0dXMgIT09IElOSVRfU1RBVEUpIHx8IHMubG9va2FoZWFkKSB7XG4gICAgcmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xuICB9XG5cbiAgLyogd2hlbiB1c2luZyB6bGliIHdyYXBwZXJzLCBjb21wdXRlIEFkbGVyLTMyIGZvciBwcm92aWRlZCBkaWN0aW9uYXJ5ICovXG4gIGlmICh3cmFwID09PSAxKSB7XG4gICAgLyogYWRsZXIzMihzdHJtLT5hZGxlciwgZGljdGlvbmFyeSwgZGljdExlbmd0aCk7ICovXG4gICAgc3RybS5hZGxlciA9IGFkbGVyMzIoc3RybS5hZGxlciwgZGljdGlvbmFyeSwgZGljdExlbmd0aCwgMCk7XG4gIH1cblxuICBzLndyYXAgPSAwOyAgIC8qIGF2b2lkIGNvbXB1dGluZyBBZGxlci0zMiBpbiByZWFkX2J1ZiAqL1xuXG4gIC8qIGlmIGRpY3Rpb25hcnkgd291bGQgZmlsbCB3aW5kb3csIGp1c3QgcmVwbGFjZSB0aGUgaGlzdG9yeSAqL1xuICBpZiAoZGljdExlbmd0aCA+PSBzLndfc2l6ZSkge1xuICAgIGlmICh3cmFwID09PSAwKSB7ICAgICAgICAgICAgLyogYWxyZWFkeSBlbXB0eSBvdGhlcndpc2UgKi9cbiAgICAgIC8qKiogQ0xFQVJfSEFTSChzKTsgKioqL1xuICAgICAgemVybyhzLmhlYWQpOyAvLyBGaWxsIHdpdGggTklMICg9IDApO1xuICAgICAgcy5zdHJzdGFydCA9IDA7XG4gICAgICBzLmJsb2NrX3N0YXJ0ID0gMDtcbiAgICAgIHMuaW5zZXJ0ID0gMDtcbiAgICB9XG4gICAgLyogdXNlIHRoZSB0YWlsICovXG4gICAgLy8gZGljdGlvbmFyeSA9IGRpY3Rpb25hcnkuc2xpY2UoZGljdExlbmd0aCAtIHMud19zaXplKTtcbiAgICB0bXBEaWN0ID0gbmV3IHV0aWxzLkJ1Zjgocy53X3NpemUpO1xuICAgIHV0aWxzLmFycmF5U2V0KHRtcERpY3QsIGRpY3Rpb25hcnksIGRpY3RMZW5ndGggLSBzLndfc2l6ZSwgcy53X3NpemUsIDApO1xuICAgIGRpY3Rpb25hcnkgPSB0bXBEaWN0O1xuICAgIGRpY3RMZW5ndGggPSBzLndfc2l6ZTtcbiAgfVxuICAvKiBpbnNlcnQgZGljdGlvbmFyeSBpbnRvIHdpbmRvdyBhbmQgaGFzaCAqL1xuICBhdmFpbCA9IHN0cm0uYXZhaWxfaW47XG4gIG5leHQgPSBzdHJtLm5leHRfaW47XG4gIGlucHV0ID0gc3RybS5pbnB1dDtcbiAgc3RybS5hdmFpbF9pbiA9IGRpY3RMZW5ndGg7XG4gIHN0cm0ubmV4dF9pbiA9IDA7XG4gIHN0cm0uaW5wdXQgPSBkaWN0aW9uYXJ5O1xuICBmaWxsX3dpbmRvdyhzKTtcbiAgd2hpbGUgKHMubG9va2FoZWFkID49IE1JTl9NQVRDSCkge1xuICAgIHN0ciA9IHMuc3Ryc3RhcnQ7XG4gICAgbiA9IHMubG9va2FoZWFkIC0gKE1JTl9NQVRDSCAtIDEpO1xuICAgIGRvIHtcbiAgICAgIC8qIFVQREFURV9IQVNIKHMsIHMtPmluc19oLCBzLT53aW5kb3dbc3RyICsgTUlOX01BVENILTFdKTsgKi9cbiAgICAgIHMuaW5zX2ggPSAoKHMuaW5zX2ggPDwgcy5oYXNoX3NoaWZ0KSBeIHMud2luZG93W3N0ciArIE1JTl9NQVRDSCAtIDFdKSAmIHMuaGFzaF9tYXNrO1xuXG4gICAgICBzLnByZXZbc3RyICYgcy53X21hc2tdID0gcy5oZWFkW3MuaW5zX2hdO1xuXG4gICAgICBzLmhlYWRbcy5pbnNfaF0gPSBzdHI7XG4gICAgICBzdHIrKztcbiAgICB9IHdoaWxlICgtLW4pO1xuICAgIHMuc3Ryc3RhcnQgPSBzdHI7XG4gICAgcy5sb29rYWhlYWQgPSBNSU5fTUFUQ0ggLSAxO1xuICAgIGZpbGxfd2luZG93KHMpO1xuICB9XG4gIHMuc3Ryc3RhcnQgKz0gcy5sb29rYWhlYWQ7XG4gIHMuYmxvY2tfc3RhcnQgPSBzLnN0cnN0YXJ0O1xuICBzLmluc2VydCA9IHMubG9va2FoZWFkO1xuICBzLmxvb2thaGVhZCA9IDA7XG4gIHMubWF0Y2hfbGVuZ3RoID0gcy5wcmV2X2xlbmd0aCA9IE1JTl9NQVRDSCAtIDE7XG4gIHMubWF0Y2hfYXZhaWxhYmxlID0gMDtcbiAgc3RybS5uZXh0X2luID0gbmV4dDtcbiAgc3RybS5pbnB1dCA9IGlucHV0O1xuICBzdHJtLmF2YWlsX2luID0gYXZhaWw7XG4gIHMud3JhcCA9IHdyYXA7XG4gIHJldHVybiBaX09LO1xufVxuXG5cbmV4cG9ydHMuZGVmbGF0ZUluaXQgPSBkZWZsYXRlSW5pdDtcbmV4cG9ydHMuZGVmbGF0ZUluaXQyID0gZGVmbGF0ZUluaXQyO1xuZXhwb3J0cy5kZWZsYXRlUmVzZXQgPSBkZWZsYXRlUmVzZXQ7XG5leHBvcnRzLmRlZmxhdGVSZXNldEtlZXAgPSBkZWZsYXRlUmVzZXRLZWVwO1xuZXhwb3J0cy5kZWZsYXRlU2V0SGVhZGVyID0gZGVmbGF0ZVNldEhlYWRlcjtcbmV4cG9ydHMuZGVmbGF0ZSA9IGRlZmxhdGU7XG5leHBvcnRzLmRlZmxhdGVFbmQgPSBkZWZsYXRlRW5kO1xuZXhwb3J0cy5kZWZsYXRlU2V0RGljdGlvbmFyeSA9IGRlZmxhdGVTZXREaWN0aW9uYXJ5O1xuZXhwb3J0cy5kZWZsYXRlSW5mbyA9ICdwYWtvIGRlZmxhdGUgKGZyb20gTm9kZWNhIHByb2plY3QpJztcblxuLyogTm90IGltcGxlbWVudGVkXG5leHBvcnRzLmRlZmxhdGVCb3VuZCA9IGRlZmxhdGVCb3VuZDtcbmV4cG9ydHMuZGVmbGF0ZUNvcHkgPSBkZWZsYXRlQ29weTtcbmV4cG9ydHMuZGVmbGF0ZVBhcmFtcyA9IGRlZmxhdGVQYXJhbXM7XG5leHBvcnRzLmRlZmxhdGVQZW5kaW5nID0gZGVmbGF0ZVBlbmRpbmc7XG5leHBvcnRzLmRlZmxhdGVQcmltZSA9IGRlZmxhdGVQcmltZTtcbmV4cG9ydHMuZGVmbGF0ZVR1bmUgPSBkZWZsYXRlVHVuZTtcbiovXG4iLCAiLy8gU3RyaW5nIGVuY29kZS9kZWNvZGUgaGVscGVyc1xuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG5cblxuLy8gUXVpY2sgY2hlY2sgaWYgd2UgY2FuIHVzZSBmYXN0IGFycmF5IHRvIGJpbiBzdHJpbmcgY29udmVyc2lvblxuLy9cbi8vIC0gYXBwbHkoQXJyYXkpIGNhbiBmYWlsIG9uIEFuZHJvaWQgMi4yXG4vLyAtIGFwcGx5KFVpbnQ4QXJyYXkpIGNhbiBmYWlsIG9uIGlPUyA1LjEgU2FmYXJpXG4vL1xudmFyIFNUUl9BUFBMWV9PSyA9IHRydWU7XG52YXIgU1RSX0FQUExZX1VJQV9PSyA9IHRydWU7XG5cbnRyeSB7IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgWyAwIF0pOyB9IGNhdGNoIChfXykgeyBTVFJfQVBQTFlfT0sgPSBmYWxzZTsgfVxudHJ5IHsgU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDhBcnJheSgxKSk7IH0gY2F0Y2ggKF9fKSB7IFNUUl9BUFBMWV9VSUFfT0sgPSBmYWxzZTsgfVxuXG5cbi8vIFRhYmxlIHdpdGggdXRmOCBsZW5ndGhzIChjYWxjdWxhdGVkIGJ5IGZpcnN0IGJ5dGUgb2Ygc2VxdWVuY2UpXG4vLyBOb3RlLCB0aGF0IDUgJiA2LWJ5dGUgdmFsdWVzIGFuZCBzb21lIDQtYnl0ZSB2YWx1ZXMgY2FuIG5vdCBiZSByZXByZXNlbnRlZCBpbiBKUyxcbi8vIGJlY2F1c2UgbWF4IHBvc3NpYmxlIGNvZGVwb2ludCBpcyAweDEwZmZmZlxudmFyIF91dGY4bGVuID0gbmV3IHV0aWxzLkJ1ZjgoMjU2KTtcbmZvciAodmFyIHEgPSAwOyBxIDwgMjU2OyBxKyspIHtcbiAgX3V0ZjhsZW5bcV0gPSAocSA+PSAyNTIgPyA2IDogcSA+PSAyNDggPyA1IDogcSA+PSAyNDAgPyA0IDogcSA+PSAyMjQgPyAzIDogcSA+PSAxOTIgPyAyIDogMSk7XG59XG5fdXRmOGxlblsyNTRdID0gX3V0ZjhsZW5bMjU0XSA9IDE7IC8vIEludmFsaWQgc2VxdWVuY2Ugc3RhcnRcblxuXG4vLyBjb252ZXJ0IHN0cmluZyB0byBhcnJheSAodHlwZWQsIHdoZW4gcG9zc2libGUpXG5leHBvcnRzLnN0cmluZzJidWYgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHZhciBidWYsIGMsIGMyLCBtX3BvcywgaSwgc3RyX2xlbiA9IHN0ci5sZW5ndGgsIGJ1Zl9sZW4gPSAwO1xuXG4gIC8vIGNvdW50IGJpbmFyeSBzaXplXG4gIGZvciAobV9wb3MgPSAwOyBtX3BvcyA8IHN0cl9sZW47IG1fcG9zKyspIHtcbiAgICBjID0gc3RyLmNoYXJDb2RlQXQobV9wb3MpO1xuICAgIGlmICgoYyAmIDB4ZmMwMCkgPT09IDB4ZDgwMCAmJiAobV9wb3MgKyAxIDwgc3RyX2xlbikpIHtcbiAgICAgIGMyID0gc3RyLmNoYXJDb2RlQXQobV9wb3MgKyAxKTtcbiAgICAgIGlmICgoYzIgJiAweGZjMDApID09PSAweGRjMDApIHtcbiAgICAgICAgYyA9IDB4MTAwMDAgKyAoKGMgLSAweGQ4MDApIDw8IDEwKSArIChjMiAtIDB4ZGMwMCk7XG4gICAgICAgIG1fcG9zKys7XG4gICAgICB9XG4gICAgfVxuICAgIGJ1Zl9sZW4gKz0gYyA8IDB4ODAgPyAxIDogYyA8IDB4ODAwID8gMiA6IGMgPCAweDEwMDAwID8gMyA6IDQ7XG4gIH1cblxuICAvLyBhbGxvY2F0ZSBidWZmZXJcbiAgYnVmID0gbmV3IHV0aWxzLkJ1ZjgoYnVmX2xlbik7XG5cbiAgLy8gY29udmVydFxuICBmb3IgKGkgPSAwLCBtX3BvcyA9IDA7IGkgPCBidWZfbGVuOyBtX3BvcysrKSB7XG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KG1fcG9zKTtcbiAgICBpZiAoKGMgJiAweGZjMDApID09PSAweGQ4MDAgJiYgKG1fcG9zICsgMSA8IHN0cl9sZW4pKSB7XG4gICAgICBjMiA9IHN0ci5jaGFyQ29kZUF0KG1fcG9zICsgMSk7XG4gICAgICBpZiAoKGMyICYgMHhmYzAwKSA9PT0gMHhkYzAwKSB7XG4gICAgICAgIGMgPSAweDEwMDAwICsgKChjIC0gMHhkODAwKSA8PCAxMCkgKyAoYzIgLSAweGRjMDApO1xuICAgICAgICBtX3BvcysrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYyA8IDB4ODApIHtcbiAgICAgIC8qIG9uZSBieXRlICovXG4gICAgICBidWZbaSsrXSA9IGM7XG4gICAgfSBlbHNlIGlmIChjIDwgMHg4MDApIHtcbiAgICAgIC8qIHR3byBieXRlcyAqL1xuICAgICAgYnVmW2krK10gPSAweEMwIHwgKGMgPj4+IDYpO1xuICAgICAgYnVmW2krK10gPSAweDgwIHwgKGMgJiAweDNmKTtcbiAgICB9IGVsc2UgaWYgKGMgPCAweDEwMDAwKSB7XG4gICAgICAvKiB0aHJlZSBieXRlcyAqL1xuICAgICAgYnVmW2krK10gPSAweEUwIHwgKGMgPj4+IDEyKTtcbiAgICAgIGJ1ZltpKytdID0gMHg4MCB8IChjID4+PiA2ICYgMHgzZik7XG4gICAgICBidWZbaSsrXSA9IDB4ODAgfCAoYyAmIDB4M2YpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvKiBmb3VyIGJ5dGVzICovXG4gICAgICBidWZbaSsrXSA9IDB4ZjAgfCAoYyA+Pj4gMTgpO1xuICAgICAgYnVmW2krK10gPSAweDgwIHwgKGMgPj4+IDEyICYgMHgzZik7XG4gICAgICBidWZbaSsrXSA9IDB4ODAgfCAoYyA+Pj4gNiAmIDB4M2YpO1xuICAgICAgYnVmW2krK10gPSAweDgwIHwgKGMgJiAweDNmKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmO1xufTtcblxuLy8gSGVscGVyICh1c2VkIGluIDIgcGxhY2VzKVxuZnVuY3Rpb24gYnVmMmJpbnN0cmluZyhidWYsIGxlbikge1xuICAvLyBPbiBDaHJvbWUsIHRoZSBhcmd1bWVudHMgaW4gYSBmdW5jdGlvbiBjYWxsIHRoYXQgYXJlIGFsbG93ZWQgaXMgYDY1NTM0YC5cbiAgLy8gSWYgdGhlIGxlbmd0aCBvZiB0aGUgYnVmZmVyIGlzIHNtYWxsZXIgdGhhbiB0aGF0LCB3ZSBjYW4gdXNlIHRoaXMgb3B0aW1pemF0aW9uLFxuICAvLyBvdGhlcndpc2Ugd2Ugd2lsbCB0YWtlIGEgc2xvd2VyIHBhdGguXG4gIGlmIChsZW4gPCA2NTUzNCkge1xuICAgIGlmICgoYnVmLnN1YmFycmF5ICYmIFNUUl9BUFBMWV9VSUFfT0spIHx8ICghYnVmLnN1YmFycmF5ICYmIFNUUl9BUFBMWV9PSykpIHtcbiAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIHV0aWxzLnNocmlua0J1ZihidWYsIGxlbikpO1xuICAgIH1cbiAgfVxuXG4gIHZhciByZXN1bHQgPSAnJztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG4vLyBDb252ZXJ0IGJ5dGUgYXJyYXkgdG8gYmluYXJ5IHN0cmluZ1xuZXhwb3J0cy5idWYyYmluc3RyaW5nID0gZnVuY3Rpb24gKGJ1Zikge1xuICByZXR1cm4gYnVmMmJpbnN0cmluZyhidWYsIGJ1Zi5sZW5ndGgpO1xufTtcblxuXG4vLyBDb252ZXJ0IGJpbmFyeSBzdHJpbmcgKHR5cGVkLCB3aGVuIHBvc3NpYmxlKVxuZXhwb3J0cy5iaW5zdHJpbmcyYnVmID0gZnVuY3Rpb24gKHN0cikge1xuICB2YXIgYnVmID0gbmV3IHV0aWxzLkJ1Zjgoc3RyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBidWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBidWZbaV0gPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgfVxuICByZXR1cm4gYnVmO1xufTtcblxuXG4vLyBjb252ZXJ0IGFycmF5IHRvIHN0cmluZ1xuZXhwb3J0cy5idWYyc3RyaW5nID0gZnVuY3Rpb24gKGJ1ZiwgbWF4KSB7XG4gIHZhciBpLCBvdXQsIGMsIGNfbGVuO1xuICB2YXIgbGVuID0gbWF4IHx8IGJ1Zi5sZW5ndGg7XG5cbiAgLy8gUmVzZXJ2ZSBtYXggcG9zc2libGUgbGVuZ3RoICgyIHdvcmRzIHBlciBjaGFyKVxuICAvLyBOQjogYnkgdW5rbm93biByZWFzb25zLCBBcnJheSBpcyBzaWduaWZpY2FudGx5IGZhc3RlciBmb3JcbiAgLy8gICAgIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkgdGhhbiBVaW50MTZBcnJheS5cbiAgdmFyIHV0ZjE2YnVmID0gbmV3IEFycmF5KGxlbiAqIDIpO1xuXG4gIGZvciAob3V0ID0gMCwgaSA9IDA7IGkgPCBsZW47KSB7XG4gICAgYyA9IGJ1ZltpKytdO1xuICAgIC8vIHF1aWNrIHByb2Nlc3MgYXNjaWlcbiAgICBpZiAoYyA8IDB4ODApIHsgdXRmMTZidWZbb3V0KytdID0gYzsgY29udGludWU7IH1cblxuICAgIGNfbGVuID0gX3V0ZjhsZW5bY107XG4gICAgLy8gc2tpcCA1ICYgNiBieXRlIGNvZGVzXG4gICAgaWYgKGNfbGVuID4gNCkgeyB1dGYxNmJ1ZltvdXQrK10gPSAweGZmZmQ7IGkgKz0gY19sZW4gLSAxOyBjb250aW51ZTsgfVxuXG4gICAgLy8gYXBwbHkgbWFzayBvbiBmaXJzdCBieXRlXG4gICAgYyAmPSBjX2xlbiA9PT0gMiA/IDB4MWYgOiBjX2xlbiA9PT0gMyA/IDB4MGYgOiAweDA3O1xuICAgIC8vIGpvaW4gdGhlIHJlc3RcbiAgICB3aGlsZSAoY19sZW4gPiAxICYmIGkgPCBsZW4pIHtcbiAgICAgIGMgPSAoYyA8PCA2KSB8IChidWZbaSsrXSAmIDB4M2YpO1xuICAgICAgY19sZW4tLTtcbiAgICB9XG5cbiAgICAvLyB0ZXJtaW5hdGVkIGJ5IGVuZCBvZiBzdHJpbmc/XG4gICAgaWYgKGNfbGVuID4gMSkgeyB1dGYxNmJ1ZltvdXQrK10gPSAweGZmZmQ7IGNvbnRpbnVlOyB9XG5cbiAgICBpZiAoYyA8IDB4MTAwMDApIHtcbiAgICAgIHV0ZjE2YnVmW291dCsrXSA9IGM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGMgLT0gMHgxMDAwMDtcbiAgICAgIHV0ZjE2YnVmW291dCsrXSA9IDB4ZDgwMCB8ICgoYyA+PiAxMCkgJiAweDNmZik7XG4gICAgICB1dGYxNmJ1ZltvdXQrK10gPSAweGRjMDAgfCAoYyAmIDB4M2ZmKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmMmJpbnN0cmluZyh1dGYxNmJ1Ziwgb3V0KTtcbn07XG5cblxuLy8gQ2FsY3VsYXRlIG1heCBwb3NzaWJsZSBwb3NpdGlvbiBpbiB1dGY4IGJ1ZmZlcixcbi8vIHRoYXQgd2lsbCBub3QgYnJlYWsgc2VxdWVuY2UuIElmIHRoYXQncyBub3QgcG9zc2libGVcbi8vIC0gKHZlcnkgc21hbGwgbGltaXRzKSByZXR1cm4gbWF4IHNpemUgYXMgaXMuXG4vL1xuLy8gYnVmW10gLSB1dGY4IGJ5dGVzIGFycmF5XG4vLyBtYXggICAtIGxlbmd0aCBsaW1pdCAobWFuZGF0b3J5KTtcbmV4cG9ydHMudXRmOGJvcmRlciA9IGZ1bmN0aW9uIChidWYsIG1heCkge1xuICB2YXIgcG9zO1xuXG4gIG1heCA9IG1heCB8fCBidWYubGVuZ3RoO1xuICBpZiAobWF4ID4gYnVmLmxlbmd0aCkgeyBtYXggPSBidWYubGVuZ3RoOyB9XG5cbiAgLy8gZ28gYmFjayBmcm9tIGxhc3QgcG9zaXRpb24sIHVudGlsIHN0YXJ0IG9mIHNlcXVlbmNlIGZvdW5kXG4gIHBvcyA9IG1heCAtIDE7XG4gIHdoaWxlIChwb3MgPj0gMCAmJiAoYnVmW3Bvc10gJiAweEMwKSA9PT0gMHg4MCkgeyBwb3MtLTsgfVxuXG4gIC8vIFZlcnkgc21hbGwgYW5kIGJyb2tlbiBzZXF1ZW5jZSxcbiAgLy8gcmV0dXJuIG1heCwgYmVjYXVzZSB3ZSBzaG91bGQgcmV0dXJuIHNvbWV0aGluZyBhbnl3YXkuXG4gIGlmIChwb3MgPCAwKSB7IHJldHVybiBtYXg7IH1cblxuICAvLyBJZiB3ZSBjYW1lIHRvIHN0YXJ0IG9mIGJ1ZmZlciAtIHRoYXQgbWVhbnMgYnVmZmVyIGlzIHRvbyBzbWFsbCxcbiAgLy8gcmV0dXJuIG1heCB0b28uXG4gIGlmIChwb3MgPT09IDApIHsgcmV0dXJuIG1heDsgfVxuXG4gIHJldHVybiAocG9zICsgX3V0ZjhsZW5bYnVmW3Bvc11dID4gbWF4KSA/IHBvcyA6IG1heDtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vLyAoQykgMTk5NS0yMDEzIEplYW4tbG91cCBHYWlsbHkgYW5kIE1hcmsgQWRsZXJcbi8vIChDKSAyMDE0LTIwMTcgVml0YWx5IFB1enJpbiBhbmQgQW5kcmV5IFR1cGl0c2luXG4vL1xuLy8gVGhpcyBzb2Z0d2FyZSBpcyBwcm92aWRlZCAnYXMtaXMnLCB3aXRob3V0IGFueSBleHByZXNzIG9yIGltcGxpZWRcbi8vIHdhcnJhbnR5LiBJbiBubyBldmVudCB3aWxsIHRoZSBhdXRob3JzIGJlIGhlbGQgbGlhYmxlIGZvciBhbnkgZGFtYWdlc1xuLy8gYXJpc2luZyBmcm9tIHRoZSB1c2Ugb2YgdGhpcyBzb2Z0d2FyZS5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gYW55b25lIHRvIHVzZSB0aGlzIHNvZnR3YXJlIGZvciBhbnkgcHVycG9zZSxcbi8vIGluY2x1ZGluZyBjb21tZXJjaWFsIGFwcGxpY2F0aW9ucywgYW5kIHRvIGFsdGVyIGl0IGFuZCByZWRpc3RyaWJ1dGUgaXRcbi8vIGZyZWVseSwgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIHJlc3RyaWN0aW9uczpcbi8vXG4vLyAxLiBUaGUgb3JpZ2luIG9mIHRoaXMgc29mdHdhcmUgbXVzdCBub3QgYmUgbWlzcmVwcmVzZW50ZWQ7IHlvdSBtdXN0IG5vdFxuLy8gICBjbGFpbSB0aGF0IHlvdSB3cm90ZSB0aGUgb3JpZ2luYWwgc29mdHdhcmUuIElmIHlvdSB1c2UgdGhpcyBzb2Z0d2FyZVxuLy8gICBpbiBhIHByb2R1Y3QsIGFuIGFja25vd2xlZGdtZW50IGluIHRoZSBwcm9kdWN0IGRvY3VtZW50YXRpb24gd291bGQgYmVcbi8vICAgYXBwcmVjaWF0ZWQgYnV0IGlzIG5vdCByZXF1aXJlZC5cbi8vIDIuIEFsdGVyZWQgc291cmNlIHZlcnNpb25zIG11c3QgYmUgcGxhaW5seSBtYXJrZWQgYXMgc3VjaCwgYW5kIG11c3Qgbm90IGJlXG4vLyAgIG1pc3JlcHJlc2VudGVkIGFzIGJlaW5nIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS5cbi8vIDMuIFRoaXMgbm90aWNlIG1heSBub3QgYmUgcmVtb3ZlZCBvciBhbHRlcmVkIGZyb20gYW55IHNvdXJjZSBkaXN0cmlidXRpb24uXG5cbmZ1bmN0aW9uIFpTdHJlYW0oKSB7XG4gIC8qIG5leHQgaW5wdXQgYnl0ZSAqL1xuICB0aGlzLmlucHV0ID0gbnVsbDsgLy8gSlMgc3BlY2lmaWMsIGJlY2F1c2Ugd2UgaGF2ZSBubyBwb2ludGVyc1xuICB0aGlzLm5leHRfaW4gPSAwO1xuICAvKiBudW1iZXIgb2YgYnl0ZXMgYXZhaWxhYmxlIGF0IGlucHV0ICovXG4gIHRoaXMuYXZhaWxfaW4gPSAwO1xuICAvKiB0b3RhbCBudW1iZXIgb2YgaW5wdXQgYnl0ZXMgcmVhZCBzbyBmYXIgKi9cbiAgdGhpcy50b3RhbF9pbiA9IDA7XG4gIC8qIG5leHQgb3V0cHV0IGJ5dGUgc2hvdWxkIGJlIHB1dCB0aGVyZSAqL1xuICB0aGlzLm91dHB1dCA9IG51bGw7IC8vIEpTIHNwZWNpZmljLCBiZWNhdXNlIHdlIGhhdmUgbm8gcG9pbnRlcnNcbiAgdGhpcy5uZXh0X291dCA9IDA7XG4gIC8qIHJlbWFpbmluZyBmcmVlIHNwYWNlIGF0IG91dHB1dCAqL1xuICB0aGlzLmF2YWlsX291dCA9IDA7XG4gIC8qIHRvdGFsIG51bWJlciBvZiBieXRlcyBvdXRwdXQgc28gZmFyICovXG4gIHRoaXMudG90YWxfb3V0ID0gMDtcbiAgLyogbGFzdCBlcnJvciBtZXNzYWdlLCBOVUxMIGlmIG5vIGVycm9yICovXG4gIHRoaXMubXNnID0gJycvKlpfTlVMTCovO1xuICAvKiBub3QgdmlzaWJsZSBieSBhcHBsaWNhdGlvbnMgKi9cbiAgdGhpcy5zdGF0ZSA9IG51bGw7XG4gIC8qIGJlc3QgZ3Vlc3MgYWJvdXQgdGhlIGRhdGEgdHlwZTogYmluYXJ5IG9yIHRleHQgKi9cbiAgdGhpcy5kYXRhX3R5cGUgPSAyLypaX1VOS05PV04qLztcbiAgLyogYWRsZXIzMiB2YWx1ZSBvZiB0aGUgdW5jb21wcmVzc2VkIGRhdGEgKi9cbiAgdGhpcy5hZGxlciA9IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gWlN0cmVhbTtcbiIsICIndXNlIHN0cmljdCc7XG5cblxudmFyIHpsaWJfZGVmbGF0ZSA9IHJlcXVpcmUoJy4vemxpYi9kZWZsYXRlJyk7XG52YXIgdXRpbHMgICAgICAgID0gcmVxdWlyZSgnLi91dGlscy9jb21tb24nKTtcbnZhciBzdHJpbmdzICAgICAgPSByZXF1aXJlKCcuL3V0aWxzL3N0cmluZ3MnKTtcbnZhciBtc2cgICAgICAgICAgPSByZXF1aXJlKCcuL3psaWIvbWVzc2FnZXMnKTtcbnZhciBaU3RyZWFtICAgICAgPSByZXF1aXJlKCcuL3psaWIvenN0cmVhbScpO1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKiBQdWJsaWMgY29uc3RhbnRzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cblxudmFyIFpfTk9fRkxVU0ggICAgICA9IDA7XG52YXIgWl9GSU5JU0ggICAgICAgID0gNDtcblxudmFyIFpfT0sgICAgICAgICAgICA9IDA7XG52YXIgWl9TVFJFQU1fRU5EICAgID0gMTtcbnZhciBaX1NZTkNfRkxVU0ggICAgPSAyO1xuXG52YXIgWl9ERUZBVUxUX0NPTVBSRVNTSU9OID0gLTE7XG5cbnZhciBaX0RFRkFVTFRfU1RSQVRFR1kgICAgPSAwO1xuXG52YXIgWl9ERUZMQVRFRCAgPSA4O1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG5cbi8qKlxuICogY2xhc3MgRGVmbGF0ZVxuICpcbiAqIEdlbmVyaWMgSlMtc3R5bGUgd3JhcHBlciBmb3IgemxpYiBjYWxscy4gSWYgeW91IGRvbid0IG5lZWRcbiAqIHN0cmVhbWluZyBiZWhhdmlvdXIgLSB1c2UgbW9yZSBzaW1wbGUgZnVuY3Rpb25zOiBbW2RlZmxhdGVdXSxcbiAqIFtbZGVmbGF0ZVJhd11dIGFuZCBbW2d6aXBdXS5cbiAqKi9cblxuLyogaW50ZXJuYWxcbiAqIERlZmxhdGUuY2h1bmtzIC0+IEFycmF5XG4gKlxuICogQ2h1bmtzIG9mIG91dHB1dCBkYXRhLCBpZiBbW0RlZmxhdGUjb25EYXRhXV0gbm90IG92ZXJyaWRkZW4uXG4gKiovXG5cbi8qKlxuICogRGVmbGF0ZS5yZXN1bHQgLT4gVWludDhBcnJheXxBcnJheVxuICpcbiAqIENvbXByZXNzZWQgcmVzdWx0LCBnZW5lcmF0ZWQgYnkgZGVmYXVsdCBbW0RlZmxhdGUjb25EYXRhXV1cbiAqIGFuZCBbW0RlZmxhdGUjb25FbmRdXSBoYW5kbGVycy4gRmlsbGVkIGFmdGVyIHlvdSBwdXNoIGxhc3QgY2h1bmtcbiAqIChjYWxsIFtbRGVmbGF0ZSNwdXNoXV0gd2l0aCBgWl9GSU5JU0hgIC8gYHRydWVgIHBhcmFtKSAgb3IgaWYgeW91XG4gKiBwdXNoIGEgY2h1bmsgd2l0aCBleHBsaWNpdCBmbHVzaCAoY2FsbCBbW0RlZmxhdGUjcHVzaF1dIHdpdGhcbiAqIGBaX1NZTkNfRkxVU0hgIHBhcmFtKS5cbiAqKi9cblxuLyoqXG4gKiBEZWZsYXRlLmVyciAtPiBOdW1iZXJcbiAqXG4gKiBFcnJvciBjb2RlIGFmdGVyIGRlZmxhdGUgZmluaXNoZWQuIDAgKFpfT0spIG9uIHN1Y2Nlc3MuXG4gKiBZb3Ugd2lsbCBub3QgbmVlZCBpdCBpbiByZWFsIGxpZmUsIGJlY2F1c2UgZGVmbGF0ZSBlcnJvcnNcbiAqIGFyZSBwb3NzaWJsZSBvbmx5IG9uIHdyb25nIG9wdGlvbnMgb3IgYmFkIGBvbkRhdGFgIC8gYG9uRW5kYFxuICogY3VzdG9tIGhhbmRsZXJzLlxuICoqL1xuXG4vKipcbiAqIERlZmxhdGUubXNnIC0+IFN0cmluZ1xuICpcbiAqIEVycm9yIG1lc3NhZ2UsIGlmIFtbRGVmbGF0ZS5lcnJdXSAhPSAwXG4gKiovXG5cblxuLyoqXG4gKiBuZXcgRGVmbGF0ZShvcHRpb25zKVxuICogLSBvcHRpb25zIChPYmplY3QpOiB6bGliIGRlZmxhdGUgb3B0aW9ucy5cbiAqXG4gKiBDcmVhdGVzIG5ldyBkZWZsYXRvciBpbnN0YW5jZSB3aXRoIHNwZWNpZmllZCBwYXJhbXMuIFRocm93cyBleGNlcHRpb25cbiAqIG9uIGJhZCBwYXJhbXMuIFN1cHBvcnRlZCBvcHRpb25zOlxuICpcbiAqIC0gYGxldmVsYFxuICogLSBgd2luZG93Qml0c2BcbiAqIC0gYG1lbUxldmVsYFxuICogLSBgc3RyYXRlZ3lgXG4gKiAtIGBkaWN0aW9uYXJ5YFxuICpcbiAqIFtodHRwOi8vemxpYi5uZXQvbWFudWFsLmh0bWwjQWR2YW5jZWRdKGh0dHA6Ly96bGliLm5ldC9tYW51YWwuaHRtbCNBZHZhbmNlZClcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uIG9uIHRoZXNlLlxuICpcbiAqIEFkZGl0aW9uYWwgb3B0aW9ucywgZm9yIGludGVybmFsIG5lZWRzOlxuICpcbiAqIC0gYGNodW5rU2l6ZWAgLSBzaXplIG9mIGdlbmVyYXRlZCBkYXRhIGNodW5rcyAoMTZLIGJ5IGRlZmF1bHQpXG4gKiAtIGByYXdgIChCb29sZWFuKSAtIGRvIHJhdyBkZWZsYXRlXG4gKiAtIGBnemlwYCAoQm9vbGVhbikgLSBjcmVhdGUgZ3ppcCB3cmFwcGVyXG4gKiAtIGB0b2AgKFN0cmluZykgLSBpZiBlcXVhbCB0byAnc3RyaW5nJywgdGhlbiByZXN1bHQgd2lsbCBiZSBcImJpbmFyeSBzdHJpbmdcIlxuICogICAgKGVhY2ggY2hhciBjb2RlIFswLi4yNTVdKVxuICogLSBgaGVhZGVyYCAoT2JqZWN0KSAtIGN1c3RvbSBoZWFkZXIgZm9yIGd6aXBcbiAqICAgLSBgdGV4dGAgKEJvb2xlYW4pIC0gdHJ1ZSBpZiBjb21wcmVzc2VkIGRhdGEgYmVsaWV2ZWQgdG8gYmUgdGV4dFxuICogICAtIGB0aW1lYCAoTnVtYmVyKSAtIG1vZGlmaWNhdGlvbiB0aW1lLCB1bml4IHRpbWVzdGFtcFxuICogICAtIGBvc2AgKE51bWJlcikgLSBvcGVyYXRpb24gc3lzdGVtIGNvZGVcbiAqICAgLSBgZXh0cmFgIChBcnJheSkgLSBhcnJheSBvZiBieXRlcyB3aXRoIGV4dHJhIGRhdGEgKG1heCA2NTUzNilcbiAqICAgLSBgbmFtZWAgKFN0cmluZykgLSBmaWxlIG5hbWUgKGJpbmFyeSBzdHJpbmcpXG4gKiAgIC0gYGNvbW1lbnRgIChTdHJpbmcpIC0gY29tbWVudCAoYmluYXJ5IHN0cmluZylcbiAqICAgLSBgaGNyY2AgKEJvb2xlYW4pIC0gdHJ1ZSBpZiBoZWFkZXIgY3JjIHNob3VsZCBiZSBhZGRlZFxuICpcbiAqICMjIyMjIEV4YW1wbGU6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogdmFyIHBha28gPSByZXF1aXJlKCdwYWtvJylcbiAqICAgLCBjaHVuazEgPSBVaW50OEFycmF5KFsxLDIsMyw0LDUsNiw3LDgsOV0pXG4gKiAgICwgY2h1bmsyID0gVWludDhBcnJheShbMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMTldKTtcbiAqXG4gKiB2YXIgZGVmbGF0ZSA9IG5ldyBwYWtvLkRlZmxhdGUoeyBsZXZlbDogM30pO1xuICpcbiAqIGRlZmxhdGUucHVzaChjaHVuazEsIGZhbHNlKTtcbiAqIGRlZmxhdGUucHVzaChjaHVuazIsIHRydWUpOyAgLy8gdHJ1ZSAtPiBsYXN0IGNodW5rXG4gKlxuICogaWYgKGRlZmxhdGUuZXJyKSB7IHRocm93IG5ldyBFcnJvcihkZWZsYXRlLmVycik7IH1cbiAqXG4gKiBjb25zb2xlLmxvZyhkZWZsYXRlLnJlc3VsdCk7XG4gKiBgYGBcbiAqKi9cbmZ1bmN0aW9uIERlZmxhdGUob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRGVmbGF0ZSkpIHJldHVybiBuZXcgRGVmbGF0ZShvcHRpb25zKTtcblxuICB0aGlzLm9wdGlvbnMgPSB1dGlscy5hc3NpZ24oe1xuICAgIGxldmVsOiBaX0RFRkFVTFRfQ09NUFJFU1NJT04sXG4gICAgbWV0aG9kOiBaX0RFRkxBVEVELFxuICAgIGNodW5rU2l6ZTogMTYzODQsXG4gICAgd2luZG93Qml0czogMTUsXG4gICAgbWVtTGV2ZWw6IDgsXG4gICAgc3RyYXRlZ3k6IFpfREVGQVVMVF9TVFJBVEVHWSxcbiAgICB0bzogJydcbiAgfSwgb3B0aW9ucyB8fCB7fSk7XG5cbiAgdmFyIG9wdCA9IHRoaXMub3B0aW9ucztcblxuICBpZiAob3B0LnJhdyAmJiAob3B0LndpbmRvd0JpdHMgPiAwKSkge1xuICAgIG9wdC53aW5kb3dCaXRzID0gLW9wdC53aW5kb3dCaXRzO1xuICB9XG5cbiAgZWxzZSBpZiAob3B0Lmd6aXAgJiYgKG9wdC53aW5kb3dCaXRzID4gMCkgJiYgKG9wdC53aW5kb3dCaXRzIDwgMTYpKSB7XG4gICAgb3B0LndpbmRvd0JpdHMgKz0gMTY7XG4gIH1cblxuICB0aGlzLmVyciAgICA9IDA7ICAgICAgLy8gZXJyb3IgY29kZSwgaWYgaGFwcGVucyAoMCA9IFpfT0spXG4gIHRoaXMubXNnICAgID0gJyc7ICAgICAvLyBlcnJvciBtZXNzYWdlXG4gIHRoaXMuZW5kZWQgID0gZmFsc2U7ICAvLyB1c2VkIHRvIGF2b2lkIG11bHRpcGxlIG9uRW5kKCkgY2FsbHNcbiAgdGhpcy5jaHVua3MgPSBbXTsgICAgIC8vIGNodW5rcyBvZiBjb21wcmVzc2VkIGRhdGFcblxuICB0aGlzLnN0cm0gPSBuZXcgWlN0cmVhbSgpO1xuICB0aGlzLnN0cm0uYXZhaWxfb3V0ID0gMDtcblxuICB2YXIgc3RhdHVzID0gemxpYl9kZWZsYXRlLmRlZmxhdGVJbml0MihcbiAgICB0aGlzLnN0cm0sXG4gICAgb3B0LmxldmVsLFxuICAgIG9wdC5tZXRob2QsXG4gICAgb3B0LndpbmRvd0JpdHMsXG4gICAgb3B0Lm1lbUxldmVsLFxuICAgIG9wdC5zdHJhdGVneVxuICApO1xuXG4gIGlmIChzdGF0dXMgIT09IFpfT0spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobXNnW3N0YXR1c10pO1xuICB9XG5cbiAgaWYgKG9wdC5oZWFkZXIpIHtcbiAgICB6bGliX2RlZmxhdGUuZGVmbGF0ZVNldEhlYWRlcih0aGlzLnN0cm0sIG9wdC5oZWFkZXIpO1xuICB9XG5cbiAgaWYgKG9wdC5kaWN0aW9uYXJ5KSB7XG4gICAgdmFyIGRpY3Q7XG4gICAgLy8gQ29udmVydCBkYXRhIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2Ygb3B0LmRpY3Rpb25hcnkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBJZiB3ZSBuZWVkIHRvIGNvbXByZXNzIHRleHQsIGNoYW5nZSBlbmNvZGluZyB0byB1dGY4LlxuICAgICAgZGljdCA9IHN0cmluZ3Muc3RyaW5nMmJ1ZihvcHQuZGljdGlvbmFyeSk7XG4gICAgfSBlbHNlIGlmICh0b1N0cmluZy5jYWxsKG9wdC5kaWN0aW9uYXJ5KSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJykge1xuICAgICAgZGljdCA9IG5ldyBVaW50OEFycmF5KG9wdC5kaWN0aW9uYXJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGljdCA9IG9wdC5kaWN0aW9uYXJ5O1xuICAgIH1cblxuICAgIHN0YXR1cyA9IHpsaWJfZGVmbGF0ZS5kZWZsYXRlU2V0RGljdGlvbmFyeSh0aGlzLnN0cm0sIGRpY3QpO1xuXG4gICAgaWYgKHN0YXR1cyAhPT0gWl9PSykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZ1tzdGF0dXNdKTtcbiAgICB9XG5cbiAgICB0aGlzLl9kaWN0X3NldCA9IHRydWU7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZsYXRlI3B1c2goZGF0YVssIG1vZGVdKSAtPiBCb29sZWFuXG4gKiAtIGRhdGEgKFVpbnQ4QXJyYXl8QXJyYXl8QXJyYXlCdWZmZXJ8U3RyaW5nKTogaW5wdXQgZGF0YS4gU3RyaW5ncyB3aWxsIGJlXG4gKiAgIGNvbnZlcnRlZCB0byB1dGY4IGJ5dGUgc2VxdWVuY2UuXG4gKiAtIG1vZGUgKE51bWJlcnxCb29sZWFuKTogMC4uNiBmb3IgY29ycmVzcG9uZGluZyBaX05PX0ZMVVNILi5aX1RSRUUgbW9kZXMuXG4gKiAgIFNlZSBjb25zdGFudHMuIFNraXBwZWQgb3IgYGZhbHNlYCBtZWFucyBaX05PX0ZMVVNILCBgdHJ1ZWAgbWVhbnMgWl9GSU5JU0guXG4gKlxuICogU2VuZHMgaW5wdXQgZGF0YSB0byBkZWZsYXRlIHBpcGUsIGdlbmVyYXRpbmcgW1tEZWZsYXRlI29uRGF0YV1dIGNhbGxzIHdpdGhcbiAqIG5ldyBjb21wcmVzc2VkIGNodW5rcy4gUmV0dXJucyBgdHJ1ZWAgb24gc3VjY2Vzcy4gVGhlIGxhc3QgZGF0YSBibG9jayBtdXN0IGhhdmVcbiAqIG1vZGUgWl9GSU5JU0ggKG9yIGB0cnVlYCkuIFRoYXQgd2lsbCBmbHVzaCBpbnRlcm5hbCBwZW5kaW5nIGJ1ZmZlcnMgYW5kIGNhbGxcbiAqIFtbRGVmbGF0ZSNvbkVuZF1dLiBGb3IgaW50ZXJpbSBleHBsaWNpdCBmbHVzaGVzICh3aXRob3V0IGVuZGluZyB0aGUgc3RyZWFtKSB5b3VcbiAqIGNhbiB1c2UgbW9kZSBaX1NZTkNfRkxVU0gsIGtlZXBpbmcgdGhlIGNvbXByZXNzaW9uIGNvbnRleHQuXG4gKlxuICogT24gZmFpbCBjYWxsIFtbRGVmbGF0ZSNvbkVuZF1dIHdpdGggZXJyb3IgY29kZSBhbmQgcmV0dXJuIGZhbHNlLlxuICpcbiAqIFdlIHN0cm9uZ2x5IHJlY29tbWVuZCB0byB1c2UgYFVpbnQ4QXJyYXlgIG9uIGlucHV0IGZvciBiZXN0IHNwZWVkIChvdXRwdXRcbiAqIGFycmF5IGZvcm1hdCBpcyBkZXRlY3RlZCBhdXRvbWF0aWNhbGx5KS4gQWxzbywgZG9uJ3Qgc2tpcCBsYXN0IHBhcmFtIGFuZCBhbHdheXNcbiAqIHVzZSB0aGUgc2FtZSB0eXBlIGluIHlvdXIgY29kZSAoYm9vbGVhbiBvciBudW1iZXIpLiBUaGF0IHdpbGwgaW1wcm92ZSBKUyBzcGVlZC5cbiAqXG4gKiBGb3IgcmVndWxhciBgQXJyYXlgLXMgbWFrZSBzdXJlIGFsbCBlbGVtZW50cyBhcmUgWzAuLjI1NV0uXG4gKlxuICogIyMjIyMgRXhhbXBsZVxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIHB1c2goY2h1bmssIGZhbHNlKTsgLy8gcHVzaCBvbmUgb2YgZGF0YSBjaHVua3NcbiAqIC4uLlxuICogcHVzaChjaHVuaywgdHJ1ZSk7ICAvLyBwdXNoIGxhc3QgY2h1bmtcbiAqIGBgYFxuICoqL1xuRGVmbGF0ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChkYXRhLCBtb2RlKSB7XG4gIHZhciBzdHJtID0gdGhpcy5zdHJtO1xuICB2YXIgY2h1bmtTaXplID0gdGhpcy5vcHRpb25zLmNodW5rU2l6ZTtcbiAgdmFyIHN0YXR1cywgX21vZGU7XG5cbiAgaWYgKHRoaXMuZW5kZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgX21vZGUgPSAobW9kZSA9PT0gfn5tb2RlKSA/IG1vZGUgOiAoKG1vZGUgPT09IHRydWUpID8gWl9GSU5JU0ggOiBaX05PX0ZMVVNIKTtcblxuICAvLyBDb252ZXJ0IGRhdGEgaWYgbmVlZGVkXG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyBJZiB3ZSBuZWVkIHRvIGNvbXByZXNzIHRleHQsIGNoYW5nZSBlbmNvZGluZyB0byB1dGY4LlxuICAgIHN0cm0uaW5wdXQgPSBzdHJpbmdzLnN0cmluZzJidWYoZGF0YSk7XG4gIH0gZWxzZSBpZiAodG9TdHJpbmcuY2FsbChkYXRhKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJykge1xuICAgIHN0cm0uaW5wdXQgPSBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgfSBlbHNlIHtcbiAgICBzdHJtLmlucHV0ID0gZGF0YTtcbiAgfVxuXG4gIHN0cm0ubmV4dF9pbiA9IDA7XG4gIHN0cm0uYXZhaWxfaW4gPSBzdHJtLmlucHV0Lmxlbmd0aDtcblxuICBkbyB7XG4gICAgaWYgKHN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICBzdHJtLm91dHB1dCA9IG5ldyB1dGlscy5CdWY4KGNodW5rU2l6ZSk7XG4gICAgICBzdHJtLm5leHRfb3V0ID0gMDtcbiAgICAgIHN0cm0uYXZhaWxfb3V0ID0gY2h1bmtTaXplO1xuICAgIH1cbiAgICBzdGF0dXMgPSB6bGliX2RlZmxhdGUuZGVmbGF0ZShzdHJtLCBfbW9kZSk7ICAgIC8qIG5vIGJhZCByZXR1cm4gdmFsdWUgKi9cblxuICAgIGlmIChzdGF0dXMgIT09IFpfU1RSRUFNX0VORCAmJiBzdGF0dXMgIT09IFpfT0spIHtcbiAgICAgIHRoaXMub25FbmQoc3RhdHVzKTtcbiAgICAgIHRoaXMuZW5kZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc3RybS5hdmFpbF9vdXQgPT09IDAgfHwgKHN0cm0uYXZhaWxfaW4gPT09IDAgJiYgKF9tb2RlID09PSBaX0ZJTklTSCB8fCBfbW9kZSA9PT0gWl9TWU5DX0ZMVVNIKSkpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudG8gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMub25EYXRhKHN0cmluZ3MuYnVmMmJpbnN0cmluZyh1dGlscy5zaHJpbmtCdWYoc3RybS5vdXRwdXQsIHN0cm0ubmV4dF9vdXQpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uRGF0YSh1dGlscy5zaHJpbmtCdWYoc3RybS5vdXRwdXQsIHN0cm0ubmV4dF9vdXQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gd2hpbGUgKChzdHJtLmF2YWlsX2luID4gMCB8fCBzdHJtLmF2YWlsX291dCA9PT0gMCkgJiYgc3RhdHVzICE9PSBaX1NUUkVBTV9FTkQpO1xuXG4gIC8vIEZpbmFsaXplIG9uIHRoZSBsYXN0IGNodW5rLlxuICBpZiAoX21vZGUgPT09IFpfRklOSVNIKSB7XG4gICAgc3RhdHVzID0gemxpYl9kZWZsYXRlLmRlZmxhdGVFbmQodGhpcy5zdHJtKTtcbiAgICB0aGlzLm9uRW5kKHN0YXR1cyk7XG4gICAgdGhpcy5lbmRlZCA9IHRydWU7XG4gICAgcmV0dXJuIHN0YXR1cyA9PT0gWl9PSztcbiAgfVxuXG4gIC8vIGNhbGxiYWNrIGludGVyaW0gcmVzdWx0cyBpZiBaX1NZTkNfRkxVU0guXG4gIGlmIChfbW9kZSA9PT0gWl9TWU5DX0ZMVVNIKSB7XG4gICAgdGhpcy5vbkVuZChaX09LKTtcbiAgICBzdHJtLmF2YWlsX291dCA9IDA7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cblxuLyoqXG4gKiBEZWZsYXRlI29uRGF0YShjaHVuaykgLT4gVm9pZFxuICogLSBjaHVuayAoVWludDhBcnJheXxBcnJheXxTdHJpbmcpOiBvdXRwdXQgZGF0YS4gVHlwZSBvZiBhcnJheSBkZXBlbmRzXG4gKiAgIG9uIGpzIGVuZ2luZSBzdXBwb3J0LiBXaGVuIHN0cmluZyBvdXRwdXQgcmVxdWVzdGVkLCBlYWNoIGNodW5rXG4gKiAgIHdpbGwgYmUgc3RyaW5nLlxuICpcbiAqIEJ5IGRlZmF1bHQsIHN0b3JlcyBkYXRhIGJsb2NrcyBpbiBgY2h1bmtzW11gIHByb3BlcnR5IGFuZCBnbHVlXG4gKiB0aG9zZSBpbiBgb25FbmRgLiBPdmVycmlkZSB0aGlzIGhhbmRsZXIsIGlmIHlvdSBuZWVkIGFub3RoZXIgYmVoYXZpb3VyLlxuICoqL1xuRGVmbGF0ZS5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24gKGNodW5rKSB7XG4gIHRoaXMuY2h1bmtzLnB1c2goY2h1bmspO1xufTtcblxuXG4vKipcbiAqIERlZmxhdGUjb25FbmQoc3RhdHVzKSAtPiBWb2lkXG4gKiAtIHN0YXR1cyAoTnVtYmVyKTogZGVmbGF0ZSBzdGF0dXMuIDAgKFpfT0spIG9uIHN1Y2Nlc3MsXG4gKiAgIG90aGVyIGlmIG5vdC5cbiAqXG4gKiBDYWxsZWQgb25jZSBhZnRlciB5b3UgdGVsbCBkZWZsYXRlIHRoYXQgdGhlIGlucHV0IHN0cmVhbSBpc1xuICogY29tcGxldGUgKFpfRklOSVNIKSBvciBzaG91bGQgYmUgZmx1c2hlZCAoWl9TWU5DX0ZMVVNIKVxuICogb3IgaWYgYW4gZXJyb3IgaGFwcGVuZWQuIEJ5IGRlZmF1bHQgLSBqb2luIGNvbGxlY3RlZCBjaHVua3MsXG4gKiBmcmVlIG1lbW9yeSBhbmQgZmlsbCBgcmVzdWx0c2AgLyBgZXJyYCBwcm9wZXJ0aWVzLlxuICoqL1xuRGVmbGF0ZS5wcm90b3R5cGUub25FbmQgPSBmdW5jdGlvbiAoc3RhdHVzKSB7XG4gIC8vIE9uIHN1Y2Nlc3MgLSBqb2luXG4gIGlmIChzdGF0dXMgPT09IFpfT0spIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnRvID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5yZXN1bHQgPSB0aGlzLmNodW5rcy5qb2luKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXN1bHQgPSB1dGlscy5mbGF0dGVuQ2h1bmtzKHRoaXMuY2h1bmtzKTtcbiAgICB9XG4gIH1cbiAgdGhpcy5jaHVua3MgPSBbXTtcbiAgdGhpcy5lcnIgPSBzdGF0dXM7XG4gIHRoaXMubXNnID0gdGhpcy5zdHJtLm1zZztcbn07XG5cblxuLyoqXG4gKiBkZWZsYXRlKGRhdGFbLCBvcHRpb25zXSkgLT4gVWludDhBcnJheXxBcnJheXxTdHJpbmdcbiAqIC0gZGF0YSAoVWludDhBcnJheXxBcnJheXxTdHJpbmcpOiBpbnB1dCBkYXRhIHRvIGNvbXByZXNzLlxuICogLSBvcHRpb25zIChPYmplY3QpOiB6bGliIGRlZmxhdGUgb3B0aW9ucy5cbiAqXG4gKiBDb21wcmVzcyBgZGF0YWAgd2l0aCBkZWZsYXRlIGFsZ29yaXRobSBhbmQgYG9wdGlvbnNgLlxuICpcbiAqIFN1cHBvcnRlZCBvcHRpb25zIGFyZTpcbiAqXG4gKiAtIGxldmVsXG4gKiAtIHdpbmRvd0JpdHNcbiAqIC0gbWVtTGV2ZWxcbiAqIC0gc3RyYXRlZ3lcbiAqIC0gZGljdGlvbmFyeVxuICpcbiAqIFtodHRwOi8vemxpYi5uZXQvbWFudWFsLmh0bWwjQWR2YW5jZWRdKGh0dHA6Ly96bGliLm5ldC9tYW51YWwuaHRtbCNBZHZhbmNlZClcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uIG9uIHRoZXNlLlxuICpcbiAqIFN1Z2FyIChvcHRpb25zKTpcbiAqXG4gKiAtIGByYXdgIChCb29sZWFuKSAtIHNheSB0aGF0IHdlIHdvcmsgd2l0aCByYXcgc3RyZWFtLCBpZiB5b3UgZG9uJ3Qgd2lzaCB0byBzcGVjaWZ5XG4gKiAgIG5lZ2F0aXZlIHdpbmRvd0JpdHMgaW1wbGljaXRseS5cbiAqIC0gYHRvYCAoU3RyaW5nKSAtIGlmIGVxdWFsIHRvICdzdHJpbmcnLCB0aGVuIHJlc3VsdCB3aWxsIGJlIFwiYmluYXJ5IHN0cmluZ1wiXG4gKiAgICAoZWFjaCBjaGFyIGNvZGUgWzAuLjI1NV0pXG4gKlxuICogIyMjIyMgRXhhbXBsZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiB2YXIgcGFrbyA9IHJlcXVpcmUoJ3Bha28nKVxuICogICAsIGRhdGEgPSBVaW50OEFycmF5KFsxLDIsMyw0LDUsNiw3LDgsOV0pO1xuICpcbiAqIGNvbnNvbGUubG9nKHBha28uZGVmbGF0ZShkYXRhKSk7XG4gKiBgYGBcbiAqKi9cbmZ1bmN0aW9uIGRlZmxhdGUoaW5wdXQsIG9wdGlvbnMpIHtcbiAgdmFyIGRlZmxhdG9yID0gbmV3IERlZmxhdGUob3B0aW9ucyk7XG5cbiAgZGVmbGF0b3IucHVzaChpbnB1dCwgdHJ1ZSk7XG5cbiAgLy8gVGhhdCB3aWxsIG5ldmVyIGhhcHBlbnMsIGlmIHlvdSBkb24ndCBjaGVhdCB3aXRoIG9wdGlvbnMgOilcbiAgaWYgKGRlZmxhdG9yLmVycikgeyB0aHJvdyBkZWZsYXRvci5tc2cgfHwgbXNnW2RlZmxhdG9yLmVycl07IH1cblxuICByZXR1cm4gZGVmbGF0b3IucmVzdWx0O1xufVxuXG5cbi8qKlxuICogZGVmbGF0ZVJhdyhkYXRhWywgb3B0aW9uc10pIC0+IFVpbnQ4QXJyYXl8QXJyYXl8U3RyaW5nXG4gKiAtIGRhdGEgKFVpbnQ4QXJyYXl8QXJyYXl8U3RyaW5nKTogaW5wdXQgZGF0YSB0byBjb21wcmVzcy5cbiAqIC0gb3B0aW9ucyAoT2JqZWN0KTogemxpYiBkZWZsYXRlIG9wdGlvbnMuXG4gKlxuICogVGhlIHNhbWUgYXMgW1tkZWZsYXRlXV0sIGJ1dCBjcmVhdGVzIHJhdyBkYXRhLCB3aXRob3V0IHdyYXBwZXJcbiAqIChoZWFkZXIgYW5kIGFkbGVyMzIgY3JjKS5cbiAqKi9cbmZ1bmN0aW9uIGRlZmxhdGVSYXcoaW5wdXQsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIG9wdGlvbnMucmF3ID0gdHJ1ZTtcbiAgcmV0dXJuIGRlZmxhdGUoaW5wdXQsIG9wdGlvbnMpO1xufVxuXG5cbi8qKlxuICogZ3ppcChkYXRhWywgb3B0aW9uc10pIC0+IFVpbnQ4QXJyYXl8QXJyYXl8U3RyaW5nXG4gKiAtIGRhdGEgKFVpbnQ4QXJyYXl8QXJyYXl8U3RyaW5nKTogaW5wdXQgZGF0YSB0byBjb21wcmVzcy5cbiAqIC0gb3B0aW9ucyAoT2JqZWN0KTogemxpYiBkZWZsYXRlIG9wdGlvbnMuXG4gKlxuICogVGhlIHNhbWUgYXMgW1tkZWZsYXRlXV0sIGJ1dCBjcmVhdGUgZ3ppcCB3cmFwcGVyIGluc3RlYWQgb2ZcbiAqIGRlZmxhdGUgb25lLlxuICoqL1xuZnVuY3Rpb24gZ3ppcChpbnB1dCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgb3B0aW9ucy5nemlwID0gdHJ1ZTtcbiAgcmV0dXJuIGRlZmxhdGUoaW5wdXQsIG9wdGlvbnMpO1xufVxuXG5cbmV4cG9ydHMuRGVmbGF0ZSA9IERlZmxhdGU7XG5leHBvcnRzLmRlZmxhdGUgPSBkZWZsYXRlO1xuZXhwb3J0cy5kZWZsYXRlUmF3ID0gZGVmbGF0ZVJhdztcbmV4cG9ydHMuZ3ppcCA9IGd6aXA7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vLyAoQykgMTk5NS0yMDEzIEplYW4tbG91cCBHYWlsbHkgYW5kIE1hcmsgQWRsZXJcbi8vIChDKSAyMDE0LTIwMTcgVml0YWx5IFB1enJpbiBhbmQgQW5kcmV5IFR1cGl0c2luXG4vL1xuLy8gVGhpcyBzb2Z0d2FyZSBpcyBwcm92aWRlZCAnYXMtaXMnLCB3aXRob3V0IGFueSBleHByZXNzIG9yIGltcGxpZWRcbi8vIHdhcnJhbnR5LiBJbiBubyBldmVudCB3aWxsIHRoZSBhdXRob3JzIGJlIGhlbGQgbGlhYmxlIGZvciBhbnkgZGFtYWdlc1xuLy8gYXJpc2luZyBmcm9tIHRoZSB1c2Ugb2YgdGhpcyBzb2Z0d2FyZS5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gYW55b25lIHRvIHVzZSB0aGlzIHNvZnR3YXJlIGZvciBhbnkgcHVycG9zZSxcbi8vIGluY2x1ZGluZyBjb21tZXJjaWFsIGFwcGxpY2F0aW9ucywgYW5kIHRvIGFsdGVyIGl0IGFuZCByZWRpc3RyaWJ1dGUgaXRcbi8vIGZyZWVseSwgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIHJlc3RyaWN0aW9uczpcbi8vXG4vLyAxLiBUaGUgb3JpZ2luIG9mIHRoaXMgc29mdHdhcmUgbXVzdCBub3QgYmUgbWlzcmVwcmVzZW50ZWQ7IHlvdSBtdXN0IG5vdFxuLy8gICBjbGFpbSB0aGF0IHlvdSB3cm90ZSB0aGUgb3JpZ2luYWwgc29mdHdhcmUuIElmIHlvdSB1c2UgdGhpcyBzb2Z0d2FyZVxuLy8gICBpbiBhIHByb2R1Y3QsIGFuIGFja25vd2xlZGdtZW50IGluIHRoZSBwcm9kdWN0IGRvY3VtZW50YXRpb24gd291bGQgYmVcbi8vICAgYXBwcmVjaWF0ZWQgYnV0IGlzIG5vdCByZXF1aXJlZC5cbi8vIDIuIEFsdGVyZWQgc291cmNlIHZlcnNpb25zIG11c3QgYmUgcGxhaW5seSBtYXJrZWQgYXMgc3VjaCwgYW5kIG11c3Qgbm90IGJlXG4vLyAgIG1pc3JlcHJlc2VudGVkIGFzIGJlaW5nIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS5cbi8vIDMuIFRoaXMgbm90aWNlIG1heSBub3QgYmUgcmVtb3ZlZCBvciBhbHRlcmVkIGZyb20gYW55IHNvdXJjZSBkaXN0cmlidXRpb24uXG5cbi8vIFNlZSBzdGF0ZSBkZWZzIGZyb20gaW5mbGF0ZS5qc1xudmFyIEJBRCA9IDMwOyAgICAgICAvKiBnb3QgYSBkYXRhIGVycm9yIC0tIHJlbWFpbiBoZXJlIHVudGlsIHJlc2V0ICovXG52YXIgVFlQRSA9IDEyOyAgICAgIC8qIGk6IHdhaXRpbmcgZm9yIHR5cGUgYml0cywgaW5jbHVkaW5nIGxhc3QtZmxhZyBiaXQgKi9cblxuLypcbiAgIERlY29kZSBsaXRlcmFsLCBsZW5ndGgsIGFuZCBkaXN0YW5jZSBjb2RlcyBhbmQgd3JpdGUgb3V0IHRoZSByZXN1bHRpbmdcbiAgIGxpdGVyYWwgYW5kIG1hdGNoIGJ5dGVzIHVudGlsIGVpdGhlciBub3QgZW5vdWdoIGlucHV0IG9yIG91dHB1dCBpc1xuICAgYXZhaWxhYmxlLCBhbiBlbmQtb2YtYmxvY2sgaXMgZW5jb3VudGVyZWQsIG9yIGEgZGF0YSBlcnJvciBpcyBlbmNvdW50ZXJlZC5cbiAgIFdoZW4gbGFyZ2UgZW5vdWdoIGlucHV0IGFuZCBvdXRwdXQgYnVmZmVycyBhcmUgc3VwcGxpZWQgdG8gaW5mbGF0ZSgpLCBmb3JcbiAgIGV4YW1wbGUsIGEgMTZLIGlucHV0IGJ1ZmZlciBhbmQgYSA2NEsgb3V0cHV0IGJ1ZmZlciwgbW9yZSB0aGFuIDk1JSBvZiB0aGVcbiAgIGluZmxhdGUgZXhlY3V0aW9uIHRpbWUgaXMgc3BlbnQgaW4gdGhpcyByb3V0aW5lLlxuXG4gICBFbnRyeSBhc3N1bXB0aW9uczpcblxuICAgICAgICBzdGF0ZS5tb2RlID09PSBMRU5cbiAgICAgICAgc3RybS5hdmFpbF9pbiA+PSA2XG4gICAgICAgIHN0cm0uYXZhaWxfb3V0ID49IDI1OFxuICAgICAgICBzdGFydCA+PSBzdHJtLmF2YWlsX291dFxuICAgICAgICBzdGF0ZS5iaXRzIDwgOFxuXG4gICBPbiByZXR1cm4sIHN0YXRlLm1vZGUgaXMgb25lIG9mOlxuXG4gICAgICAgIExFTiAtLSByYW4gb3V0IG9mIGVub3VnaCBvdXRwdXQgc3BhY2Ugb3IgZW5vdWdoIGF2YWlsYWJsZSBpbnB1dFxuICAgICAgICBUWVBFIC0tIHJlYWNoZWQgZW5kIG9mIGJsb2NrIGNvZGUsIGluZmxhdGUoKSB0byBpbnRlcnByZXQgbmV4dCBibG9ja1xuICAgICAgICBCQUQgLS0gZXJyb3IgaW4gYmxvY2sgZGF0YVxuXG4gICBOb3RlczpcblxuICAgIC0gVGhlIG1heGltdW0gaW5wdXQgYml0cyB1c2VkIGJ5IGEgbGVuZ3RoL2Rpc3RhbmNlIHBhaXIgaXMgMTUgYml0cyBmb3IgdGhlXG4gICAgICBsZW5ndGggY29kZSwgNSBiaXRzIGZvciB0aGUgbGVuZ3RoIGV4dHJhLCAxNSBiaXRzIGZvciB0aGUgZGlzdGFuY2UgY29kZSxcbiAgICAgIGFuZCAxMyBiaXRzIGZvciB0aGUgZGlzdGFuY2UgZXh0cmEuICBUaGlzIHRvdGFscyA0OCBiaXRzLCBvciBzaXggYnl0ZXMuXG4gICAgICBUaGVyZWZvcmUgaWYgc3RybS5hdmFpbF9pbiA+PSA2LCB0aGVuIHRoZXJlIGlzIGVub3VnaCBpbnB1dCB0byBhdm9pZFxuICAgICAgY2hlY2tpbmcgZm9yIGF2YWlsYWJsZSBpbnB1dCB3aGlsZSBkZWNvZGluZy5cblxuICAgIC0gVGhlIG1heGltdW0gYnl0ZXMgdGhhdCBhIHNpbmdsZSBsZW5ndGgvZGlzdGFuY2UgcGFpciBjYW4gb3V0cHV0IGlzIDI1OFxuICAgICAgYnl0ZXMsIHdoaWNoIGlzIHRoZSBtYXhpbXVtIGxlbmd0aCB0aGF0IGNhbiBiZSBjb2RlZC4gIGluZmxhdGVfZmFzdCgpXG4gICAgICByZXF1aXJlcyBzdHJtLmF2YWlsX291dCA+PSAyNTggZm9yIGVhY2ggbG9vcCB0byBhdm9pZCBjaGVja2luZyBmb3JcbiAgICAgIG91dHB1dCBzcGFjZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmZsYXRlX2Zhc3Qoc3RybSwgc3RhcnQpIHtcbiAgdmFyIHN0YXRlO1xuICB2YXIgX2luOyAgICAgICAgICAgICAgICAgICAgLyogbG9jYWwgc3RybS5pbnB1dCAqL1xuICB2YXIgbGFzdDsgICAgICAgICAgICAgICAgICAgLyogaGF2ZSBlbm91Z2ggaW5wdXQgd2hpbGUgaW4gPCBsYXN0ICovXG4gIHZhciBfb3V0OyAgICAgICAgICAgICAgICAgICAvKiBsb2NhbCBzdHJtLm91dHB1dCAqL1xuICB2YXIgYmVnOyAgICAgICAgICAgICAgICAgICAgLyogaW5mbGF0ZSgpJ3MgaW5pdGlhbCBzdHJtLm91dHB1dCAqL1xuICB2YXIgZW5kOyAgICAgICAgICAgICAgICAgICAgLyogd2hpbGUgb3V0IDwgZW5kLCBlbm91Z2ggc3BhY2UgYXZhaWxhYmxlICovXG4vLyNpZmRlZiBJTkZMQVRFX1NUUklDVFxuICB2YXIgZG1heDsgICAgICAgICAgICAgICAgICAgLyogbWF4aW11bSBkaXN0YW5jZSBmcm9tIHpsaWIgaGVhZGVyICovXG4vLyNlbmRpZlxuICB2YXIgd3NpemU7ICAgICAgICAgICAgICAgICAgLyogd2luZG93IHNpemUgb3IgemVybyBpZiBub3QgdXNpbmcgd2luZG93ICovXG4gIHZhciB3aGF2ZTsgICAgICAgICAgICAgICAgICAvKiB2YWxpZCBieXRlcyBpbiB0aGUgd2luZG93ICovXG4gIHZhciB3bmV4dDsgICAgICAgICAgICAgICAgICAvKiB3aW5kb3cgd3JpdGUgaW5kZXggKi9cbiAgLy8gVXNlIGBzX3dpbmRvd2AgaW5zdGVhZCBgd2luZG93YCwgYXZvaWQgY29uZmxpY3Qgd2l0aCBpbnN0cnVtZW50YXRpb24gdG9vbHNcbiAgdmFyIHNfd2luZG93OyAgICAgICAgICAgICAgIC8qIGFsbG9jYXRlZCBzbGlkaW5nIHdpbmRvdywgaWYgd3NpemUgIT0gMCAqL1xuICB2YXIgaG9sZDsgICAgICAgICAgICAgICAgICAgLyogbG9jYWwgc3RybS5ob2xkICovXG4gIHZhciBiaXRzOyAgICAgICAgICAgICAgICAgICAvKiBsb2NhbCBzdHJtLmJpdHMgKi9cbiAgdmFyIGxjb2RlOyAgICAgICAgICAgICAgICAgIC8qIGxvY2FsIHN0cm0ubGVuY29kZSAqL1xuICB2YXIgZGNvZGU7ICAgICAgICAgICAgICAgICAgLyogbG9jYWwgc3RybS5kaXN0Y29kZSAqL1xuICB2YXIgbG1hc2s7ICAgICAgICAgICAgICAgICAgLyogbWFzayBmb3IgZmlyc3QgbGV2ZWwgb2YgbGVuZ3RoIGNvZGVzICovXG4gIHZhciBkbWFzazsgICAgICAgICAgICAgICAgICAvKiBtYXNrIGZvciBmaXJzdCBsZXZlbCBvZiBkaXN0YW5jZSBjb2RlcyAqL1xuICB2YXIgaGVyZTsgICAgICAgICAgICAgICAgICAgLyogcmV0cmlldmVkIHRhYmxlIGVudHJ5ICovXG4gIHZhciBvcDsgICAgICAgICAgICAgICAgICAgICAvKiBjb2RlIGJpdHMsIG9wZXJhdGlvbiwgZXh0cmEgYml0cywgb3IgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICB3aW5kb3cgcG9zaXRpb24sIHdpbmRvdyBieXRlcyB0byBjb3B5ICovXG4gIHZhciBsZW47ICAgICAgICAgICAgICAgICAgICAvKiBtYXRjaCBsZW5ndGgsIHVudXNlZCBieXRlcyAqL1xuICB2YXIgZGlzdDsgICAgICAgICAgICAgICAgICAgLyogbWF0Y2ggZGlzdGFuY2UgKi9cbiAgdmFyIGZyb207ICAgICAgICAgICAgICAgICAgIC8qIHdoZXJlIHRvIGNvcHkgbWF0Y2ggZnJvbSAqL1xuICB2YXIgZnJvbV9zb3VyY2U7XG5cblxuICB2YXIgaW5wdXQsIG91dHB1dDsgLy8gSlMgc3BlY2lmaWMsIGJlY2F1c2Ugd2UgaGF2ZSBubyBwb2ludGVyc1xuXG4gIC8qIGNvcHkgc3RhdGUgdG8gbG9jYWwgdmFyaWFibGVzICovXG4gIHN0YXRlID0gc3RybS5zdGF0ZTtcbiAgLy9oZXJlID0gc3RhdGUuaGVyZTtcbiAgX2luID0gc3RybS5uZXh0X2luO1xuICBpbnB1dCA9IHN0cm0uaW5wdXQ7XG4gIGxhc3QgPSBfaW4gKyAoc3RybS5hdmFpbF9pbiAtIDUpO1xuICBfb3V0ID0gc3RybS5uZXh0X291dDtcbiAgb3V0cHV0ID0gc3RybS5vdXRwdXQ7XG4gIGJlZyA9IF9vdXQgLSAoc3RhcnQgLSBzdHJtLmF2YWlsX291dCk7XG4gIGVuZCA9IF9vdXQgKyAoc3RybS5hdmFpbF9vdXQgLSAyNTcpO1xuLy8jaWZkZWYgSU5GTEFURV9TVFJJQ1RcbiAgZG1heCA9IHN0YXRlLmRtYXg7XG4vLyNlbmRpZlxuICB3c2l6ZSA9IHN0YXRlLndzaXplO1xuICB3aGF2ZSA9IHN0YXRlLndoYXZlO1xuICB3bmV4dCA9IHN0YXRlLnduZXh0O1xuICBzX3dpbmRvdyA9IHN0YXRlLndpbmRvdztcbiAgaG9sZCA9IHN0YXRlLmhvbGQ7XG4gIGJpdHMgPSBzdGF0ZS5iaXRzO1xuICBsY29kZSA9IHN0YXRlLmxlbmNvZGU7XG4gIGRjb2RlID0gc3RhdGUuZGlzdGNvZGU7XG4gIGxtYXNrID0gKDEgPDwgc3RhdGUubGVuYml0cykgLSAxO1xuICBkbWFzayA9ICgxIDw8IHN0YXRlLmRpc3RiaXRzKSAtIDE7XG5cblxuICAvKiBkZWNvZGUgbGl0ZXJhbHMgYW5kIGxlbmd0aC9kaXN0YW5jZXMgdW50aWwgZW5kLW9mLWJsb2NrIG9yIG5vdCBlbm91Z2hcbiAgICAgaW5wdXQgZGF0YSBvciBvdXRwdXQgc3BhY2UgKi9cblxuICB0b3A6XG4gIGRvIHtcbiAgICBpZiAoYml0cyA8IDE1KSB7XG4gICAgICBob2xkICs9IGlucHV0W19pbisrXSA8PCBiaXRzO1xuICAgICAgYml0cyArPSA4O1xuICAgICAgaG9sZCArPSBpbnB1dFtfaW4rK10gPDwgYml0cztcbiAgICAgIGJpdHMgKz0gODtcbiAgICB9XG5cbiAgICBoZXJlID0gbGNvZGVbaG9sZCAmIGxtYXNrXTtcblxuICAgIGRvbGVuOlxuICAgIGZvciAoOzspIHsgLy8gR290byBlbXVsYXRpb25cbiAgICAgIG9wID0gaGVyZSA+Pj4gMjQvKmhlcmUuYml0cyovO1xuICAgICAgaG9sZCA+Pj49IG9wO1xuICAgICAgYml0cyAtPSBvcDtcbiAgICAgIG9wID0gKGhlcmUgPj4+IDE2KSAmIDB4ZmYvKmhlcmUub3AqLztcbiAgICAgIGlmIChvcCA9PT0gMCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgLyogbGl0ZXJhbCAqL1xuICAgICAgICAvL1RyYWNldnYoKHN0ZGVyciwgaGVyZS52YWwgPj0gMHgyMCAmJiBoZXJlLnZhbCA8IDB4N2YgP1xuICAgICAgICAvLyAgICAgICAgXCJpbmZsYXRlOiAgICAgICAgIGxpdGVyYWwgJyVjJ1xcblwiIDpcbiAgICAgICAgLy8gICAgICAgIFwiaW5mbGF0ZTogICAgICAgICBsaXRlcmFsIDB4JTAyeFxcblwiLCBoZXJlLnZhbCkpO1xuICAgICAgICBvdXRwdXRbX291dCsrXSA9IGhlcmUgJiAweGZmZmYvKmhlcmUudmFsKi87XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChvcCAmIDE2KSB7ICAgICAgICAgICAgICAgICAgICAgLyogbGVuZ3RoIGJhc2UgKi9cbiAgICAgICAgbGVuID0gaGVyZSAmIDB4ZmZmZi8qaGVyZS52YWwqLztcbiAgICAgICAgb3AgJj0gMTU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogbnVtYmVyIG9mIGV4dHJhIGJpdHMgKi9cbiAgICAgICAgaWYgKG9wKSB7XG4gICAgICAgICAgaWYgKGJpdHMgPCBvcCkge1xuICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtfaW4rK10gPDwgYml0cztcbiAgICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGVuICs9IGhvbGQgJiAoKDEgPDwgb3ApIC0gMSk7XG4gICAgICAgICAgaG9sZCA+Pj49IG9wO1xuICAgICAgICAgIGJpdHMgLT0gb3A7XG4gICAgICAgIH1cbiAgICAgICAgLy9UcmFjZXZ2KChzdGRlcnIsIFwiaW5mbGF0ZTogICAgICAgICBsZW5ndGggJXVcXG5cIiwgbGVuKSk7XG4gICAgICAgIGlmIChiaXRzIDwgMTUpIHtcbiAgICAgICAgICBob2xkICs9IGlucHV0W19pbisrXSA8PCBiaXRzO1xuICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgICBob2xkICs9IGlucHV0W19pbisrXSA8PCBiaXRzO1xuICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgfVxuICAgICAgICBoZXJlID0gZGNvZGVbaG9sZCAmIGRtYXNrXTtcblxuICAgICAgICBkb2Rpc3Q6XG4gICAgICAgIGZvciAoOzspIHsgLy8gZ290byBlbXVsYXRpb25cbiAgICAgICAgICBvcCA9IGhlcmUgPj4+IDI0LypoZXJlLmJpdHMqLztcbiAgICAgICAgICBob2xkID4+Pj0gb3A7XG4gICAgICAgICAgYml0cyAtPSBvcDtcbiAgICAgICAgICBvcCA9IChoZXJlID4+PiAxNikgJiAweGZmLypoZXJlLm9wKi87XG5cbiAgICAgICAgICBpZiAob3AgJiAxNikgeyAgICAgICAgICAgICAgICAgICAgICAvKiBkaXN0YW5jZSBiYXNlICovXG4gICAgICAgICAgICBkaXN0ID0gaGVyZSAmIDB4ZmZmZi8qaGVyZS52YWwqLztcbiAgICAgICAgICAgIG9wICY9IDE1OyAgICAgICAgICAgICAgICAgICAgICAgLyogbnVtYmVyIG9mIGV4dHJhIGJpdHMgKi9cbiAgICAgICAgICAgIGlmIChiaXRzIDwgb3ApIHtcbiAgICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtfaW4rK10gPDwgYml0cztcbiAgICAgICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgICAgICBpZiAoYml0cyA8IG9wKSB7XG4gICAgICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtfaW4rK10gPDwgYml0cztcbiAgICAgICAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpc3QgKz0gaG9sZCAmICgoMSA8PCBvcCkgLSAxKTtcbi8vI2lmZGVmIElORkxBVEVfU1RSSUNUXG4gICAgICAgICAgICBpZiAoZGlzdCA+IGRtYXgpIHtcbiAgICAgICAgICAgICAgc3RybS5tc2cgPSAnaW52YWxpZCBkaXN0YW5jZSB0b28gZmFyIGJhY2snO1xuICAgICAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgICAgICBicmVhayB0b3A7XG4gICAgICAgICAgICB9XG4vLyNlbmRpZlxuICAgICAgICAgICAgaG9sZCA+Pj49IG9wO1xuICAgICAgICAgICAgYml0cyAtPSBvcDtcbiAgICAgICAgICAgIC8vVHJhY2V2digoc3RkZXJyLCBcImluZmxhdGU6ICAgICAgICAgZGlzdGFuY2UgJXVcXG5cIiwgZGlzdCkpO1xuICAgICAgICAgICAgb3AgPSBfb3V0IC0gYmVnOyAgICAgICAgICAgICAgICAvKiBtYXggZGlzdGFuY2UgaW4gb3V0cHV0ICovXG4gICAgICAgICAgICBpZiAoZGlzdCA+IG9wKSB7ICAgICAgICAgICAgICAgIC8qIHNlZSBpZiBjb3B5IGZyb20gd2luZG93ICovXG4gICAgICAgICAgICAgIG9wID0gZGlzdCAtIG9wOyAgICAgICAgICAgICAgIC8qIGRpc3RhbmNlIGJhY2sgaW4gd2luZG93ICovXG4gICAgICAgICAgICAgIGlmIChvcCA+IHdoYXZlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLnNhbmUpIHtcbiAgICAgICAgICAgICAgICAgIHN0cm0ubXNnID0gJ2ludmFsaWQgZGlzdGFuY2UgdG9vIGZhciBiYWNrJztcbiAgICAgICAgICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgICAgICAgICBicmVhayB0b3A7XG4gICAgICAgICAgICAgICAgfVxuXG4vLyAoISkgVGhpcyBibG9jayBpcyBkaXNhYmxlZCBpbiB6bGliIGRlZmF1bHRzLFxuLy8gZG9uJ3QgZW5hYmxlIGl0IGZvciBiaW5hcnkgY29tcGF0aWJpbGl0eVxuLy8jaWZkZWYgSU5GTEFURV9BTExPV19JTlZBTElEX0RJU1RBTkNFX1RPT0ZBUl9BUlJSXG4vLyAgICAgICAgICAgICAgICBpZiAobGVuIDw9IG9wIC0gd2hhdmUpIHtcbi8vICAgICAgICAgICAgICAgICAgZG8ge1xuLy8gICAgICAgICAgICAgICAgICAgIG91dHB1dFtfb3V0KytdID0gMDtcbi8vICAgICAgICAgICAgICAgICAgfSB3aGlsZSAoLS1sZW4pO1xuLy8gICAgICAgICAgICAgICAgICBjb250aW51ZSB0b3A7XG4vLyAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICBsZW4gLT0gb3AgLSB3aGF2ZTtcbi8vICAgICAgICAgICAgICAgIGRvIHtcbi8vICAgICAgICAgICAgICAgICAgb3V0cHV0W19vdXQrK10gPSAwO1xuLy8gICAgICAgICAgICAgICAgfSB3aGlsZSAoLS1vcCA+IHdoYXZlKTtcbi8vICAgICAgICAgICAgICAgIGlmIChvcCA9PT0gMCkge1xuLy8gICAgICAgICAgICAgICAgICBmcm9tID0gX291dCAtIGRpc3Q7XG4vLyAgICAgICAgICAgICAgICAgIGRvIHtcbi8vICAgICAgICAgICAgICAgICAgICBvdXRwdXRbX291dCsrXSA9IG91dHB1dFtmcm9tKytdO1xuLy8gICAgICAgICAgICAgICAgICB9IHdoaWxlICgtLWxlbik7XG4vLyAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIHRvcDtcbi8vICAgICAgICAgICAgICAgIH1cbi8vI2VuZGlmXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZnJvbSA9IDA7IC8vIHdpbmRvdyBpbmRleFxuICAgICAgICAgICAgICBmcm9tX3NvdXJjZSA9IHNfd2luZG93O1xuICAgICAgICAgICAgICBpZiAod25leHQgPT09IDApIHsgICAgICAgICAgIC8qIHZlcnkgY29tbW9uIGNhc2UgKi9cbiAgICAgICAgICAgICAgICBmcm9tICs9IHdzaXplIC0gb3A7XG4gICAgICAgICAgICAgICAgaWYgKG9wIDwgbGVuKSB7ICAgICAgICAgLyogc29tZSBmcm9tIHdpbmRvdyAqL1xuICAgICAgICAgICAgICAgICAgbGVuIC09IG9wO1xuICAgICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXRbX291dCsrXSA9IHNfd2luZG93W2Zyb20rK107XG4gICAgICAgICAgICAgICAgICB9IHdoaWxlICgtLW9wKTtcbiAgICAgICAgICAgICAgICAgIGZyb20gPSBfb3V0IC0gZGlzdDsgIC8qIHJlc3QgZnJvbSBvdXRwdXQgKi9cbiAgICAgICAgICAgICAgICAgIGZyb21fc291cmNlID0gb3V0cHV0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIGlmICh3bmV4dCA8IG9wKSB7ICAgICAgLyogd3JhcCBhcm91bmQgd2luZG93ICovXG4gICAgICAgICAgICAgICAgZnJvbSArPSB3c2l6ZSArIHduZXh0IC0gb3A7XG4gICAgICAgICAgICAgICAgb3AgLT0gd25leHQ7XG4gICAgICAgICAgICAgICAgaWYgKG9wIDwgbGVuKSB7ICAgICAgICAgLyogc29tZSBmcm9tIGVuZCBvZiB3aW5kb3cgKi9cbiAgICAgICAgICAgICAgICAgIGxlbiAtPSBvcDtcbiAgICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0W19vdXQrK10gPSBzX3dpbmRvd1tmcm9tKytdO1xuICAgICAgICAgICAgICAgICAgfSB3aGlsZSAoLS1vcCk7XG4gICAgICAgICAgICAgICAgICBmcm9tID0gMDtcbiAgICAgICAgICAgICAgICAgIGlmICh3bmV4dCA8IGxlbikgeyAgLyogc29tZSBmcm9tIHN0YXJ0IG9mIHdpbmRvdyAqL1xuICAgICAgICAgICAgICAgICAgICBvcCA9IHduZXh0O1xuICAgICAgICAgICAgICAgICAgICBsZW4gLT0gb3A7XG4gICAgICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRbX291dCsrXSA9IHNfd2luZG93W2Zyb20rK107XG4gICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKC0tb3ApO1xuICAgICAgICAgICAgICAgICAgICBmcm9tID0gX291dCAtIGRpc3Q7ICAgICAgLyogcmVzdCBmcm9tIG91dHB1dCAqL1xuICAgICAgICAgICAgICAgICAgICBmcm9tX3NvdXJjZSA9IG91dHB1dDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgIC8qIGNvbnRpZ3VvdXMgaW4gd2luZG93ICovXG4gICAgICAgICAgICAgICAgZnJvbSArPSB3bmV4dCAtIG9wO1xuICAgICAgICAgICAgICAgIGlmIChvcCA8IGxlbikgeyAgICAgICAgIC8qIHNvbWUgZnJvbSB3aW5kb3cgKi9cbiAgICAgICAgICAgICAgICAgIGxlbiAtPSBvcDtcbiAgICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0W19vdXQrK10gPSBzX3dpbmRvd1tmcm9tKytdO1xuICAgICAgICAgICAgICAgICAgfSB3aGlsZSAoLS1vcCk7XG4gICAgICAgICAgICAgICAgICBmcm9tID0gX291dCAtIGRpc3Q7ICAvKiByZXN0IGZyb20gb3V0cHV0ICovXG4gICAgICAgICAgICAgICAgICBmcm9tX3NvdXJjZSA9IG91dHB1dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgd2hpbGUgKGxlbiA+IDIpIHtcbiAgICAgICAgICAgICAgICBvdXRwdXRbX291dCsrXSA9IGZyb21fc291cmNlW2Zyb20rK107XG4gICAgICAgICAgICAgICAgb3V0cHV0W19vdXQrK10gPSBmcm9tX3NvdXJjZVtmcm9tKytdO1xuICAgICAgICAgICAgICAgIG91dHB1dFtfb3V0KytdID0gZnJvbV9zb3VyY2VbZnJvbSsrXTtcbiAgICAgICAgICAgICAgICBsZW4gLT0gMztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAobGVuKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W19vdXQrK10gPSBmcm9tX3NvdXJjZVtmcm9tKytdO1xuICAgICAgICAgICAgICAgIGlmIChsZW4gPiAxKSB7XG4gICAgICAgICAgICAgICAgICBvdXRwdXRbX291dCsrXSA9IGZyb21fc291cmNlW2Zyb20rK107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgZnJvbSA9IF9vdXQgLSBkaXN0OyAgICAgICAgICAvKiBjb3B5IGRpcmVjdCBmcm9tIG91dHB1dCAqL1xuICAgICAgICAgICAgICBkbyB7ICAgICAgICAgICAgICAgICAgICAgICAgLyogbWluaW11bSBsZW5ndGggaXMgdGhyZWUgKi9cbiAgICAgICAgICAgICAgICBvdXRwdXRbX291dCsrXSA9IG91dHB1dFtmcm9tKytdO1xuICAgICAgICAgICAgICAgIG91dHB1dFtfb3V0KytdID0gb3V0cHV0W2Zyb20rK107XG4gICAgICAgICAgICAgICAgb3V0cHV0W19vdXQrK10gPSBvdXRwdXRbZnJvbSsrXTtcbiAgICAgICAgICAgICAgICBsZW4gLT0gMztcbiAgICAgICAgICAgICAgfSB3aGlsZSAobGVuID4gMik7XG4gICAgICAgICAgICAgIGlmIChsZW4pIHtcbiAgICAgICAgICAgICAgICBvdXRwdXRbX291dCsrXSA9IG91dHB1dFtmcm9tKytdO1xuICAgICAgICAgICAgICAgIGlmIChsZW4gPiAxKSB7XG4gICAgICAgICAgICAgICAgICBvdXRwdXRbX291dCsrXSA9IG91dHB1dFtmcm9tKytdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICgob3AgJiA2NCkgPT09IDApIHsgICAgICAgICAgLyogMm5kIGxldmVsIGRpc3RhbmNlIGNvZGUgKi9cbiAgICAgICAgICAgIGhlcmUgPSBkY29kZVsoaGVyZSAmIDB4ZmZmZikvKmhlcmUudmFsKi8gKyAoaG9sZCAmICgoMSA8PCBvcCkgLSAxKSldO1xuICAgICAgICAgICAgY29udGludWUgZG9kaXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0cm0ubXNnID0gJ2ludmFsaWQgZGlzdGFuY2UgY29kZSc7XG4gICAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgICAgYnJlYWsgdG9wO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrOyAvLyBuZWVkIHRvIGVtdWxhdGUgZ290byB2aWEgXCJjb250aW51ZVwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKChvcCAmIDY0KSA9PT0gMCkgeyAgICAgICAgICAgICAgLyogMm5kIGxldmVsIGxlbmd0aCBjb2RlICovXG4gICAgICAgIGhlcmUgPSBsY29kZVsoaGVyZSAmIDB4ZmZmZikvKmhlcmUudmFsKi8gKyAoaG9sZCAmICgoMSA8PCBvcCkgLSAxKSldO1xuICAgICAgICBjb250aW51ZSBkb2xlbjtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKG9wICYgMzIpIHsgICAgICAgICAgICAgICAgICAgICAvKiBlbmQtb2YtYmxvY2sgKi9cbiAgICAgICAgLy9UcmFjZXZ2KChzdGRlcnIsIFwiaW5mbGF0ZTogICAgICAgICBlbmQgb2YgYmxvY2tcXG5cIikpO1xuICAgICAgICBzdGF0ZS5tb2RlID0gVFlQRTtcbiAgICAgICAgYnJlYWsgdG9wO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHN0cm0ubXNnID0gJ2ludmFsaWQgbGl0ZXJhbC9sZW5ndGggY29kZSc7XG4gICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgIGJyZWFrIHRvcDtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7IC8vIG5lZWQgdG8gZW11bGF0ZSBnb3RvIHZpYSBcImNvbnRpbnVlXCJcbiAgICB9XG4gIH0gd2hpbGUgKF9pbiA8IGxhc3QgJiYgX291dCA8IGVuZCk7XG5cbiAgLyogcmV0dXJuIHVudXNlZCBieXRlcyAob24gZW50cnksIGJpdHMgPCA4LCBzbyBpbiB3b24ndCBnbyB0b28gZmFyIGJhY2spICovXG4gIGxlbiA9IGJpdHMgPj4gMztcbiAgX2luIC09IGxlbjtcbiAgYml0cyAtPSBsZW4gPDwgMztcbiAgaG9sZCAmPSAoMSA8PCBiaXRzKSAtIDE7XG5cbiAgLyogdXBkYXRlIHN0YXRlIGFuZCByZXR1cm4gKi9cbiAgc3RybS5uZXh0X2luID0gX2luO1xuICBzdHJtLm5leHRfb3V0ID0gX291dDtcbiAgc3RybS5hdmFpbF9pbiA9IChfaW4gPCBsYXN0ID8gNSArIChsYXN0IC0gX2luKSA6IDUgLSAoX2luIC0gbGFzdCkpO1xuICBzdHJtLmF2YWlsX291dCA9IChfb3V0IDwgZW5kID8gMjU3ICsgKGVuZCAtIF9vdXQpIDogMjU3IC0gKF9vdXQgLSBlbmQpKTtcbiAgc3RhdGUuaG9sZCA9IGhvbGQ7XG4gIHN0YXRlLmJpdHMgPSBiaXRzO1xuICByZXR1cm47XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLy8gKEMpIDE5OTUtMjAxMyBKZWFuLWxvdXAgR2FpbGx5IGFuZCBNYXJrIEFkbGVyXG4vLyAoQykgMjAxNC0yMDE3IFZpdGFseSBQdXpyaW4gYW5kIEFuZHJleSBUdXBpdHNpblxuLy9cbi8vIFRoaXMgc29mdHdhcmUgaXMgcHJvdmlkZWQgJ2FzLWlzJywgd2l0aG91dCBhbnkgZXhwcmVzcyBvciBpbXBsaWVkXG4vLyB3YXJyYW50eS4gSW4gbm8gZXZlbnQgd2lsbCB0aGUgYXV0aG9ycyBiZSBoZWxkIGxpYWJsZSBmb3IgYW55IGRhbWFnZXNcbi8vIGFyaXNpbmcgZnJvbSB0aGUgdXNlIG9mIHRoaXMgc29mdHdhcmUuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIGFueW9uZSB0byB1c2UgdGhpcyBzb2Z0d2FyZSBmb3IgYW55IHB1cnBvc2UsXG4vLyBpbmNsdWRpbmcgY29tbWVyY2lhbCBhcHBsaWNhdGlvbnMsIGFuZCB0byBhbHRlciBpdCBhbmQgcmVkaXN0cmlidXRlIGl0XG4vLyBmcmVlbHksIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyByZXN0cmljdGlvbnM6XG4vL1xuLy8gMS4gVGhlIG9yaWdpbiBvZiB0aGlzIHNvZnR3YXJlIG11c3Qgbm90IGJlIG1pc3JlcHJlc2VudGVkOyB5b3UgbXVzdCBub3Rcbi8vICAgY2xhaW0gdGhhdCB5b3Ugd3JvdGUgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLiBJZiB5b3UgdXNlIHRoaXMgc29mdHdhcmVcbi8vICAgaW4gYSBwcm9kdWN0LCBhbiBhY2tub3dsZWRnbWVudCBpbiB0aGUgcHJvZHVjdCBkb2N1bWVudGF0aW9uIHdvdWxkIGJlXG4vLyAgIGFwcHJlY2lhdGVkIGJ1dCBpcyBub3QgcmVxdWlyZWQuXG4vLyAyLiBBbHRlcmVkIHNvdXJjZSB2ZXJzaW9ucyBtdXN0IGJlIHBsYWlubHkgbWFya2VkIGFzIHN1Y2gsIGFuZCBtdXN0IG5vdCBiZVxuLy8gICBtaXNyZXByZXNlbnRlZCBhcyBiZWluZyB0aGUgb3JpZ2luYWwgc29mdHdhcmUuXG4vLyAzLiBUaGlzIG5vdGljZSBtYXkgbm90IGJlIHJlbW92ZWQgb3IgYWx0ZXJlZCBmcm9tIGFueSBzb3VyY2UgZGlzdHJpYnV0aW9uLlxuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy9jb21tb24nKTtcblxudmFyIE1BWEJJVFMgPSAxNTtcbnZhciBFTk9VR0hfTEVOUyA9IDg1MjtcbnZhciBFTk9VR0hfRElTVFMgPSA1OTI7XG4vL3ZhciBFTk9VR0ggPSAoRU5PVUdIX0xFTlMrRU5PVUdIX0RJU1RTKTtcblxudmFyIENPREVTID0gMDtcbnZhciBMRU5TID0gMTtcbnZhciBESVNUUyA9IDI7XG5cbnZhciBsYmFzZSA9IFsgLyogTGVuZ3RoIGNvZGVzIDI1Ny4uMjg1IGJhc2UgKi9cbiAgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMywgMTUsIDE3LCAxOSwgMjMsIDI3LCAzMSxcbiAgMzUsIDQzLCA1MSwgNTksIDY3LCA4MywgOTksIDExNSwgMTMxLCAxNjMsIDE5NSwgMjI3LCAyNTgsIDAsIDBcbl07XG5cbnZhciBsZXh0ID0gWyAvKiBMZW5ndGggY29kZXMgMjU3Li4yODUgZXh0cmEgKi9cbiAgMTYsIDE2LCAxNiwgMTYsIDE2LCAxNiwgMTYsIDE2LCAxNywgMTcsIDE3LCAxNywgMTgsIDE4LCAxOCwgMTgsXG4gIDE5LCAxOSwgMTksIDE5LCAyMCwgMjAsIDIwLCAyMCwgMjEsIDIxLCAyMSwgMjEsIDE2LCA3MiwgNzhcbl07XG5cbnZhciBkYmFzZSA9IFsgLyogRGlzdGFuY2UgY29kZXMgMC4uMjkgYmFzZSAqL1xuICAxLCAyLCAzLCA0LCA1LCA3LCA5LCAxMywgMTcsIDI1LCAzMywgNDksIDY1LCA5NywgMTI5LCAxOTMsXG4gIDI1NywgMzg1LCA1MTMsIDc2OSwgMTAyNSwgMTUzNywgMjA0OSwgMzA3MywgNDA5NywgNjE0NSxcbiAgODE5MywgMTIyODksIDE2Mzg1LCAyNDU3NywgMCwgMFxuXTtcblxudmFyIGRleHQgPSBbIC8qIERpc3RhbmNlIGNvZGVzIDAuLjI5IGV4dHJhICovXG4gIDE2LCAxNiwgMTYsIDE2LCAxNywgMTcsIDE4LCAxOCwgMTksIDE5LCAyMCwgMjAsIDIxLCAyMSwgMjIsIDIyLFxuICAyMywgMjMsIDI0LCAyNCwgMjUsIDI1LCAyNiwgMjYsIDI3LCAyNyxcbiAgMjgsIDI4LCAyOSwgMjksIDY0LCA2NFxuXTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmZsYXRlX3RhYmxlKHR5cGUsIGxlbnMsIGxlbnNfaW5kZXgsIGNvZGVzLCB0YWJsZSwgdGFibGVfaW5kZXgsIHdvcmssIG9wdHMpXG57XG4gIHZhciBiaXRzID0gb3B0cy5iaXRzO1xuICAgICAgLy9oZXJlID0gb3B0cy5oZXJlOyAvKiB0YWJsZSBlbnRyeSBmb3IgZHVwbGljYXRpb24gKi9cblxuICB2YXIgbGVuID0gMDsgICAgICAgICAgICAgICAvKiBhIGNvZGUncyBsZW5ndGggaW4gYml0cyAqL1xuICB2YXIgc3ltID0gMDsgICAgICAgICAgICAgICAvKiBpbmRleCBvZiBjb2RlIHN5bWJvbHMgKi9cbiAgdmFyIG1pbiA9IDAsIG1heCA9IDA7ICAgICAgICAgIC8qIG1pbmltdW0gYW5kIG1heGltdW0gY29kZSBsZW5ndGhzICovXG4gIHZhciByb290ID0gMDsgICAgICAgICAgICAgIC8qIG51bWJlciBvZiBpbmRleCBiaXRzIGZvciByb290IHRhYmxlICovXG4gIHZhciBjdXJyID0gMDsgICAgICAgICAgICAgIC8qIG51bWJlciBvZiBpbmRleCBiaXRzIGZvciBjdXJyZW50IHRhYmxlICovXG4gIHZhciBkcm9wID0gMDsgICAgICAgICAgICAgIC8qIGNvZGUgYml0cyB0byBkcm9wIGZvciBzdWItdGFibGUgKi9cbiAgdmFyIGxlZnQgPSAwOyAgICAgICAgICAgICAgICAgICAvKiBudW1iZXIgb2YgcHJlZml4IGNvZGVzIGF2YWlsYWJsZSAqL1xuICB2YXIgdXNlZCA9IDA7ICAgICAgICAgICAgICAvKiBjb2RlIGVudHJpZXMgaW4gdGFibGUgdXNlZCAqL1xuICB2YXIgaHVmZiA9IDA7ICAgICAgICAgICAgICAvKiBIdWZmbWFuIGNvZGUgKi9cbiAgdmFyIGluY3I7ICAgICAgICAgICAgICAvKiBmb3IgaW5jcmVtZW50aW5nIGNvZGUsIGluZGV4ICovXG4gIHZhciBmaWxsOyAgICAgICAgICAgICAgLyogaW5kZXggZm9yIHJlcGxpY2F0aW5nIGVudHJpZXMgKi9cbiAgdmFyIGxvdzsgICAgICAgICAgICAgICAvKiBsb3cgYml0cyBmb3IgY3VycmVudCByb290IGVudHJ5ICovXG4gIHZhciBtYXNrOyAgICAgICAgICAgICAgLyogbWFzayBmb3IgbG93IHJvb3QgYml0cyAqL1xuICB2YXIgbmV4dDsgICAgICAgICAgICAgLyogbmV4dCBhdmFpbGFibGUgc3BhY2UgaW4gdGFibGUgKi9cbiAgdmFyIGJhc2UgPSBudWxsOyAgICAgLyogYmFzZSB2YWx1ZSB0YWJsZSB0byB1c2UgKi9cbiAgdmFyIGJhc2VfaW5kZXggPSAwO1xuLy8gIHZhciBzaG9leHRyYTsgICAgLyogZXh0cmEgYml0cyB0YWJsZSB0byB1c2UgKi9cbiAgdmFyIGVuZDsgICAgICAgICAgICAgICAgICAgIC8qIHVzZSBiYXNlIGFuZCBleHRyYSBmb3Igc3ltYm9sID4gZW5kICovXG4gIHZhciBjb3VudCA9IG5ldyB1dGlscy5CdWYxNihNQVhCSVRTICsgMSk7IC8vW01BWEJJVFMrMV07ICAgIC8qIG51bWJlciBvZiBjb2RlcyBvZiBlYWNoIGxlbmd0aCAqL1xuICB2YXIgb2ZmcyA9IG5ldyB1dGlscy5CdWYxNihNQVhCSVRTICsgMSk7IC8vW01BWEJJVFMrMV07ICAgICAvKiBvZmZzZXRzIGluIHRhYmxlIGZvciBlYWNoIGxlbmd0aCAqL1xuICB2YXIgZXh0cmEgPSBudWxsO1xuICB2YXIgZXh0cmFfaW5kZXggPSAwO1xuXG4gIHZhciBoZXJlX2JpdHMsIGhlcmVfb3AsIGhlcmVfdmFsO1xuXG4gIC8qXG4gICBQcm9jZXNzIGEgc2V0IG9mIGNvZGUgbGVuZ3RocyB0byBjcmVhdGUgYSBjYW5vbmljYWwgSHVmZm1hbiBjb2RlLiAgVGhlXG4gICBjb2RlIGxlbmd0aHMgYXJlIGxlbnNbMC4uY29kZXMtMV0uICBFYWNoIGxlbmd0aCBjb3JyZXNwb25kcyB0byB0aGVcbiAgIHN5bWJvbHMgMC4uY29kZXMtMS4gIFRoZSBIdWZmbWFuIGNvZGUgaXMgZ2VuZXJhdGVkIGJ5IGZpcnN0IHNvcnRpbmcgdGhlXG4gICBzeW1ib2xzIGJ5IGxlbmd0aCBmcm9tIHNob3J0IHRvIGxvbmcsIGFuZCByZXRhaW5pbmcgdGhlIHN5bWJvbCBvcmRlclxuICAgZm9yIGNvZGVzIHdpdGggZXF1YWwgbGVuZ3Rocy4gIFRoZW4gdGhlIGNvZGUgc3RhcnRzIHdpdGggYWxsIHplcm8gYml0c1xuICAgZm9yIHRoZSBmaXJzdCBjb2RlIG9mIHRoZSBzaG9ydGVzdCBsZW5ndGgsIGFuZCB0aGUgY29kZXMgYXJlIGludGVnZXJcbiAgIGluY3JlbWVudHMgZm9yIHRoZSBzYW1lIGxlbmd0aCwgYW5kIHplcm9zIGFyZSBhcHBlbmRlZCBhcyB0aGUgbGVuZ3RoXG4gICBpbmNyZWFzZXMuICBGb3IgdGhlIGRlZmxhdGUgZm9ybWF0LCB0aGVzZSBiaXRzIGFyZSBzdG9yZWQgYmFja3dhcmRzXG4gICBmcm9tIHRoZWlyIG1vcmUgbmF0dXJhbCBpbnRlZ2VyIGluY3JlbWVudCBvcmRlcmluZywgYW5kIHNvIHdoZW4gdGhlXG4gICBkZWNvZGluZyB0YWJsZXMgYXJlIGJ1aWx0IGluIHRoZSBsYXJnZSBsb29wIGJlbG93LCB0aGUgaW50ZWdlciBjb2Rlc1xuICAgYXJlIGluY3JlbWVudGVkIGJhY2t3YXJkcy5cblxuICAgVGhpcyByb3V0aW5lIGFzc3VtZXMsIGJ1dCBkb2VzIG5vdCBjaGVjaywgdGhhdCBhbGwgb2YgdGhlIGVudHJpZXMgaW5cbiAgIGxlbnNbXSBhcmUgaW4gdGhlIHJhbmdlIDAuLk1BWEJJVFMuICBUaGUgY2FsbGVyIG11c3QgYXNzdXJlIHRoaXMuXG4gICAxLi5NQVhCSVRTIGlzIGludGVycHJldGVkIGFzIHRoYXQgY29kZSBsZW5ndGguICB6ZXJvIG1lYW5zIHRoYXQgdGhhdFxuICAgc3ltYm9sIGRvZXMgbm90IG9jY3VyIGluIHRoaXMgY29kZS5cblxuICAgVGhlIGNvZGVzIGFyZSBzb3J0ZWQgYnkgY29tcHV0aW5nIGEgY291bnQgb2YgY29kZXMgZm9yIGVhY2ggbGVuZ3RoLFxuICAgY3JlYXRpbmcgZnJvbSB0aGF0IGEgdGFibGUgb2Ygc3RhcnRpbmcgaW5kaWNlcyBmb3IgZWFjaCBsZW5ndGggaW4gdGhlXG4gICBzb3J0ZWQgdGFibGUsIGFuZCB0aGVuIGVudGVyaW5nIHRoZSBzeW1ib2xzIGluIG9yZGVyIGluIHRoZSBzb3J0ZWRcbiAgIHRhYmxlLiAgVGhlIHNvcnRlZCB0YWJsZSBpcyB3b3JrW10sIHdpdGggdGhhdCBzcGFjZSBiZWluZyBwcm92aWRlZCBieVxuICAgdGhlIGNhbGxlci5cblxuICAgVGhlIGxlbmd0aCBjb3VudHMgYXJlIHVzZWQgZm9yIG90aGVyIHB1cnBvc2VzIGFzIHdlbGwsIGkuZS4gZmluZGluZ1xuICAgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gbGVuZ3RoIGNvZGVzLCBkZXRlcm1pbmluZyBpZiB0aGVyZSBhcmUgYW55XG4gICBjb2RlcyBhdCBhbGwsIGNoZWNraW5nIGZvciBhIHZhbGlkIHNldCBvZiBsZW5ndGhzLCBhbmQgbG9va2luZyBhaGVhZFxuICAgYXQgbGVuZ3RoIGNvdW50cyB0byBkZXRlcm1pbmUgc3ViLXRhYmxlIHNpemVzIHdoZW4gYnVpbGRpbmcgdGhlXG4gICBkZWNvZGluZyB0YWJsZXMuXG4gICAqL1xuXG4gIC8qIGFjY3VtdWxhdGUgbGVuZ3RocyBmb3IgY29kZXMgKGFzc3VtZXMgbGVuc1tdIGFsbCBpbiAwLi5NQVhCSVRTKSAqL1xuICBmb3IgKGxlbiA9IDA7IGxlbiA8PSBNQVhCSVRTOyBsZW4rKykge1xuICAgIGNvdW50W2xlbl0gPSAwO1xuICB9XG4gIGZvciAoc3ltID0gMDsgc3ltIDwgY29kZXM7IHN5bSsrKSB7XG4gICAgY291bnRbbGVuc1tsZW5zX2luZGV4ICsgc3ltXV0rKztcbiAgfVxuXG4gIC8qIGJvdW5kIGNvZGUgbGVuZ3RocywgZm9yY2Ugcm9vdCB0byBiZSB3aXRoaW4gY29kZSBsZW5ndGhzICovXG4gIHJvb3QgPSBiaXRzO1xuICBmb3IgKG1heCA9IE1BWEJJVFM7IG1heCA+PSAxOyBtYXgtLSkge1xuICAgIGlmIChjb3VudFttYXhdICE9PSAwKSB7IGJyZWFrOyB9XG4gIH1cbiAgaWYgKHJvb3QgPiBtYXgpIHtcbiAgICByb290ID0gbWF4O1xuICB9XG4gIGlmIChtYXggPT09IDApIHsgICAgICAgICAgICAgICAgICAgICAvKiBubyBzeW1ib2xzIHRvIGNvZGUgYXQgYWxsICovXG4gICAgLy90YWJsZS5vcFtvcHRzLnRhYmxlX2luZGV4XSA9IDY0OyAgLy9oZXJlLm9wID0gKHZhciBjaGFyKTY0OyAgICAvKiBpbnZhbGlkIGNvZGUgbWFya2VyICovXG4gICAgLy90YWJsZS5iaXRzW29wdHMudGFibGVfaW5kZXhdID0gMTsgICAvL2hlcmUuYml0cyA9ICh2YXIgY2hhcikxO1xuICAgIC8vdGFibGUudmFsW29wdHMudGFibGVfaW5kZXgrK10gPSAwOyAgIC8vaGVyZS52YWwgPSAodmFyIHNob3J0KTA7XG4gICAgdGFibGVbdGFibGVfaW5kZXgrK10gPSAoMSA8PCAyNCkgfCAoNjQgPDwgMTYpIHwgMDtcblxuXG4gICAgLy90YWJsZS5vcFtvcHRzLnRhYmxlX2luZGV4XSA9IDY0O1xuICAgIC8vdGFibGUuYml0c1tvcHRzLnRhYmxlX2luZGV4XSA9IDE7XG4gICAgLy90YWJsZS52YWxbb3B0cy50YWJsZV9pbmRleCsrXSA9IDA7XG4gICAgdGFibGVbdGFibGVfaW5kZXgrK10gPSAoMSA8PCAyNCkgfCAoNjQgPDwgMTYpIHwgMDtcblxuICAgIG9wdHMuYml0cyA9IDE7XG4gICAgcmV0dXJuIDA7ICAgICAvKiBubyBzeW1ib2xzLCBidXQgd2FpdCBmb3IgZGVjb2RpbmcgdG8gcmVwb3J0IGVycm9yICovXG4gIH1cbiAgZm9yIChtaW4gPSAxOyBtaW4gPCBtYXg7IG1pbisrKSB7XG4gICAgaWYgKGNvdW50W21pbl0gIT09IDApIHsgYnJlYWs7IH1cbiAgfVxuICBpZiAocm9vdCA8IG1pbikge1xuICAgIHJvb3QgPSBtaW47XG4gIH1cblxuICAvKiBjaGVjayBmb3IgYW4gb3Zlci1zdWJzY3JpYmVkIG9yIGluY29tcGxldGUgc2V0IG9mIGxlbmd0aHMgKi9cbiAgbGVmdCA9IDE7XG4gIGZvciAobGVuID0gMTsgbGVuIDw9IE1BWEJJVFM7IGxlbisrKSB7XG4gICAgbGVmdCA8PD0gMTtcbiAgICBsZWZ0IC09IGNvdW50W2xlbl07XG4gICAgaWYgKGxlZnQgPCAwKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSAgICAgICAgLyogb3Zlci1zdWJzY3JpYmVkICovXG4gIH1cbiAgaWYgKGxlZnQgPiAwICYmICh0eXBlID09PSBDT0RFUyB8fCBtYXggIT09IDEpKSB7XG4gICAgcmV0dXJuIC0xOyAgICAgICAgICAgICAgICAgICAgICAvKiBpbmNvbXBsZXRlIHNldCAqL1xuICB9XG5cbiAgLyogZ2VuZXJhdGUgb2Zmc2V0cyBpbnRvIHN5bWJvbCB0YWJsZSBmb3IgZWFjaCBsZW5ndGggZm9yIHNvcnRpbmcgKi9cbiAgb2Zmc1sxXSA9IDA7XG4gIGZvciAobGVuID0gMTsgbGVuIDwgTUFYQklUUzsgbGVuKyspIHtcbiAgICBvZmZzW2xlbiArIDFdID0gb2Zmc1tsZW5dICsgY291bnRbbGVuXTtcbiAgfVxuXG4gIC8qIHNvcnQgc3ltYm9scyBieSBsZW5ndGgsIGJ5IHN5bWJvbCBvcmRlciB3aXRoaW4gZWFjaCBsZW5ndGggKi9cbiAgZm9yIChzeW0gPSAwOyBzeW0gPCBjb2Rlczsgc3ltKyspIHtcbiAgICBpZiAobGVuc1tsZW5zX2luZGV4ICsgc3ltXSAhPT0gMCkge1xuICAgICAgd29ya1tvZmZzW2xlbnNbbGVuc19pbmRleCArIHN5bV1dKytdID0gc3ltO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICBDcmVhdGUgYW5kIGZpbGwgaW4gZGVjb2RpbmcgdGFibGVzLiAgSW4gdGhpcyBsb29wLCB0aGUgdGFibGUgYmVpbmdcbiAgIGZpbGxlZCBpcyBhdCBuZXh0IGFuZCBoYXMgY3VyciBpbmRleCBiaXRzLiAgVGhlIGNvZGUgYmVpbmcgdXNlZCBpcyBodWZmXG4gICB3aXRoIGxlbmd0aCBsZW4uICBUaGF0IGNvZGUgaXMgY29udmVydGVkIHRvIGFuIGluZGV4IGJ5IGRyb3BwaW5nIGRyb3BcbiAgIGJpdHMgb2ZmIG9mIHRoZSBib3R0b20uICBGb3IgY29kZXMgd2hlcmUgbGVuIGlzIGxlc3MgdGhhbiBkcm9wICsgY3VycixcbiAgIHRob3NlIHRvcCBkcm9wICsgY3VyciAtIGxlbiBiaXRzIGFyZSBpbmNyZW1lbnRlZCB0aHJvdWdoIGFsbCB2YWx1ZXMgdG9cbiAgIGZpbGwgdGhlIHRhYmxlIHdpdGggcmVwbGljYXRlZCBlbnRyaWVzLlxuXG4gICByb290IGlzIHRoZSBudW1iZXIgb2YgaW5kZXggYml0cyBmb3IgdGhlIHJvb3QgdGFibGUuICBXaGVuIGxlbiBleGNlZWRzXG4gICByb290LCBzdWItdGFibGVzIGFyZSBjcmVhdGVkIHBvaW50ZWQgdG8gYnkgdGhlIHJvb3QgZW50cnkgd2l0aCBhbiBpbmRleFxuICAgb2YgdGhlIGxvdyByb290IGJpdHMgb2YgaHVmZi4gIFRoaXMgaXMgc2F2ZWQgaW4gbG93IHRvIGNoZWNrIGZvciB3aGVuIGFcbiAgIG5ldyBzdWItdGFibGUgc2hvdWxkIGJlIHN0YXJ0ZWQuICBkcm9wIGlzIHplcm8gd2hlbiB0aGUgcm9vdCB0YWJsZSBpc1xuICAgYmVpbmcgZmlsbGVkLCBhbmQgZHJvcCBpcyByb290IHdoZW4gc3ViLXRhYmxlcyBhcmUgYmVpbmcgZmlsbGVkLlxuXG4gICBXaGVuIGEgbmV3IHN1Yi10YWJsZSBpcyBuZWVkZWQsIGl0IGlzIG5lY2Vzc2FyeSB0byBsb29rIGFoZWFkIGluIHRoZVxuICAgY29kZSBsZW5ndGhzIHRvIGRldGVybWluZSB3aGF0IHNpemUgc3ViLXRhYmxlIGlzIG5lZWRlZC4gIFRoZSBsZW5ndGhcbiAgIGNvdW50cyBhcmUgdXNlZCBmb3IgdGhpcywgYW5kIHNvIGNvdW50W10gaXMgZGVjcmVtZW50ZWQgYXMgY29kZXMgYXJlXG4gICBlbnRlcmVkIGluIHRoZSB0YWJsZXMuXG5cbiAgIHVzZWQga2VlcHMgdHJhY2sgb2YgaG93IG1hbnkgdGFibGUgZW50cmllcyBoYXZlIGJlZW4gYWxsb2NhdGVkIGZyb20gdGhlXG4gICBwcm92aWRlZCAqdGFibGUgc3BhY2UuICBJdCBpcyBjaGVja2VkIGZvciBMRU5TIGFuZCBESVNUIHRhYmxlcyBhZ2FpbnN0XG4gICB0aGUgY29uc3RhbnRzIEVOT1VHSF9MRU5TIGFuZCBFTk9VR0hfRElTVFMgdG8gZ3VhcmQgYWdhaW5zdCBjaGFuZ2VzIGluXG4gICB0aGUgaW5pdGlhbCByb290IHRhYmxlIHNpemUgY29uc3RhbnRzLiAgU2VlIHRoZSBjb21tZW50cyBpbiBpbmZ0cmVlcy5oXG4gICBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cblxuICAgc3ltIGluY3JlbWVudHMgdGhyb3VnaCBhbGwgc3ltYm9scywgYW5kIHRoZSBsb29wIHRlcm1pbmF0ZXMgd2hlblxuICAgYWxsIGNvZGVzIG9mIGxlbmd0aCBtYXgsIGkuZS4gYWxsIGNvZGVzLCBoYXZlIGJlZW4gcHJvY2Vzc2VkLiAgVGhpc1xuICAgcm91dGluZSBwZXJtaXRzIGluY29tcGxldGUgY29kZXMsIHNvIGFub3RoZXIgbG9vcCBhZnRlciB0aGlzIG9uZSBmaWxsc1xuICAgaW4gdGhlIHJlc3Qgb2YgdGhlIGRlY29kaW5nIHRhYmxlcyB3aXRoIGludmFsaWQgY29kZSBtYXJrZXJzLlxuICAgKi9cblxuICAvKiBzZXQgdXAgZm9yIGNvZGUgdHlwZSAqL1xuICAvLyBwb29yIG1hbiBvcHRpbWl6YXRpb24gLSB1c2UgaWYtZWxzZSBpbnN0ZWFkIG9mIHN3aXRjaCxcbiAgLy8gdG8gYXZvaWQgZGVvcHRzIGluIG9sZCB2OFxuICBpZiAodHlwZSA9PT0gQ09ERVMpIHtcbiAgICBiYXNlID0gZXh0cmEgPSB3b3JrOyAgICAvKiBkdW1teSB2YWx1ZS0tbm90IHVzZWQgKi9cbiAgICBlbmQgPSAxOTtcblxuICB9IGVsc2UgaWYgKHR5cGUgPT09IExFTlMpIHtcbiAgICBiYXNlID0gbGJhc2U7XG4gICAgYmFzZV9pbmRleCAtPSAyNTc7XG4gICAgZXh0cmEgPSBsZXh0O1xuICAgIGV4dHJhX2luZGV4IC09IDI1NztcbiAgICBlbmQgPSAyNTY7XG5cbiAgfSBlbHNlIHsgICAgICAgICAgICAgICAgICAgIC8qIERJU1RTICovXG4gICAgYmFzZSA9IGRiYXNlO1xuICAgIGV4dHJhID0gZGV4dDtcbiAgICBlbmQgPSAtMTtcbiAgfVxuXG4gIC8qIGluaXRpYWxpemUgb3B0cyBmb3IgbG9vcCAqL1xuICBodWZmID0gMDsgICAgICAgICAgICAgICAgICAgLyogc3RhcnRpbmcgY29kZSAqL1xuICBzeW0gPSAwOyAgICAgICAgICAgICAgICAgICAgLyogc3RhcnRpbmcgY29kZSBzeW1ib2wgKi9cbiAgbGVuID0gbWluOyAgICAgICAgICAgICAgICAgIC8qIHN0YXJ0aW5nIGNvZGUgbGVuZ3RoICovXG4gIG5leHQgPSB0YWJsZV9pbmRleDsgICAgICAgICAgICAgIC8qIGN1cnJlbnQgdGFibGUgdG8gZmlsbCBpbiAqL1xuICBjdXJyID0gcm9vdDsgICAgICAgICAgICAgICAgLyogY3VycmVudCB0YWJsZSBpbmRleCBiaXRzICovXG4gIGRyb3AgPSAwOyAgICAgICAgICAgICAgICAgICAvKiBjdXJyZW50IGJpdHMgdG8gZHJvcCBmcm9tIGNvZGUgZm9yIGluZGV4ICovXG4gIGxvdyA9IC0xOyAgICAgICAgICAgICAgICAgICAvKiB0cmlnZ2VyIG5ldyBzdWItdGFibGUgd2hlbiBsZW4gPiByb290ICovXG4gIHVzZWQgPSAxIDw8IHJvb3Q7ICAgICAgICAgIC8qIHVzZSByb290IHRhYmxlIGVudHJpZXMgKi9cbiAgbWFzayA9IHVzZWQgLSAxOyAgICAgICAgICAgIC8qIG1hc2sgZm9yIGNvbXBhcmluZyBsb3cgKi9cblxuICAvKiBjaGVjayBhdmFpbGFibGUgdGFibGUgc3BhY2UgKi9cbiAgaWYgKCh0eXBlID09PSBMRU5TICYmIHVzZWQgPiBFTk9VR0hfTEVOUykgfHxcbiAgICAodHlwZSA9PT0gRElTVFMgJiYgdXNlZCA+IEVOT1VHSF9ESVNUUykpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIC8qIHByb2Nlc3MgYWxsIGNvZGVzIGFuZCBtYWtlIHRhYmxlIGVudHJpZXMgKi9cbiAgZm9yICg7Oykge1xuICAgIC8qIGNyZWF0ZSB0YWJsZSBlbnRyeSAqL1xuICAgIGhlcmVfYml0cyA9IGxlbiAtIGRyb3A7XG4gICAgaWYgKHdvcmtbc3ltXSA8IGVuZCkge1xuICAgICAgaGVyZV9vcCA9IDA7XG4gICAgICBoZXJlX3ZhbCA9IHdvcmtbc3ltXTtcbiAgICB9XG4gICAgZWxzZSBpZiAod29ya1tzeW1dID4gZW5kKSB7XG4gICAgICBoZXJlX29wID0gZXh0cmFbZXh0cmFfaW5kZXggKyB3b3JrW3N5bV1dO1xuICAgICAgaGVyZV92YWwgPSBiYXNlW2Jhc2VfaW5kZXggKyB3b3JrW3N5bV1dO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGhlcmVfb3AgPSAzMiArIDY0OyAgICAgICAgIC8qIGVuZCBvZiBibG9jayAqL1xuICAgICAgaGVyZV92YWwgPSAwO1xuICAgIH1cblxuICAgIC8qIHJlcGxpY2F0ZSBmb3IgdGhvc2UgaW5kaWNlcyB3aXRoIGxvdyBsZW4gYml0cyBlcXVhbCB0byBodWZmICovXG4gICAgaW5jciA9IDEgPDwgKGxlbiAtIGRyb3ApO1xuICAgIGZpbGwgPSAxIDw8IGN1cnI7XG4gICAgbWluID0gZmlsbDsgICAgICAgICAgICAgICAgIC8qIHNhdmUgb2Zmc2V0IHRvIG5leHQgdGFibGUgKi9cbiAgICBkbyB7XG4gICAgICBmaWxsIC09IGluY3I7XG4gICAgICB0YWJsZVtuZXh0ICsgKGh1ZmYgPj4gZHJvcCkgKyBmaWxsXSA9IChoZXJlX2JpdHMgPDwgMjQpIHwgKGhlcmVfb3AgPDwgMTYpIHwgaGVyZV92YWwgfDA7XG4gICAgfSB3aGlsZSAoZmlsbCAhPT0gMCk7XG5cbiAgICAvKiBiYWNrd2FyZHMgaW5jcmVtZW50IHRoZSBsZW4tYml0IGNvZGUgaHVmZiAqL1xuICAgIGluY3IgPSAxIDw8IChsZW4gLSAxKTtcbiAgICB3aGlsZSAoaHVmZiAmIGluY3IpIHtcbiAgICAgIGluY3IgPj49IDE7XG4gICAgfVxuICAgIGlmIChpbmNyICE9PSAwKSB7XG4gICAgICBodWZmICY9IGluY3IgLSAxO1xuICAgICAgaHVmZiArPSBpbmNyO1xuICAgIH0gZWxzZSB7XG4gICAgICBodWZmID0gMDtcbiAgICB9XG5cbiAgICAvKiBnbyB0byBuZXh0IHN5bWJvbCwgdXBkYXRlIGNvdW50LCBsZW4gKi9cbiAgICBzeW0rKztcbiAgICBpZiAoLS1jb3VudFtsZW5dID09PSAwKSB7XG4gICAgICBpZiAobGVuID09PSBtYXgpIHsgYnJlYWs7IH1cbiAgICAgIGxlbiA9IGxlbnNbbGVuc19pbmRleCArIHdvcmtbc3ltXV07XG4gICAgfVxuXG4gICAgLyogY3JlYXRlIG5ldyBzdWItdGFibGUgaWYgbmVlZGVkICovXG4gICAgaWYgKGxlbiA+IHJvb3QgJiYgKGh1ZmYgJiBtYXNrKSAhPT0gbG93KSB7XG4gICAgICAvKiBpZiBmaXJzdCB0aW1lLCB0cmFuc2l0aW9uIHRvIHN1Yi10YWJsZXMgKi9cbiAgICAgIGlmIChkcm9wID09PSAwKSB7XG4gICAgICAgIGRyb3AgPSByb290O1xuICAgICAgfVxuXG4gICAgICAvKiBpbmNyZW1lbnQgcGFzdCBsYXN0IHRhYmxlICovXG4gICAgICBuZXh0ICs9IG1pbjsgICAgICAgICAgICAvKiBoZXJlIG1pbiBpcyAxIDw8IGN1cnIgKi9cblxuICAgICAgLyogZGV0ZXJtaW5lIGxlbmd0aCBvZiBuZXh0IHRhYmxlICovXG4gICAgICBjdXJyID0gbGVuIC0gZHJvcDtcbiAgICAgIGxlZnQgPSAxIDw8IGN1cnI7XG4gICAgICB3aGlsZSAoY3VyciArIGRyb3AgPCBtYXgpIHtcbiAgICAgICAgbGVmdCAtPSBjb3VudFtjdXJyICsgZHJvcF07XG4gICAgICAgIGlmIChsZWZ0IDw9IDApIHsgYnJlYWs7IH1cbiAgICAgICAgY3VycisrO1xuICAgICAgICBsZWZ0IDw8PSAxO1xuICAgICAgfVxuXG4gICAgICAvKiBjaGVjayBmb3IgZW5vdWdoIHNwYWNlICovXG4gICAgICB1c2VkICs9IDEgPDwgY3VycjtcbiAgICAgIGlmICgodHlwZSA9PT0gTEVOUyAmJiB1c2VkID4gRU5PVUdIX0xFTlMpIHx8XG4gICAgICAgICh0eXBlID09PSBESVNUUyAmJiB1c2VkID4gRU5PVUdIX0RJU1RTKSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cblxuICAgICAgLyogcG9pbnQgZW50cnkgaW4gcm9vdCB0YWJsZSB0byBzdWItdGFibGUgKi9cbiAgICAgIGxvdyA9IGh1ZmYgJiBtYXNrO1xuICAgICAgLyp0YWJsZS5vcFtsb3ddID0gY3VycjtcbiAgICAgIHRhYmxlLmJpdHNbbG93XSA9IHJvb3Q7XG4gICAgICB0YWJsZS52YWxbbG93XSA9IG5leHQgLSBvcHRzLnRhYmxlX2luZGV4OyovXG4gICAgICB0YWJsZVtsb3ddID0gKHJvb3QgPDwgMjQpIHwgKGN1cnIgPDwgMTYpIHwgKG5leHQgLSB0YWJsZV9pbmRleCkgfDA7XG4gICAgfVxuICB9XG5cbiAgLyogZmlsbCBpbiByZW1haW5pbmcgdGFibGUgZW50cnkgaWYgY29kZSBpcyBpbmNvbXBsZXRlIChndWFyYW50ZWVkIHRvIGhhdmVcbiAgIGF0IG1vc3Qgb25lIHJlbWFpbmluZyBlbnRyeSwgc2luY2UgaWYgdGhlIGNvZGUgaXMgaW5jb21wbGV0ZSwgdGhlXG4gICBtYXhpbXVtIGNvZGUgbGVuZ3RoIHRoYXQgd2FzIGFsbG93ZWQgdG8gZ2V0IHRoaXMgZmFyIGlzIG9uZSBiaXQpICovXG4gIGlmIChodWZmICE9PSAwKSB7XG4gICAgLy90YWJsZS5vcFtuZXh0ICsgaHVmZl0gPSA2NDsgICAgICAgICAgICAvKiBpbnZhbGlkIGNvZGUgbWFya2VyICovXG4gICAgLy90YWJsZS5iaXRzW25leHQgKyBodWZmXSA9IGxlbiAtIGRyb3A7XG4gICAgLy90YWJsZS52YWxbbmV4dCArIGh1ZmZdID0gMDtcbiAgICB0YWJsZVtuZXh0ICsgaHVmZl0gPSAoKGxlbiAtIGRyb3ApIDw8IDI0KSB8ICg2NCA8PCAxNikgfDA7XG4gIH1cblxuICAvKiBzZXQgcmV0dXJuIHBhcmFtZXRlcnMgKi9cbiAgLy9vcHRzLnRhYmxlX2luZGV4ICs9IHVzZWQ7XG4gIG9wdHMuYml0cyA9IHJvb3Q7XG4gIHJldHVybiAwO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8vIChDKSAxOTk1LTIwMTMgSmVhbi1sb3VwIEdhaWxseSBhbmQgTWFyayBBZGxlclxuLy8gKEMpIDIwMTQtMjAxNyBWaXRhbHkgUHV6cmluIGFuZCBBbmRyZXkgVHVwaXRzaW5cbi8vXG4vLyBUaGlzIHNvZnR3YXJlIGlzIHByb3ZpZGVkICdhcy1pcycsIHdpdGhvdXQgYW55IGV4cHJlc3Mgb3IgaW1wbGllZFxuLy8gd2FycmFudHkuIEluIG5vIGV2ZW50IHdpbGwgdGhlIGF1dGhvcnMgYmUgaGVsZCBsaWFibGUgZm9yIGFueSBkYW1hZ2VzXG4vLyBhcmlzaW5nIGZyb20gdGhlIHVzZSBvZiB0aGlzIHNvZnR3YXJlLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byBhbnlvbmUgdG8gdXNlIHRoaXMgc29mdHdhcmUgZm9yIGFueSBwdXJwb3NlLFxuLy8gaW5jbHVkaW5nIGNvbW1lcmNpYWwgYXBwbGljYXRpb25zLCBhbmQgdG8gYWx0ZXIgaXQgYW5kIHJlZGlzdHJpYnV0ZSBpdFxuLy8gZnJlZWx5LCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgcmVzdHJpY3Rpb25zOlxuLy9cbi8vIDEuIFRoZSBvcmlnaW4gb2YgdGhpcyBzb2Z0d2FyZSBtdXN0IG5vdCBiZSBtaXNyZXByZXNlbnRlZDsgeW91IG11c3Qgbm90XG4vLyAgIGNsYWltIHRoYXQgeW91IHdyb3RlIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS4gSWYgeW91IHVzZSB0aGlzIHNvZnR3YXJlXG4vLyAgIGluIGEgcHJvZHVjdCwgYW4gYWNrbm93bGVkZ21lbnQgaW4gdGhlIHByb2R1Y3QgZG9jdW1lbnRhdGlvbiB3b3VsZCBiZVxuLy8gICBhcHByZWNpYXRlZCBidXQgaXMgbm90IHJlcXVpcmVkLlxuLy8gMi4gQWx0ZXJlZCBzb3VyY2UgdmVyc2lvbnMgbXVzdCBiZSBwbGFpbmx5IG1hcmtlZCBhcyBzdWNoLCBhbmQgbXVzdCBub3QgYmVcbi8vICAgbWlzcmVwcmVzZW50ZWQgYXMgYmVpbmcgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLlxuLy8gMy4gVGhpcyBub3RpY2UgbWF5IG5vdCBiZSByZW1vdmVkIG9yIGFsdGVyZWQgZnJvbSBhbnkgc291cmNlIGRpc3RyaWJ1dGlvbi5cblxudmFyIHV0aWxzICAgICAgICAgPSByZXF1aXJlKCcuLi91dGlscy9jb21tb24nKTtcbnZhciBhZGxlcjMyICAgICAgID0gcmVxdWlyZSgnLi9hZGxlcjMyJyk7XG52YXIgY3JjMzIgICAgICAgICA9IHJlcXVpcmUoJy4vY3JjMzInKTtcbnZhciBpbmZsYXRlX2Zhc3QgID0gcmVxdWlyZSgnLi9pbmZmYXN0Jyk7XG52YXIgaW5mbGF0ZV90YWJsZSA9IHJlcXVpcmUoJy4vaW5mdHJlZXMnKTtcblxudmFyIENPREVTID0gMDtcbnZhciBMRU5TID0gMTtcbnZhciBESVNUUyA9IDI7XG5cbi8qIFB1YmxpYyBjb25zdGFudHMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG5cbi8qIEFsbG93ZWQgZmx1c2ggdmFsdWVzOyBzZWUgZGVmbGF0ZSgpIGFuZCBpbmZsYXRlKCkgYmVsb3cgZm9yIGRldGFpbHMgKi9cbi8vdmFyIFpfTk9fRkxVU0ggICAgICA9IDA7XG4vL3ZhciBaX1BBUlRJQUxfRkxVU0ggPSAxO1xuLy92YXIgWl9TWU5DX0ZMVVNIICAgID0gMjtcbi8vdmFyIFpfRlVMTF9GTFVTSCAgICA9IDM7XG52YXIgWl9GSU5JU0ggICAgICAgID0gNDtcbnZhciBaX0JMT0NLICAgICAgICAgPSA1O1xudmFyIFpfVFJFRVMgICAgICAgICA9IDY7XG5cblxuLyogUmV0dXJuIGNvZGVzIGZvciB0aGUgY29tcHJlc3Npb24vZGVjb21wcmVzc2lvbiBmdW5jdGlvbnMuIE5lZ2F0aXZlIHZhbHVlc1xuICogYXJlIGVycm9ycywgcG9zaXRpdmUgdmFsdWVzIGFyZSB1c2VkIGZvciBzcGVjaWFsIGJ1dCBub3JtYWwgZXZlbnRzLlxuICovXG52YXIgWl9PSyAgICAgICAgICAgID0gMDtcbnZhciBaX1NUUkVBTV9FTkQgICAgPSAxO1xudmFyIFpfTkVFRF9ESUNUICAgICA9IDI7XG4vL3ZhciBaX0VSUk5PICAgICAgICAgPSAtMTtcbnZhciBaX1NUUkVBTV9FUlJPUiAgPSAtMjtcbnZhciBaX0RBVEFfRVJST1IgICAgPSAtMztcbnZhciBaX01FTV9FUlJPUiAgICAgPSAtNDtcbnZhciBaX0JVRl9FUlJPUiAgICAgPSAtNTtcbi8vdmFyIFpfVkVSU0lPTl9FUlJPUiA9IC02O1xuXG4vKiBUaGUgZGVmbGF0ZSBjb21wcmVzc2lvbiBtZXRob2QgKi9cbnZhciBaX0RFRkxBVEVEICA9IDg7XG5cblxuLyogU1RBVEVTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cblxudmFyICAgIEhFQUQgPSAxOyAgICAgICAvKiBpOiB3YWl0aW5nIGZvciBtYWdpYyBoZWFkZXIgKi9cbnZhciAgICBGTEFHUyA9IDI7ICAgICAgLyogaTogd2FpdGluZyBmb3IgbWV0aG9kIGFuZCBmbGFncyAoZ3ppcCkgKi9cbnZhciAgICBUSU1FID0gMzsgICAgICAgLyogaTogd2FpdGluZyBmb3IgbW9kaWZpY2F0aW9uIHRpbWUgKGd6aXApICovXG52YXIgICAgT1MgPSA0OyAgICAgICAgIC8qIGk6IHdhaXRpbmcgZm9yIGV4dHJhIGZsYWdzIGFuZCBvcGVyYXRpbmcgc3lzdGVtIChnemlwKSAqL1xudmFyICAgIEVYTEVOID0gNTsgICAgICAvKiBpOiB3YWl0aW5nIGZvciBleHRyYSBsZW5ndGggKGd6aXApICovXG52YXIgICAgRVhUUkEgPSA2OyAgICAgIC8qIGk6IHdhaXRpbmcgZm9yIGV4dHJhIGJ5dGVzIChnemlwKSAqL1xudmFyICAgIE5BTUUgPSA3OyAgICAgICAvKiBpOiB3YWl0aW5nIGZvciBlbmQgb2YgZmlsZSBuYW1lIChnemlwKSAqL1xudmFyICAgIENPTU1FTlQgPSA4OyAgICAvKiBpOiB3YWl0aW5nIGZvciBlbmQgb2YgY29tbWVudCAoZ3ppcCkgKi9cbnZhciAgICBIQ1JDID0gOTsgICAgICAgLyogaTogd2FpdGluZyBmb3IgaGVhZGVyIGNyYyAoZ3ppcCkgKi9cbnZhciAgICBESUNUSUQgPSAxMDsgICAgLyogaTogd2FpdGluZyBmb3IgZGljdGlvbmFyeSBjaGVjayB2YWx1ZSAqL1xudmFyICAgIERJQ1QgPSAxMTsgICAgICAvKiB3YWl0aW5nIGZvciBpbmZsYXRlU2V0RGljdGlvbmFyeSgpIGNhbGwgKi9cbnZhciAgICAgICAgVFlQRSA9IDEyOyAgICAgIC8qIGk6IHdhaXRpbmcgZm9yIHR5cGUgYml0cywgaW5jbHVkaW5nIGxhc3QtZmxhZyBiaXQgKi9cbnZhciAgICAgICAgVFlQRURPID0gMTM7ICAgIC8qIGk6IHNhbWUsIGJ1dCBza2lwIGNoZWNrIHRvIGV4aXQgaW5mbGF0ZSBvbiBuZXcgYmxvY2sgKi9cbnZhciAgICAgICAgU1RPUkVEID0gMTQ7ICAgIC8qIGk6IHdhaXRpbmcgZm9yIHN0b3JlZCBzaXplIChsZW5ndGggYW5kIGNvbXBsZW1lbnQpICovXG52YXIgICAgICAgIENPUFlfID0gMTU7ICAgICAvKiBpL286IHNhbWUgYXMgQ09QWSBiZWxvdywgYnV0IG9ubHkgZmlyc3QgdGltZSBpbiAqL1xudmFyICAgICAgICBDT1BZID0gMTY7ICAgICAgLyogaS9vOiB3YWl0aW5nIGZvciBpbnB1dCBvciBvdXRwdXQgdG8gY29weSBzdG9yZWQgYmxvY2sgKi9cbnZhciAgICAgICAgVEFCTEUgPSAxNzsgICAgIC8qIGk6IHdhaXRpbmcgZm9yIGR5bmFtaWMgYmxvY2sgdGFibGUgbGVuZ3RocyAqL1xudmFyICAgICAgICBMRU5MRU5TID0gMTg7ICAgLyogaTogd2FpdGluZyBmb3IgY29kZSBsZW5ndGggY29kZSBsZW5ndGhzICovXG52YXIgICAgICAgIENPREVMRU5TID0gMTk7ICAvKiBpOiB3YWl0aW5nIGZvciBsZW5ndGgvbGl0IGFuZCBkaXN0YW5jZSBjb2RlIGxlbmd0aHMgKi9cbnZhciAgICAgICAgICAgIExFTl8gPSAyMDsgICAgICAvKiBpOiBzYW1lIGFzIExFTiBiZWxvdywgYnV0IG9ubHkgZmlyc3QgdGltZSBpbiAqL1xudmFyICAgICAgICAgICAgTEVOID0gMjE7ICAgICAgIC8qIGk6IHdhaXRpbmcgZm9yIGxlbmd0aC9saXQvZW9iIGNvZGUgKi9cbnZhciAgICAgICAgICAgIExFTkVYVCA9IDIyOyAgICAvKiBpOiB3YWl0aW5nIGZvciBsZW5ndGggZXh0cmEgYml0cyAqL1xudmFyICAgICAgICAgICAgRElTVCA9IDIzOyAgICAgIC8qIGk6IHdhaXRpbmcgZm9yIGRpc3RhbmNlIGNvZGUgKi9cbnZhciAgICAgICAgICAgIERJU1RFWFQgPSAyNDsgICAvKiBpOiB3YWl0aW5nIGZvciBkaXN0YW5jZSBleHRyYSBiaXRzICovXG52YXIgICAgICAgICAgICBNQVRDSCA9IDI1OyAgICAgLyogbzogd2FpdGluZyBmb3Igb3V0cHV0IHNwYWNlIHRvIGNvcHkgc3RyaW5nICovXG52YXIgICAgICAgICAgICBMSVQgPSAyNjsgICAgICAgLyogbzogd2FpdGluZyBmb3Igb3V0cHV0IHNwYWNlIHRvIHdyaXRlIGxpdGVyYWwgKi9cbnZhciAgICBDSEVDSyA9IDI3OyAgICAgLyogaTogd2FpdGluZyBmb3IgMzItYml0IGNoZWNrIHZhbHVlICovXG52YXIgICAgTEVOR1RIID0gMjg7ICAgIC8qIGk6IHdhaXRpbmcgZm9yIDMyLWJpdCBsZW5ndGggKGd6aXApICovXG52YXIgICAgRE9ORSA9IDI5OyAgICAgIC8qIGZpbmlzaGVkIGNoZWNrLCBkb25lIC0tIHJlbWFpbiBoZXJlIHVudGlsIHJlc2V0ICovXG52YXIgICAgQkFEID0gMzA7ICAgICAgIC8qIGdvdCBhIGRhdGEgZXJyb3IgLS0gcmVtYWluIGhlcmUgdW50aWwgcmVzZXQgKi9cbnZhciAgICBNRU0gPSAzMTsgICAgICAgLyogZ290IGFuIGluZmxhdGUoKSBtZW1vcnkgZXJyb3IgLS0gcmVtYWluIGhlcmUgdW50aWwgcmVzZXQgKi9cbnZhciAgICBTWU5DID0gMzI7ICAgICAgLyogbG9va2luZyBmb3Igc3luY2hyb25pemF0aW9uIGJ5dGVzIHRvIHJlc3RhcnQgaW5mbGF0ZSgpICovXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cblxuXG52YXIgRU5PVUdIX0xFTlMgPSA4NTI7XG52YXIgRU5PVUdIX0RJU1RTID0gNTkyO1xuLy92YXIgRU5PVUdIID0gIChFTk9VR0hfTEVOUytFTk9VR0hfRElTVFMpO1xuXG52YXIgTUFYX1dCSVRTID0gMTU7XG4vKiAzMksgTFo3NyB3aW5kb3cgKi9cbnZhciBERUZfV0JJVFMgPSBNQVhfV0JJVFM7XG5cblxuZnVuY3Rpb24genN3YXAzMihxKSB7XG4gIHJldHVybiAgKCgocSA+Pj4gMjQpICYgMHhmZikgK1xuICAgICAgICAgICgocSA+Pj4gOCkgJiAweGZmMDApICtcbiAgICAgICAgICAoKHEgJiAweGZmMDApIDw8IDgpICtcbiAgICAgICAgICAoKHEgJiAweGZmKSA8PCAyNCkpO1xufVxuXG5cbmZ1bmN0aW9uIEluZmxhdGVTdGF0ZSgpIHtcbiAgdGhpcy5tb2RlID0gMDsgICAgICAgICAgICAgLyogY3VycmVudCBpbmZsYXRlIG1vZGUgKi9cbiAgdGhpcy5sYXN0ID0gZmFsc2U7ICAgICAgICAgIC8qIHRydWUgaWYgcHJvY2Vzc2luZyBsYXN0IGJsb2NrICovXG4gIHRoaXMud3JhcCA9IDA7ICAgICAgICAgICAgICAvKiBiaXQgMCB0cnVlIGZvciB6bGliLCBiaXQgMSB0cnVlIGZvciBnemlwICovXG4gIHRoaXMuaGF2ZWRpY3QgPSBmYWxzZTsgICAgICAvKiB0cnVlIGlmIGRpY3Rpb25hcnkgcHJvdmlkZWQgKi9cbiAgdGhpcy5mbGFncyA9IDA7ICAgICAgICAgICAgIC8qIGd6aXAgaGVhZGVyIG1ldGhvZCBhbmQgZmxhZ3MgKDAgaWYgemxpYikgKi9cbiAgdGhpcy5kbWF4ID0gMDsgICAgICAgICAgICAgIC8qIHpsaWIgaGVhZGVyIG1heCBkaXN0YW5jZSAoSU5GTEFURV9TVFJJQ1QpICovXG4gIHRoaXMuY2hlY2sgPSAwOyAgICAgICAgICAgICAvKiBwcm90ZWN0ZWQgY29weSBvZiBjaGVjayB2YWx1ZSAqL1xuICB0aGlzLnRvdGFsID0gMDsgICAgICAgICAgICAgLyogcHJvdGVjdGVkIGNvcHkgb2Ygb3V0cHV0IGNvdW50ICovXG4gIC8vIFRPRE86IG1heSBiZSB7fVxuICB0aGlzLmhlYWQgPSBudWxsOyAgICAgICAgICAgLyogd2hlcmUgdG8gc2F2ZSBnemlwIGhlYWRlciBpbmZvcm1hdGlvbiAqL1xuXG4gIC8qIHNsaWRpbmcgd2luZG93ICovXG4gIHRoaXMud2JpdHMgPSAwOyAgICAgICAgICAgICAvKiBsb2cgYmFzZSAyIG9mIHJlcXVlc3RlZCB3aW5kb3cgc2l6ZSAqL1xuICB0aGlzLndzaXplID0gMDsgICAgICAgICAgICAgLyogd2luZG93IHNpemUgb3IgemVybyBpZiBub3QgdXNpbmcgd2luZG93ICovXG4gIHRoaXMud2hhdmUgPSAwOyAgICAgICAgICAgICAvKiB2YWxpZCBieXRlcyBpbiB0aGUgd2luZG93ICovXG4gIHRoaXMud25leHQgPSAwOyAgICAgICAgICAgICAvKiB3aW5kb3cgd3JpdGUgaW5kZXggKi9cbiAgdGhpcy53aW5kb3cgPSBudWxsOyAgICAgICAgIC8qIGFsbG9jYXRlZCBzbGlkaW5nIHdpbmRvdywgaWYgbmVlZGVkICovXG5cbiAgLyogYml0IGFjY3VtdWxhdG9yICovXG4gIHRoaXMuaG9sZCA9IDA7ICAgICAgICAgICAgICAvKiBpbnB1dCBiaXQgYWNjdW11bGF0b3IgKi9cbiAgdGhpcy5iaXRzID0gMDsgICAgICAgICAgICAgIC8qIG51bWJlciBvZiBiaXRzIGluIFwiaW5cIiAqL1xuXG4gIC8qIGZvciBzdHJpbmcgYW5kIHN0b3JlZCBibG9jayBjb3B5aW5nICovXG4gIHRoaXMubGVuZ3RoID0gMDsgICAgICAgICAgICAvKiBsaXRlcmFsIG9yIGxlbmd0aCBvZiBkYXRhIHRvIGNvcHkgKi9cbiAgdGhpcy5vZmZzZXQgPSAwOyAgICAgICAgICAgIC8qIGRpc3RhbmNlIGJhY2sgdG8gY29weSBzdHJpbmcgZnJvbSAqL1xuXG4gIC8qIGZvciB0YWJsZSBhbmQgY29kZSBkZWNvZGluZyAqL1xuICB0aGlzLmV4dHJhID0gMDsgICAgICAgICAgICAgLyogZXh0cmEgYml0cyBuZWVkZWQgKi9cblxuICAvKiBmaXhlZCBhbmQgZHluYW1pYyBjb2RlIHRhYmxlcyAqL1xuICB0aGlzLmxlbmNvZGUgPSBudWxsOyAgICAgICAgICAvKiBzdGFydGluZyB0YWJsZSBmb3IgbGVuZ3RoL2xpdGVyYWwgY29kZXMgKi9cbiAgdGhpcy5kaXN0Y29kZSA9IG51bGw7ICAgICAgICAgLyogc3RhcnRpbmcgdGFibGUgZm9yIGRpc3RhbmNlIGNvZGVzICovXG4gIHRoaXMubGVuYml0cyA9IDA7ICAgICAgICAgICAvKiBpbmRleCBiaXRzIGZvciBsZW5jb2RlICovXG4gIHRoaXMuZGlzdGJpdHMgPSAwOyAgICAgICAgICAvKiBpbmRleCBiaXRzIGZvciBkaXN0Y29kZSAqL1xuXG4gIC8qIGR5bmFtaWMgdGFibGUgYnVpbGRpbmcgKi9cbiAgdGhpcy5uY29kZSA9IDA7ICAgICAgICAgICAgIC8qIG51bWJlciBvZiBjb2RlIGxlbmd0aCBjb2RlIGxlbmd0aHMgKi9cbiAgdGhpcy5ubGVuID0gMDsgICAgICAgICAgICAgIC8qIG51bWJlciBvZiBsZW5ndGggY29kZSBsZW5ndGhzICovXG4gIHRoaXMubmRpc3QgPSAwOyAgICAgICAgICAgICAvKiBudW1iZXIgb2YgZGlzdGFuY2UgY29kZSBsZW5ndGhzICovXG4gIHRoaXMuaGF2ZSA9IDA7ICAgICAgICAgICAgICAvKiBudW1iZXIgb2YgY29kZSBsZW5ndGhzIGluIGxlbnNbXSAqL1xuICB0aGlzLm5leHQgPSBudWxsOyAgICAgICAgICAgICAgLyogbmV4dCBhdmFpbGFibGUgc3BhY2UgaW4gY29kZXNbXSAqL1xuXG4gIHRoaXMubGVucyA9IG5ldyB1dGlscy5CdWYxNigzMjApOyAvKiB0ZW1wb3Jhcnkgc3RvcmFnZSBmb3IgY29kZSBsZW5ndGhzICovXG4gIHRoaXMud29yayA9IG5ldyB1dGlscy5CdWYxNigyODgpOyAvKiB3b3JrIGFyZWEgZm9yIGNvZGUgdGFibGUgYnVpbGRpbmcgKi9cblxuICAvKlxuICAgYmVjYXVzZSB3ZSBkb24ndCBoYXZlIHBvaW50ZXJzIGluIGpzLCB3ZSB1c2UgbGVuY29kZSBhbmQgZGlzdGNvZGUgZGlyZWN0bHlcbiAgIGFzIGJ1ZmZlcnMgc28gd2UgZG9uJ3QgbmVlZCBjb2Rlc1xuICAqL1xuICAvL3RoaXMuY29kZXMgPSBuZXcgdXRpbHMuQnVmMzIoRU5PVUdIKTsgICAgICAgLyogc3BhY2UgZm9yIGNvZGUgdGFibGVzICovXG4gIHRoaXMubGVuZHluID0gbnVsbDsgICAgICAgICAgICAgIC8qIGR5bmFtaWMgdGFibGUgZm9yIGxlbmd0aC9saXRlcmFsIGNvZGVzIChKUyBzcGVjaWZpYykgKi9cbiAgdGhpcy5kaXN0ZHluID0gbnVsbDsgICAgICAgICAgICAgLyogZHluYW1pYyB0YWJsZSBmb3IgZGlzdGFuY2UgY29kZXMgKEpTIHNwZWNpZmljKSAqL1xuICB0aGlzLnNhbmUgPSAwOyAgICAgICAgICAgICAgICAgICAvKiBpZiBmYWxzZSwgYWxsb3cgaW52YWxpZCBkaXN0YW5jZSB0b28gZmFyICovXG4gIHRoaXMuYmFjayA9IDA7ICAgICAgICAgICAgICAgICAgIC8qIGJpdHMgYmFjayBvZiBsYXN0IHVucHJvY2Vzc2VkIGxlbmd0aC9saXQgKi9cbiAgdGhpcy53YXMgPSAwOyAgICAgICAgICAgICAgICAgICAgLyogaW5pdGlhbCBsZW5ndGggb2YgbWF0Y2ggKi9cbn1cblxuZnVuY3Rpb24gaW5mbGF0ZVJlc2V0S2VlcChzdHJtKSB7XG4gIHZhciBzdGF0ZTtcblxuICBpZiAoIXN0cm0gfHwgIXN0cm0uc3RhdGUpIHsgcmV0dXJuIFpfU1RSRUFNX0VSUk9SOyB9XG4gIHN0YXRlID0gc3RybS5zdGF0ZTtcbiAgc3RybS50b3RhbF9pbiA9IHN0cm0udG90YWxfb3V0ID0gc3RhdGUudG90YWwgPSAwO1xuICBzdHJtLm1zZyA9ICcnOyAvKlpfTlVMTCovXG4gIGlmIChzdGF0ZS53cmFwKSB7ICAgICAgIC8qIHRvIHN1cHBvcnQgaWxsLWNvbmNlaXZlZCBKYXZhIHRlc3Qgc3VpdGUgKi9cbiAgICBzdHJtLmFkbGVyID0gc3RhdGUud3JhcCAmIDE7XG4gIH1cbiAgc3RhdGUubW9kZSA9IEhFQUQ7XG4gIHN0YXRlLmxhc3QgPSAwO1xuICBzdGF0ZS5oYXZlZGljdCA9IDA7XG4gIHN0YXRlLmRtYXggPSAzMjc2ODtcbiAgc3RhdGUuaGVhZCA9IG51bGwvKlpfTlVMTCovO1xuICBzdGF0ZS5ob2xkID0gMDtcbiAgc3RhdGUuYml0cyA9IDA7XG4gIC8vc3RhdGUubGVuY29kZSA9IHN0YXRlLmRpc3Rjb2RlID0gc3RhdGUubmV4dCA9IHN0YXRlLmNvZGVzO1xuICBzdGF0ZS5sZW5jb2RlID0gc3RhdGUubGVuZHluID0gbmV3IHV0aWxzLkJ1ZjMyKEVOT1VHSF9MRU5TKTtcbiAgc3RhdGUuZGlzdGNvZGUgPSBzdGF0ZS5kaXN0ZHluID0gbmV3IHV0aWxzLkJ1ZjMyKEVOT1VHSF9ESVNUUyk7XG5cbiAgc3RhdGUuc2FuZSA9IDE7XG4gIHN0YXRlLmJhY2sgPSAtMTtcbiAgLy9UcmFjZXYoKHN0ZGVyciwgXCJpbmZsYXRlOiByZXNldFxcblwiKSk7XG4gIHJldHVybiBaX09LO1xufVxuXG5mdW5jdGlvbiBpbmZsYXRlUmVzZXQoc3RybSkge1xuICB2YXIgc3RhdGU7XG5cbiAgaWYgKCFzdHJtIHx8ICFzdHJtLnN0YXRlKSB7IHJldHVybiBaX1NUUkVBTV9FUlJPUjsgfVxuICBzdGF0ZSA9IHN0cm0uc3RhdGU7XG4gIHN0YXRlLndzaXplID0gMDtcbiAgc3RhdGUud2hhdmUgPSAwO1xuICBzdGF0ZS53bmV4dCA9IDA7XG4gIHJldHVybiBpbmZsYXRlUmVzZXRLZWVwKHN0cm0pO1xuXG59XG5cbmZ1bmN0aW9uIGluZmxhdGVSZXNldDIoc3RybSwgd2luZG93Qml0cykge1xuICB2YXIgd3JhcDtcbiAgdmFyIHN0YXRlO1xuXG4gIC8qIGdldCB0aGUgc3RhdGUgKi9cbiAgaWYgKCFzdHJtIHx8ICFzdHJtLnN0YXRlKSB7IHJldHVybiBaX1NUUkVBTV9FUlJPUjsgfVxuICBzdGF0ZSA9IHN0cm0uc3RhdGU7XG5cbiAgLyogZXh0cmFjdCB3cmFwIHJlcXVlc3QgZnJvbSB3aW5kb3dCaXRzIHBhcmFtZXRlciAqL1xuICBpZiAod2luZG93Qml0cyA8IDApIHtcbiAgICB3cmFwID0gMDtcbiAgICB3aW5kb3dCaXRzID0gLXdpbmRvd0JpdHM7XG4gIH1cbiAgZWxzZSB7XG4gICAgd3JhcCA9ICh3aW5kb3dCaXRzID4+IDQpICsgMTtcbiAgICBpZiAod2luZG93Qml0cyA8IDQ4KSB7XG4gICAgICB3aW5kb3dCaXRzICY9IDE1O1xuICAgIH1cbiAgfVxuXG4gIC8qIHNldCBudW1iZXIgb2Ygd2luZG93IGJpdHMsIGZyZWUgd2luZG93IGlmIGRpZmZlcmVudCAqL1xuICBpZiAod2luZG93Qml0cyAmJiAod2luZG93Qml0cyA8IDggfHwgd2luZG93Qml0cyA+IDE1KSkge1xuICAgIHJldHVybiBaX1NUUkVBTV9FUlJPUjtcbiAgfVxuICBpZiAoc3RhdGUud2luZG93ICE9PSBudWxsICYmIHN0YXRlLndiaXRzICE9PSB3aW5kb3dCaXRzKSB7XG4gICAgc3RhdGUud2luZG93ID0gbnVsbDtcbiAgfVxuXG4gIC8qIHVwZGF0ZSBzdGF0ZSBhbmQgcmVzZXQgdGhlIHJlc3Qgb2YgaXQgKi9cbiAgc3RhdGUud3JhcCA9IHdyYXA7XG4gIHN0YXRlLndiaXRzID0gd2luZG93Qml0cztcbiAgcmV0dXJuIGluZmxhdGVSZXNldChzdHJtKTtcbn1cblxuZnVuY3Rpb24gaW5mbGF0ZUluaXQyKHN0cm0sIHdpbmRvd0JpdHMpIHtcbiAgdmFyIHJldDtcbiAgdmFyIHN0YXRlO1xuXG4gIGlmICghc3RybSkgeyByZXR1cm4gWl9TVFJFQU1fRVJST1I7IH1cbiAgLy9zdHJtLm1zZyA9IFpfTlVMTDsgICAgICAgICAgICAgICAgIC8qIGluIGNhc2Ugd2UgcmV0dXJuIGFuIGVycm9yICovXG5cbiAgc3RhdGUgPSBuZXcgSW5mbGF0ZVN0YXRlKCk7XG5cbiAgLy9pZiAoc3RhdGUgPT09IFpfTlVMTCkgcmV0dXJuIFpfTUVNX0VSUk9SO1xuICAvL1RyYWNldigoc3RkZXJyLCBcImluZmxhdGU6IGFsbG9jYXRlZFxcblwiKSk7XG4gIHN0cm0uc3RhdGUgPSBzdGF0ZTtcbiAgc3RhdGUud2luZG93ID0gbnVsbC8qWl9OVUxMKi87XG4gIHJldCA9IGluZmxhdGVSZXNldDIoc3RybSwgd2luZG93Qml0cyk7XG4gIGlmIChyZXQgIT09IFpfT0spIHtcbiAgICBzdHJtLnN0YXRlID0gbnVsbC8qWl9OVUxMKi87XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gaW5mbGF0ZUluaXQoc3RybSkge1xuICByZXR1cm4gaW5mbGF0ZUluaXQyKHN0cm0sIERFRl9XQklUUyk7XG59XG5cblxuLypcbiBSZXR1cm4gc3RhdGUgd2l0aCBsZW5ndGggYW5kIGRpc3RhbmNlIGRlY29kaW5nIHRhYmxlcyBhbmQgaW5kZXggc2l6ZXMgc2V0IHRvXG4gZml4ZWQgY29kZSBkZWNvZGluZy4gIE5vcm1hbGx5IHRoaXMgcmV0dXJucyBmaXhlZCB0YWJsZXMgZnJvbSBpbmZmaXhlZC5oLlxuIElmIEJVSUxERklYRUQgaXMgZGVmaW5lZCwgdGhlbiBpbnN0ZWFkIHRoaXMgcm91dGluZSBidWlsZHMgdGhlIHRhYmxlcyB0aGVcbiBmaXJzdCB0aW1lIGl0J3MgY2FsbGVkLCBhbmQgcmV0dXJucyB0aG9zZSB0YWJsZXMgdGhlIGZpcnN0IHRpbWUgYW5kXG4gdGhlcmVhZnRlci4gIFRoaXMgcmVkdWNlcyB0aGUgc2l6ZSBvZiB0aGUgY29kZSBieSBhYm91dCAySyBieXRlcywgaW5cbiBleGNoYW5nZSBmb3IgYSBsaXR0bGUgZXhlY3V0aW9uIHRpbWUuICBIb3dldmVyLCBCVUlMREZJWEVEIHNob3VsZCBub3QgYmVcbiB1c2VkIGZvciB0aHJlYWRlZCBhcHBsaWNhdGlvbnMsIHNpbmNlIHRoZSByZXdyaXRpbmcgb2YgdGhlIHRhYmxlcyBhbmQgdmlyZ2luXG4gbWF5IG5vdCBiZSB0aHJlYWQtc2FmZS5cbiAqL1xudmFyIHZpcmdpbiA9IHRydWU7XG5cbnZhciBsZW5maXgsIGRpc3RmaXg7IC8vIFdlIGhhdmUgbm8gcG9pbnRlcnMgaW4gSlMsIHNvIGtlZXAgdGFibGVzIHNlcGFyYXRlXG5cbmZ1bmN0aW9uIGZpeGVkdGFibGVzKHN0YXRlKSB7XG4gIC8qIGJ1aWxkIGZpeGVkIGh1ZmZtYW4gdGFibGVzIGlmIGZpcnN0IGNhbGwgKG1heSBub3QgYmUgdGhyZWFkIHNhZmUpICovXG4gIGlmICh2aXJnaW4pIHtcbiAgICB2YXIgc3ltO1xuXG4gICAgbGVuZml4ID0gbmV3IHV0aWxzLkJ1ZjMyKDUxMik7XG4gICAgZGlzdGZpeCA9IG5ldyB1dGlscy5CdWYzMigzMik7XG5cbiAgICAvKiBsaXRlcmFsL2xlbmd0aCB0YWJsZSAqL1xuICAgIHN5bSA9IDA7XG4gICAgd2hpbGUgKHN5bSA8IDE0NCkgeyBzdGF0ZS5sZW5zW3N5bSsrXSA9IDg7IH1cbiAgICB3aGlsZSAoc3ltIDwgMjU2KSB7IHN0YXRlLmxlbnNbc3ltKytdID0gOTsgfVxuICAgIHdoaWxlIChzeW0gPCAyODApIHsgc3RhdGUubGVuc1tzeW0rK10gPSA3OyB9XG4gICAgd2hpbGUgKHN5bSA8IDI4OCkgeyBzdGF0ZS5sZW5zW3N5bSsrXSA9IDg7IH1cblxuICAgIGluZmxhdGVfdGFibGUoTEVOUywgIHN0YXRlLmxlbnMsIDAsIDI4OCwgbGVuZml4LCAgIDAsIHN0YXRlLndvcmssIHsgYml0czogOSB9KTtcblxuICAgIC8qIGRpc3RhbmNlIHRhYmxlICovXG4gICAgc3ltID0gMDtcbiAgICB3aGlsZSAoc3ltIDwgMzIpIHsgc3RhdGUubGVuc1tzeW0rK10gPSA1OyB9XG5cbiAgICBpbmZsYXRlX3RhYmxlKERJU1RTLCBzdGF0ZS5sZW5zLCAwLCAzMiwgICBkaXN0Zml4LCAwLCBzdGF0ZS53b3JrLCB7IGJpdHM6IDUgfSk7XG5cbiAgICAvKiBkbyB0aGlzIGp1c3Qgb25jZSAqL1xuICAgIHZpcmdpbiA9IGZhbHNlO1xuICB9XG5cbiAgc3RhdGUubGVuY29kZSA9IGxlbmZpeDtcbiAgc3RhdGUubGVuYml0cyA9IDk7XG4gIHN0YXRlLmRpc3Rjb2RlID0gZGlzdGZpeDtcbiAgc3RhdGUuZGlzdGJpdHMgPSA1O1xufVxuXG5cbi8qXG4gVXBkYXRlIHRoZSB3aW5kb3cgd2l0aCB0aGUgbGFzdCB3c2l6ZSAobm9ybWFsbHkgMzJLKSBieXRlcyB3cml0dGVuIGJlZm9yZVxuIHJldHVybmluZy4gIElmIHdpbmRvdyBkb2VzIG5vdCBleGlzdCB5ZXQsIGNyZWF0ZSBpdC4gIFRoaXMgaXMgb25seSBjYWxsZWRcbiB3aGVuIGEgd2luZG93IGlzIGFscmVhZHkgaW4gdXNlLCBvciB3aGVuIG91dHB1dCBoYXMgYmVlbiB3cml0dGVuIGR1cmluZyB0aGlzXG4gaW5mbGF0ZSBjYWxsLCBidXQgdGhlIGVuZCBvZiB0aGUgZGVmbGF0ZSBzdHJlYW0gaGFzIG5vdCBiZWVuIHJlYWNoZWQgeWV0LlxuIEl0IGlzIGFsc28gY2FsbGVkIHRvIGNyZWF0ZSBhIHdpbmRvdyBmb3IgZGljdGlvbmFyeSBkYXRhIHdoZW4gYSBkaWN0aW9uYXJ5XG4gaXMgbG9hZGVkLlxuXG4gUHJvdmlkaW5nIG91dHB1dCBidWZmZXJzIGxhcmdlciB0aGFuIDMySyB0byBpbmZsYXRlKCkgc2hvdWxkIHByb3ZpZGUgYSBzcGVlZFxuIGFkdmFudGFnZSwgc2luY2Ugb25seSB0aGUgbGFzdCAzMksgb2Ygb3V0cHV0IGlzIGNvcGllZCB0byB0aGUgc2xpZGluZyB3aW5kb3dcbiB1cG9uIHJldHVybiBmcm9tIGluZmxhdGUoKSwgYW5kIHNpbmNlIGFsbCBkaXN0YW5jZXMgYWZ0ZXIgdGhlIGZpcnN0IDMySyBvZlxuIG91dHB1dCB3aWxsIGZhbGwgaW4gdGhlIG91dHB1dCBkYXRhLCBtYWtpbmcgbWF0Y2ggY29waWVzIHNpbXBsZXIgYW5kIGZhc3Rlci5cbiBUaGUgYWR2YW50YWdlIG1heSBiZSBkZXBlbmRlbnQgb24gdGhlIHNpemUgb2YgdGhlIHByb2Nlc3NvcidzIGRhdGEgY2FjaGVzLlxuICovXG5mdW5jdGlvbiB1cGRhdGV3aW5kb3coc3RybSwgc3JjLCBlbmQsIGNvcHkpIHtcbiAgdmFyIGRpc3Q7XG4gIHZhciBzdGF0ZSA9IHN0cm0uc3RhdGU7XG5cbiAgLyogaWYgaXQgaGFzbid0IGJlZW4gZG9uZSBhbHJlYWR5LCBhbGxvY2F0ZSBzcGFjZSBmb3IgdGhlIHdpbmRvdyAqL1xuICBpZiAoc3RhdGUud2luZG93ID09PSBudWxsKSB7XG4gICAgc3RhdGUud3NpemUgPSAxIDw8IHN0YXRlLndiaXRzO1xuICAgIHN0YXRlLnduZXh0ID0gMDtcbiAgICBzdGF0ZS53aGF2ZSA9IDA7XG5cbiAgICBzdGF0ZS53aW5kb3cgPSBuZXcgdXRpbHMuQnVmOChzdGF0ZS53c2l6ZSk7XG4gIH1cblxuICAvKiBjb3B5IHN0YXRlLT53c2l6ZSBvciBsZXNzIG91dHB1dCBieXRlcyBpbnRvIHRoZSBjaXJjdWxhciB3aW5kb3cgKi9cbiAgaWYgKGNvcHkgPj0gc3RhdGUud3NpemUpIHtcbiAgICB1dGlscy5hcnJheVNldChzdGF0ZS53aW5kb3csIHNyYywgZW5kIC0gc3RhdGUud3NpemUsIHN0YXRlLndzaXplLCAwKTtcbiAgICBzdGF0ZS53bmV4dCA9IDA7XG4gICAgc3RhdGUud2hhdmUgPSBzdGF0ZS53c2l6ZTtcbiAgfVxuICBlbHNlIHtcbiAgICBkaXN0ID0gc3RhdGUud3NpemUgLSBzdGF0ZS53bmV4dDtcbiAgICBpZiAoZGlzdCA+IGNvcHkpIHtcbiAgICAgIGRpc3QgPSBjb3B5O1xuICAgIH1cbiAgICAvL3ptZW1jcHkoc3RhdGUtPndpbmRvdyArIHN0YXRlLT53bmV4dCwgZW5kIC0gY29weSwgZGlzdCk7XG4gICAgdXRpbHMuYXJyYXlTZXQoc3RhdGUud2luZG93LCBzcmMsIGVuZCAtIGNvcHksIGRpc3QsIHN0YXRlLnduZXh0KTtcbiAgICBjb3B5IC09IGRpc3Q7XG4gICAgaWYgKGNvcHkpIHtcbiAgICAgIC8vem1lbWNweShzdGF0ZS0+d2luZG93LCBlbmQgLSBjb3B5LCBjb3B5KTtcbiAgICAgIHV0aWxzLmFycmF5U2V0KHN0YXRlLndpbmRvdywgc3JjLCBlbmQgLSBjb3B5LCBjb3B5LCAwKTtcbiAgICAgIHN0YXRlLnduZXh0ID0gY29weTtcbiAgICAgIHN0YXRlLndoYXZlID0gc3RhdGUud3NpemU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc3RhdGUud25leHQgKz0gZGlzdDtcbiAgICAgIGlmIChzdGF0ZS53bmV4dCA9PT0gc3RhdGUud3NpemUpIHsgc3RhdGUud25leHQgPSAwOyB9XG4gICAgICBpZiAoc3RhdGUud2hhdmUgPCBzdGF0ZS53c2l6ZSkgeyBzdGF0ZS53aGF2ZSArPSBkaXN0OyB9XG4gICAgfVxuICB9XG4gIHJldHVybiAwO1xufVxuXG5mdW5jdGlvbiBpbmZsYXRlKHN0cm0sIGZsdXNoKSB7XG4gIHZhciBzdGF0ZTtcbiAgdmFyIGlucHV0LCBvdXRwdXQ7ICAgICAgICAgIC8vIGlucHV0L291dHB1dCBidWZmZXJzXG4gIHZhciBuZXh0OyAgICAgICAgICAgICAgICAgICAvKiBuZXh0IGlucHV0IElOREVYICovXG4gIHZhciBwdXQ7ICAgICAgICAgICAgICAgICAgICAvKiBuZXh0IG91dHB1dCBJTkRFWCAqL1xuICB2YXIgaGF2ZSwgbGVmdDsgICAgICAgICAgICAgLyogYXZhaWxhYmxlIGlucHV0IGFuZCBvdXRwdXQgKi9cbiAgdmFyIGhvbGQ7ICAgICAgICAgICAgICAgICAgIC8qIGJpdCBidWZmZXIgKi9cbiAgdmFyIGJpdHM7ICAgICAgICAgICAgICAgICAgIC8qIGJpdHMgaW4gYml0IGJ1ZmZlciAqL1xuICB2YXIgX2luLCBfb3V0OyAgICAgICAgICAgICAgLyogc2F2ZSBzdGFydGluZyBhdmFpbGFibGUgaW5wdXQgYW5kIG91dHB1dCAqL1xuICB2YXIgY29weTsgICAgICAgICAgICAgICAgICAgLyogbnVtYmVyIG9mIHN0b3JlZCBvciBtYXRjaCBieXRlcyB0byBjb3B5ICovXG4gIHZhciBmcm9tOyAgICAgICAgICAgICAgICAgICAvKiB3aGVyZSB0byBjb3B5IG1hdGNoIGJ5dGVzIGZyb20gKi9cbiAgdmFyIGZyb21fc291cmNlO1xuICB2YXIgaGVyZSA9IDA7ICAgICAgICAgICAgICAgLyogY3VycmVudCBkZWNvZGluZyB0YWJsZSBlbnRyeSAqL1xuICB2YXIgaGVyZV9iaXRzLCBoZXJlX29wLCBoZXJlX3ZhbDsgLy8gcGFrZWQgXCJoZXJlXCIgZGVub3JtYWxpemVkIChKUyBzcGVjaWZpYylcbiAgLy92YXIgbGFzdDsgICAgICAgICAgICAgICAgICAgLyogcGFyZW50IHRhYmxlIGVudHJ5ICovXG4gIHZhciBsYXN0X2JpdHMsIGxhc3Rfb3AsIGxhc3RfdmFsOyAvLyBwYWtlZCBcImxhc3RcIiBkZW5vcm1hbGl6ZWQgKEpTIHNwZWNpZmljKVxuICB2YXIgbGVuOyAgICAgICAgICAgICAgICAgICAgLyogbGVuZ3RoIHRvIGNvcHkgZm9yIHJlcGVhdHMsIGJpdHMgdG8gZHJvcCAqL1xuICB2YXIgcmV0OyAgICAgICAgICAgICAgICAgICAgLyogcmV0dXJuIGNvZGUgKi9cbiAgdmFyIGhidWYgPSBuZXcgdXRpbHMuQnVmOCg0KTsgICAgLyogYnVmZmVyIGZvciBnemlwIGhlYWRlciBjcmMgY2FsY3VsYXRpb24gKi9cbiAgdmFyIG9wdHM7XG5cbiAgdmFyIG47IC8vIHRlbXBvcmFyeSB2YXIgZm9yIE5FRURfQklUU1xuXG4gIHZhciBvcmRlciA9IC8qIHBlcm11dGF0aW9uIG9mIGNvZGUgbGVuZ3RocyAqL1xuICAgIFsgMTYsIDE3LCAxOCwgMCwgOCwgNywgOSwgNiwgMTAsIDUsIDExLCA0LCAxMiwgMywgMTMsIDIsIDE0LCAxLCAxNSBdO1xuXG5cbiAgaWYgKCFzdHJtIHx8ICFzdHJtLnN0YXRlIHx8ICFzdHJtLm91dHB1dCB8fFxuICAgICAgKCFzdHJtLmlucHV0ICYmIHN0cm0uYXZhaWxfaW4gIT09IDApKSB7XG4gICAgcmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xuICB9XG5cbiAgc3RhdGUgPSBzdHJtLnN0YXRlO1xuICBpZiAoc3RhdGUubW9kZSA9PT0gVFlQRSkgeyBzdGF0ZS5tb2RlID0gVFlQRURPOyB9ICAgIC8qIHNraXAgY2hlY2sgKi9cblxuXG4gIC8vLS0tIExPQUQoKSAtLS1cbiAgcHV0ID0gc3RybS5uZXh0X291dDtcbiAgb3V0cHV0ID0gc3RybS5vdXRwdXQ7XG4gIGxlZnQgPSBzdHJtLmF2YWlsX291dDtcbiAgbmV4dCA9IHN0cm0ubmV4dF9pbjtcbiAgaW5wdXQgPSBzdHJtLmlucHV0O1xuICBoYXZlID0gc3RybS5hdmFpbF9pbjtcbiAgaG9sZCA9IHN0YXRlLmhvbGQ7XG4gIGJpdHMgPSBzdGF0ZS5iaXRzO1xuICAvLy0tLVxuXG4gIF9pbiA9IGhhdmU7XG4gIF9vdXQgPSBsZWZ0O1xuICByZXQgPSBaX09LO1xuXG4gIGluZl9sZWF2ZTogLy8gZ290byBlbXVsYXRpb25cbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoc3RhdGUubW9kZSkge1xuICAgICAgY2FzZSBIRUFEOlxuICAgICAgICBpZiAoc3RhdGUud3JhcCA9PT0gMCkge1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBUWVBFRE87XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy89PT0gTkVFREJJVFMoMTYpO1xuICAgICAgICB3aGlsZSAoYml0cyA8IDE2KSB7XG4gICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgfVxuICAgICAgICAvLz09PS8vXG4gICAgICAgIGlmICgoc3RhdGUud3JhcCAmIDIpICYmIGhvbGQgPT09IDB4OGIxZikgeyAgLyogZ3ppcCBoZWFkZXIgKi9cbiAgICAgICAgICBzdGF0ZS5jaGVjayA9IDAvKmNyYzMyKDBMLCBaX05VTEwsIDApKi87XG4gICAgICAgICAgLy89PT0gQ1JDMihzdGF0ZS5jaGVjaywgaG9sZCk7XG4gICAgICAgICAgaGJ1ZlswXSA9IGhvbGQgJiAweGZmO1xuICAgICAgICAgIGhidWZbMV0gPSAoaG9sZCA+Pj4gOCkgJiAweGZmO1xuICAgICAgICAgIHN0YXRlLmNoZWNrID0gY3JjMzIoc3RhdGUuY2hlY2ssIGhidWYsIDIsIDApO1xuICAgICAgICAgIC8vPT09Ly9cblxuICAgICAgICAgIC8vPT09IElOSVRCSVRTKCk7XG4gICAgICAgICAgaG9sZCA9IDA7XG4gICAgICAgICAgYml0cyA9IDA7XG4gICAgICAgICAgLy89PT0vL1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBGTEFHUztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5mbGFncyA9IDA7ICAgICAgICAgICAvKiBleHBlY3QgemxpYiBoZWFkZXIgKi9cbiAgICAgICAgaWYgKHN0YXRlLmhlYWQpIHtcbiAgICAgICAgICBzdGF0ZS5oZWFkLmRvbmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIShzdGF0ZS53cmFwICYgMSkgfHwgICAvKiBjaGVjayBpZiB6bGliIGhlYWRlciBhbGxvd2VkICovXG4gICAgICAgICAgKCgoaG9sZCAmIDB4ZmYpLypCSVRTKDgpKi8gPDwgOCkgKyAoaG9sZCA+PiA4KSkgJSAzMSkge1xuICAgICAgICAgIHN0cm0ubXNnID0gJ2luY29ycmVjdCBoZWFkZXIgY2hlY2snO1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChob2xkICYgMHgwZikvKkJJVFMoNCkqLyAhPT0gWl9ERUZMQVRFRCkge1xuICAgICAgICAgIHN0cm0ubXNnID0gJ3Vua25vd24gY29tcHJlc3Npb24gbWV0aG9kJztcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vLS0tIERST1BCSVRTKDQpIC0tLS8vXG4gICAgICAgIGhvbGQgPj4+PSA0O1xuICAgICAgICBiaXRzIC09IDQ7XG4gICAgICAgIC8vLS0tLy9cbiAgICAgICAgbGVuID0gKGhvbGQgJiAweDBmKS8qQklUUyg0KSovICsgODtcbiAgICAgICAgaWYgKHN0YXRlLndiaXRzID09PSAwKSB7XG4gICAgICAgICAgc3RhdGUud2JpdHMgPSBsZW47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobGVuID4gc3RhdGUud2JpdHMpIHtcbiAgICAgICAgICBzdHJtLm1zZyA9ICdpbnZhbGlkIHdpbmRvdyBzaXplJztcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmRtYXggPSAxIDw8IGxlbjtcbiAgICAgICAgLy9UcmFjZXYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgIHpsaWIgaGVhZGVyIG9rXFxuXCIpKTtcbiAgICAgICAgc3RybS5hZGxlciA9IHN0YXRlLmNoZWNrID0gMS8qYWRsZXIzMigwTCwgWl9OVUxMLCAwKSovO1xuICAgICAgICBzdGF0ZS5tb2RlID0gaG9sZCAmIDB4MjAwID8gRElDVElEIDogVFlQRTtcbiAgICAgICAgLy89PT0gSU5JVEJJVFMoKTtcbiAgICAgICAgaG9sZCA9IDA7XG4gICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAvLz09PS8vXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBGTEFHUzpcbiAgICAgICAgLy89PT0gTkVFREJJVFMoMTYpOyAqL1xuICAgICAgICB3aGlsZSAoYml0cyA8IDE2KSB7XG4gICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgfVxuICAgICAgICAvLz09PS8vXG4gICAgICAgIHN0YXRlLmZsYWdzID0gaG9sZDtcbiAgICAgICAgaWYgKChzdGF0ZS5mbGFncyAmIDB4ZmYpICE9PSBaX0RFRkxBVEVEKSB7XG4gICAgICAgICAgc3RybS5tc2cgPSAndW5rbm93biBjb21wcmVzc2lvbiBtZXRob2QnO1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXRlLmZsYWdzICYgMHhlMDAwKSB7XG4gICAgICAgICAgc3RybS5tc2cgPSAndW5rbm93biBoZWFkZXIgZmxhZ3Mgc2V0JztcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGF0ZS5oZWFkKSB7XG4gICAgICAgICAgc3RhdGUuaGVhZC50ZXh0ID0gKChob2xkID4+IDgpICYgMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXRlLmZsYWdzICYgMHgwMjAwKSB7XG4gICAgICAgICAgLy89PT0gQ1JDMihzdGF0ZS5jaGVjaywgaG9sZCk7XG4gICAgICAgICAgaGJ1ZlswXSA9IGhvbGQgJiAweGZmO1xuICAgICAgICAgIGhidWZbMV0gPSAoaG9sZCA+Pj4gOCkgJiAweGZmO1xuICAgICAgICAgIHN0YXRlLmNoZWNrID0gY3JjMzIoc3RhdGUuY2hlY2ssIGhidWYsIDIsIDApO1xuICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgfVxuICAgICAgICAvLz09PSBJTklUQklUUygpO1xuICAgICAgICBob2xkID0gMDtcbiAgICAgICAgYml0cyA9IDA7XG4gICAgICAgIC8vPT09Ly9cbiAgICAgICAgc3RhdGUubW9kZSA9IFRJTUU7XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgVElNRTpcbiAgICAgICAgLy89PT0gTkVFREJJVFMoMzIpOyAqL1xuICAgICAgICB3aGlsZSAoYml0cyA8IDMyKSB7XG4gICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgfVxuICAgICAgICAvLz09PS8vXG4gICAgICAgIGlmIChzdGF0ZS5oZWFkKSB7XG4gICAgICAgICAgc3RhdGUuaGVhZC50aW1lID0gaG9sZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGUuZmxhZ3MgJiAweDAyMDApIHtcbiAgICAgICAgICAvLz09PSBDUkM0KHN0YXRlLmNoZWNrLCBob2xkKVxuICAgICAgICAgIGhidWZbMF0gPSBob2xkICYgMHhmZjtcbiAgICAgICAgICBoYnVmWzFdID0gKGhvbGQgPj4+IDgpICYgMHhmZjtcbiAgICAgICAgICBoYnVmWzJdID0gKGhvbGQgPj4+IDE2KSAmIDB4ZmY7XG4gICAgICAgICAgaGJ1ZlszXSA9IChob2xkID4+PiAyNCkgJiAweGZmO1xuICAgICAgICAgIHN0YXRlLmNoZWNrID0gY3JjMzIoc3RhdGUuY2hlY2ssIGhidWYsIDQsIDApO1xuICAgICAgICAgIC8vPT09XG4gICAgICAgIH1cbiAgICAgICAgLy89PT0gSU5JVEJJVFMoKTtcbiAgICAgICAgaG9sZCA9IDA7XG4gICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAvLz09PS8vXG4gICAgICAgIHN0YXRlLm1vZGUgPSBPUztcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBPUzpcbiAgICAgICAgLy89PT0gTkVFREJJVFMoMTYpOyAqL1xuICAgICAgICB3aGlsZSAoYml0cyA8IDE2KSB7XG4gICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgfVxuICAgICAgICAvLz09PS8vXG4gICAgICAgIGlmIChzdGF0ZS5oZWFkKSB7XG4gICAgICAgICAgc3RhdGUuaGVhZC54ZmxhZ3MgPSAoaG9sZCAmIDB4ZmYpO1xuICAgICAgICAgIHN0YXRlLmhlYWQub3MgPSAoaG9sZCA+PiA4KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGUuZmxhZ3MgJiAweDAyMDApIHtcbiAgICAgICAgICAvLz09PSBDUkMyKHN0YXRlLmNoZWNrLCBob2xkKTtcbiAgICAgICAgICBoYnVmWzBdID0gaG9sZCAmIDB4ZmY7XG4gICAgICAgICAgaGJ1ZlsxXSA9IChob2xkID4+PiA4KSAmIDB4ZmY7XG4gICAgICAgICAgc3RhdGUuY2hlY2sgPSBjcmMzMihzdGF0ZS5jaGVjaywgaGJ1ZiwgMiwgMCk7XG4gICAgICAgICAgLy89PT0vL1xuICAgICAgICB9XG4gICAgICAgIC8vPT09IElOSVRCSVRTKCk7XG4gICAgICAgIGhvbGQgPSAwO1xuICAgICAgICBiaXRzID0gMDtcbiAgICAgICAgLy89PT0vL1xuICAgICAgICBzdGF0ZS5tb2RlID0gRVhMRU47XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgRVhMRU46XG4gICAgICAgIGlmIChzdGF0ZS5mbGFncyAmIDB4MDQwMCkge1xuICAgICAgICAgIC8vPT09IE5FRURCSVRTKDE2KTsgKi9cbiAgICAgICAgICB3aGlsZSAoYml0cyA8IDE2KSB7XG4gICAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICAgIGhhdmUtLTtcbiAgICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLz09PS8vXG4gICAgICAgICAgc3RhdGUubGVuZ3RoID0gaG9sZDtcbiAgICAgICAgICBpZiAoc3RhdGUuaGVhZCkge1xuICAgICAgICAgICAgc3RhdGUuaGVhZC5leHRyYV9sZW4gPSBob2xkO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3RhdGUuZmxhZ3MgJiAweDAyMDApIHtcbiAgICAgICAgICAgIC8vPT09IENSQzIoc3RhdGUuY2hlY2ssIGhvbGQpO1xuICAgICAgICAgICAgaGJ1ZlswXSA9IGhvbGQgJiAweGZmO1xuICAgICAgICAgICAgaGJ1ZlsxXSA9IChob2xkID4+PiA4KSAmIDB4ZmY7XG4gICAgICAgICAgICBzdGF0ZS5jaGVjayA9IGNyYzMyKHN0YXRlLmNoZWNrLCBoYnVmLCAyLCAwKTtcbiAgICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgICB9XG4gICAgICAgICAgLy89PT0gSU5JVEJJVFMoKTtcbiAgICAgICAgICBob2xkID0gMDtcbiAgICAgICAgICBiaXRzID0gMDtcbiAgICAgICAgICAvLz09PS8vXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3RhdGUuaGVhZCkge1xuICAgICAgICAgIHN0YXRlLmhlYWQuZXh0cmEgPSBudWxsLypaX05VTEwqLztcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5tb2RlID0gRVhUUkE7XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgRVhUUkE6XG4gICAgICAgIGlmIChzdGF0ZS5mbGFncyAmIDB4MDQwMCkge1xuICAgICAgICAgIGNvcHkgPSBzdGF0ZS5sZW5ndGg7XG4gICAgICAgICAgaWYgKGNvcHkgPiBoYXZlKSB7IGNvcHkgPSBoYXZlOyB9XG4gICAgICAgICAgaWYgKGNvcHkpIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5oZWFkKSB7XG4gICAgICAgICAgICAgIGxlbiA9IHN0YXRlLmhlYWQuZXh0cmFfbGVuIC0gc3RhdGUubGVuZ3RoO1xuICAgICAgICAgICAgICBpZiAoIXN0YXRlLmhlYWQuZXh0cmEpIHtcbiAgICAgICAgICAgICAgICAvLyBVc2UgdW50eXBlZCBhcnJheSBmb3IgbW9yZSBjb252ZW5pZW50IHByb2Nlc3NpbmcgbGF0ZXJcbiAgICAgICAgICAgICAgICBzdGF0ZS5oZWFkLmV4dHJhID0gbmV3IEFycmF5KHN0YXRlLmhlYWQuZXh0cmFfbGVuKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB1dGlscy5hcnJheVNldChcbiAgICAgICAgICAgICAgICBzdGF0ZS5oZWFkLmV4dHJhLFxuICAgICAgICAgICAgICAgIGlucHV0LFxuICAgICAgICAgICAgICAgIG5leHQsXG4gICAgICAgICAgICAgICAgLy8gZXh0cmEgZmllbGQgaXMgbGltaXRlZCB0byA2NTUzNiBieXRlc1xuICAgICAgICAgICAgICAgIC8vIC0gbm8gbmVlZCBmb3IgYWRkaXRpb25hbCBzaXplIGNoZWNrXG4gICAgICAgICAgICAgICAgY29weSxcbiAgICAgICAgICAgICAgICAvKmxlbiArIGNvcHkgPiBzdGF0ZS5oZWFkLmV4dHJhX21heCAtIGxlbiA/IHN0YXRlLmhlYWQuZXh0cmFfbWF4IDogY29weSwqL1xuICAgICAgICAgICAgICAgIGxlblxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAvL3ptZW1jcHkoc3RhdGUuaGVhZC5leHRyYSArIGxlbiwgbmV4dCxcbiAgICAgICAgICAgICAgLy8gICAgICAgIGxlbiArIGNvcHkgPiBzdGF0ZS5oZWFkLmV4dHJhX21heCA/XG4gICAgICAgICAgICAgIC8vICAgICAgICBzdGF0ZS5oZWFkLmV4dHJhX21heCAtIGxlbiA6IGNvcHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXRlLmZsYWdzICYgMHgwMjAwKSB7XG4gICAgICAgICAgICAgIHN0YXRlLmNoZWNrID0gY3JjMzIoc3RhdGUuY2hlY2ssIGlucHV0LCBjb3B5LCBuZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhhdmUgLT0gY29weTtcbiAgICAgICAgICAgIG5leHQgKz0gY29weTtcbiAgICAgICAgICAgIHN0YXRlLmxlbmd0aCAtPSBjb3B5O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3RhdGUubGVuZ3RoKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmxlbmd0aCA9IDA7XG4gICAgICAgIHN0YXRlLm1vZGUgPSBOQU1FO1xuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIE5BTUU6XG4gICAgICAgIGlmIChzdGF0ZS5mbGFncyAmIDB4MDgwMCkge1xuICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgIGNvcHkgPSAwO1xuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIC8vIFRPRE86IDIgb3IgMSBieXRlcz9cbiAgICAgICAgICAgIGxlbiA9IGlucHV0W25leHQgKyBjb3B5KytdO1xuICAgICAgICAgICAgLyogdXNlIGNvbnN0YW50IGxpbWl0IGJlY2F1c2UgaW4ganMgd2Ugc2hvdWxkIG5vdCBwcmVhbGxvY2F0ZSBtZW1vcnkgKi9cbiAgICAgICAgICAgIGlmIChzdGF0ZS5oZWFkICYmIGxlbiAmJlxuICAgICAgICAgICAgICAgIChzdGF0ZS5sZW5ndGggPCA2NTUzNiAvKnN0YXRlLmhlYWQubmFtZV9tYXgqLykpIHtcbiAgICAgICAgICAgICAgc3RhdGUuaGVhZC5uYW1lICs9IFN0cmluZy5mcm9tQ2hhckNvZGUobGVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IHdoaWxlIChsZW4gJiYgY29weSA8IGhhdmUpO1xuXG4gICAgICAgICAgaWYgKHN0YXRlLmZsYWdzICYgMHgwMjAwKSB7XG4gICAgICAgICAgICBzdGF0ZS5jaGVjayA9IGNyYzMyKHN0YXRlLmNoZWNrLCBpbnB1dCwgY29weSwgbmV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGhhdmUgLT0gY29weTtcbiAgICAgICAgICBuZXh0ICs9IGNvcHk7XG4gICAgICAgICAgaWYgKGxlbikgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdGF0ZS5oZWFkKSB7XG4gICAgICAgICAgc3RhdGUuaGVhZC5uYW1lID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5sZW5ndGggPSAwO1xuICAgICAgICBzdGF0ZS5tb2RlID0gQ09NTUVOVDtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBDT01NRU5UOlxuICAgICAgICBpZiAoc3RhdGUuZmxhZ3MgJiAweDEwMDApIHtcbiAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICBjb3B5ID0gMDtcbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICBsZW4gPSBpbnB1dFtuZXh0ICsgY29weSsrXTtcbiAgICAgICAgICAgIC8qIHVzZSBjb25zdGFudCBsaW1pdCBiZWNhdXNlIGluIGpzIHdlIHNob3VsZCBub3QgcHJlYWxsb2NhdGUgbWVtb3J5ICovXG4gICAgICAgICAgICBpZiAoc3RhdGUuaGVhZCAmJiBsZW4gJiZcbiAgICAgICAgICAgICAgICAoc3RhdGUubGVuZ3RoIDwgNjU1MzYgLypzdGF0ZS5oZWFkLmNvbW1fbWF4Ki8pKSB7XG4gICAgICAgICAgICAgIHN0YXRlLmhlYWQuY29tbWVudCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGxlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSB3aGlsZSAobGVuICYmIGNvcHkgPCBoYXZlKTtcbiAgICAgICAgICBpZiAoc3RhdGUuZmxhZ3MgJiAweDAyMDApIHtcbiAgICAgICAgICAgIHN0YXRlLmNoZWNrID0gY3JjMzIoc3RhdGUuY2hlY2ssIGlucHV0LCBjb3B5LCBuZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaGF2ZSAtPSBjb3B5O1xuICAgICAgICAgIG5leHQgKz0gY29weTtcbiAgICAgICAgICBpZiAobGVuKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0YXRlLmhlYWQpIHtcbiAgICAgICAgICBzdGF0ZS5oZWFkLmNvbW1lbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLm1vZGUgPSBIQ1JDO1xuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIEhDUkM6XG4gICAgICAgIGlmIChzdGF0ZS5mbGFncyAmIDB4MDIwMCkge1xuICAgICAgICAgIC8vPT09IE5FRURCSVRTKDE2KTsgKi9cbiAgICAgICAgICB3aGlsZSAoYml0cyA8IDE2KSB7XG4gICAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICAgIGhhdmUtLTtcbiAgICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLz09PS8vXG4gICAgICAgICAgaWYgKGhvbGQgIT09IChzdGF0ZS5jaGVjayAmIDB4ZmZmZikpIHtcbiAgICAgICAgICAgIHN0cm0ubXNnID0gJ2hlYWRlciBjcmMgbWlzbWF0Y2gnO1xuICAgICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLz09PSBJTklUQklUUygpO1xuICAgICAgICAgIGhvbGQgPSAwO1xuICAgICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGUuaGVhZCkge1xuICAgICAgICAgIHN0YXRlLmhlYWQuaGNyYyA9ICgoc3RhdGUuZmxhZ3MgPj4gOSkgJiAxKTtcbiAgICAgICAgICBzdGF0ZS5oZWFkLmRvbmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHN0cm0uYWRsZXIgPSBzdGF0ZS5jaGVjayA9IDA7XG4gICAgICAgIHN0YXRlLm1vZGUgPSBUWVBFO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRElDVElEOlxuICAgICAgICAvLz09PSBORUVEQklUUygzMik7ICovXG4gICAgICAgIHdoaWxlIChiaXRzIDwgMzIpIHtcbiAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICB9XG4gICAgICAgIC8vPT09Ly9cbiAgICAgICAgc3RybS5hZGxlciA9IHN0YXRlLmNoZWNrID0genN3YXAzMihob2xkKTtcbiAgICAgICAgLy89PT0gSU5JVEJJVFMoKTtcbiAgICAgICAgaG9sZCA9IDA7XG4gICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAvLz09PS8vXG4gICAgICAgIHN0YXRlLm1vZGUgPSBESUNUO1xuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIERJQ1Q6XG4gICAgICAgIGlmIChzdGF0ZS5oYXZlZGljdCA9PT0gMCkge1xuICAgICAgICAgIC8vLS0tIFJFU1RPUkUoKSAtLS1cbiAgICAgICAgICBzdHJtLm5leHRfb3V0ID0gcHV0O1xuICAgICAgICAgIHN0cm0uYXZhaWxfb3V0ID0gbGVmdDtcbiAgICAgICAgICBzdHJtLm5leHRfaW4gPSBuZXh0O1xuICAgICAgICAgIHN0cm0uYXZhaWxfaW4gPSBoYXZlO1xuICAgICAgICAgIHN0YXRlLmhvbGQgPSBob2xkO1xuICAgICAgICAgIHN0YXRlLmJpdHMgPSBiaXRzO1xuICAgICAgICAgIC8vLS0tXG4gICAgICAgICAgcmV0dXJuIFpfTkVFRF9ESUNUO1xuICAgICAgICB9XG4gICAgICAgIHN0cm0uYWRsZXIgPSBzdGF0ZS5jaGVjayA9IDEvKmFkbGVyMzIoMEwsIFpfTlVMTCwgMCkqLztcbiAgICAgICAgc3RhdGUubW9kZSA9IFRZUEU7XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgVFlQRTpcbiAgICAgICAgaWYgKGZsdXNoID09PSBaX0JMT0NLIHx8IGZsdXNoID09PSBaX1RSRUVTKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIFRZUEVETzpcbiAgICAgICAgaWYgKHN0YXRlLmxhc3QpIHtcbiAgICAgICAgICAvLy0tLSBCWVRFQklUUygpIC0tLS8vXG4gICAgICAgICAgaG9sZCA+Pj49IGJpdHMgJiA3O1xuICAgICAgICAgIGJpdHMgLT0gYml0cyAmIDc7XG4gICAgICAgICAgLy8tLS0vL1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBDSEVDSztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLz09PSBORUVEQklUUygzKTsgKi9cbiAgICAgICAgd2hpbGUgKGJpdHMgPCAzKSB7XG4gICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgfVxuICAgICAgICAvLz09PS8vXG4gICAgICAgIHN0YXRlLmxhc3QgPSAoaG9sZCAmIDB4MDEpLypCSVRTKDEpKi87XG4gICAgICAgIC8vLS0tIERST1BCSVRTKDEpIC0tLS8vXG4gICAgICAgIGhvbGQgPj4+PSAxO1xuICAgICAgICBiaXRzIC09IDE7XG4gICAgICAgIC8vLS0tLy9cblxuICAgICAgICBzd2l0Y2ggKChob2xkICYgMHgwMykvKkJJVFMoMikqLykge1xuICAgICAgICAgIGNhc2UgMDogICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIHN0b3JlZCBibG9jayAqL1xuICAgICAgICAgICAgLy9UcmFjZXYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgICAgc3RvcmVkIGJsb2NrJXNcXG5cIixcbiAgICAgICAgICAgIC8vICAgICAgICBzdGF0ZS5sYXN0ID8gXCIgKGxhc3QpXCIgOiBcIlwiKSk7XG4gICAgICAgICAgICBzdGF0ZS5tb2RlID0gU1RPUkVEO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAxOiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogZml4ZWQgYmxvY2sgKi9cbiAgICAgICAgICAgIGZpeGVkdGFibGVzKHN0YXRlKTtcbiAgICAgICAgICAgIC8vVHJhY2V2KChzdGRlcnIsIFwiaW5mbGF0ZTogICAgIGZpeGVkIGNvZGVzIGJsb2NrJXNcXG5cIixcbiAgICAgICAgICAgIC8vICAgICAgICBzdGF0ZS5sYXN0ID8gXCIgKGxhc3QpXCIgOiBcIlwiKSk7XG4gICAgICAgICAgICBzdGF0ZS5tb2RlID0gTEVOXzsgICAgICAgICAgICAgLyogZGVjb2RlIGNvZGVzICovXG4gICAgICAgICAgICBpZiAoZmx1c2ggPT09IFpfVFJFRVMpIHtcbiAgICAgICAgICAgICAgLy8tLS0gRFJPUEJJVFMoMikgLS0tLy9cbiAgICAgICAgICAgICAgaG9sZCA+Pj49IDI7XG4gICAgICAgICAgICAgIGJpdHMgLT0gMjtcbiAgICAgICAgICAgICAgLy8tLS0vL1xuICAgICAgICAgICAgICBicmVhayBpbmZfbGVhdmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDI6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBkeW5hbWljIGJsb2NrICovXG4gICAgICAgICAgICAvL1RyYWNldigoc3RkZXJyLCBcImluZmxhdGU6ICAgICBkeW5hbWljIGNvZGVzIGJsb2NrJXNcXG5cIixcbiAgICAgICAgICAgIC8vICAgICAgICBzdGF0ZS5sYXN0ID8gXCIgKGxhc3QpXCIgOiBcIlwiKSk7XG4gICAgICAgICAgICBzdGF0ZS5tb2RlID0gVEFCTEU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBzdHJtLm1zZyA9ICdpbnZhbGlkIGJsb2NrIHR5cGUnO1xuICAgICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgfVxuICAgICAgICAvLy0tLSBEUk9QQklUUygyKSAtLS0vL1xuICAgICAgICBob2xkID4+Pj0gMjtcbiAgICAgICAgYml0cyAtPSAyO1xuICAgICAgICAvLy0tLS8vXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTVE9SRUQ6XG4gICAgICAgIC8vLS0tIEJZVEVCSVRTKCkgLS0tLy8gLyogZ28gdG8gYnl0ZSBib3VuZGFyeSAqL1xuICAgICAgICBob2xkID4+Pj0gYml0cyAmIDc7XG4gICAgICAgIGJpdHMgLT0gYml0cyAmIDc7XG4gICAgICAgIC8vLS0tLy9cbiAgICAgICAgLy89PT0gTkVFREJJVFMoMzIpOyAqL1xuICAgICAgICB3aGlsZSAoYml0cyA8IDMyKSB7XG4gICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgfVxuICAgICAgICAvLz09PS8vXG4gICAgICAgIGlmICgoaG9sZCAmIDB4ZmZmZikgIT09ICgoaG9sZCA+Pj4gMTYpIF4gMHhmZmZmKSkge1xuICAgICAgICAgIHN0cm0ubXNnID0gJ2ludmFsaWQgc3RvcmVkIGJsb2NrIGxlbmd0aHMnO1xuICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUubGVuZ3RoID0gaG9sZCAmIDB4ZmZmZjtcbiAgICAgICAgLy9UcmFjZXYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgICAgICBzdG9yZWQgbGVuZ3RoICV1XFxuXCIsXG4gICAgICAgIC8vICAgICAgICBzdGF0ZS5sZW5ndGgpKTtcbiAgICAgICAgLy89PT0gSU5JVEJJVFMoKTtcbiAgICAgICAgaG9sZCA9IDA7XG4gICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAvLz09PS8vXG4gICAgICAgIHN0YXRlLm1vZGUgPSBDT1BZXztcbiAgICAgICAgaWYgKGZsdXNoID09PSBaX1RSRUVTKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIENPUFlfOlxuICAgICAgICBzdGF0ZS5tb2RlID0gQ09QWTtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBDT1BZOlxuICAgICAgICBjb3B5ID0gc3RhdGUubGVuZ3RoO1xuICAgICAgICBpZiAoY29weSkge1xuICAgICAgICAgIGlmIChjb3B5ID4gaGF2ZSkgeyBjb3B5ID0gaGF2ZTsgfVxuICAgICAgICAgIGlmIChjb3B5ID4gbGVmdCkgeyBjb3B5ID0gbGVmdDsgfVxuICAgICAgICAgIGlmIChjb3B5ID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgIC8vLS0tIHptZW1jcHkocHV0LCBuZXh0LCBjb3B5KTsgLS0tXG4gICAgICAgICAgdXRpbHMuYXJyYXlTZXQob3V0cHV0LCBpbnB1dCwgbmV4dCwgY29weSwgcHV0KTtcbiAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgaGF2ZSAtPSBjb3B5O1xuICAgICAgICAgIG5leHQgKz0gY29weTtcbiAgICAgICAgICBsZWZ0IC09IGNvcHk7XG4gICAgICAgICAgcHV0ICs9IGNvcHk7XG4gICAgICAgICAgc3RhdGUubGVuZ3RoIC09IGNvcHk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy9UcmFjZXYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgICAgICBzdG9yZWQgZW5kXFxuXCIpKTtcbiAgICAgICAgc3RhdGUubW9kZSA9IFRZUEU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUQUJMRTpcbiAgICAgICAgLy89PT0gTkVFREJJVFMoMTQpOyAqL1xuICAgICAgICB3aGlsZSAoYml0cyA8IDE0KSB7XG4gICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgfVxuICAgICAgICAvLz09PS8vXG4gICAgICAgIHN0YXRlLm5sZW4gPSAoaG9sZCAmIDB4MWYpLypCSVRTKDUpKi8gKyAyNTc7XG4gICAgICAgIC8vLS0tIERST1BCSVRTKDUpIC0tLS8vXG4gICAgICAgIGhvbGQgPj4+PSA1O1xuICAgICAgICBiaXRzIC09IDU7XG4gICAgICAgIC8vLS0tLy9cbiAgICAgICAgc3RhdGUubmRpc3QgPSAoaG9sZCAmIDB4MWYpLypCSVRTKDUpKi8gKyAxO1xuICAgICAgICAvLy0tLSBEUk9QQklUUyg1KSAtLS0vL1xuICAgICAgICBob2xkID4+Pj0gNTtcbiAgICAgICAgYml0cyAtPSA1O1xuICAgICAgICAvLy0tLS8vXG4gICAgICAgIHN0YXRlLm5jb2RlID0gKGhvbGQgJiAweDBmKS8qQklUUyg0KSovICsgNDtcbiAgICAgICAgLy8tLS0gRFJPUEJJVFMoNCkgLS0tLy9cbiAgICAgICAgaG9sZCA+Pj49IDQ7XG4gICAgICAgIGJpdHMgLT0gNDtcbiAgICAgICAgLy8tLS0vL1xuLy8jaWZuZGVmIFBLWklQX0JVR19XT1JLQVJPVU5EXG4gICAgICAgIGlmIChzdGF0ZS5ubGVuID4gMjg2IHx8IHN0YXRlLm5kaXN0ID4gMzApIHtcbiAgICAgICAgICBzdHJtLm1zZyA9ICd0b28gbWFueSBsZW5ndGggb3IgZGlzdGFuY2Ugc3ltYm9scyc7XG4gICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuLy8jZW5kaWZcbiAgICAgICAgLy9UcmFjZXYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgICAgICB0YWJsZSBzaXplcyBva1xcblwiKSk7XG4gICAgICAgIHN0YXRlLmhhdmUgPSAwO1xuICAgICAgICBzdGF0ZS5tb2RlID0gTEVOTEVOUztcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBMRU5MRU5TOlxuICAgICAgICB3aGlsZSAoc3RhdGUuaGF2ZSA8IHN0YXRlLm5jb2RlKSB7XG4gICAgICAgICAgLy89PT0gTkVFREJJVFMoMyk7XG4gICAgICAgICAgd2hpbGUgKGJpdHMgPCAzKSB7XG4gICAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICAgIGhhdmUtLTtcbiAgICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLz09PS8vXG4gICAgICAgICAgc3RhdGUubGVuc1tvcmRlcltzdGF0ZS5oYXZlKytdXSA9IChob2xkICYgMHgwNyk7Ly9CSVRTKDMpO1xuICAgICAgICAgIC8vLS0tIERST1BCSVRTKDMpIC0tLS8vXG4gICAgICAgICAgaG9sZCA+Pj49IDM7XG4gICAgICAgICAgYml0cyAtPSAzO1xuICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoc3RhdGUuaGF2ZSA8IDE5KSB7XG4gICAgICAgICAgc3RhdGUubGVuc1tvcmRlcltzdGF0ZS5oYXZlKytdXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2UgaGF2ZSBzZXBhcmF0ZSB0YWJsZXMgJiBubyBwb2ludGVycy4gMiBjb21tZW50ZWQgbGluZXMgYmVsb3cgbm90IG5lZWRlZC5cbiAgICAgICAgLy9zdGF0ZS5uZXh0ID0gc3RhdGUuY29kZXM7XG4gICAgICAgIC8vc3RhdGUubGVuY29kZSA9IHN0YXRlLm5leHQ7XG4gICAgICAgIC8vIFN3aXRjaCB0byB1c2UgZHluYW1pYyB0YWJsZVxuICAgICAgICBzdGF0ZS5sZW5jb2RlID0gc3RhdGUubGVuZHluO1xuICAgICAgICBzdGF0ZS5sZW5iaXRzID0gNztcblxuICAgICAgICBvcHRzID0geyBiaXRzOiBzdGF0ZS5sZW5iaXRzIH07XG4gICAgICAgIHJldCA9IGluZmxhdGVfdGFibGUoQ09ERVMsIHN0YXRlLmxlbnMsIDAsIDE5LCBzdGF0ZS5sZW5jb2RlLCAwLCBzdGF0ZS53b3JrLCBvcHRzKTtcbiAgICAgICAgc3RhdGUubGVuYml0cyA9IG9wdHMuYml0cztcblxuICAgICAgICBpZiAocmV0KSB7XG4gICAgICAgICAgc3RybS5tc2cgPSAnaW52YWxpZCBjb2RlIGxlbmd0aHMgc2V0JztcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vVHJhY2V2KChzdGRlcnIsIFwiaW5mbGF0ZTogICAgICAgY29kZSBsZW5ndGhzIG9rXFxuXCIpKTtcbiAgICAgICAgc3RhdGUuaGF2ZSA9IDA7XG4gICAgICAgIHN0YXRlLm1vZGUgPSBDT0RFTEVOUztcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBDT0RFTEVOUzpcbiAgICAgICAgd2hpbGUgKHN0YXRlLmhhdmUgPCBzdGF0ZS5ubGVuICsgc3RhdGUubmRpc3QpIHtcbiAgICAgICAgICBmb3IgKDs7KSB7XG4gICAgICAgICAgICBoZXJlID0gc3RhdGUubGVuY29kZVtob2xkICYgKCgxIDw8IHN0YXRlLmxlbmJpdHMpIC0gMSldOy8qQklUUyhzdGF0ZS5sZW5iaXRzKSovXG4gICAgICAgICAgICBoZXJlX2JpdHMgPSBoZXJlID4+PiAyNDtcbiAgICAgICAgICAgIGhlcmVfb3AgPSAoaGVyZSA+Pj4gMTYpICYgMHhmZjtcbiAgICAgICAgICAgIGhlcmVfdmFsID0gaGVyZSAmIDB4ZmZmZjtcblxuICAgICAgICAgICAgaWYgKChoZXJlX2JpdHMpIDw9IGJpdHMpIHsgYnJlYWs7IH1cbiAgICAgICAgICAgIC8vLS0tIFBVTExCWVRFKCkgLS0tLy9cbiAgICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoZXJlX3ZhbCA8IDE2KSB7XG4gICAgICAgICAgICAvLy0tLSBEUk9QQklUUyhoZXJlLmJpdHMpIC0tLS8vXG4gICAgICAgICAgICBob2xkID4+Pj0gaGVyZV9iaXRzO1xuICAgICAgICAgICAgYml0cyAtPSBoZXJlX2JpdHM7XG4gICAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgICBzdGF0ZS5sZW5zW3N0YXRlLmhhdmUrK10gPSBoZXJlX3ZhbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoaGVyZV92YWwgPT09IDE2KSB7XG4gICAgICAgICAgICAgIC8vPT09IE5FRURCSVRTKGhlcmUuYml0cyArIDIpO1xuICAgICAgICAgICAgICBuID0gaGVyZV9iaXRzICsgMjtcbiAgICAgICAgICAgICAgd2hpbGUgKGJpdHMgPCBuKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLz09PS8vXG4gICAgICAgICAgICAgIC8vLS0tIERST1BCSVRTKGhlcmUuYml0cykgLS0tLy9cbiAgICAgICAgICAgICAgaG9sZCA+Pj49IGhlcmVfYml0cztcbiAgICAgICAgICAgICAgYml0cyAtPSBoZXJlX2JpdHM7XG4gICAgICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgICAgICAgaWYgKHN0YXRlLmhhdmUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBzdHJtLm1zZyA9ICdpbnZhbGlkIGJpdCBsZW5ndGggcmVwZWF0JztcbiAgICAgICAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGxlbiA9IHN0YXRlLmxlbnNbc3RhdGUuaGF2ZSAtIDFdO1xuICAgICAgICAgICAgICBjb3B5ID0gMyArIChob2xkICYgMHgwMyk7Ly9CSVRTKDIpO1xuICAgICAgICAgICAgICAvLy0tLSBEUk9QQklUUygyKSAtLS0vL1xuICAgICAgICAgICAgICBob2xkID4+Pj0gMjtcbiAgICAgICAgICAgICAgYml0cyAtPSAyO1xuICAgICAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChoZXJlX3ZhbCA9PT0gMTcpIHtcbiAgICAgICAgICAgICAgLy89PT0gTkVFREJJVFMoaGVyZS5iaXRzICsgMyk7XG4gICAgICAgICAgICAgIG4gPSBoZXJlX2JpdHMgKyAzO1xuICAgICAgICAgICAgICB3aGlsZSAoYml0cyA8IG4pIHtcbiAgICAgICAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgICAgICAgLy8tLS0gRFJPUEJJVFMoaGVyZS5iaXRzKSAtLS0vL1xuICAgICAgICAgICAgICBob2xkID4+Pj0gaGVyZV9iaXRzO1xuICAgICAgICAgICAgICBiaXRzIC09IGhlcmVfYml0cztcbiAgICAgICAgICAgICAgLy8tLS0vL1xuICAgICAgICAgICAgICBsZW4gPSAwO1xuICAgICAgICAgICAgICBjb3B5ID0gMyArIChob2xkICYgMHgwNyk7Ly9CSVRTKDMpO1xuICAgICAgICAgICAgICAvLy0tLSBEUk9QQklUUygzKSAtLS0vL1xuICAgICAgICAgICAgICBob2xkID4+Pj0gMztcbiAgICAgICAgICAgICAgYml0cyAtPSAzO1xuICAgICAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgLy89PT0gTkVFREJJVFMoaGVyZS5iaXRzICsgNyk7XG4gICAgICAgICAgICAgIG4gPSBoZXJlX2JpdHMgKyA3O1xuICAgICAgICAgICAgICB3aGlsZSAoYml0cyA8IG4pIHtcbiAgICAgICAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgICAgICAgLy8tLS0gRFJPUEJJVFMoaGVyZS5iaXRzKSAtLS0vL1xuICAgICAgICAgICAgICBob2xkID4+Pj0gaGVyZV9iaXRzO1xuICAgICAgICAgICAgICBiaXRzIC09IGhlcmVfYml0cztcbiAgICAgICAgICAgICAgLy8tLS0vL1xuICAgICAgICAgICAgICBsZW4gPSAwO1xuICAgICAgICAgICAgICBjb3B5ID0gMTEgKyAoaG9sZCAmIDB4N2YpOy8vQklUUyg3KTtcbiAgICAgICAgICAgICAgLy8tLS0gRFJPUEJJVFMoNykgLS0tLy9cbiAgICAgICAgICAgICAgaG9sZCA+Pj49IDc7XG4gICAgICAgICAgICAgIGJpdHMgLT0gNztcbiAgICAgICAgICAgICAgLy8tLS0vL1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXRlLmhhdmUgKyBjb3B5ID4gc3RhdGUubmxlbiArIHN0YXRlLm5kaXN0KSB7XG4gICAgICAgICAgICAgIHN0cm0ubXNnID0gJ2ludmFsaWQgYml0IGxlbmd0aCByZXBlYXQnO1xuICAgICAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChjb3B5LS0pIHtcbiAgICAgICAgICAgICAgc3RhdGUubGVuc1tzdGF0ZS5oYXZlKytdID0gbGVuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGhhbmRsZSBlcnJvciBicmVha3MgaW4gd2hpbGUgKi9cbiAgICAgICAgaWYgKHN0YXRlLm1vZGUgPT09IEJBRCkgeyBicmVhazsgfVxuXG4gICAgICAgIC8qIGNoZWNrIGZvciBlbmQtb2YtYmxvY2sgY29kZSAoYmV0dGVyIGhhdmUgb25lKSAqL1xuICAgICAgICBpZiAoc3RhdGUubGVuc1syNTZdID09PSAwKSB7XG4gICAgICAgICAgc3RybS5tc2cgPSAnaW52YWxpZCBjb2RlIC0tIG1pc3NpbmcgZW5kLW9mLWJsb2NrJztcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogYnVpbGQgY29kZSB0YWJsZXMgLS0gbm90ZTogZG8gbm90IGNoYW5nZSB0aGUgbGVuYml0cyBvciBkaXN0Yml0c1xuICAgICAgICAgICB2YWx1ZXMgaGVyZSAoOSBhbmQgNikgd2l0aG91dCByZWFkaW5nIHRoZSBjb21tZW50cyBpbiBpbmZ0cmVlcy5oXG4gICAgICAgICAgIGNvbmNlcm5pbmcgdGhlIEVOT1VHSCBjb25zdGFudHMsIHdoaWNoIGRlcGVuZCBvbiB0aG9zZSB2YWx1ZXMgKi9cbiAgICAgICAgc3RhdGUubGVuYml0cyA9IDk7XG5cbiAgICAgICAgb3B0cyA9IHsgYml0czogc3RhdGUubGVuYml0cyB9O1xuICAgICAgICByZXQgPSBpbmZsYXRlX3RhYmxlKExFTlMsIHN0YXRlLmxlbnMsIDAsIHN0YXRlLm5sZW4sIHN0YXRlLmxlbmNvZGUsIDAsIHN0YXRlLndvcmssIG9wdHMpO1xuICAgICAgICAvLyBXZSBoYXZlIHNlcGFyYXRlIHRhYmxlcyAmIG5vIHBvaW50ZXJzLiAyIGNvbW1lbnRlZCBsaW5lcyBiZWxvdyBub3QgbmVlZGVkLlxuICAgICAgICAvLyBzdGF0ZS5uZXh0X2luZGV4ID0gb3B0cy50YWJsZV9pbmRleDtcbiAgICAgICAgc3RhdGUubGVuYml0cyA9IG9wdHMuYml0cztcbiAgICAgICAgLy8gc3RhdGUubGVuY29kZSA9IHN0YXRlLm5leHQ7XG5cbiAgICAgICAgaWYgKHJldCkge1xuICAgICAgICAgIHN0cm0ubXNnID0gJ2ludmFsaWQgbGl0ZXJhbC9sZW5ndGhzIHNldCc7XG4gICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlLmRpc3RiaXRzID0gNjtcbiAgICAgICAgLy9zdGF0ZS5kaXN0Y29kZS5jb3B5KHN0YXRlLmNvZGVzKTtcbiAgICAgICAgLy8gU3dpdGNoIHRvIHVzZSBkeW5hbWljIHRhYmxlXG4gICAgICAgIHN0YXRlLmRpc3Rjb2RlID0gc3RhdGUuZGlzdGR5bjtcbiAgICAgICAgb3B0cyA9IHsgYml0czogc3RhdGUuZGlzdGJpdHMgfTtcbiAgICAgICAgcmV0ID0gaW5mbGF0ZV90YWJsZShESVNUUywgc3RhdGUubGVucywgc3RhdGUubmxlbiwgc3RhdGUubmRpc3QsIHN0YXRlLmRpc3Rjb2RlLCAwLCBzdGF0ZS53b3JrLCBvcHRzKTtcbiAgICAgICAgLy8gV2UgaGF2ZSBzZXBhcmF0ZSB0YWJsZXMgJiBubyBwb2ludGVycy4gMiBjb21tZW50ZWQgbGluZXMgYmVsb3cgbm90IG5lZWRlZC5cbiAgICAgICAgLy8gc3RhdGUubmV4dF9pbmRleCA9IG9wdHMudGFibGVfaW5kZXg7XG4gICAgICAgIHN0YXRlLmRpc3RiaXRzID0gb3B0cy5iaXRzO1xuICAgICAgICAvLyBzdGF0ZS5kaXN0Y29kZSA9IHN0YXRlLm5leHQ7XG5cbiAgICAgICAgaWYgKHJldCkge1xuICAgICAgICAgIHN0cm0ubXNnID0gJ2ludmFsaWQgZGlzdGFuY2VzIHNldCc7XG4gICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvL1RyYWNldigoc3RkZXJyLCAnaW5mbGF0ZTogICAgICAgY29kZXMgb2tcXG4nKSk7XG4gICAgICAgIHN0YXRlLm1vZGUgPSBMRU5fO1xuICAgICAgICBpZiAoZmx1c2ggPT09IFpfVFJFRVMpIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgTEVOXzpcbiAgICAgICAgc3RhdGUubW9kZSA9IExFTjtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBMRU46XG4gICAgICAgIGlmIChoYXZlID49IDYgJiYgbGVmdCA+PSAyNTgpIHtcbiAgICAgICAgICAvLy0tLSBSRVNUT1JFKCkgLS0tXG4gICAgICAgICAgc3RybS5uZXh0X291dCA9IHB1dDtcbiAgICAgICAgICBzdHJtLmF2YWlsX291dCA9IGxlZnQ7XG4gICAgICAgICAgc3RybS5uZXh0X2luID0gbmV4dDtcbiAgICAgICAgICBzdHJtLmF2YWlsX2luID0gaGF2ZTtcbiAgICAgICAgICBzdGF0ZS5ob2xkID0gaG9sZDtcbiAgICAgICAgICBzdGF0ZS5iaXRzID0gYml0cztcbiAgICAgICAgICAvLy0tLVxuICAgICAgICAgIGluZmxhdGVfZmFzdChzdHJtLCBfb3V0KTtcbiAgICAgICAgICAvLy0tLSBMT0FEKCkgLS0tXG4gICAgICAgICAgcHV0ID0gc3RybS5uZXh0X291dDtcbiAgICAgICAgICBvdXRwdXQgPSBzdHJtLm91dHB1dDtcbiAgICAgICAgICBsZWZ0ID0gc3RybS5hdmFpbF9vdXQ7XG4gICAgICAgICAgbmV4dCA9IHN0cm0ubmV4dF9pbjtcbiAgICAgICAgICBpbnB1dCA9IHN0cm0uaW5wdXQ7XG4gICAgICAgICAgaGF2ZSA9IHN0cm0uYXZhaWxfaW47XG4gICAgICAgICAgaG9sZCA9IHN0YXRlLmhvbGQ7XG4gICAgICAgICAgYml0cyA9IHN0YXRlLmJpdHM7XG4gICAgICAgICAgLy8tLS1cblxuICAgICAgICAgIGlmIChzdGF0ZS5tb2RlID09PSBUWVBFKSB7XG4gICAgICAgICAgICBzdGF0ZS5iYWNrID0gLTE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmJhY2sgPSAwO1xuICAgICAgICBmb3IgKDs7KSB7XG4gICAgICAgICAgaGVyZSA9IHN0YXRlLmxlbmNvZGVbaG9sZCAmICgoMSA8PCBzdGF0ZS5sZW5iaXRzKSAtIDEpXTsgIC8qQklUUyhzdGF0ZS5sZW5iaXRzKSovXG4gICAgICAgICAgaGVyZV9iaXRzID0gaGVyZSA+Pj4gMjQ7XG4gICAgICAgICAgaGVyZV9vcCA9IChoZXJlID4+PiAxNikgJiAweGZmO1xuICAgICAgICAgIGhlcmVfdmFsID0gaGVyZSAmIDB4ZmZmZjtcblxuICAgICAgICAgIGlmIChoZXJlX2JpdHMgPD0gYml0cykgeyBicmVhazsgfVxuICAgICAgICAgIC8vLS0tIFBVTExCWVRFKCkgLS0tLy9cbiAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgfVxuICAgICAgICBpZiAoaGVyZV9vcCAmJiAoaGVyZV9vcCAmIDB4ZjApID09PSAwKSB7XG4gICAgICAgICAgbGFzdF9iaXRzID0gaGVyZV9iaXRzO1xuICAgICAgICAgIGxhc3Rfb3AgPSBoZXJlX29wO1xuICAgICAgICAgIGxhc3RfdmFsID0gaGVyZV92YWw7XG4gICAgICAgICAgZm9yICg7Oykge1xuICAgICAgICAgICAgaGVyZSA9IHN0YXRlLmxlbmNvZGVbbGFzdF92YWwgK1xuICAgICAgICAgICAgICAgICAgICAoKGhvbGQgJiAoKDEgPDwgKGxhc3RfYml0cyArIGxhc3Rfb3ApKSAtIDEpKS8qQklUUyhsYXN0LmJpdHMgKyBsYXN0Lm9wKSovID4+IGxhc3RfYml0cyldO1xuICAgICAgICAgICAgaGVyZV9iaXRzID0gaGVyZSA+Pj4gMjQ7XG4gICAgICAgICAgICBoZXJlX29wID0gKGhlcmUgPj4+IDE2KSAmIDB4ZmY7XG4gICAgICAgICAgICBoZXJlX3ZhbCA9IGhlcmUgJiAweGZmZmY7XG5cbiAgICAgICAgICAgIGlmICgobGFzdF9iaXRzICsgaGVyZV9iaXRzKSA8PSBiaXRzKSB7IGJyZWFrOyB9XG4gICAgICAgICAgICAvLy0tLSBQVUxMQllURSgpIC0tLS8vXG4gICAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICAgIGhhdmUtLTtcbiAgICAgICAgICAgIGhvbGQgKz0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgICAgLy8tLS0vL1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLy0tLSBEUk9QQklUUyhsYXN0LmJpdHMpIC0tLS8vXG4gICAgICAgICAgaG9sZCA+Pj49IGxhc3RfYml0cztcbiAgICAgICAgICBiaXRzIC09IGxhc3RfYml0cztcbiAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgc3RhdGUuYmFjayArPSBsYXN0X2JpdHM7XG4gICAgICAgIH1cbiAgICAgICAgLy8tLS0gRFJPUEJJVFMoaGVyZS5iaXRzKSAtLS0vL1xuICAgICAgICBob2xkID4+Pj0gaGVyZV9iaXRzO1xuICAgICAgICBiaXRzIC09IGhlcmVfYml0cztcbiAgICAgICAgLy8tLS0vL1xuICAgICAgICBzdGF0ZS5iYWNrICs9IGhlcmVfYml0cztcbiAgICAgICAgc3RhdGUubGVuZ3RoID0gaGVyZV92YWw7XG4gICAgICAgIGlmIChoZXJlX29wID09PSAwKSB7XG4gICAgICAgICAgLy9UcmFjZXZ2KChzdGRlcnIsIGhlcmUudmFsID49IDB4MjAgJiYgaGVyZS52YWwgPCAweDdmID9cbiAgICAgICAgICAvLyAgICAgICAgXCJpbmZsYXRlOiAgICAgICAgIGxpdGVyYWwgJyVjJ1xcblwiIDpcbiAgICAgICAgICAvLyAgICAgICAgXCJpbmZsYXRlOiAgICAgICAgIGxpdGVyYWwgMHglMDJ4XFxuXCIsIGhlcmUudmFsKSk7XG4gICAgICAgICAgc3RhdGUubW9kZSA9IExJVDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGVyZV9vcCAmIDMyKSB7XG4gICAgICAgICAgLy9UcmFjZXZ2KChzdGRlcnIsIFwiaW5mbGF0ZTogICAgICAgICBlbmQgb2YgYmxvY2tcXG5cIikpO1xuICAgICAgICAgIHN0YXRlLmJhY2sgPSAtMTtcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gVFlQRTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGVyZV9vcCAmIDY0KSB7XG4gICAgICAgICAgc3RybS5tc2cgPSAnaW52YWxpZCBsaXRlcmFsL2xlbmd0aCBjb2RlJztcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmV4dHJhID0gaGVyZV9vcCAmIDE1O1xuICAgICAgICBzdGF0ZS5tb2RlID0gTEVORVhUO1xuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlIExFTkVYVDpcbiAgICAgICAgaWYgKHN0YXRlLmV4dHJhKSB7XG4gICAgICAgICAgLy89PT0gTkVFREJJVFMoc3RhdGUuZXh0cmEpO1xuICAgICAgICAgIG4gPSBzdGF0ZS5leHRyYTtcbiAgICAgICAgICB3aGlsZSAoYml0cyA8IG4pIHtcbiAgICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgICBzdGF0ZS5sZW5ndGggKz0gaG9sZCAmICgoMSA8PCBzdGF0ZS5leHRyYSkgLSAxKS8qQklUUyhzdGF0ZS5leHRyYSkqLztcbiAgICAgICAgICAvLy0tLSBEUk9QQklUUyhzdGF0ZS5leHRyYSkgLS0tLy9cbiAgICAgICAgICBob2xkID4+Pj0gc3RhdGUuZXh0cmE7XG4gICAgICAgICAgYml0cyAtPSBzdGF0ZS5leHRyYTtcbiAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgc3RhdGUuYmFjayArPSBzdGF0ZS5leHRyYTtcbiAgICAgICAgfVxuICAgICAgICAvL1RyYWNldnYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgICAgICAgIGxlbmd0aCAldVxcblwiLCBzdGF0ZS5sZW5ndGgpKTtcbiAgICAgICAgc3RhdGUud2FzID0gc3RhdGUubGVuZ3RoO1xuICAgICAgICBzdGF0ZS5tb2RlID0gRElTVDtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBESVNUOlxuICAgICAgICBmb3IgKDs7KSB7XG4gICAgICAgICAgaGVyZSA9IHN0YXRlLmRpc3Rjb2RlW2hvbGQgJiAoKDEgPDwgc3RhdGUuZGlzdGJpdHMpIC0gMSldOy8qQklUUyhzdGF0ZS5kaXN0Yml0cykqL1xuICAgICAgICAgIGhlcmVfYml0cyA9IGhlcmUgPj4+IDI0O1xuICAgICAgICAgIGhlcmVfb3AgPSAoaGVyZSA+Pj4gMTYpICYgMHhmZjtcbiAgICAgICAgICBoZXJlX3ZhbCA9IGhlcmUgJiAweGZmZmY7XG5cbiAgICAgICAgICBpZiAoKGhlcmVfYml0cykgPD0gYml0cykgeyBicmVhazsgfVxuICAgICAgICAgIC8vLS0tIFBVTExCWVRFKCkgLS0tLy9cbiAgICAgICAgICBpZiAoaGF2ZSA9PT0gMCkgeyBicmVhayBpbmZfbGVhdmU7IH1cbiAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgfVxuICAgICAgICBpZiAoKGhlcmVfb3AgJiAweGYwKSA9PT0gMCkge1xuICAgICAgICAgIGxhc3RfYml0cyA9IGhlcmVfYml0cztcbiAgICAgICAgICBsYXN0X29wID0gaGVyZV9vcDtcbiAgICAgICAgICBsYXN0X3ZhbCA9IGhlcmVfdmFsO1xuICAgICAgICAgIGZvciAoOzspIHtcbiAgICAgICAgICAgIGhlcmUgPSBzdGF0ZS5kaXN0Y29kZVtsYXN0X3ZhbCArXG4gICAgICAgICAgICAgICAgICAgICgoaG9sZCAmICgoMSA8PCAobGFzdF9iaXRzICsgbGFzdF9vcCkpIC0gMSkpLypCSVRTKGxhc3QuYml0cyArIGxhc3Qub3ApKi8gPj4gbGFzdF9iaXRzKV07XG4gICAgICAgICAgICBoZXJlX2JpdHMgPSBoZXJlID4+PiAyNDtcbiAgICAgICAgICAgIGhlcmVfb3AgPSAoaGVyZSA+Pj4gMTYpICYgMHhmZjtcbiAgICAgICAgICAgIGhlcmVfdmFsID0gaGVyZSAmIDB4ZmZmZjtcblxuICAgICAgICAgICAgaWYgKChsYXN0X2JpdHMgKyBoZXJlX2JpdHMpIDw9IGJpdHMpIHsgYnJlYWs7IH1cbiAgICAgICAgICAgIC8vLS0tIFBVTExCWVRFKCkgLS0tLy9cbiAgICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgICAvLy0tLS8vXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vLS0tIERST1BCSVRTKGxhc3QuYml0cykgLS0tLy9cbiAgICAgICAgICBob2xkID4+Pj0gbGFzdF9iaXRzO1xuICAgICAgICAgIGJpdHMgLT0gbGFzdF9iaXRzO1xuICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgICBzdGF0ZS5iYWNrICs9IGxhc3RfYml0cztcbiAgICAgICAgfVxuICAgICAgICAvLy0tLSBEUk9QQklUUyhoZXJlLmJpdHMpIC0tLS8vXG4gICAgICAgIGhvbGQgPj4+PSBoZXJlX2JpdHM7XG4gICAgICAgIGJpdHMgLT0gaGVyZV9iaXRzO1xuICAgICAgICAvLy0tLS8vXG4gICAgICAgIHN0YXRlLmJhY2sgKz0gaGVyZV9iaXRzO1xuICAgICAgICBpZiAoaGVyZV9vcCAmIDY0KSB7XG4gICAgICAgICAgc3RybS5tc2cgPSAnaW52YWxpZCBkaXN0YW5jZSBjb2RlJztcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLm9mZnNldCA9IGhlcmVfdmFsO1xuICAgICAgICBzdGF0ZS5leHRyYSA9IChoZXJlX29wKSAmIDE1O1xuICAgICAgICBzdGF0ZS5tb2RlID0gRElTVEVYVDtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBESVNURVhUOlxuICAgICAgICBpZiAoc3RhdGUuZXh0cmEpIHtcbiAgICAgICAgICAvLz09PSBORUVEQklUUyhzdGF0ZS5leHRyYSk7XG4gICAgICAgICAgbiA9IHN0YXRlLmV4dHJhO1xuICAgICAgICAgIHdoaWxlIChiaXRzIDwgbikge1xuICAgICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgICBob2xkICs9IGlucHV0W25leHQrK10gPDwgYml0cztcbiAgICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy89PT0vL1xuICAgICAgICAgIHN0YXRlLm9mZnNldCArPSBob2xkICYgKCgxIDw8IHN0YXRlLmV4dHJhKSAtIDEpLypCSVRTKHN0YXRlLmV4dHJhKSovO1xuICAgICAgICAgIC8vLS0tIERST1BCSVRTKHN0YXRlLmV4dHJhKSAtLS0vL1xuICAgICAgICAgIGhvbGQgPj4+PSBzdGF0ZS5leHRyYTtcbiAgICAgICAgICBiaXRzIC09IHN0YXRlLmV4dHJhO1xuICAgICAgICAgIC8vLS0tLy9cbiAgICAgICAgICBzdGF0ZS5iYWNrICs9IHN0YXRlLmV4dHJhO1xuICAgICAgICB9XG4vLyNpZmRlZiBJTkZMQVRFX1NUUklDVFxuICAgICAgICBpZiAoc3RhdGUub2Zmc2V0ID4gc3RhdGUuZG1heCkge1xuICAgICAgICAgIHN0cm0ubXNnID0gJ2ludmFsaWQgZGlzdGFuY2UgdG9vIGZhciBiYWNrJztcbiAgICAgICAgICBzdGF0ZS5tb2RlID0gQkFEO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4vLyNlbmRpZlxuICAgICAgICAvL1RyYWNldnYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgICAgICAgIGRpc3RhbmNlICV1XFxuXCIsIHN0YXRlLm9mZnNldCkpO1xuICAgICAgICBzdGF0ZS5tb2RlID0gTUFUQ0g7XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgTUFUQ0g6XG4gICAgICAgIGlmIChsZWZ0ID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICBjb3B5ID0gX291dCAtIGxlZnQ7XG4gICAgICAgIGlmIChzdGF0ZS5vZmZzZXQgPiBjb3B5KSB7ICAgICAgICAgLyogY29weSBmcm9tIHdpbmRvdyAqL1xuICAgICAgICAgIGNvcHkgPSBzdGF0ZS5vZmZzZXQgLSBjb3B5O1xuICAgICAgICAgIGlmIChjb3B5ID4gc3RhdGUud2hhdmUpIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5zYW5lKSB7XG4gICAgICAgICAgICAgIHN0cm0ubXNnID0gJ2ludmFsaWQgZGlzdGFuY2UgdG9vIGZhciBiYWNrJztcbiAgICAgICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4vLyAoISkgVGhpcyBibG9jayBpcyBkaXNhYmxlZCBpbiB6bGliIGRlZmF1bHRzLFxuLy8gZG9uJ3QgZW5hYmxlIGl0IGZvciBiaW5hcnkgY29tcGF0aWJpbGl0eVxuLy8jaWZkZWYgSU5GTEFURV9BTExPV19JTlZBTElEX0RJU1RBTkNFX1RPT0ZBUl9BUlJSXG4vLyAgICAgICAgICBUcmFjZSgoc3RkZXJyLCBcImluZmxhdGUuYyB0b28gZmFyXFxuXCIpKTtcbi8vICAgICAgICAgIGNvcHkgLT0gc3RhdGUud2hhdmU7XG4vLyAgICAgICAgICBpZiAoY29weSA+IHN0YXRlLmxlbmd0aCkgeyBjb3B5ID0gc3RhdGUubGVuZ3RoOyB9XG4vLyAgICAgICAgICBpZiAoY29weSA+IGxlZnQpIHsgY29weSA9IGxlZnQ7IH1cbi8vICAgICAgICAgIGxlZnQgLT0gY29weTtcbi8vICAgICAgICAgIHN0YXRlLmxlbmd0aCAtPSBjb3B5O1xuLy8gICAgICAgICAgZG8ge1xuLy8gICAgICAgICAgICBvdXRwdXRbcHV0KytdID0gMDtcbi8vICAgICAgICAgIH0gd2hpbGUgKC0tY29weSk7XG4vLyAgICAgICAgICBpZiAoc3RhdGUubGVuZ3RoID09PSAwKSB7IHN0YXRlLm1vZGUgPSBMRU47IH1cbi8vICAgICAgICAgIGJyZWFrO1xuLy8jZW5kaWZcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNvcHkgPiBzdGF0ZS53bmV4dCkge1xuICAgICAgICAgICAgY29weSAtPSBzdGF0ZS53bmV4dDtcbiAgICAgICAgICAgIGZyb20gPSBzdGF0ZS53c2l6ZSAtIGNvcHk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZnJvbSA9IHN0YXRlLnduZXh0IC0gY29weTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNvcHkgPiBzdGF0ZS5sZW5ndGgpIHsgY29weSA9IHN0YXRlLmxlbmd0aDsgfVxuICAgICAgICAgIGZyb21fc291cmNlID0gc3RhdGUud2luZG93O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIGNvcHkgZnJvbSBvdXRwdXQgKi9cbiAgICAgICAgICBmcm9tX3NvdXJjZSA9IG91dHB1dDtcbiAgICAgICAgICBmcm9tID0gcHV0IC0gc3RhdGUub2Zmc2V0O1xuICAgICAgICAgIGNvcHkgPSBzdGF0ZS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvcHkgPiBsZWZ0KSB7IGNvcHkgPSBsZWZ0OyB9XG4gICAgICAgIGxlZnQgLT0gY29weTtcbiAgICAgICAgc3RhdGUubGVuZ3RoIC09IGNvcHk7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICBvdXRwdXRbcHV0KytdID0gZnJvbV9zb3VyY2VbZnJvbSsrXTtcbiAgICAgICAgfSB3aGlsZSAoLS1jb3B5KTtcbiAgICAgICAgaWYgKHN0YXRlLmxlbmd0aCA9PT0gMCkgeyBzdGF0ZS5tb2RlID0gTEVOOyB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBMSVQ6XG4gICAgICAgIGlmIChsZWZ0ID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICBvdXRwdXRbcHV0KytdID0gc3RhdGUubGVuZ3RoO1xuICAgICAgICBsZWZ0LS07XG4gICAgICAgIHN0YXRlLm1vZGUgPSBMRU47XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDSEVDSzpcbiAgICAgICAgaWYgKHN0YXRlLndyYXApIHtcbiAgICAgICAgICAvLz09PSBORUVEQklUUygzMik7XG4gICAgICAgICAgd2hpbGUgKGJpdHMgPCAzMikge1xuICAgICAgICAgICAgaWYgKGhhdmUgPT09IDApIHsgYnJlYWsgaW5mX2xlYXZlOyB9XG4gICAgICAgICAgICBoYXZlLS07XG4gICAgICAgICAgICAvLyBVc2UgJ3wnIGluc3RlYWQgb2YgJysnIHRvIG1ha2Ugc3VyZSB0aGF0IHJlc3VsdCBpcyBzaWduZWRcbiAgICAgICAgICAgIGhvbGQgfD0gaW5wdXRbbmV4dCsrXSA8PCBiaXRzO1xuICAgICAgICAgICAgYml0cyArPSA4O1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLz09PS8vXG4gICAgICAgICAgX291dCAtPSBsZWZ0O1xuICAgICAgICAgIHN0cm0udG90YWxfb3V0ICs9IF9vdXQ7XG4gICAgICAgICAgc3RhdGUudG90YWwgKz0gX291dDtcbiAgICAgICAgICBpZiAoX291dCkge1xuICAgICAgICAgICAgc3RybS5hZGxlciA9IHN0YXRlLmNoZWNrID1cbiAgICAgICAgICAgICAgICAvKlVQREFURShzdGF0ZS5jaGVjaywgcHV0IC0gX291dCwgX291dCk7Ki9cbiAgICAgICAgICAgICAgICAoc3RhdGUuZmxhZ3MgPyBjcmMzMihzdGF0ZS5jaGVjaywgb3V0cHV0LCBfb3V0LCBwdXQgLSBfb3V0KSA6IGFkbGVyMzIoc3RhdGUuY2hlY2ssIG91dHB1dCwgX291dCwgcHV0IC0gX291dCkpO1xuXG4gICAgICAgICAgfVxuICAgICAgICAgIF9vdXQgPSBsZWZ0O1xuICAgICAgICAgIC8vIE5COiBjcmMzMiBzdG9yZWQgYXMgc2lnbmVkIDMyLWJpdCBpbnQsIHpzd2FwMzIgcmV0dXJucyBzaWduZWQgdG9vXG4gICAgICAgICAgaWYgKChzdGF0ZS5mbGFncyA/IGhvbGQgOiB6c3dhcDMyKGhvbGQpKSAhPT0gc3RhdGUuY2hlY2spIHtcbiAgICAgICAgICAgIHN0cm0ubXNnID0gJ2luY29ycmVjdCBkYXRhIGNoZWNrJztcbiAgICAgICAgICAgIHN0YXRlLm1vZGUgPSBCQUQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgLy89PT0gSU5JVEJJVFMoKTtcbiAgICAgICAgICBob2xkID0gMDtcbiAgICAgICAgICBiaXRzID0gMDtcbiAgICAgICAgICAvLz09PS8vXG4gICAgICAgICAgLy9UcmFjZXYoKHN0ZGVyciwgXCJpbmZsYXRlOiAgIGNoZWNrIG1hdGNoZXMgdHJhaWxlclxcblwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUubW9kZSA9IExFTkdUSDtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSBMRU5HVEg6XG4gICAgICAgIGlmIChzdGF0ZS53cmFwICYmIHN0YXRlLmZsYWdzKSB7XG4gICAgICAgICAgLy89PT0gTkVFREJJVFMoMzIpO1xuICAgICAgICAgIHdoaWxlIChiaXRzIDwgMzIpIHtcbiAgICAgICAgICAgIGlmIChoYXZlID09PSAwKSB7IGJyZWFrIGluZl9sZWF2ZTsgfVxuICAgICAgICAgICAgaGF2ZS0tO1xuICAgICAgICAgICAgaG9sZCArPSBpbnB1dFtuZXh0KytdIDw8IGJpdHM7XG4gICAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgICBpZiAoaG9sZCAhPT0gKHN0YXRlLnRvdGFsICYgMHhmZmZmZmZmZikpIHtcbiAgICAgICAgICAgIHN0cm0ubXNnID0gJ2luY29ycmVjdCBsZW5ndGggY2hlY2snO1xuICAgICAgICAgICAgc3RhdGUubW9kZSA9IEJBRDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLz09PSBJTklUQklUUygpO1xuICAgICAgICAgIGhvbGQgPSAwO1xuICAgICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAgIC8vPT09Ly9cbiAgICAgICAgICAvL1RyYWNldigoc3RkZXJyLCBcImluZmxhdGU6ICAgbGVuZ3RoIG1hdGNoZXMgdHJhaWxlclxcblwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUubW9kZSA9IERPTkU7XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgRE9ORTpcbiAgICAgICAgcmV0ID0gWl9TVFJFQU1fRU5EO1xuICAgICAgICBicmVhayBpbmZfbGVhdmU7XG4gICAgICBjYXNlIEJBRDpcbiAgICAgICAgcmV0ID0gWl9EQVRBX0VSUk9SO1xuICAgICAgICBicmVhayBpbmZfbGVhdmU7XG4gICAgICBjYXNlIE1FTTpcbiAgICAgICAgcmV0dXJuIFpfTUVNX0VSUk9SO1xuICAgICAgY2FzZSBTWU5DOlxuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gWl9TVFJFQU1fRVJST1I7XG4gICAgfVxuICB9XG5cbiAgLy8gaW5mX2xlYXZlIDwtIGhlcmUgaXMgcmVhbCBwbGFjZSBmb3IgXCJnb3RvIGluZl9sZWF2ZVwiLCBlbXVsYXRlZCB2aWEgXCJicmVhayBpbmZfbGVhdmVcIlxuXG4gIC8qXG4gICAgIFJldHVybiBmcm9tIGluZmxhdGUoKSwgdXBkYXRpbmcgdGhlIHRvdGFsIGNvdW50cyBhbmQgdGhlIGNoZWNrIHZhbHVlLlxuICAgICBJZiB0aGVyZSB3YXMgbm8gcHJvZ3Jlc3MgZHVyaW5nIHRoZSBpbmZsYXRlKCkgY2FsbCwgcmV0dXJuIGEgYnVmZmVyXG4gICAgIGVycm9yLiAgQ2FsbCB1cGRhdGV3aW5kb3coKSB0byBjcmVhdGUgYW5kL29yIHVwZGF0ZSB0aGUgd2luZG93IHN0YXRlLlxuICAgICBOb3RlOiBhIG1lbW9yeSBlcnJvciBmcm9tIGluZmxhdGUoKSBpcyBub24tcmVjb3ZlcmFibGUuXG4gICAqL1xuXG4gIC8vLS0tIFJFU1RPUkUoKSAtLS1cbiAgc3RybS5uZXh0X291dCA9IHB1dDtcbiAgc3RybS5hdmFpbF9vdXQgPSBsZWZ0O1xuICBzdHJtLm5leHRfaW4gPSBuZXh0O1xuICBzdHJtLmF2YWlsX2luID0gaGF2ZTtcbiAgc3RhdGUuaG9sZCA9IGhvbGQ7XG4gIHN0YXRlLmJpdHMgPSBiaXRzO1xuICAvLy0tLVxuXG4gIGlmIChzdGF0ZS53c2l6ZSB8fCAoX291dCAhPT0gc3RybS5hdmFpbF9vdXQgJiYgc3RhdGUubW9kZSA8IEJBRCAmJlxuICAgICAgICAgICAgICAgICAgICAgIChzdGF0ZS5tb2RlIDwgQ0hFQ0sgfHwgZmx1c2ggIT09IFpfRklOSVNIKSkpIHtcbiAgICBpZiAodXBkYXRld2luZG93KHN0cm0sIHN0cm0ub3V0cHV0LCBzdHJtLm5leHRfb3V0LCBfb3V0IC0gc3RybS5hdmFpbF9vdXQpKSB7XG4gICAgICBzdGF0ZS5tb2RlID0gTUVNO1xuICAgICAgcmV0dXJuIFpfTUVNX0VSUk9SO1xuICAgIH1cbiAgfVxuICBfaW4gLT0gc3RybS5hdmFpbF9pbjtcbiAgX291dCAtPSBzdHJtLmF2YWlsX291dDtcbiAgc3RybS50b3RhbF9pbiArPSBfaW47XG4gIHN0cm0udG90YWxfb3V0ICs9IF9vdXQ7XG4gIHN0YXRlLnRvdGFsICs9IF9vdXQ7XG4gIGlmIChzdGF0ZS53cmFwICYmIF9vdXQpIHtcbiAgICBzdHJtLmFkbGVyID0gc3RhdGUuY2hlY2sgPSAvKlVQREFURShzdGF0ZS5jaGVjaywgc3RybS5uZXh0X291dCAtIF9vdXQsIF9vdXQpOyovXG4gICAgICAoc3RhdGUuZmxhZ3MgPyBjcmMzMihzdGF0ZS5jaGVjaywgb3V0cHV0LCBfb3V0LCBzdHJtLm5leHRfb3V0IC0gX291dCkgOiBhZGxlcjMyKHN0YXRlLmNoZWNrLCBvdXRwdXQsIF9vdXQsIHN0cm0ubmV4dF9vdXQgLSBfb3V0KSk7XG4gIH1cbiAgc3RybS5kYXRhX3R5cGUgPSBzdGF0ZS5iaXRzICsgKHN0YXRlLmxhc3QgPyA2NCA6IDApICtcbiAgICAgICAgICAgICAgICAgICAgKHN0YXRlLm1vZGUgPT09IFRZUEUgPyAxMjggOiAwKSArXG4gICAgICAgICAgICAgICAgICAgIChzdGF0ZS5tb2RlID09PSBMRU5fIHx8IHN0YXRlLm1vZGUgPT09IENPUFlfID8gMjU2IDogMCk7XG4gIGlmICgoKF9pbiA9PT0gMCAmJiBfb3V0ID09PSAwKSB8fCBmbHVzaCA9PT0gWl9GSU5JU0gpICYmIHJldCA9PT0gWl9PSykge1xuICAgIHJldCA9IFpfQlVGX0VSUk9SO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIGluZmxhdGVFbmQoc3RybSkge1xuXG4gIGlmICghc3RybSB8fCAhc3RybS5zdGF0ZSAvKnx8IHN0cm0tPnpmcmVlID09IChmcmVlX2Z1bmMpMCovKSB7XG4gICAgcmV0dXJuIFpfU1RSRUFNX0VSUk9SO1xuICB9XG5cbiAgdmFyIHN0YXRlID0gc3RybS5zdGF0ZTtcbiAgaWYgKHN0YXRlLndpbmRvdykge1xuICAgIHN0YXRlLndpbmRvdyA9IG51bGw7XG4gIH1cbiAgc3RybS5zdGF0ZSA9IG51bGw7XG4gIHJldHVybiBaX09LO1xufVxuXG5mdW5jdGlvbiBpbmZsYXRlR2V0SGVhZGVyKHN0cm0sIGhlYWQpIHtcbiAgdmFyIHN0YXRlO1xuXG4gIC8qIGNoZWNrIHN0YXRlICovXG4gIGlmICghc3RybSB8fCAhc3RybS5zdGF0ZSkgeyByZXR1cm4gWl9TVFJFQU1fRVJST1I7IH1cbiAgc3RhdGUgPSBzdHJtLnN0YXRlO1xuICBpZiAoKHN0YXRlLndyYXAgJiAyKSA9PT0gMCkgeyByZXR1cm4gWl9TVFJFQU1fRVJST1I7IH1cblxuICAvKiBzYXZlIGhlYWRlciBzdHJ1Y3R1cmUgKi9cbiAgc3RhdGUuaGVhZCA9IGhlYWQ7XG4gIGhlYWQuZG9uZSA9IGZhbHNlO1xuICByZXR1cm4gWl9PSztcbn1cblxuZnVuY3Rpb24gaW5mbGF0ZVNldERpY3Rpb25hcnkoc3RybSwgZGljdGlvbmFyeSkge1xuICB2YXIgZGljdExlbmd0aCA9IGRpY3Rpb25hcnkubGVuZ3RoO1xuXG4gIHZhciBzdGF0ZTtcbiAgdmFyIGRpY3RpZDtcbiAgdmFyIHJldDtcblxuICAvKiBjaGVjayBzdGF0ZSAqL1xuICBpZiAoIXN0cm0gLyogPT0gWl9OVUxMICovIHx8ICFzdHJtLnN0YXRlIC8qID09IFpfTlVMTCAqLykgeyByZXR1cm4gWl9TVFJFQU1fRVJST1I7IH1cbiAgc3RhdGUgPSBzdHJtLnN0YXRlO1xuXG4gIGlmIChzdGF0ZS53cmFwICE9PSAwICYmIHN0YXRlLm1vZGUgIT09IERJQ1QpIHtcbiAgICByZXR1cm4gWl9TVFJFQU1fRVJST1I7XG4gIH1cblxuICAvKiBjaGVjayBmb3IgY29ycmVjdCBkaWN0aW9uYXJ5IGlkZW50aWZpZXIgKi9cbiAgaWYgKHN0YXRlLm1vZGUgPT09IERJQ1QpIHtcbiAgICBkaWN0aWQgPSAxOyAvKiBhZGxlcjMyKDAsIG51bGwsIDApKi9cbiAgICAvKiBkaWN0aWQgPSBhZGxlcjMyKGRpY3RpZCwgZGljdGlvbmFyeSwgZGljdExlbmd0aCk7ICovXG4gICAgZGljdGlkID0gYWRsZXIzMihkaWN0aWQsIGRpY3Rpb25hcnksIGRpY3RMZW5ndGgsIDApO1xuICAgIGlmIChkaWN0aWQgIT09IHN0YXRlLmNoZWNrKSB7XG4gICAgICByZXR1cm4gWl9EQVRBX0VSUk9SO1xuICAgIH1cbiAgfVxuICAvKiBjb3B5IGRpY3Rpb25hcnkgdG8gd2luZG93IHVzaW5nIHVwZGF0ZXdpbmRvdygpLCB3aGljaCB3aWxsIGFtZW5kIHRoZVxuICAgZXhpc3RpbmcgZGljdGlvbmFyeSBpZiBhcHByb3ByaWF0ZSAqL1xuICByZXQgPSB1cGRhdGV3aW5kb3coc3RybSwgZGljdGlvbmFyeSwgZGljdExlbmd0aCwgZGljdExlbmd0aCk7XG4gIGlmIChyZXQpIHtcbiAgICBzdGF0ZS5tb2RlID0gTUVNO1xuICAgIHJldHVybiBaX01FTV9FUlJPUjtcbiAgfVxuICBzdGF0ZS5oYXZlZGljdCA9IDE7XG4gIC8vIFRyYWNldigoc3RkZXJyLCBcImluZmxhdGU6ICAgZGljdGlvbmFyeSBzZXRcXG5cIikpO1xuICByZXR1cm4gWl9PSztcbn1cblxuZXhwb3J0cy5pbmZsYXRlUmVzZXQgPSBpbmZsYXRlUmVzZXQ7XG5leHBvcnRzLmluZmxhdGVSZXNldDIgPSBpbmZsYXRlUmVzZXQyO1xuZXhwb3J0cy5pbmZsYXRlUmVzZXRLZWVwID0gaW5mbGF0ZVJlc2V0S2VlcDtcbmV4cG9ydHMuaW5mbGF0ZUluaXQgPSBpbmZsYXRlSW5pdDtcbmV4cG9ydHMuaW5mbGF0ZUluaXQyID0gaW5mbGF0ZUluaXQyO1xuZXhwb3J0cy5pbmZsYXRlID0gaW5mbGF0ZTtcbmV4cG9ydHMuaW5mbGF0ZUVuZCA9IGluZmxhdGVFbmQ7XG5leHBvcnRzLmluZmxhdGVHZXRIZWFkZXIgPSBpbmZsYXRlR2V0SGVhZGVyO1xuZXhwb3J0cy5pbmZsYXRlU2V0RGljdGlvbmFyeSA9IGluZmxhdGVTZXREaWN0aW9uYXJ5O1xuZXhwb3J0cy5pbmZsYXRlSW5mbyA9ICdwYWtvIGluZmxhdGUgKGZyb20gTm9kZWNhIHByb2plY3QpJztcblxuLyogTm90IGltcGxlbWVudGVkXG5leHBvcnRzLmluZmxhdGVDb3B5ID0gaW5mbGF0ZUNvcHk7XG5leHBvcnRzLmluZmxhdGVHZXREaWN0aW9uYXJ5ID0gaW5mbGF0ZUdldERpY3Rpb25hcnk7XG5leHBvcnRzLmluZmxhdGVNYXJrID0gaW5mbGF0ZU1hcms7XG5leHBvcnRzLmluZmxhdGVQcmltZSA9IGluZmxhdGVQcmltZTtcbmV4cG9ydHMuaW5mbGF0ZVN5bmMgPSBpbmZsYXRlU3luYztcbmV4cG9ydHMuaW5mbGF0ZVN5bmNQb2ludCA9IGluZmxhdGVTeW5jUG9pbnQ7XG5leHBvcnRzLmluZmxhdGVVbmRlcm1pbmUgPSBpbmZsYXRlVW5kZXJtaW5lO1xuKi9cbiIsICIndXNlIHN0cmljdCc7XG5cbi8vIChDKSAxOTk1LTIwMTMgSmVhbi1sb3VwIEdhaWxseSBhbmQgTWFyayBBZGxlclxuLy8gKEMpIDIwMTQtMjAxNyBWaXRhbHkgUHV6cmluIGFuZCBBbmRyZXkgVHVwaXRzaW5cbi8vXG4vLyBUaGlzIHNvZnR3YXJlIGlzIHByb3ZpZGVkICdhcy1pcycsIHdpdGhvdXQgYW55IGV4cHJlc3Mgb3IgaW1wbGllZFxuLy8gd2FycmFudHkuIEluIG5vIGV2ZW50IHdpbGwgdGhlIGF1dGhvcnMgYmUgaGVsZCBsaWFibGUgZm9yIGFueSBkYW1hZ2VzXG4vLyBhcmlzaW5nIGZyb20gdGhlIHVzZSBvZiB0aGlzIHNvZnR3YXJlLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgZ3JhbnRlZCB0byBhbnlvbmUgdG8gdXNlIHRoaXMgc29mdHdhcmUgZm9yIGFueSBwdXJwb3NlLFxuLy8gaW5jbHVkaW5nIGNvbW1lcmNpYWwgYXBwbGljYXRpb25zLCBhbmQgdG8gYWx0ZXIgaXQgYW5kIHJlZGlzdHJpYnV0ZSBpdFxuLy8gZnJlZWx5LCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgcmVzdHJpY3Rpb25zOlxuLy9cbi8vIDEuIFRoZSBvcmlnaW4gb2YgdGhpcyBzb2Z0d2FyZSBtdXN0IG5vdCBiZSBtaXNyZXByZXNlbnRlZDsgeW91IG11c3Qgbm90XG4vLyAgIGNsYWltIHRoYXQgeW91IHdyb3RlIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS4gSWYgeW91IHVzZSB0aGlzIHNvZnR3YXJlXG4vLyAgIGluIGEgcHJvZHVjdCwgYW4gYWNrbm93bGVkZ21lbnQgaW4gdGhlIHByb2R1Y3QgZG9jdW1lbnRhdGlvbiB3b3VsZCBiZVxuLy8gICBhcHByZWNpYXRlZCBidXQgaXMgbm90IHJlcXVpcmVkLlxuLy8gMi4gQWx0ZXJlZCBzb3VyY2UgdmVyc2lvbnMgbXVzdCBiZSBwbGFpbmx5IG1hcmtlZCBhcyBzdWNoLCBhbmQgbXVzdCBub3QgYmVcbi8vICAgbWlzcmVwcmVzZW50ZWQgYXMgYmVpbmcgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLlxuLy8gMy4gVGhpcyBub3RpY2UgbWF5IG5vdCBiZSByZW1vdmVkIG9yIGFsdGVyZWQgZnJvbSBhbnkgc291cmNlIGRpc3RyaWJ1dGlvbi5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgLyogQWxsb3dlZCBmbHVzaCB2YWx1ZXM7IHNlZSBkZWZsYXRlKCkgYW5kIGluZmxhdGUoKSBiZWxvdyBmb3IgZGV0YWlscyAqL1xuICBaX05PX0ZMVVNIOiAgICAgICAgIDAsXG4gIFpfUEFSVElBTF9GTFVTSDogICAgMSxcbiAgWl9TWU5DX0ZMVVNIOiAgICAgICAyLFxuICBaX0ZVTExfRkxVU0g6ICAgICAgIDMsXG4gIFpfRklOSVNIOiAgICAgICAgICAgNCxcbiAgWl9CTE9DSzogICAgICAgICAgICA1LFxuICBaX1RSRUVTOiAgICAgICAgICAgIDYsXG5cbiAgLyogUmV0dXJuIGNvZGVzIGZvciB0aGUgY29tcHJlc3Npb24vZGVjb21wcmVzc2lvbiBmdW5jdGlvbnMuIE5lZ2F0aXZlIHZhbHVlc1xuICAqIGFyZSBlcnJvcnMsIHBvc2l0aXZlIHZhbHVlcyBhcmUgdXNlZCBmb3Igc3BlY2lhbCBidXQgbm9ybWFsIGV2ZW50cy5cbiAgKi9cbiAgWl9PSzogICAgICAgICAgICAgICAwLFxuICBaX1NUUkVBTV9FTkQ6ICAgICAgIDEsXG4gIFpfTkVFRF9ESUNUOiAgICAgICAgMixcbiAgWl9FUlJOTzogICAgICAgICAgIC0xLFxuICBaX1NUUkVBTV9FUlJPUjogICAgLTIsXG4gIFpfREFUQV9FUlJPUjogICAgICAtMyxcbiAgLy9aX01FTV9FUlJPUjogICAgIC00LFxuICBaX0JVRl9FUlJPUjogICAgICAgLTUsXG4gIC8vWl9WRVJTSU9OX0VSUk9SOiAtNixcblxuICAvKiBjb21wcmVzc2lvbiBsZXZlbHMgKi9cbiAgWl9OT19DT01QUkVTU0lPTjogICAgICAgICAwLFxuICBaX0JFU1RfU1BFRUQ6ICAgICAgICAgICAgIDEsXG4gIFpfQkVTVF9DT01QUkVTU0lPTjogICAgICAgOSxcbiAgWl9ERUZBVUxUX0NPTVBSRVNTSU9OOiAgIC0xLFxuXG5cbiAgWl9GSUxURVJFRDogICAgICAgICAgICAgICAxLFxuICBaX0hVRkZNQU5fT05MWTogICAgICAgICAgIDIsXG4gIFpfUkxFOiAgICAgICAgICAgICAgICAgICAgMyxcbiAgWl9GSVhFRDogICAgICAgICAgICAgICAgICA0LFxuICBaX0RFRkFVTFRfU1RSQVRFR1k6ICAgICAgIDAsXG5cbiAgLyogUG9zc2libGUgdmFsdWVzIG9mIHRoZSBkYXRhX3R5cGUgZmllbGQgKHRob3VnaCBzZWUgaW5mbGF0ZSgpKSAqL1xuICBaX0JJTkFSWTogICAgICAgICAgICAgICAgIDAsXG4gIFpfVEVYVDogICAgICAgICAgICAgICAgICAgMSxcbiAgLy9aX0FTQ0lJOiAgICAgICAgICAgICAgICAxLCAvLyA9IFpfVEVYVCAoZGVwcmVjYXRlZClcbiAgWl9VTktOT1dOOiAgICAgICAgICAgICAgICAyLFxuXG4gIC8qIFRoZSBkZWZsYXRlIGNvbXByZXNzaW9uIG1ldGhvZCAqL1xuICBaX0RFRkxBVEVEOiAgICAgICAgICAgICAgIDhcbiAgLy9aX05VTEw6ICAgICAgICAgICAgICAgICBudWxsIC8vIFVzZSAtMSBvciBudWxsIGlubGluZSwgZGVwZW5kaW5nIG9uIHZhciB0eXBlXG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLy8gKEMpIDE5OTUtMjAxMyBKZWFuLWxvdXAgR2FpbGx5IGFuZCBNYXJrIEFkbGVyXG4vLyAoQykgMjAxNC0yMDE3IFZpdGFseSBQdXpyaW4gYW5kIEFuZHJleSBUdXBpdHNpblxuLy9cbi8vIFRoaXMgc29mdHdhcmUgaXMgcHJvdmlkZWQgJ2FzLWlzJywgd2l0aG91dCBhbnkgZXhwcmVzcyBvciBpbXBsaWVkXG4vLyB3YXJyYW50eS4gSW4gbm8gZXZlbnQgd2lsbCB0aGUgYXV0aG9ycyBiZSBoZWxkIGxpYWJsZSBmb3IgYW55IGRhbWFnZXNcbi8vIGFyaXNpbmcgZnJvbSB0aGUgdXNlIG9mIHRoaXMgc29mdHdhcmUuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBncmFudGVkIHRvIGFueW9uZSB0byB1c2UgdGhpcyBzb2Z0d2FyZSBmb3IgYW55IHB1cnBvc2UsXG4vLyBpbmNsdWRpbmcgY29tbWVyY2lhbCBhcHBsaWNhdGlvbnMsIGFuZCB0byBhbHRlciBpdCBhbmQgcmVkaXN0cmlidXRlIGl0XG4vLyBmcmVlbHksIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyByZXN0cmljdGlvbnM6XG4vL1xuLy8gMS4gVGhlIG9yaWdpbiBvZiB0aGlzIHNvZnR3YXJlIG11c3Qgbm90IGJlIG1pc3JlcHJlc2VudGVkOyB5b3UgbXVzdCBub3Rcbi8vICAgY2xhaW0gdGhhdCB5b3Ugd3JvdGUgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLiBJZiB5b3UgdXNlIHRoaXMgc29mdHdhcmVcbi8vICAgaW4gYSBwcm9kdWN0LCBhbiBhY2tub3dsZWRnbWVudCBpbiB0aGUgcHJvZHVjdCBkb2N1bWVudGF0aW9uIHdvdWxkIGJlXG4vLyAgIGFwcHJlY2lhdGVkIGJ1dCBpcyBub3QgcmVxdWlyZWQuXG4vLyAyLiBBbHRlcmVkIHNvdXJjZSB2ZXJzaW9ucyBtdXN0IGJlIHBsYWlubHkgbWFya2VkIGFzIHN1Y2gsIGFuZCBtdXN0IG5vdCBiZVxuLy8gICBtaXNyZXByZXNlbnRlZCBhcyBiZWluZyB0aGUgb3JpZ2luYWwgc29mdHdhcmUuXG4vLyAzLiBUaGlzIG5vdGljZSBtYXkgbm90IGJlIHJlbW92ZWQgb3IgYWx0ZXJlZCBmcm9tIGFueSBzb3VyY2UgZGlzdHJpYnV0aW9uLlxuXG5mdW5jdGlvbiBHWmhlYWRlcigpIHtcbiAgLyogdHJ1ZSBpZiBjb21wcmVzc2VkIGRhdGEgYmVsaWV2ZWQgdG8gYmUgdGV4dCAqL1xuICB0aGlzLnRleHQgICAgICAgPSAwO1xuICAvKiBtb2RpZmljYXRpb24gdGltZSAqL1xuICB0aGlzLnRpbWUgICAgICAgPSAwO1xuICAvKiBleHRyYSBmbGFncyAobm90IHVzZWQgd2hlbiB3cml0aW5nIGEgZ3ppcCBmaWxlKSAqL1xuICB0aGlzLnhmbGFncyAgICAgPSAwO1xuICAvKiBvcGVyYXRpbmcgc3lzdGVtICovXG4gIHRoaXMub3MgICAgICAgICA9IDA7XG4gIC8qIHBvaW50ZXIgdG8gZXh0cmEgZmllbGQgb3IgWl9OVUxMIGlmIG5vbmUgKi9cbiAgdGhpcy5leHRyYSAgICAgID0gbnVsbDtcbiAgLyogZXh0cmEgZmllbGQgbGVuZ3RoICh2YWxpZCBpZiBleHRyYSAhPSBaX05VTEwpICovXG4gIHRoaXMuZXh0cmFfbGVuICA9IDA7IC8vIEFjdHVhbGx5LCB3ZSBkb24ndCBuZWVkIGl0IGluIEpTLFxuICAgICAgICAgICAgICAgICAgICAgICAvLyBidXQgbGVhdmUgZm9yIGZldyBjb2RlIG1vZGlmaWNhdGlvbnNcblxuICAvL1xuICAvLyBTZXR1cCBsaW1pdHMgaXMgbm90IG5lY2Vzc2FyeSBiZWNhdXNlIGluIGpzIHdlIHNob3VsZCBub3QgcHJlYWxsb2NhdGUgbWVtb3J5XG4gIC8vIGZvciBpbmZsYXRlIHVzZSBjb25zdGFudCBsaW1pdCBpbiA2NTUzNiBieXRlc1xuICAvL1xuXG4gIC8qIHNwYWNlIGF0IGV4dHJhIChvbmx5IHdoZW4gcmVhZGluZyBoZWFkZXIpICovXG4gIC8vIHRoaXMuZXh0cmFfbWF4ICA9IDA7XG4gIC8qIHBvaW50ZXIgdG8gemVyby10ZXJtaW5hdGVkIGZpbGUgbmFtZSBvciBaX05VTEwgKi9cbiAgdGhpcy5uYW1lICAgICAgID0gJyc7XG4gIC8qIHNwYWNlIGF0IG5hbWUgKG9ubHkgd2hlbiByZWFkaW5nIGhlYWRlcikgKi9cbiAgLy8gdGhpcy5uYW1lX21heCAgID0gMDtcbiAgLyogcG9pbnRlciB0byB6ZXJvLXRlcm1pbmF0ZWQgY29tbWVudCBvciBaX05VTEwgKi9cbiAgdGhpcy5jb21tZW50ICAgID0gJyc7XG4gIC8qIHNwYWNlIGF0IGNvbW1lbnQgKG9ubHkgd2hlbiByZWFkaW5nIGhlYWRlcikgKi9cbiAgLy8gdGhpcy5jb21tX21heCAgID0gMDtcbiAgLyogdHJ1ZSBpZiB0aGVyZSB3YXMgb3Igd2lsbCBiZSBhIGhlYWRlciBjcmMgKi9cbiAgdGhpcy5oY3JjICAgICAgID0gMDtcbiAgLyogdHJ1ZSB3aGVuIGRvbmUgcmVhZGluZyBnemlwIGhlYWRlciAobm90IHVzZWQgd2hlbiB3cml0aW5nIGEgZ3ppcCBmaWxlKSAqL1xuICB0aGlzLmRvbmUgICAgICAgPSBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHWmhlYWRlcjtcbiIsICIndXNlIHN0cmljdCc7XG5cblxudmFyIHpsaWJfaW5mbGF0ZSA9IHJlcXVpcmUoJy4vemxpYi9pbmZsYXRlJyk7XG52YXIgdXRpbHMgICAgICAgID0gcmVxdWlyZSgnLi91dGlscy9jb21tb24nKTtcbnZhciBzdHJpbmdzICAgICAgPSByZXF1aXJlKCcuL3V0aWxzL3N0cmluZ3MnKTtcbnZhciBjICAgICAgICAgICAgPSByZXF1aXJlKCcuL3psaWIvY29uc3RhbnRzJyk7XG52YXIgbXNnICAgICAgICAgID0gcmVxdWlyZSgnLi96bGliL21lc3NhZ2VzJyk7XG52YXIgWlN0cmVhbSAgICAgID0gcmVxdWlyZSgnLi96bGliL3pzdHJlYW0nKTtcbnZhciBHWmhlYWRlciAgICAgPSByZXF1aXJlKCcuL3psaWIvZ3poZWFkZXInKTtcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBjbGFzcyBJbmZsYXRlXG4gKlxuICogR2VuZXJpYyBKUy1zdHlsZSB3cmFwcGVyIGZvciB6bGliIGNhbGxzLiBJZiB5b3UgZG9uJ3QgbmVlZFxuICogc3RyZWFtaW5nIGJlaGF2aW91ciAtIHVzZSBtb3JlIHNpbXBsZSBmdW5jdGlvbnM6IFtbaW5mbGF0ZV1dXG4gKiBhbmQgW1tpbmZsYXRlUmF3XV0uXG4gKiovXG5cbi8qIGludGVybmFsXG4gKiBpbmZsYXRlLmNodW5rcyAtPiBBcnJheVxuICpcbiAqIENodW5rcyBvZiBvdXRwdXQgZGF0YSwgaWYgW1tJbmZsYXRlI29uRGF0YV1dIG5vdCBvdmVycmlkZGVuLlxuICoqL1xuXG4vKipcbiAqIEluZmxhdGUucmVzdWx0IC0+IFVpbnQ4QXJyYXl8QXJyYXl8U3RyaW5nXG4gKlxuICogVW5jb21wcmVzc2VkIHJlc3VsdCwgZ2VuZXJhdGVkIGJ5IGRlZmF1bHQgW1tJbmZsYXRlI29uRGF0YV1dXG4gKiBhbmQgW1tJbmZsYXRlI29uRW5kXV0gaGFuZGxlcnMuIEZpbGxlZCBhZnRlciB5b3UgcHVzaCBsYXN0IGNodW5rXG4gKiAoY2FsbCBbW0luZmxhdGUjcHVzaF1dIHdpdGggYFpfRklOSVNIYCAvIGB0cnVlYCBwYXJhbSkgb3IgaWYgeW91XG4gKiBwdXNoIGEgY2h1bmsgd2l0aCBleHBsaWNpdCBmbHVzaCAoY2FsbCBbW0luZmxhdGUjcHVzaF1dIHdpdGhcbiAqIGBaX1NZTkNfRkxVU0hgIHBhcmFtKS5cbiAqKi9cblxuLyoqXG4gKiBJbmZsYXRlLmVyciAtPiBOdW1iZXJcbiAqXG4gKiBFcnJvciBjb2RlIGFmdGVyIGluZmxhdGUgZmluaXNoZWQuIDAgKFpfT0spIG9uIHN1Y2Nlc3MuXG4gKiBTaG91bGQgYmUgY2hlY2tlZCBpZiBicm9rZW4gZGF0YSBwb3NzaWJsZS5cbiAqKi9cblxuLyoqXG4gKiBJbmZsYXRlLm1zZyAtPiBTdHJpbmdcbiAqXG4gKiBFcnJvciBtZXNzYWdlLCBpZiBbW0luZmxhdGUuZXJyXV0gIT0gMFxuICoqL1xuXG5cbi8qKlxuICogbmV3IEluZmxhdGUob3B0aW9ucylcbiAqIC0gb3B0aW9ucyAoT2JqZWN0KTogemxpYiBpbmZsYXRlIG9wdGlvbnMuXG4gKlxuICogQ3JlYXRlcyBuZXcgaW5mbGF0b3IgaW5zdGFuY2Ugd2l0aCBzcGVjaWZpZWQgcGFyYW1zLiBUaHJvd3MgZXhjZXB0aW9uXG4gKiBvbiBiYWQgcGFyYW1zLiBTdXBwb3J0ZWQgb3B0aW9uczpcbiAqXG4gKiAtIGB3aW5kb3dCaXRzYFxuICogLSBgZGljdGlvbmFyeWBcbiAqXG4gKiBbaHR0cDovL3psaWIubmV0L21hbnVhbC5odG1sI0FkdmFuY2VkXShodHRwOi8vemxpYi5uZXQvbWFudWFsLmh0bWwjQWR2YW5jZWQpXG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiB0aGVzZS5cbiAqXG4gKiBBZGRpdGlvbmFsIG9wdGlvbnMsIGZvciBpbnRlcm5hbCBuZWVkczpcbiAqXG4gKiAtIGBjaHVua1NpemVgIC0gc2l6ZSBvZiBnZW5lcmF0ZWQgZGF0YSBjaHVua3MgKDE2SyBieSBkZWZhdWx0KVxuICogLSBgcmF3YCAoQm9vbGVhbikgLSBkbyByYXcgaW5mbGF0ZVxuICogLSBgdG9gIChTdHJpbmcpIC0gaWYgZXF1YWwgdG8gJ3N0cmluZycsIHRoZW4gcmVzdWx0IHdpbGwgYmUgY29udmVydGVkXG4gKiAgIGZyb20gdXRmOCB0byB1dGYxNiAoamF2YXNjcmlwdCkgc3RyaW5nLiBXaGVuIHN0cmluZyBvdXRwdXQgcmVxdWVzdGVkLFxuICogICBjaHVuayBsZW5ndGggY2FuIGRpZmZlciBmcm9tIGBjaHVua1NpemVgLCBkZXBlbmRpbmcgb24gY29udGVudC5cbiAqXG4gKiBCeSBkZWZhdWx0LCB3aGVuIG5vIG9wdGlvbnMgc2V0LCBhdXRvZGV0ZWN0IGRlZmxhdGUvZ3ppcCBkYXRhIGZvcm1hdCB2aWFcbiAqIHdyYXBwZXIgaGVhZGVyLlxuICpcbiAqICMjIyMjIEV4YW1wbGU6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogdmFyIHBha28gPSByZXF1aXJlKCdwYWtvJylcbiAqICAgLCBjaHVuazEgPSBVaW50OEFycmF5KFsxLDIsMyw0LDUsNiw3LDgsOV0pXG4gKiAgICwgY2h1bmsyID0gVWludDhBcnJheShbMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMTldKTtcbiAqXG4gKiB2YXIgaW5mbGF0ZSA9IG5ldyBwYWtvLkluZmxhdGUoeyBsZXZlbDogM30pO1xuICpcbiAqIGluZmxhdGUucHVzaChjaHVuazEsIGZhbHNlKTtcbiAqIGluZmxhdGUucHVzaChjaHVuazIsIHRydWUpOyAgLy8gdHJ1ZSAtPiBsYXN0IGNodW5rXG4gKlxuICogaWYgKGluZmxhdGUuZXJyKSB7IHRocm93IG5ldyBFcnJvcihpbmZsYXRlLmVycik7IH1cbiAqXG4gKiBjb25zb2xlLmxvZyhpbmZsYXRlLnJlc3VsdCk7XG4gKiBgYGBcbiAqKi9cbmZ1bmN0aW9uIEluZmxhdGUob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgSW5mbGF0ZSkpIHJldHVybiBuZXcgSW5mbGF0ZShvcHRpb25zKTtcblxuICB0aGlzLm9wdGlvbnMgPSB1dGlscy5hc3NpZ24oe1xuICAgIGNodW5rU2l6ZTogMTYzODQsXG4gICAgd2luZG93Qml0czogMCxcbiAgICB0bzogJydcbiAgfSwgb3B0aW9ucyB8fCB7fSk7XG5cbiAgdmFyIG9wdCA9IHRoaXMub3B0aW9ucztcblxuICAvLyBGb3JjZSB3aW5kb3cgc2l6ZSBmb3IgYHJhd2AgZGF0YSwgaWYgbm90IHNldCBkaXJlY3RseSxcbiAgLy8gYmVjYXVzZSB3ZSBoYXZlIG5vIGhlYWRlciBmb3IgYXV0b2RldGVjdC5cbiAgaWYgKG9wdC5yYXcgJiYgKG9wdC53aW5kb3dCaXRzID49IDApICYmIChvcHQud2luZG93Qml0cyA8IDE2KSkge1xuICAgIG9wdC53aW5kb3dCaXRzID0gLW9wdC53aW5kb3dCaXRzO1xuICAgIGlmIChvcHQud2luZG93Qml0cyA9PT0gMCkgeyBvcHQud2luZG93Qml0cyA9IC0xNTsgfVxuICB9XG5cbiAgLy8gSWYgYHdpbmRvd0JpdHNgIG5vdCBkZWZpbmVkIChhbmQgbW9kZSBub3QgcmF3KSAtIHNldCBhdXRvZGV0ZWN0IGZsYWcgZm9yIGd6aXAvZGVmbGF0ZVxuICBpZiAoKG9wdC53aW5kb3dCaXRzID49IDApICYmIChvcHQud2luZG93Qml0cyA8IDE2KSAmJlxuICAgICAgIShvcHRpb25zICYmIG9wdGlvbnMud2luZG93Qml0cykpIHtcbiAgICBvcHQud2luZG93Qml0cyArPSAzMjtcbiAgfVxuXG4gIC8vIEd6aXAgaGVhZGVyIGhhcyBubyBpbmZvIGFib3V0IHdpbmRvd3Mgc2l6ZSwgd2UgY2FuIGRvIGF1dG9kZXRlY3Qgb25seVxuICAvLyBmb3IgZGVmbGF0ZS4gU28sIGlmIHdpbmRvdyBzaXplIG5vdCBzZXQsIGZvcmNlIGl0IHRvIG1heCB3aGVuIGd6aXAgcG9zc2libGVcbiAgaWYgKChvcHQud2luZG93Qml0cyA+IDE1KSAmJiAob3B0LndpbmRvd0JpdHMgPCA0OCkpIHtcbiAgICAvLyBiaXQgMyAoMTYpIC0+IGd6aXBwZWQgZGF0YVxuICAgIC8vIGJpdCA0ICgzMikgLT4gYXV0b2RldGVjdCBnemlwL2RlZmxhdGVcbiAgICBpZiAoKG9wdC53aW5kb3dCaXRzICYgMTUpID09PSAwKSB7XG4gICAgICBvcHQud2luZG93Qml0cyB8PSAxNTtcbiAgICB9XG4gIH1cblxuICB0aGlzLmVyciAgICA9IDA7ICAgICAgLy8gZXJyb3IgY29kZSwgaWYgaGFwcGVucyAoMCA9IFpfT0spXG4gIHRoaXMubXNnICAgID0gJyc7ICAgICAvLyBlcnJvciBtZXNzYWdlXG4gIHRoaXMuZW5kZWQgID0gZmFsc2U7ICAvLyB1c2VkIHRvIGF2b2lkIG11bHRpcGxlIG9uRW5kKCkgY2FsbHNcbiAgdGhpcy5jaHVua3MgPSBbXTsgICAgIC8vIGNodW5rcyBvZiBjb21wcmVzc2VkIGRhdGFcblxuICB0aGlzLnN0cm0gICA9IG5ldyBaU3RyZWFtKCk7XG4gIHRoaXMuc3RybS5hdmFpbF9vdXQgPSAwO1xuXG4gIHZhciBzdGF0dXMgID0gemxpYl9pbmZsYXRlLmluZmxhdGVJbml0MihcbiAgICB0aGlzLnN0cm0sXG4gICAgb3B0LndpbmRvd0JpdHNcbiAgKTtcblxuICBpZiAoc3RhdHVzICE9PSBjLlpfT0spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobXNnW3N0YXR1c10pO1xuICB9XG5cbiAgdGhpcy5oZWFkZXIgPSBuZXcgR1poZWFkZXIoKTtcblxuICB6bGliX2luZmxhdGUuaW5mbGF0ZUdldEhlYWRlcih0aGlzLnN0cm0sIHRoaXMuaGVhZGVyKTtcblxuICAvLyBTZXR1cCBkaWN0aW9uYXJ5XG4gIGlmIChvcHQuZGljdGlvbmFyeSkge1xuICAgIC8vIENvbnZlcnQgZGF0YSBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIG9wdC5kaWN0aW9uYXJ5ID09PSAnc3RyaW5nJykge1xuICAgICAgb3B0LmRpY3Rpb25hcnkgPSBzdHJpbmdzLnN0cmluZzJidWYob3B0LmRpY3Rpb25hcnkpO1xuICAgIH0gZWxzZSBpZiAodG9TdHJpbmcuY2FsbChvcHQuZGljdGlvbmFyeSkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXScpIHtcbiAgICAgIG9wdC5kaWN0aW9uYXJ5ID0gbmV3IFVpbnQ4QXJyYXkob3B0LmRpY3Rpb25hcnkpO1xuICAgIH1cbiAgICBpZiAob3B0LnJhdykgeyAvL0luIHJhdyBtb2RlIHdlIG5lZWQgdG8gc2V0IHRoZSBkaWN0aW9uYXJ5IGVhcmx5XG4gICAgICBzdGF0dXMgPSB6bGliX2luZmxhdGUuaW5mbGF0ZVNldERpY3Rpb25hcnkodGhpcy5zdHJtLCBvcHQuZGljdGlvbmFyeSk7XG4gICAgICBpZiAoc3RhdHVzICE9PSBjLlpfT0spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZ1tzdGF0dXNdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBJbmZsYXRlI3B1c2goZGF0YVssIG1vZGVdKSAtPiBCb29sZWFuXG4gKiAtIGRhdGEgKFVpbnQ4QXJyYXl8QXJyYXl8QXJyYXlCdWZmZXJ8U3RyaW5nKTogaW5wdXQgZGF0YVxuICogLSBtb2RlIChOdW1iZXJ8Qm9vbGVhbik6IDAuLjYgZm9yIGNvcnJlc3BvbmRpbmcgWl9OT19GTFVTSC4uWl9UUkVFIG1vZGVzLlxuICogICBTZWUgY29uc3RhbnRzLiBTa2lwcGVkIG9yIGBmYWxzZWAgbWVhbnMgWl9OT19GTFVTSCwgYHRydWVgIG1lYW5zIFpfRklOSVNILlxuICpcbiAqIFNlbmRzIGlucHV0IGRhdGEgdG8gaW5mbGF0ZSBwaXBlLCBnZW5lcmF0aW5nIFtbSW5mbGF0ZSNvbkRhdGFdXSBjYWxscyB3aXRoXG4gKiBuZXcgb3V0cHV0IGNodW5rcy4gUmV0dXJucyBgdHJ1ZWAgb24gc3VjY2Vzcy4gVGhlIGxhc3QgZGF0YSBibG9jayBtdXN0IGhhdmVcbiAqIG1vZGUgWl9GSU5JU0ggKG9yIGB0cnVlYCkuIFRoYXQgd2lsbCBmbHVzaCBpbnRlcm5hbCBwZW5kaW5nIGJ1ZmZlcnMgYW5kIGNhbGxcbiAqIFtbSW5mbGF0ZSNvbkVuZF1dLiBGb3IgaW50ZXJpbSBleHBsaWNpdCBmbHVzaGVzICh3aXRob3V0IGVuZGluZyB0aGUgc3RyZWFtKSB5b3VcbiAqIGNhbiB1c2UgbW9kZSBaX1NZTkNfRkxVU0gsIGtlZXBpbmcgdGhlIGRlY29tcHJlc3Npb24gY29udGV4dC5cbiAqXG4gKiBPbiBmYWlsIGNhbGwgW1tJbmZsYXRlI29uRW5kXV0gd2l0aCBlcnJvciBjb2RlIGFuZCByZXR1cm4gZmFsc2UuXG4gKlxuICogV2Ugc3Ryb25nbHkgcmVjb21tZW5kIHRvIHVzZSBgVWludDhBcnJheWAgb24gaW5wdXQgZm9yIGJlc3Qgc3BlZWQgKG91dHB1dFxuICogZm9ybWF0IGlzIGRldGVjdGVkIGF1dG9tYXRpY2FsbHkpLiBBbHNvLCBkb24ndCBza2lwIGxhc3QgcGFyYW0gYW5kIGFsd2F5c1xuICogdXNlIHRoZSBzYW1lIHR5cGUgaW4geW91ciBjb2RlIChib29sZWFuIG9yIG51bWJlcikuIFRoYXQgd2lsbCBpbXByb3ZlIEpTIHNwZWVkLlxuICpcbiAqIEZvciByZWd1bGFyIGBBcnJheWAtcyBtYWtlIHN1cmUgYWxsIGVsZW1lbnRzIGFyZSBbMC4uMjU1XS5cbiAqXG4gKiAjIyMjIyBFeGFtcGxlXG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogcHVzaChjaHVuaywgZmFsc2UpOyAvLyBwdXNoIG9uZSBvZiBkYXRhIGNodW5rc1xuICogLi4uXG4gKiBwdXNoKGNodW5rLCB0cnVlKTsgIC8vIHB1c2ggbGFzdCBjaHVua1xuICogYGBgXG4gKiovXG5JbmZsYXRlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGRhdGEsIG1vZGUpIHtcbiAgdmFyIHN0cm0gPSB0aGlzLnN0cm07XG4gIHZhciBjaHVua1NpemUgPSB0aGlzLm9wdGlvbnMuY2h1bmtTaXplO1xuICB2YXIgZGljdGlvbmFyeSA9IHRoaXMub3B0aW9ucy5kaWN0aW9uYXJ5O1xuICB2YXIgc3RhdHVzLCBfbW9kZTtcbiAgdmFyIG5leHRfb3V0X3V0ZjgsIHRhaWwsIHV0ZjhzdHI7XG5cbiAgLy8gRmxhZyB0byBwcm9wZXJseSBwcm9jZXNzIFpfQlVGX0VSUk9SIG9uIHRlc3RpbmcgaW5mbGF0ZSBjYWxsXG4gIC8vIHdoZW4gd2UgY2hlY2sgdGhhdCBhbGwgb3V0cHV0IGRhdGEgd2FzIGZsdXNoZWQuXG4gIHZhciBhbGxvd0J1ZkVycm9yID0gZmFsc2U7XG5cbiAgaWYgKHRoaXMuZW5kZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIF9tb2RlID0gKG1vZGUgPT09IH5+bW9kZSkgPyBtb2RlIDogKChtb2RlID09PSB0cnVlKSA/IGMuWl9GSU5JU0ggOiBjLlpfTk9fRkxVU0gpO1xuXG4gIC8vIENvbnZlcnQgZGF0YSBpZiBuZWVkZWRcbiAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgIC8vIE9ubHkgYmluYXJ5IHN0cmluZ3MgY2FuIGJlIGRlY29tcHJlc3NlZCBvbiBwcmFjdGljZVxuICAgIHN0cm0uaW5wdXQgPSBzdHJpbmdzLmJpbnN0cmluZzJidWYoZGF0YSk7XG4gIH0gZWxzZSBpZiAodG9TdHJpbmcuY2FsbChkYXRhKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJykge1xuICAgIHN0cm0uaW5wdXQgPSBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgfSBlbHNlIHtcbiAgICBzdHJtLmlucHV0ID0gZGF0YTtcbiAgfVxuXG4gIHN0cm0ubmV4dF9pbiA9IDA7XG4gIHN0cm0uYXZhaWxfaW4gPSBzdHJtLmlucHV0Lmxlbmd0aDtcblxuICBkbyB7XG4gICAgaWYgKHN0cm0uYXZhaWxfb3V0ID09PSAwKSB7XG4gICAgICBzdHJtLm91dHB1dCA9IG5ldyB1dGlscy5CdWY4KGNodW5rU2l6ZSk7XG4gICAgICBzdHJtLm5leHRfb3V0ID0gMDtcbiAgICAgIHN0cm0uYXZhaWxfb3V0ID0gY2h1bmtTaXplO1xuICAgIH1cblxuICAgIHN0YXR1cyA9IHpsaWJfaW5mbGF0ZS5pbmZsYXRlKHN0cm0sIGMuWl9OT19GTFVTSCk7ICAgIC8qIG5vIGJhZCByZXR1cm4gdmFsdWUgKi9cblxuICAgIGlmIChzdGF0dXMgPT09IGMuWl9ORUVEX0RJQ1QgJiYgZGljdGlvbmFyeSkge1xuICAgICAgc3RhdHVzID0gemxpYl9pbmZsYXRlLmluZmxhdGVTZXREaWN0aW9uYXJ5KHRoaXMuc3RybSwgZGljdGlvbmFyeSk7XG4gICAgfVxuXG4gICAgaWYgKHN0YXR1cyA9PT0gYy5aX0JVRl9FUlJPUiAmJiBhbGxvd0J1ZkVycm9yID09PSB0cnVlKSB7XG4gICAgICBzdGF0dXMgPSBjLlpfT0s7XG4gICAgICBhbGxvd0J1ZkVycm9yID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHN0YXR1cyAhPT0gYy5aX1NUUkVBTV9FTkQgJiYgc3RhdHVzICE9PSBjLlpfT0spIHtcbiAgICAgIHRoaXMub25FbmQoc3RhdHVzKTtcbiAgICAgIHRoaXMuZW5kZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzdHJtLm5leHRfb3V0KSB7XG4gICAgICBpZiAoc3RybS5hdmFpbF9vdXQgPT09IDAgfHwgc3RhdHVzID09PSBjLlpfU1RSRUFNX0VORCB8fCAoc3RybS5hdmFpbF9pbiA9PT0gMCAmJiAoX21vZGUgPT09IGMuWl9GSU5JU0ggfHwgX21vZGUgPT09IGMuWl9TWU5DX0ZMVVNIKSkpIHtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnRvID09PSAnc3RyaW5nJykge1xuXG4gICAgICAgICAgbmV4dF9vdXRfdXRmOCA9IHN0cmluZ3MudXRmOGJvcmRlcihzdHJtLm91dHB1dCwgc3RybS5uZXh0X291dCk7XG5cbiAgICAgICAgICB0YWlsID0gc3RybS5uZXh0X291dCAtIG5leHRfb3V0X3V0Zjg7XG4gICAgICAgICAgdXRmOHN0ciA9IHN0cmluZ3MuYnVmMnN0cmluZyhzdHJtLm91dHB1dCwgbmV4dF9vdXRfdXRmOCk7XG5cbiAgICAgICAgICAvLyBtb3ZlIHRhaWxcbiAgICAgICAgICBzdHJtLm5leHRfb3V0ID0gdGFpbDtcbiAgICAgICAgICBzdHJtLmF2YWlsX291dCA9IGNodW5rU2l6ZSAtIHRhaWw7XG4gICAgICAgICAgaWYgKHRhaWwpIHsgdXRpbHMuYXJyYXlTZXQoc3RybS5vdXRwdXQsIHN0cm0ub3V0cHV0LCBuZXh0X291dF91dGY4LCB0YWlsLCAwKTsgfVxuXG4gICAgICAgICAgdGhpcy5vbkRhdGEodXRmOHN0cik7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9uRGF0YSh1dGlscy5zaHJpbmtCdWYoc3RybS5vdXRwdXQsIHN0cm0ubmV4dF9vdXQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdoZW4gbm8gbW9yZSBpbnB1dCBkYXRhLCB3ZSBzaG91bGQgY2hlY2sgdGhhdCBpbnRlcm5hbCBpbmZsYXRlIGJ1ZmZlcnNcbiAgICAvLyBhcmUgZmx1c2hlZC4gVGhlIG9ubHkgd2F5IHRvIGRvIGl0IHdoZW4gYXZhaWxfb3V0ID0gMCAtIHJ1biBvbmUgbW9yZVxuICAgIC8vIGluZmxhdGUgcGFzcy4gQnV0IGlmIG91dHB1dCBkYXRhIG5vdCBleGlzdHMsIGluZmxhdGUgcmV0dXJuIFpfQlVGX0VSUk9SLlxuICAgIC8vIEhlcmUgd2Ugc2V0IGZsYWcgdG8gcHJvY2VzcyB0aGlzIGVycm9yIHByb3Blcmx5LlxuICAgIC8vXG4gICAgLy8gTk9URS4gRGVmbGF0ZSBkb2VzIG5vdCByZXR1cm4gZXJyb3IgaW4gdGhpcyBjYXNlIGFuZCBkb2VzIG5vdCBuZWVkcyBzdWNoXG4gICAgLy8gbG9naWMuXG4gICAgaWYgKHN0cm0uYXZhaWxfaW4gPT09IDAgJiYgc3RybS5hdmFpbF9vdXQgPT09IDApIHtcbiAgICAgIGFsbG93QnVmRXJyb3IgPSB0cnVlO1xuICAgIH1cblxuICB9IHdoaWxlICgoc3RybS5hdmFpbF9pbiA+IDAgfHwgc3RybS5hdmFpbF9vdXQgPT09IDApICYmIHN0YXR1cyAhPT0gYy5aX1NUUkVBTV9FTkQpO1xuXG4gIGlmIChzdGF0dXMgPT09IGMuWl9TVFJFQU1fRU5EKSB7XG4gICAgX21vZGUgPSBjLlpfRklOSVNIO1xuICB9XG5cbiAgLy8gRmluYWxpemUgb24gdGhlIGxhc3QgY2h1bmsuXG4gIGlmIChfbW9kZSA9PT0gYy5aX0ZJTklTSCkge1xuICAgIHN0YXR1cyA9IHpsaWJfaW5mbGF0ZS5pbmZsYXRlRW5kKHRoaXMuc3RybSk7XG4gICAgdGhpcy5vbkVuZChzdGF0dXMpO1xuICAgIHRoaXMuZW5kZWQgPSB0cnVlO1xuICAgIHJldHVybiBzdGF0dXMgPT09IGMuWl9PSztcbiAgfVxuXG4gIC8vIGNhbGxiYWNrIGludGVyaW0gcmVzdWx0cyBpZiBaX1NZTkNfRkxVU0guXG4gIGlmIChfbW9kZSA9PT0gYy5aX1NZTkNfRkxVU0gpIHtcbiAgICB0aGlzLm9uRW5kKGMuWl9PSyk7XG4gICAgc3RybS5hdmFpbF9vdXQgPSAwO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5cbi8qKlxuICogSW5mbGF0ZSNvbkRhdGEoY2h1bmspIC0+IFZvaWRcbiAqIC0gY2h1bmsgKFVpbnQ4QXJyYXl8QXJyYXl8U3RyaW5nKTogb3V0cHV0IGRhdGEuIFR5cGUgb2YgYXJyYXkgZGVwZW5kc1xuICogICBvbiBqcyBlbmdpbmUgc3VwcG9ydC4gV2hlbiBzdHJpbmcgb3V0cHV0IHJlcXVlc3RlZCwgZWFjaCBjaHVua1xuICogICB3aWxsIGJlIHN0cmluZy5cbiAqXG4gKiBCeSBkZWZhdWx0LCBzdG9yZXMgZGF0YSBibG9ja3MgaW4gYGNodW5rc1tdYCBwcm9wZXJ0eSBhbmQgZ2x1ZVxuICogdGhvc2UgaW4gYG9uRW5kYC4gT3ZlcnJpZGUgdGhpcyBoYW5kbGVyLCBpZiB5b3UgbmVlZCBhbm90aGVyIGJlaGF2aW91ci5cbiAqKi9cbkluZmxhdGUucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uIChjaHVuaykge1xuICB0aGlzLmNodW5rcy5wdXNoKGNodW5rKTtcbn07XG5cblxuLyoqXG4gKiBJbmZsYXRlI29uRW5kKHN0YXR1cykgLT4gVm9pZFxuICogLSBzdGF0dXMgKE51bWJlcik6IGluZmxhdGUgc3RhdHVzLiAwIChaX09LKSBvbiBzdWNjZXNzLFxuICogICBvdGhlciBpZiBub3QuXG4gKlxuICogQ2FsbGVkIGVpdGhlciBhZnRlciB5b3UgdGVsbCBpbmZsYXRlIHRoYXQgdGhlIGlucHV0IHN0cmVhbSBpc1xuICogY29tcGxldGUgKFpfRklOSVNIKSBvciBzaG91bGQgYmUgZmx1c2hlZCAoWl9TWU5DX0ZMVVNIKVxuICogb3IgaWYgYW4gZXJyb3IgaGFwcGVuZWQuIEJ5IGRlZmF1bHQgLSBqb2luIGNvbGxlY3RlZCBjaHVua3MsXG4gKiBmcmVlIG1lbW9yeSBhbmQgZmlsbCBgcmVzdWx0c2AgLyBgZXJyYCBwcm9wZXJ0aWVzLlxuICoqL1xuSW5mbGF0ZS5wcm90b3R5cGUub25FbmQgPSBmdW5jdGlvbiAoc3RhdHVzKSB7XG4gIC8vIE9uIHN1Y2Nlc3MgLSBqb2luXG4gIGlmIChzdGF0dXMgPT09IGMuWl9PSykge1xuICAgIGlmICh0aGlzLm9wdGlvbnMudG8gPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBHbHVlICYgY29udmVydCBoZXJlLCB1bnRpbCB3ZSB0ZWFjaCBwYWtvIHRvIHNlbmRcbiAgICAgIC8vIHV0ZjggYWxpZ25lZCBzdHJpbmdzIHRvIG9uRGF0YVxuICAgICAgdGhpcy5yZXN1bHQgPSB0aGlzLmNodW5rcy5qb2luKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXN1bHQgPSB1dGlscy5mbGF0dGVuQ2h1bmtzKHRoaXMuY2h1bmtzKTtcbiAgICB9XG4gIH1cbiAgdGhpcy5jaHVua3MgPSBbXTtcbiAgdGhpcy5lcnIgPSBzdGF0dXM7XG4gIHRoaXMubXNnID0gdGhpcy5zdHJtLm1zZztcbn07XG5cblxuLyoqXG4gKiBpbmZsYXRlKGRhdGFbLCBvcHRpb25zXSkgLT4gVWludDhBcnJheXxBcnJheXxTdHJpbmdcbiAqIC0gZGF0YSAoVWludDhBcnJheXxBcnJheXxTdHJpbmcpOiBpbnB1dCBkYXRhIHRvIGRlY29tcHJlc3MuXG4gKiAtIG9wdGlvbnMgKE9iamVjdCk6IHpsaWIgaW5mbGF0ZSBvcHRpb25zLlxuICpcbiAqIERlY29tcHJlc3MgYGRhdGFgIHdpdGggaW5mbGF0ZS91bmd6aXAgYW5kIGBvcHRpb25zYC4gQXV0b2RldGVjdFxuICogZm9ybWF0IHZpYSB3cmFwcGVyIGhlYWRlciBieSBkZWZhdWx0LiBUaGF0J3Mgd2h5IHdlIGRvbid0IHByb3ZpZGVcbiAqIHNlcGFyYXRlIGB1bmd6aXBgIG1ldGhvZC5cbiAqXG4gKiBTdXBwb3J0ZWQgb3B0aW9ucyBhcmU6XG4gKlxuICogLSB3aW5kb3dCaXRzXG4gKlxuICogW2h0dHA6Ly96bGliLm5ldC9tYW51YWwuaHRtbCNBZHZhbmNlZF0oaHR0cDovL3psaWIubmV0L21hbnVhbC5odG1sI0FkdmFuY2VkKVxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogU3VnYXIgKG9wdGlvbnMpOlxuICpcbiAqIC0gYHJhd2AgKEJvb2xlYW4pIC0gc2F5IHRoYXQgd2Ugd29yayB3aXRoIHJhdyBzdHJlYW0sIGlmIHlvdSBkb24ndCB3aXNoIHRvIHNwZWNpZnlcbiAqICAgbmVnYXRpdmUgd2luZG93Qml0cyBpbXBsaWNpdGx5LlxuICogLSBgdG9gIChTdHJpbmcpIC0gaWYgZXF1YWwgdG8gJ3N0cmluZycsIHRoZW4gcmVzdWx0IHdpbGwgYmUgY29udmVydGVkXG4gKiAgIGZyb20gdXRmOCB0byB1dGYxNiAoamF2YXNjcmlwdCkgc3RyaW5nLiBXaGVuIHN0cmluZyBvdXRwdXQgcmVxdWVzdGVkLFxuICogICBjaHVuayBsZW5ndGggY2FuIGRpZmZlciBmcm9tIGBjaHVua1NpemVgLCBkZXBlbmRpbmcgb24gY29udGVudC5cbiAqXG4gKlxuICogIyMjIyMgRXhhbXBsZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiB2YXIgcGFrbyA9IHJlcXVpcmUoJ3Bha28nKVxuICogICAsIGlucHV0ID0gcGFrby5kZWZsYXRlKFsxLDIsMyw0LDUsNiw3LDgsOV0pXG4gKiAgICwgb3V0cHV0O1xuICpcbiAqIHRyeSB7XG4gKiAgIG91dHB1dCA9IHBha28uaW5mbGF0ZShpbnB1dCk7XG4gKiB9IGNhdGNoIChlcnIpXG4gKiAgIGNvbnNvbGUubG9nKGVycik7XG4gKiB9XG4gKiBgYGBcbiAqKi9cbmZ1bmN0aW9uIGluZmxhdGUoaW5wdXQsIG9wdGlvbnMpIHtcbiAgdmFyIGluZmxhdG9yID0gbmV3IEluZmxhdGUob3B0aW9ucyk7XG5cbiAgaW5mbGF0b3IucHVzaChpbnB1dCwgdHJ1ZSk7XG5cbiAgLy8gVGhhdCB3aWxsIG5ldmVyIGhhcHBlbnMsIGlmIHlvdSBkb24ndCBjaGVhdCB3aXRoIG9wdGlvbnMgOilcbiAgaWYgKGluZmxhdG9yLmVycikgeyB0aHJvdyBpbmZsYXRvci5tc2cgfHwgbXNnW2luZmxhdG9yLmVycl07IH1cblxuICByZXR1cm4gaW5mbGF0b3IucmVzdWx0O1xufVxuXG5cbi8qKlxuICogaW5mbGF0ZVJhdyhkYXRhWywgb3B0aW9uc10pIC0+IFVpbnQ4QXJyYXl8QXJyYXl8U3RyaW5nXG4gKiAtIGRhdGEgKFVpbnQ4QXJyYXl8QXJyYXl8U3RyaW5nKTogaW5wdXQgZGF0YSB0byBkZWNvbXByZXNzLlxuICogLSBvcHRpb25zIChPYmplY3QpOiB6bGliIGluZmxhdGUgb3B0aW9ucy5cbiAqXG4gKiBUaGUgc2FtZSBhcyBbW2luZmxhdGVdXSwgYnV0IGNyZWF0ZXMgcmF3IGRhdGEsIHdpdGhvdXQgd3JhcHBlclxuICogKGhlYWRlciBhbmQgYWRsZXIzMiBjcmMpLlxuICoqL1xuZnVuY3Rpb24gaW5mbGF0ZVJhdyhpbnB1dCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgb3B0aW9ucy5yYXcgPSB0cnVlO1xuICByZXR1cm4gaW5mbGF0ZShpbnB1dCwgb3B0aW9ucyk7XG59XG5cblxuLyoqXG4gKiB1bmd6aXAoZGF0YVssIG9wdGlvbnNdKSAtPiBVaW50OEFycmF5fEFycmF5fFN0cmluZ1xuICogLSBkYXRhIChVaW50OEFycmF5fEFycmF5fFN0cmluZyk6IGlucHV0IGRhdGEgdG8gZGVjb21wcmVzcy5cbiAqIC0gb3B0aW9ucyAoT2JqZWN0KTogemxpYiBpbmZsYXRlIG9wdGlvbnMuXG4gKlxuICogSnVzdCBzaG9ydGN1dCB0byBbW2luZmxhdGVdXSwgYmVjYXVzZSBpdCBhdXRvZGV0ZWN0cyBmb3JtYXRcbiAqIGJ5IGhlYWRlci5jb250ZW50LiBEb25lIGZvciBjb252ZW5pZW5jZS5cbiAqKi9cblxuXG5leHBvcnRzLkluZmxhdGUgPSBJbmZsYXRlO1xuZXhwb3J0cy5pbmZsYXRlID0gaW5mbGF0ZTtcbmV4cG9ydHMuaW5mbGF0ZVJhdyA9IGluZmxhdGVSYXc7XG5leHBvcnRzLnVuZ3ppcCAgPSBpbmZsYXRlO1xuIiwgIi8vIFRvcCBsZXZlbCBmaWxlIGlzIGp1c3QgYSBtaXhpbiBvZiBzdWJtb2R1bGVzICYgY29uc3RhbnRzXG4ndXNlIHN0cmljdCc7XG5cbnZhciBhc3NpZ24gICAgPSByZXF1aXJlKCcuL2xpYi91dGlscy9jb21tb24nKS5hc3NpZ247XG5cbnZhciBkZWZsYXRlICAgPSByZXF1aXJlKCcuL2xpYi9kZWZsYXRlJyk7XG52YXIgaW5mbGF0ZSAgID0gcmVxdWlyZSgnLi9saWIvaW5mbGF0ZScpO1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vbGliL3psaWIvY29uc3RhbnRzJyk7XG5cbnZhciBwYWtvID0ge307XG5cbmFzc2lnbihwYWtvLCBkZWZsYXRlLCBpbmZsYXRlLCBjb25zdGFudHMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBha287XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyIFVTRV9UWVBFREFSUkFZID0gKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJykgJiYgKHR5cGVvZiBVaW50MTZBcnJheSAhPT0gJ3VuZGVmaW5lZCcpICYmICh0eXBlb2YgVWludDMyQXJyYXkgIT09ICd1bmRlZmluZWQnKTtcblxudmFyIHBha28gPSByZXF1aXJlKFwicGFrb1wiKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xudmFyIEdlbmVyaWNXb3JrZXIgPSByZXF1aXJlKFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiKTtcblxudmFyIEFSUkFZX1RZUEUgPSBVU0VfVFlQRURBUlJBWSA/IFwidWludDhhcnJheVwiIDogXCJhcnJheVwiO1xuXG5leHBvcnRzLm1hZ2ljID0gXCJcXHgwOFxceDAwXCI7XG5cbi8qKlxuICogQ3JlYXRlIGEgd29ya2VyIHRoYXQgdXNlcyBwYWtvIHRvIGluZmxhdGUvZGVmbGF0ZS5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvbiB0aGUgbmFtZSBvZiB0aGUgcGFrbyBmdW5jdGlvbiB0byBjYWxsIDogZWl0aGVyIFwiRGVmbGF0ZVwiIG9yIFwiSW5mbGF0ZVwiLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgdGhlIG9wdGlvbnMgdG8gdXNlIHdoZW4gKGRlKWNvbXByZXNzaW5nLlxuICovXG5mdW5jdGlvbiBGbGF0ZVdvcmtlcihhY3Rpb24sIG9wdGlvbnMpIHtcbiAgICBHZW5lcmljV29ya2VyLmNhbGwodGhpcywgXCJGbGF0ZVdvcmtlci9cIiArIGFjdGlvbik7XG5cbiAgICB0aGlzLl9wYWtvID0gbnVsbDtcbiAgICB0aGlzLl9wYWtvQWN0aW9uID0gYWN0aW9uO1xuICAgIHRoaXMuX3Bha29PcHRpb25zID0gb3B0aW9ucztcbiAgICAvLyB0aGUgYG1ldGFgIG9iamVjdCBmcm9tIHRoZSBsYXN0IGNodW5rIHJlY2VpdmVkXG4gICAgLy8gdGhpcyBhbGxvdyB0aGlzIHdvcmtlciB0byBwYXNzIGFyb3VuZCBtZXRhZGF0YVxuICAgIHRoaXMubWV0YSA9IHt9O1xufVxuXG51dGlscy5pbmhlcml0cyhGbGF0ZVdvcmtlciwgR2VuZXJpY1dvcmtlcik7XG5cbi8qKlxuICogQHNlZSBHZW5lcmljV29ya2VyLnByb2Nlc3NDaHVua1xuICovXG5GbGF0ZVdvcmtlci5wcm90b3R5cGUucHJvY2Vzc0NodW5rID0gZnVuY3Rpb24gKGNodW5rKSB7XG4gICAgdGhpcy5tZXRhID0gY2h1bmsubWV0YTtcbiAgICBpZiAodGhpcy5fcGFrbyA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9jcmVhdGVQYWtvKCk7XG4gICAgfVxuICAgIHRoaXMuX3Bha28ucHVzaCh1dGlscy50cmFuc2Zvcm1UbyhBUlJBWV9UWVBFLCBjaHVuay5kYXRhKSwgZmFsc2UpO1xufTtcblxuLyoqXG4gKiBAc2VlIEdlbmVyaWNXb3JrZXIuZmx1c2hcbiAqL1xuRmxhdGVXb3JrZXIucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgIEdlbmVyaWNXb3JrZXIucHJvdG90eXBlLmZsdXNoLmNhbGwodGhpcyk7XG4gICAgaWYgKHRoaXMuX3Bha28gPT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5fY3JlYXRlUGFrbygpO1xuICAgIH1cbiAgICB0aGlzLl9wYWtvLnB1c2goW10sIHRydWUpO1xufTtcbi8qKlxuICogQHNlZSBHZW5lcmljV29ya2VyLmNsZWFuVXBcbiAqL1xuRmxhdGVXb3JrZXIucHJvdG90eXBlLmNsZWFuVXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgR2VuZXJpY1dvcmtlci5wcm90b3R5cGUuY2xlYW5VcC5jYWxsKHRoaXMpO1xuICAgIHRoaXMuX3Bha28gPSBudWxsO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgdGhlIF9wYWtvIG9iamVjdC5cbiAqIFRPRE86IGxhenktbG9hZGluZyB0aGlzIG9iamVjdCBpc24ndCB0aGUgYmVzdCBzb2x1dGlvbiBidXQgaXQncyB0aGVcbiAqIHF1aWNrZXN0LiBUaGUgYmVzdCBzb2x1dGlvbiBpcyB0byBsYXp5LWxvYWQgdGhlIHdvcmtlciBsaXN0LiBTZWUgYWxzbyB0aGVcbiAqIGlzc3VlICM0NDYuXG4gKi9cbkZsYXRlV29ya2VyLnByb3RvdHlwZS5fY3JlYXRlUGFrbyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9wYWtvID0gbmV3IHBha29bdGhpcy5fcGFrb0FjdGlvbl0oe1xuICAgICAgICByYXc6IHRydWUsXG4gICAgICAgIGxldmVsOiB0aGlzLl9wYWtvT3B0aW9ucy5sZXZlbCB8fCAtMSAvLyBkZWZhdWx0IGNvbXByZXNzaW9uXG4gICAgfSk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuX3Bha28ub25EYXRhID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBzZWxmLnB1c2goe1xuICAgICAgICAgICAgZGF0YSA6IGRhdGEsXG4gICAgICAgICAgICBtZXRhIDogc2VsZi5tZXRhXG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuXG5leHBvcnRzLmNvbXByZXNzV29ya2VyID0gZnVuY3Rpb24gKGNvbXByZXNzaW9uT3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgRmxhdGVXb3JrZXIoXCJEZWZsYXRlXCIsIGNvbXByZXNzaW9uT3B0aW9ucyk7XG59O1xuZXhwb3J0cy51bmNvbXByZXNzV29ya2VyID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBuZXcgRmxhdGVXb3JrZXIoXCJJbmZsYXRlXCIsIHt9KTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2VuZXJpY1dvcmtlciA9IHJlcXVpcmUoXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCIpO1xuXG5leHBvcnRzLlNUT1JFID0ge1xuICAgIG1hZ2ljOiBcIlxceDAwXFx4MDBcIixcbiAgICBjb21wcmVzc1dvcmtlciA6IGZ1bmN0aW9uIChjb21wcmVzc2lvbk9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmljV29ya2VyKFwiU1RPUkUgY29tcHJlc3Npb25cIik7XG4gICAgfSxcbiAgICB1bmNvbXByZXNzV29ya2VyIDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IEdlbmVyaWNXb3JrZXIoXCJTVE9SRSBkZWNvbXByZXNzaW9uXCIpO1xuICAgIH1cbn07XG5leHBvcnRzLkRFRkxBVEUgPSByZXF1aXJlKCcuL2ZsYXRlJyk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuZXhwb3J0cy5MT0NBTF9GSUxFX0hFQURFUiA9IFwiUEtcXHgwM1xceDA0XCI7XG5leHBvcnRzLkNFTlRSQUxfRklMRV9IRUFERVIgPSBcIlBLXFx4MDFcXHgwMlwiO1xuZXhwb3J0cy5DRU5UUkFMX0RJUkVDVE9SWV9FTkQgPSBcIlBLXFx4MDVcXHgwNlwiO1xuZXhwb3J0cy5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9MT0NBVE9SID0gXCJQS1xceDA2XFx4MDdcIjtcbmV4cG9ydHMuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfRU5EID0gXCJQS1xceDA2XFx4MDZcIjtcbmV4cG9ydHMuREFUQV9ERVNDUklQVE9SID0gXCJQS1xceDA3XFx4MDhcIjtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgR2VuZXJpY1dvcmtlciA9IHJlcXVpcmUoJy4uL3N0cmVhbS9HZW5lcmljV29ya2VyJyk7XG52YXIgdXRmOCA9IHJlcXVpcmUoJy4uL3V0ZjgnKTtcbnZhciBjcmMzMiA9IHJlcXVpcmUoJy4uL2NyYzMyJyk7XG52YXIgc2lnbmF0dXJlID0gcmVxdWlyZSgnLi4vc2lnbmF0dXJlJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIGFuIGludGVnZXIgaW50byBhIHN0cmluZyBpbiBoZXhhZGVjaW1hbC5cbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gZGVjIHRoZSBudW1iZXIgdG8gY29udmVydC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBieXRlcyB0aGUgbnVtYmVyIG9mIGJ5dGVzIHRvIGdlbmVyYXRlLlxuICogQHJldHVybnMge3N0cmluZ30gdGhlIHJlc3VsdC5cbiAqL1xudmFyIGRlY1RvSGV4ID0gZnVuY3Rpb24oZGVjLCBieXRlcykge1xuICAgIHZhciBoZXggPSBcIlwiLCBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBieXRlczsgaSsrKSB7XG4gICAgICAgIGhleCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGRlYyAmIDB4ZmYpO1xuICAgICAgICBkZWMgPSBkZWMgPj4+IDg7XG4gICAgfVxuICAgIHJldHVybiBoZXg7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIHRoZSBVTklYIHBhcnQgb2YgdGhlIGV4dGVybmFsIGZpbGUgYXR0cmlidXRlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSB1bml4UGVybWlzc2lvbnMgdGhlIHVuaXggcGVybWlzc2lvbnMgb3IgbnVsbC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNEaXIgdHJ1ZSBpZiB0aGUgZW50cnkgaXMgYSBkaXJlY3RvcnksIGZhbHNlIG90aGVyd2lzZS5cbiAqIEByZXR1cm4ge051bWJlcn0gYSAzMiBiaXQgaW50ZWdlci5cbiAqXG4gKiBhZGFwdGVkIGZyb20gaHR0cDovL3VuaXguc3RhY2tleGNoYW5nZS5jb20vcXVlc3Rpb25zLzE0NzA1L3RoZS16aXAtZm9ybWF0cy1leHRlcm5hbC1maWxlLWF0dHJpYnV0ZSA6XG4gKlxuICogVFRUVHNzdHJ3eHJ3eHJ3eDAwMDAwMDAwMDBBRFZTSFJcbiAqIF5eXl5fX19fX19fX19fX19fX19fX19fX19fX19fX19fIGZpbGUgdHlwZSwgc2VlIHppcGluZm8uYyAoVU5YXyopXG4gKiAgICAgXl5eX19fX19fX19fX19fX19fX19fX19fX19fXyBzZXR1aWQsIHNldGdpZCwgc3RpY2t5XG4gKiAgICAgICAgXl5eXl5eXl5eX19fX19fX19fX19fX19fXyBwZXJtaXNzaW9uc1xuICogICAgICAgICAgICAgICAgIF5eXl5eXl5eXl5fX19fX18gbm90IHVzZWQgP1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICBeXl5eXl4gRE9TIGF0dHJpYnV0ZSBiaXRzIDogQXJjaGl2ZSwgRGlyZWN0b3J5LCBWb2x1bWUgbGFiZWwsIFN5c3RlbSBmaWxlLCBIaWRkZW4sIFJlYWQgb25seVxuICovXG52YXIgZ2VuZXJhdGVVbml4RXh0ZXJuYWxGaWxlQXR0ciA9IGZ1bmN0aW9uICh1bml4UGVybWlzc2lvbnMsIGlzRGlyKSB7XG5cbiAgICB2YXIgcmVzdWx0ID0gdW5peFBlcm1pc3Npb25zO1xuICAgIGlmICghdW5peFBlcm1pc3Npb25zKSB7XG4gICAgICAgIC8vIEkgY2FuJ3QgdXNlIG9jdGFsIHZhbHVlcyBpbiBzdHJpY3QgbW9kZSwgaGVuY2UgdGhlIGhleGEuXG4gICAgICAgIC8vICAwNDA3NzUgPT4gMHg0MWZkXG4gICAgICAgIC8vIDAxMDA2NjQgPT4gMHg4MWI0XG4gICAgICAgIHJlc3VsdCA9IGlzRGlyID8gMHg0MWZkIDogMHg4MWI0O1xuICAgIH1cbiAgICByZXR1cm4gKHJlc3VsdCAmIDB4RkZGRikgPDwgMTY7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIHRoZSBET1MgcGFydCBvZiB0aGUgZXh0ZXJuYWwgZmlsZSBhdHRyaWJ1dGVzLlxuICogQHBhcmFtIHtPYmplY3R9IGRvc1Blcm1pc3Npb25zIHRoZSBkb3MgcGVybWlzc2lvbnMgb3IgbnVsbC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNEaXIgdHJ1ZSBpZiB0aGUgZW50cnkgaXMgYSBkaXJlY3RvcnksIGZhbHNlIG90aGVyd2lzZS5cbiAqIEByZXR1cm4ge051bWJlcn0gYSAzMiBiaXQgaW50ZWdlci5cbiAqXG4gKiBCaXQgMCAgICAgUmVhZC1Pbmx5XG4gKiBCaXQgMSAgICAgSGlkZGVuXG4gKiBCaXQgMiAgICAgU3lzdGVtXG4gKiBCaXQgMyAgICAgVm9sdW1lIExhYmVsXG4gKiBCaXQgNCAgICAgRGlyZWN0b3J5XG4gKiBCaXQgNSAgICAgQXJjaGl2ZVxuICovXG52YXIgZ2VuZXJhdGVEb3NFeHRlcm5hbEZpbGVBdHRyID0gZnVuY3Rpb24gKGRvc1Blcm1pc3Npb25zLCBpc0Rpcikge1xuXG4gICAgLy8gdGhlIGRpciBmbGFnIGlzIGFscmVhZHkgc2V0IGZvciBjb21wYXRpYmlsaXR5XG4gICAgcmV0dXJuIChkb3NQZXJtaXNzaW9ucyB8fCAwKSAgJiAweDNGO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSB0aGUgdmFyaW91cyBwYXJ0cyB1c2VkIGluIHRoZSBjb25zdHJ1Y3Rpb24gb2YgdGhlIGZpbmFsIHppcCBmaWxlLlxuICogQHBhcmFtIHtPYmplY3R9IHN0cmVhbUluZm8gdGhlIGhhc2ggd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY29tcHJlc3NlZCBmaWxlLlxuICogQHBhcmFtIHtCb29sZWFufSBzdHJlYW1lZENvbnRlbnQgaXMgdGhlIGNvbnRlbnQgc3RyZWFtZWQgP1xuICogQHBhcmFtIHtCb29sZWFufSBzdHJlYW1pbmdFbmRlZCBpcyB0aGUgc3RyZWFtIGZpbmlzaGVkID9cbiAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgdGhlIGN1cnJlbnQgb2Zmc2V0IGZyb20gdGhlIHN0YXJ0IG9mIHRoZSB6aXAgZmlsZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwbGF0Zm9ybSBsZXQncyBwcmV0ZW5kIHdlIGFyZSB0aGlzIHBsYXRmb3JtIChjaGFuZ2UgcGxhdGZvcm0gZGVwZW5kZW50cyBmaWVsZHMpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlbmNvZGVGaWxlTmFtZSB0aGUgZnVuY3Rpb24gdG8gZW5jb2RlIHRoZSBmaWxlIG5hbWUgLyBjb21tZW50LlxuICogQHJldHVybiB7T2JqZWN0fSB0aGUgemlwIHBhcnRzLlxuICovXG52YXIgZ2VuZXJhdGVaaXBQYXJ0cyA9IGZ1bmN0aW9uKHN0cmVhbUluZm8sIHN0cmVhbWVkQ29udGVudCwgc3RyZWFtaW5nRW5kZWQsIG9mZnNldCwgcGxhdGZvcm0sIGVuY29kZUZpbGVOYW1lKSB7XG4gICAgdmFyIGZpbGUgPSBzdHJlYW1JbmZvWydmaWxlJ10sXG4gICAgY29tcHJlc3Npb24gPSBzdHJlYW1JbmZvWydjb21wcmVzc2lvbiddLFxuICAgIHVzZUN1c3RvbUVuY29kaW5nID0gZW5jb2RlRmlsZU5hbWUgIT09IHV0ZjgudXRmOGVuY29kZSxcbiAgICBlbmNvZGVkRmlsZU5hbWUgPSB1dGlscy50cmFuc2Zvcm1UbyhcInN0cmluZ1wiLCBlbmNvZGVGaWxlTmFtZShmaWxlLm5hbWUpKSxcbiAgICB1dGZFbmNvZGVkRmlsZU5hbWUgPSB1dGlscy50cmFuc2Zvcm1UbyhcInN0cmluZ1wiLCB1dGY4LnV0ZjhlbmNvZGUoZmlsZS5uYW1lKSksXG4gICAgY29tbWVudCA9IGZpbGUuY29tbWVudCxcbiAgICBlbmNvZGVkQ29tbWVudCA9IHV0aWxzLnRyYW5zZm9ybVRvKFwic3RyaW5nXCIsIGVuY29kZUZpbGVOYW1lKGNvbW1lbnQpKSxcbiAgICB1dGZFbmNvZGVkQ29tbWVudCA9IHV0aWxzLnRyYW5zZm9ybVRvKFwic3RyaW5nXCIsIHV0ZjgudXRmOGVuY29kZShjb21tZW50KSksXG4gICAgdXNlVVRGOEZvckZpbGVOYW1lID0gdXRmRW5jb2RlZEZpbGVOYW1lLmxlbmd0aCAhPT0gZmlsZS5uYW1lLmxlbmd0aCxcbiAgICB1c2VVVEY4Rm9yQ29tbWVudCA9IHV0ZkVuY29kZWRDb21tZW50Lmxlbmd0aCAhPT0gY29tbWVudC5sZW5ndGgsXG4gICAgZG9zVGltZSxcbiAgICBkb3NEYXRlLFxuICAgIGV4dHJhRmllbGRzID0gXCJcIixcbiAgICB1bmljb2RlUGF0aEV4dHJhRmllbGQgPSBcIlwiLFxuICAgIHVuaWNvZGVDb21tZW50RXh0cmFGaWVsZCA9IFwiXCIsXG4gICAgZGlyID0gZmlsZS5kaXIsXG4gICAgZGF0ZSA9IGZpbGUuZGF0ZTtcblxuXG4gICAgdmFyIGRhdGFJbmZvID0ge1xuICAgICAgICBjcmMzMiA6IDAsXG4gICAgICAgIGNvbXByZXNzZWRTaXplIDogMCxcbiAgICAgICAgdW5jb21wcmVzc2VkU2l6ZSA6IDBcbiAgICB9O1xuXG4gICAgLy8gaWYgdGhlIGNvbnRlbnQgaXMgc3RyZWFtZWQsIHRoZSBzaXplcy9jcmMzMiBhcmUgb25seSBhdmFpbGFibGUgQUZURVJcbiAgICAvLyB0aGUgZW5kIG9mIHRoZSBzdHJlYW0uXG4gICAgaWYgKCFzdHJlYW1lZENvbnRlbnQgfHwgc3RyZWFtaW5nRW5kZWQpIHtcbiAgICAgICAgZGF0YUluZm8uY3JjMzIgPSBzdHJlYW1JbmZvWydjcmMzMiddO1xuICAgICAgICBkYXRhSW5mby5jb21wcmVzc2VkU2l6ZSA9IHN0cmVhbUluZm9bJ2NvbXByZXNzZWRTaXplJ107XG4gICAgICAgIGRhdGFJbmZvLnVuY29tcHJlc3NlZFNpemUgPSBzdHJlYW1JbmZvWyd1bmNvbXByZXNzZWRTaXplJ107XG4gICAgfVxuXG4gICAgdmFyIGJpdGZsYWcgPSAwO1xuICAgIGlmIChzdHJlYW1lZENvbnRlbnQpIHtcbiAgICAgICAgLy8gQml0IDM6IHRoZSBzaXplcy9jcmMzMiBhcmUgc2V0IHRvIHplcm8gaW4gdGhlIGxvY2FsIGhlYWRlci5cbiAgICAgICAgLy8gVGhlIGNvcnJlY3QgdmFsdWVzIGFyZSBwdXQgaW4gdGhlIGRhdGEgZGVzY3JpcHRvciBpbW1lZGlhdGVseVxuICAgICAgICAvLyBmb2xsb3dpbmcgdGhlIGNvbXByZXNzZWQgZGF0YS5cbiAgICAgICAgYml0ZmxhZyB8PSAweDAwMDg7XG4gICAgfVxuICAgIGlmICghdXNlQ3VzdG9tRW5jb2RpbmcgJiYgKHVzZVVURjhGb3JGaWxlTmFtZSB8fCB1c2VVVEY4Rm9yQ29tbWVudCkpIHtcbiAgICAgICAgLy8gQml0IDExOiBMYW5ndWFnZSBlbmNvZGluZyBmbGFnIChFRlMpLlxuICAgICAgICBiaXRmbGFnIHw9IDB4MDgwMDtcbiAgICB9XG5cblxuICAgIHZhciBleHRGaWxlQXR0ciA9IDA7XG4gICAgdmFyIHZlcnNpb25NYWRlQnkgPSAwO1xuICAgIGlmIChkaXIpIHtcbiAgICAgICAgLy8gZG9zIG9yIHVuaXgsIHdlIHNldCB0aGUgZG9zIGRpciBmbGFnXG4gICAgICAgIGV4dEZpbGVBdHRyIHw9IDB4MDAwMTA7XG4gICAgfVxuICAgIGlmKHBsYXRmb3JtID09PSBcIlVOSVhcIikge1xuICAgICAgICB2ZXJzaW9uTWFkZUJ5ID0gMHgwMzFFOyAvLyBVTklYLCB2ZXJzaW9uIDMuMFxuICAgICAgICBleHRGaWxlQXR0ciB8PSBnZW5lcmF0ZVVuaXhFeHRlcm5hbEZpbGVBdHRyKGZpbGUudW5peFBlcm1pc3Npb25zLCBkaXIpO1xuICAgIH0gZWxzZSB7IC8vIERPUyBvciBvdGhlciwgZmFsbGJhY2sgdG8gRE9TXG4gICAgICAgIHZlcnNpb25NYWRlQnkgPSAweDAwMTQ7IC8vIERPUywgdmVyc2lvbiAyLjBcbiAgICAgICAgZXh0RmlsZUF0dHIgfD0gZ2VuZXJhdGVEb3NFeHRlcm5hbEZpbGVBdHRyKGZpbGUuZG9zUGVybWlzc2lvbnMsIGRpcik7XG4gICAgfVxuXG4gICAgLy8gZGF0ZVxuICAgIC8vIEBzZWUgaHR0cDovL3d3dy5kZWxvcmllLmNvbS9kamdwcC9kb2MvcmJpbnRlci9pdC81Mi8xMy5odG1sXG4gICAgLy8gQHNlZSBodHRwOi8vd3d3LmRlbG9yaWUuY29tL2RqZ3BwL2RvYy9yYmludGVyL2l0LzY1LzE2Lmh0bWxcbiAgICAvLyBAc2VlIGh0dHA6Ly93d3cuZGVsb3JpZS5jb20vZGpncHAvZG9jL3JiaW50ZXIvaXQvNjYvMTYuaHRtbFxuXG4gICAgZG9zVGltZSA9IGRhdGUuZ2V0VVRDSG91cnMoKTtcbiAgICBkb3NUaW1lID0gZG9zVGltZSA8PCA2O1xuICAgIGRvc1RpbWUgPSBkb3NUaW1lIHwgZGF0ZS5nZXRVVENNaW51dGVzKCk7XG4gICAgZG9zVGltZSA9IGRvc1RpbWUgPDwgNTtcbiAgICBkb3NUaW1lID0gZG9zVGltZSB8IGRhdGUuZ2V0VVRDU2Vjb25kcygpIC8gMjtcblxuICAgIGRvc0RhdGUgPSBkYXRlLmdldFVUQ0Z1bGxZZWFyKCkgLSAxOTgwO1xuICAgIGRvc0RhdGUgPSBkb3NEYXRlIDw8IDQ7XG4gICAgZG9zRGF0ZSA9IGRvc0RhdGUgfCAoZGF0ZS5nZXRVVENNb250aCgpICsgMSk7XG4gICAgZG9zRGF0ZSA9IGRvc0RhdGUgPDwgNTtcbiAgICBkb3NEYXRlID0gZG9zRGF0ZSB8IGRhdGUuZ2V0VVRDRGF0ZSgpO1xuXG4gICAgaWYgKHVzZVVURjhGb3JGaWxlTmFtZSkge1xuICAgICAgICAvLyBzZXQgdGhlIHVuaWNvZGUgcGF0aCBleHRyYSBmaWVsZC4gdW56aXAgbmVlZHMgYXQgbGVhc3Qgb25lIGV4dHJhXG4gICAgICAgIC8vIGZpZWxkIHRvIGNvcnJlY3RseSBoYW5kbGUgdW5pY29kZSBwYXRoLCBzbyB1c2luZyB0aGUgcGF0aCBpcyBhcyBnb29kXG4gICAgICAgIC8vIGFzIGFueSBvdGhlciBpbmZvcm1hdGlvbi4gVGhpcyBjb3VsZCBpbXByb3ZlIHRoZSBzaXR1YXRpb24gd2l0aFxuICAgICAgICAvLyBvdGhlciBhcmNoaXZlIG1hbmFnZXJzIHRvby5cbiAgICAgICAgLy8gVGhpcyBmaWVsZCBpcyB1c3VhbGx5IHVzZWQgd2l0aG91dCB0aGUgdXRmOCBmbGFnLCB3aXRoIGEgbm9uXG4gICAgICAgIC8vIHVuaWNvZGUgcGF0aCBpbiB0aGUgaGVhZGVyICh3aW5yYXIsIHdpbnppcCkuIFRoaXMgaGVscHMgKGEgYml0KVxuICAgICAgICAvLyB3aXRoIHRoZSBtZXNzeSBXaW5kb3dzJyBkZWZhdWx0IGNvbXByZXNzZWQgZm9sZGVycyBmZWF0dXJlIGJ1dFxuICAgICAgICAvLyBicmVha3Mgb24gcDd6aXAgd2hpY2ggZG9lc24ndCBzZWVrIHRoZSB1bmljb2RlIHBhdGggZXh0cmEgZmllbGQuXG4gICAgICAgIC8vIFNvIGZvciBub3csIFVURi04IGV2ZXJ5d2hlcmUgIVxuICAgICAgICB1bmljb2RlUGF0aEV4dHJhRmllbGQgPVxuICAgICAgICAgICAgLy8gVmVyc2lvblxuICAgICAgICAgICAgZGVjVG9IZXgoMSwgMSkgK1xuICAgICAgICAgICAgLy8gTmFtZUNSQzMyXG4gICAgICAgICAgICBkZWNUb0hleChjcmMzMihlbmNvZGVkRmlsZU5hbWUpLCA0KSArXG4gICAgICAgICAgICAvLyBVbmljb2RlTmFtZVxuICAgICAgICAgICAgdXRmRW5jb2RlZEZpbGVOYW1lO1xuXG4gICAgICAgIGV4dHJhRmllbGRzICs9XG4gICAgICAgICAgICAvLyBJbmZvLVpJUCBVbmljb2RlIFBhdGggRXh0cmEgRmllbGRcbiAgICAgICAgICAgIFwiXFx4NzVcXHg3MFwiICtcbiAgICAgICAgICAgIC8vIHNpemVcbiAgICAgICAgICAgIGRlY1RvSGV4KHVuaWNvZGVQYXRoRXh0cmFGaWVsZC5sZW5ndGgsIDIpICtcbiAgICAgICAgICAgIC8vIGNvbnRlbnRcbiAgICAgICAgICAgIHVuaWNvZGVQYXRoRXh0cmFGaWVsZDtcbiAgICB9XG5cbiAgICBpZih1c2VVVEY4Rm9yQ29tbWVudCkge1xuXG4gICAgICAgIHVuaWNvZGVDb21tZW50RXh0cmFGaWVsZCA9XG4gICAgICAgICAgICAvLyBWZXJzaW9uXG4gICAgICAgICAgICBkZWNUb0hleCgxLCAxKSArXG4gICAgICAgICAgICAvLyBDb21tZW50Q1JDMzJcbiAgICAgICAgICAgIGRlY1RvSGV4KGNyYzMyKGVuY29kZWRDb21tZW50KSwgNCkgK1xuICAgICAgICAgICAgLy8gVW5pY29kZU5hbWVcbiAgICAgICAgICAgIHV0ZkVuY29kZWRDb21tZW50O1xuXG4gICAgICAgIGV4dHJhRmllbGRzICs9XG4gICAgICAgICAgICAvLyBJbmZvLVpJUCBVbmljb2RlIFBhdGggRXh0cmEgRmllbGRcbiAgICAgICAgICAgIFwiXFx4NzVcXHg2M1wiICtcbiAgICAgICAgICAgIC8vIHNpemVcbiAgICAgICAgICAgIGRlY1RvSGV4KHVuaWNvZGVDb21tZW50RXh0cmFGaWVsZC5sZW5ndGgsIDIpICtcbiAgICAgICAgICAgIC8vIGNvbnRlbnRcbiAgICAgICAgICAgIHVuaWNvZGVDb21tZW50RXh0cmFGaWVsZDtcbiAgICB9XG5cbiAgICB2YXIgaGVhZGVyID0gXCJcIjtcblxuICAgIC8vIHZlcnNpb24gbmVlZGVkIHRvIGV4dHJhY3RcbiAgICBoZWFkZXIgKz0gXCJcXHgwQVxceDAwXCI7XG4gICAgLy8gZ2VuZXJhbCBwdXJwb3NlIGJpdCBmbGFnXG4gICAgaGVhZGVyICs9IGRlY1RvSGV4KGJpdGZsYWcsIDIpO1xuICAgIC8vIGNvbXByZXNzaW9uIG1ldGhvZFxuICAgIGhlYWRlciArPSBjb21wcmVzc2lvbi5tYWdpYztcbiAgICAvLyBsYXN0IG1vZCBmaWxlIHRpbWVcbiAgICBoZWFkZXIgKz0gZGVjVG9IZXgoZG9zVGltZSwgMik7XG4gICAgLy8gbGFzdCBtb2QgZmlsZSBkYXRlXG4gICAgaGVhZGVyICs9IGRlY1RvSGV4KGRvc0RhdGUsIDIpO1xuICAgIC8vIGNyYy0zMlxuICAgIGhlYWRlciArPSBkZWNUb0hleChkYXRhSW5mby5jcmMzMiwgNCk7XG4gICAgLy8gY29tcHJlc3NlZCBzaXplXG4gICAgaGVhZGVyICs9IGRlY1RvSGV4KGRhdGFJbmZvLmNvbXByZXNzZWRTaXplLCA0KTtcbiAgICAvLyB1bmNvbXByZXNzZWQgc2l6ZVxuICAgIGhlYWRlciArPSBkZWNUb0hleChkYXRhSW5mby51bmNvbXByZXNzZWRTaXplLCA0KTtcbiAgICAvLyBmaWxlIG5hbWUgbGVuZ3RoXG4gICAgaGVhZGVyICs9IGRlY1RvSGV4KGVuY29kZWRGaWxlTmFtZS5sZW5ndGgsIDIpO1xuICAgIC8vIGV4dHJhIGZpZWxkIGxlbmd0aFxuICAgIGhlYWRlciArPSBkZWNUb0hleChleHRyYUZpZWxkcy5sZW5ndGgsIDIpO1xuXG5cbiAgICB2YXIgZmlsZVJlY29yZCA9IHNpZ25hdHVyZS5MT0NBTF9GSUxFX0hFQURFUiArIGhlYWRlciArIGVuY29kZWRGaWxlTmFtZSArIGV4dHJhRmllbGRzO1xuXG4gICAgdmFyIGRpclJlY29yZCA9IHNpZ25hdHVyZS5DRU5UUkFMX0ZJTEVfSEVBREVSICtcbiAgICAgICAgLy8gdmVyc2lvbiBtYWRlIGJ5ICgwMDogRE9TKVxuICAgICAgICBkZWNUb0hleCh2ZXJzaW9uTWFkZUJ5LCAyKSArXG4gICAgICAgIC8vIGZpbGUgaGVhZGVyIChjb21tb24gdG8gZmlsZSBhbmQgY2VudHJhbCBkaXJlY3RvcnkpXG4gICAgICAgIGhlYWRlciArXG4gICAgICAgIC8vIGZpbGUgY29tbWVudCBsZW5ndGhcbiAgICAgICAgZGVjVG9IZXgoZW5jb2RlZENvbW1lbnQubGVuZ3RoLCAyKSArXG4gICAgICAgIC8vIGRpc2sgbnVtYmVyIHN0YXJ0XG4gICAgICAgIFwiXFx4MDBcXHgwMFwiICtcbiAgICAgICAgLy8gaW50ZXJuYWwgZmlsZSBhdHRyaWJ1dGVzIFRPRE9cbiAgICAgICAgXCJcXHgwMFxceDAwXCIgK1xuICAgICAgICAvLyBleHRlcm5hbCBmaWxlIGF0dHJpYnV0ZXNcbiAgICAgICAgZGVjVG9IZXgoZXh0RmlsZUF0dHIsIDQpICtcbiAgICAgICAgLy8gcmVsYXRpdmUgb2Zmc2V0IG9mIGxvY2FsIGhlYWRlclxuICAgICAgICBkZWNUb0hleChvZmZzZXQsIDQpICtcbiAgICAgICAgLy8gZmlsZSBuYW1lXG4gICAgICAgIGVuY29kZWRGaWxlTmFtZSArXG4gICAgICAgIC8vIGV4dHJhIGZpZWxkXG4gICAgICAgIGV4dHJhRmllbGRzICtcbiAgICAgICAgLy8gZmlsZSBjb21tZW50XG4gICAgICAgIGVuY29kZWRDb21tZW50O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmlsZVJlY29yZDogZmlsZVJlY29yZCxcbiAgICAgICAgZGlyUmVjb3JkOiBkaXJSZWNvcmRcbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSB0aGUgRU9DRCByZWNvcmQuXG4gKiBAcGFyYW0ge051bWJlcn0gZW50cmllc0NvdW50IHRoZSBudW1iZXIgb2YgZW50cmllcyBpbiB0aGUgemlwIGZpbGUuXG4gKiBAcGFyYW0ge051bWJlcn0gY2VudHJhbERpckxlbmd0aCB0aGUgbGVuZ3RoIChpbiBieXRlcykgb2YgdGhlIGNlbnRyYWwgZGlyLlxuICogQHBhcmFtIHtOdW1iZXJ9IGxvY2FsRGlyTGVuZ3RoIHRoZSBsZW5ndGggKGluIGJ5dGVzKSBvZiB0aGUgbG9jYWwgZGlyLlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbW1lbnQgdGhlIHppcCBmaWxlIGNvbW1lbnQgYXMgYSBiaW5hcnkgc3RyaW5nLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZW5jb2RlRmlsZU5hbWUgdGhlIGZ1bmN0aW9uIHRvIGVuY29kZSB0aGUgY29tbWVudC5cbiAqIEByZXR1cm4ge1N0cmluZ30gdGhlIEVPQ0QgcmVjb3JkLlxuICovXG52YXIgZ2VuZXJhdGVDZW50cmFsRGlyZWN0b3J5RW5kID0gZnVuY3Rpb24gKGVudHJpZXNDb3VudCwgY2VudHJhbERpckxlbmd0aCwgbG9jYWxEaXJMZW5ndGgsIGNvbW1lbnQsIGVuY29kZUZpbGVOYW1lKSB7XG4gICAgdmFyIGRpckVuZCA9IFwiXCI7XG4gICAgdmFyIGVuY29kZWRDb21tZW50ID0gdXRpbHMudHJhbnNmb3JtVG8oXCJzdHJpbmdcIiwgZW5jb2RlRmlsZU5hbWUoY29tbWVudCkpO1xuXG4gICAgLy8gZW5kIG9mIGNlbnRyYWwgZGlyIHNpZ25hdHVyZVxuICAgIGRpckVuZCA9IHNpZ25hdHVyZS5DRU5UUkFMX0RJUkVDVE9SWV9FTkQgK1xuICAgICAgICAvLyBudW1iZXIgb2YgdGhpcyBkaXNrXG4gICAgICAgIFwiXFx4MDBcXHgwMFwiICtcbiAgICAgICAgLy8gbnVtYmVyIG9mIHRoZSBkaXNrIHdpdGggdGhlIHN0YXJ0IG9mIHRoZSBjZW50cmFsIGRpcmVjdG9yeVxuICAgICAgICBcIlxceDAwXFx4MDBcIiArXG4gICAgICAgIC8vIHRvdGFsIG51bWJlciBvZiBlbnRyaWVzIGluIHRoZSBjZW50cmFsIGRpcmVjdG9yeSBvbiB0aGlzIGRpc2tcbiAgICAgICAgZGVjVG9IZXgoZW50cmllc0NvdW50LCAyKSArXG4gICAgICAgIC8vIHRvdGFsIG51bWJlciBvZiBlbnRyaWVzIGluIHRoZSBjZW50cmFsIGRpcmVjdG9yeVxuICAgICAgICBkZWNUb0hleChlbnRyaWVzQ291bnQsIDIpICtcbiAgICAgICAgLy8gc2l6ZSBvZiB0aGUgY2VudHJhbCBkaXJlY3RvcnkgICA0IGJ5dGVzXG4gICAgICAgIGRlY1RvSGV4KGNlbnRyYWxEaXJMZW5ndGgsIDQpICtcbiAgICAgICAgLy8gb2Zmc2V0IG9mIHN0YXJ0IG9mIGNlbnRyYWwgZGlyZWN0b3J5IHdpdGggcmVzcGVjdCB0byB0aGUgc3RhcnRpbmcgZGlzayBudW1iZXJcbiAgICAgICAgZGVjVG9IZXgobG9jYWxEaXJMZW5ndGgsIDQpICtcbiAgICAgICAgLy8gLlpJUCBmaWxlIGNvbW1lbnQgbGVuZ3RoXG4gICAgICAgIGRlY1RvSGV4KGVuY29kZWRDb21tZW50Lmxlbmd0aCwgMikgK1xuICAgICAgICAvLyAuWklQIGZpbGUgY29tbWVudFxuICAgICAgICBlbmNvZGVkQ29tbWVudDtcblxuICAgIHJldHVybiBkaXJFbmQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIGRhdGEgZGVzY3JpcHRvcnMgZm9yIGEgZmlsZSBlbnRyeS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHJlYW1JbmZvIHRoZSBoYXNoIGdlbmVyYXRlZCBieSBhIHdvcmtlciwgY29udGFpbmluZyBpbmZvcm1hdGlvblxuICogb24gdGhlIGZpbGUgZW50cnkuXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBkYXRhIGRlc2NyaXB0b3JzLlxuICovXG52YXIgZ2VuZXJhdGVEYXRhRGVzY3JpcHRvcnMgPSBmdW5jdGlvbiAoc3RyZWFtSW5mbykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gXCJcIjtcbiAgICBkZXNjcmlwdG9yID0gc2lnbmF0dXJlLkRBVEFfREVTQ1JJUFRPUiArXG4gICAgICAgIC8vIGNyYy0zMiAgICAgICAgICAgICAgICAgICAgICAgICAgNCBieXRlc1xuICAgICAgICBkZWNUb0hleChzdHJlYW1JbmZvWydjcmMzMiddLCA0KSArXG4gICAgICAgIC8vIGNvbXByZXNzZWQgc2l6ZSAgICAgICAgICAgICAgICAgNCBieXRlc1xuICAgICAgICBkZWNUb0hleChzdHJlYW1JbmZvWydjb21wcmVzc2VkU2l6ZSddLCA0KSArXG4gICAgICAgIC8vIHVuY29tcHJlc3NlZCBzaXplICAgICAgICAgICAgICAgNCBieXRlc1xuICAgICAgICBkZWNUb0hleChzdHJlYW1JbmZvWyd1bmNvbXByZXNzZWRTaXplJ10sIDQpO1xuXG4gICAgcmV0dXJuIGRlc2NyaXB0b3I7XG59O1xuXG5cbi8qKlxuICogQSB3b3JrZXIgdG8gY29uY2F0ZW5hdGUgb3RoZXIgd29ya2VycyB0byBjcmVhdGUgYSB6aXAgZmlsZS5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gc3RyZWFtRmlsZXMgYHRydWVgIHRvIHN0cmVhbSB0aGUgY29udGVudCBvZiB0aGUgZmlsZXMsXG4gKiBgZmFsc2VgIHRvIGFjY3VtdWxhdGUgaXQuXG4gKiBAcGFyYW0ge1N0cmluZ30gY29tbWVudCB0aGUgY29tbWVudCB0byB1c2UuXG4gKiBAcGFyYW0ge1N0cmluZ30gcGxhdGZvcm0gdGhlIHBsYXRmb3JtIHRvIHVzZSwgXCJVTklYXCIgb3IgXCJET1NcIi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVuY29kZUZpbGVOYW1lIHRoZSBmdW5jdGlvbiB0byBlbmNvZGUgZmlsZSBuYW1lcyBhbmQgY29tbWVudHMuXG4gKi9cbmZ1bmN0aW9uIFppcEZpbGVXb3JrZXIoc3RyZWFtRmlsZXMsIGNvbW1lbnQsIHBsYXRmb3JtLCBlbmNvZGVGaWxlTmFtZSkge1xuICAgIEdlbmVyaWNXb3JrZXIuY2FsbCh0aGlzLCBcIlppcEZpbGVXb3JrZXJcIik7XG4gICAgLy8gVGhlIG51bWJlciBvZiBieXRlcyB3cml0dGVuIHNvIGZhci4gVGhpcyBkb2Vzbid0IGNvdW50IGFjY3VtdWxhdGVkIGNodW5rcy5cbiAgICB0aGlzLmJ5dGVzV3JpdHRlbiA9IDA7XG4gICAgLy8gVGhlIGNvbW1lbnQgb2YgdGhlIHppcCBmaWxlXG4gICAgdGhpcy56aXBDb21tZW50ID0gY29tbWVudDtcbiAgICAvLyBUaGUgcGxhdGZvcm0gXCJnZW5lcmF0aW5nXCIgdGhlIHppcCBmaWxlLlxuICAgIHRoaXMuemlwUGxhdGZvcm0gPSBwbGF0Zm9ybTtcbiAgICAvLyB0aGUgZnVuY3Rpb24gdG8gZW5jb2RlIGZpbGUgbmFtZXMgYW5kIGNvbW1lbnRzLlxuICAgIHRoaXMuZW5jb2RlRmlsZU5hbWUgPSBlbmNvZGVGaWxlTmFtZTtcbiAgICAvLyBTaG91bGQgd2Ugc3RyZWFtIHRoZSBjb250ZW50IG9mIHRoZSBmaWxlcyA/XG4gICAgdGhpcy5zdHJlYW1GaWxlcyA9IHN0cmVhbUZpbGVzO1xuICAgIC8vIElmIGBzdHJlYW1GaWxlc2AgaXMgZmFsc2UsIHdlIHdpbGwgbmVlZCB0byBhY2N1bXVsYXRlIHRoZSBjb250ZW50IG9mIHRoZVxuICAgIC8vIGZpbGVzIHRvIGNhbGN1bGF0ZSBzaXplcyAvIGNyYzMyIChhbmQgd3JpdGUgdGhlbSAqYmVmb3JlKiB0aGUgY29udGVudCkuXG4gICAgLy8gVGhpcyBib29sZWFuIGluZGljYXRlcyBpZiB3ZSBhcmUgYWNjdW11bGF0aW5nIGNodW5rcyAoaXQgd2lsbCBjaGFuZ2UgYSBsb3RcbiAgICAvLyBkdXJpbmcgdGhlIGxpZmV0aW1lIG9mIHRoaXMgd29ya2VyKS5cbiAgICB0aGlzLmFjY3VtdWxhdGUgPSBmYWxzZTtcbiAgICAvLyBUaGUgYnVmZmVyIHJlY2VpdmluZyBjaHVua3Mgd2hlbiBhY2N1bXVsYXRpbmcgY29udGVudC5cbiAgICB0aGlzLmNvbnRlbnRCdWZmZXIgPSBbXTtcbiAgICAvLyBUaGUgbGlzdCBvZiBnZW5lcmF0ZWQgZGlyZWN0b3J5IHJlY29yZHMuXG4gICAgdGhpcy5kaXJSZWNvcmRzID0gW107XG4gICAgLy8gVGhlIG9mZnNldCAoaW4gYnl0ZXMpIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgemlwIGZpbGUgZm9yIHRoZSBjdXJyZW50IHNvdXJjZS5cbiAgICB0aGlzLmN1cnJlbnRTb3VyY2VPZmZzZXQgPSAwO1xuICAgIC8vIFRoZSB0b3RhbCBudW1iZXIgb2YgZW50cmllcyBpbiB0aGlzIHppcCBmaWxlLlxuICAgIHRoaXMuZW50cmllc0NvdW50ID0gMDtcbiAgICAvLyB0aGUgbmFtZSBvZiB0aGUgZmlsZSBjdXJyZW50bHkgYmVpbmcgYWRkZWQsIG51bGwgd2hlbiBoYW5kbGluZyB0aGUgZW5kIG9mIHRoZSB6aXAgZmlsZS5cbiAgICAvLyBVc2VkIGZvciB0aGUgZW1pdHRlZCBtZXRhZGF0YS5cbiAgICB0aGlzLmN1cnJlbnRGaWxlID0gbnVsbDtcblxuXG5cbiAgICB0aGlzLl9zb3VyY2VzID0gW107XG59XG51dGlscy5pbmhlcml0cyhaaXBGaWxlV29ya2VyLCBHZW5lcmljV29ya2VyKTtcblxuLyoqXG4gKiBAc2VlIEdlbmVyaWNXb3JrZXIucHVzaFxuICovXG5aaXBGaWxlV29ya2VyLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rKSB7XG5cbiAgICB2YXIgY3VycmVudEZpbGVQZXJjZW50ID0gY2h1bmsubWV0YS5wZXJjZW50IHx8IDA7XG4gICAgdmFyIGVudHJpZXNDb3VudCA9IHRoaXMuZW50cmllc0NvdW50O1xuICAgIHZhciByZW1haW5pbmdGaWxlcyA9IHRoaXMuX3NvdXJjZXMubGVuZ3RoO1xuXG4gICAgaWYodGhpcy5hY2N1bXVsYXRlKSB7XG4gICAgICAgIHRoaXMuY29udGVudEJ1ZmZlci5wdXNoKGNodW5rKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmJ5dGVzV3JpdHRlbiArPSBjaHVuay5kYXRhLmxlbmd0aDtcblxuICAgICAgICBHZW5lcmljV29ya2VyLnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcywge1xuICAgICAgICAgICAgZGF0YSA6IGNodW5rLmRhdGEsXG4gICAgICAgICAgICBtZXRhIDoge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRGaWxlIDogdGhpcy5jdXJyZW50RmlsZSxcbiAgICAgICAgICAgICAgICBwZXJjZW50IDogZW50cmllc0NvdW50ID8gKGN1cnJlbnRGaWxlUGVyY2VudCArIDEwMCAqIChlbnRyaWVzQ291bnQgLSByZW1haW5pbmdGaWxlcyAtIDEpKSAvIGVudHJpZXNDb3VudCA6IDEwMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFRoZSB3b3JrZXIgc3RhcnRlZCBhIG5ldyBzb3VyY2UgKGFuIG90aGVyIHdvcmtlcikuXG4gKiBAcGFyYW0ge09iamVjdH0gc3RyZWFtSW5mbyB0aGUgc3RyZWFtSW5mbyBvYmplY3QgZnJvbSB0aGUgbmV3IHNvdXJjZS5cbiAqL1xuWmlwRmlsZVdvcmtlci5wcm90b3R5cGUub3BlbmVkU291cmNlID0gZnVuY3Rpb24gKHN0cmVhbUluZm8pIHtcbiAgICB0aGlzLmN1cnJlbnRTb3VyY2VPZmZzZXQgPSB0aGlzLmJ5dGVzV3JpdHRlbjtcbiAgICB0aGlzLmN1cnJlbnRGaWxlID0gc3RyZWFtSW5mb1snZmlsZSddLm5hbWU7XG5cbiAgICB2YXIgc3RyZWFtZWRDb250ZW50ID0gdGhpcy5zdHJlYW1GaWxlcyAmJiAhc3RyZWFtSW5mb1snZmlsZSddLmRpcjtcblxuICAgIC8vIGRvbid0IHN0cmVhbSBmb2xkZXJzIChiZWNhdXNlIHRoZXkgZG9uJ3QgaGF2ZSBhbnkgY29udGVudClcbiAgICBpZihzdHJlYW1lZENvbnRlbnQpIHtcbiAgICAgICAgdmFyIHJlY29yZCA9IGdlbmVyYXRlWmlwUGFydHMoc3RyZWFtSW5mbywgc3RyZWFtZWRDb250ZW50LCBmYWxzZSwgdGhpcy5jdXJyZW50U291cmNlT2Zmc2V0LCB0aGlzLnppcFBsYXRmb3JtLCB0aGlzLmVuY29kZUZpbGVOYW1lKTtcbiAgICAgICAgdGhpcy5wdXNoKHtcbiAgICAgICAgICAgIGRhdGEgOiByZWNvcmQuZmlsZVJlY29yZCxcbiAgICAgICAgICAgIG1ldGEgOiB7cGVyY2VudDowfVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB3ZSBuZWVkIHRvIHdhaXQgZm9yIHRoZSB3aG9sZSBmaWxlIGJlZm9yZSBwdXNoaW5nIGFueXRoaW5nXG4gICAgICAgIHRoaXMuYWNjdW11bGF0ZSA9IHRydWU7XG4gICAgfVxufTtcblxuLyoqXG4gKiBUaGUgd29ya2VyIGZpbmlzaGVkIGEgc291cmNlIChhbiBvdGhlciB3b3JrZXIpLlxuICogQHBhcmFtIHtPYmplY3R9IHN0cmVhbUluZm8gdGhlIHN0cmVhbUluZm8gb2JqZWN0IGZyb20gdGhlIGZpbmlzaGVkIHNvdXJjZS5cbiAqL1xuWmlwRmlsZVdvcmtlci5wcm90b3R5cGUuY2xvc2VkU291cmNlID0gZnVuY3Rpb24gKHN0cmVhbUluZm8pIHtcbiAgICB0aGlzLmFjY3VtdWxhdGUgPSBmYWxzZTtcbiAgICB2YXIgc3RyZWFtZWRDb250ZW50ID0gdGhpcy5zdHJlYW1GaWxlcyAmJiAhc3RyZWFtSW5mb1snZmlsZSddLmRpcjtcbiAgICB2YXIgcmVjb3JkID0gZ2VuZXJhdGVaaXBQYXJ0cyhzdHJlYW1JbmZvLCBzdHJlYW1lZENvbnRlbnQsIHRydWUsIHRoaXMuY3VycmVudFNvdXJjZU9mZnNldCwgdGhpcy56aXBQbGF0Zm9ybSwgdGhpcy5lbmNvZGVGaWxlTmFtZSk7XG5cbiAgICB0aGlzLmRpclJlY29yZHMucHVzaChyZWNvcmQuZGlyUmVjb3JkKTtcbiAgICBpZihzdHJlYW1lZENvbnRlbnQpIHtcbiAgICAgICAgLy8gYWZ0ZXIgdGhlIHN0cmVhbWVkIGZpbGUsIHdlIHB1dCBkYXRhIGRlc2NyaXB0b3JzXG4gICAgICAgIHRoaXMucHVzaCh7XG4gICAgICAgICAgICBkYXRhIDogZ2VuZXJhdGVEYXRhRGVzY3JpcHRvcnMoc3RyZWFtSW5mbyksXG4gICAgICAgICAgICBtZXRhIDoge3BlcmNlbnQ6MTAwfVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aGUgY29udGVudCB3YXNuJ3Qgc3RyZWFtZWQsIHdlIG5lZWQgdG8gcHVzaCBldmVyeXRoaW5nIG5vd1xuICAgICAgICAvLyBmaXJzdCB0aGUgZmlsZSByZWNvcmQsIHRoZW4gdGhlIGNvbnRlbnRcbiAgICAgICAgdGhpcy5wdXNoKHtcbiAgICAgICAgICAgIGRhdGEgOiByZWNvcmQuZmlsZVJlY29yZCxcbiAgICAgICAgICAgIG1ldGEgOiB7cGVyY2VudDowfVxuICAgICAgICB9KTtcbiAgICAgICAgd2hpbGUodGhpcy5jb250ZW50QnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5wdXNoKHRoaXMuY29udGVudEJ1ZmZlci5zaGlmdCgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRGaWxlID0gbnVsbDtcbn07XG5cbi8qKlxuICogQHNlZSBHZW5lcmljV29ya2VyLmZsdXNoXG4gKi9cblppcEZpbGVXb3JrZXIucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGxvY2FsRGlyTGVuZ3RoID0gdGhpcy5ieXRlc1dyaXR0ZW47XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuZGlyUmVjb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnB1c2goe1xuICAgICAgICAgICAgZGF0YSA6IHRoaXMuZGlyUmVjb3Jkc1tpXSxcbiAgICAgICAgICAgIG1ldGEgOiB7cGVyY2VudDoxMDB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgY2VudHJhbERpckxlbmd0aCA9IHRoaXMuYnl0ZXNXcml0dGVuIC0gbG9jYWxEaXJMZW5ndGg7XG5cbiAgICB2YXIgZGlyRW5kID0gZ2VuZXJhdGVDZW50cmFsRGlyZWN0b3J5RW5kKHRoaXMuZGlyUmVjb3Jkcy5sZW5ndGgsIGNlbnRyYWxEaXJMZW5ndGgsIGxvY2FsRGlyTGVuZ3RoLCB0aGlzLnppcENvbW1lbnQsIHRoaXMuZW5jb2RlRmlsZU5hbWUpO1xuXG4gICAgdGhpcy5wdXNoKHtcbiAgICAgICAgZGF0YSA6IGRpckVuZCxcbiAgICAgICAgbWV0YSA6IHtwZXJjZW50OjEwMH1cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJlcGFyZSB0aGUgbmV4dCBzb3VyY2UgdG8gYmUgcmVhZC5cbiAqL1xuWmlwRmlsZVdvcmtlci5wcm90b3R5cGUucHJlcGFyZU5leHRTb3VyY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5wcmV2aW91cyA9IHRoaXMuX3NvdXJjZXMuc2hpZnQoKTtcbiAgICB0aGlzLm9wZW5lZFNvdXJjZSh0aGlzLnByZXZpb3VzLnN0cmVhbUluZm8pO1xuICAgIGlmICh0aGlzLmlzUGF1c2VkKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXMucGF1c2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnByZXZpb3VzLnJlc3VtZSgpO1xuICAgIH1cbn07XG5cbi8qKlxuICogQHNlZSBHZW5lcmljV29ya2VyLnJlZ2lzdGVyUHJldmlvdXNcbiAqL1xuWmlwRmlsZVdvcmtlci5wcm90b3R5cGUucmVnaXN0ZXJQcmV2aW91cyA9IGZ1bmN0aW9uIChwcmV2aW91cykge1xuICAgIHRoaXMuX3NvdXJjZXMucHVzaChwcmV2aW91cyk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgcHJldmlvdXMub24oJ2RhdGEnLCBmdW5jdGlvbiAoY2h1bmspIHtcbiAgICAgICAgc2VsZi5wcm9jZXNzQ2h1bmsoY2h1bmspO1xuICAgIH0pO1xuICAgIHByZXZpb3VzLm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuY2xvc2VkU291cmNlKHNlbGYucHJldmlvdXMuc3RyZWFtSW5mbyk7XG4gICAgICAgIGlmKHNlbGYuX3NvdXJjZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxmLnByZXBhcmVOZXh0U291cmNlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmVuZCgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcHJldmlvdXMub24oJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgc2VsZi5lcnJvcihlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQHNlZSBHZW5lcmljV29ya2VyLnJlc3VtZVxuICovXG5aaXBGaWxlV29ya2VyLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYoIUdlbmVyaWNXb3JrZXIucHJvdG90eXBlLnJlc3VtZS5jYWxsKHRoaXMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMucHJldmlvdXMgJiYgdGhpcy5fc291cmNlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5wcmVwYXJlTmV4dFNvdXJjZSgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnByZXZpb3VzICYmICF0aGlzLl9zb3VyY2VzLmxlbmd0aCAmJiAhdGhpcy5nZW5lcmF0ZWRFcnJvcikge1xuICAgICAgICB0aGlzLmVuZCgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEBzZWUgR2VuZXJpY1dvcmtlci5lcnJvclxuICovXG5aaXBGaWxlV29ya2VyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIHNvdXJjZXMgPSB0aGlzLl9zb3VyY2VzO1xuICAgIGlmKCFHZW5lcmljV29ya2VyLnByb3RvdHlwZS5lcnJvci5jYWxsKHRoaXMsIGUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNvdXJjZXNbaV0uZXJyb3IoZSk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgLy8gdGhlIGBlcnJvcmAgZXhwbG9kZWQsIG5vdGhpbmcgdG8gZG9cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogQHNlZSBHZW5lcmljV29ya2VyLmxvY2tcbiAqL1xuWmlwRmlsZVdvcmtlci5wcm90b3R5cGUubG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICBHZW5lcmljV29ya2VyLnByb3RvdHlwZS5sb2NrLmNhbGwodGhpcyk7XG4gICAgdmFyIHNvdXJjZXMgPSB0aGlzLl9zb3VyY2VzO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNvdXJjZXNbaV0ubG9jaygpO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gWmlwRmlsZVdvcmtlcjtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBjb21wcmVzc2lvbnMgPSByZXF1aXJlKCcuLi9jb21wcmVzc2lvbnMnKTtcbnZhciBaaXBGaWxlV29ya2VyID0gcmVxdWlyZSgnLi9aaXBGaWxlV29ya2VyJyk7XG5cbi8qKlxuICogRmluZCB0aGUgY29tcHJlc3Npb24gdG8gdXNlLlxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVDb21wcmVzc2lvbiB0aGUgY29tcHJlc3Npb24gZGVmaW5lZCBhdCB0aGUgZmlsZSBsZXZlbCwgaWYgYW55LlxuICogQHBhcmFtIHtTdHJpbmd9IHppcENvbXByZXNzaW9uIHRoZSBjb21wcmVzc2lvbiBkZWZpbmVkIGF0IHRoZSBsb2FkKCkgbGV2ZWwuXG4gKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBjb21wcmVzc2lvbiBvYmplY3QgdG8gdXNlLlxuICovXG52YXIgZ2V0Q29tcHJlc3Npb24gPSBmdW5jdGlvbiAoZmlsZUNvbXByZXNzaW9uLCB6aXBDb21wcmVzc2lvbikge1xuXG4gICAgdmFyIGNvbXByZXNzaW9uTmFtZSA9IGZpbGVDb21wcmVzc2lvbiB8fCB6aXBDb21wcmVzc2lvbjtcbiAgICB2YXIgY29tcHJlc3Npb24gPSBjb21wcmVzc2lvbnNbY29tcHJlc3Npb25OYW1lXTtcbiAgICBpZiAoIWNvbXByZXNzaW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihjb21wcmVzc2lvbk5hbWUgKyBcIiBpcyBub3QgYSB2YWxpZCBjb21wcmVzc2lvbiBtZXRob2QgIVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXByZXNzaW9uO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYSB3b3JrZXIgdG8gZ2VuZXJhdGUgYSB6aXAgZmlsZS5cbiAqIEBwYXJhbSB7SlNaaXB9IHppcCB0aGUgSlNaaXAgaW5zdGFuY2UgYXQgdGhlIHJpZ2h0IHJvb3QgbGV2ZWwuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB0byBnZW5lcmF0ZSB0aGUgemlwIGZpbGUuXG4gKiBAcGFyYW0ge1N0cmluZ30gY29tbWVudCB0aGUgY29tbWVudCB0byB1c2UuXG4gKi9cbmV4cG9ydHMuZ2VuZXJhdGVXb3JrZXIgPSBmdW5jdGlvbiAoemlwLCBvcHRpb25zLCBjb21tZW50KSB7XG5cbiAgICB2YXIgemlwRmlsZVdvcmtlciA9IG5ldyBaaXBGaWxlV29ya2VyKG9wdGlvbnMuc3RyZWFtRmlsZXMsIGNvbW1lbnQsIG9wdGlvbnMucGxhdGZvcm0sIG9wdGlvbnMuZW5jb2RlRmlsZU5hbWUpO1xuICAgIHZhciBlbnRyaWVzQ291bnQgPSAwO1xuICAgIHRyeSB7XG5cbiAgICAgICAgemlwLmZvckVhY2goZnVuY3Rpb24gKHJlbGF0aXZlUGF0aCwgZmlsZSkge1xuICAgICAgICAgICAgZW50cmllc0NvdW50Kys7XG4gICAgICAgICAgICB2YXIgY29tcHJlc3Npb24gPSBnZXRDb21wcmVzc2lvbihmaWxlLm9wdGlvbnMuY29tcHJlc3Npb24sIG9wdGlvbnMuY29tcHJlc3Npb24pO1xuICAgICAgICAgICAgdmFyIGNvbXByZXNzaW9uT3B0aW9ucyA9IGZpbGUub3B0aW9ucy5jb21wcmVzc2lvbk9wdGlvbnMgfHwgb3B0aW9ucy5jb21wcmVzc2lvbk9wdGlvbnMgfHwge307XG4gICAgICAgICAgICB2YXIgZGlyID0gZmlsZS5kaXIsIGRhdGUgPSBmaWxlLmRhdGU7XG5cbiAgICAgICAgICAgIGZpbGUuX2NvbXByZXNzV29ya2VyKGNvbXByZXNzaW9uLCBjb21wcmVzc2lvbk9wdGlvbnMpXG4gICAgICAgICAgICAud2l0aFN0cmVhbUluZm8oXCJmaWxlXCIsIHtcbiAgICAgICAgICAgICAgICBuYW1lIDogcmVsYXRpdmVQYXRoLFxuICAgICAgICAgICAgICAgIGRpciA6IGRpcixcbiAgICAgICAgICAgICAgICBkYXRlIDogZGF0ZSxcbiAgICAgICAgICAgICAgICBjb21tZW50IDogZmlsZS5jb21tZW50IHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgdW5peFBlcm1pc3Npb25zIDogZmlsZS51bml4UGVybWlzc2lvbnMsXG4gICAgICAgICAgICAgICAgZG9zUGVybWlzc2lvbnMgOiBmaWxlLmRvc1Blcm1pc3Npb25zXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUoemlwRmlsZVdvcmtlcik7XG4gICAgICAgIH0pO1xuICAgICAgICB6aXBGaWxlV29ya2VyLmVudHJpZXNDb3VudCA9IGVudHJpZXNDb3VudDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHppcEZpbGVXb3JrZXIuZXJyb3IoZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHppcEZpbGVXb3JrZXI7XG59O1xuIiwgIlwidXNlIHN0cmljdFwiO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIEdlbmVyaWNXb3JrZXIgPSByZXF1aXJlKCcuLi9zdHJlYW0vR2VuZXJpY1dvcmtlcicpO1xuXG4vKipcbiAqIEEgd29ya2VyIHRoYXQgdXNlIGEgbm9kZWpzIHN0cmVhbSBhcyBzb3VyY2UuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZSB0aGUgbmFtZSBvZiB0aGUgZmlsZSBlbnRyeSBmb3IgdGhpcyBzdHJlYW0uXG4gKiBAcGFyYW0ge1JlYWRhYmxlfSBzdHJlYW0gdGhlIG5vZGVqcyBzdHJlYW0uXG4gKi9cbmZ1bmN0aW9uIE5vZGVqc1N0cmVhbUlucHV0QWRhcHRlcihmaWxlbmFtZSwgc3RyZWFtKSB7XG4gICAgR2VuZXJpY1dvcmtlci5jYWxsKHRoaXMsIFwiTm9kZWpzIHN0cmVhbSBpbnB1dCBhZGFwdGVyIGZvciBcIiArIGZpbGVuYW1lKTtcbiAgICB0aGlzLl91cHN0cmVhbUVuZGVkID0gZmFsc2U7XG4gICAgdGhpcy5fYmluZFN0cmVhbShzdHJlYW0pO1xufVxuXG51dGlscy5pbmhlcml0cyhOb2RlanNTdHJlYW1JbnB1dEFkYXB0ZXIsIEdlbmVyaWNXb3JrZXIpO1xuXG4vKipcbiAqIFByZXBhcmUgdGhlIHN0cmVhbSBhbmQgYmluZCB0aGUgY2FsbGJhY2tzIG9uIGl0LlxuICogRG8gdGhpcyBBU0FQIG9uIG5vZGUgMC4xMCAhIEEgbGF6eSBiaW5kaW5nIGRvZXNuJ3QgYWx3YXlzIHdvcmsuXG4gKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtIHRoZSBub2RlanMgc3RyZWFtIHRvIHVzZS5cbiAqL1xuTm9kZWpzU3RyZWFtSW5wdXRBZGFwdGVyLnByb3RvdHlwZS5fYmluZFN0cmVhbSA9IGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5fc3RyZWFtID0gc3RyZWFtO1xuICAgIHN0cmVhbS5wYXVzZSgpO1xuICAgIHN0cmVhbVxuICAgIC5vbihcImRhdGFcIiwgZnVuY3Rpb24gKGNodW5rKSB7XG4gICAgICAgIHNlbGYucHVzaCh7XG4gICAgICAgICAgICBkYXRhOiBjaHVuayxcbiAgICAgICAgICAgIG1ldGEgOiB7XG4gICAgICAgICAgICAgICAgcGVyY2VudCA6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSlcbiAgICAub24oXCJlcnJvclwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZihzZWxmLmlzUGF1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlZEVycm9yID0gZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIC5vbihcImVuZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmKHNlbGYuaXNQYXVzZWQpIHtcbiAgICAgICAgICAgIHNlbGYuX3Vwc3RyZWFtRW5kZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5lbmQoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcbk5vZGVqc1N0cmVhbUlucHV0QWRhcHRlci5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYoIUdlbmVyaWNXb3JrZXIucHJvdG90eXBlLnBhdXNlLmNhbGwodGhpcykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLl9zdHJlYW0ucGF1c2UoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5Ob2RlanNTdHJlYW1JbnB1dEFkYXB0ZXIucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZighR2VuZXJpY1dvcmtlci5wcm90b3R5cGUucmVzdW1lLmNhbGwodGhpcykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmKHRoaXMuX3Vwc3RyZWFtRW5kZWQpIHtcbiAgICAgICAgdGhpcy5lbmQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zdHJlYW0ucmVzdW1lKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGVqc1N0cmVhbUlucHV0QWRhcHRlcjtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgdXRmOCA9IHJlcXVpcmUoJy4vdXRmOCcpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIEdlbmVyaWNXb3JrZXIgPSByZXF1aXJlKCcuL3N0cmVhbS9HZW5lcmljV29ya2VyJyk7XG52YXIgU3RyZWFtSGVscGVyID0gcmVxdWlyZSgnLi9zdHJlYW0vU3RyZWFtSGVscGVyJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG52YXIgQ29tcHJlc3NlZE9iamVjdCA9IHJlcXVpcmUoJy4vY29tcHJlc3NlZE9iamVjdCcpO1xudmFyIFppcE9iamVjdCA9IHJlcXVpcmUoJy4vemlwT2JqZWN0Jyk7XG52YXIgZ2VuZXJhdGUgPSByZXF1aXJlKFwiLi9nZW5lcmF0ZVwiKTtcbnZhciBub2RlanNVdGlscyA9IHJlcXVpcmUoXCIuL25vZGVqc1V0aWxzXCIpO1xudmFyIE5vZGVqc1N0cmVhbUlucHV0QWRhcHRlciA9IHJlcXVpcmUoXCIuL25vZGVqcy9Ob2RlanNTdHJlYW1JbnB1dEFkYXB0ZXJcIik7XG5cblxuLyoqXG4gKiBBZGQgYSBmaWxlIGluIHRoZSBjdXJyZW50IGZvbGRlci5cbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgbmFtZSBvZiB0aGUgZmlsZVxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXlCdWZmZXJ8VWludDhBcnJheXxCdWZmZXJ9IGRhdGEgdGhlIGRhdGEgb2YgdGhlIGZpbGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcmlnaW5hbE9wdGlvbnMgdGhlIG9wdGlvbnMgb2YgdGhlIGZpbGVcbiAqIEByZXR1cm4ge09iamVjdH0gdGhlIG5ldyBmaWxlLlxuICovXG52YXIgZmlsZUFkZCA9IGZ1bmN0aW9uKG5hbWUsIGRhdGEsIG9yaWdpbmFsT3B0aW9ucykge1xuICAgIC8vIGJlIHN1cmUgc3ViIGZvbGRlcnMgZXhpc3RcbiAgICB2YXIgZGF0YVR5cGUgPSB1dGlscy5nZXRUeXBlT2YoZGF0YSksXG4gICAgICAgIHBhcmVudDtcblxuXG4gICAgLypcbiAgICAgKiBDb3JyZWN0IG9wdGlvbnMuXG4gICAgICovXG5cbiAgICB2YXIgbyA9IHV0aWxzLmV4dGVuZChvcmlnaW5hbE9wdGlvbnMgfHwge30sIGRlZmF1bHRzKTtcbiAgICBvLmRhdGUgPSBvLmRhdGUgfHwgbmV3IERhdGUoKTtcbiAgICBpZiAoby5jb21wcmVzc2lvbiAhPT0gbnVsbCkge1xuICAgICAgICBvLmNvbXByZXNzaW9uID0gby5jb21wcmVzc2lvbi50b1VwcGVyQ2FzZSgpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygby51bml4UGVybWlzc2lvbnMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgby51bml4UGVybWlzc2lvbnMgPSBwYXJzZUludChvLnVuaXhQZXJtaXNzaW9ucywgOCk7XG4gICAgfVxuXG4gICAgLy8gVU5YX0lGRElSICAwMDQwMDAwIHNlZSB6aXBpbmZvLmNcbiAgICBpZiAoby51bml4UGVybWlzc2lvbnMgJiYgKG8udW5peFBlcm1pc3Npb25zICYgMHg0MDAwKSkge1xuICAgICAgICBvLmRpciA9IHRydWU7XG4gICAgfVxuICAgIC8vIEJpdCA0ICAgIERpcmVjdG9yeVxuICAgIGlmIChvLmRvc1Blcm1pc3Npb25zICYmIChvLmRvc1Blcm1pc3Npb25zICYgMHgwMDEwKSkge1xuICAgICAgICBvLmRpciA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG8uZGlyKSB7XG4gICAgICAgIG5hbWUgPSBmb3JjZVRyYWlsaW5nU2xhc2gobmFtZSk7XG4gICAgfVxuICAgIGlmIChvLmNyZWF0ZUZvbGRlcnMgJiYgKHBhcmVudCA9IHBhcmVudEZvbGRlcihuYW1lKSkpIHtcbiAgICAgICAgZm9sZGVyQWRkLmNhbGwodGhpcywgcGFyZW50LCB0cnVlKTtcbiAgICB9XG5cbiAgICB2YXIgaXNVbmljb2RlU3RyaW5nID0gZGF0YVR5cGUgPT09IFwic3RyaW5nXCIgJiYgby5iaW5hcnkgPT09IGZhbHNlICYmIG8uYmFzZTY0ID09PSBmYWxzZTtcbiAgICBpZiAoIW9yaWdpbmFsT3B0aW9ucyB8fCB0eXBlb2Ygb3JpZ2luYWxPcHRpb25zLmJpbmFyeSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBvLmJpbmFyeSA9ICFpc1VuaWNvZGVTdHJpbmc7XG4gICAgfVxuXG5cbiAgICB2YXIgaXNDb21wcmVzc2VkRW1wdHkgPSAoZGF0YSBpbnN0YW5jZW9mIENvbXByZXNzZWRPYmplY3QpICYmIGRhdGEudW5jb21wcmVzc2VkU2l6ZSA9PT0gMDtcblxuICAgIGlmIChpc0NvbXByZXNzZWRFbXB0eSB8fCBvLmRpciB8fCAhZGF0YSB8fCBkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBvLmJhc2U2NCA9IGZhbHNlO1xuICAgICAgICBvLmJpbmFyeSA9IHRydWU7XG4gICAgICAgIGRhdGEgPSBcIlwiO1xuICAgICAgICBvLmNvbXByZXNzaW9uID0gXCJTVE9SRVwiO1xuICAgICAgICBkYXRhVHlwZSA9IFwic3RyaW5nXCI7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBDb252ZXJ0IGNvbnRlbnQgdG8gZml0LlxuICAgICAqL1xuXG4gICAgdmFyIHppcE9iamVjdENvbnRlbnQgPSBudWxsO1xuICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQ29tcHJlc3NlZE9iamVjdCB8fCBkYXRhIGluc3RhbmNlb2YgR2VuZXJpY1dvcmtlcikge1xuICAgICAgICB6aXBPYmplY3RDb250ZW50ID0gZGF0YTtcbiAgICB9IGVsc2UgaWYgKG5vZGVqc1V0aWxzLmlzTm9kZSAmJiBub2RlanNVdGlscy5pc1N0cmVhbShkYXRhKSkge1xuICAgICAgICB6aXBPYmplY3RDb250ZW50ID0gbmV3IE5vZGVqc1N0cmVhbUlucHV0QWRhcHRlcihuYW1lLCBkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB6aXBPYmplY3RDb250ZW50ID0gdXRpbHMucHJlcGFyZUNvbnRlbnQobmFtZSwgZGF0YSwgby5iaW5hcnksIG8ub3B0aW1pemVkQmluYXJ5U3RyaW5nLCBvLmJhc2U2NCk7XG4gICAgfVxuXG4gICAgdmFyIG9iamVjdCA9IG5ldyBaaXBPYmplY3QobmFtZSwgemlwT2JqZWN0Q29udGVudCwgbyk7XG4gICAgdGhpcy5maWxlc1tuYW1lXSA9IG9iamVjdDtcbiAgICAvKlxuICAgIFRPRE86IHdlIGNhbid0IHRocm93IGFuIGV4Y2VwdGlvbiBiZWNhdXNlIHdlIGhhdmUgYXN5bmMgcHJvbWlzZXNcbiAgICAod2UgY2FuIGhhdmUgYSBwcm9taXNlIG9mIGEgRGF0ZSgpIGZvciBleGFtcGxlKSBidXQgcmV0dXJuaW5nIGFcbiAgICBwcm9taXNlIGlzIHVzZWxlc3MgYmVjYXVzZSBmaWxlKG5hbWUsIGRhdGEpIHJldHVybnMgdGhlIEpTWmlwXG4gICAgb2JqZWN0IGZvciBjaGFpbmluZy4gU2hvdWxkIHdlIGJyZWFrIHRoYXQgdG8gYWxsb3cgdGhlIHVzZXJcbiAgICB0byBjYXRjaCB0aGUgZXJyb3IgP1xuXG4gICAgcmV0dXJuIGV4dGVybmFsLlByb21pc2UucmVzb2x2ZSh6aXBPYmplY3RDb250ZW50KVxuICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9KTtcbiAgICAqL1xufTtcblxuLyoqXG4gKiBGaW5kIHRoZSBwYXJlbnQgZm9sZGVyIG9mIHRoZSBwYXRoLlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIHRoZSBwYXRoIHRvIHVzZVxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgcGFyZW50IGZvbGRlciwgb3IgXCJcIlxuICovXG52YXIgcGFyZW50Rm9sZGVyID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICBpZiAocGF0aC5zbGljZSgtMSkgPT09ICcvJykge1xuICAgICAgICBwYXRoID0gcGF0aC5zdWJzdHJpbmcoMCwgcGF0aC5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgdmFyIGxhc3RTbGFzaCA9IHBhdGgubGFzdEluZGV4T2YoJy8nKTtcbiAgICByZXR1cm4gKGxhc3RTbGFzaCA+IDApID8gcGF0aC5zdWJzdHJpbmcoMCwgbGFzdFNsYXNoKSA6IFwiXCI7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHBhdGggd2l0aCBhIHNsYXNoIGF0IHRoZSBlbmQuXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGggdGhlIHBhdGggdG8gY2hlY2suXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBwYXRoIHdpdGggYSB0cmFpbGluZyBzbGFzaC5cbiAqL1xudmFyIGZvcmNlVHJhaWxpbmdTbGFzaCA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAvLyBDaGVjayB0aGUgbmFtZSBlbmRzIHdpdGggYSAvXG4gICAgaWYgKHBhdGguc2xpY2UoLTEpICE9PSBcIi9cIikge1xuICAgICAgICBwYXRoICs9IFwiL1wiOyAvLyBJRSBkb2Vzbid0IGxpa2Ugc3Vic3RyKC0xKVxuICAgIH1cbiAgICByZXR1cm4gcGF0aDtcbn07XG5cbi8qKlxuICogQWRkIGEgKHN1YikgZm9sZGVyIGluIHRoZSBjdXJyZW50IGZvbGRlci5cbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgZm9sZGVyJ3MgbmFtZVxuICogQHBhcmFtIHtib29sZWFuPX0gW2NyZWF0ZUZvbGRlcnNdIElmIHRydWUsIGF1dG9tYXRpY2FsbHkgY3JlYXRlIHN1YlxuICogIGZvbGRlcnMuIERlZmF1bHRzIHRvIGZhbHNlLlxuICogQHJldHVybiB7T2JqZWN0fSB0aGUgbmV3IGZvbGRlci5cbiAqL1xudmFyIGZvbGRlckFkZCA9IGZ1bmN0aW9uKG5hbWUsIGNyZWF0ZUZvbGRlcnMpIHtcbiAgICBjcmVhdGVGb2xkZXJzID0gKHR5cGVvZiBjcmVhdGVGb2xkZXJzICE9PSAndW5kZWZpbmVkJykgPyBjcmVhdGVGb2xkZXJzIDogZGVmYXVsdHMuY3JlYXRlRm9sZGVycztcblxuICAgIG5hbWUgPSBmb3JjZVRyYWlsaW5nU2xhc2gobmFtZSk7XG5cbiAgICAvLyBEb2VzIHRoaXMgZm9sZGVyIGFscmVhZHkgZXhpc3Q/XG4gICAgaWYgKCF0aGlzLmZpbGVzW25hbWVdKSB7XG4gICAgICAgIGZpbGVBZGQuY2FsbCh0aGlzLCBuYW1lLCBudWxsLCB7XG4gICAgICAgICAgICBkaXI6IHRydWUsXG4gICAgICAgICAgICBjcmVhdGVGb2xkZXJzOiBjcmVhdGVGb2xkZXJzXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5maWxlc1tuYW1lXTtcbn07XG5cbi8qKlxuKiBDcm9zcy13aW5kb3csIGNyb3NzLU5vZGUtY29udGV4dCByZWd1bGFyIGV4cHJlc3Npb24gZGV0ZWN0aW9uXG4qIEBwYXJhbSAge09iamVjdH0gIG9iamVjdCBBbnl0aGluZ1xuKiBAcmV0dXJuIHtCb29sZWFufSAgICAgICAgdHJ1ZSBpZiB0aGUgb2JqZWN0IGlzIGEgcmVndWxhciBleHByZXNzaW9uLFxuKiBmYWxzZSBvdGhlcndpc2VcbiovXG5mdW5jdGlvbiBpc1JlZ0V4cChvYmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT09IFwiW29iamVjdCBSZWdFeHBdXCI7XG59XG5cbi8vIHJldHVybiB0aGUgYWN0dWFsIHByb3RvdHlwZSBvZiBKU1ppcFxudmFyIG91dCA9IHtcbiAgICAvKipcbiAgICAgKiBAc2VlIGxvYWRBc3luY1xuICAgICAqL1xuICAgIGxvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIG1ldGhvZCBoYXMgYmVlbiByZW1vdmVkIGluIEpTWmlwIDMuMCwgcGxlYXNlIGNoZWNrIHRoZSB1cGdyYWRlIGd1aWRlLlwiKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBDYWxsIGEgY2FsbGJhY2sgZnVuY3Rpb24gZm9yIGVhY2ggZW50cnkgYXQgdGhpcyBmb2xkZXIgbGV2ZWwuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uOlxuICAgICAqIGZ1bmN0aW9uIChyZWxhdGl2ZVBhdGgsIGZpbGUpIHsuLi59XG4gICAgICogSXQgdGFrZXMgMiBhcmd1bWVudHMgOiB0aGUgcmVsYXRpdmUgcGF0aCBhbmQgdGhlIGZpbGUuXG4gICAgICovXG4gICAgZm9yRWFjaDogZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgdmFyIGZpbGVuYW1lLCByZWxhdGl2ZVBhdGgsIGZpbGU7XG4gICAgICAgIGZvciAoZmlsZW5hbWUgaW4gdGhpcy5maWxlcykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmZpbGVzLmhhc093blByb3BlcnR5KGZpbGVuYW1lKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlsZSA9IHRoaXMuZmlsZXNbZmlsZW5hbWVdO1xuICAgICAgICAgICAgcmVsYXRpdmVQYXRoID0gZmlsZW5hbWUuc2xpY2UodGhpcy5yb290Lmxlbmd0aCwgZmlsZW5hbWUubGVuZ3RoKTtcbiAgICAgICAgICAgIGlmIChyZWxhdGl2ZVBhdGggJiYgZmlsZW5hbWUuc2xpY2UoMCwgdGhpcy5yb290Lmxlbmd0aCkgPT09IHRoaXMucm9vdCkgeyAvLyB0aGUgZmlsZSBpcyBpbiB0aGUgY3VycmVudCByb290XG4gICAgICAgICAgICAgICAgY2IocmVsYXRpdmVQYXRoLCBmaWxlKTsgLy8gVE9ETyByZXZlcnNlIHRoZSBwYXJhbWV0ZXJzID8gbmVlZCB0byBiZSBjbGVhbiBBTkQgY29uc2lzdGVudCB3aXRoIHRoZSBmaWx0ZXIgc2VhcmNoIGZuLi4uXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRmlsdGVyIG5lc3RlZCBmaWxlcy9mb2xkZXJzIHdpdGggdGhlIHNwZWNpZmllZCBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzZWFyY2ggdGhlIHByZWRpY2F0ZSB0byB1c2UgOlxuICAgICAqIGZ1bmN0aW9uIChyZWxhdGl2ZVBhdGgsIGZpbGUpIHsuLi59XG4gICAgICogSXQgdGFrZXMgMiBhcmd1bWVudHMgOiB0aGUgcmVsYXRpdmUgcGF0aCBhbmQgdGhlIGZpbGUuXG4gICAgICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIG1hdGNoaW5nIGVsZW1lbnRzLlxuICAgICAqL1xuICAgIGZpbHRlcjogZnVuY3Rpb24oc2VhcmNoKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChyZWxhdGl2ZVBhdGgsIGVudHJ5KSB7XG4gICAgICAgICAgICBpZiAoc2VhcmNoKHJlbGF0aXZlUGF0aCwgZW50cnkpKSB7IC8vIHRoZSBmaWxlIG1hdGNoZXMgdGhlIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZW50cnkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBmaWxlIHRvIHRoZSB6aXAgZmlsZSwgb3Igc2VhcmNoIGEgZmlsZS5cbiAgICAgKiBAcGFyYW0gICB7c3RyaW5nfFJlZ0V4cH0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZmlsZSB0byBhZGQgKGlmIGRhdGEgaXMgZGVmaW5lZCksXG4gICAgICogdGhlIG5hbWUgb2YgdGhlIGZpbGUgdG8gZmluZCAoaWYgbm8gZGF0YSkgb3IgYSByZWdleCB0byBtYXRjaCBmaWxlcy5cbiAgICAgKiBAcGFyYW0gICB7U3RyaW5nfEFycmF5QnVmZmVyfFVpbnQ4QXJyYXl8QnVmZmVyfSBkYXRhICBUaGUgZmlsZSBkYXRhLCBlaXRoZXIgcmF3IG9yIGJhc2U2NCBlbmNvZGVkXG4gICAgICogQHBhcmFtICAge09iamVjdH0gbyAgICAgRmlsZSBvcHRpb25zXG4gICAgICogQHJldHVybiAge0pTWmlwfE9iamVjdHxBcnJheX0gdGhpcyBKU1ppcCBvYmplY3QgKHdoZW4gYWRkaW5nIGEgZmlsZSksXG4gICAgICogYSBmaWxlICh3aGVuIHNlYXJjaGluZyBieSBzdHJpbmcpIG9yIGFuIGFycmF5IG9mIGZpbGVzICh3aGVuIHNlYXJjaGluZyBieSByZWdleCkuXG4gICAgICovXG4gICAgZmlsZTogZnVuY3Rpb24obmFtZSwgZGF0YSwgbykge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgaWYgKGlzUmVnRXhwKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ2V4cCA9IG5hbWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKHJlbGF0aXZlUGF0aCwgZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWZpbGUuZGlyICYmIHJlZ2V4cC50ZXN0KHJlbGF0aXZlUGF0aCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgLy8gdGV4dFxuICAgICAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmZpbGVzW3RoaXMucm9vdCArIG5hbWVdO1xuICAgICAgICAgICAgICAgIGlmIChvYmogJiYgIW9iai5kaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IC8vIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQgOiB3ZSBoYXZlIGRhdGEgIVxuICAgICAgICAgICAgbmFtZSA9IHRoaXMucm9vdCArIG5hbWU7XG4gICAgICAgICAgICBmaWxlQWRkLmNhbGwodGhpcywgbmFtZSwgZGF0YSwgbyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFkZCBhIGRpcmVjdG9yeSB0byB0aGUgemlwIGZpbGUsIG9yIHNlYXJjaC5cbiAgICAgKiBAcGFyYW0gICB7U3RyaW5nfFJlZ0V4cH0gYXJnIFRoZSBuYW1lIG9mIHRoZSBkaXJlY3RvcnkgdG8gYWRkLCBvciBhIHJlZ2V4IHRvIHNlYXJjaCBmb2xkZXJzLlxuICAgICAqIEByZXR1cm4gIHtKU1ppcH0gYW4gb2JqZWN0IHdpdGggdGhlIG5ldyBkaXJlY3RvcnkgYXMgdGhlIHJvb3QsIG9yIGFuIGFycmF5IGNvbnRhaW5pbmcgbWF0Y2hpbmcgZm9sZGVycy5cbiAgICAgKi9cbiAgICBmb2xkZXI6IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICBpZiAoIWFyZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNSZWdFeHAoYXJnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKHJlbGF0aXZlUGF0aCwgZmlsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmaWxlLmRpciAmJiBhcmcudGVzdChyZWxhdGl2ZVBhdGgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbHNlLCBuYW1lIGlzIGEgbmV3IGZvbGRlclxuICAgICAgICB2YXIgbmFtZSA9IHRoaXMucm9vdCArIGFyZztcbiAgICAgICAgdmFyIG5ld0ZvbGRlciA9IGZvbGRlckFkZC5jYWxsKHRoaXMsIG5hbWUpO1xuXG4gICAgICAgIC8vIEFsbG93IGNoYWluaW5nIGJ5IHJldHVybmluZyBhIG5ldyBvYmplY3Qgd2l0aCB0aGlzIGZvbGRlciBhcyB0aGUgcm9vdFxuICAgICAgICB2YXIgcmV0ID0gdGhpcy5jbG9uZSgpO1xuICAgICAgICByZXQucm9vdCA9IG5ld0ZvbGRlci5uYW1lO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgYSBmaWxlLCBvciBhIGRpcmVjdG9yeSBhbmQgYWxsIHN1Yi1maWxlcywgZnJvbSB0aGUgemlwXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgdGhlIG5hbWUgb2YgdGhlIGZpbGUgdG8gZGVsZXRlXG4gICAgICogQHJldHVybiB7SlNaaXB9IHRoaXMgSlNaaXAgb2JqZWN0XG4gICAgICovXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIG5hbWUgPSB0aGlzLnJvb3QgKyBuYW1lO1xuICAgICAgICB2YXIgZmlsZSA9IHRoaXMuZmlsZXNbbmFtZV07XG4gICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgLy8gTG9vayBmb3IgYW55IGZvbGRlcnNcbiAgICAgICAgICAgIGlmIChuYW1lLnNsaWNlKC0xKSAhPT0gXCIvXCIpIHtcbiAgICAgICAgICAgICAgICBuYW1lICs9IFwiL1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlsZSA9IHRoaXMuZmlsZXNbbmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmlsZSAmJiAhZmlsZS5kaXIpIHtcbiAgICAgICAgICAgIC8vIGZpbGVcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmZpbGVzW25hbWVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gbWF5YmUgYSBmb2xkZXIsIGRlbGV0ZSByZWN1cnNpdmVseVxuICAgICAgICAgICAgdmFyIGtpZHMgPSB0aGlzLmZpbHRlcihmdW5jdGlvbihyZWxhdGl2ZVBhdGgsIGZpbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsZS5uYW1lLnNsaWNlKDAsIG5hbWUubGVuZ3RoKSA9PT0gbmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBraWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZmlsZXNba2lkc1tpXS5uYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSB0aGUgY29tcGxldGUgemlwIGZpbGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB0aGUgb3B0aW9ucyB0byBnZW5lcmF0ZSB0aGUgemlwIGZpbGUgOlxuICAgICAqIC0gY29tcHJlc3Npb24sIFwiU1RPUkVcIiBieSBkZWZhdWx0LlxuICAgICAqIC0gdHlwZSwgXCJiYXNlNjRcIiBieSBkZWZhdWx0LiBWYWx1ZXMgYXJlIDogc3RyaW5nLCBiYXNlNjQsIHVpbnQ4YXJyYXksIGFycmF5YnVmZmVyLCBibG9iLlxuICAgICAqIEByZXR1cm4ge1N0cmluZ3xVaW50OEFycmF5fEFycmF5QnVmZmVyfEJ1ZmZlcnxCbG9ifSB0aGUgemlwIGZpbGVcbiAgICAgKi9cbiAgICBnZW5lcmF0ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIG1ldGhvZCBoYXMgYmVlbiByZW1vdmVkIGluIEpTWmlwIDMuMCwgcGxlYXNlIGNoZWNrIHRoZSB1cGdyYWRlIGd1aWRlLlwiKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgdGhlIGNvbXBsZXRlIHppcCBmaWxlIGFzIGFuIGludGVybmFsIHN0cmVhbS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB0aGUgb3B0aW9ucyB0byBnZW5lcmF0ZSB0aGUgemlwIGZpbGUgOlxuICAgICAqIC0gY29tcHJlc3Npb24sIFwiU1RPUkVcIiBieSBkZWZhdWx0LlxuICAgICAqIC0gdHlwZSwgXCJiYXNlNjRcIiBieSBkZWZhdWx0LiBWYWx1ZXMgYXJlIDogc3RyaW5nLCBiYXNlNjQsIHVpbnQ4YXJyYXksIGFycmF5YnVmZmVyLCBibG9iLlxuICAgICAqIEByZXR1cm4ge1N0cmVhbUhlbHBlcn0gdGhlIHN0cmVhbWVkIHppcCBmaWxlLlxuICAgICAqL1xuICAgIGdlbmVyYXRlSW50ZXJuYWxTdHJlYW06IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHZhciB3b3JrZXIsIG9wdHMgPSB7fTtcbiAgICAgIHRyeSB7XG4gICAgICAgICAgb3B0cyA9IHV0aWxzLmV4dGVuZChvcHRpb25zIHx8IHt9LCB7XG4gICAgICAgICAgICAgIHN0cmVhbUZpbGVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgY29tcHJlc3Npb246IFwiU1RPUkVcIixcbiAgICAgICAgICAgICAgY29tcHJlc3Npb25PcHRpb25zIDogbnVsbCxcbiAgICAgICAgICAgICAgdHlwZTogXCJcIixcbiAgICAgICAgICAgICAgcGxhdGZvcm06IFwiRE9TXCIsXG4gICAgICAgICAgICAgIGNvbW1lbnQ6IG51bGwsXG4gICAgICAgICAgICAgIG1pbWVUeXBlOiAnYXBwbGljYXRpb24vemlwJyxcbiAgICAgICAgICAgICAgZW5jb2RlRmlsZU5hbWU6IHV0ZjgudXRmOGVuY29kZVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgb3B0cy50eXBlID0gb3B0cy50eXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgb3B0cy5jb21wcmVzc2lvbiA9IG9wdHMuY29tcHJlc3Npb24udG9VcHBlckNhc2UoKTtcblxuICAgICAgICAgIC8vIFwiYmluYXJ5c3RyaW5nXCIgaXMgcHJlZmVycmVkIGJ1dCB0aGUgaW50ZXJuYWxzIHVzZSBcInN0cmluZ1wiLlxuICAgICAgICAgIGlmKG9wdHMudHlwZSA9PT0gXCJiaW5hcnlzdHJpbmdcIikge1xuICAgICAgICAgICAgb3B0cy50eXBlID0gXCJzdHJpbmdcIjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIW9wdHMudHlwZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gb3V0cHV0IHR5cGUgc3BlY2lmaWVkLlwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB1dGlscy5jaGVja1N1cHBvcnQob3B0cy50eXBlKTtcblxuICAgICAgICAgIC8vIGFjY2VwdCBub2RlanMgYHByb2Nlc3MucGxhdGZvcm1gXG4gICAgICAgICAgaWYoXG4gICAgICAgICAgICAgIG9wdHMucGxhdGZvcm0gPT09ICdkYXJ3aW4nIHx8XG4gICAgICAgICAgICAgIG9wdHMucGxhdGZvcm0gPT09ICdmcmVlYnNkJyB8fFxuICAgICAgICAgICAgICBvcHRzLnBsYXRmb3JtID09PSAnbGludXgnIHx8XG4gICAgICAgICAgICAgIG9wdHMucGxhdGZvcm0gPT09ICdzdW5vcydcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgb3B0cy5wbGF0Zm9ybSA9IFwiVU5JWFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAob3B0cy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xuICAgICAgICAgICAgICBvcHRzLnBsYXRmb3JtID0gXCJET1NcIjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgY29tbWVudCA9IG9wdHMuY29tbWVudCB8fCB0aGlzLmNvbW1lbnQgfHwgXCJcIjtcbiAgICAgICAgICB3b3JrZXIgPSBnZW5lcmF0ZS5nZW5lcmF0ZVdvcmtlcih0aGlzLCBvcHRzLCBjb21tZW50KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgd29ya2VyID0gbmV3IEdlbmVyaWNXb3JrZXIoXCJlcnJvclwiKTtcbiAgICAgICAgd29ya2VyLmVycm9yKGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBTdHJlYW1IZWxwZXIod29ya2VyLCBvcHRzLnR5cGUgfHwgXCJzdHJpbmdcIiwgb3B0cy5taW1lVHlwZSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSB0aGUgY29tcGxldGUgemlwIGZpbGUgYXN5bmNocm9ub3VzbHkuXG4gICAgICogQHNlZSBnZW5lcmF0ZUludGVybmFsU3RyZWFtXG4gICAgICovXG4gICAgZ2VuZXJhdGVBc3luYzogZnVuY3Rpb24ob3B0aW9ucywgb25VcGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVJbnRlcm5hbFN0cmVhbShvcHRpb25zKS5hY2N1bXVsYXRlKG9uVXBkYXRlKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIHRoZSBjb21wbGV0ZSB6aXAgZmlsZSBhc3luY2hyb25vdXNseS5cbiAgICAgKiBAc2VlIGdlbmVyYXRlSW50ZXJuYWxTdHJlYW1cbiAgICAgKi9cbiAgICBnZW5lcmF0ZU5vZGVTdHJlYW06IGZ1bmN0aW9uKG9wdGlvbnMsIG9uVXBkYXRlKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBpZiAoIW9wdGlvbnMudHlwZSkge1xuICAgICAgICAgICAgb3B0aW9ucy50eXBlID0gXCJub2RlYnVmZmVyXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVJbnRlcm5hbFN0cmVhbShvcHRpb25zKS50b05vZGVqc1N0cmVhbShvblVwZGF0ZSk7XG4gICAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gb3V0O1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIERhdGFSZWFkZXIoZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7IC8vIHR5cGUgOiBzZWUgaW1wbGVtZW50YXRpb25cbiAgICB0aGlzLmxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIHRoaXMuemVybyA9IDA7XG59XG5EYXRhUmVhZGVyLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGF0IHRoZSBvZmZzZXQgd2lsbCBub3QgZ28gdG9vIGZhci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb2Zmc2V0IHRoZSBhZGRpdGlvbmFsIG9mZnNldCB0byBjaGVjay5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gYW4gRXJyb3IgaWYgdGhlIG9mZnNldCBpcyBvdXQgb2YgYm91bmRzLlxuICAgICAqL1xuICAgIGNoZWNrT2Zmc2V0OiBmdW5jdGlvbihvZmZzZXQpIHtcbiAgICAgICAgdGhpcy5jaGVja0luZGV4KHRoaXMuaW5kZXggKyBvZmZzZXQpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhhdCB0aGUgc3BlY2lmaWVkIGluZGV4IHdpbGwgbm90IGJlIHRvbyBmYXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld0luZGV4IHRoZSBpbmRleCB0byBjaGVjay5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gYW4gRXJyb3IgaWYgdGhlIGluZGV4IGlzIG91dCBvZiBib3VuZHMuXG4gICAgICovXG4gICAgY2hlY2tJbmRleDogZnVuY3Rpb24obmV3SW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoIDwgdGhpcy56ZXJvICsgbmV3SW5kZXggfHwgbmV3SW5kZXggPCAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFbmQgb2YgZGF0YSByZWFjaGVkIChkYXRhIGxlbmd0aCA9IFwiICsgdGhpcy5sZW5ndGggKyBcIiwgYXNrZWQgaW5kZXggPSBcIiArIChuZXdJbmRleCkgKyBcIikuIENvcnJ1cHRlZCB6aXAgP1wiKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogQ2hhbmdlIHRoZSBpbmRleC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbmV3SW5kZXggVGhlIG5ldyBpbmRleC5cbiAgICAgKiBAdGhyb3dzIHtFcnJvcn0gaWYgdGhlIG5ldyBpbmRleCBpcyBvdXQgb2YgdGhlIGRhdGEuXG4gICAgICovXG4gICAgc2V0SW5kZXg6IGZ1bmN0aW9uKG5ld0luZGV4KSB7XG4gICAgICAgIHRoaXMuY2hlY2tJbmRleChuZXdJbmRleCk7XG4gICAgICAgIHRoaXMuaW5kZXggPSBuZXdJbmRleDtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFNraXAgdGhlIG5leHQgbiBieXRlcy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbiB0aGUgbnVtYmVyIG9mIGJ5dGVzIHRvIHNraXAuXG4gICAgICogQHRocm93cyB7RXJyb3J9IGlmIHRoZSBuZXcgaW5kZXggaXMgb3V0IG9mIHRoZSBkYXRhLlxuICAgICAqL1xuICAgIHNraXA6IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgdGhpcy5zZXRJbmRleCh0aGlzLmluZGV4ICsgbik7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGJ5dGUgYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaSB0aGUgaW5kZXggdG8gdXNlLlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gYSBieXRlLlxuICAgICAqL1xuICAgIGJ5dGVBdDogZnVuY3Rpb24oaSkge1xuICAgICAgICAvLyBzZWUgaW1wbGVtZW50YXRpb25zXG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG5leHQgbnVtYmVyIHdpdGggYSBnaXZlbiBieXRlIHNpemUuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNpemUgdGhlIG51bWJlciBvZiBieXRlcyB0byByZWFkLlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIGNvcnJlc3BvbmRpbmcgbnVtYmVyLlxuICAgICAqL1xuICAgIHJlYWRJbnQ6IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IDAsXG4gICAgICAgICAgICBpO1xuICAgICAgICB0aGlzLmNoZWNrT2Zmc2V0KHNpemUpO1xuICAgICAgICBmb3IgKGkgPSB0aGlzLmluZGV4ICsgc2l6ZSAtIDE7IGkgPj0gdGhpcy5pbmRleDsgaS0tKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAocmVzdWx0IDw8IDgpICsgdGhpcy5ieXRlQXQoaSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbmRleCArPSBzaXplO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBuZXh0IHN0cmluZyB3aXRoIGEgZ2l2ZW4gYnl0ZSBzaXplLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplIHRoZSBudW1iZXIgb2YgYnl0ZXMgdG8gcmVhZC5cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBjb3JyZXNwb25kaW5nIHN0cmluZy5cbiAgICAgKi9cbiAgICByZWFkU3RyaW5nOiBmdW5jdGlvbihzaXplKSB7XG4gICAgICAgIHJldHVybiB1dGlscy50cmFuc2Zvcm1UbyhcInN0cmluZ1wiLCB0aGlzLnJlYWREYXRhKHNpemUpKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEdldCByYXcgZGF0YSB3aXRob3V0IGNvbnZlcnNpb24sIDxzaXplPiBieXRlcy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZSB0aGUgbnVtYmVyIG9mIGJ5dGVzIHRvIHJlYWQuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSB0aGUgcmF3IGRhdGEsIGltcGxlbWVudGF0aW9uIHNwZWNpZmljLlxuICAgICAqL1xuICAgIHJlYWREYXRhOiBmdW5jdGlvbihzaXplKSB7XG4gICAgICAgIC8vIHNlZSBpbXBsZW1lbnRhdGlvbnNcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEZpbmQgdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiBhIHppcCBzaWduYXR1cmUgKDQgYnl0ZXMpLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaWcgdGhlIHNpZ25hdHVyZSB0byBmaW5kLlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIGluZGV4IG9mIHRoZSBsYXN0IG9jY3VycmVuY2UsIC0xIGlmIG5vdCBmb3VuZC5cbiAgICAgKi9cbiAgICBsYXN0SW5kZXhPZlNpZ25hdHVyZTogZnVuY3Rpb24oc2lnKSB7XG4gICAgICAgIC8vIHNlZSBpbXBsZW1lbnRhdGlvbnNcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFJlYWQgdGhlIHNpZ25hdHVyZSAoNCBieXRlcykgYXQgdGhlIGN1cnJlbnQgcG9zaXRpb24gYW5kIGNvbXBhcmUgaXQgd2l0aCBzaWcuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNpZyB0aGUgZXhwZWN0ZWQgc2lnbmF0dXJlXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgc2lnbmF0dXJlIG1hdGNoZXMsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICByZWFkQW5kQ2hlY2tTaWduYXR1cmU6IGZ1bmN0aW9uKHNpZykge1xuICAgICAgICAvLyBzZWUgaW1wbGVtZW50YXRpb25zXG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG5leHQgZGF0ZS5cbiAgICAgKiBAcmV0dXJuIHtEYXRlfSB0aGUgZGF0ZS5cbiAgICAgKi9cbiAgICByZWFkRGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkb3N0aW1lID0gdGhpcy5yZWFkSW50KDQpO1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoXG4gICAgICAgICgoZG9zdGltZSA+PiAyNSkgJiAweDdmKSArIDE5ODAsIC8vIHllYXJcbiAgICAgICAgKChkb3N0aW1lID4+IDIxKSAmIDB4MGYpIC0gMSwgLy8gbW9udGhcbiAgICAgICAgKGRvc3RpbWUgPj4gMTYpICYgMHgxZiwgLy8gZGF5XG4gICAgICAgIChkb3N0aW1lID4+IDExKSAmIDB4MWYsIC8vIGhvdXJcbiAgICAgICAgKGRvc3RpbWUgPj4gNSkgJiAweDNmLCAvLyBtaW51dGVcbiAgICAgICAgKGRvc3RpbWUgJiAweDFmKSA8PCAxKSk7IC8vIHNlY29uZFxuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IERhdGFSZWFkZXI7XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyIERhdGFSZWFkZXIgPSByZXF1aXJlKCcuL0RhdGFSZWFkZXInKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEFycmF5UmVhZGVyKGRhdGEpIHtcbiAgICBEYXRhUmVhZGVyLmNhbGwodGhpcywgZGF0YSk7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRkYXRhW2ldID0gZGF0YVtpXSAmIDB4RkY7XG5cdH1cbn1cbnV0aWxzLmluaGVyaXRzKEFycmF5UmVhZGVyLCBEYXRhUmVhZGVyKTtcbi8qKlxuICogQHNlZSBEYXRhUmVhZGVyLmJ5dGVBdFxuICovXG5BcnJheVJlYWRlci5wcm90b3R5cGUuYnl0ZUF0ID0gZnVuY3Rpb24oaSkge1xuICAgIHJldHVybiB0aGlzLmRhdGFbdGhpcy56ZXJvICsgaV07XG59O1xuLyoqXG4gKiBAc2VlIERhdGFSZWFkZXIubGFzdEluZGV4T2ZTaWduYXR1cmVcbiAqL1xuQXJyYXlSZWFkZXIucHJvdG90eXBlLmxhc3RJbmRleE9mU2lnbmF0dXJlID0gZnVuY3Rpb24oc2lnKSB7XG4gICAgdmFyIHNpZzAgPSBzaWcuY2hhckNvZGVBdCgwKSxcbiAgICAgICAgc2lnMSA9IHNpZy5jaGFyQ29kZUF0KDEpLFxuICAgICAgICBzaWcyID0gc2lnLmNoYXJDb2RlQXQoMiksXG4gICAgICAgIHNpZzMgPSBzaWcuY2hhckNvZGVBdCgzKTtcbiAgICBmb3IgKHZhciBpID0gdGhpcy5sZW5ndGggLSA0OyBpID49IDA7IC0taSkge1xuICAgICAgICBpZiAodGhpcy5kYXRhW2ldID09PSBzaWcwICYmIHRoaXMuZGF0YVtpICsgMV0gPT09IHNpZzEgJiYgdGhpcy5kYXRhW2kgKyAyXSA9PT0gc2lnMiAmJiB0aGlzLmRhdGFbaSArIDNdID09PSBzaWczKSB7XG4gICAgICAgICAgICByZXR1cm4gaSAtIHRoaXMuemVybztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAtMTtcbn07XG4vKipcbiAqIEBzZWUgRGF0YVJlYWRlci5yZWFkQW5kQ2hlY2tTaWduYXR1cmVcbiAqL1xuQXJyYXlSZWFkZXIucHJvdG90eXBlLnJlYWRBbmRDaGVja1NpZ25hdHVyZSA9IGZ1bmN0aW9uIChzaWcpIHtcbiAgICB2YXIgc2lnMCA9IHNpZy5jaGFyQ29kZUF0KDApLFxuICAgICAgICBzaWcxID0gc2lnLmNoYXJDb2RlQXQoMSksXG4gICAgICAgIHNpZzIgPSBzaWcuY2hhckNvZGVBdCgyKSxcbiAgICAgICAgc2lnMyA9IHNpZy5jaGFyQ29kZUF0KDMpLFxuICAgICAgICBkYXRhID0gdGhpcy5yZWFkRGF0YSg0KTtcbiAgICByZXR1cm4gc2lnMCA9PT0gZGF0YVswXSAmJiBzaWcxID09PSBkYXRhWzFdICYmIHNpZzIgPT09IGRhdGFbMl0gJiYgc2lnMyA9PT0gZGF0YVszXTtcbn07XG4vKipcbiAqIEBzZWUgRGF0YVJlYWRlci5yZWFkRGF0YVxuICovXG5BcnJheVJlYWRlci5wcm90b3R5cGUucmVhZERhdGEgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgdGhpcy5jaGVja09mZnNldChzaXplKTtcbiAgICBpZihzaXplID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuZGF0YS5zbGljZSh0aGlzLnplcm8gKyB0aGlzLmluZGV4LCB0aGlzLnplcm8gKyB0aGlzLmluZGV4ICsgc2l6ZSk7XG4gICAgdGhpcy5pbmRleCArPSBzaXplO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheVJlYWRlcjtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgRGF0YVJlYWRlciA9IHJlcXVpcmUoJy4vRGF0YVJlYWRlcicpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gU3RyaW5nUmVhZGVyKGRhdGEpIHtcbiAgICBEYXRhUmVhZGVyLmNhbGwodGhpcywgZGF0YSk7XG59XG51dGlscy5pbmhlcml0cyhTdHJpbmdSZWFkZXIsIERhdGFSZWFkZXIpO1xuLyoqXG4gKiBAc2VlIERhdGFSZWFkZXIuYnl0ZUF0XG4gKi9cblN0cmluZ1JlYWRlci5wcm90b3R5cGUuYnl0ZUF0ID0gZnVuY3Rpb24oaSkge1xuICAgIHJldHVybiB0aGlzLmRhdGEuY2hhckNvZGVBdCh0aGlzLnplcm8gKyBpKTtcbn07XG4vKipcbiAqIEBzZWUgRGF0YVJlYWRlci5sYXN0SW5kZXhPZlNpZ25hdHVyZVxuICovXG5TdHJpbmdSZWFkZXIucHJvdG90eXBlLmxhc3RJbmRleE9mU2lnbmF0dXJlID0gZnVuY3Rpb24oc2lnKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5sYXN0SW5kZXhPZihzaWcpIC0gdGhpcy56ZXJvO1xufTtcbi8qKlxuICogQHNlZSBEYXRhUmVhZGVyLnJlYWRBbmRDaGVja1NpZ25hdHVyZVxuICovXG5TdHJpbmdSZWFkZXIucHJvdG90eXBlLnJlYWRBbmRDaGVja1NpZ25hdHVyZSA9IGZ1bmN0aW9uIChzaWcpIHtcbiAgICB2YXIgZGF0YSA9IHRoaXMucmVhZERhdGEoNCk7XG4gICAgcmV0dXJuIHNpZyA9PT0gZGF0YTtcbn07XG4vKipcbiAqIEBzZWUgRGF0YVJlYWRlci5yZWFkRGF0YVxuICovXG5TdHJpbmdSZWFkZXIucHJvdG90eXBlLnJlYWREYXRhID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgIHRoaXMuY2hlY2tPZmZzZXQoc2l6ZSk7XG4gICAgLy8gdGhpcyB3aWxsIHdvcmsgYmVjYXVzZSB0aGUgY29uc3RydWN0b3IgYXBwbGllZCB0aGUgXCImIDB4ZmZcIiBtYXNrLlxuICAgIHZhciByZXN1bHQgPSB0aGlzLmRhdGEuc2xpY2UodGhpcy56ZXJvICsgdGhpcy5pbmRleCwgdGhpcy56ZXJvICsgdGhpcy5pbmRleCArIHNpemUpO1xuICAgIHRoaXMuaW5kZXggKz0gc2l6ZTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gU3RyaW5nUmVhZGVyO1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciBBcnJheVJlYWRlciA9IHJlcXVpcmUoJy4vQXJyYXlSZWFkZXInKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIFVpbnQ4QXJyYXlSZWFkZXIoZGF0YSkge1xuICAgIEFycmF5UmVhZGVyLmNhbGwodGhpcywgZGF0YSk7XG59XG51dGlscy5pbmhlcml0cyhVaW50OEFycmF5UmVhZGVyLCBBcnJheVJlYWRlcik7XG4vKipcbiAqIEBzZWUgRGF0YVJlYWRlci5yZWFkRGF0YVxuICovXG5VaW50OEFycmF5UmVhZGVyLnByb3RvdHlwZS5yZWFkRGF0YSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgICB0aGlzLmNoZWNrT2Zmc2V0KHNpemUpO1xuICAgIGlmKHNpemUgPT09IDApIHtcbiAgICAgICAgLy8gaW4gSUUxMCwgd2hlbiB1c2luZyBzdWJhcnJheShpZHgsIGlkeCksIHdlIGdldCB0aGUgYXJyYXkgWzB4MDBdIGluc3RlYWQgb2YgW10uXG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheSgwKTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuZGF0YS5zdWJhcnJheSh0aGlzLnplcm8gKyB0aGlzLmluZGV4LCB0aGlzLnplcm8gKyB0aGlzLmluZGV4ICsgc2l6ZSk7XG4gICAgdGhpcy5pbmRleCArPSBzaXplO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBVaW50OEFycmF5UmVhZGVyO1xuIiwgIid1c2Ugc3RyaWN0JztcbnZhciBVaW50OEFycmF5UmVhZGVyID0gcmVxdWlyZSgnLi9VaW50OEFycmF5UmVhZGVyJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5mdW5jdGlvbiBOb2RlQnVmZmVyUmVhZGVyKGRhdGEpIHtcbiAgICBVaW50OEFycmF5UmVhZGVyLmNhbGwodGhpcywgZGF0YSk7XG59XG51dGlscy5pbmhlcml0cyhOb2RlQnVmZmVyUmVhZGVyLCBVaW50OEFycmF5UmVhZGVyKTtcblxuLyoqXG4gKiBAc2VlIERhdGFSZWFkZXIucmVhZERhdGFcbiAqL1xuTm9kZUJ1ZmZlclJlYWRlci5wcm90b3R5cGUucmVhZERhdGEgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgdGhpcy5jaGVja09mZnNldChzaXplKTtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5kYXRhLnNsaWNlKHRoaXMuemVybyArIHRoaXMuaW5kZXgsIHRoaXMuemVybyArIHRoaXMuaW5kZXggKyBzaXplKTtcbiAgICB0aGlzLmluZGV4ICs9IHNpemU7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IE5vZGVCdWZmZXJSZWFkZXI7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIHN1cHBvcnQgPSByZXF1aXJlKCcuLi9zdXBwb3J0Jyk7XG52YXIgQXJyYXlSZWFkZXIgPSByZXF1aXJlKCcuL0FycmF5UmVhZGVyJyk7XG52YXIgU3RyaW5nUmVhZGVyID0gcmVxdWlyZSgnLi9TdHJpbmdSZWFkZXInKTtcbnZhciBOb2RlQnVmZmVyUmVhZGVyID0gcmVxdWlyZSgnLi9Ob2RlQnVmZmVyUmVhZGVyJyk7XG52YXIgVWludDhBcnJheVJlYWRlciA9IHJlcXVpcmUoJy4vVWludDhBcnJheVJlYWRlcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhIHJlYWRlciBhZGFwdGVkIHRvIHRoZSBkYXRhLlxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXlCdWZmZXJ8VWludDhBcnJheXxCdWZmZXJ9IGRhdGEgdGhlIGRhdGEgdG8gcmVhZC5cbiAqIEByZXR1cm4ge0RhdGFSZWFkZXJ9IHRoZSBkYXRhIHJlYWRlci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciB0eXBlID0gdXRpbHMuZ2V0VHlwZU9mKGRhdGEpO1xuICAgIHV0aWxzLmNoZWNrU3VwcG9ydCh0eXBlKTtcbiAgICBpZiAodHlwZSA9PT0gXCJzdHJpbmdcIiAmJiAhc3VwcG9ydC51aW50OGFycmF5KSB7XG4gICAgICAgIHJldHVybiBuZXcgU3RyaW5nUmVhZGVyKGRhdGEpO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gXCJub2RlYnVmZmVyXCIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBOb2RlQnVmZmVyUmVhZGVyKGRhdGEpO1xuICAgIH1cbiAgICBpZiAoc3VwcG9ydC51aW50OGFycmF5KSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheVJlYWRlcih1dGlscy50cmFuc2Zvcm1UbyhcInVpbnQ4YXJyYXlcIiwgZGF0YSkpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEFycmF5UmVhZGVyKHV0aWxzLnRyYW5zZm9ybVRvKFwiYXJyYXlcIiwgZGF0YSkpO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgcmVhZGVyRm9yID0gcmVxdWlyZSgnLi9yZWFkZXIvcmVhZGVyRm9yJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgQ29tcHJlc3NlZE9iamVjdCA9IHJlcXVpcmUoJy4vY29tcHJlc3NlZE9iamVjdCcpO1xudmFyIGNyYzMyZm4gPSByZXF1aXJlKCcuL2NyYzMyJyk7XG52YXIgdXRmOCA9IHJlcXVpcmUoJy4vdXRmOCcpO1xudmFyIGNvbXByZXNzaW9ucyA9IHJlcXVpcmUoJy4vY29tcHJlc3Npb25zJyk7XG52YXIgc3VwcG9ydCA9IHJlcXVpcmUoJy4vc3VwcG9ydCcpO1xuXG52YXIgTUFERV9CWV9ET1MgPSAweDAwO1xudmFyIE1BREVfQllfVU5JWCA9IDB4MDM7XG5cbi8qKlxuICogRmluZCBhIGNvbXByZXNzaW9uIHJlZ2lzdGVyZWQgaW4gSlNaaXAuXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcHJlc3Npb25NZXRob2QgdGhlIG1ldGhvZCBtYWdpYyB0byBmaW5kLlxuICogQHJldHVybiB7T2JqZWN0fG51bGx9IHRoZSBKU1ppcCBjb21wcmVzc2lvbiBvYmplY3QsIG51bGwgaWYgbm9uZSBmb3VuZC5cbiAqL1xudmFyIGZpbmRDb21wcmVzc2lvbiA9IGZ1bmN0aW9uKGNvbXByZXNzaW9uTWV0aG9kKSB7XG4gICAgZm9yICh2YXIgbWV0aG9kIGluIGNvbXByZXNzaW9ucykge1xuICAgICAgICBpZiAoIWNvbXByZXNzaW9ucy5oYXNPd25Qcm9wZXJ0eShtZXRob2QpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tcHJlc3Npb25zW21ldGhvZF0ubWFnaWMgPT09IGNvbXByZXNzaW9uTWV0aG9kKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcHJlc3Npb25zW21ldGhvZF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG4vLyBjbGFzcyBaaXBFbnRyeSB7e3tcbi8qKlxuICogQW4gZW50cnkgaW4gdGhlIHppcCBmaWxlLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBPcHRpb25zIG9mIHRoZSBjdXJyZW50IGZpbGUuXG4gKiBAcGFyYW0ge09iamVjdH0gbG9hZE9wdGlvbnMgT3B0aW9ucyBmb3IgbG9hZGluZyB0aGUgc3RyZWFtLlxuICovXG5mdW5jdGlvbiBaaXBFbnRyeShvcHRpb25zLCBsb2FkT3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5sb2FkT3B0aW9ucyA9IGxvYWRPcHRpb25zO1xufVxuWmlwRW50cnkucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIHNheSBpZiB0aGUgZmlsZSBpcyBlbmNyeXB0ZWQuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZmlsZSBpcyBlbmNyeXB0ZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBpc0VuY3J5cHRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGJpdCAxIGlzIHNldFxuICAgICAgICByZXR1cm4gKHRoaXMuYml0RmxhZyAmIDB4MDAwMSkgPT09IDB4MDAwMTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIHNheSBpZiB0aGUgZmlsZSBoYXMgdXRmLTggZmlsZW5hbWUvY29tbWVudC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBmaWxlbmFtZS9jb21tZW50IGlzIGluIHV0Zi04LCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgdXNlVVRGODogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGJpdCAxMSBpcyBzZXRcbiAgICAgICAgcmV0dXJuICh0aGlzLmJpdEZsYWcgJiAweDA4MDApID09PSAweDA4MDA7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBSZWFkIHRoZSBsb2NhbCBwYXJ0IG9mIGEgemlwIGZpbGUgYW5kIGFkZCB0aGUgaW5mbyBpbiB0aGlzIG9iamVjdC5cbiAgICAgKiBAcGFyYW0ge0RhdGFSZWFkZXJ9IHJlYWRlciB0aGUgcmVhZGVyIHRvIHVzZS5cbiAgICAgKi9cbiAgICByZWFkTG9jYWxQYXJ0OiBmdW5jdGlvbihyZWFkZXIpIHtcbiAgICAgICAgdmFyIGNvbXByZXNzaW9uLCBsb2NhbEV4dHJhRmllbGRzTGVuZ3RoO1xuXG4gICAgICAgIC8vIHdlIGFscmVhZHkga25vdyBldmVyeXRoaW5nIGZyb20gdGhlIGNlbnRyYWwgZGlyICFcbiAgICAgICAgLy8gSWYgdGhlIGNlbnRyYWwgZGlyIGRhdGEgYXJlIGZhbHNlLCB3ZSBhcmUgZG9vbWVkLlxuICAgICAgICAvLyBPbiB0aGUgYnJpZ2h0IHNpZGUsIHRoZSBsb2NhbCBwYXJ0IGlzIHNjYXJ5ICA6IHppcDY0LCBkYXRhIGRlc2NyaXB0b3JzLCBib3RoLCBldGMuXG4gICAgICAgIC8vIFRoZSBsZXNzIGRhdGEgd2UgZ2V0IGhlcmUsIHRoZSBtb3JlIHJlbGlhYmxlIHRoaXMgc2hvdWxkIGJlLlxuICAgICAgICAvLyBMZXQncyBza2lwIHRoZSB3aG9sZSBoZWFkZXIgYW5kIGRhc2ggdG8gdGhlIGRhdGEgIVxuICAgICAgICByZWFkZXIuc2tpcCgyMik7XG4gICAgICAgIC8vIGluIHNvbWUgemlwIGNyZWF0ZWQgb24gd2luZG93cywgdGhlIGZpbGVuYW1lIHN0b3JlZCBpbiB0aGUgY2VudHJhbCBkaXIgY29udGFpbnMgXFwgaW5zdGVhZCBvZiAvLlxuICAgICAgICAvLyBTdHJhbmdlbHksIHRoZSBmaWxlbmFtZSBoZXJlIGlzIE9LLlxuICAgICAgICAvLyBJIHdvdWxkIGxvdmUgdG8gdHJlYXQgdGhlc2UgemlwIGZpbGVzIGFzIGNvcnJ1cHRlZCAoc2VlIGh0dHA6Ly93d3cuaW5mby16aXAub3JnL0ZBUS5odG1sI2JhY2tzbGFzaGVzXG4gICAgICAgIC8vIG9yIEFQUE5PVEUjNC40LjE3LjEsIFwiQWxsIHNsYXNoZXMgTVVTVCBiZSBmb3J3YXJkIHNsYXNoZXMgJy8nXCIpIGJ1dCB0aGVyZSBhcmUgYSBsb3Qgb2YgYmFkIHppcCBnZW5lcmF0b3JzLi4uXG4gICAgICAgIC8vIFNlYXJjaCBcInVuemlwIG1pc21hdGNoaW5nIFwibG9jYWxcIiBmaWxlbmFtZSBjb250aW51aW5nIHdpdGggXCJjZW50cmFsXCIgZmlsZW5hbWUgdmVyc2lvblwiIG9uXG4gICAgICAgIC8vIHRoZSBpbnRlcm5ldC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gSSB0aGluayBJIHNlZSB0aGUgbG9naWMgaGVyZSA6IHRoZSBjZW50cmFsIGRpcmVjdG9yeSBpcyB1c2VkIHRvIGRpc3BsYXlcbiAgICAgICAgLy8gY29udGVudCBhbmQgdGhlIGxvY2FsIGRpcmVjdG9yeSBpcyB1c2VkIHRvIGV4dHJhY3QgdGhlIGZpbGVzLiBNaXhpbmcgLyBhbmQgXFxcbiAgICAgICAgLy8gbWF5IGJlIHVzZWQgdG8gZGlzcGxheSBcXCB0byB3aW5kb3dzIHVzZXJzIGFuZCB1c2UgLyB3aGVuIGV4dHJhY3RpbmcgdGhlIGZpbGVzLlxuICAgICAgICAvLyBVbmZvcnR1bmF0ZWx5LCB0aGlzIGxlYWQgYWxzbyB0byBzb21lIGlzc3VlcyA6IGh0dHA6Ly9zZWNsaXN0cy5vcmcvZnVsbGRpc2Nsb3N1cmUvMjAwOS9TZXAvMzk0XG4gICAgICAgIHRoaXMuZmlsZU5hbWVMZW5ndGggPSByZWFkZXIucmVhZEludCgyKTtcbiAgICAgICAgbG9jYWxFeHRyYUZpZWxkc0xlbmd0aCA9IHJlYWRlci5yZWFkSW50KDIpOyAvLyBjYW4ndCBiZSBzdXJlIHRoaXMgd2lsbCBiZSB0aGUgc2FtZSBhcyB0aGUgY2VudHJhbCBkaXJcbiAgICAgICAgLy8gdGhlIGZpbGVOYW1lIGlzIHN0b3JlZCBhcyBiaW5hcnkgZGF0YSwgdGhlIGhhbmRsZVVURjggbWV0aG9kIHdpbGwgdGFrZSBjYXJlIG9mIHRoZSBlbmNvZGluZy5cbiAgICAgICAgdGhpcy5maWxlTmFtZSA9IHJlYWRlci5yZWFkRGF0YSh0aGlzLmZpbGVOYW1lTGVuZ3RoKTtcbiAgICAgICAgcmVhZGVyLnNraXAobG9jYWxFeHRyYUZpZWxkc0xlbmd0aCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29tcHJlc3NlZFNpemUgPT09IC0xIHx8IHRoaXMudW5jb21wcmVzc2VkU2l6ZSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJ1ZyBvciBjb3JydXB0ZWQgemlwIDogZGlkbid0IGdldCBlbm91Z2ggaW5mb3JtYXRpb24gZnJvbSB0aGUgY2VudHJhbCBkaXJlY3RvcnkgXCIgKyBcIihjb21wcmVzc2VkU2l6ZSA9PT0gLTEgfHwgdW5jb21wcmVzc2VkU2l6ZSA9PT0gLTEpXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29tcHJlc3Npb24gPSBmaW5kQ29tcHJlc3Npb24odGhpcy5jb21wcmVzc2lvbk1ldGhvZCk7XG4gICAgICAgIGlmIChjb21wcmVzc2lvbiA9PT0gbnVsbCkgeyAvLyBubyBjb21wcmVzc2lvbiBmb3VuZFxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcCA6IGNvbXByZXNzaW9uIFwiICsgdXRpbHMucHJldHR5KHRoaXMuY29tcHJlc3Npb25NZXRob2QpICsgXCIgdW5rbm93biAoaW5uZXIgZmlsZSA6IFwiICsgdXRpbHMudHJhbnNmb3JtVG8oXCJzdHJpbmdcIiwgdGhpcy5maWxlTmFtZSkgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZWNvbXByZXNzZWQgPSBuZXcgQ29tcHJlc3NlZE9iamVjdCh0aGlzLmNvbXByZXNzZWRTaXplLCB0aGlzLnVuY29tcHJlc3NlZFNpemUsIHRoaXMuY3JjMzIsIGNvbXByZXNzaW9uLCByZWFkZXIucmVhZERhdGEodGhpcy5jb21wcmVzc2VkU2l6ZSkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZWFkIHRoZSBjZW50cmFsIHBhcnQgb2YgYSB6aXAgZmlsZSBhbmQgYWRkIHRoZSBpbmZvIGluIHRoaXMgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB7RGF0YVJlYWRlcn0gcmVhZGVyIHRoZSByZWFkZXIgdG8gdXNlLlxuICAgICAqL1xuICAgIHJlYWRDZW50cmFsUGFydDogZnVuY3Rpb24ocmVhZGVyKSB7XG4gICAgICAgIHRoaXMudmVyc2lvbk1hZGVCeSA9IHJlYWRlci5yZWFkSW50KDIpO1xuICAgICAgICByZWFkZXIuc2tpcCgyKTtcbiAgICAgICAgLy8gdGhpcy52ZXJzaW9uTmVlZGVkID0gcmVhZGVyLnJlYWRJbnQoMik7XG4gICAgICAgIHRoaXMuYml0RmxhZyA9IHJlYWRlci5yZWFkSW50KDIpO1xuICAgICAgICB0aGlzLmNvbXByZXNzaW9uTWV0aG9kID0gcmVhZGVyLnJlYWRTdHJpbmcoMik7XG4gICAgICAgIHRoaXMuZGF0ZSA9IHJlYWRlci5yZWFkRGF0ZSgpO1xuICAgICAgICB0aGlzLmNyYzMyID0gcmVhZGVyLnJlYWRJbnQoNCk7XG4gICAgICAgIHRoaXMuY29tcHJlc3NlZFNpemUgPSByZWFkZXIucmVhZEludCg0KTtcbiAgICAgICAgdGhpcy51bmNvbXByZXNzZWRTaXplID0gcmVhZGVyLnJlYWRJbnQoNCk7XG4gICAgICAgIHZhciBmaWxlTmFtZUxlbmd0aCA9IHJlYWRlci5yZWFkSW50KDIpO1xuICAgICAgICB0aGlzLmV4dHJhRmllbGRzTGVuZ3RoID0gcmVhZGVyLnJlYWRJbnQoMik7XG4gICAgICAgIHRoaXMuZmlsZUNvbW1lbnRMZW5ndGggPSByZWFkZXIucmVhZEludCgyKTtcbiAgICAgICAgdGhpcy5kaXNrTnVtYmVyU3RhcnQgPSByZWFkZXIucmVhZEludCgyKTtcbiAgICAgICAgdGhpcy5pbnRlcm5hbEZpbGVBdHRyaWJ1dGVzID0gcmVhZGVyLnJlYWRJbnQoMik7XG4gICAgICAgIHRoaXMuZXh0ZXJuYWxGaWxlQXR0cmlidXRlcyA9IHJlYWRlci5yZWFkSW50KDQpO1xuICAgICAgICB0aGlzLmxvY2FsSGVhZGVyT2Zmc2V0ID0gcmVhZGVyLnJlYWRJbnQoNCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNFbmNyeXB0ZWQoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRW5jcnlwdGVkIHppcCBhcmUgbm90IHN1cHBvcnRlZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdpbGwgYmUgcmVhZCBpbiB0aGUgbG9jYWwgcGFydCwgc2VlIHRoZSBjb21tZW50cyB0aGVyZVxuICAgICAgICByZWFkZXIuc2tpcChmaWxlTmFtZUxlbmd0aCk7XG4gICAgICAgIHRoaXMucmVhZEV4dHJhRmllbGRzKHJlYWRlcik7XG4gICAgICAgIHRoaXMucGFyc2VaSVA2NEV4dHJhRmllbGQocmVhZGVyKTtcbiAgICAgICAgdGhpcy5maWxlQ29tbWVudCA9IHJlYWRlci5yZWFkRGF0YSh0aGlzLmZpbGVDb21tZW50TGVuZ3RoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgdGhlIGV4dGVybmFsIGZpbGUgYXR0cmlidXRlcyBhbmQgZ2V0IHRoZSB1bml4L2RvcyBwZXJtaXNzaW9ucy5cbiAgICAgKi9cbiAgICBwcm9jZXNzQXR0cmlidXRlczogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnVuaXhQZXJtaXNzaW9ucyA9IG51bGw7XG4gICAgICAgIHRoaXMuZG9zUGVybWlzc2lvbnMgPSBudWxsO1xuICAgICAgICB2YXIgbWFkZUJ5ID0gdGhpcy52ZXJzaW9uTWFkZUJ5ID4+IDg7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgd2UgaGF2ZSB0aGUgRE9TIGRpcmVjdG9yeSBmbGFnIHNldC5cbiAgICAgICAgLy8gV2UgbG9vayBmb3IgaXQgaW4gdGhlIERPUyBhbmQgVU5JWCBwZXJtaXNzaW9uc1xuICAgICAgICAvLyBidXQgc29tZSB1bmtub3duIHBsYXRmb3JtIGNvdWxkIHNldCBpdCBhcyBhIGNvbXBhdGliaWxpdHkgZmxhZy5cbiAgICAgICAgdGhpcy5kaXIgPSB0aGlzLmV4dGVybmFsRmlsZUF0dHJpYnV0ZXMgJiAweDAwMTAgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgaWYobWFkZUJ5ID09PSBNQURFX0JZX0RPUykge1xuICAgICAgICAgICAgLy8gZmlyc3QgNiBiaXRzICgwIHRvIDUpXG4gICAgICAgICAgICB0aGlzLmRvc1Blcm1pc3Npb25zID0gdGhpcy5leHRlcm5hbEZpbGVBdHRyaWJ1dGVzICYgMHgzRjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1hZGVCeSA9PT0gTUFERV9CWV9VTklYKSB7XG4gICAgICAgICAgICB0aGlzLnVuaXhQZXJtaXNzaW9ucyA9ICh0aGlzLmV4dGVybmFsRmlsZUF0dHJpYnV0ZXMgPj4gMTYpICYgMHhGRkZGO1xuICAgICAgICAgICAgLy8gdGhlIG9jdGFsIHBlcm1pc3Npb25zIGFyZSBpbiAodGhpcy51bml4UGVybWlzc2lvbnMgJiAweDAxRkYpLnRvU3RyaW5nKDgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmFpbCBzYWZlIDogaWYgdGhlIG5hbWUgZW5kcyB3aXRoIGEgLyBpdCBwcm9iYWJseSBtZWFucyBhIGZvbGRlclxuICAgICAgICBpZiAoIXRoaXMuZGlyICYmIHRoaXMuZmlsZU5hbWVTdHIuc2xpY2UoLTEpID09PSAnLycpIHtcbiAgICAgICAgICAgIHRoaXMuZGlyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSB0aGUgWklQNjQgZXh0cmEgZmllbGQgYW5kIG1lcmdlIHRoZSBpbmZvIGluIHRoZSBjdXJyZW50IFppcEVudHJ5LlxuICAgICAqIEBwYXJhbSB7RGF0YVJlYWRlcn0gcmVhZGVyIHRoZSByZWFkZXIgdG8gdXNlLlxuICAgICAqL1xuICAgIHBhcnNlWklQNjRFeHRyYUZpZWxkOiBmdW5jdGlvbihyZWFkZXIpIHtcblxuICAgICAgICBpZiAoIXRoaXMuZXh0cmFGaWVsZHNbMHgwMDAxXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2hvdWxkIGJlIHNvbWV0aGluZywgcHJlcGFyaW5nIHRoZSBleHRyYSByZWFkZXJcbiAgICAgICAgdmFyIGV4dHJhUmVhZGVyID0gcmVhZGVyRm9yKHRoaXMuZXh0cmFGaWVsZHNbMHgwMDAxXS52YWx1ZSk7XG5cbiAgICAgICAgLy8gSSByZWFsbHkgaG9wZSB0aGF0IHRoZXNlIDY0Yml0cyBpbnRlZ2VyIGNhbiBmaXQgaW4gMzIgYml0cyBpbnRlZ2VyLCBiZWNhdXNlIGpzXG4gICAgICAgIC8vIHdvbid0IGxldCB1cyBoYXZlIG1vcmUuXG4gICAgICAgIGlmICh0aGlzLnVuY29tcHJlc3NlZFNpemUgPT09IHV0aWxzLk1BWF9WQUxVRV8zMkJJVFMpIHtcbiAgICAgICAgICAgIHRoaXMudW5jb21wcmVzc2VkU2l6ZSA9IGV4dHJhUmVhZGVyLnJlYWRJbnQoOCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29tcHJlc3NlZFNpemUgPT09IHV0aWxzLk1BWF9WQUxVRV8zMkJJVFMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcHJlc3NlZFNpemUgPSBleHRyYVJlYWRlci5yZWFkSW50KDgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxvY2FsSGVhZGVyT2Zmc2V0ID09PSB1dGlscy5NQVhfVkFMVUVfMzJCSVRTKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2FsSGVhZGVyT2Zmc2V0ID0gZXh0cmFSZWFkZXIucmVhZEludCg4KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kaXNrTnVtYmVyU3RhcnQgPT09IHV0aWxzLk1BWF9WQUxVRV8zMkJJVFMpIHtcbiAgICAgICAgICAgIHRoaXMuZGlza051bWJlclN0YXJ0ID0gZXh0cmFSZWFkZXIucmVhZEludCg0KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogUmVhZCB0aGUgY2VudHJhbCBwYXJ0IG9mIGEgemlwIGZpbGUgYW5kIGFkZCB0aGUgaW5mbyBpbiB0aGlzIG9iamVjdC5cbiAgICAgKiBAcGFyYW0ge0RhdGFSZWFkZXJ9IHJlYWRlciB0aGUgcmVhZGVyIHRvIHVzZS5cbiAgICAgKi9cbiAgICByZWFkRXh0cmFGaWVsZHM6IGZ1bmN0aW9uKHJlYWRlcikge1xuICAgICAgICB2YXIgZW5kID0gcmVhZGVyLmluZGV4ICsgdGhpcy5leHRyYUZpZWxkc0xlbmd0aCxcbiAgICAgICAgICAgIGV4dHJhRmllbGRJZCxcbiAgICAgICAgICAgIGV4dHJhRmllbGRMZW5ndGgsXG4gICAgICAgICAgICBleHRyYUZpZWxkVmFsdWU7XG5cbiAgICAgICAgaWYgKCF0aGlzLmV4dHJhRmllbGRzKSB7XG4gICAgICAgICAgICB0aGlzLmV4dHJhRmllbGRzID0ge307XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAocmVhZGVyLmluZGV4ICsgNCA8IGVuZCkge1xuICAgICAgICAgICAgZXh0cmFGaWVsZElkID0gcmVhZGVyLnJlYWRJbnQoMik7XG4gICAgICAgICAgICBleHRyYUZpZWxkTGVuZ3RoID0gcmVhZGVyLnJlYWRJbnQoMik7XG4gICAgICAgICAgICBleHRyYUZpZWxkVmFsdWUgPSByZWFkZXIucmVhZERhdGEoZXh0cmFGaWVsZExlbmd0aCk7XG5cbiAgICAgICAgICAgIHRoaXMuZXh0cmFGaWVsZHNbZXh0cmFGaWVsZElkXSA9IHtcbiAgICAgICAgICAgICAgICBpZDogZXh0cmFGaWVsZElkLFxuICAgICAgICAgICAgICAgIGxlbmd0aDogZXh0cmFGaWVsZExlbmd0aCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogZXh0cmFGaWVsZFZhbHVlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmVhZGVyLnNldEluZGV4KGVuZCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBBcHBseSBhbiBVVEY4IHRyYW5zZm9ybWF0aW9uIGlmIG5lZWRlZC5cbiAgICAgKi9cbiAgICBoYW5kbGVVVEY4OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRlY29kZVBhcmFtVHlwZSA9IHN1cHBvcnQudWludDhhcnJheSA/IFwidWludDhhcnJheVwiIDogXCJhcnJheVwiO1xuICAgICAgICBpZiAodGhpcy51c2VVVEY4KCkpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsZU5hbWVTdHIgPSB1dGY4LnV0ZjhkZWNvZGUodGhpcy5maWxlTmFtZSk7XG4gICAgICAgICAgICB0aGlzLmZpbGVDb21tZW50U3RyID0gdXRmOC51dGY4ZGVjb2RlKHRoaXMuZmlsZUNvbW1lbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHVwYXRoID0gdGhpcy5maW5kRXh0cmFGaWVsZFVuaWNvZGVQYXRoKCk7XG4gICAgICAgICAgICBpZiAodXBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVOYW1lU3RyID0gdXBhdGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEFTQ0lJIHRleHQgb3IgdW5zdXBwb3J0ZWQgY29kZSBwYWdlXG4gICAgICAgICAgICAgICAgdmFyIGZpbGVOYW1lQnl0ZUFycmF5ID0gIHV0aWxzLnRyYW5zZm9ybVRvKGRlY29kZVBhcmFtVHlwZSwgdGhpcy5maWxlTmFtZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlTmFtZVN0ciA9IHRoaXMubG9hZE9wdGlvbnMuZGVjb2RlRmlsZU5hbWUoZmlsZU5hbWVCeXRlQXJyYXkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdWNvbW1lbnQgPSB0aGlzLmZpbmRFeHRyYUZpZWxkVW5pY29kZUNvbW1lbnQoKTtcbiAgICAgICAgICAgIGlmICh1Y29tbWVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsZUNvbW1lbnRTdHIgPSB1Y29tbWVudDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gQVNDSUkgdGV4dCBvciB1bnN1cHBvcnRlZCBjb2RlIHBhZ2VcbiAgICAgICAgICAgICAgICB2YXIgY29tbWVudEJ5dGVBcnJheSA9ICB1dGlscy50cmFuc2Zvcm1UbyhkZWNvZGVQYXJhbVR5cGUsIHRoaXMuZmlsZUNvbW1lbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsZUNvbW1lbnRTdHIgPSB0aGlzLmxvYWRPcHRpb25zLmRlY29kZUZpbGVOYW1lKGNvbW1lbnRCeXRlQXJyYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEZpbmQgdGhlIHVuaWNvZGUgcGF0aCBkZWNsYXJlZCBpbiB0aGUgZXh0cmEgZmllbGQsIGlmIGFueS5cbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSB1bmljb2RlIHBhdGgsIG51bGwgb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIGZpbmRFeHRyYUZpZWxkVW5pY29kZVBhdGg6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdXBhdGhGaWVsZCA9IHRoaXMuZXh0cmFGaWVsZHNbMHg3MDc1XTtcbiAgICAgICAgaWYgKHVwYXRoRmllbGQpIHtcbiAgICAgICAgICAgIHZhciBleHRyYVJlYWRlciA9IHJlYWRlckZvcih1cGF0aEZpZWxkLnZhbHVlKTtcblxuICAgICAgICAgICAgLy8gd3JvbmcgdmVyc2lvblxuICAgICAgICAgICAgaWYgKGV4dHJhUmVhZGVyLnJlYWRJbnQoMSkgIT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdGhlIGNyYyBvZiB0aGUgZmlsZW5hbWUgY2hhbmdlZCwgdGhpcyBmaWVsZCBpcyBvdXQgb2YgZGF0ZS5cbiAgICAgICAgICAgIGlmIChjcmMzMmZuKHRoaXMuZmlsZU5hbWUpICE9PSBleHRyYVJlYWRlci5yZWFkSW50KDQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB1dGY4LnV0ZjhkZWNvZGUoZXh0cmFSZWFkZXIucmVhZERhdGEodXBhdGhGaWVsZC5sZW5ndGggLSA1KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEZpbmQgdGhlIHVuaWNvZGUgY29tbWVudCBkZWNsYXJlZCBpbiB0aGUgZXh0cmEgZmllbGQsIGlmIGFueS5cbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSB1bmljb2RlIGNvbW1lbnQsIG51bGwgb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIGZpbmRFeHRyYUZpZWxkVW5pY29kZUNvbW1lbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdWNvbW1lbnRGaWVsZCA9IHRoaXMuZXh0cmFGaWVsZHNbMHg2Mzc1XTtcbiAgICAgICAgaWYgKHVjb21tZW50RmllbGQpIHtcbiAgICAgICAgICAgIHZhciBleHRyYVJlYWRlciA9IHJlYWRlckZvcih1Y29tbWVudEZpZWxkLnZhbHVlKTtcblxuICAgICAgICAgICAgLy8gd3JvbmcgdmVyc2lvblxuICAgICAgICAgICAgaWYgKGV4dHJhUmVhZGVyLnJlYWRJbnQoMSkgIT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdGhlIGNyYyBvZiB0aGUgY29tbWVudCBjaGFuZ2VkLCB0aGlzIGZpZWxkIGlzIG91dCBvZiBkYXRlLlxuICAgICAgICAgICAgaWYgKGNyYzMyZm4odGhpcy5maWxlQ29tbWVudCkgIT09IGV4dHJhUmVhZGVyLnJlYWRJbnQoNCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHV0ZjgudXRmOGRlY29kZShleHRyYVJlYWRlci5yZWFkRGF0YSh1Y29tbWVudEZpZWxkLmxlbmd0aCAtIDUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBaaXBFbnRyeTtcbiIsICIndXNlIHN0cmljdCc7XG52YXIgcmVhZGVyRm9yID0gcmVxdWlyZSgnLi9yZWFkZXIvcmVhZGVyRm9yJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgc2lnID0gcmVxdWlyZSgnLi9zaWduYXR1cmUnKTtcbnZhciBaaXBFbnRyeSA9IHJlcXVpcmUoJy4vemlwRW50cnknKTtcbnZhciB1dGY4ID0gcmVxdWlyZSgnLi91dGY4Jyk7XG52YXIgc3VwcG9ydCA9IHJlcXVpcmUoJy4vc3VwcG9ydCcpO1xuLy8gIGNsYXNzIFppcEVudHJpZXMge3t7XG4vKipcbiAqIEFsbCB0aGUgZW50cmllcyBpbiB0aGUgemlwIGZpbGUuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBsb2FkT3B0aW9ucyBPcHRpb25zIGZvciBsb2FkaW5nIHRoZSBzdHJlYW0uXG4gKi9cbmZ1bmN0aW9uIFppcEVudHJpZXMobG9hZE9wdGlvbnMpIHtcbiAgICB0aGlzLmZpbGVzID0gW107XG4gICAgdGhpcy5sb2FkT3B0aW9ucyA9IGxvYWRPcHRpb25zO1xufVxuWmlwRW50cmllcy5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhhdCB0aGUgcmVhZGVyIGlzIG9uIHRoZSBzcGVjaWZpZWQgc2lnbmF0dXJlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBleHBlY3RlZFNpZ25hdHVyZSB0aGUgZXhwZWN0ZWQgc2lnbmF0dXJlLlxuICAgICAqIEB0aHJvd3Mge0Vycm9yfSBpZiBpdCBpcyBhbiBvdGhlciBzaWduYXR1cmUuXG4gICAgICovXG4gICAgY2hlY2tTaWduYXR1cmU6IGZ1bmN0aW9uKGV4cGVjdGVkU2lnbmF0dXJlKSB7XG4gICAgICAgIGlmICghdGhpcy5yZWFkZXIucmVhZEFuZENoZWNrU2lnbmF0dXJlKGV4cGVjdGVkU2lnbmF0dXJlKSkge1xuICAgICAgICAgICAgdGhpcy5yZWFkZXIuaW5kZXggLT0gNDtcbiAgICAgICAgICAgIHZhciBzaWduYXR1cmUgPSB0aGlzLnJlYWRlci5yZWFkU3RyaW5nKDQpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcCBvciBidWc6IHVuZXhwZWN0ZWQgc2lnbmF0dXJlIFwiICsgXCIoXCIgKyB1dGlscy5wcmV0dHkoc2lnbmF0dXJlKSArIFwiLCBleHBlY3RlZCBcIiArIHV0aWxzLnByZXR0eShleHBlY3RlZFNpZ25hdHVyZSkgKyBcIilcIik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBnaXZlbiBzaWduYXR1cmUgaXMgYXQgdGhlIGdpdmVuIGluZGV4LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhc2tlZEluZGV4IHRoZSBpbmRleCB0byBjaGVjay5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXhwZWN0ZWRTaWduYXR1cmUgdGhlIHNpZ25hdHVyZSB0byBleHBlY3QuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgc2lnbmF0dXJlIGlzIGhlcmUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBpc1NpZ25hdHVyZTogZnVuY3Rpb24oYXNrZWRJbmRleCwgZXhwZWN0ZWRTaWduYXR1cmUpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IHRoaXMucmVhZGVyLmluZGV4O1xuICAgICAgICB0aGlzLnJlYWRlci5zZXRJbmRleChhc2tlZEluZGV4KTtcbiAgICAgICAgdmFyIHNpZ25hdHVyZSA9IHRoaXMucmVhZGVyLnJlYWRTdHJpbmcoNCk7XG4gICAgICAgIHZhciByZXN1bHQgPSBzaWduYXR1cmUgPT09IGV4cGVjdGVkU2lnbmF0dXJlO1xuICAgICAgICB0aGlzLnJlYWRlci5zZXRJbmRleChjdXJyZW50SW5kZXgpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogUmVhZCB0aGUgZW5kIG9mIHRoZSBjZW50cmFsIGRpcmVjdG9yeS5cbiAgICAgKi9cbiAgICByZWFkQmxvY2tFbmRPZkNlbnRyYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc2tOdW1iZXIgPSB0aGlzLnJlYWRlci5yZWFkSW50KDIpO1xuICAgICAgICB0aGlzLmRpc2tXaXRoQ2VudHJhbERpclN0YXJ0ID0gdGhpcy5yZWFkZXIucmVhZEludCgyKTtcbiAgICAgICAgdGhpcy5jZW50cmFsRGlyUmVjb3Jkc09uVGhpc0Rpc2sgPSB0aGlzLnJlYWRlci5yZWFkSW50KDIpO1xuICAgICAgICB0aGlzLmNlbnRyYWxEaXJSZWNvcmRzID0gdGhpcy5yZWFkZXIucmVhZEludCgyKTtcbiAgICAgICAgdGhpcy5jZW50cmFsRGlyU2l6ZSA9IHRoaXMucmVhZGVyLnJlYWRJbnQoNCk7XG4gICAgICAgIHRoaXMuY2VudHJhbERpck9mZnNldCA9IHRoaXMucmVhZGVyLnJlYWRJbnQoNCk7XG5cbiAgICAgICAgdGhpcy56aXBDb21tZW50TGVuZ3RoID0gdGhpcy5yZWFkZXIucmVhZEludCgyKTtcbiAgICAgICAgLy8gd2FybmluZyA6IHRoZSBlbmNvZGluZyBkZXBlbmRzIG9mIHRoZSBzeXN0ZW0gbG9jYWxlXG4gICAgICAgIC8vIE9uIGEgbGludXggbWFjaGluZSB3aXRoIExBTkc9ZW5fVVMudXRmOCwgdGhpcyBmaWVsZCBpcyB1dGY4IGVuY29kZWQuXG4gICAgICAgIC8vIE9uIGEgd2luZG93cyBtYWNoaW5lLCB0aGlzIGZpZWxkIGlzIGVuY29kZWQgd2l0aCB0aGUgbG9jYWxpemVkIHdpbmRvd3MgY29kZSBwYWdlLlxuICAgICAgICB2YXIgemlwQ29tbWVudCA9IHRoaXMucmVhZGVyLnJlYWREYXRhKHRoaXMuemlwQ29tbWVudExlbmd0aCk7XG4gICAgICAgIHZhciBkZWNvZGVQYXJhbVR5cGUgPSBzdXBwb3J0LnVpbnQ4YXJyYXkgPyBcInVpbnQ4YXJyYXlcIiA6IFwiYXJyYXlcIjtcbiAgICAgICAgLy8gVG8gZ2V0IGNvbnNpc3RlbnQgYmVoYXZpb3Igd2l0aCB0aGUgZ2VuZXJhdGlvbiBwYXJ0LCB3ZSB3aWxsIGFzc3VtZSB0aGF0XG4gICAgICAgIC8vIHRoaXMgaXMgdXRmOCBlbmNvZGVkIHVubGVzcyBzcGVjaWZpZWQgb3RoZXJ3aXNlLlxuICAgICAgICB2YXIgZGVjb2RlQ29udGVudCA9IHV0aWxzLnRyYW5zZm9ybVRvKGRlY29kZVBhcmFtVHlwZSwgemlwQ29tbWVudCk7XG4gICAgICAgIHRoaXMuemlwQ29tbWVudCA9IHRoaXMubG9hZE9wdGlvbnMuZGVjb2RlRmlsZU5hbWUoZGVjb2RlQ29udGVudCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBSZWFkIHRoZSBlbmQgb2YgdGhlIFppcCA2NCBjZW50cmFsIGRpcmVjdG9yeS5cbiAgICAgKiBOb3QgbWVyZ2VkIHdpdGggdGhlIG1ldGhvZCByZWFkRW5kT2ZDZW50cmFsIDpcbiAgICAgKiBUaGUgZW5kIG9mIGNlbnRyYWwgY2FuIGNvZXhpc3Qgd2l0aCBpdHMgWmlwNjQgYnJvdGhlcixcbiAgICAgKiBJIGRvbid0IHdhbnQgdG8gcmVhZCB0aGUgd3JvbmcgbnVtYmVyIG9mIGJ5dGVzICFcbiAgICAgKi9cbiAgICByZWFkQmxvY2taaXA2NEVuZE9mQ2VudHJhbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuemlwNjRFbmRPZkNlbnRyYWxTaXplID0gdGhpcy5yZWFkZXIucmVhZEludCg4KTtcbiAgICAgICAgdGhpcy5yZWFkZXIuc2tpcCg0KTtcbiAgICAgICAgLy8gdGhpcy52ZXJzaW9uTWFkZUJ5ID0gdGhpcy5yZWFkZXIucmVhZFN0cmluZygyKTtcbiAgICAgICAgLy8gdGhpcy52ZXJzaW9uTmVlZGVkID0gdGhpcy5yZWFkZXIucmVhZEludCgyKTtcbiAgICAgICAgdGhpcy5kaXNrTnVtYmVyID0gdGhpcy5yZWFkZXIucmVhZEludCg0KTtcbiAgICAgICAgdGhpcy5kaXNrV2l0aENlbnRyYWxEaXJTdGFydCA9IHRoaXMucmVhZGVyLnJlYWRJbnQoNCk7XG4gICAgICAgIHRoaXMuY2VudHJhbERpclJlY29yZHNPblRoaXNEaXNrID0gdGhpcy5yZWFkZXIucmVhZEludCg4KTtcbiAgICAgICAgdGhpcy5jZW50cmFsRGlyUmVjb3JkcyA9IHRoaXMucmVhZGVyLnJlYWRJbnQoOCk7XG4gICAgICAgIHRoaXMuY2VudHJhbERpclNpemUgPSB0aGlzLnJlYWRlci5yZWFkSW50KDgpO1xuICAgICAgICB0aGlzLmNlbnRyYWxEaXJPZmZzZXQgPSB0aGlzLnJlYWRlci5yZWFkSW50KDgpO1xuXG4gICAgICAgIHRoaXMuemlwNjRFeHRlbnNpYmxlRGF0YSA9IHt9O1xuICAgICAgICB2YXIgZXh0cmFEYXRhU2l6ZSA9IHRoaXMuemlwNjRFbmRPZkNlbnRyYWxTaXplIC0gNDQsXG4gICAgICAgICAgICBpbmRleCA9IDAsXG4gICAgICAgICAgICBleHRyYUZpZWxkSWQsXG4gICAgICAgICAgICBleHRyYUZpZWxkTGVuZ3RoLFxuICAgICAgICAgICAgZXh0cmFGaWVsZFZhbHVlO1xuICAgICAgICB3aGlsZSAoaW5kZXggPCBleHRyYURhdGFTaXplKSB7XG4gICAgICAgICAgICBleHRyYUZpZWxkSWQgPSB0aGlzLnJlYWRlci5yZWFkSW50KDIpO1xuICAgICAgICAgICAgZXh0cmFGaWVsZExlbmd0aCA9IHRoaXMucmVhZGVyLnJlYWRJbnQoNCk7XG4gICAgICAgICAgICBleHRyYUZpZWxkVmFsdWUgPSB0aGlzLnJlYWRlci5yZWFkRGF0YShleHRyYUZpZWxkTGVuZ3RoKTtcbiAgICAgICAgICAgIHRoaXMuemlwNjRFeHRlbnNpYmxlRGF0YVtleHRyYUZpZWxkSWRdID0ge1xuICAgICAgICAgICAgICAgIGlkOiBleHRyYUZpZWxkSWQsXG4gICAgICAgICAgICAgICAgbGVuZ3RoOiBleHRyYUZpZWxkTGVuZ3RoLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBleHRyYUZpZWxkVmFsdWVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFJlYWQgdGhlIGVuZCBvZiB0aGUgWmlwIDY0IGNlbnRyYWwgZGlyZWN0b3J5IGxvY2F0b3IuXG4gICAgICovXG4gICAgcmVhZEJsb2NrWmlwNjRFbmRPZkNlbnRyYWxMb2NhdG9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNrV2l0aFppcDY0Q2VudHJhbERpclN0YXJ0ID0gdGhpcy5yZWFkZXIucmVhZEludCg0KTtcbiAgICAgICAgdGhpcy5yZWxhdGl2ZU9mZnNldEVuZE9mWmlwNjRDZW50cmFsRGlyID0gdGhpcy5yZWFkZXIucmVhZEludCg4KTtcbiAgICAgICAgdGhpcy5kaXNrc0NvdW50ID0gdGhpcy5yZWFkZXIucmVhZEludCg0KTtcbiAgICAgICAgaWYgKHRoaXMuZGlza3NDb3VudCA+IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11bHRpLXZvbHVtZXMgemlwIGFyZSBub3Qgc3VwcG9ydGVkXCIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBSZWFkIHRoZSBsb2NhbCBmaWxlcywgYmFzZWQgb24gdGhlIG9mZnNldCByZWFkIGluIHRoZSBjZW50cmFsIHBhcnQuXG4gICAgICovXG4gICAgcmVhZExvY2FsRmlsZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaSwgZmlsZTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZpbGUgPSB0aGlzLmZpbGVzW2ldO1xuICAgICAgICAgICAgdGhpcy5yZWFkZXIuc2V0SW5kZXgoZmlsZS5sb2NhbEhlYWRlck9mZnNldCk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrU2lnbmF0dXJlKHNpZy5MT0NBTF9GSUxFX0hFQURFUik7XG4gICAgICAgICAgICBmaWxlLnJlYWRMb2NhbFBhcnQodGhpcy5yZWFkZXIpO1xuICAgICAgICAgICAgZmlsZS5oYW5kbGVVVEY4KCk7XG4gICAgICAgICAgICBmaWxlLnByb2Nlc3NBdHRyaWJ1dGVzKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFJlYWQgdGhlIGNlbnRyYWwgZGlyZWN0b3J5LlxuICAgICAqL1xuICAgIHJlYWRDZW50cmFsRGlyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZpbGU7XG5cbiAgICAgICAgdGhpcy5yZWFkZXIuc2V0SW5kZXgodGhpcy5jZW50cmFsRGlyT2Zmc2V0KTtcbiAgICAgICAgd2hpbGUgKHRoaXMucmVhZGVyLnJlYWRBbmRDaGVja1NpZ25hdHVyZShzaWcuQ0VOVFJBTF9GSUxFX0hFQURFUikpIHtcbiAgICAgICAgICAgIGZpbGUgPSBuZXcgWmlwRW50cnkoe1xuICAgICAgICAgICAgICAgIHppcDY0OiB0aGlzLnppcDY0XG4gICAgICAgICAgICB9LCB0aGlzLmxvYWRPcHRpb25zKTtcbiAgICAgICAgICAgIGZpbGUucmVhZENlbnRyYWxQYXJ0KHRoaXMucmVhZGVyKTtcbiAgICAgICAgICAgIHRoaXMuZmlsZXMucHVzaChmaWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNlbnRyYWxEaXJSZWNvcmRzICE9PSB0aGlzLmZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2VudHJhbERpclJlY29yZHMgIT09IDAgJiYgdGhpcy5maWxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBleHBlY3RlZCBzb21lIHJlY29yZHMgYnV0IGNvdWxkbid0IGZpbmQgQU5ZLlxuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgcmVhbGx5IHN1c3BpY2lvdXMsIGFzIGlmIHNvbWV0aGluZyB3ZW50IHdyb25nLlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXAgb3IgYnVnOiBleHBlY3RlZCBcIiArIHRoaXMuY2VudHJhbERpclJlY29yZHMgKyBcIiByZWNvcmRzIGluIGNlbnRyYWwgZGlyLCBnb3QgXCIgKyB0aGlzLmZpbGVzLmxlbmd0aCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFdlIGZvdW5kIHNvbWUgcmVjb3JkcyBidXQgbm90IGFsbC5cbiAgICAgICAgICAgICAgICAvLyBTb21ldGhpbmcgaXMgd3JvbmcgYnV0IHdlIGdvdCBzb21ldGhpbmcgZm9yIHRoZSB1c2VyOiBubyBlcnJvciBoZXJlLlxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybihcImV4cGVjdGVkXCIsIHRoaXMuY2VudHJhbERpclJlY29yZHMsIFwicmVjb3JkcyBpbiBjZW50cmFsIGRpciwgZ290XCIsIHRoaXMuZmlsZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogUmVhZCB0aGUgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5LlxuICAgICAqL1xuICAgIHJlYWRFbmRPZkNlbnRyYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5yZWFkZXIubGFzdEluZGV4T2ZTaWduYXR1cmUoc2lnLkNFTlRSQUxfRElSRUNUT1JZX0VORCk7XG4gICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgY29udGVudCBpcyBhIHRydW5jYXRlZCB6aXAgb3IgY29tcGxldGUgZ2FyYmFnZS5cbiAgICAgICAgICAgIC8vIEEgXCJMT0NBTF9GSUxFX0hFQURFUlwiIGlzIG5vdCByZXF1aXJlZCBhdCB0aGUgYmVnaW5uaW5nIChhdXRvXG4gICAgICAgICAgICAvLyBleHRyYWN0aWJsZSB6aXAgZm9yIGV4YW1wbGUpIGJ1dCBpdCBjYW4gZ2l2ZSBhIGdvb2QgaGludC5cbiAgICAgICAgICAgIC8vIElmIGFuIGFqYXggcmVxdWVzdCB3YXMgdXNlZCB3aXRob3V0IHJlc3BvbnNlVHlwZSwgd2Ugd2lsbCBhbHNvXG4gICAgICAgICAgICAvLyBnZXQgdW5yZWFkYWJsZSBkYXRhLlxuICAgICAgICAgICAgdmFyIGlzR2FyYmFnZSA9ICF0aGlzLmlzU2lnbmF0dXJlKDAsIHNpZy5MT0NBTF9GSUxFX0hFQURFUik7XG5cbiAgICAgICAgICAgIGlmIChpc0dhcmJhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBmaW5kIGVuZCBvZiBjZW50cmFsIGRpcmVjdG9yeSA6IGlzIHRoaXMgYSB6aXAgZmlsZSA/IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJJZiBpdCBpcywgc2VlIGh0dHBzOi8vc3R1ay5naXRodWIuaW8vanN6aXAvZG9jdW1lbnRhdGlvbi9ob3d0by9yZWFkX3ppcC5odG1sXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3JydXB0ZWQgemlwOiBjYW4ndCBmaW5kIGVuZCBvZiBjZW50cmFsIGRpcmVjdG9yeVwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVhZGVyLnNldEluZGV4KG9mZnNldCk7XG4gICAgICAgIHZhciBlbmRPZkNlbnRyYWxEaXJPZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgIHRoaXMuY2hlY2tTaWduYXR1cmUoc2lnLkNFTlRSQUxfRElSRUNUT1JZX0VORCk7XG4gICAgICAgIHRoaXMucmVhZEJsb2NrRW5kT2ZDZW50cmFsKCk7XG5cblxuICAgICAgICAvKiBleHRyYWN0IGZyb20gdGhlIHppcCBzcGVjIDpcbiAgICAgICAgICAgIDQpICBJZiBvbmUgb2YgdGhlIGZpZWxkcyBpbiB0aGUgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5XG4gICAgICAgICAgICAgICAgcmVjb3JkIGlzIHRvbyBzbWFsbCB0byBob2xkIHJlcXVpcmVkIGRhdGEsIHRoZSBmaWVsZFxuICAgICAgICAgICAgICAgIHNob3VsZCBiZSBzZXQgdG8gLTEgKDB4RkZGRiBvciAweEZGRkZGRkZGKSBhbmQgdGhlXG4gICAgICAgICAgICAgICAgWklQNjQgZm9ybWF0IHJlY29yZCBzaG91bGQgYmUgY3JlYXRlZC5cbiAgICAgICAgICAgIDUpICBUaGUgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5IHJlY29yZCBhbmQgdGhlXG4gICAgICAgICAgICAgICAgWmlwNjQgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5IGxvY2F0b3IgcmVjb3JkIG11c3RcbiAgICAgICAgICAgICAgICByZXNpZGUgb24gdGhlIHNhbWUgZGlzayB3aGVuIHNwbGl0dGluZyBvciBzcGFubmluZ1xuICAgICAgICAgICAgICAgIGFuIGFyY2hpdmUuXG4gICAgICAgICAqL1xuICAgICAgICBpZiAodGhpcy5kaXNrTnVtYmVyID09PSB1dGlscy5NQVhfVkFMVUVfMTZCSVRTIHx8IHRoaXMuZGlza1dpdGhDZW50cmFsRGlyU3RhcnQgPT09IHV0aWxzLk1BWF9WQUxVRV8xNkJJVFMgfHwgdGhpcy5jZW50cmFsRGlyUmVjb3Jkc09uVGhpc0Rpc2sgPT09IHV0aWxzLk1BWF9WQUxVRV8xNkJJVFMgfHwgdGhpcy5jZW50cmFsRGlyUmVjb3JkcyA9PT0gdXRpbHMuTUFYX1ZBTFVFXzE2QklUUyB8fCB0aGlzLmNlbnRyYWxEaXJTaXplID09PSB1dGlscy5NQVhfVkFMVUVfMzJCSVRTIHx8IHRoaXMuY2VudHJhbERpck9mZnNldCA9PT0gdXRpbHMuTUFYX1ZBTFVFXzMyQklUUykge1xuICAgICAgICAgICAgdGhpcy56aXA2NCA9IHRydWU7XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBXYXJuaW5nIDogdGhlIHppcDY0IGV4dGVuc2lvbiBpcyBzdXBwb3J0ZWQsIGJ1dCBPTkxZIGlmIHRoZSA2NGJpdHMgaW50ZWdlciByZWFkIGZyb21cbiAgICAgICAgICAgIHRoZSB6aXAgZmlsZSBjYW4gZml0IGludG8gYSAzMmJpdHMgaW50ZWdlci4gVGhpcyBjYW5ub3QgYmUgc29sdmVkIDogSmF2YVNjcmlwdCByZXByZXNlbnRzXG4gICAgICAgICAgICBhbGwgbnVtYmVycyBhcyA2NC1iaXQgZG91YmxlIHByZWNpc2lvbiBJRUVFIDc1NCBmbG9hdGluZyBwb2ludCBudW1iZXJzLlxuICAgICAgICAgICAgU28sIHdlIGhhdmUgNTNiaXRzIGZvciBpbnRlZ2VycyBhbmQgYml0d2lzZSBvcGVyYXRpb25zIHRyZWF0IGV2ZXJ5dGhpbmcgYXMgMzJiaXRzLlxuICAgICAgICAgICAgc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvSmF2YVNjcmlwdC9SZWZlcmVuY2UvT3BlcmF0b3JzL0JpdHdpc2VfT3BlcmF0b3JzXG4gICAgICAgICAgICBhbmQgaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL3B1YmxpY2F0aW9ucy9maWxlcy9FQ01BLVNUL0VDTUEtMjYyLnBkZiBzZWN0aW9uIDguNVxuICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgLy8gc2hvdWxkIGxvb2sgZm9yIGEgemlwNjQgRU9DRCBsb2NhdG9yXG4gICAgICAgICAgICBvZmZzZXQgPSB0aGlzLnJlYWRlci5sYXN0SW5kZXhPZlNpZ25hdHVyZShzaWcuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfTE9DQVRPUik7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXA6IGNhbid0IGZpbmQgdGhlIFpJUDY0IGVuZCBvZiBjZW50cmFsIGRpcmVjdG9yeSBsb2NhdG9yXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZWFkZXIuc2V0SW5kZXgob2Zmc2V0KTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tTaWduYXR1cmUoc2lnLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0xPQ0FUT1IpO1xuICAgICAgICAgICAgdGhpcy5yZWFkQmxvY2taaXA2NEVuZE9mQ2VudHJhbExvY2F0b3IoKTtcblxuICAgICAgICAgICAgLy8gbm93IHRoZSB6aXA2NCBFT0NEIHJlY29yZFxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2lnbmF0dXJlKHRoaXMucmVsYXRpdmVPZmZzZXRFbmRPZlppcDY0Q2VudHJhbERpciwgc2lnLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0VORCkpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oXCJaSVA2NCBlbmQgb2YgY2VudHJhbCBkaXJlY3Rvcnkgbm90IHdoZXJlIGV4cGVjdGVkLlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbGF0aXZlT2Zmc2V0RW5kT2ZaaXA2NENlbnRyYWxEaXIgPSB0aGlzLnJlYWRlci5sYXN0SW5kZXhPZlNpZ25hdHVyZShzaWcuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfRU5EKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWxhdGl2ZU9mZnNldEVuZE9mWmlwNjRDZW50cmFsRGlyIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3JydXB0ZWQgemlwOiBjYW4ndCBmaW5kIHRoZSBaSVA2NCBlbmQgb2YgY2VudHJhbCBkaXJlY3RvcnlcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZWFkZXIuc2V0SW5kZXgodGhpcy5yZWxhdGl2ZU9mZnNldEVuZE9mWmlwNjRDZW50cmFsRGlyKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tTaWduYXR1cmUoc2lnLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0VORCk7XG4gICAgICAgICAgICB0aGlzLnJlYWRCbG9ja1ppcDY0RW5kT2ZDZW50cmFsKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZXhwZWN0ZWRFbmRPZkNlbnRyYWxEaXJPZmZzZXQgPSB0aGlzLmNlbnRyYWxEaXJPZmZzZXQgKyB0aGlzLmNlbnRyYWxEaXJTaXplO1xuICAgICAgICBpZiAodGhpcy56aXA2NCkge1xuICAgICAgICAgICAgZXhwZWN0ZWRFbmRPZkNlbnRyYWxEaXJPZmZzZXQgKz0gMjA7IC8vIGVuZCBvZiBjZW50cmFsIGRpciA2NCBsb2NhdG9yXG4gICAgICAgICAgICBleHBlY3RlZEVuZE9mQ2VudHJhbERpck9mZnNldCArPSAxMiAvKiBzaG91bGQgbm90IGluY2x1ZGUgdGhlIGxlYWRpbmcgMTIgYnl0ZXMgKi8gKyB0aGlzLnppcDY0RW5kT2ZDZW50cmFsU2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBleHRyYUJ5dGVzID0gZW5kT2ZDZW50cmFsRGlyT2Zmc2V0IC0gZXhwZWN0ZWRFbmRPZkNlbnRyYWxEaXJPZmZzZXQ7XG5cbiAgICAgICAgaWYgKGV4dHJhQnl0ZXMgPiAwKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oZXh0cmFCeXRlcywgXCJleHRyYSBieXRlcyBhdCBiZWdpbm5pbmcgb3Igd2l0aGluIHppcGZpbGVcIik7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpZ25hdHVyZShlbmRPZkNlbnRyYWxEaXJPZmZzZXQsIHNpZy5DRU5UUkFMX0ZJTEVfSEVBREVSKSkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBvZmZzZXRzIHNlZW0gd3JvbmcsIGJ1dCB3ZSBoYXZlIHNvbWV0aGluZyBhdCB0aGUgc3BlY2lmaWVkIG9mZnNldC5cbiAgICAgICAgICAgICAgICAvLyBTb1x1MjAyNiB3ZSBrZWVwIGl0LlxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB0aGUgb2Zmc2V0IGlzIHdyb25nLCB1cGRhdGUgdGhlIFwiemVyb1wiIG9mIHRoZSByZWFkZXJcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGhhcHBlbnMgaWYgZGF0YSBoYXMgYmVlbiBwcmVwZW5kZWQgKGNyeCBmaWxlcyBmb3IgZXhhbXBsZSlcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWRlci56ZXJvID0gZXh0cmFCeXRlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChleHRyYUJ5dGVzIDwgMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcDogbWlzc2luZyBcIiArIE1hdGguYWJzKGV4dHJhQnl0ZXMpICsgXCIgYnl0ZXMuXCIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBwcmVwYXJlUmVhZGVyOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHRoaXMucmVhZGVyID0gcmVhZGVyRm9yKGRhdGEpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogUmVhZCBhIHppcCBmaWxlIGFuZCBjcmVhdGUgWmlwRW50cmllcy5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheUJ1ZmZlcnxVaW50OEFycmF5fEJ1ZmZlcn0gZGF0YSB0aGUgYmluYXJ5IHN0cmluZyByZXByZXNlbnRpbmcgYSB6aXAgZmlsZS5cbiAgICAgKi9cbiAgICBsb2FkOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHRoaXMucHJlcGFyZVJlYWRlcihkYXRhKTtcbiAgICAgICAgdGhpcy5yZWFkRW5kT2ZDZW50cmFsKCk7XG4gICAgICAgIHRoaXMucmVhZENlbnRyYWxEaXIoKTtcbiAgICAgICAgdGhpcy5yZWFkTG9jYWxGaWxlcygpO1xuICAgIH1cbn07XG4vLyB9fX0gZW5kIG9mIFppcEVudHJpZXNcbm1vZHVsZS5leHBvcnRzID0gWmlwRW50cmllcztcbiIsICIndXNlIHN0cmljdCc7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgZXh0ZXJuYWwgPSByZXF1aXJlKFwiLi9leHRlcm5hbFwiKTtcbnZhciB1dGY4ID0gcmVxdWlyZSgnLi91dGY4Jyk7XG52YXIgWmlwRW50cmllcyA9IHJlcXVpcmUoJy4vemlwRW50cmllcycpO1xudmFyIENyYzMyUHJvYmUgPSByZXF1aXJlKCcuL3N0cmVhbS9DcmMzMlByb2JlJyk7XG52YXIgbm9kZWpzVXRpbHMgPSByZXF1aXJlKFwiLi9ub2RlanNVdGlsc1wiKTtcblxuLyoqXG4gKiBDaGVjayB0aGUgQ1JDMzIgb2YgYW4gZW50cnkuXG4gKiBAcGFyYW0ge1ppcEVudHJ5fSB6aXBFbnRyeSB0aGUgemlwIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybiB7UHJvbWlzZX0gdGhlIHJlc3VsdC5cbiAqL1xuZnVuY3Rpb24gY2hlY2tFbnRyeUNSQzMyKHppcEVudHJ5KSB7XG4gICAgcmV0dXJuIG5ldyBleHRlcm5hbC5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHdvcmtlciA9IHppcEVudHJ5LmRlY29tcHJlc3NlZC5nZXRDb250ZW50V29ya2VyKCkucGlwZShuZXcgQ3JjMzJQcm9iZSgpKTtcbiAgICAgICAgd29ya2VyLm9uKFwiZXJyb3JcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbihcImVuZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHdvcmtlci5zdHJlYW1JbmZvLmNyYzMyICE9PSB6aXBFbnRyeS5kZWNvbXByZXNzZWQuY3JjMzIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXAgOiBDUkMzMiBtaXNtYXRjaFwiKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAucmVzdW1lKCk7XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRhdGEsIG9wdGlvbnMpIHtcbiAgICB2YXIgemlwID0gdGhpcztcbiAgICBvcHRpb25zID0gdXRpbHMuZXh0ZW5kKG9wdGlvbnMgfHwge30sIHtcbiAgICAgICAgYmFzZTY0OiBmYWxzZSxcbiAgICAgICAgY2hlY2tDUkMzMjogZmFsc2UsXG4gICAgICAgIG9wdGltaXplZEJpbmFyeVN0cmluZzogZmFsc2UsXG4gICAgICAgIGNyZWF0ZUZvbGRlcnM6IGZhbHNlLFxuICAgICAgICBkZWNvZGVGaWxlTmFtZTogdXRmOC51dGY4ZGVjb2RlXG4gICAgfSk7XG5cbiAgICBpZiAobm9kZWpzVXRpbHMuaXNOb2RlICYmIG5vZGVqc1V0aWxzLmlzU3RyZWFtKGRhdGEpKSB7XG4gICAgICAgIHJldHVybiBleHRlcm5hbC5Qcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJKU1ppcCBjYW4ndCBhY2NlcHQgYSBzdHJlYW0gd2hlbiBsb2FkaW5nIGEgemlwIGZpbGUuXCIpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdXRpbHMucHJlcGFyZUNvbnRlbnQoXCJ0aGUgbG9hZGVkIHppcCBmaWxlXCIsIGRhdGEsIHRydWUsIG9wdGlvbnMub3B0aW1pemVkQmluYXJ5U3RyaW5nLCBvcHRpb25zLmJhc2U2NClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciB6aXBFbnRyaWVzID0gbmV3IFppcEVudHJpZXMob3B0aW9ucyk7XG4gICAgICAgICAgICB6aXBFbnRyaWVzLmxvYWQoZGF0YSk7XG4gICAgICAgICAgICByZXR1cm4gemlwRW50cmllcztcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiBjaGVja0NSQzMyKHppcEVudHJpZXMpIHtcbiAgICAgICAgICAgIHZhciBwcm9taXNlcyA9IFtleHRlcm5hbC5Qcm9taXNlLnJlc29sdmUoemlwRW50cmllcyldO1xuICAgICAgICAgICAgdmFyIGZpbGVzID0gemlwRW50cmllcy5maWxlcztcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNoZWNrQ1JDMzIpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goY2hlY2tFbnRyeUNSQzMyKGZpbGVzW2ldKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGV4dGVybmFsLlByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiBhZGRGaWxlcyhyZXN1bHRzKSB7XG4gICAgICAgICAgICB2YXIgemlwRW50cmllcyA9IHJlc3VsdHMuc2hpZnQoKTtcbiAgICAgICAgICAgIHZhciBmaWxlcyA9IHppcEVudHJpZXMuZmlsZXM7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gZmlsZXNbaV07XG4gICAgICAgICAgICAgICAgemlwLmZpbGUoaW5wdXQuZmlsZU5hbWVTdHIsIGlucHV0LmRlY29tcHJlc3NlZCwge1xuICAgICAgICAgICAgICAgICAgICBiaW5hcnk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG9wdGltaXplZEJpbmFyeVN0cmluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogaW5wdXQuZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgZGlyOiBpbnB1dC5kaXIsXG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnQ6IGlucHV0LmZpbGVDb21tZW50U3RyLmxlbmd0aCA/IGlucHV0LmZpbGVDb21tZW50U3RyIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgdW5peFBlcm1pc3Npb25zOiBpbnB1dC51bml4UGVybWlzc2lvbnMsXG4gICAgICAgICAgICAgICAgICAgIGRvc1Blcm1pc3Npb25zOiBpbnB1dC5kb3NQZXJtaXNzaW9ucyxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRm9sZGVyczogb3B0aW9ucy5jcmVhdGVGb2xkZXJzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoemlwRW50cmllcy56aXBDb21tZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHppcC5jb21tZW50ID0gemlwRW50cmllcy56aXBDb21tZW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gemlwO1xuICAgICAgICB9KTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJlcHJlc2VudGF0aW9uIGEgb2YgemlwIGZpbGUgaW4ganNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBKU1ppcCgpIHtcbiAgICAvLyBpZiB0aGlzIGNvbnN0cnVjdG9yIGlzXHUwMEEwdXNlZCB3aXRob3V0XHUwMEEwYG5ld2AsIGl0XHUwMEEwYWRkcyBgbmV3YCBiZWZvcmVcdTAwQTBpdHNlbGY6XG4gICAgaWYoISh0aGlzIGluc3RhbmNlb2YgSlNaaXApKSB7XG4gICAgICAgIHJldHVybiBuZXcgSlNaaXAoKTtcbiAgICB9XG5cbiAgICBpZihhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBjb25zdHJ1Y3RvciB3aXRoIHBhcmFtZXRlcnMgaGFzIGJlZW4gcmVtb3ZlZCBpbiBKU1ppcCAzLjAsIHBsZWFzZSBjaGVjayB0aGUgdXBncmFkZSBndWlkZS5cIik7XG4gICAgfVxuXG4gICAgLy8gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGZpbGVzIDpcbiAgICAvLyB7XG4gICAgLy8gICBcImZvbGRlci9cIiA6IHsuLi59LFxuICAgIC8vICAgXCJmb2xkZXIvZGF0YS50eHRcIiA6IHsuLi59XG4gICAgLy8gfVxuICAgIHRoaXMuZmlsZXMgPSB7fTtcblxuICAgIHRoaXMuY29tbWVudCA9IG51bGw7XG5cbiAgICAvLyBXaGVyZSB3ZSBhcmUgaW4gdGhlIGhpZXJhcmNoeVxuICAgIHRoaXMucm9vdCA9IFwiXCI7XG4gICAgdGhpcy5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbmV3T2JqID0gbmV3IEpTWmlwKCk7XG4gICAgICAgIGZvciAodmFyIGkgaW4gdGhpcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2ldICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBuZXdPYmpbaV0gPSB0aGlzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdPYmo7XG4gICAgfTtcbn1cbkpTWmlwLnByb3RvdHlwZSA9IHJlcXVpcmUoJy4vb2JqZWN0Jyk7XG5KU1ppcC5wcm90b3R5cGUubG9hZEFzeW5jID0gcmVxdWlyZSgnLi9sb2FkJyk7XG5KU1ppcC5zdXBwb3J0ID0gcmVxdWlyZSgnLi9zdXBwb3J0Jyk7XG5KU1ppcC5kZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLy8gVE9ETyBmaW5kIGEgYmV0dGVyIHdheSB0byBoYW5kbGUgdGhpcyB2ZXJzaW9uLFxuLy8gYSByZXF1aXJlKCdwYWNrYWdlLmpzb24nKS52ZXJzaW9uIGRvZXNuJ3Qgd29yayB3aXRoIHdlYnBhY2ssIHNlZSAjMzI3XG5KU1ppcC52ZXJzaW9uID0gXCIzLjYuMFwiO1xuXG5KU1ppcC5sb2FkQXN5bmMgPSBmdW5jdGlvbiAoY29udGVudCwgb3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgSlNaaXAoKS5sb2FkQXN5bmMoY29udGVudCwgb3B0aW9ucyk7XG59O1xuXG5KU1ppcC5leHRlcm5hbCA9IHJlcXVpcmUoXCIuL2V4dGVybmFsXCIpO1xubW9kdWxlLmV4cG9ydHMgPSBKU1ppcDtcbiIsICJpbXBvcnQgXCIuL1BvbHlmaWxsLmpzXCI7XG5cbmV4cG9ydCB7IE1vZCwgcGFyc2VNb2RNYW5pZmVzdCwgbG9hZE1vZEZpbGUgfSBmcm9tIFwiLi9Nb2RcIjtcbmV4cG9ydCB7IE1vZE1hbmFnZXIgfSBmcm9tIFwiLi9Nb2RNYW5hZ2VyXCI7XG5leHBvcnQgeyBsb2FkRXh0ZW5zaW9uIH0gZnJvbSBcIi4vRXh0ZW5zaW9uc0xvYWRlclwiO1xuZXhwb3J0ICogYXMgQ2FsbGJhY2tzIGZyb20gXCIuL0NhbGxiYWNrc1wiO1xuXG4vLyBEZWxheSB0aGUgcmVzdCB0byB3aGVuIHRoZSBtb2R1bGUgaGFzIGZpbmlzaGVkIGxvYWRpbmdcbi8vIGFzIGVsc2UgdGhlIHdpbmRvdy5HREFQSSBvYmplY3QgZG9lcyBub3QgeWV0IGV4aXN0Llxuc2V0VGltZW91dCgoKSA9PiB7XG4gIC8vIE1ha2UgYSBnZXR0ZXIgZm9yIEdEQVBJLmdhbWUgYW5kIEdEQVBJLmN1cnJlbnRTY2VuZVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LkdEQVBJLCBcImdhbWVcIiwge1xuICAgIGdldDogZnVuY3Rpb24gKCk6IGdkanMuUnVudGltZUdhbWUgfCBudWxsIHtcbiAgICAgIHJldHVybiB3aW5kb3cuR0RBUElfZ2FtZTtcbiAgICB9LFxuICB9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5HREFQSSwgXCJjdXJyZW50U2NlbmVcIiwge1xuICAgIGdldDogZnVuY3Rpb24gKCk6IGdkanMuUnVudGltZVNjZW5lIHwgbnVsbCB7XG4gICAgICBpZiAoR0RBUEkuZ2FtZSAhPSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBHREFQSS5nYW1lLl9zY2VuZVN0YWNrLmdldEN1cnJlbnRTY2VuZSgpO1xuICAgICAgZWxzZSByZXR1cm4gbnVsbDtcbiAgICB9LFxuICB9KTtcbn0pO1xuIiwgIi8qKlxuICogUG9seWZpbGxzIG1pc3NpbmcgR0RldmVsb3AgZmVhdHVyZXMgdG8gZ2FtZXMgbWFkZSB3aXRoIG9sZGVyIHZlcnNpb25zLlxuICogQGZpbGVvdmVydmlld1xuICovXG5cbmlmICghZ2Rqcy5jYWxsYmFja3NGaXJzdFJ1bnRpbWVTY2VuZUxvYWRlZCkge1xuICBnZGpzLmNhbGxiYWNrc0ZpcnN0UnVudGltZVNjZW5lTG9hZGVkID0gW107XG4gIGNvbnN0IFJ1bnRpbWVTY2VuZUN0ciA9IGdkanMuUnVudGltZVNjZW5lO1xuICBsZXQgb25jZSA9IGZhbHNlO1xuICBnZGpzLlJ1bnRpbWVTY2VuZSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgUnVudGltZVNjZW5lQ3RyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIGlmICghb25jZSkge1xuICAgICAgb25jZSA9IHRydWU7XG4gICAgICBmb3IgKGNvbnN0IGUgb2YgZ2Rqcy5jYWxsYmFja3NGaXJzdFJ1bnRpbWVTY2VuZUxvYWRlZCkgZSh0aGlzKTtcbiAgICB9XG4gIH07XG4gIE9iamVjdC5hc3NpZ24oZ2Rqcy5SdW50aW1lU2NlbmUsIFJ1bnRpbWVTY2VuZUN0cik7XG4gIGdkanMuUnVudGltZVNjZW5lLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUnVudGltZVNjZW5lQ3RyLnByb3RvdHlwZSk7XG59XG5cbmlmICghZ2Rqcy5jYWxsYmFja3NSdW50aW1lU2NlbmVMb2FkZWQpIHtcbiAgZ2Rqcy5jYWxsYmFja3NSdW50aW1lU2NlbmVMb2FkZWQgPSBbXTtcbiAgY29uc3QgUnVudGltZVNjZW5lQ3RyID0gZ2Rqcy5SdW50aW1lU2NlbmU7XG4gIGdkanMuUnVudGltZVNjZW5lID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBSdW50aW1lU2NlbmVDdHIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgZm9yIChjb25zdCBlIG9mIGdkanMuY2FsbGJhY2tzUnVudGltZVNjZW5lTG9hZGVkKSBlKHRoaXMpO1xuICB9O1xuICBPYmplY3QuYXNzaWduKGdkanMuUnVudGltZVNjZW5lLCBSdW50aW1lU2NlbmVDdHIpO1xuICBnZGpzLlJ1bnRpbWVTY2VuZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFJ1bnRpbWVTY2VuZUN0ci5wcm90b3R5cGUpO1xufVxuXG5pZiAoIWdkanMuY2FsbGJhY2tzUnVudGltZVNjZW5lUHJlRXZlbnRzKSB7XG4gIGdkanMuY2FsbGJhY2tzUnVudGltZVNjZW5lUHJlRXZlbnRzID0gW107XG4gIGNvbnN0IHJlbmRlckFuZFN0ZXAgPSBnZGpzLlJ1bnRpbWVTY2VuZS5wcm90b3R5cGUucmVuZGVyQW5kU3RlcDtcbiAgZ2Rqcy5SdW50aW1lU2NlbmUucHJvdG90eXBlLnJlbmRlckFuZFN0ZXAgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGZvciAoY29uc3QgZSBvZiBnZGpzLmNhbGxiYWNrc1J1bnRpbWVTY2VuZVByZUV2ZW50cykgZSh0aGlzKTtcbiAgICByZXR1cm4gcmVuZGVyQW5kU3RlcC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfTtcbn1cblxuaWYgKCFnZGpzLmNhbGxiYWNrc1J1bnRpbWVTY2VuZVBvc3RFdmVudHMpIHtcbiAgZ2Rqcy5jYWxsYmFja3NSdW50aW1lU2NlbmVQb3N0RXZlbnRzID0gW107XG4gIGNvbnN0IHJlbmRlckFuZFN0ZXAgPSBnZGpzLlJ1bnRpbWVTY2VuZS5wcm90b3R5cGUucmVuZGVyQW5kU3RlcDtcbiAgZ2Rqcy5SdW50aW1lU2NlbmUucHJvdG90eXBlLnJlbmRlckFuZFN0ZXAgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGNvbnN0IHJldFZhbCA9IHJlbmRlckFuZFN0ZXAuYXBwbHkodGhpcywgYXJncyk7XG4gICAgZm9yIChjb25zdCBlIG9mIGdkanMuY2FsbGJhY2tzUnVudGltZVNjZW5lUG9zdEV2ZW50cykgZSh0aGlzKTtcbiAgICByZXR1cm4gcmV0VmFsO1xuICB9O1xufVxuXG5pZiAoIWdkanMuY2FsbGJhY2tzUnVudGltZVNjZW5lVW5sb2FkaW5nKSB7XG4gIGdkanMuY2FsbGJhY2tzUnVudGltZVNjZW5lVW5sb2FkaW5nID0gW107XG4gIGNvbnN0IHVubG9hZFNjZW5lID0gZ2Rqcy5SdW50aW1lU2NlbmUucHJvdG90eXBlLnVubG9hZFNjZW5lO1xuICBnZGpzLlJ1bnRpbWVTY2VuZS5wcm90b3R5cGUudW5sb2FkU2NlbmUgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGZvciAoY29uc3QgZSBvZiBnZGpzLmNhbGxiYWNrc1J1bnRpbWVTY2VuZVVubG9hZGluZykgZSh0aGlzKTtcbiAgICByZXR1cm4gdW5sb2FkU2NlbmUuYXBwbHkodGhpcywgYXJncyk7XG4gIH07XG59XG5cbmlmICghZ2Rqcy5jYWxsYmFja3NSdW50aW1lU2NlbmVVbmxvYWRlZCkge1xuICBnZGpzLmNhbGxiYWNrc1J1bnRpbWVTY2VuZVVubG9hZGVkID0gW107XG4gIGNvbnN0IHVubG9hZFNjZW5lID0gZ2Rqcy5SdW50aW1lU2NlbmUucHJvdG90eXBlLnVubG9hZFNjZW5lO1xuICBnZGpzLlJ1bnRpbWVTY2VuZS5wcm90b3R5cGUudW5sb2FkU2NlbmUgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGNvbnN0IHJldFZhbCA9IHVubG9hZFNjZW5lLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIGZvciAoY29uc3QgZSBvZiBnZGpzLmNhbGxiYWNrc1J1bnRpbWVTY2VuZVVubG9hZGVkKSBlKHRoaXMpO1xuICAgIHJldHVybiByZXRWYWw7XG4gIH07XG59XG5cbmlmICghZ2Rqcy5jYWxsYmFja3NSdW50aW1lU2NlbmVQYXVzZWQpIHtcbiAgZ2Rqcy5jYWxsYmFja3NSdW50aW1lU2NlbmVQYXVzZWQgPSBbXTtcbiAgY29uc3QgcHVzaCA9IGdkanMuU2NlbmVTdGFjay5wcm90b3R5cGUucHVzaDtcbiAgZ2Rqcy5TY2VuZVN0YWNrLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBjb25zdCByZXRWYWwgPSBwdXNoLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIGZvciAoY29uc3QgZSBvZiBnZGpzLmNhbGxiYWNrc1J1bnRpbWVTY2VuZVBhdXNlZCkgZShHREFQSS5jdXJyZW50U2NlbmUpO1xuICAgIHJldHVybiByZXRWYWw7XG4gIH07XG59XG5cbmlmICghZ2Rqcy5jYWxsYmFja3NSdW50aW1lU2NlbmVSZXN1bWVkKSB7XG4gIGdkanMuY2FsbGJhY2tzUnVudGltZVNjZW5lUmVzdW1lZCA9IFtdO1xuICBjb25zdCBwb3AgPSBnZGpzLlNjZW5lU3RhY2sucHJvdG90eXBlLnBvcDtcbiAgZ2Rqcy5TY2VuZVN0YWNrLnByb3RvdHlwZS5wb3AgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGNvbnN0IHJldFZhbCA9IHBvcC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICBmb3IgKGNvbnN0IGUgb2YgZ2Rqcy5jYWxsYmFja3NSdW50aW1lU2NlbmVSZXN1bWVkKSBlKEdEQVBJLmN1cnJlbnRTY2VuZSk7XG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfTtcbn1cblxuaWYgKCFnZGpzLmNhbGxiYWNrc09iamVjdERlbGV0ZWRGcm9tU2NlbmUpIHtcbiAgZ2Rqcy5jYWxsYmFja3NPYmplY3REZWxldGVkRnJvbVNjZW5lID0gW107XG4gIGNvbnN0IGRlbGV0ZUZyb21TY2VuZSA9IGdkanMuUnVudGltZU9iamVjdC5wcm90b3R5cGUuZGVsZXRlRnJvbVNjZW5lO1xuICBnZGpzLlJ1bnRpbWVPYmplY3QucHJvdG90eXBlLmRlbGV0ZUZyb21TY2VuZSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgcmV0VmFsID0gZGVsZXRlRnJvbVNjZW5lLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIGZvciAoY29uc3QgZSBvZiBnZGpzLmNhbGxiYWNrc09iamVjdERlbGV0ZWRGcm9tU2NlbmUpIGUodGhpcyk7XG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfTtcbn1cblxuZ2Rqcy5SdW50aW1lU2NlbmUucHJvdG90eXBlLnJlZ2lzdGVyT2JqZWN0ID1cbiAgZ2Rqcy5SdW50aW1lU2NlbmUucHJvdG90eXBlLnJlZ2lzdGVyT2JqZWN0IHx8XG4gIGZ1bmN0aW9uIChvYmplY3REYXRhKSB7XG4gICAgdGhpcy5fb2JqZWN0cy5wdXQob2JqZWN0RGF0YS5uYW1lLCBvYmplY3REYXRhKTtcbiAgICB0aGlzLl9pbnN0YW5jZXMucHV0KG9iamVjdERhdGEubmFtZSwgW10pOyAvL0Fsc28gcmVzZXJ2ZSBhbiBhcnJheSBmb3IgdGhlIGluc3RhbmNlc1xuICAgIHRoaXMuX2luc3RhbmNlc0NhY2hlLnB1dChvYmplY3REYXRhLm5hbWUsIFtdKTsgLy9hbmQgZm9yIGNhY2hlZCBpbnN0YW5jZXNcbiAgICB0aGlzLl9vYmplY3RzQ3Rvci5wdXQoXG4gICAgICBvYmplY3REYXRhLm5hbWUsXG4gICAgICBnZGpzLmdldE9iamVjdENvbnN0cnVjdG9yKG9iamVjdERhdGEudHlwZSlcbiAgICApOyAvL0FuZCBjYWNoZSB0aGUgY29uc3RydWN0b3IgZm9yIHRoZSBwZXJmb3JtYW5jZSBzYWtlXG4gIH07XG5cblBJWEkuVGV4dHVyZS5mcm9tVVJMID0gUElYSS5UZXh0dXJlLmZyb21VUkwgfHwgUElYSS5UZXh0dXJlLmZyb207XG4iLCAiLyoqXG4gKiBBIGxpc3Qgb2YgcmVnaXN0ZXJhYmxlIGNhbGxiYWNrcy5cbiAqIE5vdGUgdGhhdCBGSVJTVF9TQ0VORV9MT0FERUQgd2lsbCBuZXZlciBhY3R1YWxseSBiZSBjYWxsZWQsXG4gKiBhcyBtb2RzIGFyZSBhbHdheXMgbG9hZGVkIGFmdGVyIHRoZSBmaXJzdCBzY2VuZSBoYXMgZmluaXNoZWQgbG9hZGluZy5cbiAqIEBlbnVtXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIENBTExCQUNLUyB7XG4gIEZJUlNUX1NDRU5FX0xPQURFRCxcbiAgU0NFTkVfTE9BREVELFxuICBQUkVfRVZFTlRTLFxuICBQT1NUX0VWRU5UUyxcbiAgU0NFTkVfUEFVU0VELFxuICBTQ0VORV9SRVNVTUVELFxuICBTQ0VORV9VTkxPQURJTkcsXG4gIFNDRU5FX1VOTE9BREVELFxuICBPQkpFQ1RfREVMRVRFRF9GUk9NX1NDRU5FLFxufVxuXG4vKipcbiAqIEEgR0RldmVsb3AgcnVudGltZSBldmVudCBjYWxsYmFjay5cbiAqL1xuZXhwb3J0IHR5cGUgUnVudGltZVNjZW5lQ2FsbGJhY2sgPSAocnVudGltZVNjZW5lOiBnZGpzLlJ1bnRpbWVTY2VuZSkgPT4gdm9pZDtcblxuLyoqXG4gKiBSZWdpc3RlcnMgYSBjYWxsYmFjayBmdW5jdGlvbiBmb3IgYSBHRGV2ZWxvcCBydW50aW1lIGV2ZW50LlxuICogQHBhcmFtIGNhbGxiYWNrVHlwZSAtIFRoZSBldmVudCBvbiB3aGljaCB5b3Ugd2FudCB5b3VyIGNhbGxiYWNrIHRvIGJlIGNhbGxlZC5cbiAqIEBwYXJhbSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0byByZWdpc3Rlci5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyQ2FsbGJhY2sgPSBmdW5jdGlvbiAoXG4gIGNhbGxiYWNrVHlwZTogQ0FMTEJBQ0tTLFxuICBjYWxsYmFjazogUnVudGltZVNjZW5lQ2FsbGJhY2tcbikge1xuICBpZiAoY2FsbGJhY2tUeXBlID09PSBDQUxMQkFDS1MuRklSU1RfU0NFTkVfTE9BREVEKVxuICAgIGdkanMuY2FsbGJhY2tzRmlyc3RSdW50aW1lU2NlbmVMb2FkZWQucHVzaChjYWxsYmFjayk7XG4gIGVsc2UgaWYgKGNhbGxiYWNrVHlwZSA9PT0gQ0FMTEJBQ0tTLlNDRU5FX0xPQURFRClcbiAgICBnZGpzLmNhbGxiYWNrc1J1bnRpbWVTY2VuZUxvYWRlZC5wdXNoKGNhbGxiYWNrKTtcbiAgZWxzZSBpZiAoY2FsbGJhY2tUeXBlID09PSBDQUxMQkFDS1MuUFJFX0VWRU5UUylcbiAgICBnZGpzLmNhbGxiYWNrc1J1bnRpbWVTY2VuZVByZUV2ZW50cy5wdXNoKGNhbGxiYWNrKTtcbiAgZWxzZSBpZiAoY2FsbGJhY2tUeXBlID09PSBDQUxMQkFDS1MuUE9TVF9FVkVOVFMpXG4gICAgZ2Rqcy5jYWxsYmFja3NSdW50aW1lU2NlbmVQb3N0RXZlbnRzLnB1c2goY2FsbGJhY2spO1xuICBlbHNlIGlmIChjYWxsYmFja1R5cGUgPT09IENBTExCQUNLUy5TQ0VORV9QQVVTRUQpXG4gICAgZ2Rqcy5jYWxsYmFja3NSdW50aW1lU2NlbmVQYXVzZWQucHVzaChjYWxsYmFjayk7XG4gIGVsc2UgaWYgKGNhbGxiYWNrVHlwZSA9PT0gQ0FMTEJBQ0tTLlNDRU5FX1JFU1VNRUQpXG4gICAgZ2Rqcy5jYWxsYmFja3NSdW50aW1lU2NlbmVSZXN1bWVkLnB1c2goY2FsbGJhY2spO1xuICBlbHNlIGlmIChjYWxsYmFja1R5cGUgPT09IENBTExCQUNLUy5TQ0VORV9VTkxPQURJTkcpXG4gICAgZ2Rqcy5jYWxsYmFja3NSdW50aW1lU2NlbmVVbmxvYWRpbmcucHVzaChjYWxsYmFjayk7XG4gIGVsc2UgaWYgKGNhbGxiYWNrVHlwZSA9PT0gQ0FMTEJBQ0tTLlNDRU5FX1VOTE9BREVEKVxuICAgIGdkanMuY2FsbGJhY2tzUnVudGltZVNjZW5lVW5sb2FkZWQucHVzaChjYWxsYmFjayk7XG4gIGVsc2UgaWYgKGNhbGxiYWNrVHlwZSA9PT0gQ0FMTEJBQ0tTLk9CSkVDVF9ERUxFVEVEX0ZST01fU0NFTkUpXG4gICAgZ2Rqcy5jYWxsYmFja3NPYmplY3REZWxldGVkRnJvbVNjZW5lLnB1c2goY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBVbnJlZ2lzdGVycyBhIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCBjYWxsYmFjayBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IHVucmVnaXN0ZXJDYWxsYmFjayA9IGZ1bmN0aW9uIChcbiAgY2FsbGJhY2tUeXBlOiBDQUxMQkFDS1MsXG4gIGNhbGxiYWNrOiBSdW50aW1lU2NlbmVDYWxsYmFja1xuKSB7XG4gIGxldCBjYWxsYmFja0FycmF5O1xuICBpZiAoY2FsbGJhY2tUeXBlID09PSBDQUxMQkFDS1MuRklSU1RfU0NFTkVfTE9BREVEKVxuICAgIGNhbGxiYWNrQXJyYXkgPSBnZGpzLmNhbGxiYWNrc0ZpcnN0UnVudGltZVNjZW5lTG9hZGVkO1xuICBlbHNlIGlmIChjYWxsYmFja1R5cGUgPT09IENBTExCQUNLUy5TQ0VORV9MT0FERUQpXG4gICAgY2FsbGJhY2tBcnJheSA9IGdkanMuY2FsbGJhY2tzUnVudGltZVNjZW5lTG9hZGVkO1xuICBlbHNlIGlmIChjYWxsYmFja1R5cGUgPT09IENBTExCQUNLUy5QUkVfRVZFTlRTKVxuICAgIGNhbGxiYWNrQXJyYXkgPSBnZGpzLmNhbGxiYWNrc1J1bnRpbWVTY2VuZVByZUV2ZW50cztcbiAgZWxzZSBpZiAoY2FsbGJhY2tUeXBlID09PSBDQUxMQkFDS1MuUE9TVF9FVkVOVFMpXG4gICAgY2FsbGJhY2tBcnJheSA9IGdkanMuY2FsbGJhY2tzUnVudGltZVNjZW5lUG9zdEV2ZW50cztcbiAgZWxzZSBpZiAoY2FsbGJhY2tUeXBlID09PSBDQUxMQkFDS1MuU0NFTkVfUEFVU0VEKVxuICAgIGNhbGxiYWNrQXJyYXkgPSBnZGpzLmNhbGxiYWNrc1J1bnRpbWVTY2VuZVBhdXNlZDtcbiAgZWxzZSBpZiAoY2FsbGJhY2tUeXBlID09PSBDQUxMQkFDS1MuU0NFTkVfUkVTVU1FRClcbiAgICBjYWxsYmFja0FycmF5ID0gZ2Rqcy5jYWxsYmFja3NSdW50aW1lU2NlbmVSZXN1bWVkO1xuICBlbHNlIGlmIChjYWxsYmFja1R5cGUgPT09IENBTExCQUNLUy5TQ0VORV9VTkxPQURJTkcpXG4gICAgY2FsbGJhY2tBcnJheSA9IGdkanMuY2FsbGJhY2tzUnVudGltZVNjZW5lVW5sb2FkaW5nO1xuICBlbHNlIGlmIChjYWxsYmFja1R5cGUgPT09IENBTExCQUNLUy5TQ0VORV9VTkxPQURFRClcbiAgICBjYWxsYmFja0FycmF5ID0gZ2Rqcy5jYWxsYmFja3NSdW50aW1lU2NlbmVVbmxvYWRlZDtcbiAgZWxzZSBpZiAoY2FsbGJhY2tUeXBlID09PSBDQUxMQkFDS1MuT0JKRUNUX0RFTEVURURfRlJPTV9TQ0VORSlcbiAgICBjYWxsYmFja0FycmF5ID0gZ2Rqcy5jYWxsYmFja3NPYmplY3REZWxldGVkRnJvbVNjZW5lO1xuICBlbHNlIHJldHVybjtcblxuICBjb25zdCBpbmRleE9mQ2FsbGxiYWNrID0gY2FsbGJhY2tBcnJheS5pbmRleE9mKGNhbGxiYWNrKTtcbiAgaWYgKGluZGV4T2ZDYWxsbGJhY2sgIT09IC0xKSBjYWxsYmFja0FycmF5LnNwbGljZShpbmRleE9mQ2FsbGxiYWNrLCAxKTtcbn07XG4iLCAiaW1wb3J0IHtcbiAgUnVudGltZVNjZW5lQ2FsbGJhY2ssXG4gIHJlZ2lzdGVyQ2FsbGJhY2ssXG4gIHVucmVnaXN0ZXJDYWxsYmFjayxcbiAgQ0FMTEJBQ0tTLFxufSBmcm9tIFwiLi9DYWxsYmFja3NcIjtcbmltcG9ydCB0eXBlIHsgTW9kIH0gZnJvbSBcIi4vTW9kXCI7XG5cbmludGVyZmFjZSBDYWxsYmFja3NPYmplY3Qge1xuICBwcmVFdmVudD86IFJ1bnRpbWVTY2VuZUNhbGxiYWNrO1xuICBwb3N0RXZlbnQ/OiBSdW50aW1lU2NlbmVDYWxsYmFjaztcbiAgc2NlbmVDaGFuZ2VkPzogUnVudGltZVNjZW5lQ2FsbGJhY2s7XG59XG5cbi8qKlxuICogVGhlIG1vZCBtYW5hZ2VyIGFsbG93cyB0byBsb2FkLCB1bmxvYWQgYW5kIGludGVyYWN0IHdpdGggTW9kcy5cbiAqXG4gKiBAY2F0ZWdvcnkgTW9kIGludGVncmF0aW9uXG4gKiBAZXhhbXBsZVxuICogWW91IGNhbiBibG9jayBsb2FkaW5nIHlvdXIgTW9kIGlmIGFuIGluY29tcGF0aWJsZSBtb2QgaXMgZGV0ZWN0ZWRcbiAqIGBgYGpzXG4gKiBjbGFzcyBNeU1vZCBleHRlbmRzIEdEQVBJLk1vZCB7XG4gKiAgIGNvbnN0cnVjdG9yKCkge1xuICogICAgIGNvbnN0IG1hbmFnZXIgPSBHREFQSS5Nb2RNYW5hZ2VyLmdldCgpO1xuICogICAgIGlmKG1hbmFnZXIuaGFzKFwibXkvaW5jb21wYXRpYmxlL21vZC91aWRcIikpIG1hbmFnZXIudW5sb2FkKFwibXkvbW9kL3VpZFwiKTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKlxuICogQGV4YW1wbGVcbiAqIFlvdSBjYW4gaW50ZXJhY3Qgd2l0aCBhbm90aGVyIG1vZCB1c2luZyBpdHMgcHVibGljIG1ldGhvZHM6XG4gKiBgYGBqc1xuICogY2xhc3MgTXlNb2QgZXh0ZW5kcyBHREFQSS5Nb2Qge1xuICogICBjb25zdHJ1Y3RvcigpIHtcbiAqICAgICBjb25zdCBtYW5hZ2VyID0gR0RBUEkuTW9kTWFuYWdlci5nZXQoKTtcbiAqICAgICBpZihtYW5hZ2VyLmhhcyhcIm15L2NvbXBhdGlibGUvbW9kL3VpZFwiKSlcbiAqICAgICAgIG1hbmFnZXIuZ2V0KFwibXkvY29tcGF0aWJsZS9tb2QvdWlkXCIpLnNldHVwSW50ZWdyYXRpb24odGhpcyk7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgTW9kTWFuYWdlciB7XG4gIHByaXZhdGUgX21vZHM6IFJlY29yZDxzdHJpbmcsIE1vZD4gPSB7fTtcbiAgcHJpdmF0ZSBfY2FsbGJhY2tzOiBSZWNvcmQ8c3RyaW5nLCBDYWxsYmFja3NPYmplY3Q+ID0ge307XG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlID0gbmV3IE1vZE1hbmFnZXIoKTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc2luZ2xldG9uIGluc3RhbmNlIG9mIHRoZSBtb2QgbWFuYWdlci5cbiAgICovXG4gIHN0YXRpYyBnZXQoKTogTW9kTWFuYWdlciB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG1vZCB0byB0aGUgbWFuYWdlci5cbiAgICovXG4gIGFkZCh1aWQ6IHN0cmluZywgbW9kOiBNb2QpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5oYXModWlkKSkgdGhpcy51bmxvYWQodWlkKTtcblxuICAgIHRoaXMuX21vZHNbdWlkXSA9IG1vZDtcblxuICAgIGNvbnN0IGNhbGxiYWNrczogUmVjb3JkPHN0cmluZywgYW55PiA9ICh0aGlzLl9jYWxsYmFja3NbdWlkXSA9IHt9KTtcbiAgICBpZiAobW9kLnByZUV2ZW50KSB7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IChzY2VuZTogZ2Rqcy5SdW50aW1lU2NlbmUpID0+IG1vZC5wcmVFdmVudChzY2VuZSk7XG4gICAgICByZWdpc3RlckNhbGxiYWNrKENBTExCQUNLUy5QUkVfRVZFTlRTLCBjYWxsYmFjayk7XG4gICAgICBjYWxsYmFja3MucHJlRXZlbnQgPSBjYWxsYmFjaztcbiAgICB9XG4gICAgaWYgKG1vZC5wb3N0RXZlbnQpIHtcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gKHNjZW5lOiBnZGpzLlJ1bnRpbWVTY2VuZSkgPT4gbW9kLnBvc3RFdmVudChzY2VuZSk7XG4gICAgICByZWdpc3RlckNhbGxiYWNrKENBTExCQUNLUy5QT1NUX0VWRU5UUywgY2FsbGJhY2spO1xuICAgICAgY2FsbGJhY2tzLnBvc3RFdmVudCA9IGNhbGxiYWNrO1xuICAgIH1cbiAgICBpZiAobW9kLnNjZW5lQ2hhbmdlZCkge1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSAoc2NlbmU6IGdkanMuUnVudGltZVNjZW5lKSA9PiBtb2Quc2NlbmVDaGFuZ2VkKHNjZW5lKTtcbiAgICAgIHJlZ2lzdGVyQ2FsbGJhY2soQ0FMTEJBQ0tTLlNDRU5FX0xPQURFRCwgY2FsbGJhY2spO1xuICAgICAgY2FsbGJhY2tzLnNjZW5lQ2hhbmdlZCA9IGNhbGxiYWNrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBtb2QgYnkgdWlkLlxuICAgKi9cbiAgZ2V0KG1vZFVJRDogc3RyaW5nKTogTW9kIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX21vZHNbbW9kVUlEXSB8fCBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgbW9kIGlzIGxvYWRlZCBieSB1aWQuXG4gICAqIEBwYXJhbSBtb2RVSUQgLSBUaGUgbW9kcyBVSUQuXG4gICAqL1xuICBoYXMobW9kVUlEOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbW9kVUlEIGluIHRoaXMuX21vZHM7XG4gIH1cblxuICAvKipcbiAgICogVW5sb2FkcyBhIG1vZCBieSB1aWQuXG4gICAqIEBwYXJhbSBtb2RVSUQgLSBUaGUgbW9kcyBVSUQuXG4gICAqL1xuICB1bmxvYWQobW9kVUlEOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBtb2QgPSB0aGlzLl9tb2RzW21vZFVJRF07XG4gICAgaWYgKG1vZCA9PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICBpZiAobW9kLnVubG9hZCkgbW9kLnVubG9hZCgpO1xuXG4gICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW21vZFVJRF07XG4gICAgaWYgKGNhbGxiYWNrcy5wcmVFdmVudClcbiAgICAgIHVucmVnaXN0ZXJDYWxsYmFjayhDQUxMQkFDS1MuUFJFX0VWRU5UUywgY2FsbGJhY2tzLnByZUV2ZW50KTtcbiAgICBpZiAoY2FsbGJhY2tzLnBvc3RFdmVudClcbiAgICAgIHVucmVnaXN0ZXJDYWxsYmFjayhDQUxMQkFDS1MuUE9TVF9FVkVOVFMsIGNhbGxiYWNrcy5wb3N0RXZlbnQpO1xuICAgIGlmIChjYWxsYmFja3Muc2NlbmVDaGFuZ2VkKVxuICAgICAgdW5yZWdpc3RlckNhbGxiYWNrKENBTExCQUNLUy5TQ0VORV9MT0FERUQsIGNhbGxiYWNrcy5zY2VuZUNoYW5nZWQpO1xuXG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1ttb2RVSURdO1xuICAgIGRlbGV0ZSB0aGlzLl9tb2RzW21vZFVJRF07XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuIGFycmF5IG9mIGFsbCBsb2FkZWQgbW9kcy5cbiAgICovXG4gIGdldEFsbE1vZHMoKTogTW9kW10ge1xuICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuX21vZHMpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgTW9kTWFuYWdlciB9IGZyb20gXCIuLi9Nb2RNYW5hZ2VyXCI7XG5pbXBvcnQgeyBsb2FkQXN5bmMgYXMgbG9hZFpJUCB9IGZyb20gXCJqc3ppcFwiO1xuaW1wb3J0IHsgbG9hZFJlc291cmNlcyB9IGZyb20gXCIuLi9Mb2FkZXJzXCI7XG5pbXBvcnQgeyBwYXJzZU1vZE1hbmlmZXN0LCBNb2RGaWxlIH0gZnJvbSBcIi4vTWFuaWZlc3RQYXJzZXJcIjtcblxuZXhwb3J0IHsgcGFyc2VNb2RNYW5pZmVzdCB9O1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgZGVzY3JpYmVzIGEgR0RNb2QgbW9kIHRoYXQgY2FuIGJlIHJldHVybmVkIGJ5IHRoZSBKYXZhU2NyaXB0IGNvZGUuIFVzaW5nIGl0IGhhcyBhZHZhbnRhZ2VzOlxuICogMS4gT3RoZXIgbW9kcyBjYW4gaW50ZXJhY3Qgd2l0aCB5b3Vycy5cbiAqIDIuIFRoZSBtb2QgY2FuIGJlIG1hbmFnZWQgYnkgR0RNb2QsIGFsbG93aW5nIGZvciBtb3JlIGNvbnRyb2wgYnkgdGhlIHVzZXIgYW5kIHRoZXJlZm9yZSBhIGJldHRlciBVWC5cbiAqIDMuIEhvcGVmdWxseSBhIGJldHRlciBtb2RkaW5nIGV4cGVyaWVuY2UuXG4gKlxuICogQGNhdGVnb3J5IE1vZCBpbnRlZ3JhdGlvblxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiBjbGFzcyBteU1vZCBleHRlbmRzIE1vZCB7XG4gKiAgICAgcHJlRXZlbnQocnVudGltZVNjZW5lKSB7XG4gKiAgICAgICAgIGNvbnNvbGUubG9nKFwiSGVsbG8gV29ybGQhXCIpO1xuICogICAgIH07XG4gKiB9XG4gKlxuICogcmV0dXJuIG15TW9kO1xuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBNb2Qge1xuICAvKipcbiAgICogRnVuY3Rpb24gY2FsbGVkIHdoZW4gdGhlIHNjZW5lIHN3aXRjaGVkLlxuICAgKiBAcGFyYW0ge2dkanMuUnVudGltZVNjZW5lfSBydW50aW1lU2NlbmUgLSBUaGUgbmV3IHNjZW5lLlxuICAgKi9cbiAgc2NlbmVDaGFuZ2VkKHJ1bnRpbWVTY2VuZTogZ2Rqcy5SdW50aW1lU2NlbmUpIHt9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIGNhbGxlZCBiZWZvcmUgdGhlIHNjZW5lIGV2ZW50IHNoZWV0LlxuICAgKiBAcGFyYW0ge2dkanMuUnVudGltZVNjZW5lfSBydW50aW1lU2NlbmUgLSBUaGUgY3VycmVudCBzY2VuZS5cbiAgICovXG4gIHByZUV2ZW50KHJ1bnRpbWVTY2VuZTogZ2Rqcy5SdW50aW1lU2NlbmUpIHt9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIGNhbGxlZCBhZnRlciB0aGUgc2NlbmUgZXZlbnQgc2hlZXQuXG4gICAqIEBwYXJhbSB7Z2Rqcy5SdW50aW1lU2NlbmV9IHJ1bnRpbWVTY2VuZSAtIFRoZSBjdXJyZW50IHNjZW5lLlxuICAgKi9cbiAgcG9zdEV2ZW50KHJ1bnRpbWVTY2VuZTogZ2Rqcy5SdW50aW1lU2NlbmUpIHt9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIGNhbGxlZCB3aGVuIHRoZSBtb2Qgc2hvdWxkIGdldCB1bmxvYWRlZCwgdG8gYWxsb3cgaXQgdG8gY2xlYW4gdGhpbmdzIHVwLlxuICAgKi9cbiAgdW5sb2FkKCkge31cbn1cblxuLyoqXG4gKiBMb2FkcyBhIHByZS1wYXJzZWQgbW9kLlxuICogVGhpcyBpcyB3aGF0IGlzIGFjdHVhbGx5IGxvYWRpbmcgYSBtb2QuXG4gKiBAcGFyYW0gbW9kRmlsZSAtIFRoZSBNb2QgZmlsZS5cbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgbG9hZE1vZEZpbGUgPSBhc3luYyBmdW5jdGlvbiAobW9kRmlsZTogTW9kRmlsZSkge1xuICBjb25zdCB7XG4gICAgbWFuaWZlc3Q6IHsgcmVzb3VyY2VzLCBpbmNsdWRlcywgbWFpbk1hbmlmZXN0IH0sXG4gICAgZmlsZTogcmF3RmlsZSxcbiAgfSA9IG1vZEZpbGU7XG5cbiAgLy8gTG9hZCB0aGUgemlwXG4gIGNvbnN0IGZpbGUgPSBhd2FpdCBsb2FkWklQKHJhd0ZpbGUpO1xuXG4gIC8vIExvYWQgcmVzb3VyY2VzXG4gIGlmIChyZXNvdXJjZXMubGVuZ3RoICE9PSAwKSBhd2FpdCBsb2FkUmVzb3VyY2VzKGZpbGUsIHJlc291cmNlcyk7XG5cbiAgLy8gTG9hZCB0aGUgY29kZVxuICBsZXQgbW9kTG9hZGVkID0gZmFsc2U7XG4gIGlmIChpbmNsdWRlcy5sZW5ndGggIT09IDApXG4gICAgZm9yIChsZXQgaW5jbHVkZSBvZiBpbmNsdWRlcykge1xuICAgICAgLy9AdHMtaWdub3JlIHBhcnNlTW9kTWFuaWZlc3QgYWxyZWFkeSBtYWRlIHN1cmUgdGhhdCBpdCBpc24ndCBudWxsXG4gICAgICBjb25zdCBqc0ZpbGUgPSBhd2FpdCBmaWxlLmZpbGUoXCJjb2RlL1wiICsgaW5jbHVkZSkuYXN5bmMoXCJzdHJpbmdcIik7XG5cbiAgICAgIGNvbnN0IHBvdGVudGlhbE1vZCA9IHdpbmRvdy5ldmFsKFxuICAgICAgICBgKGZ1bmN0aW9uKCkgeyR7anNGaWxlfX0pKClgXG4gICAgICApIGFzIHR5cGVvZiBNb2Q7XG5cbiAgICAgIGlmICh0eXBlb2YgcG90ZW50aWFsTW9kID09PSBcImZ1bmN0aW9uXCIgJiYgIW1vZExvYWRlZCkge1xuICAgICAgICAvLyBMb2FkIGEgTW9kIGluc3RhbmNlXG4gICAgICAgIE1vZE1hbmFnZXIuZ2V0KCkuYWRkKG1haW5NYW5pZmVzdC51aWQsIG5ldyBwb3RlbnRpYWxNb2QoKSk7XG4gICAgICAgIG1vZExvYWRlZCA9IHRydWU7IC8vIE9ubHkgYWxsb3cgb25lIG1vZCB0byBsb2FkIChlbHNlIHRoZXJlIHdvdWxkIGJlIG11bHRpcGxlIG1vZHMgd2l0aCB0aGUgc2FtZSBtZXRhZGF0YSkuXG4gICAgICB9XG4gICAgfVxuXG4gIC8vIExvYWQgZHVtbXkgbW9kIGZvciBtb2QgbGlzdFxuICBpZiAoIW1vZExvYWRlZCkgTW9kTWFuYWdlci5nZXQoKS5hZGQobWFpbk1hbmlmZXN0LnVpZCwgbmV3IE1vZCgpKTtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBMb2FkZXIgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHR5cGUgdFBJWEkgZnJvbSBcInBpeGkuanNcIjtcbmRlY2xhcmUgY29uc3QgUElYSTogdHlwZW9mIHRQSVhJO1xuXG5jb25zdCBJbWFnZUxvYWRlcjogTG9hZGVyID0gYXN5bmMgZnVuY3Rpb24gKGZpbGUsIHJlc291cmNlKSB7XG4gIC8vQHRzLWlnbm9yZSBwYXJzZU1vZE1hbmlmZXN0IGFscmVhZHkgbWFkZSBzdXJlIHRoYXQgaXQgaXNuJ3QgbnVsbFxuICBjb25zdCByZXNvdXJjZUZpbGUgPSBhd2FpdCBmaWxlXG4gICAgLmZpbGUoXCJyZXNvdXJjZXMvXCIgKyByZXNvdXJjZS5maWxlKVxuICAgIC5hc3luYyhcImJsb2JcIik7XG4gIC8vIEdldCBhbiBVUkwgZm9yIHRoZSBpbWFnZSBCbG9iXG4gIGNvbnN0IGJsb2JVUkwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHJlc291cmNlRmlsZSk7XG5cbiAgLy8gTG9hZCB0aGUgaW1hZ2UgYXMgYSBwaXhpIHRleHR1cmVcbiAgR0RBUEkuZ2FtZVxuICAgIC5nZXRJbWFnZU1hbmFnZXIoKVxuICAgIC5fbG9hZGVkVGV4dHVyZXMucHV0KHJlc291cmNlLm5hbWUsIGF3YWl0IFBJWEkuVGV4dHVyZS5mcm9tVVJMKGJsb2JVUkwpKTtcblxuICBVUkwucmV2b2tlT2JqZWN0VVJMKGJsb2JVUkwpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VMb2FkZXI7XG4iLCAiaW1wb3J0IHR5cGUgeyBMb2FkZXIgfSBmcm9tIFwiLlwiO1xuXG5jb25zdCBBdWRpb0xvYWRlcjogTG9hZGVyID0gYXN5bmMgKGZpbGUsIHJlc291cmNlKSA9PiB7XG4gIC8vQHRzLWlnbm9yZSBwYXJzZU1vZE1hbmlmZXN0IGFscmVhZHkgbWFkZSBzdXJlIHRoYXQgaXQgaXNuJ3QgbnVsbFxuICBjb25zdCBhdWRpb0ZpbGUgPSBhd2FpdCBmaWxlLmZpbGUoXCJyZXNvdXJjZXMvXCIgKyByZXNvdXJjZS5maWxlKS5hc3luYyhcImJsb2JcIik7XG4gIGNvbnN0IGF1ZGlvTWFuYWdlciA9IEdEQVBJLmdhbWUuZ2V0U291bmRNYW5hZ2VyKCk7XG5cbiAgLy8gT3ZlcnJpZGUgdGhlIHJlc291cmNlIHdpdGggdGhlIG5ldyBVUkxcbiAgYXVkaW9NYW5hZ2VyLl9hdmFpbGFibGVSZXNvdXJjZXNbcmVzb3VyY2UubmFtZV0gPSBPYmplY3QuYXNzaWduKFxuICAgIHsgbWV0YWRhdGE6IFwiXCIsIHVzZXJBZGRlZDogZmFsc2UgfSxcbiAgICByZXNvdXJjZSxcbiAgICB7XG4gICAgICBmaWxlOiBVUkwuY3JlYXRlT2JqZWN0VVJMKGF1ZGlvRmlsZSksXG4gICAgfVxuICApO1xuXG4gIC8vIFByZWxvYWQgdGhlIG5ld2x5IGFkZGVkIGF1ZGlvIGZpbGUgaWYgcG9zc2libGVcbiAgaWYgKGF1ZGlvTWFuYWdlci5oYXNPd25Qcm9wZXJ0eShcImxvYWRBdWRpb1wiKSkge1xuICAgIGF1ZGlvTWFuYWdlci5sb2FkQXVkaW8ocmVzb3VyY2UubmFtZSwgZmFsc2UpO1xuICAgIGF1ZGlvTWFuYWdlci5sb2FkQXVkaW8ocmVzb3VyY2UubmFtZSwgdHJ1ZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF1ZGlvTG9hZGVyO1xuIiwgImltcG9ydCB0eXBlIEpTWmlwIGZyb20gXCJqc3ppcFwiO1xuaW1wb3J0IHR5cGUgeyBSZXNvdXJjZSB9IGZyb20gXCIuLi9Nb2QvTWFuaWZlc3RQYXJzZXJcIjtcbmltcG9ydCBJbWFnZUxvYWRlciBmcm9tIFwiLi9JbWFnZUxvYWRlclwiO1xuaW1wb3J0IEF1ZGlvTG9hZGVyIGZyb20gXCIuL0F1ZGlvTG9hZGVyXCI7XG5cbmV4cG9ydCB0eXBlIExvYWRlciA9IChmaWxlOiBKU1ppcCwgcmVzb3VyY2U6IFJlc291cmNlKSA9PiBQcm9taXNlPHZvaWQ+O1xuY29uc3QgTW9ja0xvYWRlcjogTG9hZGVyID0gKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCk7XG5jb25zdCBsb2FkZXJzOiBSZWNvcmQ8UmVzb3VyY2VLaW5kLCBMb2FkZXI+ID0ge1xuICBpbWFnZTogSW1hZ2VMb2FkZXIsXG4gIGF1ZGlvOiBBdWRpb0xvYWRlcixcbiAgZm9udDogTW9ja0xvYWRlcixcbiAgdmlkZW86IE1vY2tMb2FkZXIsXG4gIGpzb246IE1vY2tMb2FkZXIsXG59O1xuXG5leHBvcnQgY29uc3QgbG9hZFJlc291cmNlcyA9IChmaWxlOiBKU1ppcCwgcmVzb3VyY2VzOiBSZXNvdXJjZVtdKSA9PlxuICBQcm9taXNlLmFsbChcbiAgICByZXNvdXJjZXMubWFwKChyZXNvdXJjZSkgPT4gbG9hZGVyc1tyZXNvdXJjZS5raW5kXShmaWxlLCByZXNvdXJjZSkpXG4gICk7XG4iLCAiaW1wb3J0IHsgbG9hZEFzeW5jIGFzIGxvYWRaSVAgfSBmcm9tIFwianN6aXBcIjtcbmltcG9ydCAqIGFzIHQgZnJvbSBcInR5cGFuaW9uXCI7XG5cbnR5cGUgRmlsZSA9IEJsb2IgfCBCdWZmZXIgfCBBcnJheUJ1ZmZlciB8IFVpbnQ4QXJyYXk7XG5cbmNvbnN0IGlzRmlsZTogKCkgPT4gdC5TdHJpY3RWYWxpZGF0b3I8dW5rbm93biwgRmlsZT4gPSAoKSA9PlxuICB0Lm1ha2VWYWxpZGF0b3Ioe1xuICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpOiB2YWx1ZSBpcyBGaWxlID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgKHR5cGVvZiBCbG9iICE9PSBcInVuZGVmaW5lZFwiICYmIHZhbHVlIGluc3RhbmNlb2YgQmxvYikgfHxcbiAgICAgICAgKHR5cGVvZiBCdWZmZXIgIT09IFwidW5kZWZpbmVkXCIgJiYgdmFsdWUgaW5zdGFuY2VvZiBCdWZmZXIpIHx8XG4gICAgICAgICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09IFwidW5kZWZpbmVkXCIgJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHxcbiAgICAgICAgKHR5cGVvZiBVaW50OEFycmF5ICE9PSBcInVuZGVmaW5lZFwiICYmIHZhbHVlIGluc3RhbmNlb2YgVWludDhBcnJheSlcbiAgICAgIClcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiB0LnB1c2hFcnJvcihcbiAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICBgRXhwZWN0ZWQgYSBmaWxlIChnb3QgJHt0LmdldFByaW50YWJsZSh2YWx1ZSl9KWBcbiAgICAgICAgKTtcbiAgICB9LFxuICB9KTtcblxuY29uc3QgaXNSZXNvdXJjZSA9IHQuaXNPYmplY3Qoe1xuICBuYW1lOiB0LmlzU3RyaW5nKCksXG4gIGZpbGU6IHQuaXNTdHJpbmcoKSxcbiAga2luZDogdC5pc09uZU9mKFxuICAgIFtcbiAgICAgIHQuaXNMaXRlcmFsKFwiaW1hZ2VcIiksXG4gICAgICB0LmlzTGl0ZXJhbChcImF1ZGlvXCIpLFxuICAgICAgdC5pc0xpdGVyYWwoXCJmb250XCIpLFxuICAgICAgdC5pc0xpdGVyYWwoXCJ2aWRlb1wiKSxcbiAgICAgIHQuaXNMaXRlcmFsKFwianNvblwiKSxcbiAgICBdLFxuICAgIHsgZXhjbHVzaXZlOiB0cnVlIH1cbiAgKSxcbn0pO1xuXG5jb25zdCBpc01hbmlmZXN0cyA9IHQuaXNPYmplY3Qoe1xuICBtYWluTWFuaWZlc3Q6IHQuaXNPYmplY3Qoe1xuICAgIG5hbWU6IHQuaXNTdHJpbmcoKSxcbiAgICBkZXNjcmlwdGlvbjogdC5pc1N0cmluZygpLFxuICAgIHZlcnNpb246IHQuaXNTdHJpbmcoKSxcbiAgICBhdXRob3I6IHQuaXNTdHJpbmcoKSxcbiAgICB1aWQ6IHQuaXNTdHJpbmcoKSxcbiAgfSksXG4gIGluY2x1ZGVzOiB0LmlzQXJyYXkodC5pc1N0cmluZygpKSxcbiAgcmVzb3VyY2VzOiB0LmlzQXJyYXkoaXNSZXNvdXJjZSksXG59KTtcblxuY29uc3QgaXNNb2RGaWxlID0gdC5pc09iamVjdCh7XG4gIG1hbmlmZXN0OiBpc01hbmlmZXN0cyxcbiAgZmlsZTogaXNGaWxlKCksXG59KTtcblxuZXhwb3J0IHR5cGUgUmVzb3VyY2UgPSB0LkluZmVyVHlwZTx0eXBlb2YgaXNSZXNvdXJjZT47XG5leHBvcnQgdHlwZSBNb2RGaWxlID0gdC5JbmZlclR5cGU8dHlwZW9mIGlzTW9kRmlsZT47XG5cbi8qKlxuICogUGFyc2VzIGEgbW9kIGZyb20gYSB6aXAuXG4gKiBUaGlzIGFsbG93cyBwcmVwYXJzaW5nIHRoZSBtb2Qgd2hlbiBpbnN0YWxsaW5nIGl0LCB0byBoYXZlIGFjY2VzcyB0byBpdHMgbWV0YWRhdGEgd2l0aG91dCBpbml0aWFsaXppbmcgaXQuXG4gKiBUaGlzIGFsc28gdmFsaWRhdGVzIGFsbCB0aGUgbWFuaWZlc3RzLlxuICpcbiAqIEBwYXJhbSByYXdGaWxlIC0gVGhlIE1vZCBmaWxlLlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBwYXJzZU1vZE1hbmlmZXN0ID0gYXN5bmMgZnVuY3Rpb24gKFxuICByYXdGaWxlOiBGaWxlXG4pOiBQcm9taXNlPE1vZEZpbGU+IHtcbiAgLy8gTG9hZCB0aGUgemlwXG4gIGNvbnN0IGZpbGUgPSBhd2FpdCBsb2FkWklQKHJhd0ZpbGUpO1xuXG4gIC8vIExvYWQgdGhlIGZpbGVzXG4gIGNvbnN0IG1haW5NYW5pZmVzdEZpbGUgPSBmaWxlLmZpbGUoXCJkYXRhL0dETW9kLmpzb25cIik7XG4gIGNvbnN0IGluY2x1ZGVzRmlsZSA9IGZpbGUuZmlsZShcImRhdGEvaW5jbHVkZXMuanNvblwiKTtcbiAgY29uc3QgcmVzb3VyY2VzRmlsZSA9IGZpbGUuZmlsZShcImRhdGEvcmVzb3VyY2VzLmpzb25cIik7XG5cbiAgLy8gVmVyaWZ5IHRoZWlyIHByZXNlbmNlXG4gIGlmIChcbiAgICBtYWluTWFuaWZlc3RGaWxlID09IHVuZGVmaW5lZCB8fFxuICAgIGluY2x1ZGVzRmlsZSA9PSB1bmRlZmluZWQgfHxcbiAgICByZXNvdXJjZXNGaWxlID09IHVuZGVmaW5lZFxuICApXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQSBtYW5pZmVzdCBmaWxlIGlzIG1pc3NpbmchIElzIHRoaXMgYSBHRE1vZCBtb2Q/XCIpO1xuXG4gIC8vIFBhcnNlIHRoZSBmaWxlcyBpbnRvIGEgTW9kRmlsZSBvYmplY3RcbiAgdHJ5IHtcbiAgICB2YXIgbW9kRmlsZTogTW9kRmlsZSA9IHtcbiAgICAgIG1hbmlmZXN0OiB7XG4gICAgICAgIG1haW5NYW5pZmVzdDogSlNPTi5wYXJzZShhd2FpdCBtYWluTWFuaWZlc3RGaWxlLmFzeW5jKFwic3RyaW5nXCIpKSxcbiAgICAgICAgaW5jbHVkZXM6IEpTT04ucGFyc2UoYXdhaXQgaW5jbHVkZXNGaWxlLmFzeW5jKFwic3RyaW5nXCIpKSxcbiAgICAgICAgcmVzb3VyY2VzOiBKU09OLnBhcnNlKGF3YWl0IHJlc291cmNlc0ZpbGUuYXN5bmMoXCJzdHJpbmdcIikpLFxuICAgICAgfSxcbiAgICAgIGZpbGU6IHJhd0ZpbGUsXG4gICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIFwiQSBtYW5pZmVzdCBjb3VsZCBub3QgYmUgcGFyc2VkISBNYWtlIHN1cmUgaXQgaXMgdmFsaWQgSlNPTi4gXCIgKyBlXG4gICAgKTtcbiAgfVxuXG4gIC8vIFRyeSB0byBhdXRvZml4IGFueSBpbnZhbGlkIHJlc291cmNlLlxuICBtb2RGaWxlLm1hbmlmZXN0LnJlc291cmNlcyA9IG1vZEZpbGUubWFuaWZlc3QucmVzb3VyY2VzLm1hcCgocmVzb3VyY2UpID0+IHtcbiAgICAvLyBJZiBhIHN0cmluZyBpcyBzdXBwbGllZCwgdXNlIGl0IGFzIGZpbGUgYW5kIHJlc291cmNlIG5hbWUgZm9yIGFuIGltYWdlLlxuICAgIGlmICh0eXBlb2YgcmVzb3VyY2UgPT09IFwic3RyaW5nXCIpXG4gICAgICByZXR1cm4geyBuYW1lOiByZXNvdXJjZSwgZmlsZTogcmVzb3VyY2UsIGtpbmQ6IFwiaW1hZ2VcIiB9O1xuXG4gICAgLy8gRGVmYXVsdCBraW5kIGlzIGltYWdlLlxuICAgIGlmICghKFwia2luZFwiIGluIHJlc291cmNlKSkgKHJlc291cmNlIGFzIGFueSkua2luZCA9IFwiaW1hZ2VcIjtcblxuICAgIC8vIERlZmF1bHQgcmVzb3VyY2UgbmFtZSBpcyBmaWxlIG5hbWUuXG4gICAgaWYgKCEoXCJuYW1lXCIgaW4gcmVzb3VyY2UpKSAocmVzb3VyY2UgYXMgYW55KS5uYW1lID0gKHJlc291cmNlIGFzIGFueSkuZmlsZTtcblxuICAgIHJldHVybiByZXNvdXJjZTtcbiAgfSk7XG5cbiAgLy8gVmVyaWZ5IGlmIHRoZSBNb2RGaWxlIG1hdGNoZXMgdGhlIHNjaGVtYVxuICBjb25zdCBlcnJvcnM6IHN0cmluZ1tdID0gW107XG4gIGlmICghaXNNb2RGaWxlKG1vZEZpbGUsIHsgZXJyb3JzIH0pKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgXCJTb21lIGVycm9ycyBoYXZlIGJlZW4gZGV0ZWN0ZWQgd2hpbGUgcGFyc2luZyBtYW5pZmVzdHM6IFwiLFxuICAgICAgZXJyb3JzXG4gICAgKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBcIlRoZSBtYW5pZmVzdHMgYXJlIGludmFsaWQhIFNlZSB0aGUgbGlzdCBvZiBlcnJvcnMgaW4gdGhlIGNvbnNvbGUuXCJcbiAgICApO1xuICB9XG5cbiAgLy8gVmVyaWZ5IHRoZSBwcmVzZW5jZSBvZiBmaWxlcyBmb3IgdGhlIHJlc291cmNlcyBhbmQgaW5jbHVkZXNcbiAgY29uc3QgaW52YWxpZEluY2x1ZGVzID0gbW9kRmlsZS5tYW5pZmVzdC5pbmNsdWRlcy5maWx0ZXIoXG4gICAgKGluY2x1ZGUpID0+IGZpbGUuZmlsZShcImNvZGUvXCIgKyBpbmNsdWRlKSA9PT0gbnVsbFxuICApO1xuICBpZiAoaW52YWxpZEluY2x1ZGVzLmxlbmd0aCAhPT0gMClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBcIkNhbm5vdCBmaW5kIGZvbGxvd2luZyBpbmNsdWRlIGZpbGVzOiBcIiArIGludmFsaWRJbmNsdWRlcy5qb2luKFwiLCBcIilcbiAgICApO1xuXG4gIGNvbnN0IGludmFsaWRSZXNvdXJjZXMgPSBtb2RGaWxlLm1hbmlmZXN0LnJlc291cmNlcy5maWx0ZXIoXG4gICAgKHJlc291cmNlKSA9PiBmaWxlLmZpbGUoXCJyZXNvdXJjZXMvXCIgKyByZXNvdXJjZS5maWxlKSA9PT0gbnVsbFxuICApO1xuICBpZiAoaW52YWxpZFJlc291cmNlcy5sZW5ndGggIT09IDApXG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCJDYW5ub3QgZmluZCBmb2xsb3dpbmcgcmVzb3VyY2UgZmlsZXM6IFwiICtcbiAgICAgICAgaW52YWxpZFJlc291cmNlcy5tYXAoKHIpID0+IHIuZmlsZSkuam9pbihcIiwgXCIpXG4gICAgKTtcblxuICByZXR1cm4gbW9kRmlsZTtcbn07XG4iLCAiY29uc3Qgc2ltcGxlS2V5UmVnRXhwID0gL15bYS16QS1aX11bYS16QS1aMC05X10qJC87XG5jb25zdCBjb2xvclN0cmluZ1JlZ0V4cCA9IC9eI1swLTlhLWZdezZ9JC9pO1xuY29uc3QgY29sb3JTdHJpbmdBbHBoYVJlZ0V4cCA9IC9eI1swLTlhLWZdezZ9KFswLTlhLWZdezJ9KT8kL2k7XG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDc1MjE3Lzg4MDcwM1xuY29uc3QgYmFzZTY0UmVnRXhwID0gL14oPzpbQS1aYS16MC05Ky9dezR9KSooPzpbQS1aYS16MC05Ky9dezJ9PT18W0EtWmEtejAtOSsvXXszfT0pPyQvO1xuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE0MTY2MTk0Lzg4MDcwM1xuY29uc3QgdXVpZDRSZWdFeHAgPSAvXlthLWYwLTldezh9LVthLWYwLTldezR9LTRbYS1mMC05XXszfS1bODlhQWJCXVthLWYwLTldezN9LVthLWYwLTldezEyfSQvaTtcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yODAyMjkwMS84ODA3MDMgKyBodHRwczovL3d3dy5kZWJ1Z2dleC5jb20vci9ibDhKMzV3TUtrNDhhN3VfXG5jb25zdCBpc284NjAxUmVnRXhwID0gL14oPzpbMS05XVxcZHszfSgtPykoPzooPzowWzEtOV18MVswLTJdKVxcMSg/OjBbMS05XXwxXFxkfDJbMC04XSl8KD86MFsxMy05XXwxWzAtMl0pXFwxKD86Mjl8MzApfCg/OjBbMTM1NzhdfDFbMDJdKSg/OlxcMSkzMXwwMFsxLTldfDBbMS05XVxcZHxbMTJdXFxkezJ9fDMoPzpbMC01XVxcZHw2WzAtNV0pKXwoPzpbMS05XVxcZCg/OjBbNDhdfFsyNDY4XVswNDhdfFsxMzU3OV1bMjZdKXwoPzpbMjQ2OF1bMDQ4XXxbMTM1NzldWzI2XSkwMCkoPzooLT8pMDIoPzpcXDIpMjl8LT8zNjYpKVQoPzpbMDFdXFxkfDJbMC0zXSkoOj8pWzAtNV1cXGQoPzpcXDNbMC01XVxcZCk/KD86WnxbKy1dWzAxXVxcZCg/OlxcM1swLTVdXFxkKT8pJC87XG5jb25zdCBtYWtlVHJhaXQgPSAodmFsdWUpID0+ICgpID0+IHtcbiAgICByZXR1cm4gdmFsdWU7XG59O1xuZnVuY3Rpb24gbWFrZVZhbGlkYXRvcih7IHRlc3QgfSkge1xuICAgIHJldHVybiBtYWtlVHJhaXQodGVzdCkoKTtcbn1cbmZ1bmN0aW9uIGdldFByaW50YWJsZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbClcbiAgICAgICAgcmV0dXJuIGBudWxsYDtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIGB1bmRlZmluZWRgO1xuICAgIGlmICh2YWx1ZSA9PT0gYGApXG4gICAgICAgIHJldHVybiBgYW4gZW1wdHkgc3RyaW5nYDtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xufVxuZnVuY3Rpb24gY29tcHV0ZUtleShzdGF0ZSwga2V5KSB7XG4gICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09IGBudW1iZXJgKSB7XG4gICAgICAgIHJldHVybiBgJHsoX2EgPSBzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUucCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogYC5gfVske2tleX1dYDtcbiAgICB9XG4gICAgZWxzZSBpZiAoc2ltcGxlS2V5UmVnRXhwLnRlc3Qoa2V5KSkge1xuICAgICAgICByZXR1cm4gYCR7KF9iID0gc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLnApICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IGBgfS4ke2tleX1gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGAkeyhfYyA9IHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5wKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBgLmB9WyR7SlNPTi5zdHJpbmdpZnkoa2V5KX1dYDtcbiAgICB9XG59XG5mdW5jdGlvbiBtYWtlQ29lcmNpb25Gbih0YXJnZXQsIGtleSkge1xuICAgIHJldHVybiAodikgPT4ge1xuICAgICAgICBjb25zdCBwcmV2aW91cyA9IHRhcmdldFtrZXldO1xuICAgICAgICB0YXJnZXRba2V5XSA9IHY7XG4gICAgICAgIHJldHVybiBtYWtlQ29lcmNpb25Gbih0YXJnZXQsIGtleSkuYmluZChudWxsLCBwcmV2aW91cyk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIG1ha2VTZXR0ZXIodGFyZ2V0LCBrZXkpIHtcbiAgICByZXR1cm4gKHYpID0+IHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSB2O1xuICAgIH07XG59XG5mdW5jdGlvbiBwbHVyYWwobiwgc2luZ3VsYXIsIHBsdXJhbCkge1xuICAgIHJldHVybiBuID09PSAxID8gc2luZ3VsYXIgOiBwbHVyYWw7XG59XG5mdW5jdGlvbiBwdXNoRXJyb3IoeyBlcnJvcnMsIHAgfSA9IHt9LCBtZXNzYWdlKSB7XG4gICAgZXJyb3JzID09PSBudWxsIHx8IGVycm9ycyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXJyb3JzLnB1c2goYCR7cCAhPT0gbnVsbCAmJiBwICE9PSB2b2lkIDAgPyBwIDogYC5gfTogJHttZXNzYWdlfWApO1xuICAgIHJldHVybiBmYWxzZTtcbn1cbmNvbnN0IGlzVW5rbm93biA9ICgpID0+IG1ha2VWYWxpZGF0b3Ioe1xuICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbn0pO1xuZnVuY3Rpb24gaXNMaXRlcmFsKGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIG1ha2VWYWxpZGF0b3Ioe1xuICAgICAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IGV4cGVjdGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCBhIGxpdGVyYWwgKGdvdCAke2dldFByaW50YWJsZShleHBlY3RlZCl9KWApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5jb25zdCBpc1N0cmluZyA9ICgpID0+IG1ha2VWYWxpZGF0b3Ioe1xuICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gYHN0cmluZ2ApXG4gICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgRXhwZWN0ZWQgYSBzdHJpbmcgKGdvdCAke2dldFByaW50YWJsZSh2YWx1ZSl9KWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxufSk7XG5mdW5jdGlvbiBpc0VudW0oZW51bVNwZWMpIHtcbiAgICBjb25zdCB2YWx1ZXNBcnJheSA9IEFycmF5LmlzQXJyYXkoZW51bVNwZWMpID8gZW51bVNwZWMgOiBPYmplY3QudmFsdWVzKGVudW1TcGVjKTtcbiAgICBjb25zdCB2YWx1ZXMgPSBuZXcgU2V0KHZhbHVlc0FycmF5KTtcbiAgICByZXR1cm4gbWFrZVZhbGlkYXRvcih7XG4gICAgICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgICAgIGlmICghdmFsdWVzLmhhcyh2YWx1ZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIGEgdmFsaWQgZW51bWVyYXRpb24gdmFsdWUgKGdvdCAke2dldFByaW50YWJsZSh2YWx1ZSl9KWApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5jb25zdCBCT09MRUFOX0NPRVJDSU9OUyA9IG5ldyBNYXAoW1xuICAgIFtgdHJ1ZWAsIHRydWVdLFxuICAgIFtgVHJ1ZWAsIHRydWVdLFxuICAgIFtgMWAsIHRydWVdLFxuICAgIFsxLCB0cnVlXSxcbiAgICBbYGZhbHNlYCwgZmFsc2VdLFxuICAgIFtgRmFsc2VgLCBmYWxzZV0sXG4gICAgW2AwYCwgZmFsc2VdLFxuICAgIFswLCBmYWxzZV0sXG5dKTtcbmNvbnN0IGlzQm9vbGVhbiA9ICgpID0+IG1ha2VWYWxpZGF0b3Ioe1xuICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBgYm9vbGVhbmApIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5jb2VyY2lvbnMpICE9PSBgdW5kZWZpbmVkYCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5jb2VyY2lvbikgPT09IGB1bmRlZmluZWRgKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgVW5ib3VuZCBjb2VyY2lvbiByZXN1bHRgKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2VyY2lvbiA9IEJPT0xFQU5fQ09FUkNJT05TLmdldCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb2VyY2lvbiAhPT0gYHVuZGVmaW5lZGApIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuY29lcmNpb25zLnB1c2goWyhfYSA9IHN0YXRlLnApICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGAuYCwgc3RhdGUuY29lcmNpb24uYmluZChudWxsLCBjb2VyY2lvbildKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIGEgYm9vbGVhbiAoZ290ICR7Z2V0UHJpbnRhYmxlKHZhbHVlKX0pYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbn0pO1xuY29uc3QgaXNOdW1iZXIgPSAoKSA9PiBtYWtlVmFsaWRhdG9yKHtcbiAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gYG51bWJlcmApIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5jb2VyY2lvbnMpICE9PSBgdW5kZWZpbmVkYCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5jb2VyY2lvbikgPT09IGB1bmRlZmluZWRgKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgVW5ib3VuZCBjb2VyY2lvbiByZXN1bHRgKTtcbiAgICAgICAgICAgICAgICBsZXQgY29lcmNpb247XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gYHN0cmluZ2ApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChfYikgeyB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGNoZWNrIGFnYWluc3QgSlNPTi5zdHJpbmdpZnkgdGhhdCB0aGUgb3V0cHV0IGlzIHRoZSBzYW1lIHRvIGVuc3VyZSB0aGF0IHRoZSBudW1iZXIgY2FuIGJlIHNhZmVseSByZXByZXNlbnRlZCBpbiBKU1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gYG51bWJlcmApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeSh2YWwpID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZXJjaW9uID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYFJlY2VpdmVkIGEgbnVtYmVyIHRoYXQgY2FuJ3QgYmUgc2FmZWx5IHJlcHJlc2VudGVkIGJ5IHRoZSBydW50aW1lICgke3ZhbHVlfSlgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvZXJjaW9uICE9PSBgdW5kZWZpbmVkYCkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5jb2VyY2lvbnMucHVzaChbKF9hID0gc3RhdGUucCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogYC5gLCBzdGF0ZS5jb2VyY2lvbi5iaW5kKG51bGwsIGNvZXJjaW9uKV0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgRXhwZWN0ZWQgYSBudW1iZXIgKGdvdCAke2dldFByaW50YWJsZSh2YWx1ZSl9KWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG59KTtcbmNvbnN0IGlzRGF0ZSA9ICgpID0+IG1ha2VWYWxpZGF0b3Ioe1xuICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIChzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUuY29lcmNpb25zKSAhPT0gYHVuZGVmaW5lZGApIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUuY29lcmNpb24pID09PSBgdW5kZWZpbmVkYClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYFVuYm91bmQgY29lcmNpb24gcmVzdWx0YCk7XG4gICAgICAgICAgICAgICAgbGV0IGNvZXJjaW9uO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IGBzdHJpbmdgICYmIGlzbzg2MDFSZWdFeHAudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29lcmNpb24gPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGltZXN0YW1wO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBgc3RyaW5nYCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoX2IpIHsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09IGBudW1iZXJgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gYG51bWJlcmApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGltZXN0YW1wICE9PSBgdW5kZWZpbmVkYCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlci5pc1NhZmVJbnRlZ2VyKHRpbWVzdGFtcCkgfHwgIU51bWJlci5pc1NhZmVJbnRlZ2VyKHRpbWVzdGFtcCAqIDEwMDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29lcmNpb24gPSBuZXcgRGF0ZSh0aW1lc3RhbXAgKiAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBSZWNlaXZlZCBhIHRpbWVzdGFtcCB0aGF0IGNhbid0IGJlIHNhZmVseSByZXByZXNlbnRlZCBieSB0aGUgcnVudGltZSAoJHt2YWx1ZX0pYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb2VyY2lvbiAhPT0gYHVuZGVmaW5lZGApIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuY29lcmNpb25zLnB1c2goWyhfYSA9IHN0YXRlLnApICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGAuYCwgc3RhdGUuY29lcmNpb24uYmluZChudWxsLCBjb2VyY2lvbildKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIGEgZGF0ZSAoZ290ICR7Z2V0UHJpbnRhYmxlKHZhbHVlKX0pYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbn0pO1xuY29uc3QgaXNBcnJheSA9IChzcGVjLCB7IGRlbGltaXRlciB9ID0ge30pID0+IG1ha2VWYWxpZGF0b3Ioe1xuICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBgc3RyaW5nYCAmJiB0eXBlb2YgZGVsaW1pdGVyICE9PSBgdW5kZWZpbmVkYCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmNvZXJjaW9ucykgIT09IGB1bmRlZmluZWRgKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmNvZXJjaW9uKSA9PT0gYHVuZGVmaW5lZGApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBVbmJvdW5kIGNvZXJjaW9uIHJlc3VsdGApO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoZGVsaW1pdGVyKTtcbiAgICAgICAgICAgICAgICBzdGF0ZS5jb2VyY2lvbnMucHVzaChbKF9hID0gc3RhdGUucCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogYC5gLCBzdGF0ZS5jb2VyY2lvbi5iaW5kKG51bGwsIHZhbHVlKV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgRXhwZWN0ZWQgYW4gYXJyYXkgKGdvdCAke2dldFByaW50YWJsZSh2YWx1ZSl9KWApO1xuICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCB0ID0gMCwgVCA9IHZhbHVlLmxlbmd0aDsgdCA8IFQ7ICsrdCkge1xuICAgICAgICAgICAgdmFsaWQgPSBzcGVjKHZhbHVlW3RdLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKSwgeyBwOiBjb21wdXRlS2V5KHN0YXRlLCB0KSwgY29lcmNpb246IG1ha2VDb2VyY2lvbkZuKHZhbHVlLCB0KSB9KSkgJiYgdmFsaWQ7XG4gICAgICAgICAgICBpZiAoIXZhbGlkICYmIChzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUuZXJyb3JzKSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgIH0sXG59KTtcbmNvbnN0IGlzVHVwbGUgPSAoc3BlYywgeyBkZWxpbWl0ZXIgfSA9IHt9KSA9PiB7XG4gICAgY29uc3QgbGVuZ3RoVmFsaWRhdG9yID0gaGFzRXhhY3RMZW5ndGgoc3BlYy5sZW5ndGgpO1xuICAgIHJldHVybiBtYWtlVmFsaWRhdG9yKHtcbiAgICAgICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gYHN0cmluZ2AgJiYgdHlwZW9mIGRlbGltaXRlciAhPT0gYHVuZGVmaW5lZGApIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUuY29lcmNpb25zKSAhPT0gYHVuZGVmaW5lZGApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmNvZXJjaW9uKSA9PT0gYHVuZGVmaW5lZGApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgVW5ib3VuZCBjb2VyY2lvbiByZXN1bHRgKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zcGxpdChkZWxpbWl0ZXIpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5jb2VyY2lvbnMucHVzaChbKF9hID0gc3RhdGUucCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogYC5gLCBzdGF0ZS5jb2VyY2lvbi5iaW5kKG51bGwsIHZhbHVlKV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIGEgdHVwbGUgKGdvdCAke2dldFByaW50YWJsZSh2YWx1ZSl9KWApO1xuICAgICAgICAgICAgbGV0IHZhbGlkID0gbGVuZ3RoVmFsaWRhdG9yKHZhbHVlLCBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSkpO1xuICAgICAgICAgICAgZm9yIChsZXQgdCA9IDAsIFQgPSB2YWx1ZS5sZW5ndGg7IHQgPCBUICYmIHQgPCBzcGVjLmxlbmd0aDsgKyt0KSB7XG4gICAgICAgICAgICAgICAgdmFsaWQgPSBzcGVjW3RdKHZhbHVlW3RdLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKSwgeyBwOiBjb21wdXRlS2V5KHN0YXRlLCB0KSwgY29lcmNpb246IG1ha2VDb2VyY2lvbkZuKHZhbHVlLCB0KSB9KSkgJiYgdmFsaWQ7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWxpZCAmJiAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmVycm9ycykgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgICAgIH0sXG4gICAgfSk7XG59O1xuY29uc3QgaXNEaWN0ID0gKHNwZWMsIHsga2V5czoga2V5U3BlYyA9IG51bGwsIH0gPSB7fSkgPT4gbWFrZVZhbGlkYXRvcih7XG4gICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBgb2JqZWN0YCB8fCB2YWx1ZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCBhbiBvYmplY3QgKGdvdCAke2dldFByaW50YWJsZSh2YWx1ZSl9KWApO1xuICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCB0ID0gMCwgVCA9IGtleXMubGVuZ3RoICYmICh2YWxpZCB8fCAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmVycm9ycykgIT0gbnVsbCk7IHQgPCBUOyArK3QpIHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGtleXNbdF07XG4gICAgICAgICAgICBjb25zdCBzdWIgPSB2YWx1ZVtrZXldO1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gYF9fcHJvdG9fX2AgfHwga2V5ID09PSBgY29uc3RydWN0b3JgKSB7XG4gICAgICAgICAgICAgICAgdmFsaWQgPSBwdXNoRXJyb3IoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSksIHsgcDogY29tcHV0ZUtleShzdGF0ZSwga2V5KSB9KSwgYFVuc2FmZSBwcm9wZXJ0eSBuYW1lYCk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoa2V5U3BlYyAhPT0gbnVsbCAmJiAha2V5U3BlYyhrZXksIHN0YXRlKSkge1xuICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXNwZWMoc3ViLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKSwgeyBwOiBjb21wdXRlS2V5KHN0YXRlLCBrZXkpLCBjb2VyY2lvbjogbWFrZUNvZXJjaW9uRm4odmFsdWUsIGtleSkgfSkpKSB7XG4gICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgfSxcbn0pO1xuY29uc3QgaXNPYmplY3QgPSAocHJvcHMsIHsgZXh0cmE6IGV4dHJhU3BlYyA9IG51bGwsIH0gPSB7fSkgPT4ge1xuICAgIGNvbnN0IHNwZWNLZXlzID0gT2JqZWN0LmtleXMocHJvcHMpO1xuICAgIHJldHVybiBtYWtlVmFsaWRhdG9yKHtcbiAgICAgICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gYG9iamVjdGAgfHwgdmFsdWUgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIGFuIG9iamVjdCAoZ290ICR7Z2V0UHJpbnRhYmxlKHZhbHVlKX0pYCk7XG4gICAgICAgICAgICBjb25zdCBrZXlzID0gbmV3IFNldChbLi4uc3BlY0tleXMsIC4uLk9iamVjdC5rZXlzKHZhbHVlKV0pO1xuICAgICAgICAgICAgY29uc3QgZXh0cmEgPSB7fTtcbiAgICAgICAgICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gYGNvbnN0cnVjdG9yYCB8fCBrZXkgPT09IGBfX3Byb3RvX19gKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gcHVzaEVycm9yKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpLCB7IHA6IGNvbXB1dGVLZXkoc3RhdGUsIGtleSkgfSksIGBVbnNhZmUgcHJvcGVydHkgbmFtZWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BlYyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChwcm9wcywga2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBwcm9wc1trZXldXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHZhbHVlW2tleV1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNwZWMgIT09IGB1bmRlZmluZWRgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IHNwZWMoc3ViLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKSwgeyBwOiBjb21wdXRlS2V5KHN0YXRlLCBrZXkpLCBjb2VyY2lvbjogbWFrZUNvZXJjaW9uRm4odmFsdWUsIGtleSkgfSkpICYmIHZhbGlkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGV4dHJhU3BlYyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBwdXNoRXJyb3IoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSksIHsgcDogY29tcHV0ZUtleShzdGF0ZSwga2V5KSB9KSwgYEV4dHJhbmVvdXMgcHJvcGVydHkgKGdvdCAke2dldFByaW50YWJsZShzdWIpfSlgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHRyYSwga2V5LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6ICgpID0+IHN1YixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQ6IG1ha2VTZXR0ZXIodmFsdWUsIGtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdmFsaWQgJiYgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5lcnJvcnMpID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV4dHJhU3BlYyAhPT0gbnVsbCAmJiAodmFsaWQgfHwgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5lcnJvcnMpICE9IG51bGwpKVxuICAgICAgICAgICAgICAgIHZhbGlkID0gZXh0cmFTcGVjKGV4dHJhLCBzdGF0ZSkgJiYgdmFsaWQ7XG4gICAgICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgICAgIH0sXG4gICAgfSk7XG59O1xuY29uc3QgaXNJbnN0YW5jZU9mID0gKGNvbnN0cnVjdG9yKSA9PiBtYWtlVmFsaWRhdG9yKHtcbiAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgIGlmICghKHZhbHVlIGluc3RhbmNlb2YgY29uc3RydWN0b3IpKVxuICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIGFuIGluc3RhbmNlIG9mICR7Y29uc3RydWN0b3IubmFtZX0gKGdvdCAke2dldFByaW50YWJsZSh2YWx1ZSl9KWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxufSk7XG5jb25zdCBpc09uZU9mID0gKHNwZWNzLCB7IGV4Y2x1c2l2ZSA9IGZhbHNlLCB9ID0ge30pID0+IG1ha2VWYWxpZGF0b3Ioe1xuICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBbXTtcbiAgICAgICAgY29uc3QgZXJyb3JCdWZmZXIgPSB0eXBlb2YgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5lcnJvcnMpICE9PSBgdW5kZWZpbmVkYFxuICAgICAgICAgICAgPyBbXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgZm9yIChsZXQgdCA9IDAsIFQgPSBzcGVjcy5sZW5ndGg7IHQgPCBUOyArK3QpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YkVycm9ycyA9IHR5cGVvZiAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmVycm9ycykgIT09IGB1bmRlZmluZWRgXG4gICAgICAgICAgICAgICAgPyBbXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnN0IHN1YkNvZXJjaW9ucyA9IHR5cGVvZiAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmNvZXJjaW9ucykgIT09IGB1bmRlZmluZWRgXG4gICAgICAgICAgICAgICAgPyBbXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChzcGVjc1t0XSh2YWx1ZSwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSksIHsgZXJyb3JzOiBzdWJFcnJvcnMsIGNvZXJjaW9uczogc3ViQ29lcmNpb25zLCBwOiBgJHsoX2EgPSBzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUucCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogYC5gfSMke3QgKyAxfWAgfSkpKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKFtgIyR7dCArIDF9YCwgc3ViQ29lcmNpb25zXSk7XG4gICAgICAgICAgICAgICAgaWYgKCFleGNsdXNpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyb3JCdWZmZXIgPT09IG51bGwgfHwgZXJyb3JCdWZmZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVycm9yQnVmZmVyLnB1c2goc3ViRXJyb3JzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IFssIHN1YkNvZXJjaW9uc10gPSBtYXRjaGVzWzBdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdWJDb2VyY2lvbnMgIT09IGB1bmRlZmluZWRgKVxuICAgICAgICAgICAgICAgIChfYiA9IHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5jb2VyY2lvbnMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wdXNoKC4uLnN1YkNvZXJjaW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF0Y2hlcy5sZW5ndGggPiAxKVxuICAgICAgICAgICAgcHVzaEVycm9yKHN0YXRlLCBgRXhwZWN0ZWQgdG8gbWF0Y2ggZXhhY3RseSBhIHNpbmdsZSBwcmVkaWNhdGUgKG1hdGNoZWQgJHttYXRjaGVzLmpvaW4oYCwgYCl9KWApO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICAoX2MgPSBzdGF0ZSA9PT0gbnVsbCB8fCBzdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdGUuZXJyb3JzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucHVzaCguLi5lcnJvckJ1ZmZlcik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxufSk7XG5jb25zdCBhcHBseUNhc2NhZGUgPSAoc3BlYywgZm9sbG93dXBzKSA9PiBtYWtlVmFsaWRhdG9yKHtcbiAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB7IHZhbHVlOiB2YWx1ZSB9O1xuICAgICAgICBjb25zdCBzdWJDb2VyY2lvbiA9IHR5cGVvZiAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmNvZXJjaW9ucykgIT09IGB1bmRlZmluZWRgXG4gICAgICAgICAgICA/IG1ha2VDb2VyY2lvbkZuKGNvbnRleHQsIGB2YWx1ZWApIDogdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBzdWJDb2VyY2lvbnMgPSB0eXBlb2YgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5jb2VyY2lvbnMpICE9PSBgdW5kZWZpbmVkYFxuICAgICAgICAgICAgPyBbXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCFzcGVjKHZhbHVlLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKSwgeyBjb2VyY2lvbjogc3ViQ29lcmNpb24sIGNvZXJjaW9uczogc3ViQ29lcmNpb25zIH0pKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgcmV2ZXJ0cyA9IFtdO1xuICAgICAgICBpZiAodHlwZW9mIHN1YkNvZXJjaW9ucyAhPT0gYHVuZGVmaW5lZGApXG4gICAgICAgICAgICBmb3IgKGNvbnN0IFssIGNvZXJjaW9uXSBvZiBzdWJDb2VyY2lvbnMpXG4gICAgICAgICAgICAgICAgcmV2ZXJ0cy5wdXNoKGNvZXJjaW9uKCkpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmNvZXJjaW9ucykgIT09IGB1bmRlZmluZWRgKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQudmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHN0YXRlID09PSBudWxsIHx8IHN0YXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdGF0ZS5jb2VyY2lvbikgPT09IGB1bmRlZmluZWRgKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYFVuYm91bmQgY29lcmNpb24gcmVzdWx0YCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmNvZXJjaW9ucy5wdXNoKFsoX2EgPSBzdGF0ZS5wKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBgLmAsIHN0YXRlLmNvZXJjaW9uLmJpbmQobnVsbCwgY29udGV4dC52YWx1ZSldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKF9iID0gc3RhdGUgPT09IG51bGwgfHwgc3RhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0YXRlLmNvZXJjaW9ucykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnB1c2goLi4uc3ViQ29lcmNpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmb2xsb3d1cHMuZXZlcnkoc3BlYyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwZWMoY29udGV4dC52YWx1ZSwgc3RhdGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJldmVydCBvZiByZXZlcnRzKSB7XG4gICAgICAgICAgICAgICAgcmV2ZXJ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxufSk7XG5jb25zdCBpc09wdGlvbmFsID0gKHNwZWMpID0+IG1ha2VWYWxpZGF0b3Ioe1xuICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gYHVuZGVmaW5lZGApXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHNwZWModmFsdWUsIHN0YXRlKTtcbiAgICB9LFxufSk7XG5jb25zdCBpc051bGxhYmxlID0gKHNwZWMpID0+IG1ha2VWYWxpZGF0b3Ioe1xuICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBzcGVjKHZhbHVlLCBzdGF0ZSk7XG4gICAgfSxcbn0pO1xuY29uc3QgaGFzTWluTGVuZ3RoID0gKGxlbmd0aCkgPT4gbWFrZVZhbGlkYXRvcih7XG4gICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICBpZiAoISh2YWx1ZS5sZW5ndGggPj0gbGVuZ3RoKSlcbiAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBoYXZlIGEgbGVuZ3RoIG9mIGF0IGxlYXN0ICR7bGVuZ3RofSBlbGVtZW50cyAoZ290ICR7dmFsdWUubGVuZ3RofSlgKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbn0pO1xuY29uc3QgaGFzTWF4TGVuZ3RoID0gKGxlbmd0aCkgPT4gbWFrZVZhbGlkYXRvcih7XG4gICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICBpZiAoISh2YWx1ZS5sZW5ndGggPD0gbGVuZ3RoKSlcbiAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBoYXZlIGEgbGVuZ3RoIG9mIGF0IG1vc3QgJHtsZW5ndGh9IGVsZW1lbnRzIChnb3QgJHt2YWx1ZS5sZW5ndGh9KWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxufSk7XG5jb25zdCBoYXNFeGFjdExlbmd0aCA9IChsZW5ndGgpID0+IG1ha2VWYWxpZGF0b3Ioe1xuICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgaWYgKCEodmFsdWUubGVuZ3RoID09PSBsZW5ndGgpKVxuICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIHRvIGhhdmUgYSBsZW5ndGggb2YgZXhhY3RseSAke2xlbmd0aH0gZWxlbWVudHMgKGdvdCAke3ZhbHVlLmxlbmd0aH0pYCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG59KTtcbmNvbnN0IGhhc1VuaXF1ZUl0ZW1zID0gKHsgbWFwLCB9ID0ge30pID0+IG1ha2VWYWxpZGF0b3Ioe1xuICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgY29uc3Qgc2V0ID0gbmV3IFNldCgpO1xuICAgICAgICBjb25zdCBkdXAgPSBuZXcgU2V0KCk7XG4gICAgICAgIGZvciAobGV0IHQgPSAwLCBUID0gdmFsdWUubGVuZ3RoOyB0IDwgVDsgKyt0KSB7XG4gICAgICAgICAgICBjb25zdCBzdWIgPSB2YWx1ZVt0XTtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHR5cGVvZiBtYXAgIT09IGB1bmRlZmluZWRgXG4gICAgICAgICAgICAgICAgPyBtYXAoc3ViKVxuICAgICAgICAgICAgICAgIDogc3ViO1xuICAgICAgICAgICAgaWYgKHNldC5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgIGlmIChkdXAuaGFzKGtleSkpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIHRvIGNvbnRhaW4gdW5pcXVlIGVsZW1lbnRzOyBnb3QgYSBkdXBsaWNhdGUgd2l0aCAke2dldFByaW50YWJsZSh2YWx1ZSl9YCk7XG4gICAgICAgICAgICAgICAgZHVwLmFkZChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0LmFkZChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkdXAuc2l6ZSA9PT0gMDtcbiAgICB9LFxufSk7XG5jb25zdCBpc05lZ2F0aXZlID0gKCkgPT4gbWFrZVZhbGlkYXRvcih7XG4gICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICBpZiAoISh2YWx1ZSA8PSAwKSlcbiAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBiZSBuZWdhdGl2ZSAoZ290ICR7dmFsdWV9KWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxufSk7XG5jb25zdCBpc1Bvc2l0aXZlID0gKCkgPT4gbWFrZVZhbGlkYXRvcih7XG4gICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICBpZiAoISh2YWx1ZSA+PSAwKSlcbiAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBiZSBwb3NpdGl2ZSAoZ290ICR7dmFsdWV9KWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxufSk7XG5jb25zdCBpc0F0TGVhc3QgPSAobikgPT4gbWFrZVZhbGlkYXRvcih7XG4gICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICBpZiAoISh2YWx1ZSA+PSBuKSlcbiAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBiZSBhdCBsZWFzdCAke259IChnb3QgJHt2YWx1ZX0pYCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG59KTtcbmNvbnN0IGlzQXRNb3N0ID0gKG4pID0+IG1ha2VWYWxpZGF0b3Ioe1xuICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgaWYgKCEodmFsdWUgPD0gbikpXG4gICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgRXhwZWN0ZWQgdG8gYmUgYXQgbW9zdCAke259IChnb3QgJHt2YWx1ZX0pYCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG59KTtcbmNvbnN0IGlzSW5JbmNsdXNpdmVSYW5nZSA9IChhLCBiKSA9PiBtYWtlVmFsaWRhdG9yKHtcbiAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgIGlmICghKHZhbHVlID49IGEgJiYgdmFsdWUgPD0gYikpXG4gICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgRXhwZWN0ZWQgdG8gYmUgaW4gdGhlIFske2F9OyAke2J9XSByYW5nZSAoZ290ICR7dmFsdWV9KWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxufSk7XG5jb25zdCBpc0luRXhjbHVzaXZlUmFuZ2UgPSAoYSwgYikgPT4gbWFrZVZhbGlkYXRvcih7XG4gICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICBpZiAoISh2YWx1ZSA+PSBhICYmIHZhbHVlIDwgYikpXG4gICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgRXhwZWN0ZWQgdG8gYmUgaW4gdGhlIFske2F9OyAke2J9WyByYW5nZSAoZ290ICR7dmFsdWV9KWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxufSk7XG5jb25zdCBpc0ludGVnZXIgPSAoeyB1bnNhZmUgPSBmYWxzZSwgfSA9IHt9KSA9PiBtYWtlVmFsaWRhdG9yKHtcbiAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gTWF0aC5yb3VuZCh2YWx1ZSkpXG4gICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgRXhwZWN0ZWQgdG8gYmUgYW4gaW50ZWdlciAoZ290ICR7dmFsdWV9KWApO1xuICAgICAgICBpZiAoIU51bWJlci5pc1NhZmVJbnRlZ2VyKHZhbHVlKSlcbiAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBiZSBhIHNhZmUgaW50ZWdlciAoZ290ICR7dmFsdWV9KWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxufSk7XG5jb25zdCBtYXRjaGVzUmVnRXhwID0gKHJlZ0V4cCkgPT4gbWFrZVZhbGlkYXRvcih7XG4gICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICBpZiAoIXJlZ0V4cC50ZXN0KHZhbHVlKSlcbiAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBtYXRjaCB0aGUgcGF0dGVybiAke3JlZ0V4cC50b1N0cmluZygpfSAoZ290ICR7Z2V0UHJpbnRhYmxlKHZhbHVlKX0pYCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG59KTtcbmNvbnN0IGlzTG93ZXJDYXNlID0gKCkgPT4gbWFrZVZhbGlkYXRvcih7XG4gICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUgIT09IHZhbHVlLnRvTG93ZXJDYXNlKCkpXG4gICAgICAgICAgICByZXR1cm4gcHVzaEVycm9yKHN0YXRlLCBgRXhwZWN0ZWQgdG8gYmUgYWxsLWxvd2VyY2FzZSAoZ290ICR7dmFsdWV9KWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxufSk7XG5jb25zdCBpc1VwcGVyQ2FzZSA9ICgpID0+IG1ha2VWYWxpZGF0b3Ioe1xuICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB2YWx1ZS50b1VwcGVyQ2FzZSgpKVxuICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIHRvIGJlIGFsbC11cHBlcmNhc2UgKGdvdCAke3ZhbHVlfSlgKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbn0pO1xuY29uc3QgaXNVVUlENCA9ICgpID0+IG1ha2VWYWxpZGF0b3Ioe1xuICAgIHRlc3Q6ICh2YWx1ZSwgc3RhdGUpID0+IHtcbiAgICAgICAgaWYgKCF1dWlkNFJlZ0V4cC50ZXN0KHZhbHVlKSlcbiAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBiZSBhIHZhbGlkIFVVSUQgdjQgKGdvdCAke2dldFByaW50YWJsZSh2YWx1ZSl9KWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxufSk7XG5jb25zdCBpc0lTTzg2MDEgPSAoKSA9PiBtYWtlVmFsaWRhdG9yKHtcbiAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgIGlmICghaXNvODYwMVJlZ0V4cC50ZXN0KHZhbHVlKSlcbiAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBFeHBlY3RlZCB0byBiZSBhIHZhbGlkIElTTyA4NjAxIGRhdGUgc3RyaW5nIChnb3QgJHtnZXRQcmludGFibGUodmFsdWUpfSlgKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG59KTtcbmNvbnN0IGlzSGV4Q29sb3IgPSAoeyBhbHBoYSA9IGZhbHNlLCB9KSA9PiBtYWtlVmFsaWRhdG9yKHtcbiAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGFscGhhXG4gICAgICAgICAgICA/IGNvbG9yU3RyaW5nUmVnRXhwLnRlc3QodmFsdWUpXG4gICAgICAgICAgICA6IGNvbG9yU3RyaW5nQWxwaGFSZWdFeHAudGVzdCh2YWx1ZSk7XG4gICAgICAgIGlmICghcmVzKVxuICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIHRvIGJlIGEgdmFsaWQgaGV4YWRlY2ltYWwgY29sb3Igc3RyaW5nIChnb3QgJHtnZXRQcmludGFibGUodmFsdWUpfSlgKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbn0pO1xuY29uc3QgaXNCYXNlNjQgPSAoKSA9PiBtYWtlVmFsaWRhdG9yKHtcbiAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgIGlmICghYmFzZTY0UmVnRXhwLnRlc3QodmFsdWUpKVxuICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIHRvIGJlIGEgdmFsaWQgYmFzZSA2NCBzdHJpbmcgKGdvdCAke2dldFByaW50YWJsZSh2YWx1ZSl9KWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxufSk7XG5jb25zdCBpc0pTT04gPSAoc3BlYyA9IGlzVW5rbm93bigpKSA9PiBtYWtlVmFsaWRhdG9yKHtcbiAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgIGxldCBkYXRhO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChfYSkge1xuICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYEV4cGVjdGVkIHRvIGJlIGEgdmFsaWQgSlNPTiBzdHJpbmcgKGdvdCAke2dldFByaW50YWJsZSh2YWx1ZSl9KWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjKGRhdGEsIHN0YXRlKTtcbiAgICB9LFxufSk7XG5jb25zdCBoYXNSZXF1aXJlZEtleXMgPSAocmVxdWlyZWRLZXlzKSA9PiB7XG4gICAgY29uc3QgcmVxdWlyZWRTZXQgPSBuZXcgU2V0KHJlcXVpcmVkS2V5cyk7XG4gICAgcmV0dXJuIG1ha2VWYWxpZGF0b3Ioe1xuICAgICAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBrZXlzID0gbmV3IFNldChPYmplY3Qua2V5cyh2YWx1ZSkpO1xuICAgICAgICAgICAgY29uc3QgcHJvYmxlbXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIHJlcXVpcmVkU2V0KVxuICAgICAgICAgICAgICAgIGlmICgha2V5cy5oYXMoa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgcHJvYmxlbXMucHVzaChrZXkpO1xuICAgICAgICAgICAgaWYgKHByb2JsZW1zLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYE1pc3NpbmcgcmVxdWlyZWQgJHtwbHVyYWwocHJvYmxlbXMubGVuZ3RoLCBgcHJvcGVydHlgLCBgcHJvcGVydGllc2ApfSAke3Byb2JsZW1zLm1hcChuYW1lID0+IGBcIiR7bmFtZX1cImApLmpvaW4oYCwgYCl9YCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn07XG5jb25zdCBoYXNGb3JiaWRkZW5LZXlzID0gKGZvcmJpZGRlbktleXMpID0+IHtcbiAgICBjb25zdCBmb3JiaWRkZW5TZXQgPSBuZXcgU2V0KGZvcmJpZGRlbktleXMpO1xuICAgIHJldHVybiBtYWtlVmFsaWRhdG9yKHtcbiAgICAgICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5cyA9IG5ldyBTZXQoT2JqZWN0LmtleXModmFsdWUpKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2JsZW1zID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBmb3JiaWRkZW5TZXQpXG4gICAgICAgICAgICAgICAgaWYgKGtleXMuaGFzKGtleSkpXG4gICAgICAgICAgICAgICAgICAgIHByb2JsZW1zLnB1c2goa2V5KTtcbiAgICAgICAgICAgIGlmIChwcm9ibGVtcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBGb3JiaWRkZW4gJHtwbHVyYWwocHJvYmxlbXMubGVuZ3RoLCBgcHJvcGVydHlgLCBgcHJvcGVydGllc2ApfSAke3Byb2JsZW1zLm1hcChuYW1lID0+IGBcIiR7bmFtZX1cImApLmpvaW4oYCwgYCl9YCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn07XG5jb25zdCBoYXNNdXR1YWxseUV4Y2x1c2l2ZUtleXMgPSAoZXhjbHVzaXZlS2V5cykgPT4ge1xuICAgIGNvbnN0IGV4Y2x1c2l2ZVNldCA9IG5ldyBTZXQoZXhjbHVzaXZlS2V5cyk7XG4gICAgcmV0dXJuIG1ha2VWYWxpZGF0b3Ioe1xuICAgICAgICB0ZXN0OiAodmFsdWUsIHN0YXRlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBrZXlzID0gbmV3IFNldChPYmplY3Qua2V5cyh2YWx1ZSkpO1xuICAgICAgICAgICAgY29uc3QgdXNlZCA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgZXhjbHVzaXZlU2V0KVxuICAgICAgICAgICAgICAgIGlmIChrZXlzLmhhcyhrZXkpKVxuICAgICAgICAgICAgICAgICAgICB1c2VkLnB1c2goa2V5KTtcbiAgICAgICAgICAgIGlmICh1c2VkLmxlbmd0aCA+IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHB1c2hFcnJvcihzdGF0ZSwgYE11dHVhbGx5IGV4Y2x1c2l2ZSBwcm9wZXJ0aWVzICR7dXNlZC5tYXAobmFtZSA9PiBgXCIke25hbWV9XCJgKS5qb2luKGAsIGApfWApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgfSk7XG59O1xudmFyIEtleVJlbGF0aW9uc2hpcDtcbihmdW5jdGlvbiAoS2V5UmVsYXRpb25zaGlwKSB7XG4gICAgS2V5UmVsYXRpb25zaGlwW1wiRm9yYmlkc1wiXSA9IFwiRm9yYmlkc1wiO1xuICAgIEtleVJlbGF0aW9uc2hpcFtcIlJlcXVpcmVzXCJdID0gXCJSZXF1aXJlc1wiO1xufSkoS2V5UmVsYXRpb25zaGlwIHx8IChLZXlSZWxhdGlvbnNoaXAgPSB7fSkpO1xuY29uc3Qga2V5UmVsYXRpb25zaGlwcyA9IHtcbiAgICBbS2V5UmVsYXRpb25zaGlwLkZvcmJpZHNdOiB7XG4gICAgICAgIGV4cGVjdDogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6IGBmb3JiaWRzIHVzaW5nYCxcbiAgICB9LFxuICAgIFtLZXlSZWxhdGlvbnNoaXAuUmVxdWlyZXNdOiB7XG4gICAgICAgIGV4cGVjdDogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogYHJlcXVpcmVzIHVzaW5nYCxcbiAgICB9LFxufTtcbmNvbnN0IGhhc0tleVJlbGF0aW9uc2hpcCA9IChzdWJqZWN0LCByZWxhdGlvbnNoaXAsIG90aGVycywgeyBpZ25vcmUgPSBbXSwgfSA9IHt9KSA9PiB7XG4gICAgY29uc3Qgc2tpcHBlZCA9IG5ldyBTZXQoaWdub3JlKTtcbiAgICBjb25zdCBvdGhlclNldCA9IG5ldyBTZXQob3RoZXJzKTtcbiAgICBjb25zdCBzcGVjID0ga2V5UmVsYXRpb25zaGlwc1tyZWxhdGlvbnNoaXBdO1xuICAgIHJldHVybiBtYWtlVmFsaWRhdG9yKHtcbiAgICAgICAgdGVzdDogKHZhbHVlLCBzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5cyA9IG5ldyBTZXQoT2JqZWN0LmtleXModmFsdWUpKTtcbiAgICAgICAgICAgIGlmICgha2V5cy5oYXMoc3ViamVjdCkgfHwgc2tpcHBlZC5oYXModmFsdWVbc3ViamVjdF0pKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgY29uc3QgcHJvYmxlbXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIG90aGVyU2V0KVxuICAgICAgICAgICAgICAgIGlmICgoa2V5cy5oYXMoa2V5KSAmJiAhc2tpcHBlZC5oYXModmFsdWVba2V5XSkpICE9PSBzcGVjLmV4cGVjdClcbiAgICAgICAgICAgICAgICAgICAgcHJvYmxlbXMucHVzaChrZXkpO1xuICAgICAgICAgICAgaWYgKHByb2JsZW1zLmxlbmd0aCA+PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoRXJyb3Ioc3RhdGUsIGBQcm9wZXJ0eSBcIiR7c3ViamVjdH1cIiAke3NwZWMubWVzc2FnZX0gJHtwbHVyYWwocHJvYmxlbXMubGVuZ3RoLCBgcHJvcGVydHlgLCBgcHJvcGVydGllc2ApfSAke3Byb2JsZW1zLm1hcChuYW1lID0+IGBcIiR7bmFtZX1cImApLmpvaW4oYCwgYCl9YCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn07XG5cbmV4cG9ydCB7IEtleVJlbGF0aW9uc2hpcCwgYXBwbHlDYXNjYWRlLCBiYXNlNjRSZWdFeHAsIGNvbG9yU3RyaW5nQWxwaGFSZWdFeHAsIGNvbG9yU3RyaW5nUmVnRXhwLCBjb21wdXRlS2V5LCBnZXRQcmludGFibGUsIGhhc0V4YWN0TGVuZ3RoLCBoYXNGb3JiaWRkZW5LZXlzLCBoYXNLZXlSZWxhdGlvbnNoaXAsIGhhc01heExlbmd0aCwgaGFzTWluTGVuZ3RoLCBoYXNNdXR1YWxseUV4Y2x1c2l2ZUtleXMsIGhhc1JlcXVpcmVkS2V5cywgaGFzVW5pcXVlSXRlbXMsIGlzQXJyYXksIGlzQXRMZWFzdCwgaXNBdE1vc3QsIGlzQmFzZTY0LCBpc0Jvb2xlYW4sIGlzRGF0ZSwgaXNEaWN0LCBpc0VudW0sIGlzSGV4Q29sb3IsIGlzSVNPODYwMSwgaXNJbkV4Y2x1c2l2ZVJhbmdlLCBpc0luSW5jbHVzaXZlUmFuZ2UsIGlzSW5zdGFuY2VPZiwgaXNJbnRlZ2VyLCBpc0pTT04sIGlzTGl0ZXJhbCwgaXNMb3dlckNhc2UsIGlzTmVnYXRpdmUsIGlzTnVsbGFibGUsIGlzTnVtYmVyLCBpc09iamVjdCwgaXNPbmVPZiwgaXNPcHRpb25hbCwgaXNQb3NpdGl2ZSwgaXNTdHJpbmcsIGlzVHVwbGUsIGlzVVVJRDQsIGlzVW5rbm93biwgaXNVcHBlckNhc2UsIGlzbzg2MDFSZWdFeHAsIG1ha2VDb2VyY2lvbkZuLCBtYWtlU2V0dGVyLCBtYWtlVHJhaXQsIG1ha2VWYWxpZGF0b3IsIG1hdGNoZXNSZWdFeHAsIHBsdXJhbCwgcHVzaEVycm9yLCBzaW1wbGVLZXlSZWdFeHAsIHV1aWQ0UmVnRXhwIH07XG4iLCAiLyoqXG4gKiBDb250YWlucyB0aGUgZXh0ZW5zaW9uIGluY2x1ZGVzLlxuICogVGhpcyBpcyBhdXRvLWdlbmVyYXRlZC5cbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYXJ0aHVybzU1NS9HRGV2ZWxvcC90cmVlL2dkbW9kLWdlbmVyYXRlLWluY2x1ZGVzLWxpc3QuXG4gKi9cbmNvbnN0IEVYVEVOU0lPTlM6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiA9IHtcbiAgUGxhdGZvcm1CZWhhdmlvcjogW1xuICAgIFwiRXh0ZW5zaW9ucy9QbGF0Zm9ybUJlaGF2aW9yL3BsYXRmb3JtcnVudGltZWJlaGF2aW9yLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL1BsYXRmb3JtQmVoYXZpb3IvcGxhdGZvcm1lcm9iamVjdHJ1bnRpbWViZWhhdmlvci5qc1wiLFxuICAgIFwiUGxhdGZvcm1CZWhhdmlvci9QbGF0Zm9ybWVyT2JqZWN0UnVudGltZUJlaGF2aW9yLmhcIixcbiAgXSxcbiAgRGVzdHJveU91dHNpZGVCZWhhdmlvcjogW1xuICAgIFwiRXh0ZW5zaW9ucy9EZXN0cm95T3V0c2lkZUJlaGF2aW9yL2Rlc3Ryb3lvdXRzaWRlcnVudGltZWJlaGF2aW9yLmpzXCIsXG4gIF0sXG4gIFRpbGVkU3ByaXRlT2JqZWN0OiBbXG4gICAgXCJFeHRlbnNpb25zL1RpbGVkU3ByaXRlT2JqZWN0L3RpbGVkc3ByaXRlcnVudGltZW9iamVjdC5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9UaWxlZFNwcml0ZU9iamVjdC90aWxlZHNwcml0ZXJ1bnRpbWVvYmplY3QtcGl4aS1yZW5kZXJlci5qc1wiLFxuICBdLFxuICBEcmFnZ2FibGVCZWhhdmlvcjogW1xuICAgIFwiRXh0ZW5zaW9ucy9EcmFnZ2FibGVCZWhhdmlvci9kcmFnZ2FibGVydW50aW1lYmVoYXZpb3IuanNcIixcbiAgXSxcbiAgVG9wRG93bk1vdmVtZW50QmVoYXZpb3I6IFtcbiAgICBcIkV4dGVuc2lvbnMvVG9wRG93bk1vdmVtZW50QmVoYXZpb3IvdG9wZG93bm1vdmVtZW50cnVudGltZWJlaGF2aW9yLmpzXCIsXG4gIF0sXG4gIFRleHRPYmplY3Q6IFtcbiAgICBcIkV4dGVuc2lvbnMvVGV4dE9iamVjdC90ZXh0cnVudGltZW9iamVjdC5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9UZXh0T2JqZWN0L3RleHRydW50aW1lb2JqZWN0LXBpeGktcmVuZGVyZXIuanNcIixcbiAgXSxcbiAgUGFydGljbGVTeXN0ZW06IFtcbiAgICBcIkV4dGVuc2lvbnMvUGFydGljbGVTeXN0ZW0vcGFydGljbGVlbWl0dGVyb2JqZWN0LmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL1BhcnRpY2xlU3lzdGVtL3BhcnRpY2xlZW1pdHRlcm9iamVjdC1waXhpLXJlbmRlcmVyLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL1BhcnRpY2xlU3lzdGVtL3BpeGktcGFydGljbGVzLXBpeGktcmVuZGVyZXIubWluLmpzXCIsXG4gICAgXCJQYXJ0aWNsZVN5c3RlbS9QYXJ0aWNsZUVtaXR0ZXJPYmplY3QuaFwiLFxuICBdLFxuICBQYW5lbFNwcml0ZU9iamVjdDogW1xuICAgIFwiRXh0ZW5zaW9ucy9QYW5lbFNwcml0ZU9iamVjdC9wYW5lbHNwcml0ZXJ1bnRpbWVvYmplY3QuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvUGFuZWxTcHJpdGVPYmplY3QvcGFuZWxzcHJpdGVydW50aW1lb2JqZWN0LXBpeGktcmVuZGVyZXIuanNcIixcbiAgICBcIlBhbmVsU3ByaXRlT2JqZWN0L1BhbmVsU3ByaXRlT2JqZWN0LmhcIixcbiAgICBcIkV4dGVuc2lvbnMvVGlsZWRTcHJpdGVPYmplY3QvcGFuZWxzcHJpdGVydW50aW1lb2JqZWN0LmpzXCIsXG4gIF0sXG4gIEFuY2hvckJlaGF2aW9yOiBbXCJFeHRlbnNpb25zL0FuY2hvckJlaGF2aW9yL2FuY2hvcnJ1bnRpbWViZWhhdmlvci5qc1wiXSxcbiAgUHJpbWl0aXZlRHJhd2luZzogW1xuICAgIFwiRXh0ZW5zaW9ucy9QcmltaXRpdmVEcmF3aW5nL3NoYXBlcGFpbnRlcnJ1bnRpbWVvYmplY3QuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvUHJpbWl0aXZlRHJhd2luZy9zaGFwZXBhaW50ZXJydW50aW1lb2JqZWN0LXBpeGktcmVuZGVyZXIuanNcIixcbiAgICBcIlByaW1pdGl2ZURyYXdpbmcvU2hhcGVQYWludGVyT2JqZWN0LmhcIixcbiAgXSxcbiAgVGV4dEVudHJ5T2JqZWN0OiBbXG4gICAgXCJFeHRlbnNpb25zL1RleHRFbnRyeU9iamVjdC90ZXh0ZW50cnlydW50aW1lb2JqZWN0LmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL1RleHRFbnRyeU9iamVjdC90ZXh0ZW50cnlydW50aW1lb2JqZWN0LXBpeGktcmVuZGVyZXIuanNcIixcbiAgICBcIlRleHRPYmplY3QvVGV4dE9iamVjdC5oXCIsXG4gIF0sXG4gIEludmVudG9yeTogW1xuICAgIFwiRXh0ZW5zaW9ucy9JbnZlbnRvcnkvaW52ZW50b3J5LmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0ludmVudG9yeS9pbnZlbnRvcnl0b29scy5qc1wiLFxuICBdLFxuICBMaW5rZWRPYmplY3RzOiBbXCJFeHRlbnNpb25zL0xpbmtlZE9iamVjdHMvbGlua2Vkb2JqZWN0cy5qc1wiXSxcbiAgU3lzdGVtSW5mbzogW1wiRXh0ZW5zaW9ucy9TeXN0ZW1JbmZvL3N5c3RlbWluZm90b29scy5qc1wiXSxcbiAgU2hvcGlmeTogW1xuICAgIFwiRXh0ZW5zaW9ucy9TaG9waWZ5L3Nob3BpZnktYnV5LnVtZC5wb2x5ZmlsbGVkLm1pbi5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9TaG9waWZ5L3Nob3BpZnl0b29scy5qc1wiLFxuICBdLFxuICBQYXRoZmluZGluZ0JlaGF2aW9yOiBbXG4gICAgXCJFeHRlbnNpb25zL1BhdGhmaW5kaW5nQmVoYXZpb3IvcGF0aGZpbmRpbmdydW50aW1lYmVoYXZpb3IuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvUGF0aGZpbmRpbmdCZWhhdmlvci9wYXRoZmluZGluZ29ic3RhY2xlcnVudGltZWJlaGF2aW9yLmpzXCIsXG4gICAgXCJQYXRoZmluZGluZ0JlaGF2aW9yL1BhdGhmaW5kaW5nT2JzdGFjbGVSdW50aW1lQmVoYXZpb3IuaFwiLFxuICBdLFxuICBQaHlzaWNzQmVoYXZpb3I6IFtcbiAgICBcIkV4dGVuc2lvbnMvUGh5c2ljc0JlaGF2aW9yL2JveDJkanMvYm94MmQuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvUGh5c2ljc0JlaGF2aW9yL3BoeXNpY3NydW50aW1lYmVoYXZpb3IuanNcIixcbiAgXSxcbiAgQWRNb2I6IFtcIkV4dGVuc2lvbnMvQWRNb2IvYWRtb2J0b29scy5qc1wiXSxcbiAgQWR2YW5jZWRXaW5kb3c6IFtcIkV4dGVuc2lvbnMvQWR2YW5jZWRXaW5kb3cvZWxlY3Ryb24tYWR2YW5jZWR3aW5kb3d0b29scy5qc1wiXSxcbiAgQkJUZXh0OiBbXG4gICAgXCJFeHRlbnNpb25zL0JCVGV4dC9iYnRleHRydW50aW1lb2JqZWN0LmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0JCVGV4dC9iYnRleHRydW50aW1lb2JqZWN0LXBpeGktcmVuZGVyZXIuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvQkJUZXh0L3BpeGktbXVsdGlzdHlsZS10ZXh0L2Rpc3QvcGl4aS1tdWx0aXN0eWxlLXRleHQudW1kLmpzXCIsXG4gIF0sXG4gIERlYnVnZ2VyVG9vbHM6IFtcIkV4dGVuc2lvbnMvRGVidWdnZXJUb29scy9kZWJ1Z2dlcnRvb2xzLmpzXCJdLFxuICBEZXZpY2VTZW5zb3JzOiBbXCJFeHRlbnNpb25zL0RldmljZVNlbnNvcnMvZGV2aWNlc2Vuc29ydG9vbHMuanNcIl0sXG4gIERldmljZVZpYnJhdGlvbjogW1wiRXh0ZW5zaW9ucy9EZXZpY2VWaWJyYXRpb24vZGV2aWNldmlicmF0aW9udG9vbHMuanNcIl0sXG4gIERpYWxvZ3VlVHJlZTogW1xuICAgIFwiRXh0ZW5zaW9ucy9EaWFsb2d1ZVRyZWUvZGlhbG9ndWV0b29scy5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9EaWFsb2d1ZVRyZWUvYm9uZGFnZS5qcy9kaXN0L2JvbmRhZ2UubWluLmpzXCIsXG4gIF0sXG4gIEVmZmVjdHM6IFtcbiAgICBcIkV4dGVuc2lvbnMvRWZmZWN0cy9waXhpLWZpbHRlcnMvZmlsdGVyLWFkanVzdG1lbnQuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRWZmZWN0cy9hZGp1c3RtZW50LXBpeGktZmlsdGVyLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0VmZmVjdHMvcGl4aS1maWx0ZXJzL2ZpbHRlci1rYXdhc2UtYmx1ci5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL3BpeGktZmlsdGVycy9maWx0ZXItYWR2YW5jZWQtYmxvb20uanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRWZmZWN0cy9hZHZhbmNlZC1ibG9vbS1waXhpLWZpbHRlci5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL3BpeGktZmlsdGVycy9maWx0ZXItYXNjaWkuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRWZmZWN0cy9hc2NpaS1waXhpLWZpbHRlci5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL3BpeGktZmlsdGVycy9maWx0ZXItYmV2ZWwuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRWZmZWN0cy9iZXZlbC1waXhpLWZpbHRlci5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL2JsYWNrLWFuZC13aGl0ZS1waXhpLWZpbHRlci5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL2JsZW5kaW5nLW1vZGUtcGl4aS1maWx0ZXIuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRWZmZWN0cy9ibHVyLXBpeGktZmlsdGVyLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0VmZmVjdHMvYnJpZ2h0bmVzcy1waXhpLWZpbHRlci5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL3BpeGktZmlsdGVycy9maWx0ZXItYnVsZ2UtcGluY2guanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRWZmZWN0cy9idWxnZS1waW5jaC1waXhpLWZpbHRlci5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL3BpeGktZmlsdGVycy9maWx0ZXItY3J0LmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0VmZmVjdHMvY3J0LXBpeGktZmlsdGVyLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0VmZmVjdHMvY29sb3ItbWFwLXBpeGktZmlsdGVyLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0VmZmVjdHMvcGl4aS1maWx0ZXJzL2ZpbHRlci1jb2xvci1tYXAuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRWZmZWN0cy9waXhpLWZpbHRlcnMvZmlsdGVyLWNvbG9yLXJlcGxhY2UuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRWZmZWN0cy9jb2xvci1yZXBsYWNlLXBpeGktZmlsdGVyLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0VmZmVjdHMvZGlzcGxhY2VtZW50LXBpeGktZmlsdGVyLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0VmZmVjdHMvcGl4aS1maWx0ZXJzL2ZpbHRlci1kb3QuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRWZmZWN0cy9kb3QtcGl4aS1maWx0ZXIuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRWZmZWN0cy9waXhpLWZpbHRlcnMvZmlsdGVyLWRyb3Atc2hhZG93LmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0VmZmVjdHMvZHJvcC1zaGFkb3ctcGl4aS1maWx0ZXIuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRWZmZWN0cy9waXhpLWZpbHRlcnMvZmlsdGVyLWdsaXRjaC5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL2dsaXRjaC1waXhpLWZpbHRlci5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL3BpeGktZmlsdGVycy9maWx0ZXItZ2xvdy5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL2dsb3ctcGl4aS1maWx0ZXIuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRWZmZWN0cy9waXhpLWZpbHRlcnMvZmlsdGVyLWdvZHJheS5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL2dvZHJheS1waXhpLWZpbHRlci5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL2thd2FzZS1ibHVyLXBpeGktZmlsdGVyLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0VmZmVjdHMvbGlnaHQtbmlnaHQtcGl4aS1maWx0ZXIuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRWZmZWN0cy9uaWdodC1waXhpLWZpbHRlci5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL25vaXNlLXBpeGktZmlsdGVyLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0VmZmVjdHMvcGl4aS1maWx0ZXJzL2ZpbHRlci1vbGQtZmlsbS5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL29sZC1maWxtLXBpeGktZmlsdGVyLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0VmZmVjdHMvcGl4aS1maWx0ZXJzL2ZpbHRlci1vdXRsaW5lLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0VmZmVjdHMvb3V0bGluZS1waXhpLWZpbHRlci5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL3BpeGktZmlsdGVycy9maWx0ZXItcGl4ZWxhdGUuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRWZmZWN0cy9waXhlbGF0ZS1waXhpLWZpbHRlci5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL3BpeGktZmlsdGVycy9maWx0ZXItcmdiLXNwbGl0LmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0VmZmVjdHMvcmdiLXNwbGl0LXBpeGktZmlsdGVyLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0VmZmVjdHMvcGl4aS1maWx0ZXJzL2ZpbHRlci1yYWRpYWwtYmx1ci5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL3JhZGlhbC1ibHVyLXBpeGktZmlsdGVyLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0VmZmVjdHMvcGl4aS1maWx0ZXJzL2ZpbHRlci1yZWZsZWN0aW9uLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0VmZmVjdHMvcmVmbGVjdGlvbi1waXhpLWZpbHRlci5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL3NlcGlhLXBpeGktZmlsdGVyLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0VmZmVjdHMvcGl4aS1maWx0ZXJzL2ZpbHRlci10aWx0LXNoaWZ0LmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0VmZmVjdHMvdGlsdC1zaGlmdC1waXhpLWZpbHRlci5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL3BpeGktZmlsdGVycy9maWx0ZXItdHdpc3QuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRWZmZWN0cy90d2lzdC1waXhpLWZpbHRlci5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FZmZlY3RzL3BpeGktZmlsdGVycy9maWx0ZXItem9vbS1ibHVyLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0VmZmVjdHMvem9vbS1ibHVyLXBpeGktZmlsdGVyLmpzXCIsXG4gIF0sXG4gIE15RHVtbXlFeHRlbnNpb246IFtcbiAgICBcIkV4dGVuc2lvbnMvRXhhbXBsZUpzRXh0ZW5zaW9uL2V4YW1wbGVqc2V4dGVuc2lvbnRvb2xzLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0V4YW1wbGVKc0V4dGVuc2lvbi9kdW1teWVmZmVjdC5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FeGFtcGxlSnNFeHRlbnNpb24vZHVtbXlydW50aW1lb2JqZWN0LmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0V4YW1wbGVKc0V4dGVuc2lvbi9kdW1teXJ1bnRpbWVvYmplY3QtcGl4aS1yZW5kZXJlci5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9FeGFtcGxlSnNFeHRlbnNpb24vZHVtbXlydW50aW1lYmVoYXZpb3IuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRXhhbXBsZUpzRXh0ZW5zaW9uL2R1bW15d2l0aHNoYXJlZGRhdGFydW50aW1lYmVoYXZpb3IuanNcIixcbiAgXSxcbiAgRmFjZWJvb2tJbnN0YW50R2FtZXM6IFtcbiAgICBcIkV4dGVuc2lvbnMvRmFjZWJvb2tJbnN0YW50R2FtZXMvZmFjZWJvb2tpbnN0YW50Z2FtZXN0b29scy5qc1wiLFxuICBdLFxuICBGaWxlU3lzdGVtOiBbXCJFeHRlbnNpb25zL0ZpbGVTeXN0ZW0vZmlsZXN5c3RlbXRvb2xzLmpzXCJdLFxuICBGaXJlYmFzZTogW1xuICAgIFwiRXh0ZW5zaW9ucy9GaXJlYmFzZS9CX2ZpcmViYXNlanMvQV9maXJlYmFzZS1iYXNlLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0ZpcmViYXNlL0JfZmlyZWJhc2Vqcy9CX2ZpcmViYXNlLXBlcmZvcm1hbmNlLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0ZpcmViYXNlL0NfZmlyZWJhc2V0b29scy9DX2ZpcmViYXNldG9vbHMuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRmlyZWJhc2UvQ19maXJlYmFzZXRvb2xzL0RfcGVyZm9ybWFuY2V0b29scy5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9GaXJlYmFzZS9CX2ZpcmViYXNlanMvQl9maXJlYmFzZS1hbmFseXRpY3MuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRmlyZWJhc2UvQ19maXJlYmFzZXRvb2xzL0RfYW5hbHl0aWNzdG9vbHMuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRmlyZWJhc2UvQl9maXJlYmFzZWpzL0JfZmlyZWJhc2UtYXV0aC5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9GaXJlYmFzZS9DX2ZpcmViYXNldG9vbHMvRF9hdXRodG9vbHMuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRmlyZWJhc2UvQl9maXJlYmFzZWpzL0JfZmlyZWJhc2UtZnVuY3Rpb25zLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0ZpcmViYXNlL0NfZmlyZWJhc2V0b29scy9EX2Z1bmN0aW9uc3Rvb2xzLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0ZpcmViYXNlL0JfZmlyZWJhc2Vqcy9CX2ZpcmViYXNlLWRhdGFiYXNlLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0ZpcmViYXNlL0NfZmlyZWJhc2V0b29scy9EX2RhdGFiYXNldG9vbHMuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRmlyZWJhc2UvQl9maXJlYmFzZWpzL0JfZmlyZWJhc2UtZmlyZXN0b3JlLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0ZpcmViYXNlL0NfZmlyZWJhc2V0b29scy9EX2Nsb3VkZmlyZXN0b3JldG9vbHMuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRmlyZWJhc2UvQl9maXJlYmFzZWpzL0JfZmlyZWJhc2UtcmVtb3RlLWNvbmZpZy5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9GaXJlYmFzZS9DX2ZpcmViYXNldG9vbHMvRF9yZW1vdGVjb25maWd0b29scy5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9GaXJlYmFzZS9BX3V0aWxzL0FfVUlEQXJyYXkuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvRmlyZWJhc2UvQl9maXJlYmFzZWpzL0JfZmlyZWJhc2Utc3RvcmFnZS5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9GaXJlYmFzZS9DX2ZpcmViYXNldG9vbHMvRF9zdG9yYWdldG9vbHMuanNcIixcbiAgXSxcbiAgTGlnaHRpbmc6IFtcbiAgICBcIkV4dGVuc2lvbnMvTGlnaHRpbmcvbGlnaHRydW50aW1lb2JqZWN0LmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0xpZ2h0aW5nL2xpZ2h0cnVudGltZW9iamVjdC1waXhpLXJlbmRlcmVyLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL0xpZ2h0aW5nL2xpZ2h0b2JzdGFjbGVydW50aW1lYmVoYXZpb3IuanNcIixcbiAgXSxcbiAgUDJQOiBbXCJFeHRlbnNpb25zL1AyUC9BX3BlZXIuanNcIiwgXCJFeHRlbnNpb25zL1AyUC9CX3AycHRvb2xzLmpzXCJdLFxuICBQaHlzaWNzMjogW1xuICAgIFwiRXh0ZW5zaW9ucy9QaHlzaWNzMkJlaGF2aW9yL3BoeXNpY3MydG9vbHMuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvUGh5c2ljczJCZWhhdmlvci9waHlzaWNzMnJ1bnRpbWViZWhhdmlvci5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9QaHlzaWNzMkJlaGF2aW9yL2JveDJkLmpzXCIsXG4gIF0sXG4gIFNjcmVlbnNob3Q6IFtcIkV4dGVuc2lvbnMvU2NyZWVuc2hvdC9zY3JlZW5zaG90dG9vbHMuanNcIl0sXG4gIFNwYXRpYWxTb3VuZDogW1xuICAgIFwiRXh0ZW5zaW9ucy9TcGF0aWFsU291bmQvaG93bGVyLnNwYXRpYWwubWluLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL1NwYXRpYWxTb3VuZC9zcGF0aWFsc291bmR0b29scy5qc1wiLFxuICBdLFxuICBUaWxlTWFwOiBbXG4gICAgXCJFeHRlbnNpb25zL1RpbGVNYXAvdGlsZW1hcHJ1bnRpbWVvYmplY3QuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvVGlsZU1hcC90aWxlbWFwcnVudGltZW9iamVjdC1waXhpLXJlbmRlcmVyLmpzXCIsXG4gICAgXCJFeHRlbnNpb25zL1RpbGVNYXAvcGl4aS10aWxlbWFwL2Rpc3QvcGl4aS10aWxlbWFwLnVtZC5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9UaWxlTWFwL3Bha28vZGlzdC9wYWtvLm1pbi5qc1wiLFxuICAgIFwiRXh0ZW5zaW9ucy9UaWxlTWFwL3BpeGktdGlsZW1hcC1oZWxwZXIuanNcIixcbiAgXSxcbiAgVHdlZW46IFtcbiAgICBcIkV4dGVuc2lvbnMvVHdlZW5CZWhhdmlvci9zaGlmdHkuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvVHdlZW5CZWhhdmlvci90d2VlbnJ1bnRpbWViZWhhdmlvci5qc1wiLFxuICBdLFxuICBWaWRlbzogW1xuICAgIFwiRXh0ZW5zaW9ucy9WaWRlby92aWRlb3J1bnRpbWVvYmplY3QuanNcIixcbiAgICBcIkV4dGVuc2lvbnMvVmlkZW8vdmlkZW9ydW50aW1lb2JqZWN0LXBpeGktcmVuZGVyZXIuanNcIixcbiAgXSxcbn07XG5cbmNvbnN0IENETiA9XG4gIFwiaHR0cHM6Ly9yZXNvdXJjZXMuZ2RldmVsb3AtYXBwLmNvbS9HREpTLTUuMC4wLXt7dmVyc2lvbn19L1J1bnRpbWUvXCI7XG5cbi8qKlxuICogQSBsaXN0IG9mIGFscmVhZHkgbG9hZGVkIGV4dGVuc2lvbiAodG8gbm90IHJlbG9hZCBhbHJlYWR5IGxvYWRlZCBleHRlbnNpb25zKS5cbiAqL1xuY29uc3QgbG9hZGVkRXh0ZW5zaW9uczogU2V0PHN0cmluZz4gPSBuZXcgU2V0KCk7XG5cbi8qKlxuICogTG9hZHMgYSBHRGV2ZWxvcCBleHRlbnNpb24uXG4gKiBAcGFyYW0gZXh0ZW5zaW9uIC0gVGhlIGV4dGVuc2lvbiB0byBsb2FkLlxuICogQHBhcmFtIFt2ZXJzaW9uXSAtIFRoZSB2ZXJzaW9uIG9mIEdEZXZlbG9wIG9mIHRoaXMgZXh0ZW5zaW9uLiBEZWZhdWx0OiBgYmV0YTEwNWAuXG4gKi9cbmV4cG9ydCBjb25zdCBsb2FkRXh0ZW5zaW9uID0gZnVuY3Rpb24gKFxuICBleHRlbnNpb246IGtleW9mIHR5cGVvZiBFWFRFTlNJT05TLFxuICB2ZXJzaW9uOiBzdHJpbmcgPSBcImJldGExMDVcIlxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmIChsb2FkZWRFeHRlbnNpb25zLmhhcyhleHRlbnNpb24pKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIGlmIChFWFRFTlNJT05TW2V4dGVuc2lvbl0gPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJFeHRlbnNpb24gbm90IGZvdW5kIVwiKTtcblxuICBsb2FkZWRFeHRlbnNpb25zLmFkZChleHRlbnNpb24pO1xuICBjb25zdCBhbGxGaWxlcyA9IEVYVEVOU0lPTlNbZXh0ZW5zaW9uXS5tYXAoXG4gICAgKGxpbmspID0+XG4gICAgICBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICBzY3JpcHQuc3JjID0gQ0ROLnJlcGxhY2UoXCJ7e3ZlcnNpb259fVwiLCB2ZXJzaW9uKSArIGxpbms7XG4gICAgICAgIHNjcmlwdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JpcHQpOyAvLyBDbGVhbnVwIGRvY3VtZW50IGFmdGVyIGxvYWRpbmcgZmlsZS5cbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgIH0pXG4gICk7XG5cbiAgcmV0dXJuIFByb21pc2UuYWxsKGFsbEZpbGVzKS50aGVuKCk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjYyQkFBQSxtQkFLQSxHQUFPLFFBQVUsRUFRakIsV0FBaUIsRUFBSyxDQUNwQixHQUFJLEVBQUssTUFBTyxJQUFNLEdBV3hCLFlBQWUsRUFBSyxDQUNsQixPQUFTLEtBQU8sR0FBUSxVQUN0QixFQUFJLEdBQU8sRUFBUSxVQUFVLEdBRS9CLE1BQU8sR0FZVCxFQUFRLFVBQVUsR0FDbEIsRUFBUSxVQUFVLGlCQUFtQixTQUFTLEVBQU8sRUFBRyxDQUN0RCxZQUFLLFdBQWEsS0FBSyxZQUFjLEdBQ3BDLE1BQUssV0FBVyxHQUFTLEtBQUssV0FBVyxJQUFVLElBQ2pE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QSw2Q0FDQSxvREFDQSw0Q0FDQSxxREFDQSw2Q0FDQSxzREFDQSw4Q0FDQSx3REFDQSxnREFDQSx1REFDQSwrQ0FDQSwwQ0FDQSx1REFDQSwrQ0FDQSxrREFDQSwwQ0FDQSxzREFDQSwrQ0FFRixpQkFBa0IsQ0FDaEIsMkRBQ0EsK0NBQ0Esc0RBQ0Esb0VBQ0Esd0RBQ0EsdUVBRUYscUJBQXNCLENBQ3BCLGdFQUVGLFdBQVksQ0FBQyw0Q0FDYixTQUFVLENBQ1Isc0RBQ0EsNkRBQ0EseURBQ0EsNERBQ0EsMkRBQ0EsMERBQ0Esc0RBQ0EscURBQ0EsMkRBQ0EsMERBQ0EsMERBQ0EseURBQ0EsMkRBQ0EsK0RBQ0EsK0RBQ0EsNkRBQ0EsNENBQ0EseURBQ0EseURBRUYsU0FBVSxDQUNSLDRDQUNBLDBEQUNBLHVEQUVGLElBQUssQ0FBQywyQkFBNEIsZ0NBQ2xDLFNBQVUsQ0FDUiwrQ0FDQSx5REFDQSx3Q0FFRixXQUFZLENBQUMsNENBQ2IsYUFBYyxDQUNaLGdEQUNBLGdEQUVGLFFBQVMsQ0FDUCw2Q0FDQSwyREFDQSwyREFDQSwyQ0FDQSw2Q0FFRixNQUFPLENBQ0wscUNBQ0Esb0RBRUYsTUFBTyxDQUNMLHlDQUNBLHlEQUlFLEdBQ0oscUVBS0ksR0FBZ0MsR0FBSSxLQU83QixHQUFnQixTQUMzQixFQUNBLEVBQWtCLFVBQ0gsQ0FDZixHQUFJLEdBQWlCLElBQUksR0FBWSxNQUFPLFNBQVEsVUFDcEQsR0FBSSxHQUFXLEtBQWUsT0FDNUIsTUFBTyxTQUFRLE9BQU8sd0JBRXhCLEdBQWlCLElBQUksR0FDckIsR0FBTSxHQUFXLEdBQVcsR0FBVyxJQUNyQyxBQUFDLEdBQ0MsR0FBSSxTQUFjLEFBQUMsR0FBWSxDQUM3QixHQUFNLEdBQVMsU0FBUyxjQUFjLFVBQ3RDLEVBQU8sSUFBTSxHQUFJLFFBQVEsY0FBZSxHQUFXLEVBQ25ELEVBQU8sT0FBUyxVQUFZLENBQzFCLFNBQVMsS0FBSyxZQUFZLEdBQzFCLEtBRUYsU0FBUyxLQUFLLFlBQVksTUFJaEMsTUFBTyxTQUFRLElBQUksR0FBVSxRVnpPL0IsV0FBVyxJQUFNLENBRWYsT0FBTyxlQUFlLE9BQU8sTUFBTyxPQUFRLENBQzFDLElBQUssVUFBcUMsQ0FDeEMsTUFBTyxRQUFPLGNBR2xCLE9BQU8sZUFBZSxPQUFPLE1BQU8sZUFBZ0IsQ0FDbEQsSUFBSyxVQUFzQyxDQUN6QyxNQUFJLE9BQU0sTUFBUSxLQUNULE1BQU0sS0FBSyxZQUFZLGtCQUNwQiIsCiAgIm5hbWVzIjogW10KfQo=

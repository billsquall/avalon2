(function() {
  var h = {},
    mt = {},
    c = {
      id: "e11f12430782bff9553b65f2be26d907",
      dm: ["adm.baidu.com"],
      js: "tongji.baidu.com/hm-web/js/",
      etrk: [],
      icon: '',
      ctrk: false,
      align: -1,
      nv: -1,
      vdur: 1800000,
      age: 31536000000,
      rec: 0,
      rp: [],
      trust: 0,
      vcard: 0,
      qiao: 0,
      lxb: 0,
      conv: 0,
      comm: 0,
      apps: ''
    };
  var p = !0,
    q = null,
    r = !1;
  mt.j = {};
  mt.j.Ha = /msie (\d+\.\d+)/i.test(navigator.userAgent);
  mt.j.cookieEnabled = navigator.cookieEnabled;
  mt.j.javaEnabled = navigator.javaEnabled();
  mt.j.language = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || "";
  mt.j.pa = (window.screen.width || 0) + "x" + (window.screen.height || 0);
  mt.j.colorDepth = window.screen.colorDepth || 0;
  mt.cookie = {};
  mt.cookie.set = function(a, b, e) {
    var d;
    e.D && (d = new Date, d.setTime(d.getTime() + e.D));
    document.cookie = a + "=" + b + (e.domain ? "; domain=" + e.domain : "") + (e.path ? "; path=" + e.path : "") + (d ? "; expires=" + d.toGMTString() : "") + (e.La ? "; secure" : "")
  };
  mt.cookie.get = function(a) {
    return (a = RegExp("(^| )" + a + "=([^;]*)(;|$)").exec(document.cookie)) ? a[2] : q
  };
  mt.q = {};
  mt.q.Ca = function(a) {
    return document.getElementById(a)
  };
  mt.q.Da = function(a, b) {
    for (b = b.toUpperCase();
      (a = a.parentNode) && 1 == a.nodeType;)
      if (a.tagName == b) return a;
    return q
  };
  (mt.q.na = function() {
    function a() {
      if (!a.w) {
        a.w = p;
        for (var b = 0, e = d.length; b < e; b++) d[b]()
      }
    }

    function b() {
      try {
        document.documentElement.doScroll("left")
      } catch (d) {
        setTimeout(b, 1);
        return
      }
      a()
    }
    var e = r,
      d = [],
      g;
    document.addEventListener ? g = function() {
      document.removeEventListener("DOMContentLoaded", g, r);
      a()
    } : document.attachEvent && (g = function() {
      "complete" === document.readyState && (document.detachEvent("onreadystatechange", g), a())
    });
    (function() {
      if (!e)
        if (e = p, "complete" === document.readyState) a.w = p;
        else if (document.addEventListener) document.addEventListener("DOMContentLoaded",
        g, r), window.addEventListener("load", a, r);
      else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", g);
        window.attachEvent("onload", a);
        var d = r;
        try {
          d = window.frameElement == q
        } catch (n) {}
        document.documentElement.doScroll && d && b()
      }
    })();
    return function(b) {
      a.w ? b() : d.push(b)
    }
  }()).w = r;
  mt.event = {};
  mt.event.c = function(a, b, e) {
    a.attachEvent ? a.attachEvent("on" + b, function(b) {
      e.call(a, b)
    }) : a.addEventListener && a.addEventListener(b, e, r)
  };
  mt.event.preventDefault = function(a) {
    a.preventDefault ? a.preventDefault() : a.returnValue = r
  };
  mt.i = {};
  mt.i.parse = function() {
    return (new Function('return (" + source + ")'))()
  };
  mt.i.stringify = function() {
    function a(a) {
      /["\\\x00-\x1f]/.test(a) && (a = a.replace(/["\\\x00-\x1f]/g, function(a) {
        var b = e[a];
        if (b) return b;
        b = a.charCodeAt();
        return "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16)
      }));
      return '"' + a + '"'
    }

    function b(a) {
      return 10 > a ? "0" + a : a
    }
    var e = {
      "\b": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\"
    };
    return function(d) {
      switch (typeof d) {
        case "undefined":
          return "undefined";
        case "number":
          return isFinite(d) ? String(d) : "null";
        case "string":
          return a(d);
        case "boolean":
          return String(d);
        default:
          if (d === q) return "null";
          if (d instanceof Array) {
            var e = ["["],
              m = d.length,
              n, f, l;
            for (f = 0; f < m; f++) switch (l = d[f], typeof l) {
              case "undefined":
              case "function":
              case "unknown":
                break;
              default:
                n && e.push(","), e.push(mt.i.stringify(l)), n = 1
            }
            e.push("]");
            return e.join("")
          }
          if (d instanceof Date) return '"' + d.getFullYear() + "-" + b(d.getMonth() + 1) + "-" + b(d.getDate()) + "T" + b(d.getHours()) + ":" + b(d.getMinutes()) + ":" + b(d.getSeconds()) + '"';
          n = ["{"];
          f = mt.i.stringify;
          for (m in d)
            if (Object.prototype.hasOwnProperty.call(d, m)) switch (l =
              d[m], typeof l) {
              case "undefined":
              case "unknown":
              case "function":
                break;
              default:
                e && n.push(","), e = 1, n.push(f(m) + ":" + f(l))
            }
            n.push("}");
          return n.join("")
      }
    }
  }();
  mt.lang = {};
  mt.lang.e = function(a, b) {
    return "[object " + b + "]" === {}.toString.call(a)
  };
  mt.lang.Ia = function(a) {
    return mt.lang.e(a, "Number") && isFinite(a)
  };
  mt.lang.Ka = function(a) {
    return mt.lang.e(a, "String")
  };
  mt.localStorage = {};
  mt.localStorage.A = function() {
    if (!mt.localStorage.f) try {
      mt.localStorage.f = document.createElement("input"), mt.localStorage.f.type = "hidden", mt.localStorage.f.style.display = "none", mt.localStorage.f.addBehavior("#default#userData"), document.getElementsByTagName("head")[0].appendChild(mt.localStorage.f)
    } catch (a) {
      return r
    }
    return p
  };
  mt.localStorage.set = function(a, b, e) {
    var d = new Date;
    d.setTime(d.getTime() + e || 31536E6);
    try {
      window.localStorage ? (b = d.getTime() + "|" + b, window.localStorage.setItem(a, b)) : mt.localStorage.A() && (mt.localStorage.f.expires = d.toUTCString(), mt.localStorage.f.load(document.location.hostname), mt.localStorage.f.setAttribute(a, b), mt.localStorage.f.save(document.location.hostname))
    } catch (g) {}
  };
  mt.localStorage.get = function(a) {
    if (window.localStorage) {
      if (a = window.localStorage.getItem(a)) {
        var b = a.indexOf("|"),
          e = a.substring(0, b) - 0;
        if (e && e > (new Date).getTime()) return a.substring(b + 1)
      }
    } else if (mt.localStorage.A()) try {
      return mt.localStorage.f.load(document.location.hostname), mt.localStorage.f.getAttribute(a)
    } catch (d) {}
    return q
  };
  mt.localStorage.remove = function(a) {
    if (window.localStorage) window.localStorage.removeItem(a);
    else if (mt.localStorage.A()) try {
      mt.localStorage.f.load(document.location.hostname), mt.localStorage.f.removeAttribute(a), mt.localStorage.f.save(document.location.hostname)
    } catch (b) {}
  };
  mt.sessionStorage = {};
  mt.sessionStorage.set = function(a, b) {
    if (window.sessionStorage) try {
      window.sessionStorage.setItem(a, b)
    } catch (e) {}
  };
  mt.sessionStorage.get = function(a) {
    return window.sessionStorage ? window.sessionStorage.getItem(a) : q
  };
  mt.sessionStorage.remove = function(a) {
    window.sessionStorage && window.sessionStorage.removeItem(a)
  };
  mt.S = {};
  mt.S.log = function(a, b) {
    var e = new Image,
      d = "mini_tangram_log_" + Math.floor(2147483648 * Math.random()).toString(36);
    window[d] = e;
    e.onload = e.onerror = e.onabort = function() {
      e.onload = e.onerror = e.onabort = q;
      e = window[d] = q;
      b && b(a)
    };
    e.src = a
  };
  mt.K = {};
  mt.K.fa = function() {
    var a = "";
    if (navigator.plugins && navigator.mimeTypes.length) {
      var b = navigator.plugins["Shockwave Flash"];
      b && b.description && (a = b.description.replace(/^.*\s+(\S+)\s+\S+$/, "$1"))
    } else if (window.ActiveXObject) try {
      if (b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))(a = b.GetVariable("$version")) && (a = a.replace(/^.*\s+(\d+),(\d+).*$/, "$1.$2"))
    } catch (e) {}
    return a
  };
  mt.K.Aa = function(a, b, e, d, g) {
    return '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="' + a + '" width="' + e + '" height="' + d + '"><param name="movie" value="' + b + '" /><param name="flashvars" value="' + (g || "") + '" /><param name="allowscriptaccess" value="always" /><embed type="application/x-shockwave-flash" name="' + a + '" width="' + e + '" height="' + d + '" src="' + b + '" flashvars="' + (g || "") + '" allowscriptaccess="always" /></object>'
  };
  mt.url = {};
  mt.url.h = function(a, b) {
    var e = a.match(RegExp("(^|&|\\?|#)(" + b + ")=([^&#]*)(&|$|#)", ""));
    return e ? e[3] : q
  };
  mt.url.Fa = function(a) {
    return (a = a.match(/^(https?:)\/\//)) ? a[1] : q
  };
  mt.url.ca = function(a) {
    return (a = a.match(/^(https?:\/\/)?([^\/\?#]*)/)) ? a[2].replace(/.*@/, "") : q
  };
  mt.url.M = function(a) {
    return (a = mt.url.ca(a)) ? a.replace(/:\d+$/, "") : a
  };
  mt.url.Ea = function(a) {
    return (a = a.match(/^(https?:\/\/)?[^\/]*(.*)/)) ? a[2].replace(/[\?#].*/, "").replace(/^$/, "/") : q
  };
  h.p = {
    Ga: "http://tongji.baidu.com/hm-web/welcome/ico",
    R: "hm.baidu.com/hm.gif",
    V: "baidu.com",
    ia: "hmmd",
    ka: "hmpl",
    ha: "hmkw",
    ga: "hmci",
    la: "hmsr",
    m: 0,
    k: Math.round(+new Date / 1E3),
    protocol: "https:" == document.location.protocol ? "https:" : "http:",
    Ja: 0,
    xa: 6E5,
    ya: 10,
    za: 1024,
    wa: 1,
    Q: 2147483647,
    T: "cc cf ci ck cl cm cp cw ds ep et fl ja ln lo lt nv rnd si st su v cv lv api tt u".split(" ")
  };
  (function() {
    var a = {
      l: {},
      c: function(a, e) {
        this.l[a] = this.l[a] || [];
        this.l[a].push(e)
      },
      r: function(a, e) {
        this.l[a] = this.l[a] || [];
        for (var d = this.l[a].length, g = 0; g < d; g++) this.l[a][g](e)
      }
    };
    return h.C = a
  })();
  (function() {
    function a(a, d) {
      var g = document.createElement("script");
      g.charset = "utf-8";
      b.e(d, "Function") && (g.readyState ? g.onreadystatechange = function() {
        if ("loaded" === g.readyState || "complete" === g.readyState) g.onreadystatechange = q, d()
      } : g.onload = function() {
        d()
      });
      g.src = a;
      var m = document.getElementsByTagName("script")[0];
      m.parentNode.insertBefore(g, m)
    }
    var b = mt.lang;
    return h.load = a
  })();
  (function() {
    function a() {
      return function() {
        h.b.a.nv = 0;
        h.b.a.st = 4;
        h.b.a.et = 3;
        h.b.a.ep = h.B.da() + "," + h.B.ba();
        h.b.g()
      }
    }

    function b() {
      clearTimeout(x);
      var a;
      w && (a = "visible" == document[w]);
      y && (a = !document[y]);
      f = "undefined" == typeof a ? p : a;
      if ((!n || !l) && f && k) u = p, t = +new Date;
      else if (n && l && (!f || !k)) u = r, s += +new Date - t;
      n = f;
      l = k;
      x = setTimeout(b, 100)
    }

    function e(a) {
      var t = document,
        l = "";
      if (a in t) l = a;
      else
        for (var s = ["webkit", "ms", "moz", "o"], b = 0; b < s.length; b++) {
          var k = s[b] + a.charAt(0).toUpperCase() + a.slice(1);
          if (k in t) {
            l =
              k;
            break
          }
        }
      return l
    }

    function d(a) {
      if (!("focus" == a.type || "blur" == a.type) || !(a.target && a.target != window)) k = "focus" == a.type || "focusin" == a.type ? p : r, b()
    }
    var g = mt.event,
      m = h.C,
      n = p,
      f = p,
      l = p,
      k = p,
      v = +new Date,
      t = v,
      s = 0,
      u = p,
      w = e("visibilityState"),
      y = e("hidden"),
      x;
    b();
    (function() {
      var a = w.replace(/[vV]isibilityState/, "visibilitychange");
      g.c(document, a, b);
      g.c(window, "pageshow", b);
      g.c(window, "pagehide", b);
      "object" == typeof document.onfocusin ? (g.c(document, "focusin", d), g.c(document, "focusout", d)) : (g.c(window, "focus", d),
        g.c(window, "blur", d))
    })();
    h.B = {
      da: function() {
        return +new Date - v
      },
      ba: function() {
        return u ? +new Date - t + s : s
      }
    };
    m.c("pv-b", function() {
      g.c(window, "unload", a())
    });
    return h.B
  })();
  (function() {
    var a = mt.lang,
      b = h.p,
      e = h.load,
      d = {
        ma: function(d) {
          if ((void 0 === window._dxt || a.e(window._dxt, "Array")) && "undefined" !== typeof h.b) {
            var m = h.b.F();
            e([b.protocol, "//datax.baidu.com/x.js?si=", c.id, "&dm=", encodeURIComponent(m)].join(""), d)
          }
        },
        va: function(b) {
          if (a.e(b, "String") || a.e(b, "Number")) window._dxt = window._dxt || [], window._dxt.push(["_setUserId", b])
        }
      };
    return h.Y = d
  })();
  (function() {
    function a(l) {
      for (var b in l)
        if ({}.hasOwnProperty.call(l, b)) {
          var d = l[b];
          e.e(d, "Object") || e.e(d, "Array") ? a(d) : l[b] = String(d)
        }
    }

    function b(a) {
      return a.replace ? a.replace(/'/g, "'0").replace(/\*/g, "'1").replace(/!/g, "'2") : a
    }
    var e = mt.lang,
      d = mt.i,
      g = h.p,
      m = h.C,
      n = h.Y,
      f = {
        N: q,
        o: [],
        z: 0,
        O: r,
        init: function() {
          f.d = 0;
          f.N = {
            push: function() {
              f.I.apply(f, arguments)
            }
          };
          m.c("pv-b", function() {
            f.Z();
            f.$()
          });
          m.c("pv-d", f.aa);
          m.c("stag-b", function() {
            h.b.a.api = f.d || f.z ? f.d + "_" + f.z : ""
          });
          m.c("stag-d", function() {
            h.b.a.api =
              0;
            f.d = 0;
            f.z = 0
          })
        },
        Z: function() {
          var a = window._hmt;
          if (a && a.length)
            for (var b = 0; b < a.length; b++) {
              var d = a[b];
              switch (d[0]) {
                case "_setAccount":
                  1 < d.length && /^[0-9a-z]{32}$/.test(d[1]) && (f.d |= 1, window._bdhm_account = d[1]);
                  break;
                case "_setAutoPageview":
                  if (1 < d.length && (d = d[1], r === d || p === d)) f.d |= 2, window._bdhm_autoPageview = d
              }
            }
        },
        $: function() {
          if ("undefined" === typeof window._bdhm_account || window._bdhm_account === c.id) {
            window._bdhm_account = c.id;
            var a = window._hmt;
            if (a && a.length)
              for (var b = 0, d = a.length; b < d; b++) e.e(a[b],
                "Array") && "_trackEvent" !== a[b][0] && "_trackRTEvent" !== a[b][0] ? f.I(a[b]) : f.o.push(a[b]);
            window._hmt = f.N
          }
        },
        aa: function() {
          if (0 < f.o.length)
            for (var a = 0, b = f.o.length; a < b; a++) f.I(f.o[a]);
          f.o = q
        },
        I: function(a) {
          if (e.e(a, "Array")) {
            var b = a[0];
            if (f.hasOwnProperty(b) && e.e(f[b], "Function")) f[b](a)
          }
        },
        _trackPageview: function(a) {
          if (1 < a.length && a[1].charAt && "/" == a[1].charAt(0)) {
            f.d |= 4;
            h.b.a.et = 0;
            h.b.a.ep = "";
            h.b.G ? (h.b.a.nv = 0, h.b.a.st = 4) : h.b.G = p;
            var b = h.b.a.u,
              d = h.b.a.su;
            h.b.a.u = g.protocol + "//" + document.location.host +
              a[1];
            f.O || (h.b.a.su = document.location.href);
            h.b.g();
            h.b.a.u = b;
            h.b.a.su = d
          }
        },
        _trackEvent: function(a) {
          2 < a.length && (f.d |= 8, h.b.a.nv = 0, h.b.a.st = 4, h.b.a.et = 4, h.b.a.ep = b(a[1]) + "*" + b(a[2]) + (a[3] ? "*" + b(a[3]) : "") + (a[4] ? "*" + b(a[4]) : ""), h.b.g())
        },
        _setCustomVar: function(a) {
          if (!(4 > a.length)) {
            var d = a[1],
              e = a[4] || 3;
            if (0 < d && 6 > d && 0 < e && 4 > e) {
              f.z++;
              for (var t = (h.b.a.cv || "*").split("!"), s = t.length; s < d - 1; s++) t.push("*");
              t[d - 1] = e + "*" + b(a[2]) + "*" + b(a[3]);
              h.b.a.cv = t.join("!");
              a = h.b.a.cv.replace(/[^1](\*[^!]*){2}/g, "*").replace(/((^|!)\*)+$/g,
                "");
              "" !== a ? h.b.setData("Hm_cv_" + c.id, encodeURIComponent(a), c.age) : h.b.oa("Hm_cv_" + c.id)
            }
          }
        },
        _setReferrerOverride: function(a) {
          1 < a.length && (h.b.a.su = a[1].charAt && "/" == a[1].charAt(0) ? g.protocol + "//" + window.location.host + a[1] : a[1], f.O = p)
        },
        _trackOrder: function(b) {
          b = b[1];
          e.e(b, "Object") && (a(b), f.d |= 16, h.b.a.nv = 0, h.b.a.st = 4, h.b.a.et = 94, h.b.a.ep = d.stringify(b), h.b.g())
        },
        _trackMobConv: function(a) {
          if (a = {
              webim: 1,
              tel: 2,
              map: 3,
              sms: 4,
              callback: 5,
              share: 6
            }[a[1]]) f.d |= 32, h.b.a.et = 93, h.b.a.ep = a, h.b.g()
        },
        _trackRTPageview: function(b) {
          b =
            b[1];
          e.e(b, "Object") && (a(b), b = d.stringify(b), 512 >= encodeURIComponent(b).length && (f.d |= 64, h.b.a.rt = b))
        },
        _trackRTEvent: function(b) {
          b = b[1];
          if (e.e(b, "Object")) {
            a(b);
            b = encodeURIComponent(d.stringify(b));
            var k = function(a) {
                var b = h.b.a.rt;
                f.d |= 128;
                h.b.a.et = 90;
                h.b.a.rt = a;
                h.b.g();
                h.b.a.rt = b
              },
              m = b.length;
            if (900 >= m) k.call(this, b);
            else
              for (var m = Math.ceil(m / 900), t = "block|" + Math.round(Math.random() * g.Q).toString(16) + "|" + m + "|", s = [], u = 0; u < m; u++) s.push(u), s.push(b.substring(900 * u, 900 * u + 900)), k.call(this, t + s.join("|")),
                s = []
          }
        },
        _setUserId: function(a) {
          a = a[1];
          n.ma();
          n.va(a)
        }
      };
    f.init();
    h.W = f;
    return h.W
  })();
  (function() {
    function a() {
      "undefined" == typeof window["_bdhm_loaded_" + c.id] && (window["_bdhm_loaded_" + c.id] = p, this.a = {}, this.G = r, this.init())
    }
    var b = mt.url,
      e = mt.S,
      d = mt.K,
      g = mt.lang,
      m = mt.cookie,
      n = mt.j,
      f = mt.localStorage,
      l = mt.sessionStorage,
      k = h.p,
      v = h.C;
    a.prototype = {
      H: function(a, b) {
        a = "." + a.replace(/:\d+/, "");
        b = "." + b.replace(/:\d+/, "");
        var d = a.indexOf(b);
        return -1 < d && d + b.length == a.length
      },
      P: function(a, b) {
        a = a.replace(/^https?:\/\//, "");
        return 0 === a.indexOf(b)
      },
      s: function(a) {
        for (var d = 0; d < c.dm.length; d++)
          if (-1 <
            c.dm[d].indexOf("/")) {
            if (this.P(a, c.dm[d])) return p
          } else {
            var e = b.M(a);
            if (e && this.H(e, c.dm[d])) return p
          }
        return r
      },
      F: function() {
        for (var a = document.location.hostname, b = 0, d = c.dm.length; b < d; b++)
          if (this.H(a, c.dm[b])) return c.dm[b].replace(/(:\d+)?[\/\?#].*/, "");
        return a
      },
      L: function() {
        for (var a = 0, b = c.dm.length; a < b; a++) {
          var d = c.dm[a];
          if (-1 < d.indexOf("/") && this.P(document.location.href, d)) return d.replace(/^[^\/]+(\/.*)/, "$1") + "/"
        }
        return "/"
      },
      ea: function() {
        if (!document.referrer) return k.k - k.m > c.vdur ? 1 : 4;
        var a =
          r;
        this.s(document.referrer) && this.s(document.location.href) ? a = p : (a = b.M(document.referrer), a = this.H(a || "", document.location.hostname));
        return a ? k.k - k.m > c.vdur ? 1 : 4 : 3
      },
      getData: function(a) {
        try {
          return m.get(a) || l.get(a) || f.get(a)
        } catch (b) {}
      },
      setData: function(a, b, d) {
        try {
          m.set(a, b, {
            domain: this.F(),
            path: this.L(),
            D: d
          }), d ? f.set(a, b, d) : l.set(a, b)
        } catch (e) {}
      },
      oa: function(a) {
        try {
          m.set(a, "", {
            domain: this.F(),
            path: this.L(),
            D: -1
          }), l.remove(a), f.remove(a)
        } catch (b) {}
      },
      ta: function() {
        var a, b, d, e, f;
        k.m = this.getData("Hm_lpvt_" +
          c.id) || 0;
        13 == k.m.length && (k.m = Math.round(k.m / 1E3));
        b = this.ea();
        a = 4 != b ? 1 : 0;
        if (d = this.getData("Hm_lvt_" + c.id)) {
          e = d.split(",");
          for (f = e.length - 1; 0 <= f; f--) 13 == e[f].length && (e[f] = "" + Math.round(e[f] / 1E3));
          for (; 2592E3 < k.k - e[0];) e.shift();
          f = 4 > e.length ? 2 : 3;
          for (1 === a && e.push(k.k); 4 < e.length;) e.shift();
          d = e.join(",");
          e = e[e.length - 1]
        } else d = k.k, e = "", f = 1;
        this.setData("Hm_lvt_" + c.id, d, c.age);
        this.setData("Hm_lpvt_" + c.id, k.k);
        d = k.k == this.getData("Hm_lpvt_" + c.id) ? "1" : "0";
        if (0 === c.nv && this.s(document.location.href) &&
          ("" === document.referrer || this.s(document.referrer))) a = 0, b = 4;
        this.a.nv = a;
        this.a.st = b;
        this.a.cc = d;
        this.a.lt = e;
        this.a.lv = f
      },
      sa: function() {
        for (var a = [], b = 0, d = k.T.length; b < d; b++) {
          var e = k.T[b],
            f = this.a[e];
          "undefined" != typeof f && "" !== f && a.push(e + "=" + encodeURIComponent(f))
        }
        b = this.a.et;
        this.a.rt && (0 === b ? a.push("rt=" + encodeURIComponent(this.a.rt)) : 90 === b && a.push("rt=" + this.a.rt));
        return a.join("&")
      },
      ua: function() {
        this.ta();
        this.a.si = c.id;
        this.a.su = document.referrer;
        this.a.ds = n.pa;
        this.a.cl = n.colorDepth + "-bit";
        this.a.ln = n.language;
        this.a.ja = n.javaEnabled ? 1 : 0;
        this.a.ck = n.cookieEnabled ? 1 : 0;
        this.a.lo = "number" == typeof _bdhm_top ? 1 : 0;
        this.a.fl = d.fa();
        this.a.v = "1.1.2";
        this.a.cv = decodeURIComponent(this.getData("Hm_cv_" + c.id) || "");
        1 == this.a.nv && (this.a.tt = document.title || "");
        var a = document.location.href;
        this.a.cm = b.h(a, k.ia) || "";
        this.a.cp = b.h(a, k.ka) || "";
        this.a.cw = b.h(a, k.ha) || "";
        this.a.ci = b.h(a, k.ga) || "";
        this.a.cf = b.h(a, k.la) || ""
      },
      init: function() {
        try {
          this.ua(), 0 === this.a.nv ? this.ra() : this.J(".*"), h.b = this, this.X(),
            v.r("pv-b"), this.qa()
        } catch (a) {
          var b = [];
          b.push("si=" + c.id);
          b.push("n=" + encodeURIComponent(a.name));
          b.push("m=" + encodeURIComponent(a.message));
          b.push("r=" + encodeURIComponent(document.referrer));
          e.log(k.protocol + "//" + k.R + "?" + b.join("&"))
        }
      },
      qa: function() {
        function a() {
          v.r("pv-d")
        }
        "undefined" === typeof window._bdhm_autoPageview || window._bdhm_autoPageview === p ? (this.G = p, this.a.et = 0, this.a.ep = "", this.g(a)) : a()
      },
      g: function(a) {
        var b = this;
        b.a.rnd = Math.round(Math.random() * k.Q);
        v.r("stag-b");
        var d = k.protocol + "//" +
          k.R + "?" + b.sa();
        v.r("stag-d");
        b.U(d);
        e.log(d, function(d) {
          b.J(d);
          g.e(a, "Function") && a.call(b)
        })
      },
      X: function() {
        var a = document.location.hash.substring(1),
          d = RegExp(c.id),
          e = -1 < document.referrer.indexOf(k.V) ? p : r,
          f = b.h(a, "jn"),
          g = /^heatlink$|^select$/.test(f);
        a && (d.test(a) && e && g) && (a = document.createElement("script"), a.setAttribute("type", "text/javascript"), a.setAttribute("charset", "utf-8"), a.setAttribute("src", k.protocol + "//" + c.js + f + ".js?" + this.a.rnd), f = document.getElementsByTagName("script")[0], f.parentNode.insertBefore(a,
          f))
      },
      U: function(a) {
        var b = l.get("Hm_unsent_" + c.id) || "",
          d = this.a.u ? "" : "&u=" + encodeURIComponent(document.location.href),
          b = encodeURIComponent(a.replace(/^https?:\/\//, "") + d) + (b ? "," + b : "");
        l.set("Hm_unsent_" + c.id, b)
      },
      J: function(a) {
        var b = l.get("Hm_unsent_" + c.id) || "";
        b && ((b = b.replace(RegExp(encodeURIComponent(a.replace(/^https?:\/\//, "")).replace(/([\*\(\)])/g, "\\$1") + "(%26u%3D[^,]*)?,?", "g"), "").replace(/,$/, "")) ? l.set("Hm_unsent_" + c.id, b) : l.remove("Hm_unsent_" + c.id))
      },
      ra: function() {
        var a = this,
          b = l.get("Hm_unsent_" +
            c.id);
        if (b)
          for (var b = b.split(","), d = function(b) {
              e.log(k.protocol + "//" + decodeURIComponent(b).replace(/^https?:\/\//, ""), function(b) {
                a.J(b)
              })
            }, f = 0, g = b.length; f < g; f++) d(b[f])
      }
    };
    return new a
  })();
  (function() {
    var a = mt.q,
      b = mt.event,
      e = mt.url,
      d = mt.i;
    try {
      if (window.performance && performance.timing && "undefined" !== typeof h.b) {
        var g = +new Date,
          m = function(a) {
            var b = performance.timing,
              d = b[a + "Start"] ? b[a + "Start"] : 0;
            a = b[a + "End"] ? b[a + "End"] : 0;
            return {
              start: d,
              end: a,
              value: 0 < a - d ? a - d : 0
            }
          },
          n = q;
        a.na(function() {
          n = +new Date
        });
        var f = function() {
          var a, b, f;
          f = m("navigation");
          b = m("request");
          f = {
            netAll: b.start - f.start,
            netDns: m("domainLookup").value,
            netTcp: m("connect").value,
            srv: m("response").start - b.start,
            dom: performance.timing.domInteractive -
              performance.timing.fetchStart,
            loadEvent: m("loadEvent").end - f.start
          };
          a = document.referrer;
          var s = q;
          b = q;
          if ("www.baidu.com" === (a.match(/^(http[s]?:\/\/)?([^\/]+)(.*)/) || [])[2]) s = e.h(a, "qid"), b = e.h(a, "click_t");
          a = s;
          f.qid = a != q ? a : "";
          b != q ? (f.bdDom = n ? n - b : 0, f.bdRun = g - b, f.bdDef = m("navigation").start - b) : (f.bdDom = 0, f.bdRun = 0, f.bdDef = 0);
          h.b.a.et = 87;
          h.b.a.ep = d.stringify(f);
          h.b.g()
        };
        b.c(window, "load", function() {
          setTimeout(f, 500)
        })
      }
    } catch (l) {}
  })();
  (function() {
    var a = h.p,
      b = {
        init: function() {
          try {
            if ("http:" === a.protocol) {
              var b = document.createElement("IFRAME");
              b.setAttribute("src", "http://boscdn.bpc.baidu.com/v1/holmes-moplus/mp-cdn.html");
              b.style.display = "none";
              b.style.width = "1";
              b.style.height = "1";
              b.Ba = "0";
              document.body.appendChild(b)
            }
          } catch (e) {}
        }
      },
      e = navigator.userAgent.toLowerCase(); - 1 < e.indexOf("android") && -1 === e.indexOf("micromessenger") && b.init()
  })();
  (function() {
    var a = mt.lang,
      b = mt.event,
      e = mt.i;
    if (c.comm && "undefined" !== typeof h.b) {
      var d = function(a) {
          if (a.item) {
            for (var b = a.length, d = Array(b); b--;) d[b] = a[b];
            return d
          }
          return [].slice.call(a)
        },
        g = /swt|zixun|call|chat|zoos|business|talk|kefu|openkf|online|\/LR\/Chatpre\.aspx/i,
        m = {
          click: function() {
            for (var a = [], b = d(document.getElementsByTagName("a")), b = [].concat.apply(b, d(document.getElementsByTagName("area"))), b = [].concat.apply(b, d(document.getElementsByTagName("img"))), e = 0, f = b.length; e < f; e++) {
              var k = b[e],
                l = k.getAttribute("onclick"),
                k = k.getAttribute("href");
              (g.test(l) || g.test(k)) && a.push(b[e])
            }
            return a
          }
        },
        n = function(a, b) {
          for (var d in a)
            if (a.hasOwnProperty(d) && b.call(a, d, a[d]) === r) return r
        },
        f = function(b, d) {
          var f = {
            n: "swt",
            t: "clk"
          };
          f.v = b;
          if (d) {
            var k = d.getAttribute("href"),
              l = d.getAttribute("onclick") ? "" + d.getAttribute("onclick") : q,
              m = d.getAttribute("id") || "";
            g.test(k) ? (f.sn = "mediate", f.snv = k) : a.e(l, "String") && g.test(l) && (f.sn = "wrap", f.snv = l);
            f.id = m
          }
          h.b.a.et = 86;
          h.b.a.ep = e.stringify(f);
          h.b.g();
          for (f = +new Date; 500 >=
            +new Date - f;);
        },
        l, k = "/zoosnet" + (/\/$/.test("/zoosnet") ? "" : "/"),
        v = function(b, d) {
          if (l === d) return f(k + b, d), r;
          if (a.e(d, "Array") || a.e(d, "NodeList"))
            for (var e = 0, g = d.length; e < g; e++)
              if (l === d[e]) return f(k + b + "/" + (e + 1), d[e]), r
        };
      b.c(document, "click", function(b) {
        b = b || window.event;
        l = b.target || b.srcElement;
        var d = {};
        for (n(m, function(b, e) {
            d[b] = a.e(e, "Function") ? e() : document.getElementById(e)
          }); l && l !== document && n(d, v) !== r;) l = l.parentNode
      })
    }
  })();
  (function() {
    var a = mt.event,
      b = mt.i;
    if (c.comm && "undefined" !== typeof h.b) {
      var e = +new Date,
        d = {
          n: "anti",
          sb: 0,
          kb: 0,
          clk: 0
        },
        g = function() {
          h.b.a.et = 86;
          h.b.a.ep = b.stringify(d);
          h.b.g()
        };
      a.c(document, "click", function() {
        d.clk++
      });
      a.c(document, "keyup", function() {
        d.kb = 1
      });
      a.c(window, "scroll", function() {
        d.sb++
      });
      a.c(window, "unload", function() {
        d.t = +new Date - e;
        g()
      });
      a.c(window, "load", function() {
        setTimeout(g, 5E3)
      })
    }
  })();
})();

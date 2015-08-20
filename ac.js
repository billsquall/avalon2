BOOMR_start = (new Date).getTime();

function BOOMR_check_doc_domain(e) {
  var d;
  if (!e) {
    if (window.parent === window || !document.getElementById("boomr-if-as")) return !0;
    e = document.domain
  }
  if (-1 === e.indexOf(".")) return !1;
  try {
    return d = window.parent.document, void 0 !== d
  } catch (a) {
    document.domain = e
  }
  try {
    return d = window.parent.document, void 0 !== d
  } catch (c) {
    e = e.replace(/^[\w\-]+\./, "")
  }
  return BOOMR_check_doc_domain(e)
}
BOOMR_check_doc_domain();
(function(e) {
  function d(a) {
    var b = /^(?:(?:https?|ftp):)\/*(?:[^@]+@)?([^:/#]+)/.exec(a);
    return b ? b[1] : a
  }
  var a = e.decodeURIComponent;
  String.prototype.hashCode = function() {
    var a = 0,
      b, c;
    if (0 == this.length) return a;
    for (b = 0; b < this.length; b++) c = this.charCodeAt(b), a = (a << 5) - a + c, a &= a;
    return Math.abs(a)
  };
  try {
    e.parent !== e && document.getElementById("boomr-if-as") && "script" === document.getElementById("boomr-if-as").nodeName.toLowerCase() && (e = e.parent)
  } catch (c) {}
  var b, k, g, f = e.document;
  k = function(b, c, e) {
    if ("translate.googleusercontent.com" ===
      b) "" === e && (e = c), c = (b = /[\?&#]u=([^&#]*)/.exec(c)) ? a(b[1]) : "", b = d(c);
    else if ("cc.bingj.com" === b || "webcache.googleusercontent.com" === b || "74.6." === b.slice(0, 5)) c = f.links[0].href, b = d(c);
    return [b, c, e]
  }(f.domain, window.location.href, function() {
    var a = "";
    try {
      a = e.top.document.referrer
    } catch (b) {
      if (e.parent) try {
        a = e.parent.document.referrer
      } catch (c) {
        a = ""
      }
    }
    "" === a && (a = f.referrer);
    return a
  }());
  var h = k[1];
  k = k[2];
  void 0 === e.BOOMR && (e.BOOMR = {});
  e.BOOMR.configReferrerUrl = k;
  BOOMR = e.BOOMR;
  if (!BOOMR.version) {
    BOOMR.version =
      "2.0";
    BOOMR.window = e;
    b = {
      beacon_url: "",
      site_domain: e.location.hostname.replace(/.*?([^.]+\.[^.]+\.[^.]+)\.?$/, "$1").toLowerCase(),
      user_ip: "",
      onloadfired: !1,
      handlers_attached: !1,
      events: {
        page_ready: [],
        page_unload: [],
        dom_loaded: [],
        visibility_changed: [],
        before_beacon: [],
        xhr_load: [],
        click: []
      },
      vars: {},
      disabled_plugins: {},
      onclick_handler: function(a) {
        var c;
        a || (a = e.event);
        a || (a = {
          name: "load"
        });
        a.target ? c = a.target : a.srcElement && (c = a.srcElement);
        3 === c.nodeType && (c = c.parentNode);
        c && "OBJECT" === c.nodeName.toUpperCase() &&
          "application/x-shockwave-flash" === c.type || b.fireEvent("click", c)
      },
      fireEvent: function(a, b) {
        var c, e, d;
        a = a.toLowerCase();
        if (!this.events.hasOwnProperty(a)) return !1;
        d = this.events[a];
        for (c = 0; c < d.length; c++) try {
          e = d[c], e[0].call(e[2], b, e[1])
        } catch (k) {}
        return !0
      },
      addListener: function(a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
      }
    };
    k = {
      t_start: BOOMR_start,
      t_end: null,
      utils: {
        genMac: function() {
          var a = (new Date).getTime();
          return {
            domainhash: window.location.host.hashCode(),
            randomid: Math.round(899999999 * Math.random() + 1E9),
            initialtime: Math.round(a / 1E3),
            previous: Math.round(a / 1E3),
            current: Math.round(a / 1E3),
            counter: 0
          }
        },
        getConfig: function(a, b) {
          setTimeout(function() {
            "undefined" === typeof user_ip ? setTimeout(arguments.callee, 5) : b(a)
          }, 5)
        },
        getRefer: function() {
          var a = "";
          try {
            a = window.top.document.referrer
          } catch (b) {
            if (e.parent) try {
              a = window.parent.document.referrer
            } catch (c) {
              a = ""
            }
          }
          "" === a && (a = document.referrer);
          return a
        },
        getBrowserInfo: function() {
          var a, b, c, e, d;
          if (null == navigator || null ==
            navigator.userAgent) return "unknown";
          var k = navigator.userAgent.toLowerCase(),
            g;
          (g = k.match(/msie ([\d.]+)/)) ? a = g[1]: (g = k.match(/firefox\/([\d.]+)/)) ? b = g[1] : (g = k.match(/chrome\/([\d.]+)/)) ? c = g[1] : (g = k.match(/opera.([\d.]+)/)) ? e = g[1] : (g = k.match(/version\/([\d.]+).*safari/)) ? d = g[1] : 0;
          return a ? "IE" + parseFloat(a).toFixed(1) : b ? "Firefox" + parseFloat(b).toFixed(1) : c ? "Chrome" + parseFloat(c).toFixed(1) : e ? "Opera" + parseFloat(e).toFixed(1) : d ? "Safari" + parseFloat(d).toFixed(1) : "unknown"
        },
        getMousePosition: function(a) {
          a =
            a || window.event;
          var b = document.documentElement.scrollLeft || document.body.scrollLeft,
            c = document.documentElement.scrollTop || document.body.scrollTop;
          return {
            x: a.pageX || a.clientX + b,
            y: a.pageY || a.clientY + c
          }
        },
        getPageContentSize: function() {
          return {
            w: f.body.scrollWidth,
            h: f.body.scrollHeight
          }
        },
        getProtocol: function() {
          return "https:" == document.location.protocol ? " https://" : " http://"
        },
        getDocumentTitle: function() {
          return encodeURIComponent(BOOMR.utils.titleFixup(document.title))
        },
        getEventSrcElement: function(a) {
          return a.srcElement ?
            a.srcElement : a.target
        },
        addListener: function(a, b, c) {
          a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
        },
        titleFixup: function(a) {
          if ("undefined" == typeof a || "null" == typeof a) return null;
          if (!("string" === typeof a || a instanceof String)) {
            a = a.text || "";
            var b = f.getElementsByTagName("title"),
              c;
            if (c = b) c = "undefined" !== typeof b[0];
            c && (a = b[0].text)
          }
          a = a.replace("\r", "");
          a = a.replace("\n", "");
          return a = a.substring(0, 60)
        },
        getScreenResolution: function() {
          var a = /Mac OS X.*Safari\//.test(navigator.userAgent) ?
            window.devicePixelRatio || 1 : 1;
          return screen.width * a + "*" + screen.height * a
        },
        getParams: function(a) {
          try {
            var b = [];
            f.location.href.split("?")[1].split("&").forEach(function(a) {
              a = a.split("=");
              b.push({
                param: a[0],
                value: a[1]
              })
            })
          } catch (c) {}
          return b
        },
        objectToString: function(a, b) {
          var c = [],
            e;
          if (!a || "object" !== typeof a) return a;
          void 0 === b && (b = "\n\t");
          for (e in a) Object.prototype.hasOwnProperty.call(a, e) && c.push(encodeURIComponent(e) + "=" + encodeURIComponent(a[e]));
          return c.join(b)
        },
        stringToObject: function(a) {
          if ("object" ==
            typeof a) return a;
          a = a.split("&");
          for (var b = {}, c = 0; c < a.length; c++) {
            var e = a[c].split("="),
              d = decodeURIComponent(e[0]),
              e = decodeURIComponent(e[1]);
            b[d] = e
          }
          return b
        },
        getCookie: function(a) {
          if (!a) return null;
          a = " " + a + "=";
          var b, c;
          c = " " + f.cookie + ";";
          return 0 <= (b = c.indexOf(a)) ? (b += a.length, c = c.substring(b, c.indexOf(";", b))) : null
        },
        setCookie: function(a, c, e) {
          var d, k, g;
          if (!a || !b.site_domain) return !1;
          c = this.objectToString(c, "&");
          d = a + "=" + c;
          k = [d, "path=/", "domain=" + b.site_domain];
          e && (g = new Date, g.setTime(g.getTime() +
            1E3 * e), g = g.toGMTString(), k.push("expires=" + g));
          return 4E3 > d.length ? (f.cookie = k.join("; "), c === this.getCookie(a)) : !1
        },
        getSubCookies: function(a) {
          var b, c, e, d = !1,
            k = {};
          if (!a) return null;
          a = a.split("&");
          if (0 === a.length) return null;
          b = 0;
          for (c = a.length; b < c; b++) e = a[b].split("="), e[0] && (e.push(""), k[decodeURIComponent(e[0])] = decodeURIComponent(e[1]), d = !0);
          return d ? k : null
        },
        removeCookie: function(a) {
          return this.setCookie(a, {}, 0)
        },
        hashQueryString: function(a, b) {
          if (!a) return a;
          a.match(/^\/\//) && (a = location.protocol +
            a);
          if (!a.match(/^(https?|file):/)) return BOOMR.error("Passed in URL is invalid: " + a), "";
          b && (a = a.replace(/#.*/, ""));
          return BOOMR.utils.MD5 ? a.replace(/\?([^#]*)/, function(a, b) {
            return "?" + (10 < b.length ? BOOMR.utils.MD5(b) : b)
          }) : a
        },
        pluginConfig: function(a, b, c, e) {
          var d, k = 0;
          if (!b || !b[c]) return !1;
          for (d = 0; d < e.length; d++) "undefined" !== typeof b[c][e[d]] && (a[e[d]] = b[c][e[d]], k++);
          return 0 < k
        }
      },
      init: function(a) {
        var c, d, k = ["beacon_url", "site_domain", "user_ip"];
        BOOMR_check_doc_domain();
        a || (a = {});
        for (c = 0; c < k.length; c++) "undefined" !==
          typeof a[k[c]] && (b[k[c]] = a[k[c]]);
        "undefined" !== typeof a.log && (this.log = a.log);
        this.log || (this.log = function(a, b, c) {});
        for (d in this.plugins)
          if (a[d] && "enabled" in a[d] && !1 === a[d].enabled) b.disabled_plugins[d] = 1;
          else if (b.disabled_plugins[d] && delete b.disabled_plugins[d], this.plugins.hasOwnProperty(d) && "function" === typeof this.plugins[d].init) try {
          this.plugins[d].init(a)
        } catch (g) {}
        if (b.handlers_attached) return this;
        b.onloadfired || "autorun" in a && !1 === a.autorun || (f.readyState && "complete" === f.readyState ?
          this.setImmediate(BOOMR.page_ready, null, null, BOOMR) : b.addListener(e, "load", BOOMR.page_ready));
        b.addListener(e, "DOMContentLoaded", function() {
          b.fireEvent("dom_loaded")
        });
        a = function() {
          b.fireEvent("visibility_changed")
        };
        f.webkitVisibilityState ? b.addListener(f, "webkitvisibilitychange", a) : f.msVisibilityState ? b.addListener(f, "msvisibilitychange", a) : f.visibilityState && b.addListener(f, "visibilitychange", a);
        b.addListener(f, "mouseup", b.onclick_handler);
        "onpagehide" in e || b.addListener(e, "unload", function() {
          BOOMR.window =
            e = null
        });
        b.handlers_attached = !0;
        return this
      },
      page_ready: function() {
        if (b.onloadfired) return this;
        b.fireEvent("page_ready");
        b.onloadfired = !0;
        return this
      },
      setImmediate: function(a, b, c, d) {
        var k = function() {
          a.call(d || null, b, c || {});
          k = null
        };
        e.setImmediate ? e.setImmediate(k) : e.msSetImmediate ? e.msSetImmediate(k) : e.webkitSetImmediate ? e.webkitSetImmediate(k) : e.mozSetImmediate ? e.mozSetImmediate(k) : setTimeout(k, 10)
      },
      subscribe: function(a, c, d, k) {
        var g, f, h;
        if (!b.events.hasOwnProperty(a)) return this;
        h = b.events[a];
        for (g =
          0; g < h.length; g++)
          if (f = h[g], f[0] === c && f[1] === d && f[2] === k) return this;
        h.push([c, d || {}, k || null]);
        "page_ready" == a && b.onloadfired && this.setImmediate(c, null, d, k);
        "page_unload" === a && (a = function(a) {
          c && c.call(k, a || e.event, d)
        }, "onpagehide" in e ? b.addListener(e, "pagehide", a) : b.addListener(e, "unload", a), b.addListener(e, "beforeunload", a));
        return this
      },
      getVars: function() {
        return b.vars
      },
      addVar: function(a, c) {
        if ("string" === typeof a) b.vars[a] = c;
        else if ("object" === typeof a)
          for (var d in a) a.hasOwnProperty(d) && (b.vars[d] =
            a[d]);
        return this
      },
      removeVar: function() {
        var a, c;
        if (!arguments.length) return this;
        c = 1 === arguments.length && "[object Array]" === Object.prototype.toString.apply(arguments[0]) ? arguments[0] : arguments;
        for (a = 0; a < c.length; a++) b.vars.hasOwnProperty(c[a]) && delete b.vars[c[a]];
        return this
      },
      getBeaconUrl: function() {
        return b.beacon_url
      },
      sendBeacon: function() {
        var a, c, d = 0;
        for (a in this.plugins)
          if (this.plugins.hasOwnProperty(a) && !b.disabled_plugins[a] && !this.plugins[a].is_complete()) return this;
        b.vars.wtv = BOOMR.version;
        b.vars.wtu = h.replace(/#.*/, "");
        e != window && (b.vars["if"] = "");
        b.fireEvent("before_beacon", b.vars);
        if (!b.beacon_url) return this;
        c = [];
        b.vars.hasOwnProperty("t_done") && b.vars.hasOwnProperty("nt_done") && 0 != b.vars.nt_done && (b.vars.t_done = b.vars.nt_done, delete b.vars.nt_done);
        for (a in b.vars) b.vars.hasOwnProperty(a) && (d++, c.push(encodeURIComponent(a) + "=" + (void 0 === b.vars[a] || null === b.vars[a] ? "" : encodeURIComponent(b.vars[a]))));
        c = b.beacon_url + (-1 < b.beacon_url.indexOf("?") ? "&" : "?") + c.join("&");
        BOOMR.debug("Sending url: " +
          c.replace(/&/g, "\n\t"));
        d && (a = new Image, a.src = c);
        return this
      }
    };
    delete BOOMR_start;
    var l = function(a) {
      return function(c, b) {
        this.log(c, a, "boomerang" + (b ? "." + b : ""));
        return this
      }
    };
    k.debug = l("debug");
    k.info = l("info");
    k.warn = l("warn");
    k.error = l("error");
    e.YAHOO && e.YAHOO.widget && e.YAHOO.widget.Logger ? k.log = e.YAHOO.log : "undefined" !== typeof e.Y && "undefined" !== typeof e.Y.log ? k.log = e.Y.log : "undefined" !== typeof console && "undefined" !== typeof console.log && (k.log = function(a, c, b) {});
    for (g in k) k.hasOwnProperty(g) &&
      (BOOMR[g] = k[g]);
    BOOMR.plugins = BOOMR.plugins || {};
    e.wftSend = function(a, c) {
      if ("" != a && "undefined" !== typeof a && "undefined" !== c) try {
        e.config.custom_event_element_id = e.config.custom_event_element_id ? e.config.custom_event_element_id : [], BOOMR.plugins.CUSTOM_EVENT.update(a, c)
      } catch (b) {}
    }
  }
})(window);
(function(e) {
  var d = e.document;
  BOOMR = BOOMR || {};
  BOOMR.plugins = BOOMR.plugins || {};
  var a = {
    initialized: !1,
    complete: !1,
    timers: {},
    cookie: "RT",
    cookie_exp: 600,
    strict_referrer: !0,
    navigationType: 0,
    navigationStart: void 0,
    responseStart: void 0,
    t_start: void 0,
    t_fb_approx: void 0,
    r: void 0,
    wtr2: void 0,
    setCookie: function(a, b) {
      var e, g = (new Date).getTime();
      if (!this.cookie) return this;
      e = BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(this.cookie)) || {};
      e[a] = g;
      e.r = d.URL.replace(/#.*/, "");
      "cl" === a && (b ? e.nu = b : e.nu && delete e.nu);
      !1 === b && delete e.nu;
      BOOMR.debug("Setting cookie " + BOOMR.utils.objectToString(e), "rt");
      if (!BOOMR.utils.setCookie(this.cookie, e, this.cookie_exp)) return BOOMR.error("cannot set start cookie", "rt"), this;
      e = (new Date).getTime();
      50 < e - g && (BOOMR.utils.removeCookie(this.cookie), BOOMR.error("took more than 50ms to set cookie... aborting: " + g + " -> " + e, "rt"));
      return this
    },
    initFromCookie: function() {
      var a;
      if (this.cookie && (a = BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(this.cookie))) && (a.s = Math.max(+a.ul || 0, +a.cl ||
          0), BOOMR.debug("Read from cookie " + BOOMR.utils.objectToString(a), "rt"), a.s && a.r)) {
        if ("" == this.r || "undefined" == typeof this.r) this.r = a.r;
        !this.strict_referrer || this.r === this.wtr2 || a.s === +a.cl && a.nu === d.URL.replace(/#.*/, "") ? (this.t_start = a.s, +a.hd > a.s && (this.t_fb_approx = parseInt(a.hd, 10))) : this.t_start = this.t_fb_approx = void 0
      }
    },
    checkPreRender: function() {
      if (!(d.webkitVisibilityState && "prerender" === d.webkitVisibilityState || d.msVisibilityState && 3 === d.msVisibilityState)) return !1;
      BOOMR.plugins.RT.startTimer("t_load",
        this.navigationStart);
      BOOMR.plugins.RT.endTimer("t_load");
      BOOMR.plugins.RT.startTimer("t_prerender", this.navigationStart);
      BOOMR.plugins.RT.startTimer("t_postrender");
      BOOMR.subscribe("visibility_changed", BOOMR.plugins.RT.done, null, BOOMR.plugins.RT);
      return !0
    },
    initNavTiming: function() {
      var a, b, d;
      this.navigationStart || ((b = e.performance || e.msPerformance || e.webkitPerformance || e.mozPerformance) && b.navigation && (this.navigationType = b.navigation.type), b && b.timing ? a = b.timing : e.chrome && e.chrome.csi && e.chrome.csi().startE ?
        (a = {
          navigationStart: e.chrome.csi().startE
        }, d = "csi") : e.gtbExternal && e.gtbExternal.startE() && (a = {
          navigationStart: e.gtbExternal.startE()
        }, d = "gtb"), a ? (BOOMR.addVar("wtrt", d || "navigation"), this.navigationStart = a.navigationStart || a.fetchStart || void 0, this.responseStart = a.responseStart || void 0, navigator.userAgent.match(/Firefox\/[78]\./) && (this.navigationStart = a.unloadEventStart || a.fetchStart || void 0)) : BOOMR.warn("This browser doesn't support the WebTiming API", "rt"))
    },
    page_unload: function(a) {
      BOOMR.debug("Unload called with " +
        BOOMR.utils.objectToString(a), "rt");
      this.setCookie("beforeunload" == a.type ? "ul" : "hd")
    },
    onclick: function(a) {
      if (a) {
        for (BOOMR.debug("Click called with " + a.nodeName, "rt"); a && "A" !== a.nodeName.toUpperCase();) a = a.parentNode;
        a && "A" == a.nodeName.toUpperCase() && (BOOMR.debug("passing through", "rt"), this.setCookie("cl", a.href), this.setCookie("ul"))
      }
    },
    domloaded: function() {
      BOOMR.plugins.RT.endTimer("t_domloaded")
    }
  };
  BOOMR.plugins.RT = {
    init: function(c) {
      BOOMR.debug("init RT", "rt");
      e != BOOMR.window && (e = BOOMR.window, d =
        e.document);
      BOOMR.utils.pluginConfig(a, c, "RT", ["cookie", "cookie_exp", "strict_referrer"]);
      a.r = a.r2 = BOOMR.utils.hashQueryString(d.referrer, !0);
      a.initFromCookie();
      if (a.initialized) return this;
      a.complete = !1;
      a.timers = {};
      BOOMR.subscribe("page_ready", this.done, null, this);
      BOOMR.subscribe("dom_loaded", a.domloaded, null, a);
      BOOMR.subscribe("page_unload", a.page_unload, null, a);
      BOOMR.subscribe("click", a.onclick, null, a);
      BOOMR.t_start && (this.startTimer("boomerang", BOOMR.t_start), this.endTimer("boomerang", BOOMR.t_end),
        this.endTimer("boomr_fb", BOOMR.t_start));
      a.r = a.wtr2 = BOOMR.configReferrerUrl;
      a.initialized = !0;
      return this
    },
    startTimer: function(c, b) {
      c && ("t_page" === c && this.endTimer("t_resp", b), a.timers[c] = {
        start: "number" === typeof b ? b : (new Date).getTime()
      }, a.complete = !1);
      return this
    },
    endTimer: function(c, b) {
      c && (a.timers[c] = a.timers[c] || {}, "end" in a.timers[c] || (a.timers[c].end = "number" === typeof b ? b : (new Date).getTime()));
      return this
    },
    setTimer: function(c, b) {
      c && (a.timers[c] = {
        delta: b
      });
      return this
    },
    done: function() {
      BOOMR.debug("Called done",
        "rt");
      var c, b = (new Date).getTime(),
        d = {
          t_done: 1,
          t_resp: 1,
          t_page: 1
        },
        e = 0,
        f, h = [];
      a.complete = !1;
      a.initFromCookie();
      a.initNavTiming();
      if (a.checkPreRender()) return this;
      a.responseStart ? (this.endTimer("t_resp", a.responseStart), a.timers.t_load ? this.setTimer("t_page", a.timers.t_load.end - a.responseStart) : this.setTimer("t_page", b - a.responseStart)) : a.timers.hasOwnProperty("t_page") ? this.endTimer("t_page") : a.t_fb_approx && (this.endTimer("t_resp", a.t_fb_approx), this.setTimer("t_page", b - a.t_fb_approx));
      a.timers.hasOwnProperty("t_postrender") &&
        (this.endTimer("t_postrender"), this.endTimer("t_prerender"));
      a.navigationStart ? c = a.navigationStart : a.t_start && 2 !== a.navigationType ? (c = a.t_start, BOOMR.addVar("wtrt", "cookie")) : (BOOMR.addVar("wtrt", "none"), c = void 0);
      this.endTimer("t_done", b);
      BOOMR.removeVar("t_done", "t_page", "t_resp", "r", "wtr2", "rt_tstart", "rt_bstart", "rt_end", "t_postrender", "t_prerender", "t_load");
      for (f in a.timers) a.timers.hasOwnProperty(f) && (b = a.timers[f], "number" !== typeof b.delta && ("number" !== typeof b.start && (b.start = c), b.delta =
        b.end - b.start), isNaN(b.delta) || (d.hasOwnProperty(f) ? "t_done" === f && BOOMR.addVar("wtlt", b.delta) : h.push(f + "|" + b.delta), e++));
      e && (BOOMR.addVar("wtr", a.r), a.wtr2 === a.r || isNaN(a.wtr2) || BOOMR.addVar("wtr2", a.wtr2));
      a.timers = {};
      a.complete = !0;
      BOOMR.sendBeacon();
      return this
    },
    is_complete: function() {
      return a.complete
    }
  }
})(window);
(function() {
  BOOMR = BOOMR || {};
  BOOMR.plugins = BOOMR.plugins || {};
  var e = [{
    name: "image-0.png",
    size: 11483,
    timeout: 1400
  }, {
    name: "image-1.png",
    size: 40658,
    timeout: 1200
  }, {
    name: "image-2.png",
    size: 164897,
    timeout: 1300
  }, {
    name: "image-3.png",
    size: 381756,
    timeout: 1500
  }, {
    name: "image-4.png",
    size: 1234664,
    timeout: 1200
  }, {
    name: "image-5.png",
    size: 4509613,
    timeout: 1200
  }];
  e.end = e.length;
  e.start = 0;
  var d = {
    base_url: "",
    timeout: 15E3,
    nruns: 5,
    latency_runs: 10,
    user_ip: "",
    cookie_exp: 604800,
    cookie: "BA",
    results: [],
    latencies: [],
    latency: null,
    runs_left: 0,
    aborted: !1,
    complete: !0,
    running: !1,
    initialized: !1,
    ncmp: function(a, c) {
      return a - c
    },
    iqr: function(a) {
      var c = a.length - 1,
        b, d, e, f = [],
        h;
      b = (a[Math.floor(0.25 * c)] + a[Math.ceil(0.25 * c)]) / 2;
      d = (a[Math.floor(0.75 * c)] + a[Math.ceil(0.75 * c)]) / 2;
      e = 1.5 * (d - b);
      c++;
      for (h = 0; h < c && a[h] < d + e; h++) a[h] > b - e && f.push(a[h]);
      return f
    },
    calc_latency: function() {
      var a, c, b = 0,
        d = 0,
        e;
      e = this.iqr(this.latencies.sort(this.ncmp));
      c = e.length;
      BOOMR.debug(e, "bw");
      for (a = 1; a < c; a++) b += e[a], d += e[a] * e[a];
      c--;
      a = Math.round(b / c);
      b = Math.sqrt(d / c -
        b * b / (c * c));
      d = (1.96 * b / Math.sqrt(c)).toFixed(2);
      b = b.toFixed(2);
      c = e.length - 1;
      c = Math.round((e[Math.floor(c / 2)] + e[Math.ceil(c / 2)]) / 2);
      return {
        mean: a,
        median: c,
        stddev: b,
        stderr: d
      }
    },
    calc_bw: function() {
      var a, c, b = 0,
        d, g = [],
        f = [],
        h = 0,
        l = 0,
        m = 0,
        n = 0,
        q, p, r = [];
      for (a = 0; a < this.nruns; a++)
        if (this.results[a] && this.results[a].r)
          for (d = this.results[a].r, q = 0, c = d.length - 1; 0 <= c && 3 > q && d[c]; c--) null !== d[c].t && (b++, q++, p = 1E3 * e[c].size / d[c].t, g.push(p), p = 1E3 * e[c].size / (d[c].t - this.latency.mean), f.push(p), d[c].t < this.latency.mean && r.push("" +
            c + "_" + d[c].t));
      BOOMR.debug("got " + b + " readings", "bw");
      BOOMR.debug("bandwidths: " + g, "bw");
      BOOMR.debug("corrected: " + f, "bw");
      3 < g.length ? (g = this.iqr(g.sort(this.ncmp)), f = this.iqr(f.sort(this.ncmp))) : (g = g.sort(this.ncmp), f = f.sort(this.ncmp));
      BOOMR.debug("after iqr: " + g, "bw");
      BOOMR.debug("corrected: " + f, "bw");
      b = Math.max(g.length, f.length);
      for (a = 0; a < b; a++) a < g.length && (h += g[a], l += Math.pow(g[a], 2)), a < f.length && (m += f[a], n += Math.pow(f[a], 2));
      b = g.length;
      a = Math.round(h / b);
      h = Math.sqrt(l / b - Math.pow(h / b, 2));
      l = Math.round(1.96 *
        h / Math.sqrt(b));
      h = Math.round(h);
      b = g.length - 1;
      g = Math.round((g[Math.floor(b / 2)] + g[Math.ceil(b / 2)]) / 2);
      b = f.length;
      c = Math.round(m / b);
      m = Math.sqrt(n / b - Math.pow(m / b, 2));
      n = (1.96 * m / Math.sqrt(b)).toFixed(2);
      m = m.toFixed(2);
      b = f.length - 1;
      b = Math.round((f[Math.floor(b / 2)] + f[Math.ceil(b / 2)]) / 2);
      BOOMR.debug("amean: " + a + ", median: " + g, "bw");
      BOOMR.debug("corrected amean: " + c + ", median: " + b, "bw");
      return {
        mean: a,
        stddev: h,
        stderr: l,
        median: g,
        mean_corrected: c,
        stddev_corrected: m,
        stderr_corrected: n,
        median_corrected: b,
        debug_info: r
      }
    },
    defer: function(a) {
      var c = this;
      return setTimeout(function() {
        a.call(c);
        c = null
      }, 10)
    },
    load_img: function(a, c, b) {
      var d = this.base_url + e[a].name + "?t=" + (new Date).getTime() + Math.random(),
        g = 0,
        f = 0,
        h = new Image,
        l = this;
      h.onload = function() {
        h = h.onload = h.onerror = null;
        clearTimeout(g);
        b && b.call(l, a, f, c, !0);
        l = b = null
      };
      h.onerror = function() {
        h = h.onload = h.onerror = null;
        clearTimeout(g);
        b && b.call(l, a, f, c, !1);
        l = b = null
      };
      g = setTimeout(function() {
        b && b.call(l, a, f, c, null)
      }, e[a].timeout + Math.min(400, this.latency ? this.latency.mean : 400));
      f = (new Date).getTime();
      h.src = d
    },
    img_loaded: function(a, c, b, d) {
      b !== this.runs_left + 1 || this.results[this.nruns - b].r[a] || (null === d ? this.results[this.nruns - b].r[a + 1] = {
        t: null,
        state: null,
        run: b
      } : (c = {
        start: c,
        end: (new Date).getTime(),
        t: null,
        state: d,
        run: b
      }, d && (c.t = c.end - c.start), this.results[this.nruns - b].r[a] = c, a >= e.end - 1 || "undefined" !== typeof this.results[this.nruns - b].r[a + 1] ? (BOOMR.debug(this.results[this.nruns - b], "bw"), b === this.nruns && (e.start = a), this.defer(this.iterate)) : this.load_img(a + 1, b, this.img_loaded)))
    },
    finish: function() {
      this.latency || (this.latency = this.calc_latency());
      var a = this.calc_bw(),
        c = {
          wtbw: a.median_corrected,
          wtbe: parseFloat(a.stderr_corrected, 10)
        };
      0 < a.debug_info.length && BOOMR.addVar("bw_debug", a.debug_info.join(","));
      !isNaN(c.wtbw) && 0 < c.wtbw && BOOMR.utils.setCookie(this.cookie, {
        ba: Math.round(c.wtbw),
        be: c.wtbe
      }, this.cookie_exp);
      BOOMR.addVar(c);
      this.complete = !0;
      BOOMR.sendBeacon();
      this.running = !1
    },
    iterate: function() {
      if (this.aborted) return !1;
      this.runs_left ? (this.results.push({
        r: []
      }), this.load_img(e.start,
        this.runs_left--, this.img_loaded)) : this.finish()
    },
    setVarsFromCookie: function(a) {
      var c = parseInt(a.ba, 10),
        b = parseFloat(a.be, 10);
      a = parseInt(a.t, 10);
      var d = Math.round((new Date).getTime() / 1E3);
      return a >= d - this.cookie_exp && 0 < c ? (this.complete = !0, BOOMR.addVar({
        wtbw: c,
        wtbe: b
      }), !0) : !1
    }
  };
  BOOMR.plugins.BW = {
    implf: function(a) {
      var c;
      if (d.initialized) return this;
      BOOMR.utils.pluginConfig(d, a, "BW", "base_url timeout nruns cookie cookie_exp day".split(" "));
      c = BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(d.cookie));
      if (!a.BW.enabled || c) return d.initialized = !0, this;
      if (!d.base_url) return this;
      d.day && (d.cookie_exp = 86400 * d.day);
      e.start = 0;
      d.runs_left = d.nruns;
      d.latency_runs = 10;
      d.results = [];
      d.latencies = [];
      d.latency = null;
      d.complete = !1;
      d.aborted = !1;
      BOOMR.removeVar("ba", "ba_err");
      c && c.ba && d.setVarsFromCookie(c) || (BOOMR.subscribe("page_ready", this.run, null, this), BOOMR.subscribe("page_unload", this.skip, null, this));
      d.initialized = !0;
      return this
    },
    init: function(a) {
      this.implf(a)
    },
    run: function() {
      if (d.running || d.complete) return this;
      if ("https:" === BOOMR.window.location.protocol) return BOOMR.info("HTTPS detected, skipping bandwidth test", "bw"), d.complete = !0, BOOMR.sendBeacon(), this;
      d.running = !0;
      setTimeout(this.abort, d.timeout);
      d.defer(d.iterate);
      return this
    },
    abort: function() {
      d.aborted = !0;
      d.running && d.finish();
      return this
    },
    skip: function() {
      d.complete || (d.complete = !0, BOOMR.sendBeacon());
      return this
    },
    is_complete: function() {
      return d.complete
    }
  }
})();
(function() {
  BOOMR = BOOMR || {};
  BOOMR.plugins = BOOMR.plugins || {};
  var e = {
    l: {
      name: "image-l.gif",
      size: 35,
      timeout: 1E3
    }
  };
  e.end = e.length;
  e.start = 0;
  var d = {
    base_url: "",
    timeout: 15E3,
    nruns: 2,
    latency_runs: 5,
    cookie_exp: 604800,
    cookie: "LAT",
    enabled: !0,
    results: [],
    latencies: [],
    latency: null,
    runs_left: 0,
    aborted: !1,
    complete: !0,
    initialized: !1,
    running: !1,
    ncmp: function(a, c) {
      return a - c
    },
    iqr: function(a) {
      var c = a.length - 1,
        b, d, e, f = [],
        h;
      b = (a[Math.floor(0.25 * c)] + a[Math.ceil(0.25 * c)]) / 2;
      d = (a[Math.floor(0.75 * c)] + a[Math.ceil(0.75 * c)]) /
        2;
      e = 1.5 * (d - b);
      c++;
      for (h = 0; h < c && a[h] < d + e; h++) a[h] > b - e && f.push(a[h]);
      return f
    },
    calc_latency: function() {
      var a, c, b = 0,
        d = 0,
        e;
      e = this.iqr(this.latencies.sort(this.ncmp));
      c = e.length;
      BOOMR.debug(e, "LAT");
      for (a = 1; a < c; a++) b += e[a], d += e[a] * e[a];
      c--;
      a = Math.round(b / c);
      b = Math.sqrt(d / c - b * b / (c * c));
      d = (1.96 * b / Math.sqrt(c)).toFixed(2);
      b = b.toFixed(2);
      c = e.length - 1;
      c = Math.round((e[Math.floor(c / 2)] + e[Math.ceil(c / 2)]) / 2);
      return {
        mean: a,
        median: c,
        stddev: b,
        stderr: d
      }
    },
    defer: function(a) {
      var c = this;
      return setTimeout(function() {
        a.call(c);
        c = null
      }, 10)
    },
    load_img: function(a, c, b) {
      var d = this.base_url + e[a].name + "?t=" + (new Date).getTime() + Math.random(),
        g = 0,
        f = 0,
        h = new Image,
        l = this;
      h.onload = function() {
        h = h.onload = h.onerror = null;
        clearTimeout(g);
        b && b.call(l, a, f, c, !0);
        l = b = null
      };
      h.onerror = function() {
        h = h.onload = h.onerror = null;
        clearTimeout(g);
        b && b.call(l, a, f, c, !1);
        l = b = null
      };
      g = setTimeout(function() {
        b && b.call(l, a, f, c, null)
      }, e[a].timeout + Math.min(400, this.latency ? this.latency.mean : 400));
      f = (new Date).getTime();
      h.src = d
    },
    lat_loaded: function(a, c, b, d) {
      b ===
        this.latency_runs + 1 && (null !== d && (a = (new Date).getTime() - c, this.latencies.push(a)), 0 === this.latency_runs && (this.latency = this.calc_latency()), this.defer(this.iterate))
    },
    img_loaded: function(a, c, b, d) {
      if (b === this.runs_left + 1 && !this.results[this.nruns - b].r[a])
        if (null === d) this.results[this.nruns - b].r[a + 1] = {
          t: null,
          state: null,
          run: b
        };
        else if (c = {
          start: c,
          end: (new Date).getTime(),
          t: null,
          state: d,
          run: b
        }, d && (c.t = c.end - c.start), this.results[this.nruns - b].r[a] = c, a >= e.end - 1 || "undefined" !== typeof this.results[this.nruns -
          b].r[a + 1]) BOOMR.debug(this.results[this.nruns - b], "LAT"), b === this.nruns && (e.start = a), this.defer(this.iterate)
    },
    finish: function() {
      this.latency || (this.latency = this.calc_latency());
      var a = {
        wtl: this.latency.mean,
        wtle: parseFloat(this.latency.stderr, 10)
      };
      BOOMR.addVar(a);
      BOOMR.utils.setCookie(this.cookie, {
        l: a.wtl,
        l_err: a.wtle
      }, this.cookie_exp);
      this.complete = !0;
      BOOMR.sendBeacon();
      this.running = !1
    },
    iterate: function() {
      if (this.aborted) return !1;
      this.latency_runs ? this.latency_runs && this.load_img("l", this.latency_runs--,
        this.lat_loaded) : this.finish()
    },
    setVarsFromCookie: function(a) {
      var c = parseInt(a.l, 10) || 0,
        b = parseFloat(a.le, 10) || 0;
      a = parseInt(a.t, 10);
      var d = Math.round((new Date).getTime() / 1E3);
      return a >= d - this.cookie_exp && 0 < c ? (this.complete = !0, BOOMR.addVar({
        lat: c,
        lat_err: b
      }), !0) : !1
    }
  };
  BOOMR.plugins.LAT = {
    init: function(a) {
      this.implf(a)
    },
    implf: function(a) {
      var c;
      d.user_ip = "127.0.0.1";
      if (d.initialized) return this;
      BOOMR.utils.pluginConfig(d, a, "LAT", "enabled base_url timeout nruns cookie cookie_exp day".split(" "));
      if (!1 ==
        d.enabled) return this;
      if (c = BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(d.cookie))) return d.complete = !0, this;
      d.day && (d.cookie_exp = 86400 * d.day);
      a && a.user_ip && (d.user_ip = a.user_ip);
      if (!d.base_url) return this;
      e.start = 0;
      d.runs_left = d.nruns;
      d.latency_runs = 5;
      d.results = [];
      d.latencies = [];
      d.latency = null;
      d.complete = !1;
      d.aborted = !1;
      c && c.ba && d.setVarsFromCookie(c) || (BOOMR.subscribe("page_ready", this.run, null, this), BOOMR.subscribe("page_unload", this.skip, null, this));
      d.initialized = !0;
      return this
    },
    run: function() {
      if (d.running ||
        d.complete) return this;
      if ("https" === BOOMR.window.location.protocol) return BOOMR.info("HTTPS detected, skipping bandwidth test", "LAT"), d.complete = !0, BOOMR.sendBeacon(), this;
      d.running = !0;
      setTimeout(this.abort, d.timeout);
      d.defer(d.iterate);
      return this
    },
    abort: function() {
      d.aborted = !0;
      d.running && d.finish();
      return this
    },
    skip: function() {
      this.abort();
      d.complete || (d.complete = !0, BOOMR.sendBeacon());
      return this
    },
    is_complete: function() {
      return d.complete
    }
  }
})();
(function() {
  BOOMR = BOOMR || {};
  BOOMR.plugins = BOOMR.plugins || {};
  var e = {
    complete: !1,
    done: function() {
      var d = BOOMR.window,
        a, c;
      (a = d.performance || d.msPerformance || d.webkitPerformance || d.mozPerformance) && a.timing && a.navigation && (BOOMR.info("This user agent supports NavigationTiming.", "nt"), a = a.timing, c = {
        wtdn: a.domainLookupEnd - a.domainLookupStart,
        wtfb: 0 > a.responseStart - a.navigationStart || 1E10 < a.responseStart - a.navigationStart ? 0 : a.responseStart - a.navigationStart,
        wtit: 0 > a.domInteractive - a.navigationStart || 1E10 <
          a.domInteractive - a.navigationStart ? 0 : a.domInteractive - a.navigationStart,
        wtlt: 0 > a.domComplete - a.navigationStart || 1E10 < a.domComplete - a.navigationStart ? 0 : a.domComplete - a.navigationStart
      }, a.secureConnectionStart && (c.nt_ssl_st = a.secureConnectionStart), a.msFirstPaint && (c.nt_first_paint = a.msFirstPaint), BOOMR.addVar(c));
      d.chrome && d.chrome.loadTimes && (a = d.chrome.loadTimes()) && (c = {}, BOOMR.addVar(c));
      this.complete = !0;
      BOOMR.sendBeacon()
    }
  };
  BOOMR.plugins.NavigationTiming = {
    init: function() {
      BOOMR.subscribe("page_ready",
        e.done, null, e);
      return this
    },
    is_complete: function() {
      return e.complete
    }
  }
})();
(function(e) {
  BOOMR = BOOMR || {};
  BOOMR.plugins = BOOMR.plugins || {};
  var d = {
    userid: "",
    siteid: "",
    cookie: "userinfo",
    cookie_exp: 30758400,
    onclick: function(a) {
      a && a && a.nodeName.toUpperCase()
    },
    getcookies: function() {
      var a = {
        wtud: this.userid,
        wtsd: this.siteid,
        wtsr: BOOMR.utils.getScreenResolution(),
        wttt: BOOMR.utils.getDocumentTitle()
      };
      BOOMR.addVar(a)
    },
    setcookie: function() {
      this.userid = this.userid.domainhash + "-" + this.userid.randomid + "-" + this.userid.initialtime;
      BOOMR.utils.setCookie(this.cookie, {
          userid: this.userid,
          siteid: this.siteid
        },
        this.cookie_exp);
      this.getcookies()
    }
  };
  BOOMR.plugins.uuid = {
    init: function(a) {
      this.implf(a)
    },
    implf: function(a) {
      d.userid = BOOMR.utils.genMac();
      var c = ["siteid"];
      (cookies = BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(d.cookie))) && cookies.siteid ? (d.siteid = a.userid.siteid, d.userid = cookies.userid, d.getcookies()) : (BOOMR.utils.pluginConfig(d, a, "userid", c), d.setcookie());
      return this
    },
    is_complete: function() {
      return this
    }
  }
})(window);

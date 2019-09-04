/*!
 * 
 *         description:  友云音web数据采集jssdk
 *         author: Yonyou YYY FED Team
 *         date: 2018-12-5
 *         file: yonyou-yyy.js
 *         version: 1.1.4.alpha
 */
window.YyyConfig = {
    tid: "rQOpAbxLHL4494749839",
    appid: "THBkyfdlWy4499797622",
    host: location.protocol + "//" + location.hostname + ("https:" === location.protocol ? ":4574": ":4575"),
    version: "v.3.1.0.JS20181206_beta"
},
function(e) {
    var t = {};
    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n),
        o.l = !0,
        o.exports
    }
    n.m = e,
    n.c = t,
    n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    },
    n.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    },
    n.n = function(e) {
        var t = e && e.__esModule ?
        function() {
            return e["default"]
        }: function() {
            return e
        };
        return n.d(t, "a", t),
        t
    },
    n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    },
    n.p = "",
    n(n.s = 49)
} ([function(e, t) {
    t.__esModule = !0,
    t.encodeUri = function(e) {
        return window.encodeURIComponent ? window.encodeURIComponent(e) : e
    },
    t.decodeUri = function(e) {
        return window.decodeURIComponent ? window.decodeURIComponent(e) : e
    },
    t.now = function() {
        return + new Date
    }
},
function(e, t, n) {
    t.__esModule = !0;
    var r, o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    },
    a = n(10),
    i = n(0),
    u = n(6),
    d = (r = u) && r.__esModule ? r: {
        "default": r
    };
    var l, s = {};
    s.lang = {
        isTypeOf: function(e, t) {
            return "[object " + t + "]" === {}.toString.call(e)
        },
        isNumeric: function(e) {
            return this.isTypeOf(e, "Number") && isFinite(e)
        },
        isString: function(e) {
            return this.isTypeOf(e, "String")
        },
        isFunction: function(e) {
            return this.isTypeOf(e, "Function")
        },
        isArray: Array.isArray ||
        function(e) {
            return this.isTypeOf(e, "Array")
        },
        isBoolean: function(e) {
            return this.isTypeOf(e, "Boolean")
        },
        isPlainObject: function(e) {
            return this.isTypeOf(e, "Object")
        }
    },
    s.cookie = {
        get: function(e) {
            d["default"].time("cookie reads");
            for (var t = void 0,
            n = new RegExp("(^| )" + e + "=([^;]*)(;|$)", "g"); null !== (t = n.exec(document.cookie));) if (t[2] && "null" !== t[2]) return d["default"].timeEnd("cookie reads"),
            t[2];
            return d["default"].timeEnd("cookie reads"),
            ""
        },
        set: function(e, t, n) {
            var r = void 0; (n = n || {}).expires && (r = new Date).setTime(r.getTime() + n.expires);
            var o = e + "=" + t + (n.domain ? "; domain=" + n.domain: "") + (n.path ? "; path=" + n.path: "") + (r ? "; expires=" + r.toGMTString() : "") + (n.secure ? "; secure": "");
            d["default"].log("cookie bs(" + e + ") size: " + o.length),
            d["default"].time("cookie writes"),
            document.cookie = o,
            d["default"].timeEnd("cookie writes")
        }
    },
    s.localStorage = {
        userDataStorage: function() {
            if (!s.localStorage.g) try {
                s.localStorage.g = document.createElement("input"),
                s.localStorage.g.type = "hidden",
                s.localStorage.g.style.display = "none",
                s.localStorage.g.addBehavior("#default#userData"),
                document.getElementsByTagName("head")[0].appendChild(s.localStorage.g)
            } catch(e) {
                return ! 1
            }
            return ! 0
        },
        get: function(e) {
            if (window.localStorage) {
                var t = void 0;
                if (t = window.localStorage.getItem(e)) {
                    var n = t.indexOf("|"),
                    r = +t.substring(0, n);
                    if (r && r > (new Date).getTime()) return t.substring(n + 1)
                }
            } else if (s.localStorage.userDataStorage()) try {
                return s.localStorage.g.load(document.location.hostname),
                s.localStorage.g.getAttribute(e)
            } catch(r) {}
            return null
        },
        set: function(e, t, n) {
            var r = new Date;
            r.setTime(r.getTime() + (n.expires || 31536e6));
            try {
                window.localStorage ? (t = r.getTime() + "|" + t, window.localStorage.setItem(e, t)) : s.localStorage.userDataStorage() && (s.localStorage.g.expires = r.toUTCString(), s.localStorage.g.load(document.location.hostname), s.localStorage.g.setAttribute(e, t), s.localStorage.g.save(document.location.hostname))
            } catch(o) {}
        },
        remove: function(e) {
            if (window.localStorage) window.localStorage.removeItem(e);
            else if (s.localStorage.userDataStorage()) try {
                s.localStorage.g.load(document.location.hostname),
                s.localStorage.g.removeAttribute(e),
                s.localStorage.g.save(document.location.hostname)
            } catch(t) {}
        }
    },
    s.sessionStorage = {
        set: function(e, t) {
            if (window.sessionStorage) try {
                window.sessionStorage.setItem(e, t)
            } catch(n) {}
        },
        get: function(e) {
            return window.sessionStorage ? window.sessionStorage.getItem(e) : null
        },
        remove: function(e) {
            window.sessionStorage && window.sessionStorage.removeItem(e)
        }
    },
    s.indexedDB = {
        "with": function() {
            var e = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;
            window.IDBTransaction || window.webkitIDBTransaction,
            window.IDBKeyRange || window.webkitIDBKeyRange;
            function t(e) {
                d["default"].log("IndexedDB error " + e.code + ": " + e.message)
            }
            return function(n, r) {
                var o = e.open(n);
                o.onerror = t,
                o.onsuccess = function() {
                    var e = o.result;
                    e.version && r(e)
                }
            }
        } ()
    },
    s.memStorage = (l = {},
    {
        set: function(e, t, n) {
            l[e] = t,
            n.expires && setTimeout(function() {
                delete l[e]
            },
            n.expires)
        },
        get: function(e) {
            return l[e]
        },
        remove: function(e) {
            delete l[e]
        }
    }),
    s.dom = {
        hasExactClass: function(e, t) {
            return !! e && (e.classList ? e.classList.contains(t) : !!e.className &&
            function(e) {
                return new RegExp("(^|\\s+)" + e + "(\\s+|$)")
            } (t).test(e.className))
        },
        hasClass: function(e, t) {
            return !! e && (!(!e.className || !s.lang.isString(e.className)) && e.className.indexOf(t) > -1)
        },
        tree: function(e) {
            for (var t = [], n = (e.tagName || e.nodeName).toLowerCase(); e && "body" !== (n = (e.tagName || e.nodeName).toLowerCase()) && "html" !== n;) t.unshift(e),
            e = e.parentNode;
            return t
        },
        getNodeAttr: function(e, t) {
            return e.hasAttribute && e.getAttribute(t) || ""
        },
        nodePath: function(e) {
            var t = (e.tagName || e.nodeName).toLowerCase(),
            n = e.hasAttribute("id") && !e.getAttribute("id").match(/^[0-9]/) && e.getAttribute("id"),
            r = void 0;
            if ("input" === t && e.hasAttribute("name") && e.getAttribute("name")) r = [e.getAttribute("name")];
            else {
                var o = void 0,
                i = void 0; (o = e.getAttribute("class")) && (i = (0, a.trim)(o.replace(/(^| )(clear|clearfix|active|hover|enabled|hidden|display|focus|disabled|ycm-|ng-)[^\. ]*/g, ""))),
                i && i.length && (r = i.split(/\s+/).sort())
            }
            var u = "/" + t;
            if (n && (u += "#" + n), r) for (var d = 0,
            l = r.length; l > d; d++) u += "." + r[d];
            return u
        },
        calculateXpath: function(e) {
            var t = "";
            if (e.hasAttribute) for (var n = this.tree(e), r = 0, o = n.length; r < o; r++) t += this.nodePath(n[r]);
            return t
        },
        closest: function(e, t, n) {
            n = s.lang.isNumeric(n) ? n: 100;
            for (var r = 0; e && r++<n;) {
                if (t(e)) return e;
                e = e.parentNode
            }
            return null
        }
    },
    s.getValueOfUrlParam = function(e, t) {
        var n = new RegExp(e + "=([\\.\\/\\w\\u0080-\\uFFFF_-]+)", "i"),
        r = void 0;
        if (s.lang.isString(t) && (t = t.split(",")), s.lang.isTypeOf(t, "Array")) for (var o = 0; o < t.length; o++) {
            if (r = (r = (0, i.decodeUri)(t[o]).match(n)) && r[1]) break
        }
        return r || ""
    },
    s.getUrlParams = function(e) {
        var t = void 0,
        n = void 0;
        if (null !== (n = (0, i.decodeUri)(e).match(/\?(.*)/))) {
            t = {},
            n = n[1];
            for (var r = /([\w_-]+)=([\w\u0080-\uFFFF_-]+)/g,
            o = void 0; null !== (o = r.exec(n));) 3 === o.length && (t[o[1]] = o[2])
        }
        return t
    },
    s.getRandomStr = function(e) {
        for (var t = e || 8,
        n = "",
        r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""), o = 0; t > o; o++) n += r[Math.floor(Math.random() * r.length)];
        return n
    },
    s.lengthOf = function(e) {
        return "string" == typeof e ? e.length: window.ArrayBuffer && e instanceof ArrayBuffer ? e.byteLength: window.Blob && e instanceof Blob ? e.size: e && e.length ? e.length: 0
    },
    s.extend = function() {
        var e = void 0,
        t = void 0,
        n = void 0,
        r = void 0,
        a = void 0,
        i = void 0,
        u = arguments[0] || {},
        d = 1,
        l = arguments.length,
        f = !1;
        for ("boolean" == typeof u && (f = u, u = arguments[d] || {},
        d++), "object" === (void 0 === u ? "undefined": o(u)) || s.lang.isFunction(u) || (u = {}); d < l; d++) if (null != (a = arguments[d])) for (r in a) e = u[r],
        u !== (n = a[r]) && (f && n && (s.lang.isPlainObject(n) || (t = s.lang.isArray(n))) ? (t ? (t = !1, i = e && s.lang.isArray(e) ? e: []) : i = e && s.lang.isPlainObject(e) ? e: {},
        u[r] = s.extend(f, i, n)) : n !== undefined && (u[r] = n));
        return u
    },
    t["default"] = s
},
function(e, t) {
    t.__esModule = !0;
    t["default"] = {
        DOM_COMPLETE: "dom-complete",
        PAGE_LOADED: "page-loaded",
        PAGE_UNLOAD: "page-unload",
        SEND_BEACON: "send-beacon",
        SEND_ABORT: "send-abort",
        CORDOVA_READY: "cordovaHTTP-loaded",
        BS_START: "business-started",
        BS_END: "business-ended",
        BS_ABORT: "business-aborted",
        BS_UPDATE: "business-updated",
        BS_FETCH: "business-fetch",
        CIRCLE_START: "circle:start",
        CIRCLE_STOP: "circle:stop",
        CIRCLE_PAGE_ON: "circle:page:on",
        CIRCLE_PAGE_OFF: "circle:page:off"
    }
},
function(e, t, n) {
    t.__esModule = !0;
    var r, o = n(9),
    a = (r = o) && r.__esModule ? r: {
        "default": r
    };
    var i = window._yyy_EE;
    i || (i = window._yyy_EE = function() {
        var e = {};
        function t(t) {
            return e[t] || []
        }
        return {
            subscribe: function(n, r) {
                e[n] = t(n).concat(r)
            },
            unsubscribe: function(t, n) {
                e[t] && e[t].splice(a["default"].indexOf(e[t], n) >>> 0, 1)
            },
            publish: function(e, n) {
                for (var r = t(e), o = Array.prototype.slice.call(arguments, 1), a = 0; a < r.length; a++) r[a].apply(null, o)
            }
        }
    } ()),
    t["default"] = i
},
function(module, exports, __webpack_require__) {
    exports.__esModule = !0;
    var _global = __webpack_require__(13),
    _global2 = _interopRequireDefault(_global),
    _base = __webpack_require__(0),
    _eventEmitter = __webpack_require__(3),
    _eventEmitter2 = _interopRequireDefault(_eventEmitter),
    _eventType = __webpack_require__(2),
    _eventType2 = _interopRequireDefault(_eventType),
    _tools = __webpack_require__(7),
    _tools2 = _interopRequireDefault(_tools),
    _utils = __webpack_require__(1),
    _utils2 = _interopRequireDefault(_utils),
    _arrays = __webpack_require__(9),
    _arrays2 = _interopRequireDefault(_arrays),
    _events = __webpack_require__(11),
    _events2 = _interopRequireDefault(_events),
    _registerInfo = __webpack_require__(12),
    _registerInfo2 = _interopRequireDefault(_registerInfo);
    function _interopRequireDefault(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var startTime = _global2["default"].sdkStartTime,
    yy_rum = {
        start: startTime,
        loaded: !1,
        loadTime: 0,
        errors: [],
        errorRecorded: {},
        xhrOnload: [],
        timerOn: !1,
        sendTimer: function() {
            yy_rum.timerOn && (_eventEmitter2["default"].publish(_eventType2["default"].SEND_BEACON), setTimeout(yy_rum.sendTimer, 1e3))
        },
        startSendTimer: function() {
            this.timerOn = !0,
            this.sendTimer()
        },
        stopSendTimer: function() {
            this.timerOn = !1
        },
        ready: function() {
            return yy_rum.loaded
        },
        initend: function() {
            yy_rum.endTime || (_eventEmitter2["default"].publish(_eventType2["default"].DOM_COMPLETE), yy_rum.endTime = (0, _base.now)(), this.startSendTimer())
        }
    };
    function domContentLoaded() {
        yy_rum.initend()
    }
    function domComplete() {
        "complete" === document.readyState && yy_rum.initend()
    }
    function load(e) {
        function t() {
            _eventEmitter2["default"].publish(_eventType2["default"].PAGE_LOADED)
        }
        yy_rum.loaded || (yy_rum.initend(), yy_rum.loaded = !0, yy_rum.loadTime = (0, _base.now)(), 9 === e ? t() : setTimeout(t, 0))
    }
    function unload() {
        unloaded || load(9),
        _eventEmitter2["default"].publish(_eventType2["default"].PAGE_UNLOAD),
        unloaded = !0
    }
    exports["default"] = yy_rum;
    for (var unloaded = !1,
    winEvent = [["load", load], ["beforeunload", unload], ["pagehide", unload], ["unload", unload]], i = 0; i < winEvent.length; i++) _events2["default"].addEventListener(window, winEvent[i][0], winEvent[i][1], !1);
    for (var events = [["DOMContentLoaded", domContentLoaded], ["readystatechange", domComplete]], n = 0; n < events.length; n++) _events2["default"].addEventListener(document, events[n][0], events[n][1], !1);
    _arrays2["default"].each(["setTimeout", "setInterval"],
    function(timer) {
        function getCbId(e) {
            var t = "";
            return "string" == typeof e ? t = e: "function" == typeof e && (t = e._cbId),
            t || (t = e.name ? e.name + "_" + _utils2["default"].getRandomStr(12) : _utils2["default"].getRandomStr(12), e._cbId = t),
            t
        }
        yy_rum.cyclicTimer = {},
        _tools2["default"].wrap(!0, window, timer,
        function(origTimer) {
            return function(callback, millisec, param) {
                if (!callback) return origTimer(callback, millisec, param);
                var args = Array.prototype.slice.call(arguments, 2),
                cbId = getCbId(callback);
                function wrappedCode() {
                    yy_rum.cbId = cbId,
                    yy_rum.inTimer = yy_rum.cyclicTimer[yy_rum.cbId],
                    "string" == typeof callback ? eval(callback) : "function" == typeof callback && callback.apply(null, args),
                    yy_rum.inTimer && (yy_rum.inTimer = !1, yy_rum.cbId = null)
                }
                return yy_rum.inTimer ? yy_rum.cyclicTimer[cbId] = !0 : yy_rum.cyclicTimer[cbId] = "setInterval" === timer || yy_rum.cbId === cbId,
                origTimer(wrappedCode, millisec)
            }
        })
    }),
    _utils2["default"].cookie.set("_yyy_appid", _registerInfo2["default"].appid, {
        path: "/"
    })
},
function(e, t) {
    t.__esModule = !0;
    t.DATA_TYPE = {
        PF: "pf",
        ERR: "err",
        XHR: "xhr",
        MUT: "mut",
        BN: "bn"
    }
},
function(e, t) {
    t.__esModule = !0;
    var n = {
        log: function() {
            window.console && (window.console.log.apply ? window.console.log.apply(window.console, arguments) : window.console.log(arguments))
        },
        error: function() {
            window.console && (window.console.error.apply ? window.console.error.apply(window.console, arguments) : window.console.error(arguments))
        },
        time: function() {
            window.console && window.console.time && window.console.time.apply && window.console.time.apply(window.console, arguments)
        },
        timeEnd: function() {
            window.console && window.console.timeEnd && window.console.timeEnd.apply && window.console.timeEnd.apply(window.console, arguments)
        }
    };
    t["default"] = n
},
function(e, t) {
    t.__esModule = !0;
    t["default"] = {
        wrap: function(e, t, n, r, o) {
            var a = void 0;
            try {
                a = t[n]
            } catch(i) {
                if (!e) return ! 1
            }
            if (!a && !e) return ! 1;
            if (a && a._yy_wrap) return ! 1;
            try {
                t[n] = r(a, o)
            } catch(i) {
                return ! 1
            }
            return t[n]._yy_wrap = [a],
            !0
        },
        unwrap: function(e, t) {
            try {
                var n = e[t]._yy_wrap;
                n && (e[t] = n[0])
            } catch(r) {}
        },
        asArray: function() {
            for (var e = [], t = 0; t < arguments.length; t++) e.push(arguments[t]);
            return e
        }
    }
},
function(e, t, n) {
    t.__esModule = !0;
    var r = l(n(1)),
    o = n(0),
    a = l(n(9)),
    i = l(n(24)),
    u = n(10),
    d = l(n(20));
    function l(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var s = !1,
    f = "_yyy_user_id",
    c = d["default"].cookie ? r["default"].cookie: d["default"].localStorage ? r["default"].localStorage: r["default"].memStorage,
    p = {},
    m = ["userid", "username"];
    function g() {
        var e = c.get(f);
        if (y.traceId) {
            var t = y.traceId;
            try {
                c.set(f, t, {
                    domain: location.hostname,
                    path: "/"
                })
            } catch(n) {}
        } else if (!e || !(0, u.startsWith)(e, "yuc-")) {
            e = "yuc-" + r["default"].getRandomStr(16);
            try {
                c.set(f, e, {
                    domain: location.hostname,
                    path: "/",
                    expires: 31536e6
                })
            } catch(o) {}
        }
        return e
    }
    var y = {
        traceId: null,
        getUserId: function() {
            var e = void 0,
            t = r["default"].lang,
            n = r["default"].cookie,
            a = p.userid;
            return a && (e = (t.isNumeric(a) || t.isString(a)) && a || t.isTypeOf(a, "Function") && a()),
            e = e || n.get("p_userId") && (0, o.decodeUri)(n.get("p_userId")) || n.get("usercode") && (0, o.decodeUri)(n.get("usercode")) || n.get("yonyou_uid") && (0, o.decodeUri)(n.get("yonyou_uid")) || c.get(f) || g() || "",
            (0, u.trim)(e).toLowerCase()
        },
        getUsername: function() {
            var e = void 0,
            t = r["default"].lang,
            n = r["default"].cookie,
            a = p.username;
            return a && (e = (t.isNumeric(a) || t.isString(a)) && a || t.isTypeOf(a, "Function") && a()),
            e = e || n.get("yonyou_uname") && (0, o.decodeUri)(n.get("yonyou_uname")) || "",
            (0, u.trim)(e).toLowerCase()
        },
        getMetrics: function(e) {
            s || this.load();
            var t = {},
            n = r["default"].lang;
            for (var o in p) p.hasOwnProperty(o) && -1 === a["default"].indexOf(m, o) && (t[o] = (n.isNumeric(p[o]) || n.isString(p[o])) && p[o] || n.isFunction(p[o]) && p[o]() || "");
            for (var i in h) h.hasOwnProperty(i) && (t[i] = h[i].call(y));
            return e ? t[e] : t
        }
    },
    h = {
        uc: y.getUserId,
        username: y.getUsername
    };
    function _(e) {
        if (e) for (var t = e.split("."), n = y, r = 0, o = t.length, a = o - 1; r < o; r++) {
            var i = t[r];
            "undefined" == typeof n[i] && (n[i] = r < a ? {}: null),
            n = n[i]
        }
    } !
    function() {
        if (_("http.status"), _("page.name"), _("track.ignore.empty"), _("track.ignore.xhr"), _("track.dom.mutation"), !s) {
            g();
            var e = i["default"].getUserVars();
            for (var t in e) if (e.hasOwnProperty(t)) if ((0, u.startsWith)(t, "track") || (0, u.startsWith)(t, "page") || (0, u.startsWith)(t, "http")) {
                for (var n = t.split("."), r = 0, o = y; r < n.length - 1;) o[n[r]] || (o[n[r]] = {}),
                o = o[n[r]],
                r++;
                o[n[r]] = e[t]
            } else p[t] = e[t];
            s = !0
        }
    } (),
    t["default"] = y
},
function(e, t) {
    t.__esModule = !0;
    var n = {
        indexOf: function(e, t) {
            if (Array.prototype.indexOf) return e.indexOf(t);
            for (var n = 0,
            r = e.length; n < r; n++) {
                if (e[n] === t) return n
            }
            return - 1
        },
        each: function(e, t) {
            if (e) {
                var n = void 0;
                for (n = 0; n < e.length; n++) e[n] && t(e[n], n, e)
            }
        }
    };
    t["default"] = n
},
function(e, t) {
    t.__esModule = !0;
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    };
    function r(e, t, n) {
        return String.prototype.startsWith ? String.prototype.startsWith.call(e, t, n) : (n = n || 0, e.indexOf(t, n) === n)
    }
    function o(e) {
        return null === e || e === undefined ? "": String.prototype.trim ? String.prototype.trim.call(e) : e.toString().replace(/^\s+/, "").replace(/\s+$/, "")
    }
    function a(e) {
        if (window.JSON) return window.JSON.stringify(e);
        switch (void 0 === e ? "undefined": n(e)) {
        case "object":
            if (!e) return "null";
            var t = void 0,
            r = 0;
            if (e instanceof Array) {
                for (t = "["; r < e.length; r++) t += (r > 0 ? ",": "") + a(e[r]);
                return t + "]"
            }
            for (var o in t = "{",
            e) if (e.hasOwnProperty(o) && "function" != typeof e[o]) {
                var i = a(e[o]);
                t += (r > 0 ? ",": "") + a(o) + ":" + i,
                r++
            }
            return t + "}";
        case "string":
            return '"' + e.replace(/(["\\])/g, "\\$1").replace(/\n/g, "\\n") + '"';
        case "number":
            return e.toString();
        case "boolean":
            return e ? "true": "false";
        case "function":
            return a(e.toString());
        case "undefined":
        default:
            return '"undefined"'
        }
    }
    function i(e) {
        return e && "string" == typeof e ? (window.JSON ? window.JSON.parse: function(e) {
            return new Function("return " + e)()
        })(e) : null
    }
    t.startsWith = r,
    t.trim = o,
    t.stringify = a,
    t.toJSON = i;
    var u = {
        startsWith: r,
        trim: o,
        stringify: a,
        toJSON: i
    };
    t["default"] = u
},
function(e, t) {
    t.__esModule = !0;
    t["default"] = {
        addEventListener: function(e, t, n, r) {
            e.addEventListener ? e.addEventListener(t, n, r) : e.attachEvent && e.attachEvent("on" + t, n)
        },
        removeEventListener: function(e, t, n, r) {
            e.removeEventListener ? e.removeEventListener(t, n, r) : e.detachEvent && e.detachEvent("on" + t, n)
        }
    }
},
function(e, t) {
    t.__esModule = !0;
    var n = {
        tid: window.YyyConfig.tid,
        appid: window.YyyConfig.appid
    };
    t["default"] = n
},
function(e, t, n) {
    t.__esModule = !0;
    var r, o = n(0),
    a = n(1),
    i = (r = a) && r.__esModule ? r: {
        "default": r
    };
    window._yyy || (window._yyy = {
        push: function() {
            Array.prototype.push.apply(window._yyy, arguments)
        }
    });
    var u = window._yyy;
    u.sdkId = i["default"].getRandomStr(),
    u.sdkVersion = "1.1.3.alpha",
    u.buVersion = window.YyyConfig.version,
    u.sdkStartTime = window.performance && window.performance.timing && window.performance.timing.navigationStart || (0, o.now)(),
    t["default"] = u
},
function(e, t, n) {
    t.__esModule = !0;
    var r, o = n(0),
    a = n(19),
    i = (r = a) && r.__esModule ? r: {
        "default": r
    },
    u = n(10);
    function d(e) {
        return (0, o.encodeUri)(e)
    }
    var l = {
        options: {
            compress: !1,
            urlEncode: !1,
            needResponse: !1
        },
        setOptions: function(e) {
            for (var t in e) e.hasOwnProperty(t) && (this.options[t] = e[t])
        },
        jsonp: function(e, t, n) {
            var r = document.createElement("script");
            r.type = "text/javascript",
            r.src = e + "&jsonp=" + n;
            var o = document.getElementsByTagName("script")[0];
            return o.parentNode.insertBefore(r, o),
            r
        },
        xhr: function(e, t) {
            var n = new XMLHttpRequest;
            n.open("POST", e, !0);
            try {
                "withCredentials" in n && (n.withCredentials = !0)
            } catch(r) {}
            return n.setRequestHeader("content-type", "text/plain"),
            n.send(t),
            n
        },
        img: function(e) {
            var t = i["default"].beacon_img();
            t += "&data=" + e;
            var n = new Image;
            return n.src = t,
            n
        },
        beacon: function(e) {
            var t = i["default"].beacon();
            return navigator.sendBeacon(t, e)
        }
    },
    s = !!navigator.sendBeacon;
    l.send = function(e, t) {
        e = (0, u.stringify)([e]);
        var n = void 0;
        return n = s ? l.beacon(e) : !((e = d(d(e))).length > 4096) && l.img(e),
        t && t(n),
        n
    },
    t["default"] = {
        setOptions: l.setOptions,
        send: l.send
    }
},
function(e, t, n) {
    t.__esModule = !0;
    var r = n(0),
    o = v(n(1)),
    a = v(n(11)),
    i = v(n(4)),
    u = n(10),
    d = v(n(3)),
    l = v(n(2)),
    s = v(n(23)),
    f = v(n(6)),
    c = v(n(9)),
    p = v(n(22)),
    m = v(n(48)),
    g = v(n(13)),
    y = v(n(47)),
    h = v(n(20)),
    _ = v(n(8));
    function v(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    n(46);
    var w = 0,
    b = o["default"].cookie,
    S = function() {
        var e = g["default"].sdkId,
        t = "_yyy_bs_",
        n = document.referrer.replace(location.origin, "");
        f["default"].time(e + " - md5 referrer - " + n);
        var v = m["default"].hex(n);
        f["default"].timeEnd(e + " - md5 referrer - " + n),
        f["default"].time(e + " - md5 current path - " + location.pathname);
        var S = m["default"].hex(location.pathname);
        f["default"].timeEnd(e + " - md5 current path - " + location.pathname);
        var T = o["default"].dom,
        E = window.self !== window.top,
        A = void 0,
        x = void 0,
        O = void 0,
        M = void 0,
        R = void 0,
        C = 5e3;
        function N() {
            return "JS_" + o["default"].getRandomStr() + ((0, r.now)() + "").substring(5)
        }
        function D(e) {
            var t = {
                bid: "",
                ba: "",
                bt: null,
                ig: 0,
                nt: !i["default"].loaded && p["default"].Document || p["default"].Element,
                nodeAttr: {}
            },
            n = [],
            a = void 0;
            if (t.bt = (0, r.now)(), t.bid = N(), e) {
                var d = e.srcElement || e.target,
                l = (d.tagName || d.nodeName || "").toUpperCase(),
                s = void 0,
                m = void 0,
                g = void 0;
                if (function(e) {
                    var t = (e.tagName || e.nodeName || "").toLowerCase();
                    return "body" === t || "html" === t || t.indexOf("document") > -1 || "textarea" === t || "input" === t && -1 === c["default"].indexOf(["button", "submit"], e.type)
                } (d)) return t.ig = 1,
                t; - 1 !== c["default"].indexOf(["I", "SPAN"], l) && d.parentNode && -1 !== c["default"].indexOf(["A", "BUTTON"], (d.parentNode.tagName || d.parentNode.nodeName).toUpperCase()) && (l = ((d = d.parentNode).tagName || d.nodeName || "").toUpperCase());
                var y = void 0;
                if ( - 1 !== c["default"].indexOf(["SVG", "PATH", "USE"], l) && (y = o["default"].dom.closest(d,
                function(e) {
                    return "SVG" === (e.tagName || e.nodeName).toUpperCase()
                },
                3)) && (d = y.parentNode ? y.parentNode: y), s = d.value || d.title || d.alt || d.innerText || d.textContent || "", m = T.getNodeAttr(d, "src") || T.getNodeAttr(d, "href"), g = T.calculateXpath(d) || "", s = (0, u.trim)(s.replace(/\s/g, "")), t.nodeAttr.value = s.substring(0, 20), t.nodeAttr.xpath = g, t.nodeAttr.href = m, !t.nodeAttr.value && _["default"].track.ignore.empty) return t.ig = 1,
                t
            }
            if (_["default"].page.name) o["default"].lang.isString(_["default"].page.name) ? a = _["default"].page.name: o["default"].lang.isFunction(_["default"].page.name) && (a = _["default"].page.name(location.href, e));
            else try {
                a = window.top.document.title
            } catch(h) {
                a = document.title
            }
            return a && n.push(a.replace(/\s+/g, "").substring(0, 50)),
            t.nodeAttr.value && n.push(t.nodeAttr.value),
            t.ba = n.join("#"),
            f["default"].log("cached ba is: " + M + " ... in frame: " + E),
            t
        }
        function k(e) {
            f["default"].time("compress bs");
            var n = y["default"].compressToEncodedURIComponent((0, u.stringify)(x));
            f["default"].timeEnd("compress bs"),
            b.set(t + e, n, {
                path: "/",
                expires: 12e4
            })
        }
        function I(e) {
            var n = null,
            r = b.get(t + e);
            return r && (f["default"].time("decompress bs"), n = (0, u.toJSON)(y["default"].decompressFromEncodedURIComponent(r)), f["default"].timeEnd("decompress bs")),
            n
        }
        function P() {
            var e = (0, r.now)();
            x.bid = N(),
            x.ig = 1,
            x.bt = e
        }
        function j() { (x = D()).bt = i["default"].start,
            f["default"].log("update bs >>> in frame: " + (top !== self) + " ===== in initBs"),
            k(S)
        }
        function L(e) {
            clearInterval(R),
            x = D(e),
            k(S),
            R = setInterval(P, C),
            f["default"].log("next ---- bid: " + x.bid + "; bt: " + x.bt),
            f["default"].log("update bs >>> in frame: " + (top !== self) + " =====  in nextBs")
        }
        if (window.performance && window.performance.navigation && (A = window.performance.navigation.type), E) {
            if (!h["default"].crossOrigin) if (top._yyy_EE) top._yyy_EE.publish(l["default"].BS_FETCH, !0,
            function(e) {
                x = e
            });
            else {
                var B = m["default"].hex(top.document.referrer.replace(location.origin, ""));
                x = I(B)
            }
            x && x.bid || j()
        } else "undefined" !== A && A === w ? "" === document.referrer ? j() : (x = I(v)) && x.bid || j() : j();
        O = o["default"].extend(!0, {},
        x),
        f["default"].log("bs on loading >>>  in frame: " + E + " >> bsOfContext: " + JSON.stringify(O)),
        R = setInterval(P, C),
        "mousedown,touchstart".replace(/\w+/g,
        function(e) {
            a["default"].addEventListener(document, e, L, !1)
        }),
        c["default"].each(["DOMMouseScroll", "mousewheel"],
        function(e) {});
        var U = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) ? "pagehide": "unload";
        function F(e, t) {
            f["default"].log("get info >>>   in frame: " + E + " ========= isOnLoad: " + !!e + " ========= bsOfContext: " + JSON.stringify(O) + " ======== bs: " + JSON.stringify(x));
            var n = void 0;
            return n = e && O && o["default"].extend(!0, {},
            O) || o["default"].extend(!0, {},
            x),
            o["default"].lang.isFunction(t) && t(n),
            f["default"].log("cached ba is: " + M + " ... in frame: " + E),
            n
        }
        return a["default"].addEventListener(window, U,
        function() {
            var e = I(S);
            e && d["default"].publish(l["default"].BS_ABORT, {
                lbid: e && e.bid || "",
                stg: s["default"].PAGE_UNLOADING
            }),
            !0,
            (x = D()).ba += "@unload"
        },
        !1),
        d["default"].subscribe(l["default"].BS_UPDATE,
        function(e) {
            x = e,
            f["default"].log("update bs >>> in frame: " + (top !== self) + " =====  on bs_update: new bs >> " + JSON.stringify(e)),
            k(S)
        }),
        d["default"].subscribe(l["default"].BS_FETCH, F),
        {
            getInfo: F
        }
    } ();
    t["default"] = S
},
function(e, t, n) {
    t.__esModule = !0;
    n(5);
    var r = i(n(1)),
    o = i(n(13)),
    a = i(n(12));
    function i(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var u = {
        tid: a["default"].tid,
        appid: a["default"].appid,
        sdkid: o["default"].sdkId,
        ua: navigator.userAgent,
        sh: window.screen.height,
        sw: window.screen.width,
        v: o["default"].buVersion,
        ip: "#~#~#~",
        jt: "web"
    },
    d = window.self !== window.top ? 1 : 0;
    var l = {
        get: function(e, t) {
            var n = {};
            return r["default"].extend(n, u, t),
            n.pt = e,
            n.inf = d,
            n
        }
    };
    t["default"] = l
},
function(e, t, n) {
    t.__esModule = !0;
    var r = n(0),
    o = f(n(4)),
    a = f(n(16)),
    i = f(n(19)),
    u = n(5),
    d = f(n(14)),
    l = f(n(2)),
    s = f(n(3));
    function f(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var c = {
        cache: {
            length: 0,
            data: {},
            put: function(e, t) {
                this.data[e] = t,
                ++this.length
            },
            get: function(e) {
                return this.data[e]
            },
            remove: function(e) {
                var t = this.data[e];
                return t && (delete this.data[e], --this.length),
                t
            }
        },
        data: [],
        snd_du: function() {
            return i["default"].adu ? 1e3 * i["default"].adu: 1e4
        },
        cc: function() {
            return i["default"].ac ? i["default"].ac: 10
        }
    };
    function p(e) {
        if ((o["default"].loaded || e) && (e || (e = !c.lastSend || (0, r.now)() - c.lastSend > c.snd_du() || c.data.length >= c.cc()), c.data.length > 0 && e)) {
            c.lastSend = (0, r.now)();
            var t = {};
            t.header = a["default"].get(u.DATA_TYPE.XHR);
            var n = c.data;
            if (t.content = n, !d["default"].send(t)) for (var i = function(e) {
                for (var t = [], n = 0; n < e.length; n++) {
                    var r = e[n],
                    o = Math.floor(n / 2);
                    t[o] = t[o] || [],
                    t[o].push(r)
                }
                return t
            } (n); i.length > 0;) t.content = i.pop(),
            d["default"].send(t);
            c.data = []
        }
    }
    s["default"].subscribe(l["default"].SEND_BEACON, p),
    s["default"].subscribe(l["default"].BS_ABORT,
    function(e) {
        var t = (e = e || {}).lbid,
        n = function() {
            var e = [],
            n = c.cache.data;
            for (var r in n) n.hasOwnProperty(r) && n[r].bid !== t && e.push(n[r]);
            return e
        } ();
        c.data = c.data.concat(n),
        p(!0)
    }),
    t["default"] = c
},
function(e, t) {
    t.__esModule = !0,
    t.fix = function(e) {
        if (e[6]) {
            var t = e[4],
            r = e[5];
            if (r && "string" == typeof r && t) {
                r = r.split(/\n/);
                var o = n.exec(r[0]);
                o || (o = n.exec(r[1])),
                o && o[1] !== t && (e[4] = o[1] || t, e[2] = o[2] || e[2], e[3] = o[3] || e[3])
            }
        }
    },
    t["default"] = function(e, t, n, r) {
        return e + ":" + (r || "") + ":" + t + ":" + n
    };
    var n = new RegExp("([a-z]+:/{2,3}.*):(\\d+):(\\d+)")
},
function(e, t, n) {
    t.__esModule = !0;
    var r = i(n(4)),
    o = n(10),
    a = i(n(12));
    function i(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var u = function() {
        var e = void 0;
        e = "https://yyy.yonyoucloud.com";
        var t = new Image;
        return t.src = e + "/ycm-appmonitor/img/bg-dot.png",
        t.onload = function() {
            d.host = e,
            d.sameScheme = (0, o.startsWith)(u, location.protocol)
        },
        a["default"].host || e
    } (),
    d = {
        host: u,
        beacon: function() {
            return d.host + "/send/api/browser?yyy=v3"
        },
        beacon_img: function() {
            return d.host + "/send/api/imgbrowser?yyy=v3"
        },
        ac: 5,
        adu: 10
    };
    r["default"].server = d,
    t["default"] = d
},
function(e, t, n) {
    t.__esModule = !0;
    var r, o = n(6),
    a = (r = o) && r.__esModule ? r: {
        "default": r
    };
    t["default"] = {
        isIE: !!document.documentMode,
        localStorage: !!window.localStorage,
        cookie: !(!document.cookie && !navigator.cookieEnabled) &&
        function() {
            if (document.cookie = "_yyy_w=1;path=/", document.cookie && document.cookie.indexOf("_yyy_w") > -1) {
                var e = new Date;
                return e.setTime(e.getTime() - 1),
                document.cookie = "_yyy_w=1;path=/;expires=" + e.toGMTString(),
                a["default"].log("cookie supported"),
                !0
            }
            return a["default"].log("cookie not support"),
            !1
        } (),
        mutationObserver: !!window.MutationObserver,
        crossOrigin: function() {
            try {
                return top.name,
                !1
            } catch(e) {
                return ! 0
            }
        } ()
    }
},
function(e, t) {
    t.__esModule = !0;
    var n = window.performance ? window.performance: window.Performance;
    t["default"] = n
},
function(e, t) {
    t.__esModule = !0;
    t["default"] = {
        Element: 1,
        Attr: 2,
        Text: 3,
        CDATASection: 4,
        EntityReference: 5,
        Entity: 6,
        ProcessingInstruction: 7,
        Comment: 8,
        Document: 9,
        DocumentType: 10,
        DocumentFragment: 11,
        Notation: 12
    }
},
function(e, t) {
    t.__esModule = !0;
    t["default"] = {
        PAGE_LOADING: "L",
        PAGE_LOADED: "D",
        PAGE_UNLOADING: "U"
    }
},
function(e, t, n) {
    t.__esModule = !0;
    var r, o = n(1),
    a = (r = o) && r.__esModule ? r: {
        "default": r
    };
    var i = {};
    var u = {};
    u.init = function() {
        var e = window._yyy;
        a["default"].lang.isArray(e) || e.length ?
        function() {
            for (var e = window._yyy; e.length > 0;) {
                var t = Array.prototype.pop.apply(e);
                a["default"].lang.isArray(t) && t.length > 1 && (i[t[0]] = t[1])
            }
        } () : a["default"].lang.isPlainObject(e)
    },
    u.getUserVars = function() {
        return i
    },
    t["default"] = u,
    e.exports = u
},
function(e, t, n) {
    t.__esModule = !0;
    var r = a(n(1)),
    o = a(n(12));
    function a(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var i = window._circle;
    if (!i) {
        var u = null !== window.self.name ? window.self.name: window.name;
        "ycmcw" !== u && (u = "ycmcw-inner-iframe");
        var d = void 0;
        d = "production" === Object({
            SDK_VERSION: "1.1.3.alpha"
        }).mode ? "https://yyy.yonyoucloud.com": "http://yyylab.yonyoucloud.com",
        i = window._circle = {
            tid: o["default"].tid,
            appid: o["default"].appid,
            name: u,
            id: r["default"].getRandomStr(),
            origin: d + "/ycm-appmonitor"
        }
    }
    t["default"] = i
},
function(e, t) {
    t.__esModule = !0;
    t["default"] = {
        CIRCLE_SYN: "register-SDK-option",
        CIRCLE_ACK: "register-SDK-circle"
    }
},
function(e, t) {
    t.__esModule = !0;
    var n = {
        canPostRegisterMessage: function() {
            return parent && "function" == typeof parent.postMessage && window.self !== window.top && window.self !== window.parent
        },
        spreadToInnerIframes: function(e) {
            for (var t = void 0,
            n = document.getElementsByTagName("iframe"), r = 0, o = [], a = n.length; a > r; r++) t = n[r],
            o.push(this.spread(e, t));
            return o
        },
        spread: function(e, t) {
            var n = null !== t && t.contentWindow;
            n && n.postMessage(e, "*")
        }
    };
    t["default"] = n
},
function(e, t, n) {
    var r = l(n(13)),
    o = l(n(27)),
    a = l(n(9)),
    i = l(n(26)),
    u = l(n(25)),
    d = l(n(11));
    function l(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var s, f = u["default"].origin + "/assets/javascripts/circle-gate.js";
    d["default"].addEventListener(window, "message",
    function(e) {
        var t = e.data,
        n = t.mode || t.circleMode;
        if (t.tid === u["default"].tid) switch (n) {
        case i["default"].CIRCLE_ACK:
            return function() {
                for (var e = document.getElementsByTagName("script"), t = 0, n = e.length; n > t; t++) {
                    var r = e[t].getAttribute("src");
                    if (r && -1 !== r.indexOf("/circle-gate.js")) return
                }
                var o = document.createElement("script");
                o.charset = "UTF-8",
                o.src = f,
                document.head.appendChild(o)
            } ();
        case i["default"].CIRCLE_SYN:
            return function(e) {
                var t = r["default"].sdkId;
                if (o["default"].canPostRegisterMessage() && "ycmcw" === u["default"].name && a["default"].indexOf(e.tArr, t) < 0) return e.tArr.push(t),
                parent.postMessage(e, "*")
            } (t)
        }
    }),
    s = void 0,
    o["default"].canPostRegisterMessage() && (s = {
        circleMode: i["default"].CIRCLE_SYN,
        url: window.location.toString(),
        tid: u["default"].tid,
        appid: u["default"].appid,
        sna: u["default"].name,
        sid: r["default"].sdkId,
        tgna: "",
        tgid: "",
        fsna: "sdk",
        tArr: [u["default"].id]
    },
    parent.postMessage(s, "*"))
},
function(e, t) {
    function n() {}
    t.__esModule = !0,
    n.prototype.removal = function(e, t, n) { !
        function(e, t) {
            var n = new MutationObserver(t);
            n.observe(e, {
                childList: !0,
                subtree: !0
            })
        } (e,
        function(e, r) {
            function o(e) {
                return e.parentNode !== document && (null === e.parentNode || o(e.parentNode))
            }
            if (t.length >= 0) for (var a = 0; a < t.length; a++) o(t[a]) && n();
            else o(t) && n();
            r.disconnect()
        })
    },
    n.prototype.addition = function(e, t, n) {};
    var r = new n;
    t["default"] = r
},
function(e, t) {
    t.__esModule = !0;
    t["default"] = {
        REMOVAL: "removal",
        ADDITION: "addition"
    }
},
function(e, t, n) {
    t.__esModule = !0;
    var r = g(n(3)),
    o = g(n(2)),
    a = g(n(6)),
    i = n(5),
    u = g(n(1)),
    d = n(0),
    l = g(n(8)),
    s = g(n(20)),
    f = g(n(16)),
    c = g(n(14)),
    p = g(n(30)),
    m = g(n(29));
    function g(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function y(e) {
        var t = {
            header: f["default"].get(i.DATA_TYPE.MUT),
            content: []
        },
        n = {
            bid: e.bid,
            jid: e.jid,
            tms: e.ts,
            tme: (0, d.now)(),
            uc: l["default"].getUserId().toLowerCase()
        };
        t.content.push(n),
        c["default"].send(t)
    } !
    function() {
        if (s["default"].mutationObserver) {
            var e = l["default"].track.dom.mutation;
            if (e) {
                u["default"].lang.isArray(e) || (e = [e]);
                for (var t = 0; t < e.length; t++) {
                    var n = e[t];
                    if (n.target) {
                        var f = function(e) {
                            return function(t) {
                                if (t && t.type === i.DATA_TYPE.XHR) {
                                    var n = top.document.body,
                                    l = top.document.querySelector(e.target);
                                    if (l) {
                                        a["default"].log("mutation observing");
                                        var s = e.mutation || p["default"].ADDITION;
                                        if (m["default"][s]) {
                                            var f = (0, d.now)(),
                                            c = u["default"].getRandomStr() + f;
                                            r["default"].publish(o["default"].BS_START, {
                                                bid: t.bid,
                                                jid: c,
                                                type: i.DATA_TYPE.MUT
                                            }),
                                            m["default"][s](n, l,
                                            function() {
                                                a["default"].log("mutation observed."),
                                                r["default"].publish(o["default"].BS_END, {
                                                    bid: t.bid,
                                                    jid: c,
                                                    type: i.DATA_TYPE.MUT
                                                }),
                                                y({
                                                    bid: t.bid,
                                                    jid: c,
                                                    ts: f
                                                })
                                            })
                                        }
                                    }
                                }
                            }
                        } (n);
                        r["default"].subscribe(o["default"].BS_END, f)
                    }
                }
            }
        }
    } (),
    t["default"] = {}
},
function(e, t, n) {
    t.__esModule = !0;
    var r = m(n(21)),
    o = m(n(4)),
    a = m(n(16)),
    i = n(5),
    u = m(n(3)),
    d = m(n(2)),
    l = m(n(1)),
    s = n(0),
    f = m(n(14)),
    c = m(n(6)),
    p = m(n(8));
    function m(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var g = {
        jid: l["default"].getRandomStr() + (0, s.now)(),
        trace_threshold: 0,
        resourceTimings: [],
        txid: l["default"].cookie.get("txid"),
        txtime: l["default"].cookie.get("txtime")
    };
    function y(e, t) {
        if (e) for (var n = t.length - 1; n >= 0; n--) if (e.indexOf(t[n].url) > -1) return t[n].txid;
        return null
    }
    g.start = function(e) {
        if (!g.sended && o["default"].loaded) {
            var t = g.startTime = o["default"].start,
            n = {};
            try {
                var s = function() {
                    var e = 0;
                    function t(t, n, r, o) {
                        var a = void 0;
                        "number" == typeof t && t > 0 ? (a = Math.round(t - n), r[o] = a) : r[o] = 0,
                        e = Math.max(e, r[o])
                    }
                    var n = {},
                    a = g.startTime;
                    if (r["default"] && r["default"].timing) {
                        var i = r["default"].timing,
                        u = i.navigationStart;
                        if (0 === u || u && u.toString().length < 13) return null;
                        n = {
                            tn: u,
                            ts: u
                        },
                        t(i.unloadEventStart, u, n, "tus"),
                        t(i.unloadEventEnd, u, n, "tue"),
                        t(i.redirectStart, u, n, "tes"),
                        t(i.redirectEnd, u, n, "tee"),
                        t(i.fetchStart, u, n, "tf"),
                        t(i.domainLookupStart, u, n, "tds"),
                        t(i.domainLookupEnd, u, n, "tde"),
                        t(i.connectStart, u, n, "tcs"),
                        t(i.secureConnectionStart, u, n, "tsl"),
                        t(i.connectEnd, u, n, "tce"),
                        t(i.requestStart, u, n, "tqs"),
                        t(i.responseStart, u, n, "trs"),
                        t(i.responseEnd, u, n, "tre"),
                        t(i.domLoading, u, n, "tol"),
                        t(i.domInteractive, u, n, "toi"),
                        t(i.domContentLoadedEventStart, u, n, "tos"),
                        t(i.domContentLoadedEventEnd, u, n, "toe"),
                        t(i.domComplete, u, n, "toc"),
                        t(i.loadEventStart, u, n, "tls"),
                        t(i.loadEventEnd, u, n, "tle"),
                        n.ttl = e,
                        n.tpe = u + e;
                        var d = void 0;
                        if (i.msFirstPaint) d = i.msFirstPaint;
                        else if (window.chrome && chrome.loadTimes) {
                            var l = chrome.loadTimes();
                            l && l.firstPaintTime && (d = 1e3 * l.firstPaintTime)
                        } else g.firstPaint && (d = g.firstPaint);
                        d && (n.tfp = Math.round(d - u))
                    } else n = {
                        tn: a,
                        ts: a,
                        tos: o["default"].endTime - a,
                        tle: o["default"].loadTime - a,
                        ttl: o["default"].loadTime - a,
                        tpe: o["default"].loadTime
                    };
                    return n.je = o["default"].errors.length,
                    n
                } ();
                if (s && s.ttl < 6e5) {
                    var m = function(e) {
                        var t = g.resourceTimings,
                        n = void 0,
                        a = void 0,
                        i = void 0;
                        function u(e) {
                            return n[e] > 0 ? n[e] : 0
                        }
                        if (e < g.trace_threshold) return null;
                        if (r["default"] && r["default"].getEntriesByType) {
                            var d = [];
                            a = r["default"].getEntriesByType("resource"),
                            i = function() {
                                function e(e, n) {
                                    if (e) {
                                        var r = {
                                            name: e,
                                            initiatorType: n,
                                            status: 0
                                        };
                                        i.indexOf(r.name) < 0 && t.push(r)
                                    }
                                }
                                for (var t = [], n = document.scripts || [], r = document.images || [], o = document.styleSheets || [], i = "", u = a.length, d = n.length, l = r.length, s = o.length, f = 0; f < u; f++) i = i + a[f].name + ",";
                                for (var c = 0; c < d; c++) e(n[c].src, "script");
                                for (var p = 0; p < s; p++) e(o[p].href, "css");
                                for (var m = 0; m < l; m++) e(r[m].src, "img");
                                return t
                            } (),
                            a && (t = t.concat(a), r["default"].webkitClearResourceTimings && r["default"].webkitClearResourceTimings(), r["default"].clearResourceTimings && r["default"].clearResourceTimings()),
                            t = t.concat(i);
                            for (var l = 0; l < t.length; l++) {
                                n = t[l];
                                var s = {
                                    o: u("startTime"),
                                    rt: n.initiatorType,
                                    n: n.name,
                                    f: u("fetchStart"),
                                    ds: u("domainLookupStart"),
                                    de: u("domainLookupEnd"),
                                    cs: u("connectStart"),
                                    ce: u("connectEnd"),
                                    sl: u("secureConnectionStart"),
                                    qs: u("requestStart"),
                                    rs: u("responseStart"),
                                    re: u("responseEnd"),
                                    tfs: u("transferSize"),
                                    sat: 0 === n.status ? 0 : 200
                                };
                                "xmlhttprequest" === n.initiatorType && o["default"].xhrOnload.length > 0 && (s.txid = y(n.name, o["default"].xhrOnload) || ""),
                                d.push(s)
                            }
                            return d
                        }
                        return null
                    } ((s && s.tls) > 0 ? s.tls: o["default"].loadTime - t);
                    n.header = a["default"].get(i.DATA_TYPE.PF, {
                        jid: g.jid,
                        url: document.URL,
                        ba: e.ba,
                        bid: e.bid,
                        bt: e.bt,
                        rf: document.referrer,
                        nt: 9
                    }),
                    n.content = [];
                    var h = l["default"].extend({},
                    s, p["default"].getMetrics());
                    h.txid = g.txid || "",
                    h.txtime = g.txtime || "",
                    n.content.push(h),
                    c["default"].log("pf sending >>>> in frame: " + (self !== top) + " >> pf sended bs: " + JSON.stringify(e)),
                    n.content[0].pfcont = m,
                    f["default"].send(n) || (n.content[0].pfcont = null, f["default"].send(n)),
                    u["default"].publish(d["default"].BS_END, {
                        bid: e.bid,
                        jid: g.jid,
                        type: i.DATA_TYPE.PF
                    })
                }
            } catch(_) {
                c["default"].log("err" + _)
            }
            g.sended = !0
        }
    },
    t["default"] = g
},
function(e, t, n) {
    var r = p(n(7)),
    o = p(n(3)),
    a = p(n(21)),
    i = p(n(32)),
    u = p(n(2)),
    d = n(0),
    l = p(n(15)),
    s = n(5),
    f = p(n(6)),
    c = p(n(11));
    function p(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var m = l["default"].getInfo(!0);
    f["default"].log("pf loading >>>  in frame: " + (top !== self) + " >> $bs: " + JSON.stringify(m)),
    o["default"].publish(u["default"].BS_START, {
        bid: m.bid,
        jid: i["default"].jid,
        type: s.DATA_TYPE.PF
    }),
    a["default"] && (c["default"].addEventListener(a["default"], "resourcetimingbufferfull",
    function() {
        var e = a["default"].getEntriesByType("resource");
        e && (i["default"].resourceTimings = i["default"].resourceTimings.concat(e), a["default"].clearResourceTimings())
    },
    !1), c["default"].addEventListener(a["default"], "webkitresourcetimingbufferfull",
    function() {
        var e = a["default"].getEntriesByType("resource");
        e && (i["default"].resourceTimings = i["default"].resourceTimings.concat(e), a["default"].webkitClearResourceTimings())
    },
    !1)),
    r["default"].wrap(!1, window, "requestAnimationFrame",
    function(e) {
        return function() {
            return i["default"].firstPaint = (0, d.now)(),
            window.requestAnimationFrame = e,
            e.apply(this, arguments)
        }
    }),
    o["default"].subscribe(u["default"].PAGE_LOADED,
    function() {
        f["default"].log("pf start >>>>  in frame: " + (top !== self) + " >> pf bs: " + JSON.stringify(m)),
        i["default"].start(m)
    })
},
function(e, t, n) {
    t.__esModule = !0,
    t["default"] = function(e) {
        function t(e, t) {
            function n(e) {
                return t && t.headers && t.headers[e] || ""
            }
            var i = void 0,
            l = e;
            if (l) {
                l.end = (0, r.now)(),
                l.s = t.status;
                try {
                    l.resLength = o["default"].lengthOf((0, c.stringify)(t.data || t.error))
                } catch(g) {
                    l.resLength = 0
                }
                var s = l.bs;
                i = {
                    txre: l.end,
                    es: l.s > 0 ? l.end - l.start: 0,
                    sat: l.s,
                    restype: "application/json",
                    res: l.resLength,
                    txid: n("txid")
                };
                var p = n("txtime");
                isNaN(p) || (i.txtime = p, i.rtxtime = p, i.es < i.txtime ? (i.es = i.txtime, i.tnt = 0) : i.tnt = i.es - i.txtime);
                var m = o["default"].extend(f["default"].cache.remove([l.jid]), i);
                f["default"].data.push(m),
                a["default"].loaded || a["default"].xhrOnload.push(m),
                u["default"].publish(d["default"].BS_END, {
                    bid: s.bid,
                    jid: l.jid
                }),
                u["default"].publish(d["default"].SEND_BEACON)
            }
        }
        return function(n, c, m, g, y) {
            var h = (0, r.now)(),
            _ = void 0,
            v = i["default"].getInfo();
            _ = {
                jid: o["default"].getRandomStr() + (0, r.now)(),
                start: h,
                bs: v,
                url: n,
                method: e.name
            },
            o["default"].lang.isTypeOf(g, "Function") && (g = function(e) {
                var n = g;
                return function(r) {
                    n.apply(this, arguments),
                    t(e, r)
                }
            } (_)),
            o["default"].lang.isTypeOf(y, "Function") && (y = function(e) {
                var n = y;
                return function(r) {
                    n.apply(this, arguments),
                    t(e, r)
                }
            } (_));
            var w = _.jid,
            b = v.nodeAttr,
            S = o["default"].extend({
                jid: w,
                jt: "web",
                ref: document.URL,
                ts: _.start,
                m: _.method,
                url: _.url,
                nt: !a["default"].loaded && l["default"].Document || l["default"].Element,
                rf: document.referrer,
                accept: "*/*",
                sat: 0,
                txrs: _.start,
                req: arguments[0] ? o["default"].lengthOf(arguments[0]) : 0,
                bid: v.bid,
                bt: v.bt,
                ba: v.ba,
                dtxt: b && b.value || "",
                xpath: b && b.xpath || "",
                href: b && b.href || ""
            },
            p["default"].getMetrics());
            f["default"].cache.put(w, S);
            try {
                var T = (0, r.encodeUri)(a["default"].cs.getUserId());
                o["default"].cookie.set("_yyy_usercode", T, {
                    path: "/"
                }),
                o["default"].cookie.set("_yyy_busiid", v.bid, {
                    path: "/"
                }),
                e.apply(this, [n, c, m, g, y]),
                o["default"].cookie.set("_yyy_usercode", "", {
                    path: "/",
                    expires: -1
                }),
                o["default"].cookie.set("_yyy_busiid", "", {
                    path: "/",
                    expires: -1
                }),
                u["default"].publish(d["default"].BS_START, {
                    bid: v.bid,
                    jid: _.jid,
                    type: s.DATA_TYPE.XHR
                })
            } catch(E) {
                return Function.prototype.apply.call(e, this, [n, c, m, g, y])
            }
        }
    };
    var r = n(0),
    o = m(n(1)),
    a = m(n(4)),
    i = m(n(15)),
    u = m(n(3)),
    d = m(n(2)),
    l = m(n(22)),
    s = n(5),
    f = m(n(17)),
    c = n(10),
    p = m(n(8));
    function m(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
},
function(e, t, n) {
    var r = u(n(2)),
    o = u(n(34)),
    a = u(n(7)),
    i = u(n(3));
    function u(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var d = window.cordovaHTTP;
    function l() { (d || (d = window.cordovaHTTP)) && (a["default"].wrap(!1, d, "post", o["default"]), a["default"].wrap(!1, d, "get", o["default"]))
    }
    d ? l() : i["default"].subscribe(r["default"].CORDOVA_READY, l)
},
function(e, t, n) {
    t.__esModule = !0,
    t.wrappedFetch = function(e) {
        return function() {
            r["default"].log("window.fetch is captured");
            var t = arguments,
            n = (0, u.now)(),
            m = {
                id: i["default"].getRandomStr() + n,
                onWatch: !0,
                inTimer: d["default"].inTimer
            },
            y = a["default"].asArray.apply(this, t);
            if (i["default"].lang.isString(y[0]) ? (m.url = y[0], y[1] ? (m.method = y[1].method || "GET", m.accept = y[1].accept) : m.method = "GET") : y[0] instanceof Request ? (m.url = y[0].url, m.method = y[0].method, m.accept = y[0].accept) : m.onWatch = !1, !m.onWatch) return e.apply(this, t);
            var h = o["default"].getInfo(),
            _ = h.nodeAttr,
            v = m.id,
            w = i["default"].extend({
                jid: v,
                jt: "web",
                c: "fetch",
                ref: document.URL,
                ts: n,
                m: m.method,
                url: m.url,
                nt: h.nt,
                rf: document.referrer,
                accept: m.accept || "*/*",
                sat: 0,
                txrs: n,
                req: arguments[0] ? i["default"].lengthOf(arguments[0]) : 0,
                bid: h.bid,
                bt: h.bt,
                ba: h.ba,
                dtxt: _ && _.value || "",
                xpath: _ && _.xpath || "",
                href: _ && _.href || ""
            },
            p["default"].getMetrics());
            l["default"].cache.put(w.jid, w);
            var b = e.apply(this, t),
            S = {
                bid: h.bid,
                jid: v,
                type: c.DATA_TYPE.XHR
            };
            return s["default"].publish(f["default"].BS_START, S),
            b.then(function(e) {
                return r["default"].log("fetch", e),
                function(e) {
                    var t = (0, u.now)(),
                    r = {
                        txre: t,
                        es: t - n,
                        sat: 400 === e.status ? 200 : e.status,
                        txid: g.call(e, "txid"),
                        restype: g.call(e, "content-type"),
                        res: g.call(e, "content-length")
                    },
                    o = void 0;
                    p["default"].http.status ? i["default"].lang.isString(p["default"].http.status) ? o = p["default"].http.status: i["default"].lang.isFunction(p["default"].http.status) && (o = p["default"].http.status(e.status, e)) : o = e.status;
                    r.sat = o;
                    var a = g.call(e, "txtime");
                    a && !isNaN(a) && (r.txtime = a, r.rtxtime = a, r.es < r.txtime ? (r.es = r.txtime, r.tnt = 0) : r.tnt = r.es - r.txtime);
                    var c = l["default"].cache.remove([v]);
                    if (c) {
                        var m = i["default"].extend(c, r);
                        l["default"].data.push(m),
                        d["default"].loaded || d["default"].xhrOnload.push(m)
                    }
                    s["default"].publish(f["default"].BS_END, S),
                    s["default"].publish(f["default"].SEND_BEACON)
                } (e),
                e
            })["catch"](function(e) {
                throw r["default"].log("fetch error in sdk: ", arguments),
                function() {
                    var e = l["default"].cache.remove([v]);
                    e && l["default"].data.push(e);
                    s["default"].publish(f["default"].BS_END, S),
                    s["default"].publish(f["default"].SEND_BEACON)
                } (),
                e
            })
        }
    };
    var r = m(n(6)),
    o = m(n(15)),
    a = m(n(7)),
    i = m(n(1)),
    u = n(0),
    d = m(n(4)),
    l = m(n(17)),
    s = m(n(3)),
    f = m(n(2)),
    c = n(5),
    p = m(n(8));
    function m(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function g(e) {
        return this.headers.get(e) || ""
    }
},
function(e, t) {
    t.__esModule = !0;
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    },
    r = Object.prototype.toString,
    o = Function.prototype.toString,
    a = /^\[object .+?Constructor]$/,
    i = RegExp("^" + String(r).replace(/[.*+?^${}()|[\]\/\\]/g, "\\$&").replace(/toString|(function).*?(?=\\\()| for .+?(?=\\])/g, "$1.*?") + "$");
    var u = {
        bind: function(e, t) {
            return function() {
                e.apply(t, arguments)
            }
        },
        isNative: function(e) {
            var t = void 0 === e ? "undefined": n(e);
            return "function" === t ? i.test(o.call(e)) : e && "object" === t && a.test(r.call(e)) || !1
        }
    };
    t["default"] = u
},
function(e, t, n) {
    var r = i(n(37)),
    o = i(n(7)),
    a = n(36);
    function i(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var u = window.fetch;
    r["default"].isNative(u) && o["default"].wrap(!1, window, "fetch", a.wrappedFetch)
},
function(e, t) {
    t.__esModule = !0,
    t["default"] = function(e) {
        return function(t, n) {
            this._yy_rum_option && "accept" === t && (this._yy_rum_option.accept = n),
            e.apply(this, arguments)
        }
    }
},
function(e, t, n) {
    t.__esModule = !0,
    t["default"] = function(e) {
        return function() {
            var t = this,
            n = 0;
            function m(e) {
                var i = void 0,
                f = t._yy_rum_option;
                if (f && f.url) {
                    if (4 !== f.readyState && (f.end = (0, o.now)()), "" === t.responseType || "text" === t.responseType) f.resLength = r["default"].lengthOf(t.responseText);
                    else if (t.response) f.resLength = r["default"].lengthOf(t.response);
                    else try {
                        f.resLength = r["default"].lengthOf(t.responseText)
                    } catch(v) {
                        f.resLength = 0
                    }
                    f.readyState = t.readyState,
                    f.s = t.status,
                    f.cb_time = n,
                    i = {
                        txre: f.end,
                        es: f.end - f.start,
                        d: n,
                        t: e,
                        restype: t.getResponseHeader("content-type") || "",
                        res: f.resLength
                    };
                    var c = void 0;
                    p["default"].http.status ? r["default"].lang.isString(p["default"].http.status) ? c = p["default"].http.status: r["default"].lang.isFunction(p["default"].http.status) && (c = p["default"].http.status(f.s, t.responseText || t.response)) : c = f.s,
                    i.sat = c,
                    i.txid = g(t);
                    var m = y(t);
                    isNaN(m) || (i.txtime = m, i.rtxtime = m, i.es < i.txtime ? (i.es = i.txtime, i.tnt = 0) : i.tnt = i.es - i.txtime);
                    var h = l["default"].cache.remove([f.jid]);
                    if (h) {
                        var _ = r["default"].extend(h, i);
                        l["default"].data.push(_),
                        a["default"].loaded || a["default"].xhrOnload.push(_)
                    }
                    t._yy_rum_option = null,
                    f.s,
                    u["default"].publish(d["default"].BS_END, {
                        bid: S.bid,
                        jid: f.jid,
                        type: s.DATA_TYPE.XHR
                    }),
                    u["default"].publish(d["default"].SEND_BEACON)
                }
            }
            function h(e) {
                var i = r["default"].extend({},
                t._yy_rum_option),
                u = t._yy_rum_option.inTimer;
                return function() {
                    var r = void 0,
                    d = void 0;
                    4 === t.readyState && t._yy_rum_option && (t._yy_rum_option.end = r = (0, o.now)(), t._yy_rum_option.readyState = 4);
                    try {
                        a["default"].innerAjax = !0,
                        a["default"].tempXhrYyRum = i,
                        a["default"].inTimer = u,
                        d = e.apply(this, arguments),
                        a["default"].innerAjax = !1
                    } catch(l) {
                        throw l
                    }
                    return 4 === t.readyState && (t._yy_rum_option && (n = (0, o.now)() - r), i.onWatch && m(0)),
                    d
                }
            }
            function _(e) {
                return function() {
                    var n = t._yy_rum_option;
                    n && n.onWatch && ("progress" === e || ("abort" === e ? m(905) : "loadstart" === e ? n.start = (0, o.now)() : "error" === e ? m(990) : "timeout" === e && m(903)))
                }
            }
            var v = i["default"].wrap(!1, t, "onreadystatechange", h);
            v || c["default"].addEventListener(t, "readystatechange",
            function() {
                var e = void 0,
                n = void 0;
                function o(r, o) {
                    t["on" + r] = function() {
                        f["default"].log("xhr state: " + r),
                        a["default"].innerAjax = !0,
                        a["default"].tempXhrYyRum = e,
                        a["default"].inTimer = n,
                        o.apply(t, arguments),
                        a["default"].innerAjax = !1
                    }
                }
                if (4 === t.readyState) {
                    var i = ["load", "error", "abort"];
                    e = r["default"].extend({},
                    t._yy_rum_option),
                    n = t._yy_rum_option && t._yy_rum_option.inTimer;
                    for (var u = 0; u < i.length; u++) {
                        var d = i[u],
                        l = t["on" + d];
                        l && o(d, l)
                    }
                    e.onWatch && m(0)
                }
            },
            !1),
            function(e, t) {
                t instanceof Array || (t = [t]);
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    c["default"].addEventListener(e, r, _(r), !1)
                }
            } (t, ["error", "progress", "abort", "load", "loadstart", "loadend", "timeout"]),
            v || setTimeout(function() {
                i["default"].wrap(!1, t, "onreadystatechange", h)
            },
            0);
            var w = t._yy_rum_option,
            b = arguments;
            if (!w.onWatch) try {
                return e.apply(this, b)
            } catch(O) {
                return Function.prototype.apply.call(e, this, b)
            }
            var S = w.bs,
            T = S.nodeAttr,
            E = w.jid,
            A = r["default"].extend({
                jid: E,
                jt: "web",
                ref: document.URL,
                ts: w.start,
                m: w.method,
                url: w.url,
                nt: S.nt,
                rf: document.referrer,
                accept: w.accept || "*/*",
                sat: 0,
                txrs: w.start,
                req: arguments[0] ? r["default"].lengthOf(arguments[0]) : 0,
                bid: S.bid,
                bt: S.bt,
                ba: S.ba,
                dtxt: T && T.value || "",
                xpath: T && T.xpath || "",
                href: T && T.href || ""
            },
            p["default"].getMetrics());
            l["default"].cache.put(E, A);
            try {
                var x = (0, o.encodeUri)(p["default"].getUserId());
                r["default"].cookie.set("_yyy_usercode", x, {
                    path: "/"
                }),
                r["default"].cookie.set("_yyy_busiid", S.bid, {
                    path: "/"
                }),
                e.apply(this, b),
                r["default"].cookie.set("_yyy_usercode", "", {
                    path: "/",
                    expires: -1
                }),
                r["default"].cookie.set("_yyy_busiid", "", {
                    path: "/",
                    expires: -1
                }),
                u["default"].publish(d["default"].BS_START, {
                    bid: S.bid,
                    jid: E,
                    type: s.DATA_TYPE.XHR
                })
            } catch(M) {
                Function.prototype.apply.call(e, this, b),
                u["default"].publish(d["default"].BS_START, {
                    bid: S.bid,
                    jid: E,
                    type: s.DATA_TYPE.XHR
                })
            }
        }
    };
    var r = m(n(1)),
    o = n(0),
    a = m(n(4)),
    i = m(n(7)),
    u = m(n(3)),
    d = m(n(2)),
    l = m(n(17)),
    s = n(5),
    f = m(n(6)),
    c = m(n(11)),
    p = m(n(8));
    function m(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var g = function(e) {
        var t = void 0;
        if (e.getResponseHeader) try {
            t = e.getResponseHeader("TXID")
        } catch(n) {}
        return t || ""
    },
    y = function(e) {
        var t = void 0;
        if (e.getResponseHeader) try {
            t = e.getResponseHeader("txtime")
        } catch(n) {}
        return t = parseInt(t)
    }
},
function(e, t, n) {
    t.__esModule = !0,
    t["default"] = function(e) {
        return function() {
            var t = arguments,
            n = r["default"].asArray.apply(this, t);
            this._yy_rum_option = {
                jid: u["default"].getRandomStr() + (0, o.now)(),
                method: n[0],
                url: n[1],
                start: (0, o.now)(),
                inTimer: a["default"].inTimer
            };
            var l = void 0;
            a["default"].innerAjax && a["default"].tempXhrYyRum && (l = u["default"].extend(!0, {},
            a["default"].tempXhrYyRum.bs), delete a["default"].tempXhrYyRum),
            l && l.bid || (l = i["default"].getInfo()),
            this._yy_rum_option.bs = l;
            var s = !0;
            d["default"].track.ignore.xhr && d["default"].track.ignore.xhr(this._yy_rum_option) ? s = !1 : this._yy_rum_option.inTimer ? s = !1 : l.ig && (s = !1),
            this._yy_rum_option.onWatch = s;
            try {
                return e.apply(this, t)
            } catch(f) {
                return Function.prototype.apply.call(e, this, t)
            }
        }
    };
    var r = l(n(7)),
    o = n(0),
    a = l(n(4)),
    i = l(n(15)),
    u = l(n(1)),
    d = l(n(8));
    function l(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
},
function(e, t, n) {
    var r = u(n(7)),
    o = u(n(41)),
    a = u(n(40)),
    i = u(n(39));
    function u(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var d = window.XMLHttpRequest;
    d ? d.prototype ? (r["default"].wrap(!1, d.prototype, "open", o["default"]), r["default"].wrap(!1, d.prototype, "send", a["default"]), r["default"].wrap(!1, d.prototype, "setRequestHeader", i["default"])) : (r["default"].ie = 7, window.XMLHttpRequest = function() {
        var e = new d;
        return r["default"].wrap(!1, e, "open", o["default"]),
        r["default"].wrap(!1, e, "send", a["default"]),
        e
    }) : window.ActiveXObject && (r["default"].ie = 6)
},
function(e, t, n) {
    t.__esModule = !0,
    t.ERROR_DSL = undefined;
    var r = s(n(1)),
    o = s(n(16)),
    a = s(n(18)),
    i = n(0),
    u = s(n(4)),
    d = n(5),
    l = s(n(9));
    function s(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    t.ERROR_DSL = {
        0 : "Approximate time",
        1 : "Message",
        2 : "lineNo",
        3 : "colNo",
        4 : "request uri",
        5 : "Stack trace",
        6 : "Module Name",
        7 : "Recorded(1: done; 0: not done)"
    };
    t["default"] = {
        getErrorData: function(e) {
            var t = {},
            n = [],
            s = {};
            for (var f in l["default"].each(e,
            function(e) {
                var t = (0, a["default"])(e[1], e[2], e[3], e[6]);
                s[t] ? s[t].cnt += 1 : s[t] = {
                    jid: r["default"].getRandomStr(8) + (0, i.now)(),
                    url: document.URL,
                    ts: (0, i.now)(),
                    os: parseInt(((0, i.now)() - u["default"].start) / 1e3),
                    msg: e[1],
                    lno: e[2],
                    cno: e[3],
                    ref: "#" === e[4] ? document.URL: e[4],
                    cnt: 1,
                    stk: e[5],
                    module: e[6],
                    rc: e[7]
                }
            }), s) n.push(s[f]);
            return t.header = o["default"].get(d.DATA_TYPE.ERR),
            t.content = n,
            t
        }
    }
},
function(e, t, n) {
    t.__esModule = !0,
    t["default"] = function(e) {
        var t = arguments,
        n = "unknown",
        u = [(0, r.now)()];
        if (t.length) {
            if ("string" == typeof e) {
                var d = t.length < 4 ? t.length: 4;
                u[1] = t[0],
                d > 2 && (u[2] = t[2], u[3] = 0, u[4] = t[1]),
                d > 3 && t[3] && (u[3] = t[3])
            } else if (e instanceof Event || window.ErrorEvent && e instanceof ErrorEvent) {
                if (u[1] = e.message || (e.error && e.error.constructor.name) + (e.error && e.error.message) || "", u[2] = e.lineno || 0, u[3] = e.colno || 0, u[4] = e.filename || e.error && e.error.fileName || e.target && e.target.baseURI || "", u[4] === document.URL && (u[4] = "#"), e.error) {
                    u[5] = e.error.stack,
                    u[6] = e.error.moduleName;
                    var l = (0, a["default"])(u[1], u[2], u[3], u[6]);
                    u[7] = i["default"].errorRecorded[l] ? 0 : 1,
                    i["default"].errorRecorded[l] = !0
                } else u[5] = null,
                u[6] = null,
                u[7] = 0;
                if (u[1] === n && u[4] === n) return; (0, o.fix)(u)
            }
            i["default"].errors.push(u)
        }
    };
    var r = n(0),
    o = n(18),
    a = u(o),
    i = u(n(4));
    function u(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
},
function(e, t, n) {
    var r = n(0),
    o = p(n(3)),
    a = p(n(44)),
    i = n(18),
    u = p(i),
    d = p(n(4)),
    l = p(n(2)),
    s = p(n(14)),
    f = p(n(43)),
    c = p(n(11));
    function p(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function m() {
        if (d["default"].errors.length > 0) {
            var e = f["default"].getErrorData(d["default"].errors);
            s["default"].send(e,
            function(e) {
                e && (d["default"].errors = [])
            })
        }
    }
    o["default"].subscribe(l["default"].PAGE_UNLOAD, m),
    window.addEventListener ? c["default"].addEventListener(window, "error", a["default"], !1) : window.onerror = function(e, t, n, o, a) {
        var l = [(0, r.now)(), e, n, o, t === document.URL ? "#": t];
        if (a) {
            var s = (0, u["default"])(e, n, o, a.moduleName);
            l = l.concat([a.stack, a.moduleName, d["default"].errorRecorded[s] ? 0 : 1]),
            d["default"].errorRecorded[s] = !0
        } (0, i.fix)(l),
        d["default"].errors.push(l)
    },
    setInterval(m, 1e4)
},
function(e, t, n) {
    var r = g(n(13)),
    o = g(n(2)),
    a = g(n(14)),
    i = n(5),
    u = g(n(1)),
    d = g(n(3)),
    l = m(n(10)),
    s = m(n(0)),
    f = g(n(23)),
    c = g(n(12)),
    p = g(n(9));
    function m(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e,
        t
    }
    function g(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    var y = u["default"].memStorage,
    h = {
        get: function() {
            var e = y.get("_yyy_bn");
            return e ? l.toJSON(e) : {}
        },
        set: function(e) {
            u["default"].lang.isPlainObject(e) && y.set("_yyy_bn", l.stringify(e), {
                path: "/",
                expires: 36e5
            })
        },
        construct: function(e) {
            return [e.timestamp, e.jids.join(), e.counter, e.pfCount, e.xhrCount, e.mutCount].join("|")
        },
        destruct: function(e, t) {
            var n = void 0;
            return {
                timestamp: (n = !t && u["default"].lang.isString(e) ? e.split("|") : e[t] ? e[t].split("|") : [0, "", 0, 0, 0, 0])[0],
                jids: "" === n[1] ? [] : n[1].split(","),
                counter: n[2],
                pfCount: n[3],
                xhrCount: n[4],
                mutCount: n[5]
            }
        }
    };
    function _(e) {
        var t = s.now(),
        n = h.get(),
        o = {},
        d = 0;
        if ((e = e || {}).force) {
            for (var l in n) if (n.hasOwnProperty(l) && u["default"].lang.isString(n[l]) && l !== e.ignoredBid) {
                var p = n[l];
                d++,
                o[l] = p,
                delete n[l]
            }
        } else for (var m in n) if (n.hasOwnProperty(m) && u["default"].lang.isString(n[m]) && m !== e.ignoredBid) {
            var g = h.destruct(n[m]);
            0 == +g.counter && t - g.timestamp > 1e4 ? (d++, o[m] = h.construct(g), delete n[m]) : 0 != +g.counter && t - g.timestamp > 36e5 && (d++, o[m] = h.construct(g), delete n[m])
        }
        d > 0 && (!
        function(e, t) {
            var n = {
                header: {
                    tid: c["default"].tid,
                    appid: c["default"].appid,
                    sdkid: r["default"].sdkId,
                    v: r["default"].buVersion,
                    ip: "#~#~#~",
                    ts: s.now(),
                    pt: i.DATA_TYPE.BN,
                    stg: t || f["default"].PAGE_LOADED
                },
                content: []
            };
            for (var o in e) if (e.hasOwnProperty(o)) {
                var d = h.destruct(e, o);
                n.content.push({
                    jid: u["default"].getRandomStr(16),
                    jt: "web",
                    bid: o,
                    pf: +d.pfCount || 0,
                    xhr: +d.xhrCount || 0,
                    mut: +d.mutCount || 0,
                    e: d.jids && d.jids.join() || ""
                })
            }
            n.content.length > 0 && a["default"].send(n)
        } (o, e.stage), h.set(n))
    }
    setInterval(_, 5e3),
    d["default"].subscribe(o["default"].BS_START,
    function(e) {
        if (e && e.bid && e.type) {
            var t = e.bid,
            n = e.type,
            r = e.jid,
            o = h.get(),
            a = h.destruct(o, t);
            switch (n) {
            case i.DATA_TYPE.PF:
                a.pfCount++;
                break;
            case i.DATA_TYPE.XHR:
                a.xhrCount++;
                break;
            case i.DATA_TYPE.MUT:
                a.mutCount++
            }
            a.timestamp = s.now(),
            a.jids.push(r),
            a.counter++,
            o[t] = h.construct(a),
            h.set(o)
        }
    }),
    d["default"].subscribe(o["default"].BS_END,
    function(e) {
        if (e && e.bid) {
            var t = e.bid,
            n = e.jid,
            r = h.get();
            if (r[t]) {
                var o = h.destruct(r[t]);
                o.timestamp = s.now(),
                o.jids.splice(p["default"].indexOf(o.jids, n), 1),
                o.counter--,
                r[t] = h.construct(o),
                h.set(r)
            }
        }
    }),
    d["default"].subscribe(o["default"].BS_ABORT,
    function(e) {
        _({
            force: !0,
            stage: (e = e || {}).stg,
            ignoredBid: e.lbid
        })
    })
},
function(e, t) {
    t.__esModule = !0;
    var n = function() {
        function e(e, t) {
            if (!o[e]) {
                o[e] = {};
                for (var n = 0; n < e.length; n++) o[e][e.charAt(n)] = n
            }
            return o[e][t]
        }
        var t = String.fromCharCode,
        n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
        o = {},
        a = {
            compressToBase64: function(e) {
                if (null == e) return "";
                var t = a._compress(e, 6,
                function(e) {
                    return n.charAt(e)
                });
                switch (t.length % 4) {
                default:
                case 0:
                    return t;
                case 1:
                    return t + "===";
                case 2:
                    return t + "==";
                case 3:
                    return t + "="
                }
            },
            decompressFromBase64: function(t) {
                return null == t ? "": "" == t ? null: a._decompress(t.length, 32,
                function(r) {
                    return e(n, t.charAt(r))
                })
            },
            compressToUTF16: function(e) {
                return null == e ? "": a._compress(e, 15,
                function(e) {
                    return t(e + 32)
                }) + " "
            },
            decompressFromUTF16: function(e) {
                return null == e ? "": "" == e ? null: a._decompress(e.length, 16384,
                function(t) {
                    return e.charCodeAt(t) - 32
                })
            },
            compressToUint8Array: function(e) {
                for (var t = a.compress(e), n = new Uint8Array(2 * t.length), r = 0, o = t.length; o > r; r++) {
                    var i = t.charCodeAt(r);
                    n[2 * r] = i >>> 8,
                    n[2 * r + 1] = i % 256
                }
                return n
            },
            decompressFromUint8Array: function(e) {
                if (null === e || void 0 === e) return a.decompress(e);
                for (var n = new Array(e.length / 2), r = 0, o = n.length; o > r; r++) n[r] = 256 * e[2 * r] + e[2 * r + 1];
                var i = [];
                return n.forEach(function(e) {
                    i.push(t(e))
                }),
                a.decompress(i.join(""))
            },
            compressToEncodedURIComponent: function(e) {
                return null == e ? "": a._compress(e, 6,
                function(e) {
                    return r.charAt(e)
                })
            },
            decompressFromEncodedURIComponent: function(t) {
                return null == t ? "": "" == t ? null: (t = t.replace(/ /g, "+"), a._decompress(t.length, 32,
                function(n) {
                    return e(r, t.charAt(n))
                }))
            },
            compress: function(e) {
                return a._compress(e, 16,
                function(e) {
                    return t(e)
                })
            },
            _compress: function(e, t, n) {
                if (null == e) return "";
                var r, o, a, i = {},
                u = {},
                d = "",
                l = "",
                s = "",
                f = 2,
                c = 3,
                p = 2,
                m = [],
                g = 0,
                y = 0;
                for (a = 0; a < e.length; a += 1) if (d = e.charAt(a), Object.prototype.hasOwnProperty.call(i, d) || (i[d] = c++, u[d] = !0), l = s + d, Object.prototype.hasOwnProperty.call(i, l)) s = l;
                else {
                    if (Object.prototype.hasOwnProperty.call(u, s)) {
                        if (s.charCodeAt(0) < 256) {
                            for (r = 0; p > r; r++) g <<= 1,
                            y == t - 1 ? (y = 0, m.push(n(g)), g = 0) : y++;
                            for (o = s.charCodeAt(0), r = 0; 8 > r; r++) g = g << 1 | 1 & o,
                            y == t - 1 ? (y = 0, m.push(n(g)), g = 0) : y++,
                            o >>= 1
                        } else {
                            for (o = 1, r = 0; p > r; r++) g = g << 1 | o,
                            y == t - 1 ? (y = 0, m.push(n(g)), g = 0) : y++,
                            o = 0;
                            for (o = s.charCodeAt(0), r = 0; 16 > r; r++) g = g << 1 | 1 & o,
                            y == t - 1 ? (y = 0, m.push(n(g)), g = 0) : y++,
                            o >>= 1
                        }
                        0 == --f && (f = Math.pow(2, p), p++),
                        delete u[s]
                    } else for (o = i[s], r = 0; p > r; r++) g = g << 1 | 1 & o,
                    y == t - 1 ? (y = 0, m.push(n(g)), g = 0) : y++,
                    o >>= 1;
                    0 == --f && (f = Math.pow(2, p), p++),
                    i[l] = c++,
                    s = String(d)
                }
                if ("" !== s) {
                    if (Object.prototype.hasOwnProperty.call(u, s)) {
                        if (s.charCodeAt(0) < 256) {
                            for (r = 0; p > r; r++) g <<= 1,
                            y == t - 1 ? (y = 0, m.push(n(g)), g = 0) : y++;
                            for (o = s.charCodeAt(0), r = 0; 8 > r; r++) g = g << 1 | 1 & o,
                            y == t - 1 ? (y = 0, m.push(n(g)), g = 0) : y++,
                            o >>= 1
                        } else {
                            for (o = 1, r = 0; p > r; r++) g = g << 1 | o,
                            y == t - 1 ? (y = 0, m.push(n(g)), g = 0) : y++,
                            o = 0;
                            for (o = s.charCodeAt(0), r = 0; 16 > r; r++) g = g << 1 | 1 & o,
                            y == t - 1 ? (y = 0, m.push(n(g)), g = 0) : y++,
                            o >>= 1
                        }
                        0 == --f && (f = Math.pow(2, p), p++),
                        delete u[s]
                    } else for (o = i[s], r = 0; p > r; r++) g = g << 1 | 1 & o,
                    y == t - 1 ? (y = 0, m.push(n(g)), g = 0) : y++,
                    o >>= 1;
                    0 == --f && (f = Math.pow(2, p), p++)
                }
                for (o = 2, r = 0; p > r; r++) g = g << 1 | 1 & o,
                y == t - 1 ? (y = 0, m.push(n(g)), g = 0) : y++,
                o >>= 1;
                for (;;) {
                    if (g <<= 1, y == t - 1) {
                        m.push(n(g));
                        break
                    }
                    y++
                }
                return m.join("")
            },
            decompress: function(e) {
                return null == e ? "": "" == e ? null: a._decompress(e.length, 32768,
                function(t) {
                    return e.charCodeAt(t)
                })
            },
            _decompress: function(e, n, r) {
                var o, a, i, u, d, l, s, f = [],
                c = 4,
                p = 4,
                m = 3,
                g = "",
                y = [],
                h = {
                    val: r(0),
                    position: n,
                    index: 1
                };
                for (o = 0; 3 > o; o += 1) f[o] = o;
                for (i = 0, d = Math.pow(2, 2), l = 1; l != d;) u = h.val & h.position,
                h.position >>= 1,
                0 == h.position && (h.position = n, h.val = r(h.index++)),
                i |= (u > 0 ? 1 : 0) * l,
                l <<= 1;
                switch (i) {
                case 0:
                    for (i = 0, d = Math.pow(2, 8), l = 1; l != d;) u = h.val & h.position,
                    h.position >>= 1,
                    0 == h.position && (h.position = n, h.val = r(h.index++)),
                    i |= (u > 0 ? 1 : 0) * l,
                    l <<= 1;
                    s = t(i);
                    break;
                case 1:
                    for (i = 0, d = Math.pow(2, 16), l = 1; l != d;) u = h.val & h.position,
                    h.position >>= 1,
                    0 == h.position && (h.position = n, h.val = r(h.index++)),
                    i |= (u > 0 ? 1 : 0) * l,
                    l <<= 1;
                    s = t(i);
                    break;
                case 2:
                    return ""
                }
                for (f[3] = s, a = s, y.push(s);;) {
                    if (h.index > e) return "";
                    for (i = 0, d = Math.pow(2, m), l = 1; l != d;) u = h.val & h.position,
                    h.position >>= 1,
                    0 == h.position && (h.position = n, h.val = r(h.index++)),
                    i |= (u > 0 ? 1 : 0) * l,
                    l <<= 1;
                    switch (s = i) {
                    case 0:
                        for (i = 0, d = Math.pow(2, 8), l = 1; l != d;) u = h.val & h.position,
                        h.position >>= 1,
                        0 == h.position && (h.position = n, h.val = r(h.index++)),
                        i |= (u > 0 ? 1 : 0) * l,
                        l <<= 1;
                        f[p++] = t(i),
                        s = p - 1,
                        c--;
                        break;
                    case 1:
                        for (i = 0, d = Math.pow(2, 16), l = 1; l != d;) u = h.val & h.position,
                        h.position >>= 1,
                        0 == h.position && (h.position = n, h.val = r(h.index++)),
                        i |= (u > 0 ? 1 : 0) * l,
                        l <<= 1;
                        f[p++] = t(i),
                        s = p - 1,
                        c--;
                        break;
                    case 2:
                        return y.join("")
                    }
                    if (0 == c && (c = Math.pow(2, m), m++), f[s]) g = f[s];
                    else {
                        if (s !== p) return null;
                        g = a + a.charAt(0)
                    }
                    y.push(g),
                    f[p++] = a + g.charAt(0),
                    a = g,
                    0 == --c && (c = Math.pow(2, m), m++)
                }
            }
        };
        return a
    } ();
    t["default"] = n
},
function(e, t) {
    t.__esModule = !0;
    var n = 0;
    function r(e) {
        return a(o(i(e)))
    }
    function o(e) {
        return d(l(u(e), 8 * e.length))
    }
    function a(e) {
        for (var t, r = n ? "0123456789ABCDEF": "0123456789abcdef", o = "", a = 0; a < e.length; a++) t = e.charCodeAt(a),
        o += r.charAt(t >>> 4 & 15) + r.charAt(15 & t);
        return o
    }
    function i(e) {
        for (var t, n, r = "",
        o = -1; ++o < e.length;) t = e.charCodeAt(o),
        n = o + 1 < e.length ? e.charCodeAt(o + 1) : 0,
        55296 <= t && t <= 56319 && 56320 <= n && n <= 57343 && (t = 65536 + ((1023 & t) << 10) + (1023 & n), o++),
        t <= 127 ? r += String.fromCharCode(t) : t <= 2047 ? r += String.fromCharCode(192 | t >>> 6 & 31, 128 | 63 & t) : t <= 65535 ? r += String.fromCharCode(224 | t >>> 12 & 15, 128 | t >>> 6 & 63, 128 | 63 & t) : t <= 2097151 && (r += String.fromCharCode(240 | t >>> 18 & 7, 128 | t >>> 12 & 63, 128 | t >>> 6 & 63, 128 | 63 & t));
        return r
    }
    function u(e) {
        for (var t = Array(e.length >> 2), n = 0; n < t.length; n++) t[n] = 0;
        for (n = 0; n < 8 * e.length; n += 8) t[n >> 5] |= (255 & e.charCodeAt(n / 8)) << n % 32;
        return t
    }
    function d(e) {
        for (var t = "",
        n = 0; n < 32 * e.length; n += 8) t += String.fromCharCode(e[n >> 5] >>> n % 32 & 255);
        return t
    }
    function l(e, t) {
        e[t >> 5] |= 128 << t % 32,
        e[14 + (t + 64 >>> 9 << 4)] = t;
        for (var n = 1732584193,
        r = -271733879,
        o = -1732584194,
        a = 271733878,
        i = 0; i < e.length; i += 16) {
            var u = n,
            d = r,
            l = o,
            s = a;
            r = m(r = m(r = m(r = m(r = p(r = p(r = p(r = p(r = c(r = c(r = c(r = c(r = f(r = f(r = f(r = f(r, o = f(o, a = f(a, n = f(n, r, o, a, e[i + 0], 7, -680876936), r, o, e[i + 1], 12, -389564586), n, r, e[i + 2], 17, 606105819), a, n, e[i + 3], 22, -1044525330), o = f(o, a = f(a, n = f(n, r, o, a, e[i + 4], 7, -176418897), r, o, e[i + 5], 12, 1200080426), n, r, e[i + 6], 17, -1473231341), a, n, e[i + 7], 22, -45705983), o = f(o, a = f(a, n = f(n, r, o, a, e[i + 8], 7, 1770035416), r, o, e[i + 9], 12, -1958414417), n, r, e[i + 10], 17, -42063), a, n, e[i + 11], 22, -1990404162), o = f(o, a = f(a, n = f(n, r, o, a, e[i + 12], 7, 1804603682), r, o, e[i + 13], 12, -40341101), n, r, e[i + 14], 17, -1502002290), a, n, e[i + 15], 22, 1236535329), o = c(o, a = c(a, n = c(n, r, o, a, e[i + 1], 5, -165796510), r, o, e[i + 6], 9, -1069501632), n, r, e[i + 11], 14, 643717713), a, n, e[i + 0], 20, -373897302), o = c(o, a = c(a, n = c(n, r, o, a, e[i + 5], 5, -701558691), r, o, e[i + 10], 9, 38016083), n, r, e[i + 15], 14, -660478335), a, n, e[i + 4], 20, -405537848), o = c(o, a = c(a, n = c(n, r, o, a, e[i + 9], 5, 568446438), r, o, e[i + 14], 9, -1019803690), n, r, e[i + 3], 14, -187363961), a, n, e[i + 8], 20, 1163531501), o = c(o, a = c(a, n = c(n, r, o, a, e[i + 13], 5, -1444681467), r, o, e[i + 2], 9, -51403784), n, r, e[i + 7], 14, 1735328473), a, n, e[i + 12], 20, -1926607734), o = p(o, a = p(a, n = p(n, r, o, a, e[i + 5], 4, -378558), r, o, e[i + 8], 11, -2022574463), n, r, e[i + 11], 16, 1839030562), a, n, e[i + 14], 23, -35309556), o = p(o, a = p(a, n = p(n, r, o, a, e[i + 1], 4, -1530992060), r, o, e[i + 4], 11, 1272893353), n, r, e[i + 7], 16, -155497632), a, n, e[i + 10], 23, -1094730640), o = p(o, a = p(a, n = p(n, r, o, a, e[i + 13], 4, 681279174), r, o, e[i + 0], 11, -358537222), n, r, e[i + 3], 16, -722521979), a, n, e[i + 6], 23, 76029189), o = p(o, a = p(a, n = p(n, r, o, a, e[i + 9], 4, -640364487), r, o, e[i + 12], 11, -421815835), n, r, e[i + 15], 16, 530742520), a, n, e[i + 2], 23, -995338651), o = m(o, a = m(a, n = m(n, r, o, a, e[i + 0], 6, -198630844), r, o, e[i + 7], 10, 1126891415), n, r, e[i + 14], 15, -1416354905), a, n, e[i + 5], 21, -57434055), o = m(o, a = m(a, n = m(n, r, o, a, e[i + 12], 6, 1700485571), r, o, e[i + 3], 10, -1894986606), n, r, e[i + 10], 15, -1051523), a, n, e[i + 1], 21, -2054922799), o = m(o, a = m(a, n = m(n, r, o, a, e[i + 8], 6, 1873313359), r, o, e[i + 15], 10, -30611744), n, r, e[i + 6], 15, -1560198380), a, n, e[i + 13], 21, 1309151649), o = m(o, a = m(a, n = m(n, r, o, a, e[i + 4], 6, -145523070), r, o, e[i + 11], 10, -1120210379), n, r, e[i + 2], 15, 718787259), a, n, e[i + 9], 21, -343485551),
            n = g(n, u),
            r = g(r, d),
            o = g(o, l),
            a = g(a, s)
        }
        return Array(n, r, o, a)
    }
    function s(e, t, n, r, o, a) {
        return g((i = g(g(t, e), g(r, a))) << (u = o) | i >>> 32 - u, n);
        var i, u
    }
    function f(e, t, n, r, o, a, i) {
        return s(t & n | ~t & r, e, t, o, a, i)
    }
    function c(e, t, n, r, o, a, i) {
        return s(t & r | n & ~r, e, t, o, a, i)
    }
    function p(e, t, n, r, o, a, i) {
        return s(t ^ n ^ r, e, t, o, a, i)
    }
    function m(e, t, n, r, o, a, i) {
        return s(n ^ (t | ~r), e, t, o, a, i)
    }
    function g(e, t) {
        var n = (65535 & e) + (65535 & t);
        return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
    }
    t["default"] = {
        hex: r
    }
},
function(e, t, n) {
    var r = u(n(1)),
    o = u(n(13)),
    a = u(n(6)),
    i = u(n(12));
    function u(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    if (42 !== o["default"].answer) {
        a["default"].log("sdk id: " + o["default"].sdkId);
        var d = function() {
            for (var e = void 0,
            t = void 0,
            n = document.getElementsByTagName("script"), o = 0, a = n.length; o < a; o++) if (n[o].src.indexOf("yonyou-yyy.js") > -1) {
                var u = n[o].src;
                e = r["default"].getValueOfUrlParam("tid", u),
                t = r["default"].getValueOfUrlParam("appid", u);
                break
            }
            return {
                tid: e && (i["default"].tid = e) || i["default"].tid,
                appid: t && (i["default"].appid = t) || i["default"].appid
            }
        } (),
        l = d.tid,
        s = d.appid;
        if (l && s) n(24).init(),
        n(8),
        n(15),
        n(19),
        n(45),
        n(42),
        n(38),
        n(35),
        n(33),
        n(31),
        n(28);
        o["default"].answer = 42
    }
}]);
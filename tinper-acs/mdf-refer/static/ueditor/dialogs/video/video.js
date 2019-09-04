/**
 * Created by JetBrains PhpStorm.
 * User: taoqili
 * Date: 12-2-20
 * Time: 上午11:19
 * To change this template use File | Settings | File Templates.
 */

(function () {

  var utils = {
    each: function (obj, iterator, context) {
      if (obj == null) return;
      if (obj.length === +obj.length) {
        for (var i = 0, l = obj.length; i < l; i++) {
          if (iterator.call(context, obj[i], i, obj) === false)
            return false;
        }
      } else {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (iterator.call(context, obj[key], key, obj) === false)
              return false;
          }
        }
      }
    },
    isString: function (str) {
      return (typeof str == 'string') && str.constructor == String;
    },
    makeInstance: function (obj) {
      var noop = new Function();
      noop.prototype = obj;
      obj = new noop;
      noop.prototype = null;
      return obj;
    },
    extend: function (t, s, b) {
      if (s) {
        for (var k in s) {
          if (!b || !t.hasOwnProperty(k)) {
            t[k] = s[k];
          }
        }
      }
      return t;
    },

    extend2: function (t) {
      var a = arguments;
      for (var i = 1; i < a.length; i++) {
        var x = a[i];
        for (var k in x) {
          if (!t.hasOwnProperty(k)) {
            t[k] = x[k];
          }
        }
      }
      return t;
    },
    inherits: function (subClass, superClass) {
      var oldP = subClass.prototype,
        newP = utils.makeInstance(superClass.prototype);
      utils.extend(newP, oldP, true);
      subClass.prototype = newP;
      return (newP.constructor = subClass);
    },
    bind: function (fn, context) {
      return function () {
        return fn.apply(context, arguments);
      };
    },

    defer: function (fn, delay, exclusion) {
      var timerID;
      return function () {
        if (exclusion) {
          clearTimeout(timerID);
        }
        timerID = setTimeout(fn, delay);
      };
    },
    indexOf: function (array, item, start) {
      var index = -1;
      start = this.isNumber(start) ? start : 0;
      this.each(array, function (v, i) {
        if (i >= start && v === item) {
          index = i;
          return false;
        }
      });
      return index;
    },

    removeItem: function (array, item) {
      for (var i = 0, l = array.length; i < l; i++) {
        if (array[i] === item) {
          array.splice(i, 1);
          i--;
        }
      }
    },

    trim: function (str) {
      return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '');
    },
    listToMap: function (list) {
      if (!list) return {};
      list = utils.isArray(list) ? list : list.split(',');
      for (var i = 0, ci, obj = {}; ci = list[i++];) {
        obj[ci.toUpperCase()] = obj[ci] = 1;
      }
      return obj;
    },

    unhtml: function (str, reg) {
      return str ? str.replace(reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, function (a, b) {
        if (b) {
          return a;
        } else {
          return {
            '<': '&lt;',
            '&': '&amp;',
            '"': '&quot;',
            '>': '&gt;',
            "'": '&#39;'
          }[a]
        }

      }) : '';
    },
    unhtmlForUrl: function (str, reg) {
      return str ? str.replace(reg || /[<">']/g, function (a) {
        return {
          '<': '&lt;',
          '&': '&amp;',
          '"': '&quot;',
          '>': '&gt;',
          "'": '&#39;'
        }[a]

      }) : '';
    },

    html: function (str) {
      return str ? str.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function (m) {
        return {
          '&lt;': '<',
          '&amp;': '&',
          '&quot;': '"',
          '&gt;': '>',
          '&#39;': "'",
          '&nbsp;': ' '
        }[m]
      }) : '';
    },

    cssStyleToDomStyle: function () {
      var test = document.createElement('div').style,
        cache = {
          'float': test.cssFloat != undefined ? 'cssFloat' : test.styleFloat != undefined ? 'styleFloat' : 'float'
        };

      return function (cssName) {
        return cache[cssName] || (cache[cssName] = cssName.toLowerCase().replace(/-./g, function (match) {
          return match.charAt(1).toUpperCase();
        }));
      };
    }(),

    loadFile: function () {
      var tmpList = [];

      function getItem(doc, obj) {
        try {
          for (var i = 0, ci; ci = tmpList[i++];) {
            if (ci.doc === doc && ci.url == (obj.src || obj.href)) {
              return ci;
            }
          }
        } catch (e) {
          return null;
        }

      }

      return function (doc, obj, fn) {
        var item = getItem(doc, obj);
        if (item) {
          if (item.ready) {
            fn && fn();
          } else {
            item.funs.push(fn)
          }
          return;
        }
        tmpList.push({
          doc: doc,
          url: obj.src || obj.href,
          funs: [fn]
        });
        if (!doc.body) {
          var html = [];
          for (var p in obj) {
            if (p == 'tag') continue;
            html.push(p + '="' + obj[p] + '"')
          }
          doc.write('<' + obj.tag + ' ' + html.join(' ') + ' ></' + obj.tag + '>');
          return;
        }
        if (obj.id && doc.getElementById(obj.id)) {
          return;
        }
        var element = doc.createElement(obj.tag);
        delete obj.tag;
        for (var p in obj) {
          element.setAttribute(p, obj[p]);
        }
        element.onload = element.onreadystatechange = function () {
          if (!this.readyState || /loaded|complete/.test(this.readyState)) {
            item = getItem(doc, obj);
            if (item.funs.length > 0) {
              item.ready = 1;
              for (var fi; fi = item.funs.pop();) {
                fi();
              }
            }
            element.onload = element.onreadystatechange = null;
          }
        };
        element.onerror = function () {
          throw Error('The load ' + (obj.href || obj.src) + ' fails,check the url settings of file ueditor.config.js ')
        };
        doc.getElementsByTagName("head")[0].appendChild(element);
      }
    }(),

    isEmptyObject: function (obj) {
      if (obj == null) return true;
      if (this.isArray(obj) || this.isString(obj)) return obj.length === 0;
      for (var key in obj)
        if (obj.hasOwnProperty(key)) return false;
      return true;
    },

    /**
     * 把rgb格式的颜色值转换成16进制格式
     * @method fixColor
     * @param { String } rgb格式的颜色值
     * @param { String }
     * @example
     * rgb(255,255,255)  => "#ffffff"
     */
    fixColor: function (name, value) {
      if (/color/i.test(name) && /rgba?/.test(value)) {
        var array = value.split(",");
        if (array.length > 3)
          return "";
        value = "#";
        for (var i = 0, color; color = array[i++];) {
          color = parseInt(color.replace(/[^\d]/gi, ''), 10).toString(16);
          value += color.length == 1 ? "0" + color : color;
        }
        value = value.toUpperCase();
      }
      return value;
    },
    /**
     * 只针对border,padding,margin做了处理，因为性能问题
     * @public
     * @function
     * @param {String}    val style字符串
     */
    optCss: function (val) {
      var padding, margin, border;
      val = val.replace(/(padding|margin|border)\-([^:]+):([^;]+);?/gi, function (str, key, name, val) {
        if (val.split(' ').length == 1) {
          switch (key) {
            case 'padding':
              !padding && (padding = {});
              padding[name] = val;
              return '';
            case 'margin':
              !margin && (margin = {});
              margin[name] = val;
              return '';
            case 'border':
              return val == 'initial' ? '' : str;
          }
        }
        return str;
      });

      function opt(obj, name) {
        if (!obj) {
          return '';
        }
        var t = obj.top,
          b = obj.bottom,
          l = obj.left,
          r = obj.right,
          val = '';
        if (!t || !l || !b || !r) {
          for (var p in obj) {
            val += ';' + name + '-' + p + ':' + obj[p] + ';';
          }
        } else {
          val += ';' + name + ':' +
            (t == b && b == l && l == r ? t :
              t == b && l == r ? (t + ' ' + l) :
              l == r ? (t + ' ' + l + ' ' + b) : (t + ' ' + r + ' ' + b + ' ' + l)) + ';'
        }
        return val;
      }

      val += opt(padding, 'padding') + opt(margin, 'margin');
      return val.replace(/^[ \n\r\t;]*|[ \n\r\t]*$/, '').replace(/;([ \n\r\t]+)|\1;/g, ';')
        .replace(/(&((l|g)t|quot|#39))?;{2,}/g, function (a, b) {
          return b ? b + ";;" : ';'
        });
    },

    /**
     * 克隆对象
     * @method clone
     * @param { Object } source 源对象
     * @return { Object } source的一个副本
     */

    /**
     * 深度克隆对象，将source的属性克隆到target对象， 会覆盖target重名的属性。
     * @method clone
     * @param { Object } source 源对象
     * @param { Object } target 目标对象
     * @return { Object } 附加了source对象所有属性的target对象
     */
    clone: function (source, target) {
      var tmp;
      target = target || {};
      for (var i in source) {
        if (source.hasOwnProperty(i)) {
          tmp = source[i];
          if (typeof tmp == 'object') {
            target[i] = utils.isArray(tmp) ? [] : {};
            utils.clone(source[i], target[i])
          } else {
            target[i] = tmp;
          }
        }
      }
      return target;
    },

    /**
     * 把cm／pt为单位的值转换为px为单位的值
     * @method transUnitToPx
     * @param { String } 待转换的带单位的字符串
     * @return { String } 转换为px为计量单位的值的字符串
     * @example
     * ```javascript
     *
     * //output: 500px
     * console.log( UE.utils.transUnitToPx( '20cm' ) );
     *
     * //output: 27px
     * console.log( UE.utils.transUnitToPx( '20pt' ) );
     *
     * ```
     */
    transUnitToPx: function (val) {
      if (!/(pt|cm)/.test(val)) {
        return val
      }
      var unit;
      val.replace(/([\d.]+)(\w+)/, function (str, v, u) {
        val = v;
        unit = u;
      });
      switch (unit) {
        case 'cm':
          val = parseFloat(val) * 25;
          break;
        case 'pt':
          val = Math.round(parseFloat(val) * 96 / 72);
      }
      return val + (val ? 'px' : '');
    },

    /**
     * 在dom树ready之后执行给定的回调函数
     * @method domReady
     * @remind 如果在执行该方法的时候， dom树已经ready， 那么回调函数将立刻执行
     * @param { Function } fn dom树ready之后的回调函数
     * @example
     * ```javascript
     *
     * UE.utils.domReady( function () {
     *
     *     console.log('123');
     *
     * } );
     *
     * ```
     */
    domReady: function () {

      var fnArr = [];

      function doReady(doc) {
        //确保onready只执行一次
        doc.isReady = true;
        for (var ci; ci = fnArr.pop(); ci()) {}
      }

      return function (onready, win) {
        win = win || window;
        var doc = win.document;
        onready && fnArr.push(onready);
        if (doc.readyState === "complete") {
          doReady(doc);
        } else {
          doc.isReady && doReady(doc);
          if (browser.ie && browser.version != 11) {
            (function () {
              if (doc.isReady) return;
              try {
                doc.documentElement.doScroll("left");
              } catch (error) {
                setTimeout(arguments.callee, 0);
                return;
              }
              doReady(doc);
            })();
            win.attachEvent('onload', function () {
              doReady(doc)
            });
          } else {
            doc.addEventListener("DOMContentLoaded", function () {
              doc.removeEventListener("DOMContentLoaded", arguments.callee, false);
              doReady(doc);
            }, false);
            win.addEventListener('load', function () {
              doReady(doc)
            }, false);
          }
        }

      }
    }(),

    /**
     * 动态添加css样式
     * @method cssRule
     * @param { String } 节点名称
     * @grammar UE.utils.cssRule('添加的样式的节点名称',['样式'，'放到哪个document上'])
     * @grammar UE.utils.cssRule('body','body{background:#ccc}') => null  //给body添加背景颜色
     * @grammar UE.utils.cssRule('body') =>样式的字符串  //取得key值为body的样式的内容,如果没有找到key值先关的样式将返回空，例如刚才那个背景颜色，将返回 body{background:#ccc}
     * @grammar UE.utils.cssRule('body',document) => 返回指定key的样式，并且指定是哪个document
     * @grammar UE.utils.cssRule('body','') =>null //清空给定的key值的背景颜色
     */
    cssRule: browser.ie && browser.version != 11 ? function (key, style, doc) {
      var indexList, index;
      if (style === undefined || style && style.nodeType && style.nodeType == 9) {
        //获取样式
        doc = style && style.nodeType && style.nodeType == 9 ? style : (doc || document);
        indexList = doc.indexList || (doc.indexList = {});
        index = indexList[key];
        if (index !== undefined) {
          return doc.styleSheets[index].cssText
        }
        return undefined;
      }
      doc = doc || document;
      indexList = doc.indexList || (doc.indexList = {});
      index = indexList[key];
      //清除样式
      if (style === '') {
        if (index !== undefined) {
          doc.styleSheets[index].cssText = '';
          delete indexList[key];
          return true
        }
        return false;
      }

      //添加样式
      if (index !== undefined) {
        sheetStyle = doc.styleSheets[index];
      } else {
        sheetStyle = doc.createStyleSheet('', index = doc.styleSheets.length);
        indexList[key] = index;
      }
      sheetStyle.cssText = style;
    } : function (key, style, doc) {
      var head, node;
      if (style === undefined || style && style.nodeType && style.nodeType == 9) {
        //获取样式
        doc = style && style.nodeType && style.nodeType == 9 ? style : (doc || document);
        node = doc.getElementById(key);
        return node ? node.innerHTML : undefined;
      }
      doc = doc || document;
      node = doc.getElementById(key);

      //清除样式
      if (style === '') {
        if (node) {
          node.parentNode.removeChild(node);
          return true
        }
        return false;
      }

      //添加样式
      if (node) {
        node.innerHTML = style;
      } else {
        node = doc.createElement('style');
        node.id = key;
        node.innerHTML = style;
        doc.getElementsByTagName('head')[0].appendChild(node);
      }
    },
    sort: function (array, compareFn) {
      compareFn = compareFn || function (item1, item2) { return item1.localeCompare(item2); };
      for (var i = 0, len = array.length; i < len; i++) {
        for (var j = i, length = array.length; j < length; j++) {
          if (compareFn(array[i], array[j]) > 0) {
            var t = array[i];
            array[i] = array[j];
            array[j] = t;
          }
        }
      }
      return array;
    },
    serializeParam: function (json) {
      var strArr = [];
      for (var i in json) {
        //忽略默认的几个参数
        if (i == "method" || i == "timeout" || i == "async") continue;
        //传递过来的对象和函数不在提交之列
        if (!((typeof json[i]).toLowerCase() == "function" || (typeof json[i]).toLowerCase() == "object")) {
          strArr.push(encodeURIComponent(i) + "=" + encodeURIComponent(json[i]));
        } else if (utils.isArray(json[i])) {
          //支持传数组内容
          for (var j = 0; j < json[i].length; j++) {
            strArr.push(encodeURIComponent(i) + "[]=" + encodeURIComponent(json[i][j]));
          }
        }
      }
      return strArr.join("&");
    },
    formatUrl: function (url) {
      var u = url.replace(/&&/g, '&');
      u = u.replace(/\?&/g, '?');
      u = u.replace(/&$/g, '');
      u = u.replace(/&#/g, '#');
      u = u.replace(/&+/g, '&');
      return u;
    },
    isCrossDomainUrl: function (url) {
      var a = document.createElement('a');
      a.href = url;
      if (browser.ie) {
        a.href = a.href;
      }
      return !(a.protocol == location.protocol && a.hostname == location.hostname &&
        (a.port == location.port || (a.port == '80' && location.port == '') || (a.port == '' && location.port == '80')));
    },
    clearEmptyAttrs: function (obj) {
      for (var p in obj) {
        if (obj[p] === '') {
          delete obj[p]
        }
      }
      return obj;
    },
    str2json: function (s) {

      if (!utils.isString(s)) return null;
      if (window.JSON) {
        return JSON.parse(s);
      } else {
        return (new Function("return " + utils.trim(s || '')))();
      }

    },
    json2str: (function () {

      if (window.JSON) {

        return JSON.stringify;

      } else {

        var escapeMap = {
          "\b": '\\b',
          "\t": '\\t',
          "\n": '\\n',
          "\f": '\\f',
          "\r": '\\r',
          '"': '\\"',
          "\\": '\\\\'
        };

        function encodeString(source) {
          if (/["\\\x00-\x1f]/.test(source)) {
            source = source.replace(
              /["\\\x00-\x1f]/g,
              function (match) {
                var c = escapeMap[match];
                if (c) {
                  return c;
                }
                c = match.charCodeAt();
                return "\\u00" +
                  Math.floor(c / 16).toString(16) +
                  (c % 16).toString(16);
              });
          }
          return '"' + source + '"';
        }

        function encodeArray(source) {
          var result = ["["],
            l = source.length,
            preComma, i, item;

          for (i = 0; i < l; i++) {
            item = source[i];

            switch (typeof item) {
              case "undefined":
              case "function":
              case "unknown":
                break;
              default:
                if (preComma) {
                  result.push(',');
                }
                result.push(utils.json2str(item));
                preComma = 1;
            }
          }
          result.push("]");
          return result.join("");
        }

        function pad(source) {
          return source < 10 ? '0' + source : source;
        }

        function encodeDate(source) {
          return '"' + source.getFullYear() + "-" +
            pad(source.getMonth() + 1) + "-" +
            pad(source.getDate()) + "T" +
            pad(source.getHours()) + ":" +
            pad(source.getMinutes()) + ":" +
            pad(source.getSeconds()) + '"';
        }

        return function (value) {
          switch (typeof value) {
            case 'undefined':
              return 'undefined';

            case 'number':
              return isFinite(value) ? String(value) : "null";

            case 'string':
              return encodeString(value);

            case 'boolean':
              return String(value);

            default:
              if (value === null) {
                return 'null';
              } else if (utils.isArray(value)) {
                return encodeArray(value);
              } else if (utils.isDate(value)) {
                return encodeDate(value);
              } else {
                var result = ['{'],
                  encode = utils.json2str,
                  preComma,
                  item;

                for (var key in value) {
                  if (Object.prototype.hasOwnProperty.call(value, key)) {
                    item = value[key];
                    switch (typeof item) {
                      case 'undefined':
                      case 'unknown':
                      case 'function':
                        break;
                      default:
                        if (preComma) {
                          result.push(',');
                        }
                        preComma = 1;
                        result.push(encode(key) + ':' + encode(item));
                    }
                  }
                }
                result.push('}');
                return result.join('');
              }
          }
        };
      }

    })()

  };
  var video = {},
    uploadVideoList = [],
    isModifyUploadVideo = false,
    uploadFile;

  window.onload = function () {
    $focus($G("videoUrl"));
    initTabs();
    initVideo();
    initUpload();
  };

  /* 初始化tab标签 */
  function initTabs() {
    var tabs = $G('tabHeads').children;
    for (var i = 0; i < tabs.length; i++) {
      domUtils.on(tabs[i], "click", function (e) {
        var j, bodyId, target = e.target || e.srcElement;
        for (j = 0; j < tabs.length; j++) {
          bodyId = tabs[j].getAttribute('data-content-id');
          if (tabs[j] == target) {
            domUtils.addClass(tabs[j], 'focus');
            domUtils.addClass($G(bodyId), 'focus');
          } else {
            domUtils.removeClasses(tabs[j], 'focus');
            domUtils.removeClasses($G(bodyId), 'focus');
          }
        }
      });
    }
  }

  function initVideo() {
    createAlignButton(["videoFloat", "upload_alignment"]);
    addUrlChangeListener($G("videoUrl"));
    addOkListener();

    //编辑视频时初始化相关信息
    (function () {
      var img = editor.selection.getRange().getClosedNode(),
        url;
      if (img && img.className) {
        var hasFakedClass = img.className.indexOf("edui-faked-video") !== -1,
          hasUploadClass = img.className.indexOf("edui-upload-video") !== -1;
        if (hasFakedClass || hasUploadClass) {
          $G("videoUrl").value = url = img.getAttribute("_url");
          $G("videoWidth").value = img.width;
          $G("videoHeight").value = img.height;
          var align = domUtils.getComputedStyle(img, "float"),
            parentAlign = domUtils.getComputedStyle(img.parentNode, "text-align");
          updateAlignButton(parentAlign === "center" ? "center" : align);
        }
        if (hasUploadClass) {
          isModifyUploadVideo = true;
        }
      }
      createPreviewVideo(url);
    })();
  }

  /**
   * 监听确认和取消两个按钮事件，用户执行插入或者清空正在播放的视频实例操作
   */
  function addOkListener() {
    dialog.onok = function () {
      $G("preview").innerHTML = "";
      var currentTab = findFocus("tabHeads", "tabSrc");
      switch (currentTab) {
        case "video":
          return insertSingle();
          break;
        case "videoSearch":
          return insertSearch("searchList");
          break;
        case "upload":
          // return insertUpload();
          break;
      }
    };
    dialog.oncancel = function () {
      $G("preview").innerHTML = "";
    };
  }

  /**
   * 依据传入的align值更新按钮信息
   * @param align
   */
  function updateAlignButton(align) {
    var aligns = $G("videoFloat").children;
    for (var i = 0, ci; ci = aligns[i++];) {
      if (ci.getAttribute("name") == align) {
        if (ci.className != "focus") {
          ci.className = "focus";
        }
      } else {
        if (ci.className == "focus") {
          ci.className = "";
        }
      }
    }
  }

  /**
   * 将单个视频信息插入编辑器中
   */
  function insertSingle() {
    var width = $G("videoWidth"),
      height = $G("videoHeight"),
      url = $G('videoUrl').value,
      align = findFocus("videoFloat", "name");
    if (!url) return false;
    if (!checkNum([width, height])) return false;
    editor.execCommand('insertvideo', {
      url: convert_url(url),
      width: width.value,
      height: height.value,
      align: align
    }, isModifyUploadVideo ? 'upload' : null);
  }

  /**
   * 将元素id下的所有代表视频的图片插入编辑器中
   * @param id
   */
  function insertSearch(id) {
    var imgs = domUtils.getElementsByTagName($G(id), "img"),
      videoObjs = [];
    for (var i = 0, img; img = imgs[i++];) {
      if (img.getAttribute("selected")) {
        videoObjs.push({
          url: img.getAttribute("ue_video_url"),
          width: 420,
          height: 280,
          align: "none"
        });
      }
    }
    editor.execCommand('insertvideo', videoObjs);
  }

  /**
   * 找到id下具有focus类的节点并返回该节点下的某个属性
   * @param id
   * @param returnProperty
   */
  function findFocus(id, returnProperty) {
    var tabs = $G(id).children,
      property;
    for (var i = 0, ci; ci = tabs[i++];) {
      if (ci.className == "focus") {
        property = ci.getAttribute(returnProperty);
        break;
      }
    }
    return property;
  }

  function convert_url(url) {
    if (!url) return '';
    url = utils.trim(url)
      .replace(/v\.youku\.com\/v_show\/id_([\w\-=]+)\.html/i, 'player.youku.com/player.php/sid/$1/v.swf')
      .replace(/(www\.)?youtube\.com\/watch\?v=([\w\-]+)/i, "www.youtube.com/v/$2")
      .replace(/youtu.be\/(\w+)$/i, "www.youtube.com/v/$1")
      .replace(/v\.ku6\.com\/.+\/([\w\.]+)\.html.*$/i, "player.ku6.com/refer/$1/v.swf")
      .replace(/www\.56\.com\/u\d+\/v_([\w\-]+)\.html/i, "player.56.com/v_$1.swf")
      .replace(/www.56.com\/w\d+\/play_album\-aid\-\d+_vid\-([^.]+)\.html/i, "player.56.com/v_$1.swf")
      .replace(/v\.pps\.tv\/play_([\w]+)\.html.*$/i, "player.pps.tv/player/sid/$1/v.swf")
      .replace(/www\.letv\.com\/ptv\/vplay\/([\d]+)\.html.*$/i, "i7.imgs.letv.com/player/swfPlayer.swf?id=$1&autoplay=0")
      .replace(/www\.tudou\.com\/programs\/view\/([\w\-]+)\/?/i, "www.tudou.com/v/$1")
      .replace(/v\.qq\.com\/cover\/[\w]+\/[\w]+\/([\w]+)\.html/i, "static.video.qq.com/TPout.swf?vid=$1")
      .replace(/v\.qq\.com\/.+[\?\&]vid=([^&]+).*$/i, "static.video.qq.com/TPout.swf?vid=$1")
      .replace(/my\.tv\.sohu\.com\/[\w]+\/[\d]+\/([\d]+)\.shtml.*$/i, "share.vrs.sohu.com/my/v.swf&id=$1");

    return url;
  }

  /**
   * 检测传入的所有input框中输入的长宽是否是正数
   * @param nodes input框集合，
   */
  function checkNum(nodes) {
    for (var i = 0, ci; ci = nodes[i++];) {
      var value = ci.value;
      if (!isNumber(value) && value) {
        alert(lang.numError);
        ci.value = "";
        ci.focus();
        return false;
      }
    }
    return true;
  }

  /**
   * 数字判断
   * @param value
   */
  function isNumber(value) {
    return /(0|^[1-9]\d*$)/.test(value);
  }

  /**
   * 创建图片浮动选择按钮
   * @param ids
   */
  function createAlignButton(ids) {
    for (var i = 0, ci; ci = ids[i++];) {
      var floatContainer = $G(ci),
        nameMaps = { "none": lang['default'], "left": lang.floatLeft, "right": lang.floatRight, "center": lang.block };
      for (var j in nameMaps) {
        var div = document.createElement("div");
        div.setAttribute("name", j);
        if (j == "none") div.className = "focus";
        div.style.cssText = "background:url(images/" + j + "_focus.jpg);";
        div.setAttribute("title", nameMaps[j]);
        floatContainer.appendChild(div);
      }
      switchSelect(ci);
    }
  }

  /**
   * 选择切换
   * @param selectParentId
   */
  function switchSelect(selectParentId) {
    var selects = $G(selectParentId).children;
    for (var i = 0, ci; ci = selects[i++];) {
      domUtils.on(ci, "click", function () {
        for (var j = 0, cj; cj = selects[j++];) {
          cj.className = "";
          cj.removeAttribute && cj.removeAttribute("class");
        }
        this.className = "focus";
      })
    }
  }

  /**
   * 监听url改变事件
   * @param url
   */
  function addUrlChangeListener(url) {
    if (browser.ie) {
      url.onpropertychange = function () {
        createPreviewVideo(this.value);
      }
    } else {
      url.addEventListener("input", function () {
        createPreviewVideo(this.value);
      }, false);
    }
  }

  /**
   * 根据url生成视频预览
   * @param url
   */
  function createPreviewVideo(url) {
    if (!url) return;

    var conUrl = convert_url(url);

    conUrl = utils.unhtmlForUrl(conUrl);

    $G("preview").innerHTML = '<div class="previewMsg"><span>' + lang.urlError + '</span></div>' +
      '<video class="previewVideo" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"' +
      ' src="' + conUrl + '"' +
      ' width="' + 420 + '"' +
      ' height="' + 280 + '"' +
      ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true"  controls="controls">' +
      '</video>';
  }

  /* 插入上传视频 */
  function insertUpload() {
    var videoObjs = [],
      uploadDir = editor.getOpt('videoUrlPrefix'),
      width = parseInt($G('upload_width').value, 10) || 420,
      height = parseInt($G('upload_height').value, 10) || 280,
      align = findFocus("upload_alignment", "name") || 'none';
    for (var key in uploadVideoList) {
      var file = uploadVideoList[key];
      if (file == undefined) {
        continue;
      }
      videoObjs.push({
        url: uploadDir + file.url,
        width: width,
        height: height,
        align: align
      });
    }

    var count = uploadFile.getQueueCount();
    if (count) {
      $('.info', '#queueList').html('<span style="color:red;">' + '还有2个未上传文件'.replace(/[\d]/, count) + '</span>');
      return false;
    } else {
      editor.execCommand('insertvideo', videoObjs, 'upload');
    }
  }

  /*初始化上传标签*/
  function initUpload() {
    uploadFile = new UploadFile('queueList');
  }


  /* 上传附件 */
  function UploadFile(target) {
    this.$wrap = target.constructor == String ? $('#' + target) : $(target);
    this.init();
  }
  UploadFile.prototype = {
    init: function () {
      this.fileList = [];
      this.initContainer();
      this.initUploader();
    },
    initContainer: function () {
      this.$queue = this.$wrap.find('.filelist');
    },
    /* 初始化容器 */
    initUploader: function () {
      var _this = this,
        $ = jQuery, // just in case. Make sure it's not an other libaray.
        $wrap = _this.$wrap,
        // 图片容器
        $queue = $wrap.find('.filelist'),
        // 状态栏，包括进度和控制按钮
        $statusBar = $wrap.find('.statusBar'),
        // 文件总体选择信息。
        $info = $statusBar.find('.info'),
        // 上传按钮
        $upload = $wrap.find('.uploadBtn'),
        // 上传按钮
        $filePickerBtn = $wrap.find('.filePickerBtn'),
        // 上传按钮
        $filePickerBlock = $wrap.find('.filePickerBlock'),
        // 没选择文件之前的内容。
        $placeHolder = $wrap.find('.placeholder'),
        // 总体进度条
        $progress = $statusBar.find('.progress').hide(),
        // 添加的文件数量
        fileCount = 0,
        // 添加的文件总大小
        fileSize = 0,
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,
        // 缩略图大小
        thumbnailWidth = 113 * ratio,
        thumbnailHeight = 113 * ratio,
        // 可能有pedding, ready, uploading, confirm, done.
        state = '',
        // 所有文件的进度信息，key为file id
        percentages = {},
        supportTransition = (function () {
          var s = document.createElement('p').style,
            r = 'transition' in s ||
            'WebkitTransition' in s ||
            'MozTransition' in s ||
            'msTransition' in s ||
            'OTransition' in s;
          s = null;
          return r;
        })(),
        // WebUploader实例
        uploader,
        actionUrl = editor.getActionUrl(editor.getOpt('videoActionName')),
        fileMaxSize = editor.getOpt('videoMaxSize'),
        acceptExtensions = (editor.getOpt('videoAllowFiles') || []).join('').replace(/\./g, ',').replace(/^[,]/, '');;

      if (!WebUploader.Uploader.support()) {
        $('#filePickerReady').after($('<div>').html(lang.errorNotSupport)).hide();
        return;
      } else if (!editor.getOpt('videoActionName')) {
        $('#filePickerReady').after($('<div>').html(lang.errorLoadConfig)).hide();
        return;
      }

      uploader = _this.uploader = WebUploader.create({
        pick: {
          id: '#filePickerReady',
          label: lang.uploadSelectFile
        },
        swf: '../../third-party/webuploader/Uploader.swf',
        server: actionUrl,
        fileVal: editor.getOpt('videoFieldName'),
        duplicate: true,
        fileSingleSizeLimit: fileMaxSize,
        compress: false
      });
      uploader.addButton({
        id: '#filePickerBlock'
      });
      uploader.addButton({
        id: '#filePickerBtn',
        label: lang.uploadAddFile
      });

      setState('pedding');

      // 当有文件添加进来时执行，负责view的创建
      function addFile(file) {
        var $li = $('<li id="' + file.id + '">' +
            '<p class="title">' + file.name + '</p>' +
            '<p class="imgWrap"></p>' +
            '<p class="progress"><span></span></p>' +
            '</li>'),

          $btns = $('<div class="file-panel">' +
            '<span class="cancel">' + lang.uploadDelete + '</span>' +
            '<span class="rotateRight">' + lang.uploadTurnRight + '</span>' +
            '<span class="rotateLeft">' + lang.uploadTurnLeft + '</span></div>').appendTo($li),
          $prgress = $li.find('p.progress span'),
          $wrap = $li.find('p.imgWrap'),
          $info = $('<p class="error"></p>').hide().appendTo($li),

          showError = function (code) {
            switch (code) {
              case 'exceed_size':
                text = lang.errorExceedSize;
                break;
              case 'interrupt':
                text = lang.errorInterrupt;
                break;
              case 'http':
                text = lang.errorHttp;
                break;
              case 'not_allow_type':
                text = lang.errorFileType;
                break;
              default:
                text = lang.errorUploadRetry;
                break;
            }
            $info.text(text).show();
          };

        if (file.getStatus() === 'invalid') {
          showError(file.statusText);
        } else {
          $wrap.text(lang.uploadPreview);
          if ('|png|jpg|jpeg|bmp|gif|'.indexOf('|' + file.ext.toLowerCase() + '|') == -1) {
            $wrap.empty().addClass('notimage').append('<i class="file-preview file-type-' + file.ext.toLowerCase() + '"></i>' +
              '<span class="file-title">' + file.name + '</span>');
          } else {
            if (browser.ie && browser.version <= 7) {
              $wrap.text(lang.uploadNoPreview);
            } else {
              uploader.makeThumb(file, function (error, src) {
                if (error || !src || (/^data:/.test(src) && browser.ie && browser.version <= 7)) {
                  $wrap.text(lang.uploadNoPreview);
                } else {
                  var $img = $('<img src="' + src + '">');
                  $wrap.empty().append($img);
                  $img.on('error', function () {
                    $wrap.text(lang.uploadNoPreview);
                  });
                }
              }, thumbnailWidth, thumbnailHeight);
            }
          }
          percentages[file.id] = [file.size, 0];
          file.rotation = 0;

          /* 检查文件格式 */
          if (!file.ext || acceptExtensions.indexOf(file.ext.toLowerCase()) == -1) {
            showError('not_allow_type');
            uploader.removeFile(file);
          }
        }

        file.on('statuschange', function (cur, prev) {
          if (prev === 'progress') {
            $prgress.hide().width(0);
          } else if (prev === 'queued') {
            $li.off('mouseenter mouseleave');
            $btns.remove();
          }
          // 成功
          if (cur === 'error' || cur === 'invalid') {
            showError(file.statusText);
            percentages[file.id][1] = 1;
          } else if (cur === 'interrupt') {
            showError('interrupt');
          } else if (cur === 'queued') {
            percentages[file.id][1] = 0;
          } else if (cur === 'progress') {
            $info.hide();
            $prgress.css('display', 'block');
          } else if (cur === 'complete') {}

          $li.removeClass('state-' + prev).addClass('state-' + cur);
        });

        $li.on('mouseenter', function () {
          $btns.stop().animate({ height: 30 });
        });
        $li.on('mouseleave', function () {
          $btns.stop().animate({ height: 0 });
        });

        $btns.on('click', 'span', function () {
          var index = $(this).index(),
            deg;

          switch (index) {
            case 0:
              uploader.removeFile(file);
              return;
            case 1:
              file.rotation += 90;
              break;
            case 2:
              file.rotation -= 90;
              break;
          }

          if (supportTransition) {
            deg = 'rotate(' + file.rotation + 'deg)';
            $wrap.css({
              '-webkit-transform': deg,
              '-mos-transform': deg,
              '-o-transform': deg,
              'transform': deg
            });
          } else {
            $wrap.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~~((file.rotation / 90) % 4 + 4) % 4) + ')');
          }

        });

        $li.insertBefore($filePickerBlock);
      }

      // 负责view的销毁
      function removeFile(file) {
        var $li = $('#' + file.id);
        delete percentages[file.id];
        updateTotalProgress();
        $li.off().find('.file-panel').off().end().remove();
      }

      function updateTotalProgress() {
        var loaded = 0,
          total = 0,
          spans = $progress.children(),
          percent;

        $.each(percentages, function (k, v) {
          total += v[0];
          loaded += v[0] * v[1];
        });

        percent = total ? loaded / total : 0;

        spans.eq(0).text(Math.round(percent * 100) + '%');
        spans.eq(1).css('width', Math.round(percent * 100) + '%');
        updateStatus();
      }

      function setState(val, files) {

        if (val != state) {

          var stats = uploader.getStats();

          $upload.removeClass('state-' + state);
          $upload.addClass('state-' + val);

          switch (val) {

            /* 未选择文件 */
            case 'pedding':
              $queue.addClass('element-invisible');
              $statusBar.addClass('element-invisible');
              $placeHolder.removeClass('element-invisible');
              $progress.hide();
              $info.hide();
              uploader.refresh();
              break;

              /* 可以开始上传 */
            case 'ready':
              $placeHolder.addClass('element-invisible');
              $queue.removeClass('element-invisible');
              $statusBar.removeClass('element-invisible');
              $progress.hide();
              $info.show();
              $upload.text(lang.uploadStart);
              uploader.refresh();
              break;

              /* 上传中 */
            case 'uploading':
              $progress.show();
              $info.hide();
              $upload.text(lang.uploadPause);
              break;

              /* 暂停上传 */
            case 'paused':
              $progress.show();
              $info.hide();
              $upload.text(lang.uploadContinue);
              break;

            case 'confirm':
              $progress.show();
              $info.hide();
              $upload.text(lang.uploadStart);

              stats = uploader.getStats();
              if (stats.successNum && !stats.uploadFailNum) {
                setState('finish');
                return;
              }
              break;

            case 'finish':
              $progress.hide();
              $info.show();
              if (stats.uploadFailNum) {
                $upload.text(lang.uploadRetry);
              } else {
                $upload.text(lang.uploadStart);
              }
              break;
          }

          state = val;
          updateStatus();

        }

        if (!_this.getQueueCount()) {
          $upload.addClass('disabled')
        } else {
          $upload.removeClass('disabled')
        }

      }

      function updateStatus() {
        var text = '',
          stats;

        if (state === 'ready') {
          text = lang.updateStatusReady.replace('_', fileCount).replace('_KB', WebUploader.formatSize(fileSize));
        } else if (state === 'confirm') {
          stats = uploader.getStats();
          if (stats.uploadFailNum) {
            text = lang.updateStatusConfirm.replace('_', stats.successNum).replace('_', stats.successNum);
          }
        } else {
          stats = uploader.getStats();
          text = lang.updateStatusFinish.replace('_', fileCount).
          replace('_KB', WebUploader.formatSize(fileSize)).
          replace('_', stats.successNum);

          if (stats.uploadFailNum) {
            text += lang.updateStatusError.replace('_', stats.uploadFailNum);
          }
        }

        $info.html(text);
      }

      uploader.on('fileQueued', function (file) {
        fileCount++;
        fileSize += file.size;

        if (fileCount === 1) {
          $placeHolder.addClass('element-invisible');
          $statusBar.show();
        }

        addFile(file);
      });

      uploader.on('fileDequeued', function (file) {
        fileCount--;
        fileSize -= file.size;

        removeFile(file);
        updateTotalProgress();
      });

      uploader.on('filesQueued', function (file) {
        if (!uploader.isInProgress() && (state == 'pedding' || state == 'finish' || state == 'confirm' || state == 'ready')) {
          setState('ready');
        }
        updateTotalProgress();
      });

      uploader.on('all', function (type, files) {
        switch (type) {
          case 'uploadFinished':
            setState('confirm', files);
            break;
          case 'startUpload':
            /* 添加额外的GET参数 */
            var params = utils.serializeParam(editor.queryCommandValue('serverparam')) || '',
              url = utils.formatUrl(actionUrl + (actionUrl.indexOf('?') == -1 ? '?' : '&') + 'encode=utf-8&' + params);
            uploader.option('server', url);
            setState('uploading', files);
            break;
          case 'stopUpload':
            setState('paused', files);
            break;
        }
      });

      uploader.on('uploadBeforeSend', function (file, data, header) {
        //这里可以通过data对象添加POST参数
        header['X_Requested_With'] = 'XMLHttpRequest';
      });

      uploader.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id),
          $percent = $li.find('.progress span');

        $percent.css('width', percentage * 100 + '%');
        percentages[file.id][1] = percentage;
        updateTotalProgress();
      });

      uploader.on('uploadSuccess', function (file, ret) {
        var $file = $('#' + file.id);
        try {
          var responseText = (ret._raw || ret),
            json = utils.str2json(responseText);
          if (json.state == 'SUCCESS') {
            uploadVideoList[$file.index()] = {
              'url': json.url,
              'type': json.type,
              'original': json.original
            }
            $file.append('<span class="success"></span>');
          } else {
            $file.find('.error').text(json.state).show();
          }
        } catch (e) {
          $file.find('.error').text(lang.errorServerUpload).show();
        }
      });

      uploader.on('uploadError', function (file, code) {});
      uploader.on('error', function (code, file) {
        if (code == 'Q_TYPE_DENIED' || code == 'F_EXCEED_SIZE') {
          addFile(file);
        }
      });
      uploader.on('uploadComplete', function (file, ret) {});

      $upload.on('click', function () {
        if ($(this).hasClass('disabled')) {
          return false;
        }

        if (state === 'ready') {
          uploader.upload();
        } else if (state === 'paused') {
          uploader.upload();
        } else if (state === 'uploading') {
          uploader.stop();
        }
      });

      $upload.addClass('state-' + state);
      updateTotalProgress();
    },
    getQueueCount: function () {
      var file, i, status, readyFile = 0,
        files = this.uploader.getFiles();
      for (i = 0; file = files[i++];) {
        status = file.getStatus();
        if (status == 'queued' || status == 'uploading' || status == 'progress') readyFile++;
      }
      return readyFile;
    },
    refresh: function () {
      this.uploader.refresh();
    }
  };

})();
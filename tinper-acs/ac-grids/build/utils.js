'use strict';

var cb = {};

var dom = function dom(arr) {
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    this[i] = arr[i];
  }this.length = len;
  return this;
};
dom.prototype = {
  is: function is(selector) {
    if (!this[0] || typeof selector === 'undefined') return false;
    var el = this[0];
    if (typeof selector === 'string') {
      if (el === document) return selector === document;
      if (el === window) return selector === window;
      if (el.matches) return el.matches(selector);
      if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
      if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
      if (el.msMatchesSelector) return el.msMatchesSelector(selector);
      var compareWith = cb.dom(selector);
      for (var i = 0, len = compareWith.length; i < len; i++) {
        if (compareWith[i] === el) return true;
      }
      return false;
    }
    if (selector === document) return el === document;
    if (selector === window) return el === window;
    if (selector.nodeType || selector instanceof cb.dom) {
      var _compareWith = selector.nodeType ? [selector] : selector;
      for (var _i = 0, _len = _compareWith.length; _i < _len; _i++) {
        if (_compareWith[_i] === el) return true;
      }
      return false;
    }
    return false;
  },
  parents: function parents(selector) {
    var parents = [];
    for (var i = 0, len = this.length; i < len; i++) {
      var parent = this[i].parentNode;
      while (parent) {
        if (selector) {
          if (cb.dom(parent).is(selector)) parents.push(parent);
        } else {
          parents.push(parent);
        }
        parent = parent.parentNode;
      }
    }
    return cb.dom(cb.dom.unique(parents));
  }
};

cb.dom = function (selector, context) {
  if (!selector) return new dom([]);
  if (selector && !context && selector instanceof dom) return selector;
  var arr = [];
  if (typeof selector === 'string') {
    var html = selector.trim();
    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
      var toCreate = void 0;
      if (html.indexOf('<li') === 0) {
        toCreate = 'ul';
      } else if (html.indexOf('<tr') === 0) {
        toCreate = 'tbody';
      } else if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) {
        toCreate = 'tr';
      } else if (html.indexOf('<tbody') === 0) {
        toCreate = 'table';
      } else if (html.indexOf('<option') === 0) {
        toCreate = 'select';
      } else {
        toCreate = 'div';
      }
      var tempParent = document.createElement(toCreate);
      tempParent.innerHTML = selector;
      for (var i = 0, len = tempParent.childNodes.length; i < len; i++) {
        arr.push(tempParent.childNodes[i]);
      }
    } else {
      if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
        arr.push(document.getElementById(selector.split('#')[1]));
      } else {
        var els = (context || document).querySelectorAll(selector);
        for (var _i2 = 0, _len2 = els.length; _i2 < _len2; _i2++) {
          if (els[_i2]) arr.push(els[_i2]);
        }
      }
    }
  } else if (selector.nodeType || selector === window || selector === document) {
    arr.push(selector);
  } else if (selector.length && selector[0].nodeType) {
    for (var _i3 = 0, _len3 = selector.length; _i3 < _len3; _i3++) {
      arr.push(selector[_i3]);
    }
  }
  return new dom(arr);
};
cb.dom.unique = function (arr) {
  var unique = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
  }
  return unique;
};

module.exports = cb;
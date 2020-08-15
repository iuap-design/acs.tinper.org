const cb = {};

const dom = function (arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++)
    this[i] = arr[i];
  this.length = len;
  return this;
};
dom.prototype = {
  is: function (selector) {
    if (!this[0] || typeof selector === 'undefined')
      return false;
    const el = this[0];
    if (typeof selector === 'string') {
      if (el === document)
        return selector === document;
      if (el === window)
        return selector === window;
      if (el.matches)
        return el.matches(selector);
      if (el.webkitMatchesSelector)
        return el.webkitMatchesSelector(selector);
      if (el.mozMatchesSelector)
        return el.mozMatchesSelector(selector);
      if (el.msMatchesSelector)
        return el.msMatchesSelector(selector);
      const compareWith = cb.dom(selector);
      for (let i = 0, len = compareWith.length; i < len; i++) {
        if (compareWith[i] === el)
          return true;
      }
      return false;
    }
    if (selector === document)
      return el === document;
    if (selector === window)
      return el === window;
    if (selector.nodeType || selector instanceof cb.dom) {
      const compareWith = selector.nodeType ? [selector] : selector;
      for (let i = 0, len = compareWith.length; i < len; i++) {
        if (compareWith[i] === el)
          return true;
      }
      return false;
    }
    return false;
  },
  parents: function (selector) {
    const parents = [];
    for (let i = 0, len = this.length; i < len; i++) {
      let parent = this[i].parentNode;
      while (parent) {
        if (selector) {
          if (cb.dom(parent).is(selector))
            parents.push(parent);
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
  if (!selector)
    return new dom([]);
  if (selector && !context && selector instanceof dom)
    return selector;
  const arr = [];
  if (typeof selector === 'string') {
    const html = selector.trim();
    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
      let toCreate;
      if (html.indexOf('<li') === 0) {
        toCreate = 'ul';
      } else if (html.indexOf('<tr') === 0) {
        toCreate = 'tbody';
      } else if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) {
        toCreate = 'tr';
      } else if (html.indexOf('<tbody') === 0) {
        toCreate = 'table'
      } else if (html.indexOf('<option') === 0) {
        toCreate = 'select';
      } else {
        toCreate = 'div';
      }
      const tempParent = document.createElement(toCreate);
      tempParent.innerHTML = selector;
      for (let i = 0, len = tempParent.childNodes.length; i < len; i++)
        arr.push(tempParent.childNodes[i]);
    } else {
      if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
        arr.push(document.getElementById(selector.split('#')[1]));
      } else {
        const els = (context || document).querySelectorAll(selector);
        for (let i = 0, len = els.length; i < len; i++)
          if (els[i])
            arr.push(els[i]);
      }
    }
  } else if (selector.nodeType || selector === window || selector === document) {
    arr.push(selector)
  } else if (selector.length && selector[0].nodeType) {
    for (let i = 0, len = selector.length; i < len; i++) {
      arr.push(selector[i]);
    }
  }
  return new dom(arr);
};
cb.dom.unique = function (arr) {
  const unique = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    if (unique.indexOf(arr[i]) === -1)
      unique.push(arr[i]);
  }
  return unique;
};

module.exports = cb;

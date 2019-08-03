"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      propsPath = _ref.propsPath,
      statePath = _ref.statePath;

  function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps == null) {
      nextProps = {};
    }

    if (nextState == null) {
      nextState = {};
    }

    var thisProps = this.props || {};
    var thisState = this.state || {};

    if (propsPath) {
      nextProps = getTargetPath(nextProps, propsPath);
      thisProps = getTargetPath(this.props, propsPath);
    }

    if (statePath) {
      nextState = getTargetPath(nextState, statePath);
      thisState = getTargetPath(this.state, statePath);
    }

    if (Object.keys(thisProps).length !== Object.keys(nextProps).length || Object.keys(thisState).length !== Object.keys(nextState).length) {
      return true;
    }

    var index = 0;

    var propsKeys = Object.keys(nextProps);

    for (; index < propsKeys.length; index++) {
      var key = propsKeys[index];
      if (Object.prototype.toString.call(thisProps[key]) !== "[object Function]" && Object.prototype.toString.call(thisProps[key]) !== "[object Object]") {
        if (thisProps[key] !== nextProps[key] && !(0, _immutable.is)(thisProps[key], nextProps[key])) {
          return true;
        }
      }
    }

    var stateKeys = Object.keys(nextState);

    for (index = 0; index < stateKeys.length; index++) {
      var _key = stateKeys[index];

      if (Object.prototype.toString.call(thisState[_key]) !== "[object Function]" && Object.prototype.toString.call(thisState[_key]) !== "[object Object]") {
        if (thisState[_key] !== nextState[_key] && !(0, _immutable.is)(thisState[_key], nextState[_key])) {
          return true;
        }
      }
    }

    return false;
  }

  return function (component) {
    component.prototype.shouldComponentUpdate = shouldComponentUpdate;
    return component;
  };
};

var _immutable = require("immutable");

function getTargetPath(target, path) {
  var pathArr = path.split(".");

  pathArr.map(function (path) {
    target = target[path];
  });

  return target;
} /**
   * 处理 shouldComponentUpdate 的判断逻辑。
   *
   * Created by wangyang.
   */

module.exports = exports["default"];
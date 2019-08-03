/**
 * 处理 shouldComponentUpdate 的判断逻辑。
 *
 * Created by wangyang.
 */

import { is } from "immutable";

function getTargetPath(target, path) {
  const pathArr = path.split(".");

  pathArr.map(path => {
    target = target[path];
  });

  return target;
}

export default function({ propsPath, statePath } = {}) {
  function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps == null) {
      nextProps = {};
    }

    if (nextState == null) {
      nextState = {};
    }

    let thisProps = this.props || {};
    let thisState = this.state || {};

    if (propsPath) {
      nextProps = getTargetPath(nextProps, propsPath);
      thisProps = getTargetPath(this.props, propsPath);
    }

    if (statePath) {
      nextState = getTargetPath(nextState, statePath);
      thisState = getTargetPath(this.state, statePath);
    }

    if (
      Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length
    ) {
      return true;
    }

    let index = 0;

    const propsKeys = Object.keys(nextProps);

    for (; index < propsKeys.length; index++) {
      const key = propsKeys[index];
      if (
        Object.prototype.toString.call(thisProps[key]) !==
          "[object Function]" &&
        Object.prototype.toString.call(thisProps[key]) !== "[object Object]"
      ) {
        if (
          thisProps[key] !== nextProps[key] &&
          !is(thisProps[key], nextProps[key])
        ) {
          return true;
        }
      }
    }

    const stateKeys = Object.keys(nextState);

    for (index = 0; index < stateKeys.length; index++) {
      const key = stateKeys[index];

      if (
        Object.prototype.toString.call(thisState[key]) !==
          "[object Function]" &&
        Object.prototype.toString.call(thisState[key]) !== "[object Object]"
      ) {
        if (
          thisState[key] !== nextState[key] &&
          !is(thisState[key], nextState[key])
        ) {
          return true;
        }
      }
    }

    return false;
  }

  return function(component) {
    component.prototype.shouldComponentUpdate = shouldComponentUpdate;
    return component;
  };
}

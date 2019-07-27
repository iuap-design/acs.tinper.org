"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.TabHotKey = TabHotKey;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactHotkeys = require("react-hotkeys");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var keyMap = {
    nextTabHandler: ["right", "down"],
    nextTabUSRHandler: ["shift+right"],
    prevTabHandler: ["left", "up"],
    prevTabUSLHandler: ["shift+left"],
    expand: ["space"]
};

/**
 * @author bbqin
 * @param {*} props
 * @description  tab页签的hotkey逻辑
 * @return {null}
 */
function TabHotKey(props) {
    var _ref = props || {},
        _ref$hotKeyboard = _ref.hotKeyboard,
        hotKeyboard = _ref$hotKeyboard === undefined ? true : _ref$hotKeyboard,
        _ref$tabs = _ref.tabs,
        tabs = _ref$tabs === undefined ? [] : _ref$tabs,
        wrapperId = _ref.wrapperId,
        headerId = _ref.headerId,
        activeKey = _ref.activeKey,
        others = _objectWithoutProperties(_ref, ["hotKeyboard", "tabs", "wrapperId", "headerId", "activeKey"]);

    /**
     * @description 获取活跃元素
     * @param {*} comboKey
     */


    function getActiveTabElement(comboKey) {
        var wrapper = document.querySelector("#" + wrapperId);
        var activeTabTitle = document.querySelector("#" + headerId + " li.active");
        if (!activeTabTitle) {
            return null;
        }
        if (!comboKey && activeTabTitle.firstElementChild === document.activeElement) {
            return activeTabTitle;
        }
        if (comboKey && wrapper && wrapper.contains(document.activeElement)) {
            return activeTabTitle;
        }
        return null;
    }
    /**
     * @description 获取将要聚焦的元素
     * @param {*} dir
     * @param {*} comboKey
     */
    function getWillActiveTabElement(dir, comboKey) {
        var activeTabTitle = document.querySelector("#" + headerId + " li.active"),
            first = document.querySelector("#" + headerId + " li:first-child"),
            last = document.querySelector("#" + headerId + " li:last-child"),
            willActiveElement = activeTabTitle;
        if (dir === "prev" && activeTabTitle.previousElementSibling) {
            willActiveElement = activeTabTitle.previousElementSibling;
        }
        if (dir === "prev" && !activeTabTitle.previousElementSibling) {
            willActiveElement = last;
        }
        if (dir === "next" && activeTabTitle.nextElementSibling) {
            willActiveElement = activeTabTitle.nextElementSibling;
        }
        if (dir === "next" && !activeTabTitle.nextElementSibling) {
            willActiveElement = first;
        }

        return willActiveElement;
    }

    return hotKeyboard ? _react2["default"].createElement(
        _reactHotkeys.HotKeys,
        _extends({
            keyMap: keyMap,
            handlers: {
                nextTabHandler: function nextTabHandler(e) {
                    var activeTabTitle = getActiveTabElement(false);
                    // console.log(e, document.activeElement, activeTabTitle);
                    // 如果当前focus元素在页签下
                    if (activeTabTitle) {
                        // console.log("next tab");
                        var next = getWillActiveTabElement("next");
                        next.click();
                        next.firstElementChild.focus();
                        // e.preventDefault();
                    }
                },
                nextTabUSRHandler: function nextTabUSRHandler(e) {
                    var activeTabTitle = getActiveTabElement(e.shiftKey);
                    // 如果当前focus元素在页签下
                    if (activeTabTitle) {
                        // console.log("next tab");
                        getWillActiveTabElement("next").click();
                        // e.preventDefault();
                    }
                },
                prevTabHandler: function prevTabHandler(e) {
                    var activeTabTitle = getActiveTabElement(false);
                    // 如果当前focus元素在页签下
                    if (activeTabTitle) {
                        console.log("prev tab");
                        var prev = getWillActiveTabElement("prev");
                        prev.click();
                        prev.firstElementChild.focus();
                        // e.preventDefault();
                    }
                },
                prevTabUSLHandler: function prevTabUSLHandler(e) {
                    var activeTabTitle = getActiveTabElement(e.shiftKey);
                    // 如果当前focus元素在页签下
                    if (activeTabTitle) {
                        console.log("prev tab");
                        getWillActiveTabElement("prev").click();
                        // e.preventDefault();
                    }
                },
                expand: function expand(e) {
                    // let wrapper = document.querySelector(`#${wrapperId}`);
                    var activeTabTitle = document.querySelector("#" + headerId);
                    // 如果当前focus元素在页签下
                    if (activeTabTitle.contains(document.activeElement)) {
                        e.preventDefault();
                        console.log("sapce trigger!");
                        // e.preventDefault();
                        activeTabTitle.querySelector("i").click();
                    }
                }
            },
            className: "tabs-hotkeys-wrapper",
            focused: true,
            attach: document.body
        }, others),
        props.children
    ) : null;
}

exports["default"] = TabHotKey;
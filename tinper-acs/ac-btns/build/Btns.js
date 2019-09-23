'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _btnJSON = require('./btnJSON');

var _btnJSON2 = _interopRequireDefault(_btnJSON);

var _beeButton = require('bee-button');

var _beeButton2 = _interopRequireDefault(_beeButton);

var _beeIcon = require('bee-icon');

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _beeDropdown = require('bee-dropdown');

var _beeDropdown2 = _interopRequireDefault(_beeDropdown);

var _beeMenus = require('bee-menus');

var _beeMenus2 = _interopRequireDefault(_beeMenus);

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Item = _beeMenus2["default"].Item;

var propTypes = {
    onClick: _propTypes2["default"].func, //点击按钮回调
    addToBtns: _propTypes2["default"].object, //所有的按钮，支持扩展
    powerBtns: _propTypes2["default"].array, // 按钮权限 code数组
    btns: _propTypes2["default"].object, // 按钮对象数组
    type: _propTypes2["default"].oneOfType(['button', 'line']),
    maxSize: _propTypes2["default"].number,
    forcePowerBtns: _propTypes2["default"].array, //不受权限控制的按钮code数组
    localeCookie: _propTypes2["default"].string //当前语种的cookie key值
};
var defaultProps = {
    addToBtns: {},
    btns: {},
    type: 'button',
    maxSize: 2,
    forcePowerBtns: ['cancel', 'search', 'clear'], //取消、查询、清空不受权限管理控制
    localeCookie: 'locale',
    onClick: function onClick() {}
};

var getCookie = function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == name + '=') {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

var Btns = function (_Component) {
    _inherits(Btns, _Component);

    function Btns(props) {
        _classCallCheck(this, Btns);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.onHandleClick = function (e, code) {
            var func = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

            _this.props.onClick(e, code);
            func(e);
        };

        _this.renderBtns = function () {
            var _this$props = _this.props,
                btns = _this$props.btns,
                type = _this$props.type,
                maxSize = _this$props.maxSize,
                powerBtns = _this$props.powerBtns,
                forcePowerBtns = _this$props.forcePowerBtns,
                localeCookie = _this$props.localeCookie;

            var more = '更多';
            if (getCookie(localeCookie) == 'en_US') more = 'more';
            var btnArray = [];
            if (powerBtns) {
                Object.keys(btns).map(function (item) {
                    if (forcePowerBtns.indexOf(item) != -1 || powerBtns.indexOf(item) != -1) {
                        var btn = _this.renderBtn(item);
                        if (btn) btnArray.push(btn);
                    }
                });
            } else {
                Object.keys(btns).map(function (item) {
                    var btn = _this.renderBtn(item);
                    if (btn) btnArray.push(btn);
                });
            }

            if (type == 'line') {
                if (btnArray.length > maxSize) {
                    var menusList = _react2["default"].createElement(
                        _beeMenus2["default"],
                        null,
                        btnArray.map(function (item, index) {
                            if (index > maxSize - 1) return _react2["default"].createElement(
                                Item,
                                { key: index, onClick: item.onClick },
                                item
                            );
                        })
                    );
                    var drop = _react2["default"].createElement(
                        _beeDropdown2["default"],
                        {
                            overlayClassName: 'ac-btns-dropdown',
                            trigger: ['hover'],
                            overlay: menusList,
                            animation: 'slide-up' },
                        _react2["default"].createElement(
                            'span',
                            { className: 'ac-btns-item ac-btns-more' },
                            more
                        )
                    );
                    btnArray.splice(maxSize, btnArray.length - maxSize + 1, drop);
                    return btnArray;
                } else {
                    return btnArray;
                }
            } else {
                return btnArray;
            }
        };

        _this.renderBtn = function (key) {
            if (!_this.props.btns.hasOwnProperty(key)) return;
            var itemProps = _this.props.btns[key];
            var _this$state$allBtns$k = _this.state.allBtns[key],
                colors = _this$state$allBtns$k.colors,
                className = _this$state$allBtns$k.className,
                name = _this$state$allBtns$k.name_zh_CN,
                name_zh_TW = _this$state$allBtns$k.name_zh_TW,
                name_en_US = _this$state$allBtns$k.name_en_US;

            var clss = 'ac-btns-item ' + className;
            if (itemProps) {
                if (itemProps.className) clss += ' ' + itemProps.className;
                if (itemProps.name) name = itemProps.name;
                if (itemProps.onClick) {
                    var func = itemProps.onClick;
                    itemProps.onClick = function (e) {
                        _this.onHandleClick(e, key, func);
                    };
                }
            }
            if (getCookie(_this.props.localeCookie) == 'zh_TW') name = name_zh_TW;
            if (getCookie(_this.props.localeCookie) == 'en_US') name = name_en_US;
            if (_this.state.allBtns[key]) {
                if (itemProps && itemProps.node) {
                    return itemProps.node;
                } else {
                    if (_this.props.type == 'button') {
                        switch (key) {
                            case 'search':
                                return _react2["default"].createElement(
                                    _beeButton2["default"],
                                    _extends({ key: key }, itemProps, { colors: colors, className: clss, title: name }),
                                    _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-search-light-2' })
                                );
                            case 'clear':
                                return _react2["default"].createElement(
                                    _beeButton2["default"],
                                    _extends({ key: key }, itemProps, { colors: colors, className: 'ac-btns-write ' + clss, title: name }),
                                    _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-clean' })
                                );
                            case 'max':
                                return _react2["default"].createElement(
                                    _beeButton2["default"],
                                    _extends({ key: key }, itemProps, { colors: colors, className: 'ac-btns-write ' + clss, title: name }),
                                    _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-maxmize' })
                                );
                            case 'min':
                                return _react2["default"].createElement(
                                    _beeButton2["default"],
                                    _extends({ key: key }, itemProps, { colors: colors, className: 'ac-btns-write ' + clss, title: name }),
                                    _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-minimize' })
                                );
                            case 'first':
                                return _react2["default"].createElement(
                                    _beeButton2["default"],
                                    _extends({ key: key }, itemProps, { colors: colors, className: 'ac-btns-write ' + clss, title: name }),
                                    _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-2arrow-left' })
                                );
                            case 'next':
                                return _react2["default"].createElement(
                                    _beeButton2["default"],
                                    _extends({ key: key }, itemProps, { colors: colors, className: 'ac-btns-write ' + clss, title: name }),
                                    _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-arrow-right' })
                                );
                            case 'previous':
                                return _react2["default"].createElement(
                                    _beeButton2["default"],
                                    _extends({ key: key }, itemProps, { colors: colors, className: 'ac-btns-write ' + clss, title: name }),
                                    _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-arrow-left' })
                                );
                            case 'last':
                                return _react2["default"].createElement(
                                    _beeButton2["default"],
                                    _extends({ key: key }, itemProps, { colors: colors, className: 'ac-btns-write ' + clss, title: name }),
                                    _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-2arrow-right' })
                                );
                            default:
                                return _react2["default"].createElement(
                                    _beeButton2["default"],
                                    _extends({ key: key }, itemProps, { colors: colors, className: 'ac-btns-write ' + clss }),
                                    name
                                );
                        }
                    } else {
                        switch (key) {
                            case 'search':
                                return _react2["default"].createElement(
                                    'span',
                                    _extends({ key: key }, itemProps, { colors: colors, className: clss }),
                                    _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-search-light-2' })
                                );
                            case 'clear':
                                return _react2["default"].createElement(
                                    'span',
                                    _extends({ key: key }, itemProps, { colors: colors, className: 'ac-btns-write ' + clss }),
                                    _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-clean' })
                                );
                            case 'max':
                                return _react2["default"].createElement(
                                    'span',
                                    _extends({ key: key }, itemProps, { colors: colors, className: 'ac-btns-write ' + clss }),
                                    _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-maxmize' })
                                );
                            default:
                                return _react2["default"].createElement(
                                    'span',
                                    _extends({ key: key }, itemProps, { colors: colors, className: 'ac-btns-write ' + clss }),
                                    name
                                );
                        }
                    }
                }
            } else {
                return null;
            }
        };

        _this.state = {
            allBtns: _extends(_btnJSON2["default"], _this.props.addToBtns)
        };
        return _this;
    }

    Btns.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('addToBtns' in nextProps) {
            if ((0, _lodash2["default"])(this.state.allBtns, _extends(_btnJSON2["default"], nextProps.addToBtns))) {
                this.setState({
                    allBtns: _extends(_btnJSON2["default"], nextProps.addToBtns)
                });
            }
        }
    };

    Btns.prototype.render = function render() {
        return _react2["default"].createElement(
            'span',
            { className: 'ac-btns' },
            this.renderBtns()
        );
    };

    return Btns;
}(_react.Component);

;

Btns.propTypes = propTypes;
Btns.defaultProps = defaultProps;
exports["default"] = Btns;
module.exports = exports['default'];
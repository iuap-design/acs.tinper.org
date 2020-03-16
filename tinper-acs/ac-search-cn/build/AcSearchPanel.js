'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _beeIcon = require('bee-icon');

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _beeDropdown = require('bee-dropdown');

var _beeDropdown2 = _interopRequireDefault(_beeDropdown);

var _beeMenus = require('bee-menus');

var _beeMenus2 = _interopRequireDefault(_beeMenus);

var _beeTooltip = require('bee-tooltip');

var _beeTooltip2 = _interopRequireDefault(_beeTooltip);

var _miniStore = require('mini-store');

var _acBtns = require('ac-btns');

var _acBtns2 = _interopRequireDefault(_acBtns);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Item = _beeMenus2["default"].Item;

var noop = function noop() {};

var propTypes = {
    title: _propTypes2["default"].node,
    clsfix: _propTypes2["default"].string,
    search: _propTypes2["default"].func,
    reset: _propTypes2["default"].func,
    selectedData: _propTypes2["default"].object,
    hasChose: _propTypes2["default"].bool, //是否可以选择查询方案
    localeCookie: _propTypes2["default"].string //当前语种的cookie key值
};
var defaultProps = {
    clsfix: 'ac-search-cn',
    search: noop,
    reset: noop,
    localeCookie: 'locale'
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

var AcSearchPanel = function (_Component) {
    _inherits(AcSearchPanel, _Component);

    function AcSearchPanel(props) {
        _classCallCheck(this, AcSearchPanel);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.open = function () {
            _this.setState({
                open: !_this.state.open
            });
        };

        _this.onSelect = function (item) {
            _this.setState({
                type: item.selectedKeys[0]
            });
        };

        _this.getChild = function () {
            var children = _this.props.children;

            var child = [];
            if (children.length > 1) {
                children.map(function (item) {
                    if (_this.state.type == '1' && item.type.displayName == 'Sample') {
                        child = item.props.children;
                    } else if (_this.state.type == '2' && item.type.displayName == 'Complex') {
                        child = item.props.children;
                    }
                });
            } else {
                if (_this.state.type == '1' && children.type.displayName == 'Sample') {
                    child = children.props.children;
                } else if (_this.state.type == '2' && children.type.displayName == 'Complex') {
                    child = children.props.children;
                }
            }
            return child;
        };

        _this.getTip = function () {
            var clsfix = _this.props.clsfix;

            var toolTips = _this.store.getState().toolTips;
            return _react2["default"].createElement(
                'span',
                { className: clsfix + '-selected-complex' },
                Object.keys(toolTips).map(function (item, index) {
                    var v = toolTips[item];
                    // if(Object.prototype.toString.call(v)=='[object Array]')v=v.join(' ~ ');
                    if (toolTips[item] && toolTips[item] != 'undefined') return _react2["default"].createElement(
                        'div',
                        { key: index, className: clsfix + '-selected-complex-item' },
                        _react2["default"].createElement(
                            'span',
                            { className: clsfix + '-selected-complex-item-title' },
                            item,
                            ':'
                        ),
                        _react2["default"].createElement(
                            'span',
                            { className: clsfix + '-selected-complex-item-ctn' },
                            v
                        )
                    );
                })
            );
        };

        _this.formatSearchDate = function (selectedData, locale) {
            for (var attr in selectedData) {
                if (!selectedData[attr]) {
                    delete selectedData[attr];
                }
            }
            var length = Object.keys(selectedData).length;
            return locale.query + '(' + length + '):   ' + Object.keys(selectedData).join(';');
        };

        _this.state = {
            open: true,
            type: '1',
            show: false
        };
        _this.store = (0, _miniStore.create)({
            toolTips: {}
        });
        return _this;
    }

    AcSearchPanel.prototype.render = function render() {
        var _props = this.props,
            clsfix = _props.clsfix,
            search = _props.search,
            reset = _props.reset,
            hasChose = _props.hasChose,
            children = _props.children,
            title = _props.title,
            localeCookie = _props.localeCookie;

        var locale = _i18n2["default"];
        if (getCookie(localeCookie) == 'zh_TW') locale = _i18n2["default"].zh_TW;
        if (getCookie(localeCookie) == 'en_US') locale = _i18n2["default"].en_US;
        var typeText = {
            '1': locale.sample,
            '2': locale.complex
        };
        var toolTips = this.store.getState().toolTips;
        var ctns = clsfix + '-ctns';
        if (!this.state.open) ctns += ' close';
        var menus = _react2["default"].createElement(
            _beeMenus2["default"],
            {
                onSelect: this.onSelect },
            _react2["default"].createElement(
                Item,
                { key: '1' },
                locale.sample
            ),
            _react2["default"].createElement(
                Item,
                { key: '2' },
                locale.complex
            )
        );
        return _react2["default"].createElement(
            _miniStore.Provider,
            { store: this.store },
            _react2["default"].createElement(
                'div',
                { className: clsfix },
                _react2["default"].createElement(
                    'div',
                    { className: clsfix + '-header' },
                    hasChose ? _react2["default"].createElement(
                        'span',
                        { className: clsfix + '-case' },
                        _react2["default"].createElement(
                            _beeDropdown2["default"],
                            {
                                overlayClassName: clsfix + '-case-list',
                                trigger: ['click'],
                                overlay: menus,
                                animation: 'slide-up' },
                            _react2["default"].createElement(
                                'span',
                                null,
                                typeText[this.state.type],
                                ' ',
                                _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-triangle-down' })
                            )
                        )
                    ) : _react2["default"].createElement(
                        'span',
                        { className: clsfix + '-case' },
                        title ? title : locale.title
                    ),
                    Object.keys(toolTips).length > 0 && !this.state.open ? _react2["default"].createElement(
                        'span',
                        { className: clsfix + '-selected-data' },
                        _react2["default"].createElement(
                            _beeTooltip2["default"],
                            { inverse: true, placement: 'bottom', overlay: this.getTip() },
                            _react2["default"].createElement(
                                'span',
                                { className: clsfix + '-selected-sample' },
                                this.formatSearchDate(toolTips, locale)
                            )
                        )
                    ) : '',
                    _react2["default"].createElement(
                        'span',
                        { className: clsfix + '-open', onClick: this.open },
                        this.state.open ? _react2["default"].createElement(
                            'span',
                            null,
                            locale.close,
                            _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-arrow-up' })
                        ) : _react2["default"].createElement(
                            'span',
                            null,
                            locale.open,
                            _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-arrow-down' })
                        )
                    )
                ),
                _react2["default"].createElement(
                    'div',
                    { className: clsfix + '-ctns-out' },
                    _react2["default"].createElement(
                        'div',
                        { className: ctns },
                        _react2["default"].createElement(
                            'div',
                            { className: clsfix + '-ctn' },
                            hasChose ? this.getChild() : children
                        ),
                        _react2["default"].createElement(
                            'div',
                            { className: clsfix + '-btns' },
                            _react2["default"].createElement(_acBtns2["default"], { localeCookie: localeCookie,
                                btns: {
                                    search: {
                                        onClick: search
                                    },
                                    empty: {
                                        onClick: reset
                                    }
                                }
                            })
                        )
                    )
                )
            )
        );
    };

    return AcSearchPanel;
}(_react.Component);

;

AcSearchPanel.propTypes = propTypes;
AcSearchPanel.defaultProps = defaultProps;

exports["default"] = AcSearchPanel;
module.exports = exports['default'];
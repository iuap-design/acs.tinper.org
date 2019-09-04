'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    clsfix: _propTypes2["default"].string,
    open: _propTypes2["default"].bool, //打开关闭
    ctn: _propTypes2["default"].node, //内容
    defaultOpen: _propTypes2["default"].bool, //默认展开收起
    openChange: _propTypes2["default"].func, //展开收起
    localeCookie: _propTypes2["default"].string //当前语种的cookie key值
};

var defaultProps = {
    clsfix: 'ac-split-area',
    defaultOpen: false,
    openChange: function openChange() {},
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

var SplitArea = function (_Component) {
    _inherits(SplitArea, _Component);

    function SplitArea(props) {
        _classCallCheck(this, SplitArea);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.click = function () {
            _this.setState({
                open: !_this.state.open
            });
            _this.props.openChange(!_this.state.open);
        };

        _this.state = {
            open: props.open == undefined ? props.defaultOpen : props.open
        };
        return _this;
    }

    SplitArea.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
        if ('open' in nextProps) {
            return {
                open: nextProps.open
            };
        }
    };

    SplitArea.prototype.render = function render() {
        var _props = this.props,
            children = _props.children,
            clsfix = _props.clsfix,
            ctn = _props.ctn,
            localeCookie = _props.localeCookie;
        var open = this.state.open;

        var locale = _i18n2["default"];
        if (getCookie(localeCookie) == 'zh_TW') locale = _i18n2["default"].zh_TW;
        if (getCookie(localeCookie) == 'en_US') locale = _i18n2["default"].en_US;
        return _react2["default"].createElement(
            'div',
            { className: '' + clsfix },
            _react2["default"].createElement(
                'div',
                { onClick: this.click, className: clsfix + '-left' },
                _react2["default"].createElement(
                    'span',
                    { className: clsfix + '-left-text' },
                    ctn ? ctn : locale.ctn
                ),
                _react2["default"].createElement(
                    'span',
                    { className: clsfix + '-left-line' },
                    _react2["default"].createElement('span', { className: clsfix + '-left-line-inner' })
                )
            ),
            _react2["default"].createElement(
                'div',
                { className: clsfix + '-ctn ' + (open ? 'open' : '') },
                open ? children : ''
            )
        );
    };

    return SplitArea;
}(_react.Component);

;

SplitArea.propTypes = propTypes;
SplitArea.defaultProps = defaultProps;

exports["default"] = SplitArea;
module.exports = exports['default'];
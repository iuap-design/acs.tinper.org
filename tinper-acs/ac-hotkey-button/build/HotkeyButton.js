'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactHotKeys = require('react-hot-keys');

var _reactHotKeys2 = _interopRequireDefault(_reactHotKeys);

var _beeButton = require('bee-button');

var _beeButton2 = _interopRequireDefault(_beeButton);

var _beeTooltip = require('bee-tooltip');

var _beeTooltip2 = _interopRequireDefault(_beeTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    keyName: _propTypes2["default"].string,
    onClick: _propTypes2["default"].func,
    onKeyDown: _propTypes2["default"].func,
    onKeyUp: _propTypes2["default"].func,
    tooltip: _propTypes2["default"].node
};

var defaultProps = {
    keyName: '',
    onClick: function onClick() {},
    onKeyDown: function onKeyDown() {},
    onKeyUp: function onKeyUp() {}
};

var HotkeyButton = function (_Component) {
    _inherits(HotkeyButton, _Component);

    function HotkeyButton() {
        var _temp, _this, _ret;

        _classCallCheck(this, HotkeyButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.click = function () {
            _this.props.onClick();
            _this.props.onKeyDown();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    HotkeyButton.prototype.render = function render() {
        var _props = this.props,
            keyName = _props.keyName,
            onKeyUp = _props.onKeyUp,
            tooltip = _props.tooltip,
            other = _objectWithoutProperties(_props, ['keyName', 'onKeyUp', 'tooltip']);

        return _react2["default"].createElement(
            _reactHotKeys2["default"],
            {
                keyName: this.props.keyName,
                onKeyDown: this.click,
                onKeyUp: this.props.onKeyUp
            },
            tooltip ? _react2["default"].createElement(
                _beeTooltip2["default"],
                { inverse: true, overlay: tooltip, placement: 'bottom', className: 'ac-hotkey-tooltip' },
                _react2["default"].createElement(_beeButton2["default"], _extends({}, other, { onClick: this.click }))
            ) : _react2["default"].createElement(_beeButton2["default"], _extends({}, other, { onClick: this.click }))
        );
    };

    return HotkeyButton;
}(_react.Component);

;
HotkeyButton.propTypes = propTypes;
HotkeyButton.defaultProps = defaultProps;
exports["default"] = HotkeyButton;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _beeLayout = require('bee-layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    clsfix: _propTypes2["default"].string,
    disabled: _propTypes2["default"].bool
};
var defaultProps = {
    clsfix: 'ac-form-layout'
};

var FormItemSpan = function (_Component) {
    _inherits(FormItemSpan, _Component);

    function FormItemSpan() {
        _classCallCheck(this, FormItemSpan);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    FormItemSpan.prototype.render = function render() {
        var _props = this.props,
            clsfix = _props.clsfix,
            children = _props.children,
            className = _props.className,
            other = _objectWithoutProperties(_props, ['clsfix', 'children', 'className']);

        var clsses = clsfix + '-span';
        if (className) clsses += ' ' + className;
        return _react2["default"].createElement(
            'div',
            _extends({ className: clsses }, other),
            children
        );
    };

    return FormItemSpan;
}(_react.Component);

;
FormItemSpan.propTypes = propTypes;
FormItemSpan.defaultProps = defaultProps;
exports["default"] = FormItemSpan;
module.exports = exports['default'];
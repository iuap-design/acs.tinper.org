'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

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

var FormLayout = function (_Component) {
    _inherits(FormLayout, _Component);

    function FormLayout() {
        _classCallCheck(this, FormLayout);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    FormLayout.prototype.render = function render() {
        var _props = this.props,
            clsfix = _props.clsfix,
            children = _props.children,
            disabled = _props.disabled,
            className = _props.className;

        var clsses = clsfix;
        if (className) clsses += ' ' + className;
        if (disabled) clsses += ' disabled';
        return _react2["default"].createElement(
            'div',
            { className: clsses },
            children
        );
    };

    return FormLayout;
}(_react.Component);

;
FormLayout.propTypes = propTypes;
FormLayout.defaultProps = defaultProps;
exports["default"] = FormLayout;
module.exports = exports['default'];
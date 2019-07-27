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

var propTypes = {};
var defaultProps = {};

var FormItem = function (_Component) {
    _inherits(FormItem, _Component);

    function FormItem() {
        var _temp, _this, _ret;

        _classCallCheck(this, FormItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getChild = function () {
            var _this$props = _this.props,
                label = _this$props.label,
                children = _this$props.children;

            if (children.length > 1) {
                var ary = [];
                _react2["default"].Children.map(children, function (child) {
                    ary.push(_react2["default"].cloneElement(child, {
                        placeholder: label
                    }));
                });
                return ary;
            } else {
                return _react2["default"].cloneElement(children, {
                    placeholder: label
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    FormItem.prototype.render = function render() {
        var required = this.props.required;

        var classes = 'nc-search-panel-formitem';
        if (required) classes += ' require';
        return _react2["default"].createElement(
            'div',
            { className: classes },
            required ? _react2["default"].createElement(
                'span',
                { className: 'nc-search-panel-formitem-mast' },
                '*'
            ) : '',
            this.getChild()
        );
    };

    return FormItem;
}(_react.Component);

;

FormItem.propTypes = propTypes;
FormItem.defaultProps = defaultProps;
exports["default"] = FormItem;
module.exports = exports['default'];
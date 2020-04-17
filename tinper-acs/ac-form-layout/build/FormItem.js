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

var _beeLabel = require('bee-label');

var _beeLabel2 = _interopRequireDefault(_beeLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    clsfix: _propTypes2["default"].string,
    lable: _propTypes2["default"].string,
    required: _propTypes2["default"].bool,
    errorMsg: _propTypes2["default"].node
};
var defaultProps = {
    clsfix: 'ac-form-layout'
};

var FormItem = function (_Component) {
    _inherits(FormItem, _Component);

    function FormItem(props) {
        _classCallCheck(this, FormItem);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.getChild = function () {
            var _this$props = _this.props,
                label = _this$props.label,
                children = _this$props.children,
                required = _this$props.required,
                clsfix = _this$props.clsfix,
                errorMsg = _this$props.errorMsg;

            var ary = [];
            ary.push(_react2["default"].createElement(
                _beeLabel2["default"],
                null,
                required ? _react2["default"].createElement(
                    'span',
                    { className: clsfix + '-mast' },
                    '*'
                ) : '',
                label
            ));
            if (children.length > 1) {
                _react2["default"].Children.map(children, function (child) {
                    errorMsg ? ary.push(_react2["default"].createElement(
                        'div',
                        { className: clsfix + '-item-out', title: errorMsg },
                        _react2["default"].createElement(
                            'span',
                            { className: clsfix + '-item-error-msg' },
                            _react2["default"].createElement(
                                'span',
                                { className: clsfix + '-item-error-msg-text' },
                                errorMsg
                            )
                        ),
                        child
                    )) : ary.push(child);
                });
            } else {
                errorMsg ? ary.push(_react2["default"].createElement(
                    'div',
                    { className: clsfix + '-item-out', title: errorMsg },
                    _react2["default"].createElement(
                        'span',
                        { className: clsfix + '-item-error-msg' },
                        _react2["default"].createElement(
                            'span',
                            { className: clsfix + '-item-error-msg-text' },
                            errorMsg
                        )
                    ),
                    children
                )) : ary.push(children);
            }
            return ary;
        };

        _this.state = {
            showError: false
        };
        return _this;
    }

    FormItem.prototype.render = function render() {
        var _props = this.props,
            clsfix = _props.clsfix,
            children = _props.children,
            className = _props.className,
            errorMsg = _props.errorMsg,
            other = _objectWithoutProperties(_props, ['clsfix', 'children', 'className', 'errorMsg']);

        var clsses = clsfix + '-item';
        if (className) clsses += ' ' + className;
        if (errorMsg) clsses += ' error';
        return _react2["default"].createElement(
            _beeLayout.Col,
            _extends({ className: clsses }, other),
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
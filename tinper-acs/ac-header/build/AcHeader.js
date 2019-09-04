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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    clsfix: _propTypes2["default"].string,
    className: _propTypes2["default"].string,
    icon: _propTypes2["default"].node,
    title: _propTypes2["default"].string,
    showBack: _propTypes2["default"].bool,
    backClick: _propTypes2["default"].func
};
var defaultProps = {
    clsfix: 'ac-header',
    className: '',
    icon: '',
    title: '',
    showBack: false,
    backClick: function backClick() {}
};

var AcHeader = function (_Component) {
    _inherits(AcHeader, _Component);

    function AcHeader() {
        var _temp, _this, _ret;

        _classCallCheck(this, AcHeader);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.backClick = function () {
            _this.props.backClick();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    AcHeader.prototype.render = function render() {
        var _props = this.props,
            clsfix = _props.clsfix,
            className = _props.className,
            children = _props.children,
            icon = _props.icon,
            title = _props.title,
            showBack = _props.showBack;

        var classes = clsfix + ' ' + className;
        return _react2["default"].createElement(
            'div',
            { className: '' + classes },
            _react2["default"].createElement(
                'span',
                { className: clsfix + '-left' },
                showBack ? _react2["default"].createElement(
                    'span',
                    { className: clsfix + '-back', onClick: this.backClick },
                    _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-arrow-left' })
                ) : '',
                _react2["default"].createElement(
                    'span',
                    { className: clsfix + '-icon' },
                    icon
                ),
                _react2["default"].createElement(
                    'span',
                    { className: clsfix + '-title' },
                    title
                )
            ),
            _react2["default"].createElement(
                'span',
                { className: clsfix + '-btns' },
                children
            )
        );
    };

    return AcHeader;
}(_react.Component);

;
AcHeader.propTypes = propTypes;
AcHeader.defaultProps = defaultProps;
exports["default"] = AcHeader;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _beeButton = require('bee-button');

var _beeButton2 = _interopRequireDefault(_beeButton);

var _beeDropdown = require('bee-dropdown');

var _beeDropdown2 = _interopRequireDefault(_beeDropdown);

var _beeIcon = require('bee-icon');

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    onListIconClick: _propTypes2["default"].func,
    menuList: _propTypes2["default"].node.isRequired,
    disabled: _propTypes2["default"].bool
};
var defaultProps = {
    disabled: false,
    onListIconClick: function onListIconClick() {}
};

var SplitButton = function (_Component) {
    _inherits(SplitButton, _Component);

    function SplitButton(props) {
        _classCallCheck(this, SplitButton);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.onVisibleChange = function (show) {
            _this.setState({
                show: show
            });
        };

        _this.onClick = function (e) {
            var overlayProps = _this.props.menuList.props;
            if (overlayProps.onClick) {
                overlayProps.onClick(e);
            }
            _this.setState({
                show: !_this.state.show
            });
        };

        _this.onBtnClick = function (e) {
            e.stopPropagation();
            _this.props.onClick && _this.props.onClick(e);
        };

        _this.state = {
            show: false,
            height: '25px'
        };
        return _this;
    }

    SplitButton.prototype.componentDidMount = function componentDidMount() {
        this.setState({
            height: _reactDom2["default"].findDOMNode(this.btn).offsetHeight
        });
    };

    SplitButton.prototype.getMenuElement = function getMenuElement() {
        var menuList = this.props.menuList;

        return _react2["default"].cloneElement(menuList, {
            onClick: this.onClick
        });
    };

    SplitButton.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            children = _props.children,
            menuList = _props.menuList,
            onListIconClick = _props.onListIconClick,
            colors = _props.colors,
            _props$size = _props.size,
            size = _props$size === undefined ? '' : _props$size,
            onClick = _props.onClick,
            disabled = _props.disabled,
            className = _props.className,
            other = _objectWithoutProperties(_props, ['children', 'menuList', 'onListIconClick', 'colors', 'size', 'onClick', 'disabled', 'className']);

        return _react2["default"].createElement(
            'div',
            { className: 'ac-split-button ' + colors + ' ' + size },
            _react2["default"].createElement(
                _beeDropdown2["default"],
                {
                    trigger: ['click'],
                    overlay: disabled ? [] : this.getMenuElement(),
                    animation: 'slide-up',
                    onVisibleChange: disabled ? function () {} : this.onVisibleChange,
                    onClick: onListIconClick,
                    overlayClassName: 'ac-split-button-dropdown'
                },
                _react2["default"].createElement(
                    'span',
                    null,
                    _react2["default"].createElement(
                        _beeButton2["default"],
                        _extends({}, other, {
                            disabled: disabled,
                            onClick: this.onBtnClick,
                            ref: function ref(btn) {
                                return _this2.btn = btn;
                            },
                            colors: colors, bordered: true, size: size,
                            className: className ? 'split-btn ' + className : 'split-btn' }),
                        children
                    ),
                    _react2["default"].createElement(
                        'span',
                        { className: 'icon-out', disabled: disabled,
                            style: {
                                'height': this.state.height
                            }
                        },
                        _react2["default"].createElement(_beeIcon2["default"], {
                            type: 'uf-anglearrowdown',
                            className: (0, _classnames2["default"])({ 'show': this.state.show })
                        })
                    )
                )
            )
        );
    };

    return SplitButton;
}(_react.Component);

;

SplitButton.propTypes = propTypes;
SplitButton.defaultProps = defaultProps;
exports["default"] = SplitButton;
module.exports = exports['default'];
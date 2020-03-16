'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _miniStore = require('mini-store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    label: _propTypes2["default"].string.isRequired,
    required: _propTypes2["default"].bool,
    value: _propTypes2["default"].string
};
var defaultProps = {};

var FormItem = function (_Component) {
    _inherits(FormItem, _Component);

    function FormItem(props) {
        _classCallCheck(this, FormItem);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.getChild = function () {
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
        };

        _this.getStr = function () {
            var _this$props2 = _this.props,
                children = _this$props2.children,
                label = _this$props2.label,
                tooltip = _this$props2.tooltip,
                store = _this$props2.store;

            var toolTips = store.getState().toolTips;
            var value = children.props.value || '';
            var str = '';
            if ('tooltip' in _this.props) {
                if (tooltip) {
                    str = label + ': ' + tooltip;
                    toolTips[label] = tooltip;
                } else {
                    str = '';
                    delete toolTips[label];
                }
            } else if (children && children.type && children.type.displayName == 'InputNumberGroup') {
                //金额区间
                if (value.length > 0 && (value[0] || value[1])) {
                    str = label[0] + ': ' + (value[0] || '') + ' , ' + label[1] + ': ' + (value[1] || '');
                    toolTips[label[0]] = value[0] || '';
                    toolTips[label[1]] = value[1] || '';
                } else {
                    delete toolTips[label[0]];
                    delete toolTips[label[1]];
                }
            } else if (children && children.type && children.type.displayName == 'acRangepicker') {
                //日期区间
                var format = children.props.format;
                if (value.length > 0) {
                    str = label + ': ' + value[0].format(format) + ' ~ ' + value[1].format(format);
                    toolTips[label] = value[0].format(format) + ' ~ ' + value[1].format(format);
                } else {
                    delete toolTips[label];
                }
            } else if (value) {
                str = label + ': ' + value;
                toolTips[label] = value;
            } else {
                delete toolTips[label];
            }
            _this.setState(toolTips);
            _this.setState({
                str: str
            });
            // return str;
        };

        _this.setStore = function (obj) {
            var _this$props3 = _this.props,
                store = _this$props3.store,
                label = _this$props3.label;

            var toolTips = store.getState().toolTips;
            if (toolTips[label] != obj[label]) store.setState({ toolTips: toolTips });
        };

        _this.onMouseEnter = function () {
            var _this$state = _this.state,
                show = _this$state.show,
                str = _this$state.str;

            if (!show) {
                if (str) {
                    _this.timer && clearTimeout(_this.timer);
                    _this.timer = setTimeout(function () {
                        _this.setState({
                            show: true
                        }, function () {
                            var top = _this.str && _this.str.offsetHeight;
                            if (top) {
                                _this.setState({
                                    strTop: '-' + (top + 5) + 'px'
                                });
                            }
                        });
                    }, 1000);
                }
            }
        };

        _this.mouseLeave = function () {
            _this.timer && clearTimeout(_this.timer);
            _this.timer = setTimeout(function () {
                _this.setState({
                    show: false
                });
            }, 1000);
        };

        _this.innerMouseEnter = function () {
            _this.timer && clearTimeout(_this.timer);
        };

        _this.inneronMouseLeave = function () {
            _this.timer && clearTimeout(_this.timer);
            _this.timer = setTimeout(function () {
                _this.setState({
                    show: false
                });
            }, 2000);
        };

        _this.state = {
            show: false,
            strTop: '-28px',
            str: ''
        };

        return _this;
    }

    FormItem.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
        var top = this.str && this.str.offsetHeight;
        if (top && '-' + top + 'px' != this.state.strTop) {
            this.setState({
                strTop: '-' + (top + 5) + 'px'
            });
        }
        this.getStr();
    };

    FormItem.prototype.componentDidMount = function componentDidMount() {
        this.getStr();
    };

    FormItem.prototype.render = function render() {
        var _this2 = this;

        var required = this.props.required;

        var classes = 'ac-search-cn-formitem';
        if (required) classes += ' require';
        var str = this.state.str;
        return _react2["default"].createElement(
            'div',
            { className: classes,
                onMouseEnter: function onMouseEnter() {
                    _this2.onMouseEnter(str);
                },
                onMouseLeave: this.mouseLeave },
            this.state.show && str ? _react2["default"].createElement(
                'span',
                { className: 'ac-search-cn-formitem-value',
                    onMouseEnter: this.innerMouseEnter,
                    onMouseLeave: this.inneronMouseLeave,
                    style: { 'top': this.state.strTop } },
                _react2["default"].createElement(
                    'span',
                    { className: 'ac-search-cn-formitem-value-text ' + (this.state.strTop == '-28px' ? '' : 'top'), ref: function ref(_ref) {
                            return _this2.str = _ref;
                        } },
                    str
                )
            ) : '',
            required ? _react2["default"].createElement(
                'span',
                { className: 'ac-search-cn-formitem-mast' },
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
exports["default"] = (0, _miniStore.connect)()(FormItem);
module.exports = exports['default'];
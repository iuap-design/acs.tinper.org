'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } // 单元格编辑态组件


var Item = function (_Component) {
    _inherits(Item, _Component);

    function Item(props) {
        _classCallCheck(this, Item);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.blur = function (e) {
            var _this$props$content = _this.props.content,
                _this$props$content$p = _this$props$content.props,
                onBlur = _this$props$content$p.onBlur,
                value = _this$props$content$p.value,
                edittable_dom = _this$props$content.edittable_dom;

            if (edittable_dom.contains(_this.item) && !_this.item.contains(e.target) && edittable_dom.contains(e.target)) {
                typeof onBlur === 'function' && onBlur(value);
            }
        };

        return _this;
    }

    Item.prototype.componentDidMount = function componentDidMount() {
        var _props = this.props,
            itemtype = _props.content.props.itemtype,
            isLineStatus = _props.isLineStatus;

        if ((itemtype === 'refer' || itemtype === 'residtxt') && isLineStatus) {
            // 点击参照之外其他部分掉用参照onblur
            document.addEventListener('click', this.blur, false);
        }
    };

    Item.prototype.componentWillUnmount = function componentWillUnmount() {
        var _props2 = this.props,
            itemtype = _props2.content.props.itemtype,
            isLineStatus = _props2.isLineStatus;

        if ((itemtype === 'refer' || itemtype === 'residtxt') && isLineStatus) {
            // 移除document事件
            document.removeEventListener('click', this.blur);
        }
    };

    Item.prototype.render = function render() {
        var _this2 = this;

        var content = this.props.content;

        return _react2["default"].createElement(
            'div',
            {
                style: content.props.itemtype === 'number' ? { textAlign: 'right' } : {},
                ref: function ref(dom) {
                    _this2.item = dom;
                }
            },
            content
        );
    };

    return Item;
}(_react.Component);

exports["default"] = Item;
module.exports = exports['default'];
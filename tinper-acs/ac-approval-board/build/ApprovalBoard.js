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
    width: _propTypes2["default"].number, // 弹框宽度
    height: _propTypes2["default"].number, // 弹框高度
    appsource: _propTypes2["default"].string, // 业务标识
    businessKey: _propTypes2["default"].string, // 业务实例id
    callback: _propTypes2["default"].func //回调函数
};

var defaultProps = {
    width: 850,
    height: 510,
    appsource: 'caep',
    callback: function callback() {}
};

var ApprovalBoard = function (_Component) {
    _inherits(ApprovalBoard, _Component);

    function ApprovalBoard(props) {
        _classCallCheck(this, ApprovalBoard);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.onBpmFlow = function () {
            var _this$props = _this.props,
                width = _this$props.width,
                height = _this$props.height,
                appsource = _this$props.appsource,
                businessKey = _this$props.businessKey,
                callback = _this$props.callback;

            var data = {
                width: width,
                height: height,
                appsource: appsource,
                businessKey: businessKey
            };
            _this.flowCompIns = window.flowComp(data);
            _this.flowCompIns.showFlowBox({
                onClose: function onClose(data) {
                    callback();
                }
            });
        };

        return _this;
    }

    ApprovalBoard.prototype.componentDidMount = function componentDidMount() {};

    ApprovalBoard.prototype.render = function render() {
        return _react2["default"].createElement(
            'span',
            { onClick: this.onBpmFlow, className: this.props.className },
            this.props.children
        );
    };

    return ApprovalBoard;
}(_react.Component);

ApprovalBoard.propTypes = propTypes;
ApprovalBoard.defaultProps = defaultProps;
exports["default"] = ApprovalBoard;
module.exports = exports['default'];
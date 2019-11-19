"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _beeIcon = require("bee-icon");

var _beeIcon2 = _interopRequireDefault(_beeIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var HeaderRight = function (_Component) {
  _inherits(HeaderRight, _Component);

  function HeaderRight(props) {
    _classCallCheck(this, HeaderRight);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      maxed: props.maxed || false
    };
    return _this;
  }

  HeaderRight.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.maxed !== this.props.maxed) {
      this.setState({
        maxed: nextProps.maxed
      });
    }
  };

  HeaderRight.prototype.maxfunc = function maxfunc(e) {
    this.props.headerRightOper.maxfunc(e);
  };

  HeaderRight.prototype.minifunc = function minifunc(e) {
    this.props.headerRightOper.minifunc(e);
  };

  HeaderRight.prototype.handleDefault = function handleDefault(e) {
    this.props.headerRightOper.handleDefault(e);
    this.props.handleClick(e);
  };

  HeaderRight.prototype.handleClick = function handleClick(e) {
    this.props.headerRightOper.handleClick(e);
  };

  HeaderRight.prototype.render = function render() {
    var self = this;
    var maxed = this.state.maxed;

    return _react2["default"].createElement(
      "div",
      { className: "header-right" },
      !maxed ? _react2["default"].createElement(
        "a",
        { id: "maxBox", onClick: function onClick(e) {
            return self.maxfunc(e);
          }, "data-ref": "taskcenter", name: "最大化", title: "最大化", className: "navbar-avatar", titlekey: "最大化" },
        _react2["default"].createElement(_beeIcon2["default"], { type: "uf-maxmize", style: { "fontSize": "18px" } })
      ) : _react2["default"].createElement(
        "a",
        { id: "maxBox", onClick: function onClick(e) {
            return self.minifunc(e);
          }, "data-ref": "taskcenter", name: "最小化", title: "最小化", className: "navbar-avatar", titlekey: "最大化" },
        _react2["default"].createElement(_beeIcon2["default"], { type: "uf-minimize", style: { "fontSize": "18px" } })
      )
    );
  };

  return HeaderRight;
}(_react.Component);

exports["default"] = HeaderRight;
module.exports = exports["default"];
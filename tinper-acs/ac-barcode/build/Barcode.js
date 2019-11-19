'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jsbarcode = require('jsbarcode');

var _jsbarcode2 = _interopRequireDefault(_jsbarcode);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 条形码组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var getDOMNode = function getDOMNode(ref) {
  return ref;
};

var AcBarcode = function (_Component) {
  _inherits(AcBarcode, _Component);

  function AcBarcode(props) {
    _classCallCheck(this, AcBarcode);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.update = function () {
      var renderElement = getDOMNode(_this.refs.renderElement);
      try {
        new _jsbarcode2["default"](renderElement, _this.props.value, _extends({}, _this.props));
      } catch (e) {
        // prevent stop the parent process
        window.console.error(e);
      }
    };

    return _this;
  }

  AcBarcode.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var _this2 = this;

    return Object.keys(AcBarcode.propTypes).some(function (k) {
      return _this2.props[k] !== nextProps[k];
    });
  };

  AcBarcode.prototype.componentDidMount = function componentDidMount() {
    this.update();
  };

  AcBarcode.prototype.componentDidUpdate = function componentDidUpdate() {
    this.update();
  };

  AcBarcode.prototype.render = function render() {
    if (this.props.renderer === 'svg') {
      return _react2["default"].createElement('svg', { ref: 'renderElement' });
    } else if (this.props.renderer === 'canvas') {
      return _react2["default"].createElement('canvas', { ref: 'renderElement' });
    } else if (this.props.renderer === 'img') {
      return _react2["default"].createElement('img', { ref: 'renderElement' });
    }
  };

  return AcBarcode;
}(_react.Component);

AcBarcode.propTypes = {
  value: _propTypes2["default"].string.isRequired,
  renderer: _propTypes2["default"].string,
  format: _propTypes2["default"].string,
  width: _propTypes2["default"].number,
  height: _propTypes2["default"].number,
  displayValue: _propTypes2["default"].bool,
  fontOptions: _propTypes2["default"].string,
  font: _propTypes2["default"].string,
  textAlign: _propTypes2["default"].string,
  textPosition: _propTypes2["default"].string,
  textMargin: _propTypes2["default"].number,
  fontSize: _propTypes2["default"].number,
  background: _propTypes2["default"].string,
  lineColor: _propTypes2["default"].string,
  margin: _propTypes2["default"].number,
  marginTop: _propTypes2["default"].number,
  marginBottom: _propTypes2["default"].number,
  marginLeft: _propTypes2["default"].number,
  marginRight: _propTypes2["default"].number
};

AcBarcode.defaultProps = {
  format: 'CODE128',
  renderer: 'svg',
  width: 2,
  height: 100,
  displayValue: true,
  fontOptions: '',
  font: 'monospace',
  textAlign: 'center',
  textPosition: 'bottom',
  textMargin: 2,
  fontSize: 20,
  background: '#ffffff',
  lineColor: '#000000',
  margin: 10
};

exports["default"] = AcBarcode;
module.exports = exports['default'];
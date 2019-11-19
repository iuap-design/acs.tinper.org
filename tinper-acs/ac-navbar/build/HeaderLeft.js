'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _beeFormControl = require('bee-form-control');

var _beeFormControl2 = _interopRequireDefault(_beeFormControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var HeaderLeft = function (_Component) {
  _inherits(HeaderLeft, _Component);

  function HeaderLeft(props, context) {
    _classCallCheck(this, HeaderLeft);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.svgClick = function () {
      var svgClick = _this.props.svgClick;

      svgClick && svgClick();
    };

    _this.onInputChange = function (value) {
      _this.setState({
        value: value
      });
    };

    _this.onSearch = function () {
      var onInputSearch = _this.props.onInputSearch;
      var value = _this.state.value;

      onInputSearch && onInputSearch(value);
    };

    _this.state = {
      value: ""
    };
    return _this;
  }

  HeaderLeft.prototype.render = function render() {
    var _props = this.props,
        sideBarShow = _props.sideBarShow,
        sideShowPosition = _props.sideShowPosition,
        searchInputProps = _props.searchInputProps;

    var classes = (0, _classnames2["default"])({
      'header-svg': true,
      'header-svg-red': sideBarShow,
      'header-svg-show': sideShowPosition
    });
    return _react2["default"].createElement(
      'div',
      { className: 'header-left' },
      _react2["default"].createElement(
        'div',
        { className: classes, onClick: this.svgClick },
        sideBarShow ? _react2["default"].createElement('img', { src: '//design.yonyoucloud.com/static/tinper-acs/ac-navbar/icon_menu_white.svg' }) : _react2["default"].createElement('img', { src: '//design.yonyoucloud.com/static/tinper-acs/ac-navbar/icon_menu.svg' })
      ),
      _react2["default"].createElement(
        'div',
        { className: 'header-search' },
        _react2["default"].createElement(_beeFormControl2["default"], _extends({
          className: 'header-search-input',
          value: this.state.value,
          onSearch: this.onSearch,
          onChange: this.onInputChange,
          type: 'search'
        }, searchInputProps))
      )
    );
  };

  return HeaderLeft;
}(_react.Component);

exports["default"] = HeaderLeft;
module.exports = exports['default'];
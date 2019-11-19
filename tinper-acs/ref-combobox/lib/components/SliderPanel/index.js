'use strict';

exports.__esModule = true;
exports.ComboItem = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ComboItem = require('../ComboItem');

var _ComboItem2 = _interopRequireDefault(_ComboItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  show: _propTypes2["default"].bool,
  style: _propTypes2["default"].object,
  slider: _propTypes2["default"].string,
  onClickItem: _propTypes2["default"].func
};

var defaultProps = {
  show: true,
  style: {},
  slider: 'up',
  onClickItem: function onClickItem(record) {}
};

/**
 * 下拉面板
 */

var SliderPanel = function (_PureComponent) {
  _inherits(SliderPanel, _PureComponent);

  function SliderPanel(props) {
    _classCallCheck(this, SliderPanel);

    var _this2 = _possibleConstructorReturn(this, _PureComponent.call(this, props));

    _this2.onClickItem = function (e) {
      e.stopPropagation();
      if (e.target.dataset.type !== 'comboitem') {
        return;
      }
      //来自ui的
      _this2.props.onClickItem(e.target, e);
    };

    _this2.state = {
      activePage: 1
    };
    return _this2;
  }

  SliderPanel.prototype.render = function render() {
    var _this = this;
    var _props = this.props,
        show = _props.show,
        style = _props.style,
        slider = _props.slider;

    return _react2["default"].createElement(
      'div',
      { className: 'ref-slider-panel ' + (slider == 'up' ? 'ref-slider-slider-up' : 'ref-slider-slider-down'), style: _extends({ display: show ? '' : 'none' }, style) },
      _react2["default"].createElement(
        'ul',
        { className: 'ref-slider-panel-ul',
          onClick: _this.onClickItem
        },
        this.props.children
      )
    );
  };

  return SliderPanel;
}(_react.PureComponent);

SliderPanel.propTypes = propTypes;
SliderPanel.defaultProps = defaultProps;
exports["default"] = SliderPanel;
exports.ComboItem = _ComboItem2["default"];
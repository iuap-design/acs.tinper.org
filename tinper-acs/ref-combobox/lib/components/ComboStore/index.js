'use strict';

exports.__esModule = true;

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _beeLoading = require('bee-loading');

var _beeLoading2 = _interopRequireDefault(_beeLoading);

var _Pagination = require('../Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  ajax: _propTypes2["default"].object,
  displayField: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].func]),
  valueField: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].func]),
  afterLoad: _propTypes2["default"].func,
  // reload: PropTypes.bool,
  strictMode: _propTypes2["default"].bool //严格模式
};
var defaultProps = {
  ajax: {},
  displayField: '{refname}',
  valueField: 'refcode',
  afterLoad: function afterLoad() {},
  // reload: true,
  strictMode: false
};

var ComboStore = function (_Component) {
  _inherits(ComboStore, _Component);

  function ComboStore(props) {
    _classCallCheck(this, ComboStore);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {};
    return _this;
  }

  ComboStore.prototype.render = function render() {
    var _props = this.props,
        _props$lang = _props.lang,
        lang = _props$lang === undefined ? 'zh_CN' : _props$lang,
        _props$topPagination = _props.topPagination,
        topPagination = _props$topPagination === undefined ? false : _props$topPagination,
        comboboxStoreData = _props.comboboxStoreData,
        _props$pageCount = _props.pageCount,
        pageCount = _props$pageCount === undefined ? 10 : _props$pageCount,
        _props$currPageIndex = _props.currPageIndex,
        currPageIndex = _props$currPageIndex === undefined ? 0 : _props$currPageIndex,
        totalElements = _props.totalElements,
        onSelect = _props.onSelect,
        loading = _props.loading;

    return _react2["default"].createElement(
      'div',
      null,
      _react2["default"].createElement(_beeLoading2["default"], { container: this, show: loading }),
      !topPagination && comboboxStoreData.map(function (item, i) {
        return _react2["default"].createElement(
          'div',
          { key: 'combox-store-' + i },
          item
        );
      }),
      _react2["default"].createElement(_Pagination2["default"], {
        show: pageCount <= 0 ? false : true,
        currPageIndex: ++currPageIndex,
        pageCount: pageCount,
        totalElements: totalElements,
        lang: lang,
        onSelect: onSelect
      }),
      topPagination && comboboxStoreData.map(function (item) {
        return item;
      })
    );
  };

  return ComboStore;
}(_react.Component);

ComboStore.propTypes = propTypes;
ComboStore.defaultProps = defaultProps;
exports["default"] = ComboStore;
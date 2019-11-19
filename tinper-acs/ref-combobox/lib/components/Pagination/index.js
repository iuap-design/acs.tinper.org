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

var _beePagination = require('bee-pagination');

var _beePagination2 = _interopRequireDefault(_beePagination);

var _locale = require('../../utils/locale');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  onSelect: _propTypes2["default"].func,
  pageCount: _propTypes2["default"].number,
  currPageIndex: _propTypes2["default"].number,
  show: _propTypes2["default"].bool
};

var defaultProps = {
  pageCount: 0,
  currPageIndex: 0,
  onSelect: function onSelect() {},
  show: true
};

var PaginationWrap = function (_PureComponent) {
  _inherits(PaginationWrap, _PureComponent);

  function PaginationWrap(props) {
    _classCallCheck(this, PaginationWrap);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));

    _this.onSelect = function (e) {
      if (e.target.type === 'button' && e.target.dataset.paginationButton) {
        var onSelect = _this.props.onSelect;

        onSelect(e.target.dataset.paginationButton);
      }
    };

    _this.state = {};
    return _this;
  }

  PaginationWrap.prototype.render = function render() {
    var _props = this.props,
        currPageIndex = _props.currPageIndex,
        pageCount = _props.pageCount,
        show = _props.show,
        totalElements = _props.totalElements,
        _props$lang = _props.lang,
        lang = _props$lang === undefined ? 'zh_CN' : _props$lang,
        onSelect = _props.onSelect;

    return _react2["default"].createElement(
      'div',
      { className: 'ref-pagination' },
      _react2["default"].createElement(_beePagination2["default"], {
        style: { display: show ? '' : 'none' },
        pagecount: pageCount,
        first: true,
        last: true,
        prev: true,
        next: true,
        boundaryLinks: true,
        className: pageCount > 0 ? '' : '  ref-multiple-table-pagination-hide',
        items: pageCount,
        total: totalElements,
        activePage: currPageIndex,
        onSelect: onSelect,
        locale: (0, _locale.paginationLocale)(lang),
        maxButtons: 3
      })
    );
  };

  return PaginationWrap;
}(_react.PureComponent);

PaginationWrap.propTypes = propTypes;
PaginationWrap.defaultProps = defaultProps;
exports["default"] = PaginationWrap;
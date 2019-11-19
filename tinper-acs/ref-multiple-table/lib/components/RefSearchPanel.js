'use strict';

exports.__esModule = true;
exports.SearchPanelItem = undefined;

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

var _beeForm = require('bee-form');

var _beeForm2 = _interopRequireDefault(_beeForm);

var _beeLabel = require('bee-label');

var _beeLabel2 = _interopRequireDefault(_beeLabel);

var _beeLayout = require('bee-layout');

var _beeSearchPanel = require('bee-search-panel');

var _beeSearchPanel2 = _interopRequireDefault(_beeSearchPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FormItem = _beeForm2["default"].FormItem;

var AdvancedContainer = _beeSearchPanel2["default"].AdvancedContainer;
/**
 * 部分不能通过this.props.form.resetFields()清空的组件，需要传reset方法，在reset方法中自行清空
 */
var propTypes = {
  searchOpen: _propTypes2["default"].bool, //是否默认展开，false默认关闭
  title: _propTypes2["default"].string,
  onSearch: _propTypes2["default"].func,
  onClear: _propTypes2["default"].func,
  show: _propTypes2["default"].bool,
  searchPanelLocale: _propTypes2["default"].object
};

var defaultProps = {
  searchOpen: false,
  title: "查询与筛选",
  onSearch: function onSearch() {},
  onClear: function onClear() {},
  show: true,
  searchPanelLocale: {
    'title': '查询与筛选',
    'resetName': '重置',
    'searchName': '查询',
    'down': '打开',
    'up': '关闭'
  }
};
var SearchPanelItem = function SearchPanelItem(props) {
  var form = props.form,
      others = _objectWithoutProperties(props, ['form']);

  var getFieldProps = form.getFieldProps;

  return _react2["default"].createElement(
    _beeLayout.Col,
    { md: 4, xs: 12, sm: 12 },
    _react2["default"].createElement(
      'div',
      { className: 'formItemCustomed' },
      _react2["default"].createElement(
        _beeLabel2["default"],
        null,
        others.text
      ),
      _react2["default"].createElement(
        'div',
        { className: 'ref-search-panel-search-item' },
        _react2["default"].cloneElement(others.children, _extends({}, getFieldProps(others.name, {
          initialValue: ''
        })))
      )
    )
  );
};

var RefSearchPanel = function (_Component) {
  _inherits(RefSearchPanel, _Component);

  function RefSearchPanel(props) {
    _classCallCheck(this, RefSearchPanel);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onSearchClearClick = function () {
      var onClear = _this.props.onClear;

      _this.props.form.resetFields();
      onClear();
    };

    _this.onSearchClick = function () {
      var onSearch = _this.props.onSearch;

      _this.props.form.validateFields(function (err, values) {
        onSearch(values);
      });
    };

    _this.searchPanelExpand = function () {
      _this.setState({
        searchPanelExpand: !_this.state.searchPanelExpand
      });
    };

    _this.state = {
      searchOpen: _this.props.searchOpen,
      searchPanelExpand: true
    };
    return _this;
  }

  RefSearchPanel.prototype.render = function render() {
    var _props = this.props,
        form = _props.form,
        title = _props.title,
        show = _props.show,
        searchPanelLocale = _props.searchPanelLocale;

    return _react2["default"].createElement(
      _beeSearchPanel2["default"],
      {
        locale: searchPanelLocale,
        className: 'ref-search-panel' + (show ? '' : '-hide'),
        clsPrefix: 'u-search',
        showIcon: true,
        onReset: this.onSearchClearClick,
        onSearch: this.onSearchClick,
        expanded: this.state.searchPanelExpand,
        showOperation: true,
        onChange: this.searchPanelExpand

      },
      _react2["default"].createElement(
        AdvancedContainer,
        null,
        _react2["default"].createElement(
          _beeForm2["default"],
          null,
          _react2["default"].createElement(
            _beeLayout.Row,
            null,
            _react2["default"].Children.map(this.props.children, function (item) {
              return _react2["default"].cloneElement(item, {
                form: form
              });
            })
          )
        )
      )
    );
  };

  return RefSearchPanel;
}(_react.Component);

RefSearchPanel.propTypes = propTypes;
RefSearchPanel.defaultProps = defaultProps;
exports.SearchPanelItem = SearchPanelItem;
exports["default"] = _beeForm2["default"].createForm()(RefSearchPanel);
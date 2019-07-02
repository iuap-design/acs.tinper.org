'use strict';

exports.__esModule = true;
exports.SliderPanel = exports.ComboItem = exports.ComboStore = undefined;

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

var _immutable = require('immutable');

var _menuSelector = require('menu-selector');

var _menuSelector2 = _interopRequireDefault(_menuSelector);

var _SliderPanel = require('./components/SliderPanel');

var _SliderPanel2 = _interopRequireDefault(_SliderPanel);

var _ComboStore = require('./components/ComboStore');

var _ComboStore2 = _interopRequireDefault(_ComboStore);

require('./utils/polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  className: _propTypes2["default"].string,
  defaultValue: _propTypes2["default"].string,
  value: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].array]),
  displayField: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].func]),
  valueField: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].func]),
  sliderWidth: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].number]),
  onClickItemInner: _propTypes2["default"].func, //[Deprecated]
  onSelectorChange: _propTypes2["default"].func,
  style: _propTypes2["default"].object,
  comboboxStoreData: _propTypes2["default"].array, //[Deprecated]
  storeData: _propTypes2["default"].array,
  onChangeFormControl: _propTypes2["default"].func, //[Deprecated]
  onFocusFormControl: _propTypes2["default"].func, //[Deprecated]
  onSearch: _propTypes2["default"].func,
  onSelect: _propTypes2["default"].func, //[Deprecated]
  onPaginationSelect: _propTypes2["default"].func
};

var defaultProps = {
  className: '',
  children: null,
  "default": '',
  value: '',
  displayField: '{refname}',
  valueField: 'refpk',
  style: {},
  comboboxStoreData: [], //[Deprecated]
  storeData: [],
  onChangeFormControl: function onChangeFormControl() {}, //[Deprecated]
  onFocusFormControl: function onFocusFormControl() {}, //[Deprecated]
  onSearch: function onSearch() {},
  onSelect: function onSelect() {}, //[Deprecated]
  onPaginationSelect: function onPaginationSelect() {},
  onClickItemInner: function onClickItemInner() {}, //[Deprecated]
  onSelectorChange: function onSelectorChange() {},
  showMenuIcon: false,
  showArrow: true //不展示navmenu展示箭头
};

var RefComboBoxBaseUI = function (_Component) {
  _inherits(RefComboBoxBaseUI, _Component);

  function RefComboBoxBaseUI(props) {
    _classCallCheck(this, RefComboBoxBaseUI);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onDropdownVisibleChange = function (open) {
      var _this$props$onPopupVi = _this.props.onPopupVisibleChange,
          onPopupVisibleChange = _this$props$onPopupVi === undefined ? function () {} : _this$props$onPopupVi;

      onPopupVisibleChange(open);
    };

    _this.selectorChange = function (status, id, item, selectedArray) {
      var _this$props = _this.props,
          onClickItemInner = _this$props.onClickItemInner,
          onSelectorChange = _this$props.onSelectorChange;

      onClickItemInner(selectedArray, item, status); //[Deprecated]
      onSelectorChange(selectedArray, item, status);
    };

    _this.paginationSelect = function (index) {
      var _this$props2 = _this.props,
          onSelect = _this$props2.onSelect,
          onPaginationSelect = _this$props2.onPaginationSelect;

      onSelect(index); //[Deprecated]
      onPaginationSelect(index);
    };

    _this.onSearch = function (value) {
      var _this$props3 = _this.props,
          onChangeFormControl = _this$props3.onChangeFormControl,
          onSearch = _this$props3.onSearch;

      onChangeFormControl(value); //[Deprecated]
      onSearch(value);
    };

    _this.state = {};

    return _this;
  }
  /**
   * @msg: 下拉展开或者关闭
   * @param {type} 
   * @return: 
   */

  /**
   * @msg: selector的值改变
   * @param {type} 
   * @return: 
   */

  /**
   * @msg: 分页跳转
   * @param {type} 
   * @return: 
   */

  /**
   * @msg: 搜索
   * @param {type} 
   * @return: 
   */


  RefComboBoxBaseUI.prototype.render = function render() {
    var _extends2;

    var _props = this.props,
        className = _props.className,
        children = _props.children,
        style = _props.style,
        _props$theme = _props.theme,
        theme = _props$theme === undefined ? 'ref-red' : _props$theme,
        _props$pageCount = _props.pageCount,
        pageCount = _props$pageCount === undefined ? 1 : _props$pageCount,
        _props$currPageIndex = _props.currPageIndex,
        currPageIndex = _props$currPageIndex === undefined ? 0 : _props$currPageIndex,
        _props$totalElements = _props.totalElements,
        totalElements = _props$totalElements === undefined ? 0 : _props$totalElements,
        storeData = _props.storeData,
        _props$multiple = _props.multiple,
        multiple = _props$multiple === undefined ? false : _props$multiple,
        displayField = _props.displayField,
        inputDisplay = _props.inputDisplay,
        value = _props.value,
        defaultValue = _props.defaultValue,
        searchValue = _props.searchValue,
        defaultopen = _props.defaultopen,
        disabled = _props.disabled,
        dropdownStyle = _props.dropdownStyle,
        notFoundContent = _props.notFoundContent,
        placeholder = _props.placeholder,
        searchPlaceholder = _props.searchPlaceholder,
        maxTagCount = _props.maxTagCount,
        maxTagPlaceholder = _props.maxTagPlaceholder,
        loading = _props.loading,
        valueField = _props.valueField,
        showMenuIcon = _props.showMenuIcon,
        showArrow = _props.showArrow;
    var _props2 = this.props,
        topPagination = _props2.topPagination,
        dropdownClassName = _props2.dropdownClassName; //兼容之前版本topPagination放在childrencomboStore上了

    if (children && children.props.topPagination) topPagination = children.props.topPagination;
    dropdownClassName = dropdownClassName ? dropdownClassName + ' ref-red' : 'ref-red';
    return _react2["default"].createElement(
      'div',
      { className: theme + ' ' + className + ' ref-combobox' },
      _react2["default"].createElement(_menuSelector2["default"], _extends({}, this.props, (_extends2 = {
        style: _extends({}, style, {
          width: style.width || 300
        }),
        transitionName: 'rc-tree-select-dropdown-slide-up',
        choiceTransitionName: 'rc-tree-select-selection__choice-zoom',
        showSearch: true,
        allowClear: true,
        showMenuIcon: true //固定参数带有搜索，清空，menuIcon
        , disabled: disabled,
        placeholder: placeholder,
        searchPlaceholder: searchPlaceholder,
        maxTagCount: maxTagCount,
        maxTagPlaceholder: maxTagPlaceholder,
        value: value,
        defaultValue: defaultValue,
        defaultopen: defaultopen,
        searchValue: searchValue,
        valueList: storeData,
        valueField: valueField,
        inputDisplay: inputDisplay,

        dropdownClassName: dropdownClassName,
        dropdownStyle: dropdownStyle,
        loading: loading,
        notFoundContent: notFoundContent,
        topPagination: topPagination,
        pageCount: pageCount,
        currPageIndex: currPageIndex,
        totalElements: totalElements,
        multiple: multiple,
        displayField: displayField,
        onPaginationSelect: this.paginationSelect,
        onSelectorChange: this.selectorChange //为了配合ref-combobox的之前发版的操作
        , onSearch: this.onSearch,
        onDropdownVisibleChange: this.onDropdownVisibleChange
      }, _extends2['showMenuIcon'] = showMenuIcon, _extends2.showArrow = showArrow, _extends2)))
    );
  };

  return RefComboBoxBaseUI;
}(_react.Component);

RefComboBoxBaseUI.propTypes = propTypes;
RefComboBoxBaseUI.defaultProps = defaultProps;
exports["default"] = RefComboBoxBaseUI;
exports.ComboStore = _ComboStore2["default"];
exports.ComboItem = _SliderPanel.ComboItem;
exports.SliderPanel = _SliderPanel2["default"];
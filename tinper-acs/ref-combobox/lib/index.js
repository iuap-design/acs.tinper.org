'use strict';

exports.__esModule = true;
exports.SliderPanel = exports.ComboItem = exports.ComboStore = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _beeInputGroup = require('bee-input-group');

var _beeInputGroup2 = _interopRequireDefault(_beeInputGroup);

var _beeFormControl = require('bee-form-control');

var _beeFormControl2 = _interopRequireDefault(_beeFormControl);

var _rcTrigger = require('rc-trigger');

var _rcTrigger2 = _interopRequireDefault(_rcTrigger);

require('rc-trigger/assets/index.css');

var _SliderPanel = require('./components/SliderPanel');

var _SliderPanel2 = _interopRequireDefault(_SliderPanel);

var _ComboStore = require('./components/ComboStore');

var _ComboStore2 = _interopRequireDefault(_ComboStore);

var _utils = require('./utils/utils');

require('./utils/polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  className: _propTypes2["default"].string,
  value: _propTypes2["default"].string,
  displayField: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].func]),
  valueField: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].func]),
  sliderWidth: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].number]),
  onClickItem: _propTypes2["default"].func,
  matchUrl: _propTypes2["default"].string,
  filterUrl: _propTypes2["default"].string,
  onChange: _propTypes2["default"].func,
  style: _propTypes2["default"].object,
  canClickGoOn: _propTypes2["default"].func,
  canInputGoOn: _propTypes2["default"].func,
  onSave: _propTypes2["default"].func,
  comboboxStoreData: _propTypes2["default"].array,
  storeData: _propTypes2["default"].array,
  onChangeFormControl: _propTypes2["default"].func,
  onFocusFormControl: _propTypes2["default"].func,
  onSelect: _propTypes2["default"].func
};

var defaultProps = {
  className: '',
  children: '',
  value: '',
  displayField: '{refname}',
  valueField: 'refcode',
  style: {},
  canClickGoOn: function canClickGoOn() {
    return true;
  },
  canInputGoOn: function canInputGoOn() {
    return true;
  },
  onSave: function onSave() {},
  comboboxStoreData: [],
  storeData: [],
  onChangeFormControl: function onChangeFormControl() {},
  onFocusFormControl: function onFocusFormControl() {},
  onSelect: function onSelect() {}
};

var RefComboBoxBaseUI = (_temp = _class = function (_Component) {
  _inherits(RefComboBoxBaseUI, _Component);

  function RefComboBoxBaseUI(props) {
    var _extends2;

    _classCallCheck(this, RefComboBoxBaseUI);

    var _this2 = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this2);

    _this2.state = _extends((_extends2 = {
      showSlider: false,
      value: '',
      displayValue: props.displayValue ? props.displayValue : '',
      activePage: 1,
      dataStore: {}, //缓存的数据
      slider: 'down',
      filterText: '',
      filterItems: [],
      filterDataMap: {},
      filtering: false,
      sliderSearchVal: '' }, _extends2['value'] = '', _extends2.popupVisible = false, _extends2), _this2.checkChildren(props));

    return _this2;
  }

  RefComboBoxBaseUI.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        value = _props.value,
        storeData = _props.storeData;

    this.afterLoad(this.fixDataToMap(storeData));
    if (value) {
      var refValue = (0, _utils.refValParse)(value);
      this.setState({
        displayValue: refValue.refname,
        value: refValue.refpk,
        sliderSearchVal: refValue.refpk
      });
    }
  };

  RefComboBoxBaseUI.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!(0, _immutable.is)(nextProps.storeData, this.props.storeData)) {
      var data = this.fixDataToMap(nextProps.storeData);
      this.afterLoad(data);
    }
    if (this.props.value !== nextProps.value) {
      this.matchValues(nextProps);
    }
  };
  /**
   * 检查子节点 返回过滤后的节点列表
   */


  /**
   * 数据选择
   */


  RefComboBoxBaseUI.prototype.render = function render() {
    var _this3 = this;

    var _this = this;
    var _props2 = this.props,
        className = _props2.className,
        sliderWidth = _props2.sliderWidth,
        style = _props2.style,
        _props2$theme = _props2.theme,
        theme = _props2$theme === undefined ? 'ref-red' : _props2$theme,
        _props2$comboboxStore = _props2.comboboxStoreData,
        comboboxStoreData = _props2$comboboxStore === undefined ? [] : _props2$comboboxStore,
        _props2$pageCount = _props2.pageCount,
        pageCount = _props2$pageCount === undefined ? 1 : _props2$pageCount,
        _props2$currPageIndex = _props2.currPageIndex,
        currPageIndex = _props2$currPageIndex === undefined ? 0 : _props2$currPageIndex,
        onSelect = _props2.onSelect,
        loading = _props2.loading,
        _props2$totalElements = _props2.totalElements,
        totalElements = _props2$totalElements === undefined ? 0 : _props2$totalElements;
    var _state = this.state,
        showSlider = _state.showSlider,
        displayValue = _state.displayValue,
        children = _state.children,
        useStore = _state.useStore,
        slider = _state.slider,
        filtering = _state.filtering,
        filterText = _state.filterText;

    var inputVal = filtering ? filterText.trim() : displayValue.trim();
    var builtinPlacements = {
      bottomLeft: {
        points: ['tl', 'tl']
      }
    };
    var innerTrigger = _react2["default"].createElement(
      _SliderPanel2["default"],
      {
        show: true,
        style: {
          width: sliderWidth || 'auto'
        },
        slider: slider,
        onClickItem: _this.onClickItem
      },
      useStore ? children.map(function (item) {
        return _react2["default"].cloneElement(item, _extends({}, item.props, { //对于comboboxstore传进来的参数
          reload: showSlider,
          comboboxStoreData: comboboxStoreData,
          pageCount: pageCount,
          currPageIndex: currPageIndex,
          onSelect: onSelect,
          loading: loading,
          totalElements: totalElements
        }));
      }) : children.map(function (item) {
        return item;
      })
    );
    return _react2["default"].createElement(
      'div',
      { className: theme + ' ' + className + ' ref-combobox',
        style: _extends({}, style, {
          width: style.width || 200
        }) },
      _react2["default"].createElement(
        _rcTrigger2["default"],
        {
          popupPlacement: 'bottomLeft',
          action: ['click'],
          popupAlign: {
            overflow: {
              adjustX: 1,
              adjustY: 1
            }
          },
          mouseEnterDelay: 0,
          popupClassName: theme,
          builtinPlacements: builtinPlacements,
          popup: innerTrigger
          // /alignPoint={false}
          , onPopupAlign: this.onPopupAlign,
          onPopupVisibleChange: this.onPopupVisibleChange,
          popupVisible: this.state.popupVisible
        },
        _react2["default"].createElement(
          _beeInputGroup2["default"],
          { simple: true, style: { width: '100%' } },
          _react2["default"].createElement(_beeFormControl2["default"], _extends({
            type: 'text',
            style: {
              width: '100%'
            }
          }, displayValue.trim() ? { readOnly: "readonly" } : '', {
            value: inputVal,
            onChange: this.onChangeFormControl,
            onFocus: this.onFocusFormControl
          })),
          _react2["default"].createElement(
            _beeInputGroup2["default"].Button,
            { shape: 'border' },
            _react2["default"].createElement(
              'span',
              { className: 'uf uf-navmenu' },
              ' '
            )
          ),
          !!inputVal && _react2["default"].createElement(
            _beeInputGroup2["default"].Button,
            { className: 'clearAll', shape: 'border', style: {
                cursor: 'pointer'
              } },
            _react2["default"].createElement(
              'span',
              { className: !inputVal ? '' : "uf uf-close-c", onClick: function onClick(e) {
                  return _this3.clearAll(e);
                } },
              ' '
            )
          )
        )
      )
    );
  };

  return RefComboBoxBaseUI;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.matchValues = function (props) {
    var value = props.value;

    if (value) {
      var refValue = (0, _utils.refValParse)(value);
      _this4.setState({
        displayValue: refValue.refname,
        value: refValue.refpk,
        sliderSearchVal: refValue.refpk
      });
    }
    return;
  };

  this.checkChildren = function (props) {
    var porpsChildren = _react2["default"].Children.toArray(props.children),
        useStore = false,
        children = [],
        $$children = (0, _immutable.fromJS)([]);
    for (var i = 0; i < porpsChildren.length; i++) {
      var item = porpsChildren[i];
      if (item.type && item.type.name === 'ComboStore' || item.type && item.type.prototype === _ComboStore2["default"].prototype) {
        useStore = true;
        children = [item];
        break;
      } else if (item.type && item.type.name === 'ComboItem' || item.type && item.type.prototype === _SliderPanel.ComboItem.prototype) {
        children.push(item);
      }
    }
    return { children: children, useStore: useStore };
  };

  this.onClickItem = function (item, e) {
    var _this = _this4;
    var dataStore = _this4.state.dataStore;
    var _this$props = _this.props,
        valueField = _this$props.valueField,
        displayField = _this$props.displayField,
        onClickItemInner = _this$props.onClickItemInner;

    var value = item.dataset.value,
        displayValue = item.textContent,
        record = dataStore[value];
    if (record) {
      if (typeof valueField === 'string') {
        value = record[valueField];
      } else {
        value = valueField(record);
      }
      if (typeof displayField === 'string') {
        displayValue = displayField.format(record);
      } else {
        displayValue = displayField(record);
      }
    }
    _this.setState({
      displayValue: displayValue,
      filterText: displayValue,
      filtering: false,
      value: value,
      sliderSearchVal: value,
      popupVisible: false
    }, function () {
      _this.handleChange(value);
      if (onClickItemInner && record) {
        onClickItemInner(record);
      } else {
        onClickItemInner(value, displayValue, e);
      }
    });
  };

  this.fixDataToMap = function (data) {
    if (!data || !data.length) return {};
    var _props$valueField = _this4.props.valueField,
        valueField = _props$valueField === undefined ? 'refpk' : _props$valueField;

    var dataMap = {};
    data.forEach(function (item) {
      dataMap[item[valueField]] = item;
    });
    return dataMap;
  };

  this.afterLoad = function (dataMap) {
    _this4.setState({
      dataStore: dataMap
    });
  };

  this.handleChange = function (values) {
    var onChange = _this4.props.onChange;
    var _state2 = _this4.state,
        displayValue = _state2.displayValue,
        value = _state2.value;

    if (onChange) {
      onChange((0, _stringify2["default"])({
        refpk: value,
        refname: displayValue
      }));
    }
  };

  this.onChangeFormControl = function (value) {
    var onChangeFormControl = _this4.props.onChangeFormControl;

    onChangeFormControl(value);
    if (_this4.state.filtering) {
      _this4.setState({
        filterText: value,
        sliderSearchVal: value,
        popupVisible: true
      });
    } else {
      _this4.setState({
        filterText: value,
        filtering: true,
        sliderSearchVal: value,
        popupVisible: true
      });
    }
  };

  this.onFocusFormControl = function () {
    var onFocusFormControl = _this4.props.onFocusFormControl;

    onFocusFormControl(_this4.state.popupVisible);
  };

  this.clearAll = function (e) {
    // window.event? window.event.cancelBubble = true : e.stopPropagation();
    _this4.setState({
      displayValue: '',
      filterText: '',
      value: ''
    }, function () {
      if (_this4.props.onClickItem) {
        _this4.props.onClickItem('');
      }
      _this4.setState({ popupVisible: true });
      _this4.props.onChangeFormControl('');
    });
  };

  this.onPopupAlign = function (e, value) {
    _this4.setState({ sliderSearchVal: _this4.state.value });
  };

  this.onPopupVisibleChange = function () {
    var _props$onPopupVisible = _this4.props.onPopupVisibleChange,
        onPopupVisibleChange = _props$onPopupVisible === undefined ? function () {} : _props$onPopupVisible;

    onPopupVisibleChange(_this4.state.popupVisible, _this4.state.sliderSearchVal);
    if (_this4.state.filtering && _this4.state.popupVisible) {
      //手动输入不算数
      _this4.setState({
        popupVisible: !_this4.state.popupVisible,
        displayValue: '',
        filterText: '',
        sliderSearchVal: '',
        value: '',
        filterUrl: false
      });
      _this4.props.onClickItemInner({});
    } else {
      _this4.setState({
        popupVisible: !_this4.state.popupVisible
      });
    }
  };
}, _temp);

RefComboBoxBaseUI.propTypes = propTypes;
RefComboBoxBaseUI.defaultProps = defaultProps;
exports["default"] = RefComboBoxBaseUI;
exports.ComboStore = _ComboStore2["default"];
exports.ComboItem = _SliderPanel.ComboItem;
exports.SliderPanel = _SliderPanel2["default"];
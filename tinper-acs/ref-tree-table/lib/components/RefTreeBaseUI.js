'use strict';

exports.__esModule = true;

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

var _beeLoading = require('bee-loading');

var _beeLoading2 = _interopRequireDefault(_beeLoading);

var _RefCoreError = require('ref-core/lib/refs/RefCoreError');

var _RefCoreError2 = _interopRequireDefault(_RefCoreError);

var _RefCoreTree = require('ref-core/lib/refs/RefCoreTree');

var _RefCoreTree2 = _interopRequireDefault(_RefCoreTree);

var _RefCoreSearch = require('ref-core/lib/refs/RefCoreSearch');

var _RefCoreSearch2 = _interopRequireDefault(_RefCoreSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; }

var noop = function noop() {};
var propTypes = {
  title: _propTypes2["default"].string,
  multiple: _propTypes2["default"].bool, //  默认单选
  showLine: _propTypes2["default"].bool,
  defaultExpandAll: _propTypes2["default"].bool, // 数默认展开
  checkStrictly: _propTypes2["default"].bool,
  checkedArray: _propTypes2["default"].array, //  指定已选择数据id
  checkedTreeArray: _propTypes2["default"].array, //  指定已选树择数据id
  treeData: _propTypes2["default"].array, //  指定已选择数据id
  lazyModal: _propTypes2["default"].bool,
  onCancel: _propTypes2["default"].func,
  onSave: _propTypes2["default"].func,
  lang: _propTypes2["default"].string,
  //重命名属性
  searchable: _propTypes2["default"].bool, //  是否应用搜索 默认 false,
  onTreeChangeFromBaseUI: _propTypes2["default"].func, //树操作的时候节点选中返回
  onTreeSearch: _propTypes2["default"].func //搜索
};
var defaultProps = {
  title: '弹窗标题',
  searchable: false, //  是否应用搜索 默认 false,
  multiple: false, //  默认单选
  showLine: false, //  默认单选
  defaultExpandAll: true, // 数默认展开
  checkStrictly: false,
  checkedArray: [], //  指定已选择数据id
  checkedTreeArray: [],
  treeData: [],
  lazyModal: false,
  onCancel: noop,
  onSave: noop,
  lang: 'zh_CN',
  onTreeChangeFromBaseUI: function onTreeChangeFromBaseUI() {},
  onTreeSearch: function onTreeSearch() {}
};

var RefTreeBaseUI = function (_Component) {
  _inherits(RefTreeBaseUI, _Component);

  function RefTreeBaseUI(props) {
    _classCallCheck(this, RefTreeBaseUI);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onSearchChange = function (value) {
      if (_this.props.isLocalSearch) {
        _this.setState({
          searchValue: value
        });
      } else {
        _this.props.onTreeSearch(value);
      }
    };

    _this.onSelectNode = function (checkedArray) {
      var onTreeChangeFromBaseUI = _this.props.onTreeChangeFromBaseUI;

      onTreeChangeFromBaseUI(checkedArray);
    };

    var checkedTreeArray = props.checkedTreeArray,
        multiple = props.multiple,
        checkStrictly = props.checkStrictly,
        defaultExpandAll = props.defaultExpandAll,
        valueField = props.valueField;

    _this.state = {
      selectedArray: checkedTreeArray || [], //  记录保存的选择项
      defaultExpandAll: defaultExpandAll,
      multiple: multiple,
      checkStrictly: checkStrictly,
      checkedKeys: checkedTreeArray.map(function (item) {
        return item[valueField];
      }),
      onSaveCheckItems: [],
      searchValue: '' //搜索
    };
    _this.treeData = props.treeData || [];
    _this.treeDataCache = {};
    return _this;
  }

  // shouldComponentUpdate(nextProps, nextState){
  // 	return !is(nextState, this.state) || nextProps.showModal !== this.props.showModal;
  // }


  RefTreeBaseUI.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextState) {
    if (!(0, _immutable.is)(nextState, this.state)) {
      this.treeData = nextProps.treeData;
      this.setState({ mustRender: Math.random() });
    }
  };

  RefTreeBaseUI.prototype.onCheck = function onCheck(selectedKeys, event) {
    var _this2 = this;

    var multiple = this.props.multiple;

    if (!multiple) {
      //单选
      this.setState({
        selectedArray: [event.node.props.attr],
        checkedKeys: [event.node.props.eventKey],
        onSaveCheckItems: [event.node.props.attr]
      }, function () {
        _this2.onSelectNode([event.node.props.attr]);
      });
    } else {
      this.setState({
        selectedArray: event.checkedNodes.map(function (item) {
          return item.props.attr;
        }),
        checkedKeys: selectedKeys,
        onSaveCheckItems: event.checkedNodes.map(function (item) {
          return item.props.attr;
        })
      }, function () {
        _this2.onSelectNode([event.node.props.attr]);
      });
    }
  };

  RefTreeBaseUI.prototype.onDoubleClick = function onDoubleClick(selectedKeys, event) {
    var _this3 = this;

    var item = event.node.props;
    var arr = [_extends({}, item.attr, { refpk: item.eventKey, id: item.eventKey })];
    this.setState({
      selectedArray: arr,
      checkedKeys: [item.eventKey]
    }, function () {
      _this3.onSelectNode(arr);
    });
  };

  RefTreeBaseUI.prototype.onSelect = function onSelect(selectedKeys, event) {
    var _props = this.props,
        checkAllChildren = _props.checkAllChildren,
        multiple = _props.multiple;

    var eventKey = event.node.props.eventKey;
    var onSaveCheckItems = this.state.onSaveCheckItems;

    var ishaskey = false;
    var keyIndex = void 0;
    // if (multiple) return;
    onSaveCheckItems.forEach(function (v, i) {
      if (v.id == eventKey) {
        keyIndex = i;
      }
      if (v.id == eventKey && v.checkAllchildren) {
        ishaskey = true;
        return false;
      }
    });
    if (ishaskey) {
      this.setState({
        checkedKeys: selectedKeys
      });
      this.onSelectNode(this.state.selectedArray);
      return false;
    }
    if (!checkAllChildren) {
      var arr = event.selectedNodes.map(function (item) {
        return _extends({}, item.props.attr, { refpk: item.key, id: item.key });
      });
      this.setState({
        selectedArray: arr,
        checkedKeys: selectedKeys
      });
      this.onSelectNode(arr);
    } else {
      var _arr = {};
      event.selectedNodes.forEach(function (item) {
        if (item.key == eventKey) {
          _arr = _extends({}, item.props.attr, { refname: item.props.title, refpk: item.key, id: item.key });
        }
      });
      if (selectedKeys.indexOf(eventKey) > -1) {
        onSaveCheckItems.push(_arr);
      } else {

        onSaveCheckItems.splice(keyIndex, 1);
      }

      this.setState({
        selectedArray: onSaveCheckItems,
        checkedKeys: selectedKeys,
        onSaveCheckItems: onSaveCheckItems
      });
      this.onSelectNode(onSaveCheckItems);
    }
  };

  RefTreeBaseUI.prototype.render = function render() {
    var _props2 = this.props,
        className = _props2.className,
        searchable = _props2.searchable,
        valueField = _props2.valueField,
        showLine = _props2.showLine,
        lazyModal = _props2.lazyModal,
        showLoading = _props2.showLoading,
        lang = _props2.lang,
        defaultExpandAll = _props2.defaultExpandAll,
        _props2$nodeDisplay = _props2.nodeDisplay,
        nodeDisplay = _props2$nodeDisplay === undefined ? "{refname}" : _props2$nodeDisplay,
        treeNodeDisabledKey = _props2.treeNodeDisabledKey,
        treeNodeDisabledFunc = _props2.treeNodeDisabledFunc,
        isLocalSearch = _props2.isLocalSearch;
    var _state = this.state,
        checkedKeys = _state.checkedKeys,
        checkStrictly = _state.checkStrictly,
        searchValue = _state.searchValue;

    return _react2["default"].createElement(
      'div',
      {
        className: className + ' ref-core ref-tree-table-base '
      },
      _react2["default"].createElement(_RefCoreSearch2["default"], {
        show: searchable,
        onSearch: this.onSearchChange,
        onChange: this.onSearchChange,
        language: lang
      }),
      this.treeData.length ? _react2["default"].createElement(_RefCoreTree2["default"], {
        show: Boolean(this.treeData.length),
        nodeKeys: function nodeKeys(item) {
          return item[valueField];
        },
        displayField: nodeDisplay,
        data: this.treeData,
        defaultExpandAll: lazyModal ? false : defaultExpandAll,
        checkable: false,
        multiple: false,
        onCheck: this.onCheck.bind(this),
        onSelect: this.onSelect.bind(this),
        onDoubleClick: this.onDoubleClick.bind(this),
        checkedKeys: checkedKeys,
        selectedKeys: checkedKeys,
        checkStrictly: checkStrictly,
        showLine: showLine,
        loadData: lazyModal ? this.props.onLoadData : null,
        searchValue: isLocalSearch ? searchValue : null,
        treeNodeDisabledFunc: treeNodeDisabledFunc,
        treeNodeDisabledKey: treeNodeDisabledKey
      }) : _react2["default"].createElement(_RefCoreError2["default"], { show: !Boolean(this.treeData.length), language: lang })
    );
  };

  return RefTreeBaseUI;
}(_react.Component);

RefTreeBaseUI.propTypes = propTypes;
RefTreeBaseUI.defaultProps = defaultProps;
exports["default"] = RefTreeBaseUI;
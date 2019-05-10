'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

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

var _utils = require('./utils');

var _RefCoreError = require('ref-core/lib/refs/RefCoreError');

var _RefCoreError2 = _interopRequireDefault(_RefCoreError);

var _RefCoreTree = require('ref-core/lib/refs/RefCoreTree');

var _RefCoreTree2 = _interopRequireDefault(_RefCoreTree);

var _RefCoreSearch = require('ref-core/lib/refs/RefCoreSearch');

var _RefCoreSearch2 = _interopRequireDefault(_RefCoreSearch);

var _RefCoreButton = require('ref-core/lib/refs/RefCoreButton');

var _RefCoreButton2 = _interopRequireDefault(_RefCoreButton);

var _beeLoading = require('bee-loading');

var _beeLoading2 = _interopRequireDefault(_beeLoading);

var _beeModal = require('bee-modal');

var _beeModal2 = _interopRequireDefault(_beeModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = (0, _getOwnPropertyNames2["default"])(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = (0, _getOwnPropertyDescriptor2["default"])(defaults, key); if (value && value.configurable && obj[key] === undefined) { (0, _defineProperty2["default"])(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};
var propTypes = {
  title: _propTypes2["default"].string,
  backdrop: _propTypes2["default"].bool,
  className: _propTypes2["default"].string,
  showLoading: _propTypes2["default"].bool,
  searchable: _propTypes2["default"].bool, //  是否应用搜索 默认 false,
  valueField: _propTypes2["default"].string,
  checkStrictly: _propTypes2["default"].bool,
  showLine: _propTypes2["default"].bool,
  lazyModal: _propTypes2["default"].bool,
  showModal: _propTypes2["default"].bool,
  lang: _propTypes2["default"].string,
  defaultExpandAll: _propTypes2["default"].bool, // 数默认展开
  nodeDisplay: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].func]),
  buttons: _propTypes2["default"].object,
  emptyBut: _propTypes2["default"].bool, //清空按钮
  getRefTreeData: _propTypes2["default"].func,
  multiple: _propTypes2["default"].bool, //  默认单选
  treeData: _propTypes2["default"].array, //接收树的数据
  onLoadData: _propTypes2["default"].func
};
var defaultProps = {
  title: '弹窗标题',
  searchable: false, //  是否应用搜索 默认 false,
  multiple: false, //  默认单选
  showLine: false, //  默认单选
  defaultExpandAll: true, // 数默认展开
  checkStrictly: false,
  lazyModal: false,
  emptyBut: false,
  onCancel: noop,
  onSave: noop,
  lang: 'zh_CN',
  nodeDisplay: '{refname}',
  treeData: [],
  onLoadData: function onLoadData() {},
  getRefTreeData: function getRefTreeData() {}
};

var RefTreeBaseUI = function (_Component) {
  _inherits(RefTreeBaseUI, _Component);

  function RefTreeBaseUI(props) {
    _classCallCheck(this, RefTreeBaseUI);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    var _props$matchData = props.matchData,
        matchData = _props$matchData === undefined ? [] : _props$matchData,
        valueField = props.valueField,
        showLoading = props.showLoading;

    _this.state = {
      selectedArray: matchData || [], //  记录保存的选择项
      checkedKeys: matchData.map(function (item) {
        return item[valueField];
      }),
      onSaveCheckItems: [],
      showLoading: showLoading
    };

    _this.treeData = props.treeData;
    _this.inited = false;
    return _this;
  }
  // shouldComponentUpdate(nextProps, nextState){
  // 	return !is(nextState, this.state) || nextProps.showModal !== this.props.showModal;
  // }


  RefTreeBaseUI.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    //let { strictMode,value,valueField,matchData=[] } = nextProps;
    // if( nextProps.showModal && !this.props.showModal ){ //正在打开弹窗
    //   this.initComponent(nextProps);
    // }
    this.initComponent(nextProps);
  };

  //  tree EventHandler
  RefTreeBaseUI.prototype.onCheck = function onCheck(selectedKeys, event) {
    var multiple = this.props.multiple;

    if (!multiple) {
      //单选
      this.setState({
        selectedArray: [event.node.props.attr],
        checkedKeys: [event.node.props.eventKey],
        onSaveCheckItems: [event.node.props.attr]
      });
    } else {
      var valueField = this.props.valueField;

      var allProcessCheckedArray = [].concat(this.state.selectedArray);
      var key = event.node.props.attr[valueField];
      var currentNode = event.node.props.attr;
      if (event.checked) {
        //新增操作
        allProcessCheckedArray.push(currentNode);
      } else {
        //删除操作
        allProcessCheckedArray = allProcessCheckedArray.filter(function (item) {
          return item[valueField] !== key;
        });
      }
      this.setState({
        selectedArray: allProcessCheckedArray,
        checkedKeys: selectedKeys,
        onSaveCheckItems: allProcessCheckedArray
      });
    }
  };

  RefTreeBaseUI.prototype.onDoubleClick = function onDoubleClick(selectedKeys, event) {
    var _this2 = this;

    var item = event.node.props;
    var arr = [_extends({}, item.attr, { refpk: item.eventKey, id: item.eventKey })];
    this.setState({
      selectedArray: arr,
      checkedKeys: [item.eventKey]
    }, function () {
      _this2.onClickBtn('save');
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
    if (multiple) return;
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
    }
  };

  RefTreeBaseUI.prototype.render = function render() {
    var _this3 = this;

    var _props2 = this.props,
        title = _props2.title,
        backdrop = _props2.backdrop,
        className = _props2.className,
        showLoading = _props2.showLoading,
        searchable = _props2.searchable,
        valueField = _props2.valueField,
        checkStrictly = _props2.checkStrictly,
        showLine = _props2.showLine,
        lazyModal = _props2.lazyModal,
        showModal = _props2.showModal,
        lang = _props2.lang,
        defaultExpandAll = _props2.defaultExpandAll,
        _props2$nodeDisplay = _props2.nodeDisplay,
        nodeDisplay = _props2$nodeDisplay === undefined ? "{refname}" : _props2$nodeDisplay,
        buttons = _props2.buttons,
        emptyBut = _props2.emptyBut,
        multiple = _props2.multiple,
        treeData = _props2.treeData,
        _props2$theme = _props2.theme,
        theme = _props2$theme === undefined ? 'ref-red' : _props2$theme;

    this.treeData = treeData;
    var checkedKeys = this.state.checkedKeys;

    if (checkedKeys.length === 0) emptyBut = false; //20190226没有选中数据清空按钮不展示
    return _react2["default"].createElement(
      _beeModal2["default"],
      {
        show: showModal,
        size: 'sm',
        className: theme + ' ' + className + ' ref-core  ref-core-modal ref-tree',
        backdrop: backdrop,
        onHide: function onHide() {
          return _this3.onClickBtn('cancel');
        },
        autoFocus: false
      },
      _react2["default"].createElement(
        _beeModal2["default"].Header,
        { closeButton: true },
        _react2["default"].createElement(
          _beeModal2["default"].Title,
          null,
          ' ',
          title,
          ' '
        )
      ),
      _react2["default"].createElement(
        _beeModal2["default"].Body,
        { ref: function ref(_ref) {
            return _this3.modalRef = _ref;
          } },
        _react2["default"].createElement(_beeLoading2["default"], { container: this.modalRef, show: showLoading }),
        _react2["default"].createElement(_RefCoreSearch2["default"], {
          show: searchable,
          onSearch: this.onSearchClick,
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
          checkable: multiple,
          multiple: multiple,
          onCheck: this.onCheck.bind(this),
          onSelect: this.onSelect.bind(this),
          onDoubleClick: this.onDoubleClick.bind(this),
          checkedKeys: checkedKeys,
          selectedKeys: checkedKeys,
          checkStrictly: checkStrictly,
          showLine: showLine,
          loadData: lazyModal ? this.props.onLoadData : null
        }) : _react2["default"].createElement(_RefCoreError2["default"], { show: !Boolean(this.treeData.length), language: lang })
      ),
      _react2["default"].createElement(
        _beeModal2["default"].Footer,
        { className: 'ref-core-modal-footer' },
        _react2["default"].createElement(_RefCoreButton2["default"], { language: lang, onClickBtn: this.onClickBtn, buttons: buttons, emptyBut: emptyBut })
      )
    );
  };

  return RefTreeBaseUI;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.initComponent = function (props) {
    var _props$matchData2 = props.matchData,
        matchData = _props$matchData2 === undefined ? [] : _props$matchData2,
        value = props.value,
        valueField = props.valueField;

    var valueMap = (0, _utils.refValParse)(value);
    _this4.setState({
      checkedArray: matchData,
      selectedArray: matchData,
      showLoading: false,
      checkedKeys: matchData.map(function (item) {
        return item[valueField];
      })
    });
  };

  this.onSearchClick = function (value) {
    _this4.props.getRefTreeData(value);
  };

  this.onSearchChange = function (value) {
    _this4.props.getRefTreeData(value);
  };

  this.onClickBtn = function (type) {
    var _props3 = _this4.props,
        onCancel = _props3.onCancel,
        onSave = _props3.onSave;

    switch (type) {
      case 'save':
        onSave(_this4.state.selectedArray);
        break;
      case 'cancel':
        _this4.setState({
          selectedArray: [],
          checkedKeys: [],
          onSaveCheckItems: [] //20190124不保存那么选中的数据清空
        }, function () {
          onCancel();
        });
        break;
      case 'clear':
        _this4.setState({
          selectedArray: [],
          checkedKeys: []
        }, function () {});
        break;
      default:
        _this4.setState({ selectedArray: [] }, function () {});
    }
  };
};

RefTreeBaseUI.propTypes = propTypes;
RefTreeBaseUI.defaultProps = defaultProps;
exports["default"] = RefTreeBaseUI;
module.exports = exports["default"];
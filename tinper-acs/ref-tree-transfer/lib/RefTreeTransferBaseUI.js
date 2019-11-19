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

var _beeModal = require('bee-modal');

var _beeModal2 = _interopRequireDefault(_beeModal);

var _beeFormControl = require('bee-form-control');

var _beeFormControl2 = _interopRequireDefault(_beeFormControl);

var _RefCoreButton = require('ref-core/lib/refs/RefCoreButton');

var _RefCoreButton2 = _interopRequireDefault(_RefCoreButton);

var _transferUI = require('./transferUI');

var _transferUI2 = _interopRequireDefault(_transferUI);

var _leftTreeUI = require('./leftTreeUI');

var _leftTreeUI2 = _interopRequireDefault(_leftTreeUI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = (0, _getOwnPropertyNames2["default"])(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = (0, _getOwnPropertyDescriptor2["default"])(defaults, key); if (value && value.configurable && obj[key] === undefined) { (0, _defineProperty2["default"])(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
  showModal: _propTypes2["default"].bool,
  theme: _propTypes2["default"].string,
  classname: _propTypes2["default"].string,
  backdrop: _propTypes2["default"].bool,
  title: _propTypes2["default"].string,
  checkedArray: _propTypes2["default"].array,
  defaultSelectNode: _propTypes2["default"].object,
  onCancel: _propTypes2["default"].func,
  onSave: _propTypes2["default"].func,
  lang: _propTypes2["default"].string,
  handleTreeSelect: _propTypes2["default"].func,
  onChangerightSearch: _propTypes2["default"].func
};
var defaultProps = {
  showModal: false,
  theme: 'ref-red',
  className: '',
  title: '弹窗标题',
  backdrop: true,
  defaultSelectNode: {},
  checkedArray: [],
  onCancel: function onCancel(p) {},
  onSave: function onSave(sels) {},
  destory: function destory(p) {},
  lang: 'zh_CN',
  handleTreeSelect: function handleTreeSelect() {},
  onChangerightSearch: function onChangerightSearch() {}
  //refpk
};
var RefTreeTransferBaseUI = function (_Component) {
  _inherits(RefTreeTransferBaseUI, _Component);

  function RefTreeTransferBaseUI(props) {
    _classCallCheck(this, RefTreeTransferBaseUI);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onSave = function () {
      // 带有input框，这个props.onSave是RefCoreWithInput中的onSave然后在RefCoreWithInput中再调用自定义的传进来的onsave
      // 不带有input框，props.onSave直接调用自定义的传进来的onsave
      var valueField = _this.props.valueField;
      var _this$props = _this.props,
          _this$props$transferD = _this$props.transferData,
          transferData = _this$props$transferD === undefined ? [] : _this$props$transferD,
          _this$props$targetKey = _this$props.targetKeys,
          targetKeys = _this$props$targetKey === undefined ? [] : _this$props$targetKey;

      var needTransferData = [];
      targetKeys.forEach(function (v, i) {
        transferData.forEach(function (v2, i2) {
          if (v == v2[valueField]) {
            needTransferData.push(v2);
          }
        });
      });
      _this.props.onSave(needTransferData);
    };

    _this.onCancel = function () {
      var _this$props2 = _this.props,
          onCancel = _this$props2.onCancel,
          destory = _this$props2.destory;

      onCancel && onCancel();
      destory && destory();
    };

    _this.onClickBtn = function (type) {
      var _this$props3 = _this.props,
          onSave = _this$props3.onSave,
          onCancel = _this$props3.onCancel;

      switch (type) {
        case 'save':
          _this.onSave();
          break;
        case 'cancel':
          _this.onCancel();
          break;
        default:
          _this.setState({ selectedArray: [] }, function () {});
      }
    };

    _this.state = {};
    return _this;
  }

  RefTreeTransferBaseUI.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        _props$title = _props.title,
        title = _props$title === undefined ? '参照默认标题' : _props$title,
        _props$textOption = _props.textOption,
        textOption = _props$textOption === undefined ? { leftTitle: '默认树标题', rightTitle: '默认穿梭框', leftInfo: [], rightInfo: [] } : _props$textOption,
        className = _props.className,
        backdrop = _props.backdrop,
        _props$refModelUrl = _props.refModelUrl,
        refModelUrl = _props$refModelUrl === undefined ? { tableBodyUrlSearch: '' } : _props$refModelUrl,
        displayField = _props.displayField,
        valueField = _props.valueField,
        buttons = _props.buttons,
        showModal = _props.showModal,
        lang = _props.lang,
        _props$theme = _props.theme,
        theme = _props$theme === undefined ? 'ref-red' : _props$theme,
        _props$searchPlacehol = _props.searchPlaceholder,
        searchPlaceholder = _props$searchPlacehol === undefined ? '' : _props$searchPlacehol,
        _props$notFoundConten = _props.notFoundContent,
        notFoundContent = _props$notFoundConten === undefined ? '' : _props$notFoundConten,
        _props$treeData = _props.treeData,
        treeData = _props$treeData === undefined ? [] : _props$treeData,
        onChangerightSearch = _props.onChangerightSearch,
        handleTreeSelect = _props.handleTreeSelect,
        _props$transferData = _props.transferData,
        transferData = _props$transferData === undefined ? [] : _props$transferData,
        setTargetKeys = _props.setTargetKeys,
        targetKeys = _props.targetKeys,
        _props$defaultExpandA = _props.defaultExpandAll,
        defaultExpandAll = _props$defaultExpandA === undefined ? false : _props$defaultExpandA,
        _props$modalProps = _props.modalProps,
        modalProps = _props$modalProps === undefined ? {} : _props$modalProps,
        _props$transferProps = _props.transferProps,
        transferProps = _props$transferProps === undefined ? {} : _props$transferProps;
    var _textOption$leftTitle = textOption.leftTitle,
        leftTitle = _textOption$leftTitle === undefined ? '默认树标题' : _textOption$leftTitle,
        _textOption$rightTitl = textOption.rightTitle,
        rightTitle = _textOption$rightTitl === undefined ? '默认穿梭框' : _textOption$rightTitl;

    return _react2["default"].createElement(
      _beeModal2["default"],
      _extends({
        show: showModal,
        className: ' ' + theme + ' ref-core-modal ' + className + ' ref-core ref-tree-transfer',
        size: 'xlg',
        backdrop: backdrop,
        autoFocus: false
      }, modalProps, {
        onHide: function onHide() {
          _this2.onClickBtn('cancel');
        }
      }),
      _react2["default"].createElement(
        _beeModal2["default"].Header,
        { closeButton: true },
        _react2["default"].createElement(
          _beeModal2["default"].Title,
          null,
          ' ',
          title
        )
      ),
      _react2["default"].createElement(
        _beeModal2["default"].Body,
        null,
        _react2["default"].createElement(
          'div',
          { className: 'ref-tree-transfer-tree' },
          !!leftTitle && _react2["default"].createElement(
            'div',
            { className: 'ref-tree-transfer-tree-title' },
            leftTitle
          ),
          _react2["default"].createElement(_leftTreeUI2["default"], {
            data: treeData,
            valueField: valueField,
            handleTreeSelect: handleTreeSelect,
            lang: lang,
            defaultExpandAll: defaultExpandAll
          })
        ),
        _react2["default"].createElement(
          'div',
          { className: 'ref-tree-transfer-right' },
          !!rightTitle && _react2["default"].createElement(
            'div',
            { className: 'ref-tree-transfer-right-title' },
            rightTitle,
            refModelUrl.tableBodyUrlSearch ? _react2["default"].createElement(
              'div',
              { className: 'ref-tree-transfer-right-search' },
              ' ',
              _react2["default"].createElement(_beeFormControl2["default"], {
                placeholder: '\u641C\u7D22',
                onChange: onChangerightSearch
              })
            ) : null
          ),
          _react2["default"].createElement(_transferUI2["default"], {
            textOption: textOption,
            transferData: transferData,
            targetKeys: targetKeys,
            displayField: displayField,
            valueField: valueField,
            setTargetKeys: setTargetKeys,
            buttons: buttons,
            isHasSearch: refModelUrl.tableBodyUrlSearch,
            searchPlaceholder: searchPlaceholder,
            notFoundContent: notFoundContent,
            transferProps: transferProps
          })
        )
      ),
      _react2["default"].createElement(
        _beeModal2["default"].Footer,
        { className: 'ref-core-modal-footer ' },
        _react2["default"].createElement(_RefCoreButton2["default"], { language: lang, onClickBtn: this.onClickBtn, buttons: buttons, emptyBut: false })
      )
    );
  };

  return RefTreeTransferBaseUI;
}(_react.Component);

RefTreeTransferBaseUI.propTypes = propTypes;
RefTreeTransferBaseUI.defaultProps = defaultProps;
exports["default"] = RefTreeTransferBaseUI;
module.exports = exports['default'];
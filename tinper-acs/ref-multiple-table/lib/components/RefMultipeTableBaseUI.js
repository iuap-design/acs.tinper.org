'use strict';

exports.__esModule = true;

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _RefCoreError = require('ref-core/lib/refs/RefCoreError');

var _RefCoreError2 = _interopRequireDefault(_RefCoreError);

var _RefCoreButton = require('ref-core/lib/refs/RefCoreButton');

var _RefCoreButton2 = _interopRequireDefault(_RefCoreButton);

var _RefCoreTab = require('ref-core/lib/refs/RefCoreTab');

var _RefCoreTab2 = _interopRequireDefault(_RefCoreTab);

var _RefCoreSearch = require('ref-core/lib/refs/RefCoreSearch');

var _RefCoreSearch2 = _interopRequireDefault(_RefCoreSearch);

var _locale = require('ref-core/lib/utils/locale.js');

var _beeCheckbox = require('bee-checkbox');

var _beeCheckbox2 = _interopRequireDefault(_beeCheckbox);

var _beeModal = require('bee-modal');

var _beeModal2 = _interopRequireDefault(_beeModal);

var _beePagination = require('bee-pagination');

var _beePagination2 = _interopRequireDefault(_beePagination);

var _beeTable = require('bee-table');

var _beeTable2 = _interopRequireDefault(_beeTable);

var _multiSelect = require('bee-table/build/lib/multiSelect.js');

var _multiSelect2 = _interopRequireDefault(_multiSelect);

var _beeLoading = require('bee-loading');

var _beeLoading2 = _interopRequireDefault(_beeLoading);

var _RefSearchPanel = require('./RefSearchPanel');

var _RefSearchPanel2 = _interopRequireDefault(_RefSearchPanel);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; }

var RefMultipleTableBase = function (_Component) {
  _inherits(RefMultipleTableBase, _Component);

  //激活页码
  //总页数
  //表头数据
  function RefMultipleTableBase(props) {
    _classCallCheck(this, RefMultipleTableBase);

    var _this2 = _possibleConstructorReturn(this, _Component.call(this, props));

    _this2.columnsData = [];
    _this2.tableData = [];
    _this2.pageCount = 1;
    _this2.pageSize = '10';
    _this2.currPageIndex = 1;
    _this2.fliterFormInputs = [];
    _this2.filterInfo = {};

    _this2.handleBtnSave = function () {
      _this2.props.onSave((0, _assign2["default"])([], _this2.checkedArray));
    };

    _this2.handleBtnCancel = function () {
      _this2.props.onCancel();
    };

    _this2.onClickBtn = function (type) {
      switch (type) {
        case 'save':
          _this2.handleBtnSave();
          break;
        case 'cancel':
          _this2.handleBtnCancel();
          break;
        case 'clear':
          _this2.checkedArray = [];
          _this2.checkedMap = {};
          _this2.setState({
            selectedDataLength: 0,
            mustRender: Math.random()
          });
          break;
      }
    };

    _this2.onSelectTabItem = function (a, state) {
      if (state === 'selecting') {
        // this.pageCount = Math.ceil(this.totalElements / this.pageSize);
        _this2.setState({
          tableIsSelecting: true //展示已选择列表
        });
      } else {
        // this.pageCount = 1;
        _this2.setState({
          tableIsSelecting: false //不展示已选择列表
        });
      }
    };

    _this2.putRowKey = function (record, i) {
      var valueField = _this2.props.valueField;

      return record.key || record[valueField] || 'ref-multiple-table=' + i;
    };

    _this2.renderRowClassName = function (recode) {
      if (_this2.props.multiple) return;
      return recode._checked ? 'ref-multiple-table-row-selected' : '';
    };

    _this2.getSelectedDataFunc = function (checkedArray, recode) {
      if (!_this2.props.multiple) return;
      var _this = _this2;
      var _this2$props$valueFie = _this2.props.valueField,
          valueField = _this2$props$valueFie === undefined ? "refpk" : _this2$props$valueFie;

      if (recode) {
        //单条操作
        if (recode._checked && !_this.checkedMap[recode[valueField]]) {

          _this.checkedArray.push(recode);
          _this.checkedMap[recode[valueField]] = recode;
        } else if (!recode._checked && _this2.checkedMap[recode[valueField]]) {

          delete _this.checkedMap[recode[valueField]];
          _this.checkedArray = [];
          (0, _keys2["default"])(_this.checkedMap).forEach(function (item) {
            _this.checkedArray.push(_this2.checkedMap[item]);
          });
        }
      } else {
        //多条操作
        _this.checkedArray = [];
        var tableIsSelecting = _this2.state.tableIsSelecting;

        if (tableIsSelecting) {
          //选择中...
          if (checkedArray.length > 0) {
            //全选操作 
            //去重操作
            //直接操作当前页数据
            _this.props.tableData.forEach(function (item) {
              if (!_this.checkedMap.hasOwnProperty(item[valueField])) {
                _this.checkedMap[item[valueField]] = item;
              }
            });
          } else {
            //全取消操作
            //去重操作
            //直接操作当前页数据
            _this.props.tableData.forEach(function (item) {
              if (_this.checkedMap.hasOwnProperty(item[valueField])) {
                delete _this.checkedMap[item[valueField]];
              }
            });
          }
          //组装已选数据
          _this.checkedArray = (0, _keys2["default"])(_this.checkedMap).map(function (item) {
            return _this.checkedMap[item];
          });
        } else {
          //查看已选择
          if (checkedArray.length <= 0) {
            //查看时只有取消选择操作，全选操作不会出现这里可考虑取消这个判断
            _this.checkedMap = {};
            _this.checkedArray = [];
          }
        }
      }
      _this.setState({
        selectedDataLength: checkedArray.length,
        mustRender: Math.random()
      });
    };

    _this2.onRowDoubleClick = function (record) {
      if (_this2.props.multiple) return;
      var _this2$props$valueFie2 = _this2.props.valueField,
          valueField = _this2$props$valueFie2 === undefined ? "refpk" : _this2$props$valueFie2;

      record._checked = true;
      _this2.checkedArray = [record];
      _this2.checkedMap = {};
      _this2.checkedMap[record[valueField]] = record;
      _this2.handleBtnSave();
    };

    _this2.onRowClick = function (record) {
      if (_this2.props.multiple) return;
      var _this = _this2;
      var _this$props$valueFiel = _this.props.valueField,
          valueField = _this$props$valueFiel === undefined ? "refpk" : _this$props$valueFiel;

      //点击同一行数据时取消选择

      if (_this.checkedMap.hasOwnProperty(record[valueField])) {
        _this.checkedArray = [];
        _this.checkedMap = {};
        _this.setState({
          mustRender: Math.random()
        });
      } else {
        var checkedRecord = (0, _assign2["default"])({ _checked: true }, record);
        _this.checkedArray = [checkedRecord];
        _this.checkedMap = {};
        _this.checkedMap[checkedRecord[valueField]] = checkedRecord;
        _this.setState({
          mustRender: Math.random()
        });
      }
    };

    _this2.state = {
      selectedDataLength: 0, //checkedArray的长度
      tableIsSelecting: true //tab切换
    };
    _this2.checkedArray = [];
    _this2.checkedMap = {};
    _this2.TableView = props.multiple ? (0, _multiSelect2["default"])(_beeTable2["default"], _beeCheckbox2["default"]) : _beeTable2["default"];
    return _this2;
  } //每页数据数
  //表格数据


  RefMultipleTableBase.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    // let result  = !shallowequal(nextState, this.state);
    // 使用state是因为mustRender不同必须重新渲染，this中的三种data不一致也必须更新
    var dataEqual = nextProps.tableData === this.props.tableData && nextProps.columnsData === this.props.columnsData && nextProps.fliterFormInputs === this.props.fliterFormInputs;
    return !(0, _shallowequal2["default"])(nextProps, this.props) || !(0, _shallowequal2["default"])(nextState, this.state) || !dataEqual || nextProps.showModal !== this.props.showModal;
  };

  RefMultipleTableBase.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this3 = this;

    var strictMode = nextProps.strictMode,
        _nextProps$valueField = nextProps.valueField,
        valueField = _nextProps$valueField === undefined ? "refpk" : _nextProps$valueField,
        _nextProps$matchData = nextProps.matchData,
        matchData = _nextProps$matchData === undefined ? [] : _nextProps$matchData,
        value = nextProps.value;
    //严格模式下每次打开必须重置数据

    if (nextProps.showModal && !this.props.showModal || !(0, _shallowequal2["default"])(nextProps.matchData, this.props.matchData)) {
      //正在打开弹窗
      // if( strictMode || !this.columnsData.length || this.currPageIndex !== 1 ) {
      // 	//开启严格模式 或 表头信息没有获取到，即初始化失败是必须重置
      // 	this.initComponent();
      // }
      //这里改用matchData，第一次运行也不在value中取值了，一切向matchData看齐
      this.checkedArray = (0, _assign2["default"])([], nextProps.matchData || []);
      this.checkedMap = {};
      this.checkedArray.forEach(function (item) {
        _this3.checkedMap[item[valueField]] = item;
      });
      //内部缓存已选择值，缓存成 Map 便于检索
      this.setState({
        selectedDataLength: this.checkedArray.length,
        tableIsSelecting: true
      });
    }
  };
  /**start:按钮操作 */

  /**end:按钮操作 */

  /** start:表格操作 */
  /**
  * 为数据增加 key
  * @record {object} 该行数据
  */

  /**
  * 为选中行增加背景色，只在单选状态生效
  * @record {object} 该行数据
  */

  /**
  * 多选状态下表格只能通过选择 checkbox 来选值，同时触发改方法
  * @function
  * @param checkedArray  已勾选值，表格中自动去除未勾选值
  * @param recode  当前操作的行数据
  */

  /**
   * 双击行选择该行数据，只在单选状态生效
   * @record {object} 该行数据
   */

  /**
   * 单击行选择该行数据，只在单选状态生效
   * @record {object} 该行数据
   */


  /** end:表格操作*/
  RefMultipleTableBase.prototype.render = function render() {
    var _this4 = this;

    var _this = this;
    var _props = this.props,
        className = _props.className,
        _props$miniSearch = _props.miniSearch,
        miniSearch = _props$miniSearch === undefined ? true : _props$miniSearch,
        _props$title = _props.title,
        title = _props$title === undefined ? '' : _props$title,
        backdrop = _props.backdrop,
        _props$size = _props.size,
        size = _props$size === undefined ? 'lg' : _props$size,
        showModal = _props.showModal,
        _props$lang = _props.lang,
        lang = _props$lang === undefined ? 'zh_CN' : _props$lang,
        _props$valueField = _props.valueField,
        valueField = _props$valueField === undefined ? 'refpk' : _props$valueField,
        _props$emptyBut = _props.emptyBut,
        emptyBut = _props$emptyBut === undefined ? false : _props$emptyBut,
        buttons = _props.buttons,
        _props$fliterFormInpu = _props.fliterFormInputs,
        fliterFormInputs = _props$fliterFormInpu === undefined ? [] : _props$fliterFormInpu,
        showLoading = _props.showLoading,
        tableData = _props.tableData,
        pageCount = _props.pageCount,
        currPageIndex = _props.currPageIndex,
        columnsData = _props.columnsData,
        totalElements = _props.totalElements,
        _props$theme = _props.theme,
        theme = _props$theme === undefined ? 'ref-red' : _props$theme,
        searchPanelLocale = _props.searchPanelLocale,
        _props$mustPagination = _props.mustPaginationShow,
        mustPaginationShow = _props$mustPagination === undefined ? false : _props$mustPagination,
        _props$tableProps = _props.tableProps,
        tableProps = _props$tableProps === undefined ? {} : _props$tableProps,
        _props$modalProps = _props.modalProps,
        modalProps = _props$modalProps === undefined ? {} : _props$modalProps,
        _props$searchPlacehol = _props.searchPlaceholder,
        searchPlaceholder = _props$searchPlacehol === undefined ? '搜索' : _props$searchPlacehol,
        _props$paginationProp = _props.paginationProps,
        paginationProps = _props$paginationProp === undefined ? {} : _props$paginationProp,
        footerBtnDom = _props.footerBtnDom;

    var temp = (0, _stringify2["default"])(tableData);
    var _newTableData = JSON.parse(temp);
    var checkedArray = this.checkedArray,
        checkedMap = this.checkedMap;
    var _state = this.state,
        selectedDataLength = _state.selectedDataLength,
        tableIsSelecting = _state.tableIsSelecting;

    var _tableData = _newTableData.map(function (item) {
      item._checked = checkedMap.hasOwnProperty(item[valueField]);
      return item;
    });
    checkedArray.forEach(function (item) {
      item._checked = true;
    });
    if (checkedArray.length === 0) {
      emptyBut = false;
    }
    return _react2["default"].createElement(
      _beeModal2["default"],
      _extends({
        show: showModal,
        className: ' ' + theme + ' ' + className + ' ref-core ref-multiple-table ref-core-modal',
        backdrop: backdrop,
        size: size,
        onHide: this.handleBtnCancel,
        autoFocus: false,
        enforceFocus: false
      }, modalProps),
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
        { ref: function ref(_ref) {
            return _this4.modalRef = _ref;
          } },
        _react2["default"].createElement(_beeLoading2["default"], { container: this.modalRef, show: showLoading }),

        //按字段查询
        fliterFormInputs.length !== 0 && !miniSearch ? _react2["default"].createElement(
          _RefSearchPanel2["default"],
          {
            show: tableIsSelecting,
            onSearch: this.props.searchFilterInfo,
            searchPanelLocale: searchPanelLocale
          },
          fliterFormInputs.map(function (item) {
            return item;
          })
        ) : '',
        _react2["default"].createElement(
          _RefCoreTab2["default"],
          {
            className: 'ref-multiple-table-tab',
            selectedData: checkedArray,
            selectedDataLength: selectedDataLength,
            selecteing: tableIsSelecting,
            language: lang,
            onSelectTabItem: _this.onSelectTabItem
          },
          _react2["default"].createElement(_RefCoreSearch2["default"], {
            className: '' + (miniSearch && tableIsSelecting ? '' : 'ref-multiple-table-tab-search-hide'),
            onSearch: _this.props.onSearchClick,
            onChange: _this.props.miniSearchFunc,
            language: lang,
            placeholder: searchPlaceholder
          })
        ),
        columnsData && columnsData.length ? _react2["default"].createElement(_this.TableView, _extends({
          bordered: true,
          // scroll: { x: false, y: true },
          columns: columnsData,
          rowClassName: _this.renderRowClassName,
          data: tableIsSelecting ? _tableData : checkedArray,
          getSelectedDataFunc: _this.getSelectedDataFunc,
          onRowDoubleClick: _this.onRowDoubleClick,
          onRowClick: _this.onRowClick,
          rowKey: _this.putRowKey
        }, tableProps)) : _react2["default"].createElement(_RefCoreError2["default"], { show: !Boolean(_tableData.length), language: lang }),
        tableIsSelecting && _react2["default"].createElement(_beePagination2["default"], _extends({
          first: true,
          last: true,
          prev: true,
          next: true,
          showJump: true,
          boundaryLinks: true,
          className: pageCount > 1 || mustPaginationShow ? '' : 'ref-multiple-table-pagination-hide',
          items: pageCount,
          maxButtons: 5,
          total: totalElements,
          activePage: currPageIndex,
          onDataNumSelect: _this.props.dataNumSelect,
          onSelect: _this.props.handlePagination,
          locale: (0, _locale.paginationLocale)(lang)
        }, paginationProps))
      ),
      _react2["default"].createElement(
        _beeModal2["default"].Footer,
        { className: 'ref-core-modal-footer ' },
        _react2["default"].createElement(_RefCoreButton2["default"], {
          language: lang,
          buttons: buttons,
          emptyBut: emptyBut,
          onClickBtn: _this.onClickBtn,
          footerBtnDom: footerBtnDom
        })
      )
    );
  };

  return RefMultipleTableBase;
}(_react.Component);

exports["default"] = RefMultipleTableBase;
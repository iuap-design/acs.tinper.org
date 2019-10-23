'use strict';

exports.__esModule = true;

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;
// import './RefMultipleTableBase.less'


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _RefCoreError = require('ref-core/lib/refs/RefCoreError');

var _RefCoreError2 = _interopRequireDefault(_RefCoreError);

var _RefCoreTab = require('ref-core/lib/refs/RefCoreTab');

var _RefCoreTab2 = _interopRequireDefault(_RefCoreTab);

var _RefCoreSearch = require('ref-core/lib/refs/RefCoreSearch');

var _RefCoreSearch2 = _interopRequireDefault(_RefCoreSearch);

var _locale = require('ref-core/lib/utils/locale.js');

var _beeLoading = require('bee-loading');

var _beeLoading2 = _interopRequireDefault(_beeLoading);

var _beePagination = require('bee-pagination');

var _beePagination2 = _interopRequireDefault(_beePagination);

var _beeCheckbox = require('bee-checkbox');

var _beeCheckbox2 = _interopRequireDefault(_beeCheckbox);

var _beeTable = require('bee-table');

var _beeTable2 = _interopRequireDefault(_beeTable);

var _multiSelect = require('bee-table/build/lib/multiSelect.js');

var _multiSelect2 = _interopRequireDefault(_multiSelect);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; }

// const MultiSelectTable = multiSelect(Table, Checkbox);
var noop = function noop() {};
var propTypes = {
	loadTableData: _propTypes2["default"].func, //分页下拉或者跳转的回调
	onTableSearch: _propTypes2["default"].func,
	columnsData: _propTypes2["default"].array,
	tableData: _propTypes2["default"].array
};
var defaultProps = {
	loadTableData: noop,
	onTableSearch: noop,
	columnsData: [],
	tableData: []
};
var RefMultipleTableBaseUI = (_temp = _class = function (_Component) {
	_inherits(RefMultipleTableBaseUI, _Component);

	//每页数据数
	//表格数据
	function RefMultipleTableBaseUI(props) {
		_classCallCheck(this, RefMultipleTableBaseUI);

		var _this2 = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this2);

		_this2.state = {
			tableIsSelecting: true,
			selectedDataLength: props.matchData.length
		};
		_this2.filterInfo = '';
		_this2.checkedArray = [];
		_this2.checkedMap = {};
		_this2.TableView = props.multiple ? (0, _multiSelect2["default"])(_beeTable2["default"], _beeCheckbox2["default"]) : _beeTable2["default"];
		_this2.initMatchData = false;
		//每次打开参照会走此处的逻辑
		if (props.showModal) {
			var _props$matchData = props.matchData,
			    matchData = _props$matchData === undefined ? [] : _props$matchData,
			    _props$valueField = props.valueField,
			    valueField = _props$valueField === undefined ? 'refpk' : _props$valueField;

			_this2.checkedMap = {};
			_this2.checkedArray = matchData.map(function (item) {
				item.key = item[valueField];
				item._checked = true;
				_this2.checkedMap[item.key] = item;
				return item;
			});
			props.onChange(_this2.checkedArray);
		}

		return _this2;
	} //激活页码
	//总页数
	//表头数据


	RefMultipleTableBaseUI.prototype.componentDidMount = function componentDidMount() {
		if (this.props.showModal) this.initComponent(this.props);
	};

	RefMultipleTableBaseUI.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		if (nextProps.showModal) {
			this.initComponent(nextProps);
		}
	};
	/**
  * 跳转到制定页数的操作
  * @param {number} index 跳转页数
  */

	/**
  * 选择每页数据个数
  * 
  * 没有启用
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

	/**
  * 为选中行增加背景色，只在单选状态生效
  * @record {object} 该行数据
  */

	/**
  * 为数据增加 key
  * @record {object} 该行数据
  */


	RefMultipleTableBaseUI.prototype.render = function render() {
		var _this = this;
		var _state = this.state,
		    tableIsSelecting = _state.tableIsSelecting,
		    selectedDataLength = _state.selectedDataLength;
		var _props = this.props,
		    className = _props.className,
		    _props$lang = _props.lang,
		    lang = _props$lang === undefined ? 'zh_CN' : _props$lang,
		    valueField = _props.valueField,
		    showLoading = _props.showLoading,
		    tableProps = _props.tableProps,
		    mustPaginationShow = _props.mustPaginationShow;
		var tableData = _this.tableData,
		    pageCount = _this.pageCount,
		    currPageIndex = _this.currPageIndex,
		    columnsData = _this.columnsData,
		    totalElements = _this.totalElements,
		    checkedArray = _this.checkedArray;

		var _tableData = tableData.map(function (item) {
			item._checked = _this.checkedMap.hasOwnProperty(item[valueField]);
			return item;
		});
		checkedArray.forEach(function (item) {
			item._checked = true;
		});
		return _react2["default"].createElement(
			'div',
			{ className: className + ' ref-core ref-tree-table-base' },
			_react2["default"].createElement(
				_RefCoreTab2["default"],
				{
					className: 'ref-tree-table-base-tab',
					selectedData: _this.checkedArray,
					onSelectTabItem: _this.onSelectTabItem,
					selectedDataLength: selectedDataLength,
					selecteing: tableIsSelecting,
					language: lang
				},
				_react2["default"].createElement(_RefCoreSearch2["default"], {
					onSearch: _this.miniSearchFunc,
					onChange: _this.miniSearchFunc,
					language: lang
				})
			),
			columnsData && columnsData.length ? _react2["default"].createElement(_this.TableView, _extends({
				bordered: true,
				rowKey: this.putRowKey,
				columns: columnsData,
				getSelectedDataFunc: this.getSelectedDataFunc,
				rowClassName: this.renderRowClassName,
				data: tableIsSelecting ? _tableData : _this.checkedArray,
				onRowDoubleClick: this.onRowDoubleClick,
				onRowClick: this.onRowClick,
				scroll: { x: false, y: true }
			}, tableProps)) : _react2["default"].createElement(_RefCoreError2["default"], { show: !Boolean(tableData.length), language: lang }),
			_react2["default"].createElement(
				'div',
				{ className: 'ref-tree-table-base-pagination' },
				_react2["default"].createElement(_beePagination2["default"], {
					first: true,
					last: true,
					prev: true,
					next: true,
					showJump: false,
					boundaryLinks: true,
					className: pageCount > 1 && tableIsSelecting || tableIsSelecting && mustPaginationShow ? '' : 'ref-tree-table-base-pagination-hide',
					items: pageCount,
					maxButtons: 3,
					total: totalElements,
					activePage: currPageIndex,
					onDataNumSelect: this.dataNumSelect,
					onSelect: this.handlePagination,
					locale: (0, _locale.paginationLocale)(lang)
				})
			)
		);
	};

	return RefMultipleTableBaseUI;
}(_react.Component), _initialiseProps = function _initialiseProps() {
	var _this3 = this;

	this.columnsData = [];
	this.tableData = [];
	this.pageCount = 1;
	this.pageSize = '10';
	this.currPageIndex = 1;
	this.filterInfo = '';

	this.initComponent = function (props) {
		//内部缓存已选择值，不通过 state 缓存，表格缓存状态自动实现
		var columnsData = props.columnsData,
		    tableData = props.tableData,
		    page = props.page,
		    valueField = props.valueField,
		    _props$matchData2 = props.matchData,
		    matchData = _props$matchData2 === undefined ? [] : _props$matchData2,
		    value = props.value;

		_this3.columnsData = columnsData;
		_this3.tableData = tableData;
		_this3.pageCount = page.pageCount || 0;
		_this3.currPageIndex = page.currPageIndex + 1 || 0;
		_this3.totalElements = page.totalElements || 0;
		_this3.setState({
			mustRender: Math.random()
		});
	};

	this.onChange = function (checkedArray) {
		var onChange = _this3.props.onChange;

		onChange(checkedArray);
	};

	this.handlePagination = function (index) {
		var filterInfo = _this3.filterInfo;


		var param = {
			'refClientPageInfo.currPageIndex': index - 1,
			'refClientPageInfo.pageSize': _this3.pageSize,
			content: filterInfo
		};
		_this3.props.loadTableData(param);
	};

	this.dataNumSelect = function (index, pageSize) {
		var filterInfo = _this3.filterInfo;

		(0, _keys2["default"])(filterInfo).forEach(function (key) {
			if (!filterInfo[key]) {
				delete filterInfo[key];
			}
		});

		var param = {
			condition: _this3.props.condition,
			'refClientPageInfo.currPageIndex': index,
			'refClientPageInfo.pageSize': pageSize
		};
		if ((0, _keys2["default"])(filterInfo) > 0) {
			param.content = (0, _stringify2["default"])(filterInfo);
		}
		_this3.pageSize = pageSize;
		_this3.props.loadTableData(param);
	};

	this.miniSearchFunc = function (value) {
		_this3.filterInfo = value;
		_this3.props.onTableSearch(value);
	};

	this.getSelectedDataFunc = function (checkedArray, recode) {
		if (!_this3.props.multiple) return;
		var _this = _this3;
		var _props$valueField2 = _this3.props.valueField,
		    valueField = _props$valueField2 === undefined ? "refpk" : _props$valueField2;

		if (recode) {
			//单条操作
			if (recode._checked && !_this.checkedMap[recode[valueField]]) {
				_this.checkedArray.push(recode);
				_this.checkedMap[recode[valueField]] = recode;
			} else if (!recode._checked && _this3.checkedMap[recode[valueField]]) {

				delete _this.checkedMap[recode[valueField]];
				_this.checkedArray = [];
				(0, _keys2["default"])(_this.checkedMap).forEach(function (item) {
					_this.checkedArray.push(_this3.checkedMap[item]);
				});
			}
		} else {
			//多条操作
			_this.checkedArray = [];
			var tableIsSelecting = _this3.state.tableIsSelecting;

			if (tableIsSelecting) {
				//选择中...
				if (checkedArray.length > 0) {
					//全选操作 
					//去重操作
					//直接操作当前页数据
					_this.tableData.forEach(function (item) {
						if (!_this.checkedMap.hasOwnProperty(item[valueField])) {
							_this.checkedMap[item[valueField]] = item;
						}
					});
				} else {
					//全取消操作
					//去重操作
					//直接操作当前页数据
					_this.tableData.forEach(function (item) {
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
		_this3.onChange(_this3.checkedArray);
	};

	this.onRowDoubleClick = function (record) {
		if (_this3.props.multiple) return;
		var _props2 = _this3.props,
		    _props2$valueField = _props2.valueField,
		    valueField = _props2$valueField === undefined ? "refpk" : _props2$valueField,
		    onSave = _props2.onSave;

		record._checked = true;
		_this3.checkedArray = [record];
		_this3.checkedMap = {};
		_this3.checkedMap[record[valueField]] = record;
		_this3.setState({
			checkedArray: _this3.checkedArray
		});
		_this3.onChange(_this3.checkedArray);
		onSave && onSave(_this3.checkedArray);
	};

	this.onRowClick = function (record) {
		if (_this3.props.multiple) return;
		var _this = _this3;
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
		_this3.onChange(_this3.checkedArray);
	};

	this.renderRowClassName = function (recode) {
		if (_this3.props.multiple) return;
		return recode._checked ? 'ref-multiple-table-row-selected' : '';
	};

	this.putRowKey = function (record, i) {
		var valueField = _this3.props.valueField;

		return record.key || record[valueField] || 'ref-tree-table=' + i;
	};

	this.onSelectTabItem = function (a, state) {
		if (state === 'selecting') {
			_this3.pageCount = Math.ceil(_this3.totalElements / _this3.pageSize);
			_this3.setState({
				tableIsSelecting: true
			});
		} else {
			_this3.pageCount = 1;
			_this3.setState({
				tableIsSelecting: false
			});
		}
	};
}, _temp);

RefMultipleTableBaseUI.propTypes = propTypes;
RefMultipleTableBaseUI.defaultProps = defaultProps;
exports["default"] = RefMultipleTableBaseUI;
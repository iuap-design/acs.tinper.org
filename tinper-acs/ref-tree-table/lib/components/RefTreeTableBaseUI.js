'use strict';

exports.__esModule = true;

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tinperBee = require('tinper-bee');

var _beeLoading = require('bee-loading');

var _beeLoading2 = _interopRequireDefault(_beeLoading);

var _RefCoreButton = require('ref-core/lib/refs/RefCoreButton.js');

var _RefCoreButton2 = _interopRequireDefault(_RefCoreButton);

var _RefMultipleTableBaseUI = require('./RefMultipleTableBaseUI');

var _RefMultipleTableBaseUI2 = _interopRequireDefault(_RefMultipleTableBaseUI);

var _RefTreeBaseUI = require('./RefTreeBaseUI');

var _RefTreeBaseUI2 = _interopRequireDefault(_RefTreeBaseUI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
	title: _propTypes2["default"].string,
	searchable: _propTypes2["default"].bool,
	// emptyBut: PropTypes.bool,
	param: _propTypes2["default"].object,
	checkedArray: _propTypes2["default"].array,
	onCancel: _propTypes2["default"].func,
	onSave: _propTypes2["default"].func,
	lang: _propTypes2["default"].string,
	menuTitle: _propTypes2["default"].string,
	tableTitle: _propTypes2["default"].string,
	valueField: _propTypes2["default"].string,
	className: _propTypes2["default"].string,
	backdrop: _propTypes2["default"].bool,
	showLine: _propTypes2["default"].bool,
	multiple: _propTypes2["default"].bool,
	destory: _propTypes2["default"].func
};
var defaultProps = {
	title: '弹窗标题',
	searchable: true,
	// emptyBut: false,
	param: {//url请求参数
	},
	checkedArray: [],
	onCancel: function onCancel(p) {},
	onSave: function onSave(sels) {},
	lang: 'zh_CN',
	menuTitle: '',
	tableTitle: '',
	valueField: 'refpk',
	classNam: '',
	backdrop: true,
	showLine: false,
	multiple: false,

	destory: function destory() {}
};

var RefTreeTableBaseUI = function (_Component) {
	_inherits(RefTreeTableBaseUI, _Component);

	function RefTreeTableBaseUI(props) {
		_classCallCheck(this, RefTreeTableBaseUI);

		var _this2 = _possibleConstructorReturn(this, _Component.call(this, props));

		_this2.onSelectChange = function (record) {
			_this2.checkedArray = record;
		};

		_this2.onClickBtn = function (type) {
			var _this2$props = _this2.props,
			    onCancel = _this2$props.onCancel,
			    onSave = _this2$props.onSave;

			switch (type) {
				case 'save':
					onSave(_this2.checkedArray);
					break;
				case 'cancel':
					onCancel();
					break;
				case 'clear':
					_this2.checkedArray = [];
					_this2.setState({
						reander: Math.random()
					});
					break;
				default:
			}
		};

		_this2.handleBtnCancel = function () {
			_this2.props.onCancel();
		};

		_this2.state = {
			//  condition: '',
			// showLoading: true
		};
		_this2.checkedArray = props.checkedArray || [];
		return _this2;
	}

	RefTreeTableBaseUI.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		if (nextProps.showModal && !this.props.showModal) {
			//按钮点击取消操作
			this.checkedArray = (0, _assign2["default"])([], nextProps.matchData || []);
		}
	};
	//table的所有点击


	RefTreeTableBaseUI.prototype.render = function render() {
		var _this3 = this;

		var _this = this;
		var _props = this.props,
		    className = _props.className,
		    showModal = _props.showModal,
		    searchable = _props.searchable,
		    backdrop = _props.backdrop,
		    title = _props.title,
		    showLine = _props.showLine,
		    multiple = _props.multiple,
		    menuTitle = _props.menuTitle,
		    tableTitle = _props.tableTitle,
		    valueField = _props.valueField,
		    value = _props.value,
		    lang = _props.lang,
		    buttons = _props.buttons,
		    checkStrictly = _props.checkStrictly,
		    defaultExpandAll = _props.defaultExpandAll,
		    nodeDisplay = _props.nodeDisplay;
		var _props2 = this.props,
		    showLoading = _props2.showLoading,
		    treeData = _props2.treeData,
		    onTreeChange = _props2.onTreeChange,
		    onTreeSearch = _props2.onTreeSearch,
		    matchData = _props2.matchData;
		var _props3 = this.props,
		    columnsData = _props3.columnsData,
		    tableData = _props3.tableData,
		    page = _props3.page,
		    loadTableData = _props3.loadTableData,
		    onTableSearch = _props3.onTableSearch,
		    condition = _props3.condition,
		    _props3$theme = _props3.theme,
		    theme = _props3$theme === undefined ? "ref-red" : _props3$theme;

		var treeProps = (0, _assign2["default"])({}, {
			className: className,
			searchable: searchable,
			showLine: showLine,
			multiple: multiple,
			lang: lang,
			checkStrictly: checkStrictly,
			valueField: valueField,
			showLoading: showLoading,
			nodeDisplay: nodeDisplay,
			defaultExpandAll: defaultExpandAll,
			treeData: treeData,
			onTreeChange: onTreeChange,
			onTreeSearch: onTreeSearch
		});
		var tableProps = (0, _assign2["default"])({}, {
			className: className,
			lang: lang,
			valueField: valueField,
			showLoading: showLoading,
			multiple: multiple,
			showModal: showModal, //就是为了update，不对外
			condition: condition,
			columnsData: columnsData,
			tableData: tableData,
			page: page,
			loadTableData: loadTableData,
			onTableSearch: onTableSearch,
			matchData: matchData,
			value: value
		});
		return _react2["default"].createElement(
			_tinperBee.Modal,
			{
				show: showModal, className: theme + '  ' + className + ' ref-core ref-core-modal ref-tree-table',
				backdrop: backdrop,
				size: 'xlg',
				onHide: this.handleBtnCancel,
				autoFocus: false
			},
			_react2["default"].createElement(
				_tinperBee.Modal.Header,
				{ closeButton: true },
				_react2["default"].createElement(
					_tinperBee.Modal.Title,
					null,
					title
				)
			),
			_react2["default"].createElement(
				_tinperBee.Modal.Body,
				{ ref: function ref(_ref) {
						return _this3.modalRef = _ref;
					} },
				_react2["default"].createElement(_beeLoading2["default"], { container: this.modalRef, show: showLoading }),
				_react2["default"].createElement(
					'div',
					{ className: 'ref-tree-table-layout' },
					_react2["default"].createElement(
						'div',
						{ className: 'ref-tree-table-layout-col' },
						menuTitle && _react2["default"].createElement(
							'div',
							{ className: 'ref-tree-table-layout-col-title' },
							menuTitle
						),
						_react2["default"].createElement(_RefTreeBaseUI2["default"], _extends({
							onTreeChange: onTreeChange
						}, treeProps))
					),
					_react2["default"].createElement(
						'div',
						{ className: 'ref-tree-table-layout-col' },
						tableTitle && _react2["default"].createElement(
							'div',
							{ className: 'ref-tree-table-layout-col-title' },
							tableTitle || ''
						),
						_react2["default"].createElement(_RefMultipleTableBaseUI2["default"], _extends({}, tableProps, {
							checkedArray: _this.checkedArray,
							onChange: _this.onSelectChange
						}))
					)
				)
			),
			_react2["default"].createElement(
				_tinperBee.Modal.Footer,
				{ className: 'ref-core-modal-footer ' },
				_react2["default"].createElement(_RefCoreButton2["default"], {
					language: lang,
					onClickBtn: _this.onClickBtn,
					buttons: buttons,
					emptyBut: false
				})
			)
		);
	};

	return RefTreeTableBaseUI;
}(_react.Component);

RefTreeTableBaseUI.propTypes = propTypes;
RefTreeTableBaseUI.defaultProps = defaultProps;
exports["default"] = RefTreeTableBaseUI;
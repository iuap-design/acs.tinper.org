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

var _iterator = require('babel-runtime/core-js/symbol/iterator');

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof _symbol2["default"] === "function" && typeof _iterator2["default"] === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2["default"] === "function" && obj.constructor === _symbol2["default"] && obj !== _symbol2["default"].prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _beeTransfer = require('bee-transfer');

var _beeTransfer2 = _interopRequireDefault(_beeTransfer);

var _beeIcon = require('bee-icon');

var _beeIcon2 = _interopRequireDefault(_beeIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = (0, _getOwnPropertyNames2["default"])(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = (0, _getOwnPropertyDescriptor2["default"])(defaults, key); if (value && value.configurable && obj[key] === undefined) { (0, _defineProperty2["default"])(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : _defaults(subClass, superClass); }

var TransferDiv = function (_Component) {
	_inherits(TransferDiv, _Component);

	function TransferDiv(props) {
		_classCallCheck(this, TransferDiv);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.filterOption = function (inputValue, option) {
			return option.title.indexOf(inputValue) > -1;
		};

		_this.handleChange = function (targetKeys) {
			_this.setState({ targetKeys: targetKeys });
			_this.props.setTargetKeys(targetKeys);
		};

		_this.state = {
			transferData: [], //全部
			targetKeys: props.targetKeys, //右边框
			selectedKeys: [], //标记选中
			sourceDesc: {}, //记录左边信息
			targetDesc: {}, //记录右边信息
			buttons: _this.props.buttons
		};
		_this.allTransferSave = _this.allTransferSave.bind(_this);
		_this.allTransferCancel = _this.allTransferCancel.bind(_this);
		_this.TransferSelectUp = _this.TransferSelectUp.bind(_this);
		_this.TransferSelectDown = _this.TransferSelectDown.bind(_this);
		_this.downTransferSelectDown = _this.downTransferSelectDown.bind(_this);
		_this.upTransferSelectUp = _this.upTransferSelectUp.bind(_this);
		return _this;
	}

	TransferDiv.prototype.componentDidMount = function componentDidMount() {
		var _props = this.props,
		    transferData = _props.transferData,
		    targetKeys = _props.targetKeys;

		this.setState({ transferData: transferData, targetKeys: targetKeys });
	};

	TransferDiv.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var transferData = nextProps.transferData,
		    targetKeys = nextProps.targetKeys;

		this.setState({ transferData: transferData, targetKeys: targetKeys });
	};

	TransferDiv.prototype.allTransferSave = function allTransferSave() {
		var transferData = this.state.transferData;

		var tempKey = transferData.map(function (v) {
			return v.key;
		});
		this.setState({
			targetKeys: tempKey
		});
		this.props.setTargetKeys(tempKey);
	};

	TransferDiv.prototype.allTransferCancel = function allTransferCancel() {
		this.setState({
			targetKeys: []
		});
		this.props.setTargetKeys([]);
	};

	TransferDiv.prototype.TransferSelectUp = function TransferSelectUp() {
		var _state = this.state,
		    targetKeys = _state.targetKeys,
		    selectedKeys = _state.selectedKeys;

		var selectedTargetKeys = [];
		targetKeys.forEach(function (v, i) {
			selectedKeys.forEach(function (v2, i2) {
				if (v2 == v) {
					selectedTargetKeys.push({ key: v, index: i });
				}
			});
		});
		if (selectedTargetKeys.length == 1) {
			this.scopeupRecord(targetKeys, selectedTargetKeys[0].index);
			this.setState({
				targetKeys: targetKeys
			});
		}
	};

	TransferDiv.prototype.upTransferSelectUp = function upTransferSelectUp() {
		var _state2 = this.state,
		    targetKeys = _state2.targetKeys,
		    selectedKeys = _state2.selectedKeys;

		var selectedTargetKeys = [];
		targetKeys.forEach(function (v, i) {
			selectedKeys.forEach(function (v2, i2) {
				if (v2 == v) {
					selectedTargetKeys.push({ key: v, index: i });
				}
			});
		});
		// console.log(targetKeys, selectedKeys, selectedTargetKeys)
		if (selectedTargetKeys.length == 1) {
			this.scopeupupRecord(targetKeys, selectedTargetKeys[0].index);
			this.setState({
				targetKeys: targetKeys
			});
		}
	};

	TransferDiv.prototype.swapItems = function swapItems(arr, index1, index2) {
		arr[index1] = arr.splice(index2, 1, arr[index1])[0];
		return arr;
	};

	TransferDiv.prototype.scopeupRecord = function scopeupRecord(arr, $index) {
		if ($index == 0) {
			return;
		}
		this.swapItems(arr, $index, $index - 1);
	};

	// 下移
	TransferDiv.prototype.scopedownRecord = function scopedownRecord(arr, $index) {
		if ($index == arr.length - 1) {
			return;
		}
		this.swapItems(arr, $index, $index + 1);
	};

	TransferDiv.prototype.scopedowndownRecord = function scopedowndownRecord(arr, $index) {
		if ($index == arr.length - 1) {
			return;
		}
		this.swapItems(arr, $index, arr.length - 1);
	};

	TransferDiv.prototype.scopeupupRecord = function scopeupupRecord(arr, $index) {
		if ($index == 0) {
			return;
		}
		this.swapItems(arr, $index, 0);
	};

	TransferDiv.prototype.TransferSelectDown = function TransferSelectDown() {
		var _state3 = this.state,
		    targetKeys = _state3.targetKeys,
		    selectedKeys = _state3.selectedKeys;

		var selectedTargetKeys = [];
		targetKeys.forEach(function (v, i) {
			selectedKeys.forEach(function (v2, i2) {
				if (v2 == v) {
					selectedTargetKeys.push({ key: v, index: i });
				}
			});
		});
		// console.log(targetKeys, selectedKeys, selectedTargetKeys)
		if (selectedTargetKeys.length == 1) {
			this.scopedownRecord(targetKeys, selectedTargetKeys[0].index);
			this.setState({
				targetKeys: targetKeys
			});
		}
	};

	TransferDiv.prototype.downTransferSelectDown = function downTransferSelectDown() {
		var _state4 = this.state,
		    targetKeys = _state4.targetKeys,
		    selectedKeys = _state4.selectedKeys;

		var selectedTargetKeys = [];
		targetKeys.forEach(function (v, i) {
			selectedKeys.forEach(function (v2, i2) {
				if (v2 == v) {
					selectedTargetKeys.push({ key: v, index: i });
				}
			});
		});
		// console.log(targetKeys, selectedKeys, selectedTargetKeys)
		if (selectedTargetKeys.length == 1) {
			this.scopedowndownRecord(targetKeys, selectedTargetKeys[0].index);
			this.setState({
				targetKeys: targetKeys
			});
		}
	};

	TransferDiv.prototype.onSelectChange = function onSelectChange(sourceSelectedKeys, targetSelectedKeys) {
		var valueField = this.props.valueField;

		var tempSourceKey = '',
		    tempTargetKey = '';
		if (sourceSelectedKeys.length > 0) {
			var tempSourceKey = sourceSelectedKeys[sourceSelectedKeys.length - 1];
		}
		if (targetSelectedKeys.length > 0) {
			var tempTargetKey = targetSelectedKeys[targetSelectedKeys.length - 1];
		}
		var transferData = this.state.transferData;

		var sourceDesc = transferData.filter(function (v, k) {
			return v[valueField] === tempSourceKey;
		});
		var targetDesc = transferData.filter(function (v, k) {
			return v[valueField] === tempTargetKey;
		});
		this.setState({
			sourceDesc: sourceDesc[0] || {},
			targetDesc: targetDesc[0] || {},
			selectedKeys: sourceSelectedKeys.concat(targetSelectedKeys)
		});
	};

	TransferDiv.prototype.render = function render() {
		var noDataDisplay = _react2["default"].createElement(
			'div',
			null,
			'\u65E0\u6570\u636E'
		);
		var _state5 = this.state,
		    transferData = _state5.transferData,
		    sourceDesc = _state5.sourceDesc,
		    targetDesc = _state5.targetDesc,
		    selectedKeys = _state5.selectedKeys,
		    targetKeys = _state5.targetKeys;
		var _props2 = this.props,
		    displayField = _props2.displayField,
		    valueField = _props2.valueField,
		    isHasSearch = _props2.isHasSearch,
		    _props2$searchPlaceho = _props2.searchPlaceholder,
		    searchPlaceholder = _props2$searchPlaceho === undefined ? "搜索" : _props2$searchPlaceho,
		    _props2$notFoundConte = _props2.notFoundContent,
		    notFoundContent = _props2$notFoundConte === undefined ? noDataDisplay : _props2$notFoundConte,
		    transferProps = _props2.transferProps;

		var tempTransferData = transferData.filter(function (v) {
			return (typeof v === 'undefined' ? 'undefined' : _typeof(v)) == 'object';
		}).map(function (v, k) {
			v.key = v[valueField];
			if (typeof displayField === 'function') {
				v.title = displayField(v);
			} else {
				v.title = displayField.format(v);
			}
			return v;
		});

		var _props$textOption = this.props.textOption,
		    textOption = _props$textOption === undefined ? {} : _props$textOption;
		var _textOption$leftTrans = textOption.leftTransferText,
		    leftTransferText = _textOption$leftTrans === undefined ? '' : _textOption$leftTrans,
		    _textOption$rightTran = textOption.rightTransferText,
		    rightTransferText = _textOption$rightTran === undefined ? '' : _textOption$rightTran;
		var _textOption$leftInfo = textOption.leftInfo,
		    leftInfo = _textOption$leftInfo === undefined ? [] : _textOption$leftInfo,
		    _textOption$rightInfo = textOption.rightInfo,
		    rightInfo = _textOption$rightInfo === undefined ? [] : _textOption$rightInfo;


		var leftInfoList = leftInfo.map(function (v, k) {
			if (v.text.length == 0) {
				return;
			}
			return _react2["default"].createElement(
				'div',
				{ key: k },
				v.text,
				':',
				sourceDesc[v.key]
			);
		});
		var rightInfoList = rightInfo.map(function (v, k) {
			if (v.text.length == 0) {
				return;
			}
			return _react2["default"].createElement(
				'div',
				{ key: k },
				v.text,
				':',
				targetDesc[v.key]
			);
		});

		return _react2["default"].createElement(
			'div',
			{ className: 'transferDivWrap' },
			(!!leftTransferText || !!rightTransferText) && _react2["default"].createElement(
				'div',
				{ className: 'topInfo' },
				_react2["default"].createElement(
					'div',
					{ className: 'topLeftInfo' },
					leftTransferText
				),
				_react2["default"].createElement(
					'div',
					{ className: 'topRightInfo' },
					rightTransferText
				)
			),
			_react2["default"].createElement(
				'div',
				{ className: 'transferWrap', style: !leftTransferText && !rightTransferText ? { marginTop: 15 } : {} },
				_react2["default"].createElement(_beeTransfer2["default"], _extends({
					showSearch: isHasSearch ? false : true,
					dataSource: tempTransferData,
					onSelectChange: this.onSelectChange.bind(this),
					selectedKeys: selectedKeys,
					filterOption: this.filterOption,
					targetKeys: targetKeys,
					onChange: this.handleChange,
					render: function render(item) {
						return item.title;
					},
					searchPlaceholder: searchPlaceholder,
					notFoundContent: notFoundContent
				}, transferProps)),
				_react2["default"].createElement(
					'button',
					{ onClick: this.allTransferCancel, className: 'allTransferLeftBtnStyle' },
					_react2["default"].createElement(_beeIcon2["default"], { type: 'uf-2arrow-left' })
				),
				_react2["default"].createElement(
					'button',
					{ onClick: this.allTransferSave, className: 'allTransferRightBtnStyle' },
					_react2["default"].createElement(_beeIcon2["default"], { type: 'uf-2arrow-right' })
				)
			),
			(leftInfoList.length > 0 || rightInfoList > 0) && _react2["default"].createElement(
				'div',
				{ className: 'buttomInfoWrap' },
				_react2["default"].createElement(
					'div',
					{ className: 'leftInfoStyle' },
					leftInfoList
				),
				_react2["default"].createElement(
					'div',
					{ className: 'rightInfoStyle' },
					rightInfoList
				)
			),
			_react2["default"].createElement(
				'button',
				{ onClick: this.upTransferSelectUp, className: 'allTransferTopUpBtnStyle' },
				_react2["default"].createElement(_beeIcon2["default"], { type: 'uf-2arrow-up' })
			),
			_react2["default"].createElement(
				'button',
				{ onClick: this.downTransferSelectDown, className: 'allTransferBottomDownBtnStyle' },
				_react2["default"].createElement(_beeIcon2["default"], { type: 'uf-2arrow-down' })
			),
			_react2["default"].createElement(
				'button',
				{ onClick: this.TransferSelectUp, className: 'allTransferTopBtnStyle' },
				_react2["default"].createElement(_beeIcon2["default"], { type: 'uf-arrow-up' })
			),
			_react2["default"].createElement(
				'button',
				{ onClick: this.TransferSelectDown, className: 'allTransferBottomBtnStyle' },
				_react2["default"].createElement(_beeIcon2["default"], { type: 'uf-arrow-down' })
			)
		);
	};

	return TransferDiv;
}(_react.Component);

exports["default"] = TransferDiv;
module.exports = exports['default'];
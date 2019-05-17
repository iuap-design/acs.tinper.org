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

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _beeTree = require('bee-tree');

var _beeTree2 = _interopRequireDefault(_beeTree);

var _RefCoreSearch = require('ref-core/lib/refs/RefCoreSearch');

var _RefCoreSearch2 = _interopRequireDefault(_RefCoreSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = (0, _getOwnPropertyNames2["default"])(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = (0, _getOwnPropertyDescriptor2["default"])(defaults, key); if (value && value.configurable && obj[key] === undefined) { (0, _defineProperty2["default"])(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : _defaults(subClass, superClass); }

var TreeNode = _beeTree2["default"].TreeNode;

var leftTree = function (_Component) {
	_inherits(leftTree, _Component);

	function leftTree(props) {
		_classCallCheck(this, leftTree);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.onExpand = function (expandedKeys) {
			_this.setState({
				expandedKeys: expandedKeys,
				autoExpandParent: false
			});
		};

		_this.onChange = function (value) {
			var expandedKeys = [];
			var dataList = _this.state.dataList;
			var data = _this.props.data;

			dataList.forEach(function (item) {
				if (item.title.indexOf(value) > -1) {
					expandedKeys.push(_this.getParentKey(item.key, data));
				}
			});
			var uniqueExpandedKeys = [];
			expandedKeys.forEach(function (item) {
				if (item && uniqueExpandedKeys.indexOf(item) === -1) {
					uniqueExpandedKeys.push(item);
				}
			});
			_this.setState({
				expandedKeys: uniqueExpandedKeys,
				searchValue: value,
				autoExpandParent: true
			});
			if (!value) {
				_this.setState({
					expandedKeys: [],
					autoExpandParent: false
				});
			}
		};

		_this.getParentKey = function (key, tree) {
			var valueField = _this.props.valueField;

			var parentKey = void 0;
			for (var i = 0; i < tree.length; i++) {
				var node = tree[i];
				if (node.children) {
					if (node.children.some(function (item) {
						return item[valueField] === key;
					})) {
						parentKey = node[valueField];
					} else if (_this.getParentKey(key, node.children)) {
						parentKey = _this.getParentKey(key, node.children);
					}
				}
			}
			return parentKey;
		};

		_this.state = {
			expandedKeys: [], //记录展开节点
			searchValue: '', //记录搜索内容
			autoExpandParent: true,
			dataList: []
		};
		_this.onTreeSelect = _this.onTreeSelect.bind(_this);
		return _this;
	}

	leftTree.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var valueField = this.props.valueField;

		var dataList = [];
		var generateList = function generateList(data) {
			for (var i = 0; i < data.length; i++) {
				var node = data[i];
				var key = node[valueField];
				var title = node.refname;
				dataList.push({
					key: key,
					title: title
				});
				if (node.children) {
					generateList(node.children, node.key);
				}
			}
		};
		generateList(nextProps.data);
		this.setState({
			dataList: dataList
		});
	};

	leftTree.prototype.onTreeSelect = function onTreeSelect(selectedKeys, e) {
		var valueField = this.props.valueField;

		if (selectedKeys.length === 0) {
			return;
		}
		///if(e.node.props.isLeaf){
		var fullInfo = {};
		var data = this.props.data;

		var loopSearch = function loopSearch(arr, key) {
			if (!arr) {
				return;
			}
			for (var i = 0; i < arr.length; i++) {
				if (arr[i][valueField] == key) {
					fullInfo = arr[i];
				} else {
					loopSearch(arr[i].children, key);
				}
			}
		};
		loopSearch(data, selectedKeys[0]);
		this.props.handleTreeSelect(fullInfo);
		// }
	};

	leftTree.prototype.render = function render() {
		var _state = this.state,
		    searchValue = _state.searchValue,
		    expandedKeys = _state.expandedKeys,
		    autoExpandParent = _state.autoExpandParent;
		var _props = this.props,
		    _props$data = _props.data,
		    data = _props$data === undefined ? [] : _props$data,
		    valueField = _props.valueField,
		    lang = _props.lang,
		    _props$nodeDisplay = _props.nodeDisplay,
		    nodeDisplay = _props$nodeDisplay === undefined ? '{refname}' : _props$nodeDisplay,
		    defaultExpandAll = _props.defaultExpandAll;

		var loop = function loop(data) {
			return data.map(function (item) {
				var text = '';
				if (typeof nodeDisplay === 'function') {
					text = nodeDisplay(item);
				} else {
					text = nodeDisplay.format(item);
				}
				// if(Object.prototype.toString.call(item.refname) !== "[object String]") item.refname = '';//refname不存在
				var index = text.search(searchValue);
				var beforeStr = text.substr(0, index);
				var afterStr = text.substr(index + searchValue.length);
				var title = index > -1 ? _react2["default"].createElement(
					'span',
					null,
					beforeStr,
					_react2["default"].createElement(
						'span',
						{ className: 'uTreeSearchableFilter' },
						searchValue
					),
					afterStr
				) : _react2["default"].createElement(
					'span',
					null,
					text
				);
				if (item.children && item.children.length > 0) {
					return _react2["default"].createElement(
						TreeNode,
						{ key: item[valueField], title: title },
						loop(item.children)
					);
				}
				return _react2["default"].createElement(TreeNode, { key: item[valueField], title: title, isLeaf: true });
			});
		};
		return _react2["default"].createElement(
			'div',
			{ className: 'leftTreeWrap' },
			_react2["default"].createElement(_RefCoreSearch2["default"], {
				show: true,
				onChange: this.onChange,
				language: lang
			}),
			_react2["default"].createElement(
				'div',
				{ className: 'leftTreeStyle' },
				_react2["default"].createElement(
					_beeTree2["default"],
					{
						checkStrictly: true,
						multiple: false,
						onExpand: this.onExpand,
						defaultExpandAll: defaultExpandAll,
						expandedKeys: expandedKeys,
						autoExpandParent: autoExpandParent,
						onSelect: this.onTreeSelect
					},
					loop(data)
				)
			)
		);
	};

	return leftTree;
}(_react.Component);

exports["default"] = leftTree;
module.exports = exports['default'];
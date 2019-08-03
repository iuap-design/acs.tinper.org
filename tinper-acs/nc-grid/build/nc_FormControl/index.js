'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _beeFormControl = require('bee-form-control');

var _beeFormControl2 = _interopRequireDefault(_beeFormControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var NCFormControl = function (_Component) {
	_inherits(NCFormControl, _Component);

	function NCFormControl(props) {
		_classCallCheck(this, NCFormControl);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.handleFocus = function (value, e) {
			var _this$props = _this.props,
			    onFocus = _this$props.onFocus,
			    itemtype = _this$props.itemtype;

			onFocus && onFocus(e, value);

			//this.mouseDown 表示用户用鼠标点击此组件
			_this.mouseDown !== true && itemtype === 'input' && _this.executeSelection(e);
		};

		_this.handleBlur = function (value, e) {
			//let value = typeof e === 'object' ? e.target.value : e;
			var onBlur = _this.props.onBlur;

			onBlur && onBlur(value, e);
		};

		_this.closeClick = function () {
			_this.i.clearValue();
			if (_this.i.props.clearSearch && Object.prototype.toString.call(_this.i.props.clearSearch).slice(8, 16) === 'Function') {
				_this.i.props.clearSearch();
			}
		};

		_this.searchClick = function () {
			_this.i.props.onSearch && _this.i.props.onSearch(_this.i.props.value);
		};

		_this.mySearch = function (e) {
			if (e.keyCode === 13) {
				_this.i.props.onSearch && _this.i.props.onSearch(_this.i.props.value);
			}
		};

		return _this;
	}

	/**
  * @author bbqin
  */


	NCFormControl.prototype.componentDidUpdate = function componentDidUpdate() {}
	// TODO  目前逻辑在 setstate后
	// TODO 做一些事件绑定的工作
	// typeof Message ? Message.listen('', this.)

	/**
  * @author bbqin
  */
	;

	NCFormControl.prototype.executeSelection = function executeSelection(e) {
		var length = e.target.value.length;
		e.target.setSelectionRange(0, length);
	};
	// icon clock event


	NCFormControl.prototype.render = function render() {
		var _this2 = this;

		var _props = this.props,
		    isViewMode = _props.isViewMode,
		    className = _props.className,
		    onBlur = _props.onBlur,
		    showStar = _props.showStar,
		    value = _props.value,
		    type = _props.type,
		    disabled = _props.disabled,
		    others = _objectWithoutProperties(_props, ['isViewMode', 'className', 'onBlur', 'showStar', 'value', 'type', 'disabled']);

		var flag = false;
		if (type === 'search') {
			flag = true;
			type = 'text';
		} else if (type === 'password') {
			var _others = others,
			    title = _others.title,
			    otherss = _objectWithoutProperties(_others, ['title']);

			others = otherss;
		}
		if (value === undefined || value === null) {
			value = '';
		}
		if (others.hasOwnProperty('maxlength') && others.maxlength > 0) {
			value = String(value).slice(0, others.maxlength);
		}

		return isViewMode ? _react2["default"].createElement(
			'span',
			null,
			value
		) : _react2["default"].createElement(
			'div',
			{ className: 'u-form-control-wrapper' },
			showStar ? _react2["default"].createElement(
				'span',
				{ className: 'form-control-required-tag' },
				'*'
			) : '',
			_react2["default"].createElement(_beeFormControl2["default"], _extends({
				ref: function ref(i) {
					return _this2.i = i;
				},
				className: 'nc-input ' + className,
				onBlur: this.handleBlur,
				value: value,
				type: type,
				onKeyUp: this.mySearch,
				disabled: disabled
			}, others, {
				onFocus: this.handleFocus,
				onMouseDown: function onMouseDown() {
					_this2.mouseDown = true;
				},
				onMouseUp: function onMouseUp() {
					_this2.mouseDown = false;
				}
			})),
			flag ? _react2["default"].createElement(
				'div',
				{ className: 'u-form-control-search-text' },
				' ',
				value.length && !disabled ? _react2["default"].createElement('i', { onClick: this.closeClick, className: 'iconfont icon-qingkong ' }) : null,
				' ',
				_react2["default"].createElement('i', { onClick: this.searchClick, className: 'iconfont icon-sousuo' })
			) : null
		);
	};

	return NCFormControl;
}(_react.Component);

exports["default"] = NCFormControl;
module.exports = exports['default'];
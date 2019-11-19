'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _beeButton = require('bee-button');

var _beeButton2 = _interopRequireDefault(_beeButton);

var _beePanel = require('bee-panel');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactHotKeys = require('react-hot-keys');

var _reactHotKeys2 = _interopRequireDefault(_reactHotKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * 部分不能通过this.props.form.resetFields()清空的组件，需要传reset方法，在reset方法中自行清空
 */
var propTypes = {
    form: _propTypes2["default"].object.isRequired, //将from组件传入
    searchOpen: _propTypes2["default"].bool, //是否默认展开更多查询条件，false默认关闭
    search: _propTypes2["default"].func, //查询的回调
    reset: _propTypes2["default"].func, //重置的回调
    resetName: _propTypes2["default"].string, //重置的文字
    searchName: _propTypes2["default"].string, //查询的文字
    btnPosition: _propTypes2["default"].oneOfType(['left', 'right', 'center']), //按钮位置
    searchBtnPosition: _propTypes2["default"].oneOfType(['left', 'right']), //查询按钮位置
    openName: _propTypes2["default"].string, //展开名字
    closeName: _propTypes2["default"].string, //收起名字
    showIcon: _propTypes2["default"].bool, //是否显示展开收起的图标
    clsPrefix: _propTypes2["default"].string,
    renderHeader: _propTypes2["default"].func,
    renderFooter: _propTypes2["default"].func
};

var defaultProps = {
    searchOpen: false,
    search: function search() {},
    reset: function reset() {},
    btnPosition: 'right',
    openName: '展开',
    closeName: '收起',
    showIcon: true,
    resetName: '重置',
    searchName: '查询',
    clsPrefix: 'search',
    searchHead: '查询面板',
    searchBtnPosition: 'left'
};

var SearchPanel = function (_Component) {
    _inherits(SearchPanel, _Component);

    function SearchPanel(props) {
        _classCallCheck(this, SearchPanel);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.open = function () {
            var searchOpen = _this.state.searchOpen;
            var showBtn = null;
            if (_this.props.simple) {
                showBtn = true;
            } else {
                searchOpen ? showBtn = false : showBtn = true;
            }
            _this.setState({
                searchOpen: !searchOpen,
                showBtn: showBtn
            });
            _this.props.openHandle && _this.props.openHandle(!searchOpen);
        };

        _this.search = function () {
            var self = _this;
            _this.props.form.validateFields(function (err, values) {
                self.props.search(err, values);
            });
        };

        _this.reset = function () {
            _this.props.form.resetFields();
            _this.props.reset();
        };

        _this.enter = function (e) {
            if (e.keyCode === 13) {
                _this.search();
            }
        };

        _this.state = {
            searchOpen: _this.props.searchOpen,
            showBtn: !_this.props.searchOpen && !_this.props.simple ? false : true
        };
        return _this;
    }

    SearchPanel.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var open = nextProps.open,
            sample = nextProps.sample;

        var showBtn = null;
        if (this.props.simple) {
            showBtn = true;
        } else {
            open ? showBtn = true : showBtn = false;
        }
        if ('open' in nextProps) {
            this.setState({
                searchOpen: open,
                showBtn: showBtn
            });
        }
    };

    SearchPanel.prototype.render = function render() {
        var _props = this.props,
            children = _props.children,
            className = _props.className,
            form = _props.form,
            resetName = _props.resetName,
            searchName = _props.searchName,
            clsPrefix = _props.clsPrefix,
            searchBtnProps = _props.searchBtnProps,
            resetBtnProps = _props.resetBtnProps,
            btnPosition = _props.btnPosition,
            openName = _props.openName,
            closeName = _props.closeName,
            showIcon = _props.showIcon,
            simple = _props.simple,
            renderHeader = _props.renderHeader,
            searchHead = _props.searchHead,
            renderFooter = _props.renderFooter,
            searchBtnPosition = _props.searchBtnPosition;

        var classes = clsPrefix + '-panel';
        if (className) {
            classes += ' ' + className;
        }
        return _react2["default"].createElement(
            'div',
            { className: classes },
            _react2["default"].createElement(
                'div',
                { className: clsPrefix + '-panel-header', onClick: this.open },
                renderHeader ? renderHeader() : _react2["default"].createElement(
                    'span',
                    null,
                    _react2["default"].createElement(
                        'span',
                        { className: clsPrefix + '-header-title' },
                        searchHead
                    ),
                    _react2["default"].createElement(
                        'span',
                        { className: clsPrefix + '-panel-icon' },
                        _react2["default"].createElement(
                            'span',
                            null,
                            showIcon ? _react2["default"].createElement('i', { className: (0, _classnames2["default"])({
                                    'uf': true,
                                    'uf-2arrow-up': this.state.searchOpen,
                                    'uf-2arrow-down': !this.state.searchOpen
                                }) }) : '',
                            this.state.searchOpen ? closeName : openName
                        )
                    )
                )
            ),
            simple ? _react2["default"].createElement(
                'div',
                { className: clsPrefix + '-panel-simple' },
                simple
            ) : '',
            _react2["default"].createElement(
                _beePanel.Panel,
                { collapsible: true, expanded: this.state.searchOpen },
                children
            ),
            _react2["default"].createElement(
                'div',
                { className: clsPrefix + '-panel-btn', style: { 'textAlign': btnPosition, 'display': this.state.showBtn ? 'block' : 'none' } },
                searchBtnPosition == 'left' ? _react2["default"].createElement(
                    'span',
                    null,
                    _react2["default"].createElement(
                        _reactHotKeys2["default"],
                        {
                            keyName: 'enter',
                            onKeyDown: this.search
                        },
                        _react2["default"].createElement(
                            _beeButton2["default"],
                            _extends({ size: 'sm', colors: 'primary' }, searchBtnProps, { onClick: this.search }),
                            searchName
                        )
                    ),
                    _react2["default"].createElement(
                        _reactHotKeys2["default"],
                        {
                            keyName: 'alt+c,command+c',
                            onKeyDown: this.reset
                        },
                        _react2["default"].createElement(
                            _beeButton2["default"],
                            _extends({ size: 'sm' }, resetBtnProps, { onClick: this.reset }),
                            resetName
                        )
                    )
                ) : _react2["default"].createElement(
                    'span',
                    null,
                    _react2["default"].createElement(
                        _reactHotKeys2["default"],
                        {
                            keyName: 'alt+c,command+c',
                            onKeyDown: this.reset
                        },
                        _react2["default"].createElement(
                            _beeButton2["default"],
                            _extends({ size: 'sm' }, resetBtnProps, { onClick: this.reset }),
                            resetName
                        )
                    ),
                    _react2["default"].createElement(
                        _reactHotKeys2["default"],
                        {
                            keyName: 'enter',
                            onKeyDown: this.search
                        },
                        _react2["default"].createElement(
                            _beeButton2["default"],
                            _extends({ size: 'sm', colors: 'primary' }, searchBtnProps, { onClick: this.search }),
                            searchName
                        )
                    )
                ),
                renderFooter ? renderFooter() : ''
            )
        );
    };

    return SearchPanel;
}(_react.Component);

SearchPanel.propTypes = propTypes;
SearchPanel.defaultProps = defaultProps;
exports["default"] = SearchPanel;
module.exports = exports['default'];
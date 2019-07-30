'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _beeIcon = require('bee-icon');

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _beeButton = require('bee-button');

var _beeButton2 = _interopRequireDefault(_beeButton);

var _beeDropdown = require('bee-dropdown');

var _beeDropdown2 = _interopRequireDefault(_beeDropdown);

var _beeMenus = require('bee-menus');

var _beeMenus2 = _interopRequireDefault(_beeMenus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Item = _beeMenus2["default"].Item;

var noop = function noop() {};

var propTypes = {
    clsfix: _propTypes2["default"].string,
    search: _propTypes2["default"].func,
    reset: _propTypes2["default"].func
};
var defaultProps = {
    clsfix: 'nc-search-panel',
    search: noop,
    reset: noop
};

var NcSearchPanel = function (_Component) {
    _inherits(NcSearchPanel, _Component);

    function NcSearchPanel(props) {
        _classCallCheck(this, NcSearchPanel);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.open = function () {
            _this.setState({
                open: !_this.state.open
            });
        };

        _this.onSelect = function (item) {
            _this.setState({
                text: item.item.props.children
            });
        };

        _this.getChild = function () {
            var children = _this.props.children;

            var child = [];
            if (children.length > 1) {
                children.map(function (item) {
                    if (_this.state.text == '简单查询' && item.type.name == 'Sample') {
                        child = item.props.children;
                    } else if (_this.state.text == '复杂查询' && item.type.name == 'Complex') {
                        child = item.props.children;
                    }
                });
            } else {
                if (_this.state.text == '简单查询' && children.type.name == 'Sample') {
                    child = children.props.children;
                } else if (_this.state.text == '复杂查询' && children.type.name == 'Complex') {
                    child = children.props.children;
                }
            }
            return child;
        };

        _this.state = {
            open: true,
            text: '简单查询'
        };
        return _this;
    }

    NcSearchPanel.prototype.render = function render() {
        var _props = this.props,
            clsfix = _props.clsfix,
            search = _props.search,
            reset = _props.reset;

        var ctns = clsfix + '-ctns';
        if (!this.state.open) ctns += ' close';
        var menus = _react2["default"].createElement(
            _beeMenus2["default"],
            {
                onSelect: this.onSelect },
            _react2["default"].createElement(
                Item,
                { key: '1' },
                '\u7B80\u5355\u67E5\u8BE2'
            ),
            _react2["default"].createElement(
                Item,
                { key: '2' },
                '\u590D\u6742\u67E5\u8BE2'
            )
        );

        return _react2["default"].createElement(
            'div',
            { className: clsfix },
            _react2["default"].createElement(
                'div',
                { className: clsfix + '-header' },
                _react2["default"].createElement(
                    'span',
                    { className: clsfix + '-case' },
                    _react2["default"].createElement(
                        _beeDropdown2["default"],
                        {
                            overlayClassName: clsfix + '-case-list',
                            trigger: ['click'],
                            overlay: menus,
                            animation: 'slide-up' },
                        _react2["default"].createElement(
                            'span',
                            null,
                            this.state.text,
                            ' ',
                            _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-triangle-down' })
                        )
                    )
                ),
                _react2["default"].createElement(
                    'span',
                    { className: clsfix + '-selected' },
                    '\u9AD8\u7EA7(\u6682\u4E0D\u53EF\u7528)'
                )
            ),
            _react2["default"].createElement(
                'div',
                { className: clsfix + '-ctns-out' },
                _react2["default"].createElement(
                    'div',
                    { className: ctns },
                    _react2["default"].createElement(
                        'div',
                        { className: clsfix + '-ctn' },
                        this.getChild()
                    ),
                    _react2["default"].createElement(
                        'div',
                        { className: clsfix + '-btns' },
                        _react2["default"].createElement(
                            _beeButton2["default"],
                            { colors: 'primary', className: clsfix + '-btns-search', onClick: search },
                            _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-search-light-2' })
                        ),
                        _react2["default"].createElement(
                            _beeButton2["default"],
                            { colors: 'primary', bordered: true, className: clsfix + '-btns-reset', onClick: reset },
                            _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-clean' })
                        )
                    )
                ),
                _react2["default"].createElement(
                    'div',
                    { className: clsfix + '-open', onClick: this.open },
                    this.state.open ? _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-2arrow-up' }) : _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-2arrow-down' })
                )
            )
        );
    };

    return NcSearchPanel;
}(_react.Component);

;

NcSearchPanel.propTypes = propTypes;
NcSearchPanel.defaultProps = defaultProps;

exports["default"] = NcSearchPanel;
module.exports = exports['default'];
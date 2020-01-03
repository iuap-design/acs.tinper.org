"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Grid = require("./Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _beePagination = require("bee-pagination");

var _beePagination2 = _interopRequireDefault(_beePagination);

var _beeSelect = require("bee-select");

var _beeSelect2 = _interopRequireDefault(_beeSelect);

var _beeTooltip = require("bee-tooltip");

var _beeTooltip2 = _interopRequireDefault(_beeTooltip);

var _lodash = require("lodash.clonedeep");

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require("lodash.isequal");

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Option = _beeSelect2["default"].Option;

var propsTypes = {
    paginationObj: _propTypes2["default"].object, //分页参数
    showPagination: _propTypes2["default"].bool, //是否显示分页
    showTooltip: _propTypes2["default"].bool, //是否显示tooltip
    showIndex: _propTypes2["default"].bool //是否显示index列
};

var defaultProps = {
    paginationObj: {},
    showPagination: true,
    showTooltip: false,
    showIndex: false
};

var AcGrids = function (_Component) {
    _inherits(AcGrids, _Component);

    function AcGrids(props) {
        _classCallCheck(this, AcGrids);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.onSelectChange = function (value) {
            _this.props.paginationObj.onDataNumSelect && _this.props.paginationObj.onDataNumSelect(value);
        };

        _this.exportExcel = function () {
            _this.grid.exportExcel();
        };

        _this.setColumns = function (col, da) {
            var columns = (0, _lodash2["default"])(col);
            var _this$props = _this.props,
                showIndex = _this$props.showIndex,
                showTooltip = _this$props.showTooltip;

            if (showIndex) {
                //给data加index
                var data = (0, _lodash2["default"])(da);
                if (data[0] && data[0].index == 1) {//如果index存在
                } else {
                    data.forEach(function (item, index) {
                        item.index = index + 1;
                    });
                    _this.setState({
                        data: data
                    });
                }
                columns.unshift({
                    title: "序号",
                    dataIndex: "index",
                    key: "index",
                    width: 100
                });
            }
            columns.forEach(function (item) {
                item.oldRender = item.render;
                if (typeof item.oldRender == 'function' && (item.oldRender.toString().indexOf('colSpan') != -1 || item.oldRender.toString().indexOf('rowSpan') != -1)) {
                    item.render = item.oldRender;
                } else {
                    item.render = function (text, record, index) {
                        if (showTooltip) {
                            var placement = 'left';
                            if (item.textAlign) placement = item.textAlign == 'center' ? 'bottom' : item.textAlign;
                            var value = typeof item.oldRender == 'function' ? item.oldRender(text, record, index) : text;
                            return _react2["default"].createElement(
                                _beeTooltip2["default"],
                                { overlay: value, inverse: true, placement: placement },
                                _react2["default"].createElement(
                                    "span",
                                    null,
                                    value
                                )
                            );
                        } else {
                            var _value = typeof item.oldRender == 'function' ? item.oldRender(text, record, index) : text;
                            return _react2["default"].createElement(
                                "span",
                                { className: "ac-grid-cell", title: typeof _value == 'string' || typeof _value == 'number' ? _value : '' },
                                _value
                            );
                        }
                    };
                }
            });
            _this.setState({
                columns: columns
            });
        };

        _this.state = {
            activePage: 1,
            columns: props.columns,
            data: props.data
        };
        return _this;
    }

    AcGrids.prototype.componentWillMount = function componentWillMount() {
        this.setColumns(this.props.columns, this.props.data);
    };

    AcGrids.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (!(0, _lodash4["default"])(nextProps.data, this.state.data)) {
            this.setState({
                data: nextProps.data
            });
        }
    };

    AcGrids.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            paginationObj = _props.paginationObj,
            showPagination = _props.showPagination,
            columns = _props.columns,
            data = _props.data,
            other = _objectWithoutProperties(_props, ["paginationObj", "showPagination", "columns", "data"]);

        return _react2["default"].createElement(
            "div",
            { className: "ac-grids-wrapper" },
            _react2["default"].createElement(_Grid2["default"], _extends({}, other, { columns: this.state.columns, data: this.state.data, ref: function ref(_ref) {
                    return _this2.grid = _ref;
                } })),
            showPagination ? _react2["default"].createElement(
                "div",
                { className: "ac-grids-wrapper-pages" },
                _react2["default"].createElement(
                    _beeSelect2["default"],
                    { onChange: this.onSelectChange, defaultValue: "10" },
                    _react2["default"].createElement(
                        Option,
                        { value: "10" },
                        "10\u6761/\u9875"
                    ),
                    _react2["default"].createElement(
                        Option,
                        { value: "20" },
                        "20\u6761/\u9875"
                    ),
                    _react2["default"].createElement(
                        Option,
                        { value: "50" },
                        "50\u6761/\u9875"
                    ),
                    _react2["default"].createElement(
                        Option,
                        { value: "100" },
                        "100\u6761/\u9875"
                    )
                ),
                _react2["default"].createElement(_beePagination2["default"], _extends({
                    prev: true,
                    next: true,
                    size: "sm",
                    gap: true,
                    items: 0
                }, paginationObj))
            ) : ''
        );
    };

    return AcGrids;
}(_react.Component);

AcGrids.defaultProps = defaultProps;
AcGrids.propsTypes = propsTypes;
AcGrids.GridToolBar = _Grid.GridToolBar;
exports["default"] = AcGrids;
module.exports = exports["default"];
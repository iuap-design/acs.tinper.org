"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _beeComplexGrid = require("bee-complex-grid");

var _beeComplexGrid2 = _interopRequireDefault(_beeComplexGrid);

var _defaultProps = require("./defaultProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var defaultProps = _extends({
    headerScroll: false,
    bordered: false,
    data: [],
    columnFilterAble: false
}, _defaultProps.gridDefalutProps);

var Grid = function (_Component) {
    _inherits(Grid, _Component);

    function Grid() {
        var _temp, _this, _ret;

        _classCallCheck(this, Grid);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.exportExcel = function () {
            _this.grid.exportExcel();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    Grid.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            paginationObj = _props.paginationObj,
            data = _props.data,
            exportData = _props.exportData,
            headerScroll = _props.headerScroll,
            otherProps = _objectWithoutProperties(_props, ["paginationObj", "data", "exportData", "headerScroll"]);

        var _paginationObj = 'none';
        if (paginationObj != 'none') {
            _paginationObj = _extends({}, _defaultProps.paginationDefaultProps, paginationObj);
        }
        return _react2["default"].createElement(
            "div",
            { className: "ac-gridcn " + (headerScroll ? 'header-scroll' : '') },
            _react2["default"].createElement(_beeComplexGrid2["default"], _extends({}, otherProps, {
                headerScroll: headerScroll,
                data: data,
                paginationObj: _paginationObj,
                ref: function ref(_ref) {
                    return _this2.grid = _ref;
                },
                exportData: exportData || data
            }))
        );
    };

    return Grid;
}(_react.Component);

Grid.defaultProps = defaultProps;
Grid.GridToolBar = _beeComplexGrid.GridToolBar;

exports["default"] = Grid;
module.exports = exports["default"];
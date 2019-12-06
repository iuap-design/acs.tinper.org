"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _beeComplexGrid = require("bee-complex-grid");

var _beeComplexGrid2 = _interopRequireDefault(_beeComplexGrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var defaultProps = {
    headerScroll: false,
    bordered: false,
    data: [],
    columnFilterAble: false
};

var Grid = function (_Component) {
    _inherits(Grid, _Component);

    function Grid(props) {
        _classCallCheck(this, Grid);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.exportExcel = function () {
            _this.grid.exportExcel();
        };

        return _this;
    }

    Grid.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            paginationObj = _props.paginationObj,
            data = _props.data,
            columnFilterAble = _props.columnFilterAble,
            otherProps = _objectWithoutProperties(_props, ["paginationObj", "data", "columnFilterAble"]);

        return _react2["default"].createElement(_beeComplexGrid2["default"], _extends({}, otherProps, {
            className: "ac-grids",
            data: data,
            paginationObj: "none",
            columnFilterAble: columnFilterAble,
            ref: function ref(_ref) {
                return _this2.grid = _ref;
            },
            syncHover: true,
            headerHeight: 35
        }));
    };

    return Grid;
}(_react.Component);

Grid.defaultProps = defaultProps;
Grid.GridToolBar = _beeComplexGrid.GridToolBar;
exports["default"] = Grid;
module.exports = exports["default"];
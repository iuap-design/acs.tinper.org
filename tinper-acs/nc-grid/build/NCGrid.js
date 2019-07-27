'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nc_Table = require('./nc_Table');

var _nc_Table2 = _interopRequireDefault(_nc_Table);

var _SimpleTable = require('./SimpleTable');

var _SimpleTable2 = _interopRequireDefault(_SimpleTable);

var _CardTable = require('./CardTable');

var _CardTable2 = _interopRequireDefault(_CardTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {};
var defaultProps = {};

var NCGrid = function (_Component) {
    _inherits(NCGrid, _Component);

    function NCGrid() {
        _classCallCheck(this, NCGrid);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    NCGrid.prototype.render = function render() {
        return _react2["default"].createElement(_nc_Table2["default"], this.props);
    };

    return NCGrid;
}(_react.Component);

;

NCGrid.propTypes = propTypes;
NCGrid.defaultProps = defaultProps;
NCGrid.SimpleTable = _SimpleTable2["default"];
NCGrid.CardTable = _CardTable2["default"];
exports["default"] = NCGrid;
module.exports = exports['default'];
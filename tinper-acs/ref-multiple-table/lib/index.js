'use strict';

exports.__esModule = true;
exports.SearchPanelItem = exports.RefSearchPanel = exports.createRefMultipleTableModal = exports.createRefMultipleTable = exports.RefMultipleTable = exports.RefMultipleTableWithInput = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RefMultipeTableBaseUI = require('./components/RefMultipeTableBaseUI');

var _RefMultipeTableBaseUI2 = _interopRequireDefault(_RefMultipeTableBaseUI);

var _RefSearchPanel = require('./components/RefSearchPanel');

var _RefSearchPanel2 = _interopRequireDefault(_RefSearchPanel);

var _RefCoreWithInput = require('ref-core/lib/refs/RefCoreWithInput');

var _RefCoreWithInput2 = _interopRequireDefault(_RefCoreWithInput);

var _createApi = require('ref-core/lib/utils/createApi.js');

var _RefCoreGlobal = require('ref-core/lib/refs/RefCoreGlobal');

var _RefCoreGlobal2 = _interopRequireDefault(_RefCoreGlobal);

require('ref-core/css/refcore.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2["default"])(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2["default"] ? (0, _setPrototypeOf2["default"])(subClass, superClass) : subClass.__proto__ = superClass; }

// import './index.less' //webpack打包需要放开
function RefMultipleTable(props) {
    return _react2["default"].createElement(
        _RefCoreGlobal2["default"],
        props,
        _react2["default"].createElement(_RefMultipeTableBaseUI2["default"], null)
    );
}
function createRefMultipleTable(selector, props, callback) {
    return (0, _createApi.createRefInput)(selector, _react2["default"].createElement(RefMultipleTableWithInput, null), props, function (param) {
        if (typeof callback === 'function') {
            callback(param);
        }
    });
}
function createRefMultipleTableModal(props, callback) {
    return (0, _createApi.createRefModal)(_extends({
        component: _react2["default"].createElement(RefMultipleTable, null)
    }, props), function (param) {
        if (typeof callback === 'function') {
            callback(param);
        }
    });
}

var RefMultipleTableWithInput = function (_Component) {
    _inherits(RefMultipleTableWithInput, _Component);

    function RefMultipleTableWithInput() {
        _classCallCheck(this, RefMultipleTableWithInput);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    RefMultipleTableWithInput.prototype.render = function render() {
        return _react2["default"].createElement(
            _RefCoreWithInput2["default"],
            this.props,
            _react2["default"].createElement(RefMultipleTable, null)
        );
    };

    return RefMultipleTableWithInput;
}(_react.Component);

exports["default"] = _RefMultipeTableBaseUI2["default"];
exports.RefMultipleTableWithInput = RefMultipleTableWithInput;
exports.RefMultipleTable = RefMultipleTable;
exports.createRefMultipleTable = createRefMultipleTable;
exports.createRefMultipleTableModal = createRefMultipleTableModal;
exports.RefSearchPanel = _RefSearchPanel2["default"];
exports.SearchPanelItem = _RefSearchPanel.SearchPanelItem;
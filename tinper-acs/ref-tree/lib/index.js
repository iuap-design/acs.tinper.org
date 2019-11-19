'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createRefTreeWithInput = exports.createRefTree = exports.RefTree = exports.RefTreeWithInput = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RefTreeBaseUI = require('./RefTreeBaseUI');

var _RefTreeBaseUI2 = _interopRequireDefault(_RefTreeBaseUI);

var _RefCoreWithInput = require('ref-core/lib/refs/RefCoreWithInput');

var _RefCoreWithInput2 = _interopRequireDefault(_RefCoreWithInput);

var _createApi = require('ref-core/lib/utils/createApi.js');

var _RefCoreGlobal = require('ref-core/lib/refs/RefCoreGlobal');

var _RefCoreGlobal2 = _interopRequireDefault(_RefCoreGlobal);

require('ref-core/css/refcore.css');

require('ref-core/css/refcoretree.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import './index.less'; //webpack打包放开
var RefTree = function RefTree(props) {
    return _react2["default"].createElement(
        _RefCoreGlobal2["default"],
        props,
        _react2["default"].createElement(_RefTreeBaseUI2["default"], null)
    );
};

function createRefTree(props, callback) {
    return (0, _createApi.createRefModal)(_extends({
        component: _react2["default"].createElement(RefTree, null)
    }, props), function (param) {
        if (typeof callback === 'function') {
            callback(param);
        }
    });
}
function createRefTreeWithInput(selector, props, callback) {
    return (0, _createApi.createRefInput)(selector, _react2["default"].createElement(RefTreeWithInput, null), props, function (param) {
        if (typeof callback === 'function') {
            callback(param);
        }
    });
}

function RefTreeWithInput(props) {
    return _react2["default"].createElement(
        _RefCoreWithInput2["default"],
        props,
        _react2["default"].createElement(RefTree, null)
    );
}

exports["default"] = _RefTreeBaseUI2["default"];
exports.RefTreeWithInput = RefTreeWithInput;
exports.RefTree = RefTree;
exports.createRefTree = createRefTree;
exports.createRefTreeWithInput = createRefTreeWithInput;
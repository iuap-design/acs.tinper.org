'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefTreeTransferWithInput = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends = _assign2["default"] || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
//import './index.less'; //webpackbuild放开


var _RefCoreWithInput = require('ref-core/lib/refs/RefCoreWithInput');

var _RefCoreWithInput2 = _interopRequireDefault(_RefCoreWithInput);

var _createApi = require('ref-core/lib/utils/createApi');

var _RefCoreGlobal = require('ref-core/lib/refs/RefCoreGlobal');

var _RefCoreGlobal2 = _interopRequireDefault(_RefCoreGlobal);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('ref-core/css/refcore.css');

var _RefTreeTransferBaseUI = require('./RefTreeTransferBaseUI');

var _RefTreeTransferBaseUI2 = _interopRequireDefault(_RefTreeTransferBaseUI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function RefTreeTransfer(props) {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    _react2["default"].createElement(
      _RefCoreGlobal2["default"],
      props,
      _react2["default"].createElement(_RefTreeTransferBaseUI2["default"], null)
    )
  );
}

function RefTreeTransferWithInput(props) {
  return _react2["default"].createElement(
    _RefCoreWithInput2["default"],
    _extends({}, props, { multiple: true }),
    _react2["default"].createElement(RefTreeTransfer, null)
  );
}

function createRefTreeTransfer(selector, props, callback) {
  return (0, _createApi.createRefInput)(selector, _react2["default"].createElement(RefTreeTransferWithInput, null), props, function (param) {
    if (typeof callback === 'function') {
      callback(param);
    }
  });
}
function createRefTreeTransferModal(props, callback) {
  return (0, _createApi.createRefModal)(_extends({
    component: _react2["default"].createElement(RefTreeTransfer, null)
  }, props), function (param) {
    if (typeof callback === 'function') {
      callback(param);
    }
  });
}
exports["default"] = _RefTreeTransferBaseUI2["default"];
exports.RefTreeTransferWithInput = RefTreeTransferWithInput;
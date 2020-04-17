'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FormLayout = require('./FormLayout');

var _FormLayout2 = _interopRequireDefault(_FormLayout);

var _FormItem = require('./FormItem');

var _FormItem2 = _interopRequireDefault(_FormItem);

var _FormRow = require('./FormRow');

var _FormRow2 = _interopRequireDefault(_FormRow);

var _FormItemSpan = require('./FormItemSpan');

var _FormItemSpan2 = _interopRequireDefault(_FormItemSpan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_FormLayout2["default"].FormRow = _FormRow2["default"];
_FormLayout2["default"].FormItem = _FormItem2["default"];
_FormLayout2["default"].FormItemSpan = _FormItemSpan2["default"];

exports["default"] = _FormLayout2["default"];
module.exports = exports['default'];
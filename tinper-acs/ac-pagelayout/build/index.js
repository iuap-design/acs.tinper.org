'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Pagelayout = require('./Pagelayout');

var _Pagelayout2 = _interopRequireDefault(_Pagelayout);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _SearchArea = require('./SearchArea');

var _SearchArea2 = _interopRequireDefault(_SearchArea);

var _TableContent = require('./TableContent');

var _TableContent2 = _interopRequireDefault(_TableContent);

var _LeftContent = require('./LeftContent');

var _LeftContent2 = _interopRequireDefault(_LeftContent);

var _RightContent = require('./RightContent');

var _RightContent2 = _interopRequireDefault(_RightContent);

var _Content = require('./Content');

var _Content2 = _interopRequireDefault(_Content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_Pagelayout2["default"].Header = _Header2["default"];
_Pagelayout2["default"].Content = _Content2["default"];
_Pagelayout2["default"].SearchArea = _SearchArea2["default"];
_Pagelayout2["default"].TableContent = _TableContent2["default"];
_Pagelayout2["default"].LeftContent = _LeftContent2["default"];
_Pagelayout2["default"].RightContent = _RightContent2["default"];

exports["default"] = _Pagelayout2["default"];
module.exports = exports['default'];
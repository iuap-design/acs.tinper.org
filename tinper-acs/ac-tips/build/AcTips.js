'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _Tips = require('./Tips');

var _Tips2 = _interopRequireDefault(_Tips);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AcTips = {
    toastList: [],
    top: 50,
    hide: function hide() {},
    destory: function destory(id) {
        var index = AcTips.toastList.indexOf(id);
        var toast = document.getElementById(id);
        if (toast) {
            toast.style.right = 0;
            _reactDom2["default"].unmountComponentAtNode(toast);
            document.body.removeChild(toast);
            AcTips.toastList.splice(index, 1);
            for (var i = index; i < AcTips.toastList.length; i++) {
                var item = document.getElementById(AcTips.toastList[i]);
                item.style.top = i * 50 + AcTips.top + 'px';
            }
        }
    },
    create: function create(options) {
        var _options$type = options.type,
            type = _options$type === undefined ? 'success' : _options$type,
            _options$top = options.top,
            top = _options$top === undefined ? 50 : _options$top,
            zIndex = options.zIndex;

        AcTips.top = top;
        var id = (0, _uuid2["default"])();
        AcTips.toastList.push(id);
        var toast = document.createElement('div');
        toast.className = 'ac-tips-out ' + type;
        toast.id = id;
        toast.style.top = AcTips.toastList.length * 50 + top + 'px';
        if (zIndex) toast.style['z-index'] = zIndex;
        document.body.appendChild(toast);
        _reactDom2["default"].render(_react2["default"].createElement(_Tips2["default"], _extends({}, options, { destory: AcTips.destory, id: id })), toast);
        setTimeout(function () {
            toast.style.right = '5px';
        }, 0);
    },
    destoryAll: function destoryAll() {
        AcTips.toastList.forEach(function (id) {
            var toast = document.getElementById(id);
            toast.style.right = 0;
            _reactDom2["default"].unmountComponentAtNode(toast);
            document.body.removeChild(toast);
        });
        AcTips.toastList = [];
    }
};

exports["default"] = AcTips;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _beeIcon = require('bee-icon');

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _rcNotification = require('rc-notification');

var _rcNotification2 = _interopRequireDefault(_rcNotification);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * YS 风格 tips
                                                                                                                                                                                                                              * Created by Yang Chenchen on July 31, 2020
                                                                                                                                                                                                                              */


var notification = null;
var AcTips = {
    create: function create(options) {
        var _options$type = options.type,
            type = _options$type === undefined ? 'success' : _options$type,
            content = options.content,
            style = options.style,
            duration = options.duration,
            others = _objectWithoutProperties(options, ['type', 'content', 'style', 'duration']);

        duration = duration ? duration / 1000 : type === 'error' ? 5 : 2;
        if (notification == null) {
            var toast = document.createElement('div');
            _rcNotification2["default"].newInstance({
                getContainer: function getContainer() {
                    return toast;
                },
                prefixCls: 'uretail-message',
                style: style
            }, function (hooksRef) {
                notification = hooksRef;
            });
            document.body.appendChild(toast);
        }
        var key = options.key || Date.now();
        var iconType = '';
        var NoticeIcon = void 0;
        switch (type) {
            case 'success':
                iconType = 'uf-correct-2';
                break;
            case 'info':
                iconType = 'uf-i-c';
                break;
            case 'error':
                iconType = 'uf-close-c';
                break;
            case 'warning':
                iconType = 'uf-exc-c-2';
                break;
            default:
                iconType = 'uf-i-c';
        }
        NoticeIcon = _react2["default"].createElement(_beeIcon2["default"], { type: iconType });
        notification.notice(_extends({
            type: type,
            content: _react2["default"].createElement(
                'div',
                { className: (0, _classnames2["default"])('uretail-message-custom-content uretail-message-' + type + ' ') },
                _react2["default"].createElement(
                    'div',
                    { className: 'anticon' },
                    NoticeIcon
                ),
                _react2["default"].createElement(
                    'div',
                    { className: 'anticon-circle' },
                    content
                )
            ),
            key: key,
            duration: duration
        }, others));
    },
    destory: function destory() {
        if (notification) {
            notification.destroy();
            notification = null;
        }
    },
    destoryAll: function destoryAll() {
        if (notification) {
            notification.destroy();
            notification = null;
        }
    }
};

exports["default"] = AcTips;
module.exports = exports['default'];
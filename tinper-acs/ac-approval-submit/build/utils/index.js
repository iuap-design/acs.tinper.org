'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.processData = exports.Info = exports.Warning = exports.Error = exports.Success = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _acTips = require('ac-tips');

var _acTips2 = _interopRequireDefault(_acTips);

var _cloneDeep = require('clone-deep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Success = exports.Success = function Success(msg) {
    _acTips2["default"].create({ content: msg, type: 'success', duration: 3000 });
};

var Error = exports.Error = function Error(msg) {
    _acTips2["default"].create({ content: msg, type: 'error', duration: 3000 });
};

var Warning = exports.Warning = function Warning(msg) {
    _acTips2["default"].create({ content: msg, type: 'warning', duration: 3000 });
};

var Info = exports.Info = function Info(msg) {
    _acTips2["default"].create({ content: msg, color: 'info', duration: 3000 });
};
/**
 * 数据返回统一处理函数
 * @param {*} response
 * @param {*} successMsg 成功提示
 */
var processData = exports.processData = function processData(response, successMsg) {
    var result = {};
    try {
        if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) != 'object') {
            Error('数据返回出错：1、请确保服务运行正常；2、请确保您的前端工程代理服务正常；3、请确认您已在本地登录过应用平台');
            return { result: null };
        }
        if (response.code == '200') {
            if (successMsg) {
                Success(successMsg);
            }
            result.status = 'success';
            result.data = response.data;
            return { result: result };
        } else {
            Error('' + (response.message || 'request error'));
            result.status = 'error';
            return { result: result };
        }
    } catch (e) {
        return { result: result };
    }
};
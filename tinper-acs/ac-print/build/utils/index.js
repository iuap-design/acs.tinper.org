'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCookie = exports.processData = exports.Info = exports.Warning = exports.Error = exports.Success = undefined;

var _acTips = require('ac-tips');

var _acTips2 = _interopRequireDefault(_acTips);

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

var getCookie = exports.getCookie = function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == name + '=') {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('./utils/index');

var _request = require('./utils/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var localeObj = { //打印地址语言对应示例节点语言
    "zh_CN": 'cn',
    "en_US": 'en'
};

var Print = function () {
    function Print() {
        var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/demo-contract-server';
        var printOrigin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://u8cprint-daily.yyuap.com';
        var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
            getCodeError: '获取打印code失败',
            getTenantError: '获取租户id失败',
            checkDataFirst: '请先选择一条数据'
        };

        _classCallCheck(this, Print);

        this.context = context; //接口上下文
        this.printOrigin = printOrigin; //打印上下文
        this.GET_PRINT_CODE = context + '/contract/defaultprintcode'; //获得打印编码接口
        this.GET_TENANT = context + '/contract/session_context_info'; //获得租户信息接口
        this.tenantid = window.jDiworkContext && window.jDiworkContext.tenantId; //租户id
        this.locale = localeObj[(0, _index.getCookie)('locale')] || 'cn';
        this.localeLanguage = locale;
    }
    /**
     * 获取打印租户ID
     * @param {*} params
     */


    Print.prototype.requestTenant = function requestTenant(param) {
        return (0, _request2["default"])(this.GET_TENANT, {
            method: "get",
            param: param
        });
    };
    /**
     * 获取printcode
     * @param {*} params
     */


    Print.prototype.requestPrintCode = function requestPrintCode() {
        return (0, _request2["default"])(this.GET_PRINT_CODE, {
            method: "get"
        });
    };

    Print.prototype.printDesign = function printDesign(callback) {
        var _this = this;

        if (!this.tenantid) {
            this.requestTenant().then(function (res) {
                var _processData = (0, _index.processData)(res),
                    result = _processData.result;

                if (result.status == 'success') {
                    _this.tenantid = result.data.tenantId;
                    _this.requestPrintCode().then(function (ress) {
                        var resultt = (0, _index.processData)(ress).result;
                        if (resultt.status == 'success') {
                            var printCode = (0, _index.processData)(ress).result.data.printCode;
                            window.open(_this.printOrigin + '/u8cprint/design/getDesign?printcode=' + printCode + '&lang=' + _this.locale + '&tenantId=' + _this.tenantid + '&u8cServerCode=u8cServerCode&domainDataBaseByCode=0b3f7f67-78b9-485d-8d91-c871ab446ab9&currentMainClassCode=7c03a217-568e-4fa6-99ec-346d83cf09f2&meta=1');
                            callback && callback();
                        } else {
                            (0, _index.Error)(_this.localeLanguage.getCodeError);
                        }
                    });
                } else {
                    (0, _index.Error)(_this.localeLanguage.getTenantError);
                }
            });
        } else {
            this.requestPrintCode().then(function (ress) {
                var resultt = (0, _index.processData)(ress).result;
                if (resultt.status == 'success') {
                    var printCode = (0, _index.processData)(ress).result.data.printCode;
                    window.open(_this.printOrigin + '/u8cprint/design/getDesign?printcode=' + printCode + '&lang=' + _this.locale + '&tenantId=' + _this.tenantid + '&u8cServerCode=u8cServerCode&domainDataBaseByCode=0b3f7f67-78b9-485d-8d91-c871ab446ab9&currentMainClassCode=7c03a217-568e-4fa6-99ec-346d83cf09f2&meta=1');
                    callback && callback();
                } else {
                    (0, _index.Error)(_this.localeLanguage.getCodeError);
                }
            });
        }
    };

    Print.prototype.printView = function printView(dataId, callback) {
        var _this2 = this;

        var serverUrl = '' + window.location.origin + this.context + '/contract/dataForPrint';
        if (dataId) {
            if (!this.tenantid) {
                this.requestTenant().then(function (res) {
                    var _processData2 = (0, _index.processData)(res),
                        result = _processData2.result;

                    if (result.status == 'success') {
                        _this2.tenantid = result.data.tenantId;
                        _this2.requestPrintCode().then(function (ress) {
                            var resultt = (0, _index.processData)(ress).result;
                            if (resultt.status == 'success') {
                                var printCode = (0, _index.processData)(ress).result.data.printCode;
                                window.open(_this2.printOrigin + '/u8cprint/design/getPreview?printcode=' + printCode + '&lang=' + _this2.locale + '&tenantId=' + _this2.tenantid + '&serverUrl=' + serverUrl + '&params=' + encodeURIComponent(JSON.stringify({ id: dataId })) + '&sendType=6&mate=1&domainDataBaseByCode=0b3f7f67-78b9-485d-8d91-c871ab446ab9&classifyCode=2df7c250-aa00-4532-a8f4-80478f03e5a8');
                                callback && callback();
                            } else {
                                (0, _index.Error)(_this2.localeLanguage.getCodeError);
                            }
                        });
                    } else {
                        (0, _index.Error)(_this2.localeLanguage.getTenantError);
                    }
                });
            } else {
                this.requestPrintCode().then(function (ress) {
                    var resultt = (0, _index.processData)(ress).result;
                    if (resultt.status == 'success') {
                        var printCode = (0, _index.processData)(ress).result.data.printCode;
                        window.open(_this2.printOrigin + '/u8cprint/design/getPreview?printcode=' + printCode + '&lang=' + _this2.locale + '&tenantId=' + _this2.tenantid + '&serverUrl=' + serverUrl + '&params=' + encodeURIComponent(JSON.stringify({ id: dataId })) + '&sendType=6&mate=1&domainDataBaseByCode=0b3f7f67-78b9-485d-8d91-c871ab446ab9&classifyCode=2df7c250-aa00-4532-a8f4-80478f03e5a8');
                        callback && callback();
                    } else {
                        (0, _index.Error)(_this2.localeLanguage.getCodeError);
                    }
                });
            }
        } else {
            (0, _index.Error)(this.localeLanguage.checkDataFirst);
        }
    };

    return Print;
}();

exports["default"] = Print;
module.exports = exports['default'];
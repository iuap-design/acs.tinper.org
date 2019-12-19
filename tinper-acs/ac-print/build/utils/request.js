"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ucfRequest = require("ucf-request");

var _ucfRequest2 = _interopRequireDefault(_ucfRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = function (url, options) {
    return (0, _ucfRequest2["default"])(url, options).then(function (res) {
        return Promise.resolve(res);
    })["catch"](function (err) {
        return Promise.resolve(err);
    });
};

module.exports = exports["default"];
'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _fetchJsonp = require('fetch-jsonp');

var _fetchJsonp2 = _interopRequireDefault(_fetchJsonp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _promise2["default"](function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _promise2["default"].resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// interface Ajax{
//   url: string;
//   method?: string | 'get';
//   data?: object;
//   params?: object;
//   headers?: object;
//   jsonp?: boolean;
// }

function request(options) {
  return (0, _axios2["default"])({
    url: options.url,
    method: options.method || 'get',
    data: options.data || {},
    params: options.params || {},
    headers: options.headers || {}
  })["catch"](function (err) {
    console.log(err);
  });
};
var jsonp = function jsonp(url, params) {

  var data = (0, _keys2["default"])(params).map(function (item) {
    return item + '=' + params[item];
  }).join('&');

  return (0, _fetchJsonp2["default"])(url + '?' + data).then(function (response) {
    return response.json();
  }).then(function (json) {
    console.log('parsed json', json);
    return json;
  })["catch"](function (ex) {
    console.log('parsing failed', ex);
  });
};

exports["default"] = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2["default"].mark(function _callee(options) {
    var response, data, status, _options$params, params;

    return _regenerator2["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            response = void 0, data = {}, status = 200;
            _options$params = options.params, params = _options$params === undefined ? {} : _options$params;

            options.params = (0, _assign2["default"])(params, {
              tm: new Date().getTime()
            });

            if (!(options.jsonp == true)) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return jsonp(options.url, options.params);

          case 6:
            data = _context.sent;
            _context.next = 16;
            break;

          case 9:
            _context.next = 11;
            return request(options);

          case 11:
            response = _context.sent;

            if (response) {
              _context.next = 14;
              break;
            }

            return _context.abrupt('return');

          case 14:
            status = response.status;
            data = response.data;

          case 16:
            switch (status) {}
            return _context.abrupt('return', data);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
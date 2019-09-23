'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cb = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                   * @Descripttion: 
                                                                                                                                                                                                                                                                   * @version: 
                                                                                                                                                                                                                                                                   * @Date: 2019-08-12 17:53:16
                                                                                                                                                                                                                                                                   * @LastEditTime: 2019-08-16 19:38:32
                                                                                                                                                                                                                                                                   */

/**
* refer.jsx 文件是从filter 继承过来的
* 支持非react 框架渲染
*/
// import 'babel-polyfill'


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRedux = require('react-redux');

var _cube = require('@mdf/cube/lib/cube');

var _cube2 = _interopRequireDefault(_cube);

require('@mdf/cube/lib/helpers/polyfill');

var _UretailNotice = require('@mdf/metaui-web/lib/components/common/UretailNotice');

var _filter = require('@mdf/metaui-web/lib/components/filter');

var _filter2 = _interopRequireDefault(_filter);

var _refer = require('@mdf/metaui-web/lib/components/basic/refer');

var _refer2 = _interopRequireDefault(_refer);

var _refer3 = require('@mdf/metaui-web-ncc/lib/components/basic/refer');

var _refer4 = _interopRequireDefault(_refer3);

var _listrefer = require('@mdf/metaui-web/lib/components/basic/listrefer');

var _listrefer2 = _interopRequireDefault(_listrefer);

var _treerefer = require('@mdf/metaui-web/lib/components/basic/treerefer');

var _treerefer2 = _interopRequireDefault(_treerefer);

var _filterscheme = require('@mdf/metaui-web/lib/redux/filterscheme');

var _filterscheme2 = _interopRequireDefault(_filterscheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import './styles/default/filtercontainer.jsx'
// import './index.less';

var store = (0, _redux.createStore)((0, _redux.combineReducers)({
  filterscheme: _filterscheme2.default
}), {}, (0, _redux.applyMiddleware)(_reduxThunk2.default));

_cube2.default.utils.confirm = (0, _UretailNotice.UretailConfirm)();
_cube2.default.utils.alert = (0, _UretailNotice.UretailAlert)();
_cube2.default.rest.mode = 'xhr';
_cube2.default.utils.initSupport = function (modelName, model, config) {
  if (!config) {
    config = {};
  }
  if (!config.cols) {
    config.cols = 3;
  }
  if (modelName !== 'filter' && !config.modelconfig) {
    config.modelconfig = {};
  }
  var ThirdParty;
  switch (modelName) {
    case 'filter':
      ThirdParty = _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
          'div',
          { className: 'container-browse-mode' },
          _react2.default.createElement(
            'div',
            { className: 'listheadRow' },
            _react2.default.createElement(_filter2.default, { model: model, cols: config.cols })
          )
        )
      );
      break;
    case 'refer':
      ThirdParty = _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_refer4.default, _extends({ model: model }, config.modelconfig))
        )
      );
      break;
    case 'listrefer':
      ThirdParty = _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
          'div',
          { className: 'listheadRow' },
          _react2.default.createElement(_listrefer2.default, _extends({ model: model }, config.modelconfig))
        )
      );
      break;
    case 'treerefer':
      ThirdParty = _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
          'div',
          { className: 'listheadRow' },
          _react2.default.createElement(_treerefer2.default, _extends({ model: model }, config.modelconfig))
        )
      );
      break;
    default:
      ThirdParty = _react2.default.createElement('div', { className: 'no-support' });

  }

  return ThirdParty;
  //   ReactDOM.render(ThirdParty, dom);
};

var MdfRefer = function (_Component) {
  _inherits(MdfRefer, _Component);

  function MdfRefer(props) {
    _classCallCheck(this, MdfRefer);

    var _this = _possibleConstructorReturn(this, (MdfRefer.__proto__ || Object.getPrototypeOf(MdfRefer)).call(this, props));

    _this.afterOkClickMdfRefer = function (data) {
      var _this$props$config = _this.props.config,
          config = _this$props$config === undefined ? {} : _this$props$config;

      if (config.modelconfig) {
        var afterOkClick = config.modelconfig.afterOkClick;

        afterOkClick && afterOkClick(data);
      }
    };

    _this.afterValueChange = function (data) {
      //选中值之后更新value，为了适配form
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          _this$props$config2 = _this$props.config,
          config = _this$props$config2 === undefined ? {} : _this$props$config2,
          model = _this$props.model;

      onChange && onChange(data.value);
      if (config.modelconfig) {
        var afterValueChange = config.modelconfig.afterValueChange;

        afterValueChange && afterValueChange(data);
      }
    };

    _this.state = {};
    _this.afterOkClickMdfRefer = _this.afterOkClickMdfRefer.bind(_this);
    _this.afterValueChange = _this.afterValueChange.bind(_this);
    if (props.model) props.model._set_data('events', { afterValueChange: [{ callback: _this.afterValueChange }] });

    return _this;
  }

  _createClass(MdfRefer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      //初始化value，为了适配form
      var _props = this.props,
          model = _props.model,
          value = _props.value;

      if (!!value) model.setValue(value, true);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          modelName = _props2.modelName,
          model = _props2.model,
          config = _props2.config,
          wrapClassName = _props2.wrapClassName;

      if (!config) {
        config = {};
      }
      if (modelName !== 'filter' && !config.modelconfig) {
        config.modelconfig = {};
      }
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
          'div',
          { className: 'container-refer ' + (wrapClassName ? wrapClassName : '') },
          _react2.default.createElement(_refer4.default, _extends({ model: model }, config.modelconfig, {
            afterOkClick: this.afterOkClickMdfRefer
          }))
        )
      );
    }
  }]);

  return MdfRefer;
}(_react.Component);

exports.default = MdfRefer;
exports.cb = _cube2.default;
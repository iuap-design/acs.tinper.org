'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noData = require('./nc_Table/noData');

var _noData2 = _interopRequireDefault(_noData);

var _utils = require('./utils');

var _beeCollapse = require('bee-collapse');

var _beeCollapse2 = _interopRequireDefault(_beeCollapse);

var _hotkeys = require('./hotkeys');

var _hotkeys2 = _interopRequireDefault(_hotkeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var maxTop = 0;
var height = 0;

var FoldableTabs = function (_Component) {
  _inherits(FoldableTabs, _Component);

  function FoldableTabs(props) {
    _classCallCheck(this, FoldableTabs);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.changeActiveKey = function (item) {
      _this.props.handleTypeChange && _this.props.handleTypeChange(item.key);
    };

    var defaultActiveKey = props.tabs && props.tabs.length && props.tabs[0].key || '';
    _this.state = {
      showMore: props.showMore,
      activeKey: defaultActiveKey
    };
    return _this;
  }

  FoldableTabs.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _props = this.props,
        oldShowMore = _props.showMore,
        oldActiveKey = _props.activeKey;
    var newShowMore = nextProps.showMore,
        newActiveKey = nextProps.activeKey;

    if (newShowMore !== oldShowMore) {
      this.setState({
        showMore: newShowMore
      });
    }
    if (newActiveKey !== oldActiveKey) {
      this.setState({
        activeKey: newActiveKey
      });
    }
  };

  //控制主表收起展开
  FoldableTabs.prototype.toggleCardTable = function toggleCardTable() {
    var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var onHeadAngleToggle = this.props.onHeadAngleToggle;

    onHeadAngleToggle && onHeadAngleToggle(flag);
  };

  FoldableTabs.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        _props2$tabs = _props2.tabs,
        tabs = _props2$tabs === undefined ? [] : _props2$tabs,
        pageScope = _props2.pageScope,
        moduleId = _props2.moduleId,
        isEdit = _props2.isEdit,
        showListView = _props2.showListView,
        showMax = _props2.showMax,
        config = _props2.config,
        rows = _props2.rows,
        tableScope = _props2.tableScope,
        expandedList = _props2.expandedList;
    var _state = this.state,
        showMore = _state.showMore,
        activeKey = _state.activeKey;

    var visibleRows = rows.filter(function (item) {
      return item.status !== '3';
    }); // 界面显示行 分页新加
    var isShow = { display: showMore ? 'block' : 'none' };
    var iconClass = (0, _classnames2["default"])({
      'uf-triangle-right': !showMore,
      'uf-triangle-down': showMore
    });
    var style = showMax ? { style: { width: '100vw' } } : {}; //暂且这样吧  先加个 style={{width: "100vw"}}
    // TODO showMore的问题，，设计不要改来改去好不好。。。暂且这样吧  先加个 style={{width: "100vw"}}
    if (showMore && showListView) {
      var lightTabs_header = document.querySelector('#js_lightTabs_header_' + moduleId);
      var lightTabs = document.querySelector('#js_lightTabs_' + moduleId);
      if (lightTabs_header) {
        maxTop = lightTabs_header.getBoundingClientRect().height;
        height = lightTabs.getBoundingClientRect().height;
      }
    }
    return _react2["default"].createElement(
      'section',
      _extends({ className: 'light-tabs' }, style),
      _react2["default"].createElement(_hotkeys2["default"], {
        tabs: tabs,
        activeKey: activeKey,
        wrapperId: 'js_cardTable_' + moduleId,
        headerId: 'js_lightTabs_header_' + moduleId
      }),
      _react2["default"].createElement(
        'header',
        {
          className: (0, _classnames2["default"])('light-tabs-header cf', {
            'tabs-header-spread': showMore,
            'tabs-header-pack': !showMore
          }),
          id: 'js_lightTabs_header_' + moduleId
        },
        _react2["default"].createElement(
          'div',
          { className: 'light-tabs-header-tabs fl' },
          _react2["default"].createElement(
            'span',
            {
              className: (0, _classnames2["default"])('light-tabs-angle fl', {
                'angle-show': showMore
              }),
              onClick: function onClick() {
                //控制主表的收起展开
                _this2.toggleCardTable(!showMore);
              }
            },
            _react2["default"].createElement('span', { className: 'iconfont icon table-tabs-icon ' + iconClass })
          ),
          _react2["default"].createElement(
            'ul',
            {
              className: (0, _classnames2["default"])('tabs-wraps fl', {
                'single-tab': tabs.length <= 1
              })
            },
            tabs.map(function (item, i) {
              if (item.key === activeKey) {
                return _react2["default"].createElement(
                  'li',
                  { className: 'active' },
                  _react2["default"].createElement(
                    'a',
                    { href: 'javascript:;' },
                    item.label
                  ),
                  _react2["default"].createElement('span', null)
                );
              } else {
                return _react2["default"].createElement(
                  'li',
                  { onClick: _this2.changeActiveKey.bind(_this2, item) },
                  _react2["default"].createElement(
                    'a',
                    { href: 'javascript:;' },
                    item.label
                  )
                );
              }
            })
          )
        ),
        _react2["default"].createElement(
          'div',
          {
            className: (0, _classnames2["default"])('tabs-operation fr', {
              'tab-hide': !showMore
            })
          },
          isEdit || config && (0, _utils.isFunction)(config.hideSwitch) && !config.hideSwitch() || _react2["default"].createElement('span', {
            className: 'icon iconfont head-icon ' + (showListView ? 'icon-shituqiehuan' : 'icon-shituliebiaoqiehuan'),
            onClick: function onClick() {
              //最大化多表中表体卡片列表
              // pageScope.cardTable.openListView(moduleId, !showListView);
            }
          }),
          _react2["default"].createElement('span', {
            className: 'icon iconfont  head-icon ' + (showMax ? 'icon-zuixiaohua' : 'icon-zuidahua'),
            onClick: function onClick() {
              //最大化最小化
              // pageScope.cardTable.openMaxTable(moduleId, !showMax);
            }
          })
        ),
        config && config.tableHeadLeft && _react2["default"].createElement(
          'div',
          {
            className: (0, _classnames2["default"])('tabs-config fl', {
              'tab-hide': !showMore
            })
          },
          config.tableHeadLeft()
        ),
        config && config.tableHead && _react2["default"].createElement(
          'div',
          {
            className: (0, _classnames2["default"])('tabs-config fr', {
              'tab-hide': !showMore
            })
          },
          config.tableHead()
        )
      ),
      isEdit || config && (0, _utils.isFunction)(config.hideSwitch) && !config.hideSwitch() || (showMore && showListView ? _react2["default"].createElement(
        _beeCollapse2["default"],
        { 'in': showListView },
        _react2["default"].createElement(
          'div',
          {
            className: 'lightapp-component-cardTable-view',
            style: {
              maxHeight: showMax ? '93%' : '300px',
              minHeight: showMax ? '' : '300px',
              top: showMax ? maxTop + 8 : maxTop,
              width: showMax ? 'calc(100vw - 32px)' : '100%'
            }
          },
          _react2["default"].createElement(
            'ul',
            { className: 'card-table-expand-wraps' },
            visibleRows.length ? visibleRows.map(function (item) {
              return expandedList.call(tableScope, moduleId, item, pageScope);
            }) : _react2["default"].createElement(
              'li',
              { className: 'no-data-li' },
              _react2["default"].createElement(_noData2["default"], null)
            )
          )
        )
      ) : null),
      _react2["default"].createElement(
        'footer',
        { id: 'js_lightTabs_' + moduleId, className: 'light-tabs-content', style: isShow },
        tabs.map(function (item, i) {
          console.log(item.key, activeKey, '=====');
          if (item.key === activeKey) {
            return item.render();
          }
        })
      )
    );
  };

  return FoldableTabs;
}(_react.Component);

exports["default"] = FoldableTabs;
module.exports = exports['default'];
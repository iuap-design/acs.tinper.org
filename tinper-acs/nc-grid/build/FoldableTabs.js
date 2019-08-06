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

var _beeButton = require('bee-button');

var _beeButton2 = _interopRequireDefault(_beeButton);

var _beeButtonGroup = require('bee-button-group');

var _beeButtonGroup2 = _interopRequireDefault(_beeButtonGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var maxTop = 0;
var height = 0;

var propTypes = {
  showMore: PropTypes.bool, //是否展开详细信息
  isMaximized: PropTypes.bool, //是否最大化显示
  tabs: PropTypes.array //折叠区域左侧的 tabs 列表
};

var defaultProps = {
  addRow: function addRow() {},
  delRow: function delRow() {},
  pasteRow: function pasteRow() {}
};

var FoldableTabs = function (_Component) {
  _inherits(FoldableTabs, _Component);

  function FoldableTabs(props) {
    _classCallCheck(this, FoldableTabs);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.changeActiveKey = function (item) {
      _this.props.handleTypeChange && _this.props.handleTypeChange(item.key);
    };

    _this.getTableHead = function (toolBtns) {
      var rs = [];
      rs = toolBtns.map(function (item) {
        var value = item.value,
            bordered = item.bordered,
            itemtype = item.itemtype,
            btnSize = item.btnSize;

        var btn = void 0,
            className = item.className ? item.className : '';
        if (itemtype === 1 && item.children) {
          btn = _this.getBtnGroup(item);
        } else {
          btn = _react2["default"].createElement(
            _beeButton2["default"],
            _extends({ size: btnSize, bordered: bordered }, item, { className: className }),
            value
          );
        }
        return btn;
      });
      if (rs.length == 0) {
        return '';
      } else {
        return _react2["default"].createElement(
          'div',
          { className: 'shoulder-definition-area' },
          rs
        );
      }
    };

    _this.getBtnGroup = function (btns) {
      var _this$state = _this.state,
          inPaste = _this$state.inPaste,
          hasSelectedRows = _this$state.hasSelectedRows;
      var bordered = btns.bordered,
          btnSize = btns.btnSize;

      if (inPaste) {
        //复制行后，待粘贴状态
        return _react2["default"].createElement(
          'div',
          { className: 'in-paste-status' },
          _react2["default"].createElement(
            _beeButton2["default"],
            { size: btnSize, bordered: true, onClick: _this.props.pasteRow },
            '\u7C98\u8D34\u81F3\u672B\u884C'
          ),
          _react2["default"].createElement(
            _beeButton2["default"],
            { size: btnSize, bordered: true, onClick: _this.cancelPaste },
            '\u53D6\u6D88'
          )
        );
      } else {
        //初始状态。包含 '增行'/'删行'/'复制行'
        var btnGroupItems = btns.children.map(function (item, index) {
          return _react2["default"].createElement(
            _beeButton2["default"],
            {
              key: index,
              size: btnSize,
              bordered: bordered,
              disabled: index !== 0 && !hasSelectedRows,
              onClick: function onClick(e) {
                return _this.handleClickByOptType(e, item.operation);
              } },
            item.value
          );
        });
        return _react2["default"].createElement(
          _beeButtonGroup2["default"],
          null,
          btnGroupItems
        );
      }
    };

    _this.cancelPaste = function () {
      _this.setState({
        inPaste: false
      });
    };

    var defaultActiveKey = props.tabs && props.tabs.length && props.tabs[0].key || '';
    _this.state = {
      showMore: props.showMore,
      isMaximized: props.isMaximized,
      activeKey: defaultActiveKey,
      inPaste: false,
      hasSelectedRows: props.selectedList.length > 0 ? true : false
    };
    return _this;
  }

  FoldableTabs.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _props = this.props,
        oldShowMore = _props.showMore,
        oldActiveKey = _props.activeKey,
        oldIsMaximized = _props.isMaximized,
        oldSelectedList = _props.selectedList;
    var newShowMore = nextProps.showMore,
        newActiveKey = nextProps.activeKey,
        newIsMaximized = nextProps.isMaximized,
        newSelectedList = nextProps.selectedList;

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
    if (newIsMaximized !== oldIsMaximized) {
      this.setState({
        isMaximized: newIsMaximized
      });
    }
    if (newSelectedList !== oldSelectedList) {
      this.setState({
        hasSelectedRows: newSelectedList.length > 0 ? true : false
      });
    }
  };

  /**
   * 控制主表收起展开
   */
  FoldableTabs.prototype.toggleCardTable = function toggleCardTable() {
    var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var onHeadAngleToggle = this.props.onHeadAngleToggle;

    this.setState({
      showMore: flag
    });
    onHeadAngleToggle && onHeadAngleToggle(flag);
  };

  /**
   * 最大化多表中表格
   */


  FoldableTabs.prototype.openMaxTable = function openMaxTable(flag) {
    var openMaxTable = this.props.openMaxTable;

    openMaxTable && openMaxTable(flag);
  };
  //生成表头右侧操作栏

  //生成按钮组


  //根据 operation 的值选择相应的事件处理程序
  FoldableTabs.prototype.handleClickByOptType = function handleClickByOptType(eve, operation) {
    eve.stopPropagation();
    var _props2 = this.props,
        addRow = _props2.addRow,
        delRow = _props2.delRow;

    switch (operation) {
      case 'addRow':
        //增行
        addRow();
        break;
      case 'delRow':
        //删行
        delRow();
        break;
      case 'pasteRow':
        //复制粘贴行
        this.setState({
          inPaste: true
        });
        break;
      default:
        break;
    }
  };
  //取消复制行操作


  FoldableTabs.prototype.render = function render() {
    var _this2 = this;

    var _props3 = this.props,
        _props3$tabs = _props3.tabs,
        tabs = _props3$tabs === undefined ? [] : _props3$tabs,
        pageScope = _props3.pageScope,
        moduleId = _props3.moduleId,
        isEdit = _props3.isEdit,
        showListView = _props3.showListView,
        rows = _props3.rows,
        tableScope = _props3.tableScope,
        expandedList = _props3.expandedList,
        config = _objectWithoutProperties(_props3, ['tabs', 'pageScope', 'moduleId', 'isEdit', 'showListView', 'rows', 'tableScope', 'expandedList']);

    var _state = this.state,
        showMore = _state.showMore,
        activeKey = _state.activeKey,
        isMaximized = _state.isMaximized;
    // console.log('showMore',showMore);

    var visibleRows = rows.filter(function (item) {
      return item.status !== '3';
    }); // 界面显示行 分页新加
    var isShow = { display: showMore ? 'block' : 'none' };
    var iconClass = (0, _classnames2["default"])({
      'uf-triangle-right': !showMore,
      'uf-triangle-down': showMore
    });
    // const style = isMaximized ? { style: { width: '100vw' } } : {}; //暂且这样吧  先加个 style={{width: "100vw"}}
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
      { className: 'light-tabs' },
      _react2["default"].createElement(_hotkeys2["default"], {
        tabs: tabs,
        activeKey: activeKey,
        wrapperId: 'js_cardTable_' + moduleId,
        headerId: 'js_lightTabs_header_' + moduleId
      }),
      _react2["default"].createElement(
        'div',
        { className: 'light-tabs-background' },
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
            _react2["default"].createElement('span', {
              className: 'icon iconfont  head-icon ' + (isMaximized ? 'uf-minimize' : 'uf-maxmize'),
              onClick: function onClick() {
                //最大化最小化
                _this2.openMaxTable(!isMaximized);
                // pageScope.cardTable.openMaxTable(moduleId, !isMaximized);
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
            this.getTableHead(config.tableHead)
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
                maxHeight: isMaximized ? '93%' : '300px',
                minHeight: isMaximized ? '' : '300px',
                top: isMaximized ? maxTop + 8 : maxTop,
                width: isMaximized ? 'calc(100vw - 32px)' : '100%'
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
            if (item.key === activeKey) {
              return item.render();
            }
          })
        )
      )
    );
  };

  return FoldableTabs;
}(_react.Component);

exports["default"] = FoldableTabs;
module.exports = exports['default'];
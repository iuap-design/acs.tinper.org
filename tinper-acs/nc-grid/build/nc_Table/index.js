'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _beeTable = require('bee-table');

var _beeTable2 = _interopRequireDefault(_beeTable);

var _bigData = require('bee-table/build/lib/bigData');

var _bigData2 = _interopRequireDefault(_bigData);

var _dragColumn = require('bee-table/build/lib/dragColumn.js');

var _dragColumn2 = _interopRequireDefault(_dragColumn);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
//import Nodata from './noData';


var DragTable = (0, _dragColumn2["default"])(_beeTable2["default"]);
var BigDataTable = (0, _bigData2["default"])(DragTable);

var NCTable = function (_Component) {
  _inherits(NCTable, _Component);

  function NCTable(props) {
    _classCallCheck(this, NCTable);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.haveScrollbar = function () {
      var outbody = document.querySelector('.total-table-wrapper > .u-table-content > .u-table-scroll > div:not(.u-table-footer) .u-table-body');
      if (outbody) {
        var innerbody = outbody.querySelector('.u-table-tbody');

        if (innerbody.getBoundingClientRect().height > outbody.getBoundingClientRect().height) {
          _this.scrollbar = true;
        } else {
          _this.scrollbar = false;
        }
      }
    };

    _this.fixedCol = function (columns) {
      _this.haveFixedCol = columns.some(function (item) {
        return item.fixed == 'right';
      });
    };

    _this.handleScroll = function () {
      if (_this.table) {
        var _this$table$getBoundi = _this.table.getBoundingClientRect(),
            top = _this$table$getBoundi.top,
            height = _this$table$getBoundi.height,
            left = _this$table$getBoundi.left;

        if (top < 0 && top > -height) {
          _this.headerFixed = true;
          _this.left = left;
        } else {
          _this.headerFixed = false;
        }
        if (_this.state.headerFixed !== _this.headerFixed) {
          _this.setState({
            headerFixed: _this.headerFixed
          });
        }
      }
    };

    _this.noData = function () {
      var json = _this.state.json;

      return _react2["default"].createElement(
        'div',
        { className: 'no-data-placeholder' },
        _react2["default"].createElement('i', { className: 'no-data' }),
        _react2["default"].createElement(
          'span',
          { className: 'no-data-title' },
          json['base-table-0001']
        )
      );
    };

    _this.onDropBorder = function () {
      var totalColums = _this.state.totalColums;

      var th = _this.table.querySelectorAll('.u-table-scroll .u-table-header colgroup col');
      if (totalColums) {
        totalColums.map(function (item, index) {
          item.width = th[index].style.width;
        });
      }
      _this.setState({
        totalColums: totalColums
      });
    };

    _this.handleFooter = function () {
      var totalData = _this.props.totalData;

      return _react2["default"].createElement(_beeTable2["default"], {
        className: 'total-row ' + (_this.scrollbar && !_this.haveFixedCol && 'fix-total-scroll'),
        height: 35,
        ref: function ref(dom) {
          _this.total = _reactDom2["default"].findDOMNode(dom);
        },
        rowKey: 'total',
        data: totalData,
        columns: [].concat(_toConsumableArray(_this.state.totalColums)),
        showHeader: false,
        headerScroll: false
      });
    };

    _this.state = {
      columns: props.columns,
      prevWidth: 0,
      json: {},
      totalColums: props.totalColums || []
    };
    /***获取当前浏览器类型*/
    _this.myBrowser = (0, _utils2["default"])();
    _this.haveFixedCol = true;
    _this.scrollbar = true;
    return _this;
  }

  NCTable.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var callback = function callback(json, bool) {
      if (bool) {
        _this2.setState({ json: json }, function () {
          //console.log('多语加载完成')
        });
      }
    };
    // getPlatformLang({ moduleId: 'base_table', callback });
  };

  NCTable.prototype.componentDidMount = function componentDidMount() {
    this.props.fixedHeader && document.addEventListener('scroll', this.handleScroll);
    // this.calcFixed(this.props);
    /*合计行start*/
    var _props = this.props,
        isTotal = _props.isTotal,
        columns = _props.columns; //最新优化

    if (isTotal) {
      //最新优化
      var bodyArea = this.table && this.table.querySelector('.u-table-body');
      var headerArea = this.table && this.table.querySelector('.u-table-content .u-table-scroll .u-table-header');
      var totalArea = this.total && this.total.querySelector('.u-table-body');
      headerArea = headerArea || bodyArea;
      // console.log(bodyArea,headerArea,totalArea)
      if (bodyArea) {
        bodyArea.addEventListener('scroll', function () {
          // 表体滚动条事件
          if (totalArea) totalArea.scrollLeft = bodyArea.scrollLeft;
        });
      }
      if (totalArea) {
        totalArea.addEventListener('scroll', function () {
          //合计行滚动条事件
          bodyArea.scrollLeft = totalArea.scrollLeft;
          headerArea.scrollLeft = totalArea.scrollLeft;
          // console.log(bodyArea, headerArea, totalArea)
        });
      }
      if (headerArea) {
        headerArea.addEventListener('scroll', function () {
          //表头滚动条事件
          try {
            if (totalArea) totalArea.scrollLeft = headerArea.scrollLeft;
          } catch (e) {
            console.warn(e);
          }
        });
      }
      //最新优化
    }
    /*合计行end */
  };

  /***判断是否有滚动条***/


  /***判断是否有右侧固定列*/


  NCTable.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // addEventListener
    this.props.fixedHeader && document.addEventListener('scroll', this.handleScroll);
    var isTotal = this.props.isTotal; //最新优化

    var bodyArea = this.table && this.table.querySelector('.u-table-body');
    var headerArea = this.table && this.table.querySelector('.u-table-content .u-table-scroll .u-table-header');
    var totalArea = this.total && this.total.querySelector('.u-table-body');
    if (isTotal) {
      //最新优化
      if (bodyArea) {
        bodyArea.addEventListener('scroll', function () {
          // 表体滚动条事件
          if (totalArea) totalArea.scrollLeft = bodyArea.scrollLeft;
        });
      }
      if (totalArea) {
        totalArea.addEventListener('scroll', function () {
          //合计行滚动条事件
          bodyArea.scrollLeft = totalArea.scrollLeft;
          headerArea.scrollLeft = totalArea.scrollLeft;
          // console.log(bodyArea, headerArea, totalArea)
        });
      }
      if (headerArea) {
        headerArea.addEventListener('scroll', function () {
          //表头滚动条事件
          try {
            if (totalArea) totalArea.scrollLeft = headerArea.scrollLeft;
          } catch (e) {
            console.warn(e);
          }
        });
      }
      //最新优化
    } else {
      if (bodyArea) {
        bodyArea.addEventListener('scroll', null);
      }
      if (totalArea) {
        totalArea.addEventListener('scroll', null);
      }
      if (headerArea) {
        headerArea.addEventListener('scroll', null);
      }
    }
  };

  NCTable.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
    var _this3 = this;

    newProps.fixedHeader && document.addEventListener('scroll', this.handleScroll);
    var isTotal = newProps.isTotal,
        totalColums = newProps.totalColums;
    //用于解决合计行colums的问题，把props中的赋给state

    var totalflag = false;
    if (totalColums) {
      if (this.props.totalColums) {
        if (this.props.totalColums.length == totalColums.length) {
          totalColums.map(function (item, index) {
            if (item.width && _this3.props.totalColums[index] && _this3.props.totalColums[index].width && item.width != _this3.props.totalColums[index].width) {
              totalflag = true;
            }
          });
        } else {
          totalflag = true;
        }
      } else {
        totalflag = true;
      }
      if (totalflag) {
        this.state.totalColums = totalColums;
      }
      var bodyArea = this.table && this.table.querySelector('.u-table-body');
      var headerArea = this.table && this.table.querySelector('.u-table-content .u-table-scroll .u-table-header');
      var totalArea = this.total && this.total.querySelector('.u-table-body');
      if (isTotal) {
        //最新优化
        if (bodyArea) {
          bodyArea.addEventListener('scroll', function () {
            // 表体滚动条事件
            if (totalArea) {
              totalArea.scrollLeft = bodyArea.scrollLeft;
            }
          });
        }
        if (totalArea) {
          totalArea.addEventListener('scroll', function () {
            //合计行滚动条事件
            if (bodyArea) {
              bodyArea.scrollLeft = totalArea.scrollLeft;
            }
            if (headerArea) {
              headerArea.scrollLeft = totalArea.scrollLeft;
            }
          });
        }
        if (headerArea) {
          headerArea.addEventListener('scroll', function () {
            //表头滚动条事件
            if (totalArea) {
              totalArea.scrollLeft = headerArea.scrollLeft;
            }
          });
        }
        //最新优化
      } else {
        if (bodyArea) {
          bodyArea.addEventListener('scroll', null);
        }
        if (totalArea) {
          totalArea.addEventListener('scroll', null);
        }
        if (headerArea) {
          headerArea.addEventListener('scroll', null);
        }
      }
    }
  };

  NCTable.prototype.componentWillUnmount = function componentWillUnmount() {
    this.props.fixedHeader && document.removeEventListener('scroll', this.handleScroll);
    var bodyArea = this.table && this.table.querySelector('.u-table-body');
    var headerArea = this.table && this.table.querySelector('.u-table-content .u-table-scroll .u-table-header');
    var totalArea = this.total && this.total.querySelector('.u-table-body');
    if (bodyArea) {
      bodyArea.addEventListener('scroll', null);
    }
    if (totalArea) {
      totalArea.addEventListener('scroll', null);
    }
    if (headerArea) {
      headerArea.addEventListener('scroll', null);
    }
  };

  NCTable.prototype.render = function render() {
    var _this4 = this;

    var _props2 = this.props,
        totalData = _props2.totalData,
        totalColums = _props2.totalColums,
        isTotal = _props2.isTotal,
        fixedContainer = _props2.fixedContainer,
        className = _props2.className,
        data = _props2.data,
        scroll = _props2.scroll,
        _props2$isDrag = _props2.isDrag,
        isDrag = _props2$isDrag === undefined ? true : _props2$isDrag,
        _props2$lazyload = _props2.lazyload,
        lazyload = _props2$lazyload === undefined ? true : _props2$lazyload,
        _props2$isTree = _props2.isTree,
        isTree = _props2$isTree === undefined ? false : _props2$isTree;

    var multiHeader = Array.isArray(this.props.columns) && this.props.columns.some(function (e) {
      return Array.isArray(e.children) && e.children.length;
    }),
        dragborder = isDrag && !multiHeader;
    var ThisTable = lazyload && scroll && scroll.y ? BigDataTable : DragTable;
    var tableHaveData = Array.isArray(data) && data.length;
    this.fixedCol(this.props.columns);
    return [this.state.headerFixed && _reactDom2["default"].createPortal(_react2["default"].createElement(_beeTable2["default"], {
      ref: function ref(dom) {
        _this4.fixedTableHeader = _reactDom2["default"].findDOMNode(dom);
      },
      className: 'fixed-table-header',
      columns: [].concat(_toConsumableArray(this.state.columns)),
      data: [],
      style: {
        position: 'fixed',
        top: 0,
        left: this.left,
        width: this.table && this.table.offsetWidth,
        zIndex: 300
      },
      emptyText: function emptyText() {
        return null;
      },
      scroll: this.props.scroll,
      onDropBorder: this.onDropBorder
      // originWidth={true}
    }), fixedContainer), _react2["default"].createElement(ThisTable, _extends({
      loadBuffer: 2,
      isTree: isTree,
      dragborder: dragborder,
      ref: function ref(dom) {
        if (dom) {
          _this4.table = _reactDom2["default"].findDOMNode(dom);
          _this4.haveScrollbar();
        }
      },
      className: 'nc-table ' + (multiHeader || dragborder ? 'border-table-head-wrapper' : '') + ' ' + (isTotal ? 'total-table-wrapper' : '') + ' ' + (tableHaveData ? 'nc-table-data' : isTotal ? 'nc-table-body-scroll' : '') + '  ' + (dragborder && 'nc-drag-border') + '  ' + ((this.myBrowser == 'IE' || this.myBrowser == 'Firefox') && 'IE-fix') + ' ' + className
      //如果页面没有数据，则不显示合计行 liuming 2019/2/19
      , footer: isTotal && this.handleFooter,
      bodyStyle: { minHeight: '160px' }
    }, this.props, {
      headerScroll: tableHaveData ? false : isTotal ? false : true
      // columns={[ ...this.state.columns ]}
      // emptyText={Nodata}
      , emptyText: this.noData,
      onDropBorder: this.onDropBorder
      // originWidth={true}
    }))];
  };

  return NCTable;
}(_react.Component);

exports["default"] = NCTable;


NCTable.defaultProps = {
  fixedContainer: document.body
};
module.exports = exports['default'];
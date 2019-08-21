'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nc_Table = require('./nc_Table');

var _nc_Table2 = _interopRequireDefault(_nc_Table);

var _beeSelect = require('bee-select');

var _beeSelect2 = _interopRequireDefault(_beeSelect);

var _beeTooltip = require('bee-tooltip');

var _beeTooltip2 = _interopRequireDefault(_beeTooltip);

var _beeCheckbox = require('bee-checkbox');

var _beeCheckbox2 = _interopRequireDefault(_beeCheckbox);

var _beePagination = require('bee-pagination');

var _beePagination2 = _interopRequireDefault(_beePagination);

var _beeIcon = require('bee-icon');

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _sort = require('bee-table/build/lib/sort.js');

var _sort2 = _interopRequireDefault(_sort);

var _multiSelect = require('bee-table/build/lib/multiSelect.js');

var _multiSelect2 = _interopRequireDefault(_multiSelect);

var _utils = require('./utils');

var _ExportExcel = require('./ExportExcel');

var _ExportExcel2 = _interopRequireDefault(_ExportExcel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * SimpleTable
                                                                                                                                                                                                                   */

var Option = _beeSelect2["default"].Option;
// 最大页码数
var MAX_BUTTONS = 5;

var propTypes = _defineProperty({
  isMultipleHead: PropTypes.bool, //是否为多表头
  data: PropTypes.array, //传入的表格数据
  columns: PropTypes.array, //表格列
  totalData: PropTypes.array, //合计行数据
  totalColums: PropTypes.array, //合计行列配置
  pageIndexChange: PropTypes.func, //分页回调
  showPagination: PropTypes.bool, //是否显示分页
  pageSizeChange: PropTypes.func, //分页回调
  config: PropTypes.object, //Table 配置项
  pageInfo: PropTypes.object, //分页信息
  multiSelect: PropTypes.bool, //多选功能
  sheetIsRowFilter: PropTypes.bool,
  sheetName: PropTypes.string,
  exportData: PropTypes.array
}, 'exportData', []);

var defaultProps = {
  isMultipleHead: false,
  config: {},
  data: [],
  multiSelect: true,
  json: {
    table_pagination001: '页',
    table_pagination002: '共',
    table_pagination003: '条'
  },
  sheetIsRowFilter: false, //是否要设置行样式，是否遍历
  sheetName: "sheet" //导出表格的name
};

var SimpleTable = function (_Component) {
  _inherits(SimpleTable, _Component);

  function SimpleTable(props) {
    _classCallCheck(this, SimpleTable);

    var _this2 = _possibleConstructorReturn(this, _Component.call(this, props));

    _this2.exportExcel = function () {
      var _this2$props = _this2.props,
          sheetIsRowFilter = _this2$props.sheetIsRowFilter,
          sheetName = _this2$props.sheetName,
          _sheetHeader = _this2$props.sheetHeader,
          exportData = _this2$props.exportData,
          exportFileName = _this2$props.exportFileName;

      var colsAndTablePros = _this2.getColumnsAndTablePros();
      var sheetHeader = [],
          columnAttr = [],
          rowAttr = [],
          sheetFilter = [];
      colsAndTablePros.columns.forEach(function (column) {

        var _show = false,
            _hidden = false;
        if (column.ifshow != undefined && column.ifshow === false) {
          _show = true;
        }
        // _hidden = _exportHidden?column.exportHidden:_show //column.exportHidden // column.excelHidden === false ? true : false
        _hidden = column.exportHidden ? true : _show;
        if (!_hidden) {
          var _width = String(column.width).indexOf("%") != -1 ? 100 : column.width;
          columnAttr.push({
            wpx: _width
          });
          var _cloum = column.exportKey ? column.exportKey : column.dataIndex;
          sheetFilter.push(_cloum);
          sheetHeader.push(column.title);
        }
      });
      if (_sheetHeader) {
        rowAttr.push(_this2.getItem(_sheetHeader));
      }
      if (sheetIsRowFilter) {
        _this2.getRowList(colsAndTablePros.tablePros.data);
      }
      var option = {
        datas: [{
          fileName: exportFileName,
          sheetData: exportData,
          sheetName: sheetName,
          sheetFilter: sheetFilter,
          sheetHeader: sheetHeader,
          columnAttr: columnAttr,
          rowAttr: rowAttr
        }]
      };
      var toExcel = new _ExportExcel2["default"](option, exportFileName);
      toExcel.saveExcel();
    };

    _this2.getColumnsAndTablePros = function () {
      var columns = _this2.props.columns.slice();

      if (_this2.dragColsData) {
        var dragColsKeyArr = Object.keys(_this2.dragColsData);
        dragColsKeyArr.some(function (itemKey) {
          columns.forEach(function (col) {
            if (col.dataIndex == itemKey) {
              col.width = _this2.dragColsData[itemKey].width;
              return true;
            }
          });
        });
      }
      var rs = {
        columns: columns,
        tablePros: _this2.props
      };
      return rs;
    };

    var ComplexTable = (0, _sort2["default"])(_nc_Table2["default"], _beeIcon2["default"]);
    if (typeof props.multiSelect === 'boolean' && !!props.multiSelect) {
      ComplexTable = (0, _multiSelect2["default"])(ComplexTable, _beeCheckbox2["default"]);
    }
    _this2.state = {
      currentIndex: -1,
      json: props.json
    };
    _this2.table = {};
    _this2.ComplexTable = ComplexTable;
    return _this2;
  }

  /**把index行设置为选中行 */


  SimpleTable.prototype.focusRowByIndex = function focusRowByIndex(index) {
    this.setState({
      currentIndex: index
    });
  };
  /**设置当前点击行 */


  SimpleTable.prototype.setClickRowIndex = function setClickRowIndex(record, index) {
    var data = { record: record, index: index };
    this.table.currentkInfo = data;
  };

  /**Excel 导出 */


  /**
   * 获取所有列以及table属性值
   */


  /**创建表格主体 */
  SimpleTable.prototype.creatTable = function creatTable() {
    var _this = this;
    var props = this.props;
    var testConf = props.testConf,
        dataRows = props.data,
        columns = props.columns,
        totalData = props.totalData,
        totalColums = props.totalColums,
        isTotal = props.isTotal,
        pageIndexChange = props.pageIndexChange,
        moduleId = props.moduleId,
        config = props.config,
        showPagination = props.showPagination,
        pageSizeChange = props.pageSizeChange,
        isMultipleHead = props.isMultipleHead,
        lazyload = props.lazyload,
        focusIndex = props.focusIndex,
        pageInfo = props.pageInfo;
    var _this$state = _this.state,
        currentIndex = _this$state.currentIndex,
        json = _this$state.json;


    var screenWidth = window.screen.width || 768;
    var rowHeight = 30; //表格行高
    var tableMaxHeight = 310; //表体最小高度
    // if (screenWidth <= 1440) {
    //   tableMaxHeight = 40 * 10 + 10;
    //   rowHeight = 40;
    // } else if (screenWidth > 1440 && screenWidth < 1920) {
    //   tableMaxHeight = 48 * 10 + 10;
    //   rowHeight = 48;
    // } else if (screenWidth >= 1920) {
    //   tableMaxHeight = 56 * 10 + 10;
    //   rowHeight = 56;
    // }

    // 后端排序和前端排序, 不传config.sort就走前端排序的sort逻辑
    var sort = config.sort ? { sort: config.sort } : {
      sort: {
        mode: 'single',
        backSource: false,
        sortFun: function sortFun(sortParam, sortData) {
          var sortObj = {};
          var sortRows = [];
          var rows = _this.myTable[moduleId].state.table.rows;
          sortParam.forEach(function (item) {
            sortObj[item.field] = item;
          });
          // 处理排序多表头
          (0, _utils.getSortColums)({ colums: _this.state.meta[moduleId].items, sortObj: sortObj });
          sortData.forEach(function (data) {
            rows.forEach(function (row) {
              if (data.key === row.rowId) {
                sortRows.push(row);
              }
            });
          });
          _this.myTable[moduleId].setState({
            table: _extends({}, _this.myTable[moduleId].state.table, { rows: sortRows })
          });
        }
      }
    };
    // bodyStyle
    var tableHight = config && config.height ? { height: config.height } : { minHeight: tableMaxHeight + 'px' };
    //表格body默认高度
    var bodyHeight = config && config.height ? config.height : tableMaxHeight + 'px';
    var regex = new RegExp('px');
    bodyHeight = String(bodyHeight).replace(regex, '');
    //表格渲染所有行的行高
    var rowsHeight = dataRows.length * rowHeight;
    var ComplexTable = this.ComplexTable;
    return _react2["default"].createElement(
      'div',
      { className: 'lightapp-component-simpleTable' },
      _react2["default"].createElement(
        'div',
        _extends({ className: 'simpleTable-component-wrapper' }, testConf),
        _react2["default"].createElement(
          'div',
          {
            className: (isMultipleHead ? ' multiple-head-border ' : '') + ' ' + (rowsHeight <= bodyHeight ? 'clear-right-scrollBar' : '')
          },
          _react2["default"].createElement(ComplexTable, _extends({
            isTotal: isTotal,
            isDrag: config && config.isDrag,
            height: config && !config.multipleRowCell && rowHeight,
            headerHeight: isMultipleHead ? undefined : 30,
            totalData: totalData,
            totalColums: totalColums,
            data: dataRows,
            columns: columns
            // 解决增行不聚焦问题
            , currentIndex: focusIndex,
            bodyStyle: _extends({}, tableHight),
            lazyload: lazyload,
            useFixedHeader: true,
            scroll: {
              x: true,
              y: config && config.height ? config.height : tableMaxHeight
            },
            haveExpandIcon: function haveExpandIcon() {
              return true;
            },
            rowClassName: function rowClassName(record, current, indent) {
              if (record._checked || currentIndex === current) {
                return 'simpleTable-selected-row';
              } else {
                return '';
              }
            },
            onRowClick: function onRowClick(record, index, e) {
              // 行点击操作 1、根据index设置行样式 2、自定义点击事件
              _this.focusRowByIndex(index);
              _this.setClickRowIndex(record, index);
              if (config && typeof config.onRowClick === 'function') {
                config.onRowClick.call(_this, _extends({}, _this.props, _this.output), moduleId, record, index, e);
              }
            },
            onRowDoubleClick: function onRowDoubleClick(record, index, e) {
              _this.focusRowByIndex(index);
              _this.setClickRowIndex(record, index);
              //行双击的方法 判断配置文件是否有，并且config.onRowDoubleClick是否是函数 
              if (config && config.onRowDoubleClick && typeof config.onRowDoubleClick === 'function') {
                config.onRowDoubleClick.call(_this, record, index, _extends({}, _this.props, _this.output), e);
              }
            }
          }, props))
        )
      ),
      showPagination && _react2["default"].createElement(
        'div',
        { className: 'simpleTable-component-paginationDiv' },
        _react2["default"].createElement(
          'div',
          { className: 'page-size' },
          _react2["default"].createElement(
            _beeSelect2["default"],
            {
              value: String(pageInfo.pageSize),
              style: { width: 85 },
              onSelect: function onSelect(val) {
                pageSizeChange.call(_this, val);
              },
              className: 'fl',
              showClear: false
            },
            _react2["default"].createElement(
              Option,
              { value: '10' },
              _react2["default"].createElement(
                _beeTooltip2["default"],
                {
                  className: 'tooltip-word-color',
                  placement: 'top',
                  inverse: true,
                  delay: 1,
                  overlay: '10' + json['table_pagination003'] + '/' + json['table_pagination001']
                },
                _react2["default"].createElement(
                  'div',
                  { className: 'select-single-line-and-ellipsis' },
                  '10' + json['table_pagination003'] + '/' + json['table_pagination001']
                )
              )
            ),
            _react2["default"].createElement(
              Option,
              { value: '20' },
              _react2["default"].createElement(
                _beeTooltip2["default"],
                {
                  className: 'tooltip-word-color',
                  placement: 'top',
                  inverse: true,
                  delay: 1,
                  overlay: '20' + json['table_pagination003'] + '/' + json['table_pagination001']
                },
                _react2["default"].createElement(
                  'div',
                  { className: 'select-single-line-and-ellipsis' },
                  '20' + json['table_pagination003'] + '/' + json['table_pagination001']
                )
              )
            ),
            _react2["default"].createElement(
              Option,
              { value: '50' },
              _react2["default"].createElement(
                _beeTooltip2["default"],
                {
                  className: 'tooltip-word-color',
                  placement: 'top',
                  inverse: true,
                  delay: 1,
                  overlay: '50' + json['table_pagination003'] + '/' + json['table_pagination001']
                },
                _react2["default"].createElement(
                  'div',
                  { className: 'select-single-line-and-ellipsis' },
                  '50' + json['table_pagination003'] + '/' + json['table_pagination001']
                )
              )
            ),
            _react2["default"].createElement(
              Option,
              { value: '100' },
              _react2["default"].createElement(
                _beeTooltip2["default"],
                {
                  className: 'tooltip-word-color',
                  placement: 'top',
                  inverse: true,
                  delay: 1,
                  overlay: '100' + json['table_pagination003'] + '/' + json['table_pagination001']
                },
                _react2["default"].createElement(
                  'div',
                  { className: 'select-single-line-and-ellipsis' },
                  '100' + json['table_pagination003'] + '/' + json['table_pagination001']
                )
              )
            )
          ),
          !!+pageInfo.total && _react2["default"].createElement(
            'span',
            { className: 'fl NC_total' },
            json['table_pagination002'] + ' ' + pageInfo.total + ' ' + json['table_pagination003'],
            ' '
          )
        ),
        _react2["default"].createElement(
          'div',
          { className: 'table-pagination' },
          _react2["default"].createElement(_beePagination2["default"], {
            className: 'NC_PaginationStyle',
            prev: true,
            next: true,
            boundaryLinks: true,
            gap: true,
            items: Number(pageInfo.totalPage || 1),
            maxButtons: Number(pageInfo.totalPage || 1) === 7 ? 6 : MAX_BUTTONS,
            activePage: Number(pageInfo.pageIndex),
            onSelect: function onSelect(val) {
              pageIndexChange.call(_this, val);
            }
          })
        )
      )
    );
  };

  SimpleTable.prototype.render = function render() {
    return _react2["default"].createElement(
      'div',
      null,
      this.creatTable()
    );
  };

  return SimpleTable;
}(_react.Component);

SimpleTable.propTypes = propTypes;
SimpleTable.defaultProps = defaultProps;
exports["default"] = SimpleTable;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nc_Table = require('./nc_Table');

var _nc_Table2 = _interopRequireDefault(_nc_Table);

var _beeIcon = require('bee-icon');

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _beeSelect = require('bee-select');

var _beeSelect2 = _interopRequireDefault(_beeSelect);

var _beeCheckbox = require('bee-checkbox');

var _beeCheckbox2 = _interopRequireDefault(_beeCheckbox);

var _Cell = require('./Cell');

var _Cell2 = _interopRequireDefault(_Cell);

var _utils = require('./utils');

var _sort = require('bee-table/build/lib/sort.js');

var _sort2 = _interopRequireDefault(_sort);

var _multiSelect = require('bee-table/build/lib/multiSelect.js');

var _multiSelect2 = _interopRequireDefault(_multiSelect);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  ***************   前 言   ***************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  1、此类表格适用于 “单表”  特点：无分页，表头固定，有横向和纵向的滚动条。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  1、visible 为false或者没有visible属性当前列不显示，只有为ture才显示
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *	2、新增的操作列需要有 itemtype: 'customer'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var propTypes = {
    moduleId: PropTypes.string, //meta的id号
    config: PropTypes.object, //表格配置项
    isEdit: PropTypes.bool //true为编辑态
};

var defaultProps = {
    config: {},
    isEdit: false

    // 页面级别配置项
};var _DEFAULT = {
    // node执行环境是否是test
    // test_env: NODE_ENV === 'test',
    // 是否是多表头
    isMultipleHead: false
    // 做个开关，1期EditTable的快捷键不上线
    // tabindex: NODE_ENV === 'development' ? '0' : '-1'
};

var EditTable = function (_Component) {
    _inherits(EditTable, _Component);

    function EditTable(props) {
        _classCallCheck(this, EditTable);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.getTableRows = function () {
            var rows = _this.state.table.rows;
            var getTableRows = _this.props.getTableRows;

            getTableRows && getTableRows(rows);
        };

        _this.addRow = function (index, data) {
            var autoFocus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
            var callback = arguments[3];
            var flag = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
            var isAutoAddRow = arguments[5];

            // if (addRowControl(isAutoAddRow)) return;
            var myCardTable = _this.state.table;

            var rows = myCardTable.rows;
            //根据id获取表格中所有(可见)的行的数量
            var getVisibleRows = (0, _utils.isArray)(rows) && rows.filter(function (item) {
                return item.status != _config2["default"].status["delete"];
            });
            var len = getVisibleRows.length || 1;
            var numFlag = (0, _utils.isUndefined)(index) || !Number.isNaN(Number.parseInt(index, 10)) && index >= 0 && index <= len;
            if (numFlag) {
                index = (0, _utils.isUndefined)(index) ? len : index;
                // 当前应该聚焦到的行
                // setStatus.call(this, tableId, 'edit');
                // myCardScope.state.status = 'edit';
                var newRow = {
                    rowid: String(new Date().getTime()).slice(-5) + Math.random().toString(12),
                    status: _config2["default"].status.add,
                    values: {}
                };
                // let sumItems = _sumItemsCode.call(this, tableId, flag);
                var template = rows.length > 0 && (0, _utils.isObj)(rows[0].values) && rows[0].values;
                var sumItems = {};
                Object.keys(template).forEach(function (key) {
                    var item = template[key];
                    sumItems[key] = {
                        attrcode: key,
                        initialvalue: item.initialvalue,
                        itemtype: item.itemtype
                    };
                });
                Object.keys(sumItems).forEach(function (key) {
                    var item = sumItems[key];
                    // hasData 有data，那么走data   无data再看hasInit看是否有初始值
                    var _ref = [item.attrcode, (0, _utils.isObj)(data), (0, _utils.isObj)(item.initialvalue)],
                        code = _ref[0],
                        hasData = _ref[1],
                        hasInit = _ref[2];

                    var checkData = hasData && (0, _utils.isObj)(data[code]);
                    newRow.values[code] = {
                        display: checkData ? data[code].display : hasInit ? item.initialvalue.display : null,
                        scale: checkData ? data[code].scale : hasInit ? item.initialvalue.scale : null,
                        value: checkData ? data[code].value : hasInit ? item.initialvalue.value : (0, _utils.typeFormat)(null, item.itemtype)
                    };
                });
                // 规整数据
                _this._reviseRows(rows);
                rows.splice(index, 0, newRow);
                myCardTable.focusIndex = -1;
                // console.log('rows',rows)
                // debugger

                // 控制增行后的行定位
                myCardTable.focusIndex = index === 0 ? index : index + 1; //修改tab切换不到新增行问题renyjk
                _this.setState({
                    table: myCardTable
                });
            }
        };

        _this.delRowByRowId = function (rowid, callback) {
            var _this$state = _this.state,
                myCardTable = _this$state.table,
                selectedList = _this$state.selectedList;

            var rows = myCardTable.rows,
                selectedPks = [];
            selectedList.forEach(function (item) {
                selectedPks.push(item.rowid);
            });
            if (myCardTable) {
                if (typeof rowid == 'string') {
                    //删除单行
                    rows.map(function (item, index) {
                        if (item.rowid == rowid) {
                            var stat = item.status;
                            if (stat == _config2["default"].status.edit || stat == _config2["default"].status.origin) {
                                item.status = _config2["default"].status["delete"];
                                rows.push(item);
                            }
                            rows.splice(index, 1);
                            // delChangedRowsOldValue.call(this, tableId, index);
                            // 删除自动选中到下一个行的逻辑 , 与快捷键的的删除逻辑冲突 by bbqin
                            if (index >= 0 && index == myCardTable.currentIndex) {
                                myCardTable.currentIndex = -1;
                            }
                        }
                    });
                    _this.setState({
                        table: myCardTable
                    }, function () {
                        // _selectedChangeFn.call(this, tableId)
                        callback && typeof callback === 'function' && callback.call(_this, rowid, myCardTable);
                    });
                } else {
                    //删除多行
                    rows.map(function (item, index) {
                        if (selectedPks.indexOf(item.rowid) > -1) {
                            var stat = item.status;
                            if (stat == _config2["default"].status.edit || stat == _config2["default"].status.origin) {
                                item.status = _config2["default"].status["delete"];
                                rows.push(item);
                            }
                            rows.splice(index, 1);
                            // 删除自动选中到下一个行的逻辑 , 与快捷键的的删除逻辑冲突 by bbqin
                            if (index >= 0 && index == myCardTable.currentIndex) {
                                myCardTable.currentIndex = -1;
                            }
                        }
                    });
                    console.log('rows', rows);
                    debugger;
                    _this.setState({
                        table: myCardTable
                    });
                }
            }
        };

        _this.pasteRow = function () {};

        _this._reviseRows = function (rows) {
            rows.map(function (item, index) {
                if (item.status == _config2["default"].status["delete"]) {
                    rows.push(item);
                    rows.splice(index, 1);
                }
            });
            return rows;
        };

        _this.getSelectedDataFunc = function (selectedList, record, index) {
            var myCardTable = _this.state.table;

            var rows = myCardTable.rows;
            // 如果在回调中增加setState逻辑，需要同步data中的_checked属性。即下面的代码
            var allChecked = selectedList.length == 0 ? false : true;
            // record为undefind则为全选或者全不选
            if (!record) {
                rows.forEach(function (item) {
                    item._checked = allChecked;
                });
            } else {
                rows[index]['_checked'] = record._checked;
            }
            _this.setState({
                table: myCardTable,
                selectedList: selectedList
            });
        };

        var ComplexTable = (0, _sort2["default"])(_nc_Table2["default"], _beeIcon2["default"]);
        if (typeof props.showCheck === 'boolean' && !!props.showCheck) {
            ComplexTable = (0, _multiSelect2["default"])(ComplexTable, _beeCheckbox2["default"]);
        }
        _this.state = {
            table: {
                pageInfo: {
                    pageSize: '10',
                    pageIndex: '1'
                },
                rows: [],
                checkedAll: false,
                // 设置全选多选框的是否禁用
                disabledAll: false,
                model: false, //是否打开侧滑面板
                origin: {},
                operType: 'add',
                allpks: [], //所有 data 的 id 属性集合
                selectedList: [] //所有已选 data 的集合
            },
            currentIndex: -1
        };
        // 是否获取到多语的标识，让cell正确更新
        _this.isGetPlatform = false;
        _this.ComplexTable = ComplexTable;
        return _this;
    }

    EditTable.prototype.componentWillMount = function componentWillMount() {
        var data = this.props.data;

        this.setState({
            table: _extends({}, this.state.table, { rows: data })
        });
    };
    //为了回传Table的行数据


    EditTable.prototype.componentDidMount = function componentDidMount() {
        var onRef = this.props.onRef;

        onRef && onRef(this);
    };

    EditTable.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var oldData = this.props.data;
        var newData = nextProps.data;
        var table = this.state.table;

        if (newData !== oldData && newData.length !== oldData.length) {
            this.setState({
                table: _extends.apply(undefined, _toConsumableArray(table).concat([{ rows: newData }]))
            });
        }
    };

    //获取表格数据时触发的回调函数


    /**
     * 新增行(通过index值)
     * @param  index  增加行的位置index   0为行首 不传为和len为行尾部
     * @param  data   新增的默认data 格式：{key: {display: '', scale: 0, value: ''}, key2: {display: '', scale: 0, value: ''}}
     * @param  flag   增加flag标识位，判断是否为多表头，默认是false，不是多表头
     */

    /**
     * 根据rowId的删除行方法
     * 规则：1、当state == ‘2’    新增        这时候直接删除数组就可以了
     *      2、当state == ‘0/1’  原始/修改   这时候数组的内容不能删除，把state置位3
     *      3、当state == ‘3’    已删除      这时候数组的内容不会显示，所以没删除功能
     * 解决思路： 把不是新增的 置位3 并push到结尾，其余的按index删除即可。 控制index的最大取值。
     * 注意点：   _selectedChangeFn方法调用
     * @param  tableId   meta的id号
     * @param  rowid     删除的行rowId
     */

    /**
     * 复制粘贴行，默认粘贴到该行下方
     * @param  tableId   meta的id号
     * @param  index     行序号index
     * @param  keys      不去复制的键值
     */


    /**
     * 修正rows  把删除项永远放在最后 （为了保证渲染层与数据层 index的同一性）
     * @param  rows   表内数据行
     */


    /**把index行设置为选中行 */
    EditTable.prototype.focusRowByIndex = function focusRowByIndex(index) {
        this.setState({
            currentIndex: index
        });
    };
    /**设置当前点击行 */


    EditTable.prototype.setClickRowIndex = function setClickRowIndex(record, index) {
        var data = { record: record, index: index };
        // this.table.currentInfo = data;
    };
    /**
     * 多选的回调
     */


    /**
     * 创建 EditTable
     * @param {*} props 
     * @param {*} edittable_dom 
     * @param {*} isGetPlatform 
     */
    EditTable.prototype.createEditTable = function createEditTable(props, edittable_dom, isGetPlatform) {
        var _this2 = this;

        var ComplexTable = this.ComplexTable;
        // 分页显示最多按钮
        var MAX_BUTTONS = 5;
        // 获取table的meta信息 注意异步时候 meta中没有此id 为undefined

        var columns = props.columns,
            moduleId = props.moduleId,
            pageScope = props.pageScope,
            config = _objectWithoutProperties(props, ['columns', 'moduleId', 'pageScope']);

        var meta = {};
        // let { renderItem } = pageScope.state;
        var renderItem = {};
        // 将缓存的数据方法组件的state上
        // let myEditData = pageScope.myTableData.myEditData[moduleId];
        // if (myEditData) {
        //     this.state.table = myEditData;
        //     pageScope.myTableData.myEditData[moduleId] = null;
        // }
        // if (!meta || meta.moduletype !== 'table') return;
        // 整体引用当前table数据
        var table = this.state.table;
        // 多语
        var json = this.state.json;
        var _table$rows = table.rows,
            rows = _table$rows === undefined ? [] : _table$rows,
            _table$checkedAll = table.checkedAll,
            checkedAll = _table$checkedAll === undefined ? false : _table$checkedAll,
            _table$disabledAll = table.disabledAll,
            disabledAll = _table$disabledAll === undefined ? false : _table$disabledAll,
            _table$indeterminate = table.indeterminate,
            indeterminate = _table$indeterminate === undefined ? false : _table$indeterminate,
            _table$model = table.model,
            model = _table$model === undefined ? false : _table$model,
            _table$origin = table.origin,
            origin = _table$origin === undefined ? null : _table$origin,
            _table$operType = table.operType,
            operType = _table$operType === undefined ? 'add' : _table$operType,
            modelIndex = table.modelIndex,
            _table$modelValue = table.modelValue,
            modelValue = _table$modelValue === undefined ? null : _table$modelValue,
            modelScale = table.modelScale,
            _table$modelDisabled = table.modelDisabled,
            modelDisabled = _table$modelDisabled === undefined ? false : _table$modelDisabled,
            _table$focusIndex = table.focusIndex,
            focusIndex = _table$focusIndex === undefined ? -1 : _table$focusIndex;
        // 展示在页面上的数据
        // status: '0'(原始)，'1'(修改)，'2'(新增)，'3'(已删除)

        var tablePageData = rows.filter(function (e) {
            return e.status != _config2["default"].status["delete"];
        });
        // 左侧多选框
        // if (config && config.selectedChange && typeof config.selectedChange === 'function') {
        //     table.selectedChange = config.selectedChange;
        // } else {
        //     table.selectedChange = null;
        // }

        // if (config && typeof config.selectedChange === 'function') {
        //     table.statusChange = config.statusChange;
        // }
        //侧拉面板data
        // let tableModeldata = pageScope.state.tableModeldata[moduleId] || {
        //     rowid: String(new Date().getTime()).slice(-5) + Math.random().toString(12),
        //     status: '0',
        //     values: {}
        // };

        //计算行号，存在 numberindex 字段中
        tablePageData.map(function (item, index) {
            var values = item.values;
            var rowsLenght = 1;
            if ((0, _utils.isFunction)(config.merge) && (0, _utils.isObj)(config.merge(index, 'numberindex')) && config.merge(index, 'numberindex').rowsLength) {
                rowsLenght = config.merge(index, 'numberindex').rowsLength;
            }
            values.numberindex = { value: '' + (index / rowsLenght + 1) };
        });
        // 去掉设置为隐藏的列
        var tempColums = (0, _utils.deepClone)(columns.filter(function (item) {
            return !!item.visible;
        }));
        // const verify = {};
        // let stateVerify = pageScope.myTable[moduleId];

        // 递归处理添加日期标识
        // setDTOpen(tempColums, verify, stateVerify);
        // 日期控件编辑前处理加了DTOpen
        // pageScope.myTable[moduleId] = {};
        // pageScope.myTable[moduleId].verify = verify;

        // 将有onBeforeEvent的时候存在数据上，以后有用的时候用
        if (config && config.onBeforeEvent && typeof config.onBeforeEvent == 'function') {
            table.onBeforeEvent = config.onBeforeEvent;
        } else {
            table.onBeforeEvent = null;
        }

        // 序号开关 默认始终显示序号
        if (config && config.showIndex && !(0, _utils.checkHasIndex)(columns) && json) {
            tempColums.unshift({
                label: '序号',
                title: '序号',
                attrcode: 'numberindex',
                dataIndex: 'numberindex',
                className: 'table-index',
                visible: true,
                itemtype: 'customer',
                width: '60px'
            });
        }
        columns = this.handleMeta.call(this, tempColums, meta, moduleId, config, renderItem, model, edittable_dom, pageScope, isGetPlatform);

        // pageSize事件
        var pageSizeChange = function pageSizeChange(val) {
            // 如果表格没有数据，则不能使用该方法
            if (table.allpks.length <= 0) {
                return;
            }
            var total = table.pageInfo.total;
            table.pageInfo.pageSize = +val;
            table.pageInfo.pageIndex = 1;
            table.pageInfo.totalPage = Math.ceil(total / table.pageInfo.pageSize);

            if (config && config.handlePageInfoChange) {
                config.handlePageInfoChange(_extends({}, pageScope.props, pageScope.output), config, splitPks(table.allpks, table.pageInfo.pageIndex, table.pageInfo.pageSize), total);
            }
        };
        // pageIndex 事件
        var pageIndexChange = function pageIndexChange(val) {
            // 如果表格没有数据，则不能使用该方法
            if (table.allpks.length <= 0) {
                return;
            }
            var total = table.pageInfo.total;
            table.pageInfo.pageIndex = val;

            if (config && config.handlePageInfoChange) {
                config.handlePageInfoChange(_extends({}, pageScope.props, pageScope.output), config, splitPks(table.allpks, table.pageInfo.pageIndex, table.pageInfo.pageSize), total);
            }
        };
        {} /* 
           // 合计行列配置
           let totalColums = gettotalColums(columns);
           // 合计行数据
           let totalData = [];
           // 处理过精度的合计行数据
           let finalTotalData = [];
           // 合计行精度
           let totalScale = null;
           // 当展示合计行的时候执行
           if ((config && config.showTotal) || getMetaIsTotal(totalColums)) {
              // 不展示合计行时不执行
              totalData = _getTotalData.call(pageScope, totalColums, tablePageData, moduleId, config);
              totalScale = getTotalScale(totalColums, tablePageData);
           }
           if (config && config.showIndex && !config.showCheck && (config.showTotal || getMetaIsTotal(totalColums)) && json) {
           // 有序好没有多选框序号位置为合计
           totalColums.forEach(eve => {
              // 因为有重复渲染，所以在没有多选框的时候,将合计单元格设为80px
              if (eve.key === 'numberindex') {
              eve.width = '60px';
              }
           });
           totalData[0].numberindex = json['table002'];
           }
           */
        // let fixed = table.checkboxFix ? {} : { fixed: 'left' };
        {} /* 
           let defaultColumns = [
              {
                  title: (
                  <div>
                      <Checkbox
                      className="table-checkbox"
                      checked={checkedAll}
                      disabled={disabledAll}
                      indeterminate={indeterminate && !checkedAll}
                      tabindex="-1"
                      onChange={onAllCheckChange.bind(this, moduleId, config, pageScope)}
                      />
                  </div>
                  ),
                  key: 'checkbox',
                  dataIndex: 'checkbox',
                  className: 'table-checkbox-class',
                  visible: true,
                  itemtype: 'customer',
                  ...fixed,
                  width: '60px',
                  render: (text, record, index) => {
                  return {
                      children: (
                      <div>
                          <Checkbox
                          className="table-checkbox"
                          checked={!!record.selected}
                          disabled={!!record.disabled}
                          tabindex="-1"
                          onChange={() => {
                              onCheckboxChange.call(this, moduleId, text, record, index, config, pageScope);
                          }}
                          onMouseDown={e => {
                              e.preventDefault();
                          }}
                          onClick={e => {
                              // 阻止冒泡防止触发，表格行的click事件
                              e.stopPropagation();
                          }}
                          />
                      </div>
                      ),
                      props: isFunction(config.merge) ? config.merge(index, 'checkbox') : {}
                  };
                  }
              }
           ];
           */
        // if (config && config.showCheck) {
        // columns = defaultColumns.concat(columns);
        // ComplexTable = multiSelect(ComplexTable,Checkbox);
        // }
        // if (config && config.showCheck && (config.showTotal || getMetaIsTotal(totalColums)) && json) {
        //     // 合并列增加字段
        //     totalColums.unshift({
        //         key: 'checkbox',
        //         dataIndex: 'checkbox',
        //         width: '60px',
        //         fixed: 'left'
        //     });
        //     totalData[0].checkbox = json['table002'];
        // }
        // if (totalScale !== null) {
        //     // 不展示合计行时不执行
        //     finalTotalData = getFinalTotalData(totalData[0], totalScale);
        // }
        //添加侧滑面板的动画
        var animation = function (model) {
            var usual = {
                mask: 'edit-table-modal-mask animated',
                dialog: 'edit-table-modal-dialog animated'
            };
            switch (model) {
                case 'origin':
                    return usual;
                    break;
                case 'open':
                    usual.mask += ' fadeIn';
                    usual.dialog += ' slideInRight';
                    break;
                case 'close':
                    usual.mask += ' fadeOut';
                    usual.dialog += ' slideOutRight';
                    break;
                default:
                    break;
            }
            return usual;
        }(model);
        var screenWidth = window.screen.width || 768;
        var rowHeight = 30; //--liuxis
        var tableMaxHeight = 300;
        // simple和edittable设置自定义高度的
        var tableHight = config && config.height ? { height: config.height } : { minHeight: tableMaxHeight };
        // 表格body默认高度
        var bodyHeight = config && config.height ? config.height : tableMaxHeight + 'px';
        var regex = new RegExp('px');
        bodyHeight = String(bodyHeight).replace(regex, '');
        // 表格渲染所有行的行高
        var rowsHeight = tablePageData.length * rowHeight;
        // 后端排序和前端排序, 不传config.sort就走前端排序的sort逻辑
        var sort = config.sort ? { sort: config.sort } : {
            sort: {
                mode: 'single',
                backSource: false,
                sortFun: function sortFun(sortParam, sortData) {
                    var sortObj = {};
                    var myEditScope = pageScope.myTable.myEditTable[moduleId];
                    sortParam.forEach(function (item) {
                        sortObj[item.field] = item;
                    });
                    // 处理排序多表头
                    getSortColums({ colums: pageScope.state.meta[moduleId].items, sortObj: sortObj });
                    myEditScope.setState({ table: _extends({}, _this2.state.table, { rows: sortData }) });
                }
            }
        };
        return _react2["default"].createElement(
            'div',
            null,
            _react2["default"].createElement(
                'div',
                { className: 'lightapp-component-editTable', ref: 'table' },
                _react2["default"].createElement(
                    'div',
                    {
                        className: (_DEFAULT.isMultipleHead ? ' multiple-head-border ' : '') + ' ' + (rowsHeight <= bodyHeight ? 'clear-right-scrollBar' : '')
                    },
                    _react2["default"].createElement(ComplexTable, _extends({
                        rowKey: props.rowKey ? props.rowKey : "rowid",
                        height: config && !config.multipleRowCell && rowHeight,
                        headerHeight: _DEFAULT.isMultipleHead ? undefined : 30
                        // ref={dom => (pageScope.primordialTable[moduleId] = findDOMNode(dom))}
                        // isTotal={!!((config && config.showTotal) || getMetaIsTotal(totalColums))}
                        // totalData={finalTotalData}
                        // totalColums={totalColums}
                        , data: tablePageData,
                        columns: columns,
                        currentIndex: focusIndex,
                        isDrag: config && config.isDrag,
                        bodyStyle: _extends({}, tableHight),
                        useFixedHeader: true,
                        scroll: {
                            x: true,
                            y: config && config.height ? config.height : tableMaxHeight
                        },
                        haveExpandIcon: function haveExpandIcon() {
                            return true;
                        },
                        rowClassName: function rowClassName(record, current) {
                            return table.currentIndex === current ? 'editTable-selected-row' : '';
                        },
                        getSelectedDataFunc: this.getSelectedDataFunc,
                        onRowClick: function onRowClick(record, index, e) {
                            // 行点击操作 1、根据index设置行样式 2、自定义点击事件
                            _this2.focusRowByIndex(index);
                            _this2.setClickRowIndex(record, index);
                            if (config && typeof config.onRowClick === 'function') {
                                config.onRowClick.call(_this2, record, index, e);
                            }
                        },
                        onRowDoubleClick: function onRowDoubleClick(record, index, e) {
                            _this2.focusRowByIndex(index);
                            _this2.setClickRowIndex(record, index);
                            // 行双击的方法 判断配置文件是否有，并且config.onRowDoubleClick是否是函数  zhanghengh 18/5/8
                            if (config && config.onRowDoubleClick && typeof config.onRowDoubleClick === 'function') {
                                config.onRowDoubleClick.call(_this2, record, index, e);
                            }
                        }
                        // 是否取消滚动分页
                        , lazyload: config.lazyload
                    }, sort, config))
                ),
                config && config.showPagination && meta.status === 'browse' && _react2["default"].createElement(
                    'div',
                    { className: 'editTable-component-paginationDiv' },
                    _react2["default"].createElement(
                        'div',
                        { className: 'page-size' },
                        _react2["default"].createElement(
                            _beeSelect2["default"],
                            {
                                value: String(table.pageInfo.pageSize),
                                style: { width: 85 },
                                onSelect: function onSelect(val) {
                                    pageSizeChange.call(_this2, val);
                                },
                                className: 'fl',
                                showClear: false
                            },
                            _react2["default"].createElement(
                                Option,
                                { value: '10' },
                                _react2["default"].createElement(
                                    NCTooltip,
                                    {
                                        className: 'tooltip-word-color',
                                        placement: 'top',
                                        delay: 1,
                                        overlay: '10' + (json && json['table_pagination002']) + '/' + (json && json['table_pagination001'])
                                    },
                                    _react2["default"].createElement(
                                        'div',
                                        { className: 'select-single-line-and-ellipsis' },
                                        '10' + (json && json['table_pagination002']) + '/' + (json && json['table_pagination001'])
                                    )
                                )
                            ),
                            _react2["default"].createElement(
                                Option,
                                { value: '20' },
                                _react2["default"].createElement(
                                    NCTooltip,
                                    {
                                        className: 'tooltip-word-color',
                                        placement: 'top',
                                        delay: 1,
                                        overlay: '20' + (json && json['table_pagination003']) + '/' + (json && json['table_pagination001'])
                                    },
                                    _react2["default"].createElement(
                                        'div',
                                        { className: 'select-single-line-and-ellipsis' },
                                        '20' + (json && json['table_pagination003']) + '/' + (json && json['table_pagination001'])
                                    )
                                )
                            ),
                            _react2["default"].createElement(
                                Option,
                                { value: '50' },
                                _react2["default"].createElement(
                                    NCTooltip,
                                    {
                                        className: 'tooltip-word-color',
                                        placement: 'top',
                                        delay: 1,
                                        overlay: '50' + (json && json['table_pagination003']) + '/' + (json && json['table_pagination001'])
                                    },
                                    _react2["default"].createElement(
                                        'div',
                                        { className: 'select-single-line-and-ellipsis' },
                                        '50' + (json && json['table_pagination003']) + '/' + (json && json['table_pagination001'])
                                    )
                                )
                            ),
                            _react2["default"].createElement(
                                Option,
                                { value: '100' },
                                _react2["default"].createElement(
                                    NCTooltip,
                                    {
                                        className: 'tooltip-word-color',
                                        placement: 'top',
                                        delay: 1,
                                        overlay: '100' + (json && json['table_pagination003']) + '/' + (json && json['table_pagination001'])
                                    },
                                    _react2["default"].createElement(
                                        'div',
                                        { className: 'select-single-line-and-ellipsis' },
                                        '100' + (json && json['table_pagination003']) + '/' + (json && json['table_pagination001'])
                                    )
                                )
                            )
                        ),
                        !!+table.pageInfo.total && _react2["default"].createElement(
                            'span',
                            { className: 'fl NC_total' },
                            ' ',
                            (json && json['table_pagination002']) + '\n                                                ' + table.pageInfo.total + '\n                                                ' + (json && json['table_pagination003'])
                        )
                    ),
                    _react2["default"].createElement(
                        'div',
                        { className: 'table-pagination' },
                        _react2["default"].createElement(NCPagination, {
                            prev: true,
                            next: true,
                            boundaryLinks: true,
                            items: Number(table.pageInfo.totalPage),
                            maxButtons: Number(table.pageInfo.totalPage) === 7 ? 6 : MAX_BUTTONS,
                            activePage: Number(table.pageInfo.pageIndex),
                            onSelect: function onSelect(val) {
                                pageIndexChange.call(_this2, val);
                            }
                        })
                    )
                )
            ),
            model === 'open' && _react2["default"].createElement(SideBox, {
                model: model,
                origin: origin,
                config: config,
                modelIndex: modelIndex,
                moduleId: moduleId,
                operType: operType,
                tableScope: this,
                renderItem: renderItem,
                pageScope: pageScope,
                mask: animation.mask,
                dialog: animation.dialog,
                modelValue: modelValue,
                modelScale: modelScale,
                tempColums: tempColums,
                edittable_dom: edittable_dom,
                tableModeldata: tableModeldata,
                modelDisabled: modelDisabled
            })
        );
    };

    /**
     * 多表头函数
     * @param {*} items 表格列数据 columns
     * @param {*} meta 
     * @param {*} moduleId 
     * @param {*} config 
     * @param {*} renderItem 
     * @param {*} model 
     * @param {*} edittable_dom 
     * @param {*} pageScope 
     * @param {*} isGetPlatform 
     */


    EditTable.prototype.handleMeta = function handleMeta(items, meta, moduleId, config, renderItem, model, edittable_dom, pageScope, isGetPlatform) {
        var _this3 = this;

        return items.map(function (item) {
            // if (item.children) {
            //     // 多表头情况
            //     _DEFAULT.isMultipleHead = true;
            //     handleParentMeta(item);
            //     return {
            //         ...item,
            //         children: handleMeta.call(
            //             this,
            //             item.children,
            //             meta,
            //             moduleId,
            //             config,
            //             renderItem,
            //             model,
            //             edittable_dom,
            //             pageScope,
            //             isGetPlatform
            //         )
            //     };
            // }
            return _this3.handleChildMeta.call(_this3, item, meta, moduleId, config, renderItem, model, edittable_dom, pageScope, isGetPlatform);
        });
    };
    /**
     * 处理子表头
     * @param {*} item 表格列数据 columns 中的每一项
     * @param {*} meta 
     * @param {*} moduleId 
     * @param {*} config 
     * @param {*} renderItem 
     * @param {*} model 
     * @param {*} edittable_dom 
     * @param {*} pageScope 
     * @param {*} isGetPlatform 
     */


    EditTable.prototype.handleChildMeta = function handleChildMeta(item, meta, moduleId, config, renderItem, model, edittable_dom, pageScope, isGetPlatform) {
        var _this4 = this;

        var ICode = item.attrcode,
            IType = item.itemtype,
            IReq = item.required,
            metaDisabled = item.disabled,
            ILable = item.label,
            IChildren = item.children,
            renderStatus = item.renderStatus,
            color = item.color,
            IScale = item.scale,
            hyperlinkflag = item.hyperlinkflag,
            LanguageMeta = item.languageMeta,
            _item$isSort = item.isSort,
            isSort = _item$isSort === undefined ? true : _item$isSort,
            Isorter = item.sorter,
            headerClick = item.headerClick;
        var isEdit = this.props.isEdit;

        var render = void 0;
        // 表格状态
        var status = isEdit ? 'edit' : 'browse';
        // 每个column单项的render函数
        if (IType === 'customer' && ICode !== 'numberindex') {
            render = item.render;
        } else {
            render = function render(text, record, index) {
                // 比如操作列不走此分支
                var _ref2 = [record.values],
                    values = _ref2[0],
                    editItem = _ref2[1],
                    value = _ref2[2],
                    display = _ref2[3],
                    scale = _ref2[4],
                    disabled = _ref2[5],
                    isEdit = _ref2[6];
                // 如果有这个键取这个键的value值，否则为null

                value = (0, _utils.isObj)(values[ICode]) ? (0, _utils.typeFormat)(values[ICode].value, IType) : null;
                display = (0, _utils.isObj)(values[ICode]) ? values[ICode].display : null;
                scale = (0, _utils.isObj)(values[ICode]) ? !(0, _utils.isWrong)(values[ICode].scale) && values[ICode].scale != '-1' ? +values[ICode].scale : +IScale || 0 : +IScale || 0;
                // true为不可编辑
                disabled = (0, _utils.isObj)(values[ICode]) ? values[ICode].disabled || false : false;
                // true为渲染控件
                isEdit = (0, _utils.isObj)(values[ICode]) ? values[ICode].isEdit || false : false;
                return _react2["default"].createElement(_Cell2["default"], {
                    text: text,
                    item: item,
                    refcode: item.refcode,
                    ICode: ICode,
                    scale: scale,
                    value: value,
                    IType: IType,
                    isEdit: isEdit,
                    config: config,
                    record: record,
                    model: model,
                    index: index,
                    values: values,
                    display: display,
                    moduleId: moduleId,
                    disabled: disabled,
                    tableScope: _this4,
                    pageScope: pageScope,
                    renderItem: renderItem,
                    tableStatus: status,
                    renderStatus: renderStatus,
                    LanguageMeta: LanguageMeta,
                    metaDisabled: metaDisabled,
                    hyperlinkflag: hyperlinkflag,
                    edittable_dom: edittable_dom,
                    isGetPlatform: isGetPlatform,
                    tableInfo: _this4.state.table,
                    focusRowByIndex: _this4.focusRowByIndex,
                    setClickRowIndex: _this4.setClickRowIndex
                });
            };
        }
        // 缓存render，防止递归造成栈溢出
        // let newRender = render;
        // render = (text, record, index) => {
        //     /**
        //      * @desc 为了查找过程更快，把属性名设置成唯一的, 此属性用于自动聚焦
        //      * @type {{[p: string]: string}}
        //      * @author jinfjk
        //      */
        //     let hotKeyPrefix = CONFIG.hotKeyModuleIdPrefix;
        //     let autoFocusIdentifier = {
        //         [`${hotKeyPrefix}-${moduleId}-${ICode}-${index}`]: `${hotKeyPrefix}-${moduleId}-${ICode}-${index}`
        //     };
        //     // 给每个单元格添加上测试标记，不管什么状态
        //     return {
        //         children: (
        //         <div
        //             {...autoFocusIdentifier}
        //             className={`${config && isFunction(config.setCellClass) && config.setCellClass(index, record, ICode)}`}
        //         >
        //             {newRender(text, record, index)}
        //         </div>
        //         ),
        //         props: isFunction(config.merge) ? config.merge(index, ICode) : {}
        //     };
        // };
        var title = function (req, dis, color, sta) {
            // req为true为必输  dis为false为可编辑
            return _react2["default"].createElement(
                'div',
                {
                    className: 'edittable-title single-line-and-ellipsis'
                    // 增加过滤的交互，给表格加个onclick事件
                    , onClick: function onClick() {
                        (0, _utils.isFunction)(headerClick) && headerClick(_extends({}, _this4.props), ICode);
                    },
                    style: IType === 'number' ? { paddingRight: '9px', textAlign: 'right', color: color } : { color: color }
                },
                _react2["default"].createElement(
                    'span',
                    { className: '' + (ICode !== 'numberindex' ? 'title-vertical-center' : '') },
                    req && sta && _react2["default"].createElement(
                        'i',
                        { className: 'mark-required' },
                        '*'
                    ),
                    item.label
                )
            );
        }(IReq, metaDisabled, color, status === 'edit');
        item.title = _react2["default"].createElement(
            'div',
            { className: '' + (ICode !== 'numberindex' ? 'title-container' : '') },
            title
        );
        item.key = ICode;
        item.dataIndex = ICode;

        // 添加默认宽度datetimepicker
        if ((0, _utils.isWrong)(item.width)) {
            if (item.itemtype === 'datetimepicker') {
                item.width = '240px';
            } else if (item.itemtype === 'rangepicker') {
                item.width = '390px';
            } else if (_config2["default"].timeTypes.includes(item.itemtype)) {
                item.width = '160px';
            } else {
                item.width = '120px';
            }
        }
        // 为所有列添加默认前端排序功能， 通过模版的isSort字段和自定义sorter配置
        if (isSort && !(0, _utils.isFunction)(Isorter)) {
            // switch (true) {
            //     case IType === 'number':
            //         item.sorter = (front, behind) => {
            //             const frontValue = front.values[ICode] ? front.values[ICode].value || '0' : '0';
            //             const behindValue = behind.values[ICode] ? behind.values[ICode].value || '0' : '0';
            //             return Subtr(Number(frontValue.replace(/,/g, '')), Number(behindValue.replace(/,/g, '')));
            //         };
            //         break;
            //     case CONFIG.timeTypes.includes(IType):
            //         item.sorter = (front, behind) => {
            //             const frontValue = front.values[ICode] ? front.values[ICode].value || '0' : '0';
            //             const behindValue = behind.values[ICode] ? behind.values[ICode].value || '0' : '0';
            //             return Number(new Date(frontValue).getTime()) - Number(new Date(behindValue).getTime());
            //         };
            //         break;
            //     case CONFIG.displayTypes.includes(IType):
            //         item.sorter = (front, behind) => {
            //             const frontValue = String(front.values[ICode] ? front.values[ICode].display || '' : '');
            //             const behindValue = String(behind.values[ICode] ? behind.values[ICode].display || '' : '');
            //             if (behindValue > frontValue) {
            //                 return -1;
            //             } else if (behindValue < frontValue) {
            //                 return 1;
            //             } else {
            //                 return 0;
            //             }
            //         };
            //         break;
            //     case IType === 'label':
            //         item.sorter = (front, behind) => {
            //             const fvalue = front.values[ICode] ? front.values[ICode].value || '' : '';
            //             const fdisplay = front.values[ICode] ? front.values[ICode].display : '';
            //             const bvalue = behind.values[ICode] ? behind.values[ICode].value || '' : '';
            //             const bdisplay = behind.values[ICode] ? behind.values[ICode].display : '';
            //             const frontValue = String(isNullOrVoid(fdisplay) ? fvalue : fdisplay);
            //             const behindValue = String(isNullOrVoid(bdisplay) ? bvalue : bdisplay);
            //             if (behindValue > frontValue) {
            //                 return -1;
            //             } else if (behindValue < frontValue) {
            //                 return 1;
            //             } else {
            //                 return 0;
            //             }
            //         };
            //         break;
            //     case ICode !== 'numberindex' && ICode !== 'opr':
            //         item.sorter = (front, behind) => {
            //             const frontValue = String(front.values[ICode] ? front.values[ICode].value || '' : '');
            //             const behindValue = String(behind.values[ICode] ? behind.values[ICode].value || '' : '');
            //             if (behindValue > frontValue) {
            //                 return -1;
            //             } else if (behindValue < frontValue) {
            //                 return 1;
            //             } else {
            //                 return 0;
            //             }
            //         };
            //         break;
            // }
        }
        return _extends({}, item, { render: render });
    };

    /**
     * 添加日期框打开收起标识
     * @param {*} tempColums 
     * @param {*} verify 
     * @param {*} stateVerify 
     */


    EditTable.prototype.setDTOpen = function (_setDTOpen) {
        function setDTOpen(_x, _x2, _x3) {
            return _setDTOpen.apply(this, arguments);
        }

        setDTOpen.toString = function () {
            return _setDTOpen.toString();
        };

        return setDTOpen;
    }(function (tempColums, verify, stateVerify) {
        tempColums.forEach(function (eve) {
            // 日期控件编辑前处理加了DTOpen
            var attrcode = eve.attrcode,
                children = eve.children;

            if (!(0, _utils.isUndefined)(children)) {
                // 判断和并列的情况
                setDTOpen(children, verify, stateVerify);
            } else {
                verify[attrcode] = stateVerify && stateVerify.verify[attrcode] || { DTOpen: false, selectOpen: false };
            }
        });
    });

    EditTable.prototype.render = function render() {
        var _this5 = this;

        // console.log('渲染表格');
        var _props$moduleId = this.props.moduleId,
            moduleId = _props$moduleId === undefined ? '' : _props$moduleId;

        return _react2["default"].createElement(
            'div',
            _extends({ ref: function ref(e) {
                    return _this5.edittable_dom = e;
                } }, this.props),
            _react2["default"].createElement(
                'div',
                { id: '' + moduleId },
                this.createEditTable.call(this, this.props, this.edittable_dom, this.isGetPlatform)
            )
        );
    };

    return EditTable;
}(_react.Component);

EditTable.propTypes = propTypes;
EditTable.defaultProps = defaultProps;
exports["default"] = EditTable;
module.exports = exports['default'];
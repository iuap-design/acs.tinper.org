/**
 * SimpleTable
 */

import React, { Component } from 'react';
import NCTable from './nc_Table';
import Select from 'bee-select';
import Tooltip from 'bee-tooltip';
import Checkbox from 'bee-checkbox';
import Pagination from 'bee-pagination';
import Icon from 'bee-icon';
import sort from 'bee-table/build/lib/sort.js';
import multiSelect from "bee-table/build/lib/multiSelect.js";
import { getSortColums } from './utils';
import ExportJsonExcel from "./ExportExcel";

const Option = Select.Option;
// 最大页码数
const MAX_BUTTONS = 5;

const propTypes = {
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
    exportData:PropTypes.array,
    exportData:[],
}

const defaultProps = {
    isMultipleHead: false,
    config: {},
    data: [],
    multiSelect: true,
    json: {
      table_pagination001:'页',
      table_pagination002:'共',
      table_pagination003:'条'
    },
    sheetIsRowFilter: false, //是否要设置行样式，是否遍历
    sheetName: "sheet", //导出表格的name
}

class SimpleTable extends Component {
  constructor(props) {
    super(props);
    let ComplexTable = sort(NCTable, Icon);
    if(typeof props.multiSelect === 'boolean' && !!(props.multiSelect)) {
      ComplexTable = multiSelect(ComplexTable, Checkbox);
    }
    this.state = {
      currentIndex: -1,
      json: props.json
    };
    this.table = {}
    this.ComplexTable = ComplexTable;
  }

  /**把index行设置为选中行 */
  focusRowByIndex(index) {
    this.setState({
      currentIndex: index
    })
  }
  /**设置当前点击行 */
  setClickRowIndex(record, index) {
    let data = {record, index};
    this.table.currentkInfo = data;
  }

  /**Excel 导出 */
  exportExcel = () => {
    let { sheetIsRowFilter, sheetName, sheetHeader: _sheetHeader ,exportData,exportFileName} = this.props;
    let colsAndTablePros = this.getColumnsAndTablePros();
    let sheetHeader = [],
      columnAttr = [],
      rowAttr = [],
      sheetFilter = [];
    colsAndTablePros.columns.forEach(column => { 
     
      let _show = false,  _hidden = false;
      if(column.ifshow != undefined && column.ifshow === false){
        _show = true;
      }
      // _hidden = _exportHidden?column.exportHidden:_show //column.exportHidden // column.excelHidden === false ? true : false
      _hidden = column.exportHidden?true:_show;
      if(!_hidden){
        let _width = String(column.width).indexOf("%") != -1?100:column.width
        columnAttr.push({
          wpx: _width
        });
        let _cloum = column.exportKey?column.exportKey:column.dataIndex
        sheetFilter.push(_cloum);
        sheetHeader.push(column.title);
      }
    });
    if (_sheetHeader) {
      rowAttr.push(this.getItem(_sheetHeader));
    }
    if (sheetIsRowFilter) {
      this.getRowList(colsAndTablePros.tablePros.data);
    }
    let option = {
      datas: [
        {
          fileName:exportFileName,
          sheetData: exportData,
          sheetName,
          sheetFilter,
          sheetHeader,
          columnAttr,
          rowAttr
        }
      ]
    };
    let toExcel = new ExportJsonExcel(option,exportFileName);
    toExcel.saveExcel();
  };

  /**
   * 获取所有列以及table属性值
   */
  getColumnsAndTablePros = () => {
    const columns = this.props.columns.slice();
    
    if (this.dragColsData) {
      const dragColsKeyArr = Object.keys(this.dragColsData);
      dragColsKeyArr.some(itemKey => {
        columns.forEach(col => {
          if (col.dataIndex == itemKey) {
            col.width = this.dragColsData[itemKey].width;
            return true;
          }
        });
      });
    }
    const rs = {
      columns: columns,
      tablePros: this.props
    };
    return rs;
  };

  /**创建表格主体 */
  creatTable() {
    let _this = this;
    const props = this.props;
    const {
      testConf,
      data : dataRows,
      columns,
      totalData,
      totalColums,
      isTotal,
      pageIndexChange,
      moduleId,
      config,
      showPagination,
      pageSizeChange,
      isMultipleHead,
      lazyload,
      focusIndex,
      pageInfo
    } = props;
    let {currentIndex,json} = _this.state;

    let screenWidth = window.screen.width || 768;
    let rowHeight = 30; //表格行高
    let tableMaxHeight = 310; //表体最小高度
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
    const sort = config.sort
      ? { sort: config.sort }
      : {
        sort: {
          mode: 'single',
          backSource: false,
          sortFun: (sortParam, sortData) => {
            let sortObj = {};
            let sortRows = [];
            let rows = _this.myTable[moduleId].state.table.rows;
            sortParam.forEach(item => {
              sortObj[item.field] = item;
            });
            // 处理排序多表头
            getSortColums({ colums: _this.state.meta[moduleId].items, sortObj });
            sortData.forEach(data => {
              rows.forEach(row => {
                if (data.key === row.rowId) {
                  sortRows.push(row);
                }
              });
            });
            _this.myTable[moduleId].setState({
              table: { ..._this.myTable[moduleId].state.table, rows: sortRows }
            });
          }
        }
      };
    // bodyStyle
    let tableHight = config && config.height ? { height: config.height } : { minHeight: tableMaxHeight + 'px' };
    //表格body默认高度
    let bodyHeight = config && config.height ? config.height : tableMaxHeight + 'px';
    let regex = new RegExp('px');
    bodyHeight = String(bodyHeight).replace(regex, '');
    //表格渲染所有行的行高
    let rowsHeight = dataRows.length * rowHeight;
    let ComplexTable = this.ComplexTable;
    return (
      <div className="lightapp-component-simpleTable">
        <div className="simpleTable-component-wrapper" {...testConf}>
          <div
            className={`${isMultipleHead ? ' multiple-head-border ' : ''} ${
              rowsHeight <= bodyHeight ? 'clear-right-scrollBar' : ''
              }`}
          >
            <ComplexTable
              isTotal={isTotal}
              isDrag={config && config.isDrag}
              height={config && !config.multipleRowCell && rowHeight}
              headerHeight={isMultipleHead ? undefined : 30}
              totalData={totalData}
              totalColums={totalColums}
              data={dataRows}
              columns={columns}
              // 解决增行不聚焦问题
              currentIndex={focusIndex}
              bodyStyle={{ ...tableHight }}
              lazyload={lazyload}
              useFixedHeader={true}
              scroll={{
                x: true,
                y: config && config.height ? config.height : tableMaxHeight
              }}
              haveExpandIcon={() => true}
              rowClassName={(record,current,indent)=>{
                if (record._checked || currentIndex === current) {
                    return 'simpleTable-selected-row';
                } else {
                    return '';
                }
              }}
              onRowClick={(record, index, e) => {
                // 行点击操作 1、根据index设置行样式 2、自定义点击事件
                _this.focusRowByIndex(index);
                _this.setClickRowIndex(record, index);
                if (config && typeof config.onRowClick === 'function') {
                  config.onRowClick.call(_this, { ..._this.props, ..._this.output }, moduleId, record, index, e);
                }
              }}
              onRowDoubleClick={(record, index, e) => {
                _this.focusRowByIndex(index);
                _this.setClickRowIndex(record, index);
                //行双击的方法 判断配置文件是否有，并且config.onRowDoubleClick是否是函数 
                if (config && config.onRowDoubleClick && typeof config.onRowDoubleClick === 'function') {
                  config.onRowDoubleClick.call(_this, record, index, { ..._this.props, ..._this.output }, e);
                }
              }}
              {...props}
            />
          </div>
        </div>
        {showPagination && (
          <div className="simpleTable-component-paginationDiv">
            <div className="page-size">
              <Select
                value={String(pageInfo.pageSize)}
                style={{ width: 85 }}
                onSelect={val => {
                  pageSizeChange.call(_this, val);
                }}
                className="fl"
                showClear={false}
              >
                <Option value={'10'}>
                  <Tooltip
                    className="tooltip-word-color"
                    placement="top"
                    inverse
                    delay={1}
                    overlay={`10${json['table_pagination003']}/${json['table_pagination001']}`}
                  >
                    <div className='select-single-line-and-ellipsis'>{`10${json['table_pagination003']}/${json['table_pagination001']}`}</div>
                  </Tooltip>
                </Option>
                <Option value={'20'}>
                  <Tooltip
                    className="tooltip-word-color"
                    placement="top"
                    inverse
                    delay={1}
                    overlay={`20${json['table_pagination003']}/${json['table_pagination001']}`}
                  >
                    <div className='select-single-line-and-ellipsis'>{`20${json['table_pagination003']}/${json['table_pagination001']}`}</div>
                  </Tooltip>
                </Option>
                <Option value={'50'}>
                  <Tooltip
                    className="tooltip-word-color"
                    placement="top"
                    inverse
                    delay={1}
                    overlay={`50${json['table_pagination003']}/${json['table_pagination001']}`}
                  >
                    <div className='select-single-line-and-ellipsis'>{`50${json['table_pagination003']}/${json['table_pagination001']}`}</div>
                  </Tooltip>
                </Option>
                <Option value={'100'}>
                  <Tooltip
                    className="tooltip-word-color"
                    placement="top"
                    inverse
                    delay={1}
                    overlay={`100${json['table_pagination003']}/${json['table_pagination001']}`}
                  >
                    <div className='select-single-line-and-ellipsis'>{`100${json['table_pagination003']}/${json['table_pagination001']}`}</div>
                  </Tooltip>
                </Option>
              </Select>
              {!!+pageInfo.total && (
                <span className="fl NC_total">
                  {json['table_pagination002'] + ' ' + pageInfo.total + ' ' + json['table_pagination003']}{' '}
                </span>
              )}
            </div>
            <div className="table-pagination">
              <Pagination
                className="NC_PaginationStyle"
                prev
                next
                boundaryLinks
                gap={true}
                items={Number(pageInfo.totalPage || 1)}
                maxButtons={Number(pageInfo.totalPage || 1) === 7 ? 6 : MAX_BUTTONS}
                activePage={Number(pageInfo.pageIndex)}
                onSelect={val => {
                  pageIndexChange.call(_this, val);
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
  render() {
    return <div>{this.creatTable()}</div>;
  }
}

SimpleTable.propTypes = propTypes;
SimpleTable.defaultProps = defaultProps;
export default SimpleTable;
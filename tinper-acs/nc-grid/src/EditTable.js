/**
 *  ***************   前 言   ***************
 *  1、此类表格适用于 “单表”  特点：无分页，表头固定，有横向和纵向的滚动条。
 *  1、visible 为false或者没有visible属性当前列不显示，只有为ture才显示
 *	2、新增的操作列需要有 itemtype: 'customer'
 */
import React, { Component } from 'react';
import NCTable from './nc_Table';
import Icon from 'bee-icon';
import Select from 'bee-select';
import Checkbox from 'bee-checkbox';
import Cell from './Cell';
import { isFunction,checkHasIndex,deepClone,isWrong,isObj,typeFormat,isArray,isUndefined } from './utils';
import sort from 'bee-table/build/lib/sort.js';
import multiSelect from "bee-table/build/lib/multiSelect.js";
import CONFIG from './config';

const propTypes = {
    moduleId: PropTypes.string, //meta的id号
    config: PropTypes.object, //表格配置项
    isEdit: PropTypes.bool, //true为编辑态
}

const defaultProps = {
    config: {},
    isEdit: false
}

// 页面级别配置项
const _DEFAULT = {
    // node执行环境是否是test
    // test_env: NODE_ENV === 'test',
    // 是否是多表头
    isMultipleHead: false,
    // 做个开关，1期EditTable的快捷键不上线
    // tabindex: NODE_ENV === 'development' ? '0' : '-1'
};
class EditTable extends Component {
    constructor(props) {
        super(props);
        let ComplexTable = sort(NCTable, Icon);
        if(typeof props.showCheck === 'boolean' && !!(props.showCheck)) {
            ComplexTable = multiSelect(ComplexTable, Checkbox);
        }
        this.state = {
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
                selectedList: [], //所有已选 data 的集合
            },
            currentIndex: -1
        };
        // 是否获取到多语的标识，让cell正确更新
        this.isGetPlatform = false;
        this.ComplexTable = ComplexTable;
    }

    componentWillMount(){
        let {data} = this.props;
        this.setState({ 
            table: { ...this.state.table, rows: data } 
        });
    }
    //为了回传Table的行数据
    componentDidMount(){
        let {onRef} = this.props;
        onRef && onRef(this)
    }

    componentWillReceiveProps(nextProps){
        let {data: oldData} = this.props;
        let {data: newData} = nextProps;
        let {table} = this.state;
        if(newData !== oldData && newData.length !== oldData.length){
            this.setState({
                table: Object.assign(...table,{rows: newData})
            })
        }
    }

    //获取表格数据时触发的回调函数
    getTableRows = () => {
        let {table:{rows}} = this.state;
        let {getTableRows} = this.props;
        getTableRows && getTableRows(rows);
    }

    /**
     * 新增行(通过index值)
     * @param  index  增加行的位置index   0为行首 不传为和len为行尾部
     * @param  data   新增的默认data 格式：{key: {display: '', scale: 0, value: ''}, key2: {display: '', scale: 0, value: ''}}
     * @param  flag   增加flag标识位，判断是否为多表头，默认是false，不是多表头
     */
    addRow = (index, data, autoFocus = true, callback, flag = false, isAutoAddRow) => {
        // if (addRowControl(isAutoAddRow)) return;
            const { table:myCardTable } = this.state;
            const rows = myCardTable.rows;
            //根据id获取表格中所有(可见)的行的数量
            const getVisibleRows = isArray(rows) && rows.filter(item => item.status != CONFIG.status.delete);
            let len = getVisibleRows.length || 1;
            let numFlag = isUndefined(index) || (!Number.isNaN(Number.parseInt(index, 10)) && index >= 0 && index <= len);
            if (numFlag) {
                index = isUndefined(index) ? len : index;
                // 当前应该聚焦到的行
                // setStatus.call(this, tableId, 'edit');
                // myCardScope.state.status = 'edit';
                const newRow = {
                    rowid: String(new Date().getTime()).slice(-5) + Math.random().toString(12),
                    status: CONFIG.status.add,
                    values: {}
                };
                // let sumItems = _sumItemsCode.call(this, tableId, flag);
                let template = rows.length > 0 && isObj(rows[0].values) && rows[0].values;
                let sumItems = {}; 
                Object.keys(template).forEach(function(key){
                    let item = template[key];
                    sumItems[key] = {
                        attrcode: key,
                        initialvalue: item.initialvalue,
                        itemtype: item.itemtype
                    };
                });
                Object.keys(sumItems).forEach(key => {
                    let item = sumItems[key];
                    // hasData 有data，那么走data   无data再看hasInit看是否有初始值
                    let [code, hasData, hasInit] = [item.attrcode, isObj(data), isObj(item.initialvalue)];
                    let checkData = hasData && isObj(data[code]);
                    newRow.values[code] = {
                        display: checkData ? data[code].display : hasInit ? item.initialvalue.display : null,
                        scale: checkData ? data[code].scale : hasInit ? item.initialvalue.scale : null,
                        value: checkData ? data[code].value : hasInit ? item.initialvalue.value : typeFormat(null, item.itemtype)
                    };
                });
                // 规整数据
                this._reviseRows(rows);
                rows.splice(index, 0, newRow);
                myCardTable.focusIndex = -1;
                // console.log('rows',rows)
                // debugger

                // 控制增行后的行定位
                myCardTable.focusIndex = index === 0 ? index : index + 1; //修改tab切换不到新增行问题renyjk
                this.setState({
                    table: myCardTable
                })
            }
    }
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
    delRowByRowId = (rowid, callback) => {
        const { table:myCardTable, selectedList } = this.state;
        let rows = myCardTable.rows, 
            selectedPks = [];
        selectedList.forEach((item) => {
            selectedPks.push(item.rowid)
        })
        if (myCardTable) {
            if (typeof rowid == 'string') { //删除单行
                rows.map((item, index) => {
                    if (item.rowid == rowid) {
                        let stat = item.status;
                        if (stat == CONFIG.status.edit || stat == CONFIG.status.origin) {
                            item.status = CONFIG.status.delete;
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
                this.setState(
                    {
                    table: myCardTable
                    },
                    () => {
                    // _selectedChangeFn.call(this, tableId)
                    callback &&
                        typeof callback === 'function' &&
                        callback.call(this, rowid, myCardTable);
                    }
                );
            } else { //删除多行
                rows.map((item, index) => {
                    if (selectedPks.indexOf(item.rowid) > -1) {
                        let stat = item.status;
                        if (stat == CONFIG.status.edit || stat == CONFIG.status.origin) {
                            item.status = CONFIG.status.delete;
                            rows.push(item);
                        }
                        rows.splice(index, 1);
                        // 删除自动选中到下一个行的逻辑 , 与快捷键的的删除逻辑冲突 by bbqin
                        if (index >= 0 && index == myCardTable.currentIndex) {
                            myCardTable.currentIndex = -1;
                        }
                    }
                });
                console.log('rows',rows);
                debugger
                this.setState({
                    table: myCardTable
                });
            }
        }
    }
    /**
     * 复制粘贴行，默认粘贴到该行下方
     * @param  tableId   meta的id号
     * @param  index     行序号index
     * @param  keys      不去复制的键值
     */
    pasteRow = () => {
        
    }

    /**
     * 修正rows  把删除项永远放在最后 （为了保证渲染层与数据层 index的同一性）
     * @param  rows   表内数据行
     */
    _reviseRows = (rows) => {
        rows.map((item, index) => {
            if (item.status == CONFIG.status.delete) {
                rows.push(item);
                rows.splice(index, 1);
            }
        });
        return rows;
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
        // this.table.currentInfo = data;
    }
    /**
     * 多选的回调
     */
    getSelectedDataFunc = (selectedList,record,index) => {
        const { table:myCardTable } = this.state;
        let rows = myCardTable.rows;
        // 如果在回调中增加setState逻辑，需要同步data中的_checked属性。即下面的代码
        const allChecked = selectedList.length == 0?false:true;
        // record为undefind则为全选或者全不选
        if(!record){
            rows.forEach(item=>{
                item._checked = allChecked;
            })
        }else{
            rows[index]['_checked'] = record._checked;
        } 
        this.setState({
            table: myCardTable,
            selectedList: selectedList
        })
    };

    /**
     * 创建 EditTable
     * @param {*} props 
     * @param {*} edittable_dom 
     * @param {*} isGetPlatform 
     */
    createEditTable(props, edittable_dom, isGetPlatform) {
        let ComplexTable = this.ComplexTable;
        // 分页显示最多按钮
        const MAX_BUTTONS = 5;
        // 获取table的meta信息 注意异步时候 meta中没有此id 为undefined
        let { columns,moduleId, pageScope,...config } = props;
        let meta = {};
        // let { renderItem } = pageScope.state;
        let renderItem = {};
        // 将缓存的数据方法组件的state上
        // let myEditData = pageScope.myTableData.myEditData[moduleId];
        // if (myEditData) {
        //     this.state.table = myEditData;
        //     pageScope.myTableData.myEditData[moduleId] = null;
        // }
        // if (!meta || meta.moduletype !== 'table') return;
        // 整体引用当前table数据
        let table = this.state.table;
        // 多语
        const json = this.state.json;
        let {
            rows = [],
            checkedAll = false,
            disabledAll = false,
            indeterminate = false,
            model = false,
            origin = null,
            operType = 'add',
            modelIndex,
            modelValue = null,
            modelScale,
            modelDisabled = false,
            // 解决增行不聚焦问题
            focusIndex = -1
        } = table;
        // 展示在页面上的数据
        // status: '0'(原始)，'1'(修改)，'2'(新增)，'3'(已删除)
        let tablePageData = rows.filter(e => e.status != CONFIG.status.delete);
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
        tablePageData.map((item, index) => {
            let values = item.values;
            let rowsLenght = 1;
            if (
                isFunction(config.merge) &&
                isObj(config.merge(index, 'numberindex')) &&
                config.merge(index, 'numberindex').rowsLength
            ) {
                rowsLenght = config.merge(index, 'numberindex').rowsLength;
            }
            values.numberindex = { value: `${index / rowsLenght + 1}` };
        });
        // 去掉设置为隐藏的列
        let tempColums = deepClone(columns.filter(item => !!item.visible));
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
        if (config && config.showIndex && !checkHasIndex(columns) && json) {
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
        columns = this.handleMeta.call(
            this,
            tempColums,
            meta,
            moduleId,
            config,
            renderItem,
            model,
            edittable_dom,
            pageScope,
            isGetPlatform
        );
    
        // pageSize事件
        const pageSizeChange = val => {
            // 如果表格没有数据，则不能使用该方法
            if (table.allpks.length <= 0) {
                return;
            }
            let total = table.pageInfo.total;
            table.pageInfo.pageSize = +val;
            table.pageInfo.pageIndex = 1;
            table.pageInfo.totalPage = Math.ceil(total / table.pageInfo.pageSize);
        
            if (config && config.handlePageInfoChange) {
                config.handlePageInfoChange(
                    { ...pageScope.props, ...pageScope.output },
                    config,
                    splitPks(table.allpks, table.pageInfo.pageIndex, table.pageInfo.pageSize),
                    total
                );
            }
        };
        // pageIndex 事件
        const pageIndexChange = val => {
            // 如果表格没有数据，则不能使用该方法
            if (table.allpks.length <= 0) {
                return;
            }
            let total = table.pageInfo.total;
            table.pageInfo.pageIndex = val;
        
            if (config && config.handlePageInfoChange) {
                config.handlePageInfoChange(
                { ...pageScope.props, ...pageScope.output },
                config,
                splitPks(table.allpks, table.pageInfo.pageIndex, table.pageInfo.pageSize),
                total
                );
            }
        };
        {/* 
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
        */}
        // let fixed = table.checkboxFix ? {} : { fixed: 'left' };
        {/* 
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
        */}
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
        let animation = (model => {
            let usual = {
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
        })(model);
        let screenWidth = window.screen.width || 768;
        let rowHeight = 30; //--liuxis
        let tableMaxHeight = 300;
        // simple和edittable设置自定义高度的
        let tableHight = config && config.height ? { height: config.height } : { minHeight: tableMaxHeight };
        // 表格body默认高度
        let bodyHeight = config && config.height ? config.height : tableMaxHeight + 'px';
        let regex = new RegExp('px');
        bodyHeight = String(bodyHeight).replace(regex, '');
        // 表格渲染所有行的行高
        let rowsHeight = tablePageData.length * rowHeight;
        // 后端排序和前端排序, 不传config.sort就走前端排序的sort逻辑
        const sort = config.sort
        ? { sort: config.sort }
        : {
            sort: {
                mode: 'single',
                backSource: false,
                sortFun: (sortParam, sortData) => {
                let sortObj = {};
                let myEditScope = pageScope.myTable.myEditTable[moduleId];
                sortParam.forEach(item => {
                    sortObj[item.field] = item;
                });
                // 处理排序多表头
                getSortColums({ colums: pageScope.state.meta[moduleId].items, sortObj });
                myEditScope.setState({ table: { ...this.state.table, rows: sortData } });
                }
            }
        };
        return (
            <div>
                <div className="lightapp-component-editTable" ref="table">
                <div
                    className={`${_DEFAULT.isMultipleHead ? ' multiple-head-border ' : ''} ${
                    rowsHeight <= bodyHeight ? 'clear-right-scrollBar' : ''
                    }`}
                >
                    <ComplexTable
                    rowKey={props.rowKey ? props.rowKey : "rowid"}
                    height={config && !config.multipleRowCell && rowHeight}
                    headerHeight={_DEFAULT.isMultipleHead ? undefined : 30}
                    // ref={dom => (pageScope.primordialTable[moduleId] = findDOMNode(dom))}
                    // isTotal={!!((config && config.showTotal) || getMetaIsTotal(totalColums))}
                    // totalData={finalTotalData}
                    // totalColums={totalColums}
                    data={tablePageData}
                    columns={columns}
                    currentIndex={focusIndex}
                    isDrag={config && config.isDrag}
                    bodyStyle={{ ...tableHight }}
                    useFixedHeader={true}
                    scroll={{
                        x: true,
                        y: config && config.height ? config.height : tableMaxHeight
                    }}
                    haveExpandIcon={() => true}
                    rowClassName={(record, current) => {
                        return table.currentIndex === current ? 'editTable-selected-row' : '';
                    }}
                    getSelectedDataFunc={this.getSelectedDataFunc}
                    onRowClick={(record, index, e) => {
                        // 行点击操作 1、根据index设置行样式 2、自定义点击事件
                        this.focusRowByIndex(index);
                        this.setClickRowIndex(record, index);
                        if (config && typeof config.onRowClick === 'function') {
                            config.onRowClick.call(this,record,index,e);
                        }
                    }}
                    onRowDoubleClick={(record, index, e) => {
                        this.focusRowByIndex(index);
                        this.setClickRowIndex(record, index);
                        // 行双击的方法 判断配置文件是否有，并且config.onRowDoubleClick是否是函数  zhanghengh 18/5/8
                        if (config && config.onRowDoubleClick && typeof config.onRowDoubleClick === 'function') {
                            config.onRowDoubleClick.call(this, record, index, e);
                        }
                    }}
                    // 是否取消滚动分页
                    lazyload={config.lazyload}
                    {...sort}
                    {...config}
                    />
                </div>
        
                {config && config.showPagination && meta.status === 'browse' && (
                    <div className="editTable-component-paginationDiv">
                    <div className="page-size">
                        <Select
                        value={String(table.pageInfo.pageSize)}
                        style={{ width: 85 }}
                        onSelect={val => {
                            pageSizeChange.call(this, val);
                        }}
                        className="fl"
                        showClear={false}
                        >
                        <Option value="10">
                            <NCTooltip
                            className="tooltip-word-color"
                            placement="top"
                            delay={1}
                            overlay={`10${json && json['table_pagination002']}/${json && json['table_pagination001']}`}
                            >
                            <div className='select-single-line-and-ellipsis'>{`10${json && json['table_pagination002']}/${json && json['table_pagination001']}`}</div>
                            </NCTooltip>
                        </Option>
                        <Option value="20">
                            <NCTooltip
                            className="tooltip-word-color"
                            placement="top"
                            delay={1}
                            overlay={`20${json && json['table_pagination003']}/${json && json['table_pagination001']}`}
                            >
                            <div className='select-single-line-and-ellipsis'>{`20${json && json['table_pagination003']}/${json && json['table_pagination001']}`}</div>
                            </NCTooltip>
                        </Option>
                        <Option value="50">
                            <NCTooltip
                            className="tooltip-word-color"
                            placement="top"
                            delay={1}
                            overlay={`50${json && json['table_pagination003']}/${json && json['table_pagination001']}`}
                            >
                            <div className='select-single-line-and-ellipsis'>{`50${json && json['table_pagination003']}/${json && json['table_pagination001']}`}</div>
                            </NCTooltip>
                        </Option>
                        <Option value="100">
                            <NCTooltip
                            className="tooltip-word-color"
                            placement="top"
                            delay={1}
                            overlay={`100${json && json['table_pagination003']}/${json && json['table_pagination001']}`}
                            >
                            <div className='select-single-line-and-ellipsis'>{`100${json && json['table_pagination003']}/${json && json['table_pagination001']}`}</div>
                            </NCTooltip>
                        </Option>
                        </Select>
                        {!!+table.pageInfo.total && (
                        <span className="fl NC_total">
                            {' '}
                            {`${json && json['table_pagination002']}
                                                ${table.pageInfo.total}
                                                ${json && json['table_pagination003']}`}
                        </span>
                        )}
                    </div>
                    <div className="table-pagination">
                        <NCPagination
                        prev
                        next
                        boundaryLinks
                        items={Number(table.pageInfo.totalPage)}
                        maxButtons={Number(table.pageInfo.totalPage) === 7 ? 6 : MAX_BUTTONS}
                        activePage={Number(table.pageInfo.pageIndex)}
                        onSelect={val => {
                            pageIndexChange.call(this, val);
                        }}
                        />
                    </div>
                    </div>
                )}
                </div>
                {/*侧拉框*/}
                {model === 'open' && (
                <SideBox
                    model={model}
                    origin={origin}
                    config={config}
                    modelIndex={modelIndex}
                    moduleId={moduleId}
                    operType={operType}
                    tableScope={this}
                    renderItem={renderItem}
                    pageScope={pageScope}
                    mask={animation.mask}
                    dialog={animation.dialog}
                    modelValue={modelValue}
                    modelScale={modelScale}
                    tempColums={tempColums}
                    edittable_dom={edittable_dom}
                    tableModeldata={tableModeldata}
                    modelDisabled={modelDisabled}
                />
                )}
            </div>
        );
    }

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
    handleMeta(items, meta, moduleId, config, renderItem, model, edittable_dom, pageScope, isGetPlatform) {
        return items.map(item => {
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
            return this.handleChildMeta.call(
                this,
                item,
                meta,
                moduleId,
                config,
                renderItem,
                model,
                edittable_dom,
                pageScope,
                isGetPlatform
            );
        });
    }
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
    handleChildMeta(item, meta, moduleId, config, renderItem, model, edittable_dom, pageScope, isGetPlatform) {
        let {
            attrcode: ICode, //字段 code 
            itemtype: IType, //字段类型
            required: IReq, //字段是否必填
            disabled: metaDisabled, //字段是否可编辑，true 为禁止编辑
            label: ILable,
            children: IChildren,
            renderStatus, //'edit'
            color, //表头字体颜色
            scale: IScale,
            hyperlinkflag,
            languageMeta: LanguageMeta,
            isSort = true, //是否启用前端排序
            sorter: Isorter, //自定义 sorter 
            headerClick //点击表头
        } = item;
        let { isEdit } = this.props;
        let render;
        // 表格状态
        let status = isEdit ? 'edit' : 'browse';
        // 每个column单项的render函数
        if (IType === 'customer' && ICode !== 'numberindex') {
            render = item.render;
        } else {
            render = (text, record, index) => {
                // 比如操作列不走此分支
                let [values, editItem, value, display, scale, disabled, isEdit] = [record.values];
                // 如果有这个键取这个键的value值，否则为null
                value = isObj(values[ICode]) ? typeFormat(values[ICode].value, IType) : null;
                display = isObj(values[ICode]) ? values[ICode].display : null;
                scale = isObj(values[ICode])
                        ? !isWrong(values[ICode].scale) && values[ICode].scale != '-1'
                            ? +values[ICode].scale
                            : +IScale || 0
                        : +IScale || 0;
                // true为不可编辑
                disabled = isObj(values[ICode]) ? values[ICode].disabled || false : false;
                // true为渲染控件
                isEdit = isObj(values[ICode]) ? values[ICode].isEdit || false : false;
                return (
                    <Cell
                        text={text}
                        item={item}
                        refcode={item.refcode}
                        ICode={ICode}
                        scale={scale}
                        value={value}
                        IType={IType}
                        isEdit={isEdit}
                        config={config}
                        record={record}
                        model={model}
                        index={index}
                        values={values}
                        display={display}
                        moduleId={moduleId}
                        disabled={disabled}
                        tableScope={this}
                        pageScope={pageScope}
                        renderItem={renderItem}
                        tableStatus={status}
                        renderStatus={renderStatus}
                        LanguageMeta={LanguageMeta}
                        metaDisabled={metaDisabled}
                        hyperlinkflag={hyperlinkflag}
                        edittable_dom={edittable_dom}
                        isGetPlatform={isGetPlatform}
                        tableInfo={this.state.table}
                        focusRowByIndex={this.focusRowByIndex}
                        setClickRowIndex={this.setClickRowIndex}
                    />
                );
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
        let title = ((req, dis, color, sta) => {
            // req为true为必输  dis为false为可编辑
            return (
                <div
                className="edittable-title single-line-and-ellipsis"
                // 增加过滤的交互，给表格加个onclick事件
                onClick={() => {
                    isFunction(headerClick) &&
                    headerClick(
                        {
                        ...this.props
                        },
                        ICode
                    );
                }}
                style={IType === 'number' ? { paddingRight: '9px', textAlign: 'right', color } : { color }}
                >
                    <span className={`${ICode !== 'numberindex' ? 'title-vertical-center' : ''}`}>
                        {req && sta && <i className="mark-required">*</i>}
                        {item.label}
                    </span>
                </div>
            );
        })(IReq, metaDisabled, color, status === 'edit');
        item.title = (
            <div className={`${ICode !== 'numberindex' ? 'title-container' : ''}`}>
                {title}
            </div>
        );
        item.key = ICode;
        item.dataIndex = ICode;
    
        // 添加默认宽度datetimepicker
        if (isWrong(item.width)) {
            if (item.itemtype === 'datetimepicker') {
                item.width = '240px';
            } else if (item.itemtype === 'rangepicker') {
                item.width = '390px';
            } else if (CONFIG.timeTypes.includes(item.itemtype)) {
                item.width = '160px';
            } else {
                item.width = '120px';
            }
        }
        // 为所有列添加默认前端排序功能， 通过模版的isSort字段和自定义sorter配置
        if (isSort && !isFunction(Isorter)) {
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
        return { ...item, render };
    }

    /**
     * 添加日期框打开收起标识
     * @param {*} tempColums 
     * @param {*} verify 
     * @param {*} stateVerify 
     */
    setDTOpen(tempColums, verify, stateVerify) {
        tempColums.forEach(eve => {
        // 日期控件编辑前处理加了DTOpen
        const { attrcode, children } = eve;
        if (!isUndefined(children)) {
            // 判断和并列的情况
            setDTOpen(children, verify, stateVerify);
        } else {
            verify[attrcode] = (stateVerify && stateVerify.verify[attrcode]) || { DTOpen: false, selectOpen: false };
        }
        });
    }

    render() {
        // console.log('渲染表格');
        let {
            moduleId = ''
        } = this.props;
        return (
            <div ref={e => (this.edittable_dom = e)} {...this.props}>
                <div id={`${moduleId}`}>
                    {this.createEditTable.call(this, this.props, this.edittable_dom, this.isGetPlatform)}
                </div>
            </div>
        );
    }
}

EditTable.propTypes = propTypes;
EditTable.defaultProps = defaultProps;
export default EditTable;
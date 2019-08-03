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
import Cell from './Cell';
import { isFunction,checkHasIndex,deepClone,isWrong,isObj,typeFormat,isArray } from './utils';
import sort from 'bee-table/build/lib/sort.js';
import multiSelect from "bee-table/build/lib/multiSelect.js";

const ComplexTable = sort(NCTable, Icon);

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
            },
            currentIndex: -1
        };
        // 是否获取到多语的标识，让cell正确更新
        this.isGetPlatform = false;
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
     * 创建 EditTable
     * @param {*} props 
     * @param {*} edittable_dom 
     * @param {*} isGetPlatform 
     */
    createEditTable(props, edittable_dom, isGetPlatform) {
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
        // status: '0'(编辑态)，'1'()，'2'()，'3'()
        let tablePageData = rows.filter(e => e.status != '3');
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
        //     // columns = defaultColumns.concat(columns);
        //     ComplexTable = multiSelect(ComplexTable,Checkbox);
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
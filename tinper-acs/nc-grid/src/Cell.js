// 单元格组件部分
import React, { Component } from 'react';
// import pureRender from './pureRender';
// import { createEditableItem } from './create';
// import { NCTooltip as Tooltip } from '../../base';
import Tooltip from 'bee-tooltip';
import NCFormControl from './nc_FormControl';
import InputNumber from 'bee-input-number';
import Select from 'bee-select';
import Item from './Item';
// import linkTo from '../../api/linkTo';
import CONFIG from './config';
// import {
//     isTimeType,
//     changeTime,
//     getLangCode,
// } from '../../public';
import { 
    isObj,
    testType,
    isWrong,
    typeFormat,
    isBoolean,
    isNullOrVoid,
    formatAcuracy,
    ncRounding,
    undefinedOrfalse,
    isString,
    getDisplayByValue,
    isEmpty,
    // getChangedRowsOldValue
} from './utils';
import { setFocusRowIndex } from './api/getFocusRowIndex';

const Option = Select.Option;
// 表格侧拉编辑前siwtch类型的标识
let switchContinue = true;
// 表格侧拉编辑前checkbox_siwtch类型的标识
let checkboxSwitchContinue = true;
// 表格侧拉编辑前focus类型的标识
let blurContinue = true;

// @pureRender()
export default class Cell extends Component {
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
                allpks: []
            },
        };
        this.batchData = null;
        this.tableChangedRowsOldValue = null;
    }
    componentWillMount(){
        let {tableInfo} = this.props;
        this.setState({
            table: tableInfo
        })
        this.tableChangedRowsOldValue = tableInfo.rows;
    }
    /**
     * 处理onchang和onblur时变化数据的格式
     */
    handleChangeData(itemtype, foolval, val, item) {
        // console.log('this.batchData',this.batchData);
        switch (true) {
            // 参照
            case itemtype:
                return foolval;
            // 其他
            default:
                return {
                    value: val,
                    display: getDisplayByValue(val, item)
                };
        }
    }
    hanlder = () => {
        const { item, record, tableScope } = this.props;
        if (!isObj(record.values[item.attrcode])) {
            record.values[item.attrcode] = {};
        }
        record.values[item.attrcode].isEdit = true;
        tableScope.setState({
            table: tableScope.state.table
        });
    };
    hanlderBeforeEvent = (isBoolean, isContinue, isPromise) => {
        if (isBoolean && isContinue) {
            this.hanlder();
        } else if (!isBoolean) {
            const dist = isPromise ? isContinue : isContinue();
            dist.then(data => {
                !!data && this.hanlder();
            });
        }
    };
    /**
     * 浏览态渲染函数
     * @param {*} IType
     * @param {*} display
     * @param {*} value
     */
    handleBrowse = function(IType, display, value, scale, attrcode, languageMeta, values) {
        let json = this.state.json;
        switch (true) {
        case isBoolean(IType):
            return value == 'Y' || value == true ? json && json['table_yes'] : json && json['table_no'];
        // case isTimeType(IType):
        //     if (IType === 'datetimepicker') {
        //         // 时间这里先这样判断，有好方法再说
        //         return changeTime(value, 'YYYY-MM-DD HH:mm:ss');
        //     } else if (IType === 'timepicker' || IType === 'datePickerNoTimeZone') {
        //         return value;
        //     } else {
        //         return changeTime(value);
        //     }
        case IType === 'number':
            // 表格浏览态加了四舍五入
            return formatAcuracy(ncRounding(value, scale), scale);
        case IType === 'residtxt':
            // 这里是多语文本的编辑显示逻辑
            // attrcode字段对应的value是主语言
            // 显示规则是有登陆语言显示登陆语言，登陆语言通过getLangCode获得，没有登陆语言显示主语言，attrcode字段对应的value，主语言语言在没有，就什么也不显示
            let LangCode = getLangCode();
            let loginLang = languageMeta.filter(i => i.languageCode == LangCode);
            if (loginLang.length > 0) {
                loginLang[0].index === '1' ? (loginLang[0].index = '') : '';
                if (values[attrcode + loginLang[0].index] && values[attrcode + loginLang[0].index].value) {
                    value = values[attrcode + loginLang[0].index].value;
                    return value;
                }
                return value;
            }
            return value;
        default:
            return isNullOrVoid(display) ? value : display;
        }
    };
    handleClick = () => {
        let _this = this;
        const { values, item, config, record, pageScope, ICode, moduleId, disabled, metaDisabled, index } = this.props;
        setTimeout(() => {
            _this.props.setClickRowIndex({record: record, index});
            if (disabled === 'off' || (!disabled && !metaDisabled)) {
                // 如果当前单元格被禁用，就不渲染
                if (config && typeof config.onBeforeEvent == 'function') {
                    let isContinue = config.onBeforeEvent(
                        {
                        ...pageScope.props,
                        ...pageScope.output
                        },
                        moduleId,
                        item,
                        index,
                        values[ICode],
                        record
                    );
                    const type = testType(isContinue);
                    switch (type) {
                        // true/flase
                        case 'Boolean':
                            this.hanlderBeforeEvent(true, isContinue);
                            break;
                        // 返回的是async函数
                        case 'AsyncFunction':
                            this.hanlderBeforeEvent(false, isContinue, false);
                            break;
                        // 返回的Promise对象
                        case 'Promise':
                            this.hanlderBeforeEvent(false, isContinue, true);
                            break;
                        // 取Boolean值
                        default:
                            this.hanlderBeforeEvent(true, !!isContinue);
                            break;
                    }
                    return false;
                }
                this.hanlder();
                return false;
            }
        }, 0);
    };
    // 处理旧值函数
    saveChangedRowsOldValue(moduleId, index, attrcode, value) {
        !Array.isArray(this.tableChangedRowsOldValue[moduleId]) && (this.tableChangedRowsOldValue[moduleId] = []);
        !isObj(this.tableChangedRowsOldValue[moduleId][index]) && (this.tableChangedRowsOldValue[moduleId][index] = {});
        // this.tableChangedRowsOldValue[moduleId][index][attrcode] = value;
    }
  
    // 获取旧值函数
    getChangedRowsOldValue(moduleId, index, attrcode) {
        let isArr = Array.isArray(this.tableChangedRowsOldValue[moduleId]);
        if (!isArr || (isArr && !isObj(this.tableChangedRowsOldValue[moduleId][index]))) {
            return null;
        }
        return this.tableChangedRowsOldValue[moduleId][index][attrcode] || null;
    }
  
    // 删除旧值函数
    delChangedRowsOldValue(moduleId, index, attrcode) {
        let isArr = Array.isArray(this.tableChangedRowsOldValue[moduleId]);
        if (!isArr || (isArr && !isObj(this.tableChangedRowsOldValue[moduleId][index]))) {
            return;
        }
        if (attrcode) {
            this.tableChangedRowsOldValue[moduleId][index][attrcode] = null;
        } else {
            this.tableChangedRowsOldValue[moduleId][index] = {};
        }
    }

    /**
     * 创建 EditableItem
     * @param {*} moduleId 
     * @param {*} config 
     * @param {*} type 
     * @param {*} renderItem 
     * @param {*} item 
     * @param {*} index 
     * @param {*} value 
     * @param {*} scale 
     * @param {*} disabled 
     * @param {*} record 
     * @param {*} model 
     * @param {*} status 
     * @param {*} edittable_dom 
     * @param {*} pageScope 
     */
    createEditableItem({moduleId, config = {}, type = 'line', renderItem = {}, item = {}, index = 1, value = null, scale, disabled = false, record, model = 'origin', status = false, edittable_dom, pageScope}) {
        record = Object.keys(record).length
            ? record
            : {
                rowid: null,
                status: '0',
                values: {}
                };
        // console.log('渲染单元格',value,record)
        return this.renderTableItem.call(
            this,
            moduleId,
            config,
            type,
            record,
            item,
            index,
            value,
            scale,
            disabled,
            renderItem,
            model,
            status,
            edittable_dom,
            pageScope
        );
    }

    /**
     * 渲染 Item 组件
     * @param {*} moduleId 
     * @param {*} config 
     * @param {*} type 
     * @param {*} record 
     * @param {*} item 
     * @param {*} index 
     * @param {*} value 
     * @param {*} scale 
     * @param {*} disabled 
     * @param {*} renderItem 
     * @param {*} model 
     * @param {*} status 
     * @param {*} edittable_dom 
     * @param {*} pageScope 
     */
    renderTableItem(moduleId, config, type, record, item, index, value, scale, disabled, renderItem, model, status, edittable_dom, pageScope) {
        let { 
            editItem, 
            isdisabled, 
            value: valueData, 
            scale: scaleData 
        } = this._renderTableItemByType.call(
            this,
            moduleId,
            record,
            item,
            value,
            scale,
            disabled,
            renderItem,
            model,
            status,
            index,
            type,
            pageScope
        );
        if (!editItem) return <div />;
        let showDisable = (disabled => {
            switch (disabled) {
                case false:
                    return !undefinedOrfalse(item.disabled);
                case 'on':
                    return true;
                case 'off':
                    return false;
                default:
                    return false;
            }
        })(isdisabled);
        let [isInputType, unInputType, isLineStatus, changedrows] =
        // 用于 onblur 和onchange常量
        [CONFIG.blurTypes.includes(item.itemtype), CONFIG.changeTypes.includes(item.itemtype), type === 'line', []];
        // 侧拉框不自动获取焦点
        const focus = type !== 'modal';
        // 新写的需求还有问题，勿删
        // const focus = type !== 'modal' && item.itemtype !== 'checkbox_switch' && item.itemtype !== 'switch' ? true : false;
        const isMaxlength = !!(item.itemtype === 'residtxt' || item.itemtype === 'number');
        const placeholder = type === 'modal' && item.itemtype == 'refer' ? { placeholder: '' } : {};
        // 多语
        const json = this.state.json;
        // 表格行数据
        const rows = this.state.table.rows;
        // 表格侧拉数据
        // const tableModeldata = pageScope.state.tableModeldata[moduleId];
        return (
            <Item
                content={{
                ...editItem,
                edittable_dom,
                props: {
                    ...editItem.props,
                    ...item,
                    ...placeholder,
                    scale: scaleData, // number的精度 这里是判断了模版和传入的之后的结果
                    value: valueData, // 给其他组件设置value
                    foolValue: valueData, // 给参照设置的value
                    autoFocus: focus, // 当打开侧拉框的时候不获取焦点判断
                    autofocus: focus, // 当打开侧拉框的时候不获取焦点判断
                    title: '', // 将列的title替换掉，避免出现不必要的值，如果有bug在改zhanghengh
                    disabled: showDisable, // 如果没有disabled或者false 看成false
                    maxlength: isMaxlength ? item.maxlength : null,
                    isLineStatus, // 当前表格是侧拉状态还是表体状态
                    onChange: (valueChange, foolValue) => {
                    // 控制侧拉编辑前switch和checkbox_switch类型返回false, 不可编辑
                    if (!checkboxSwitchContinue || !switchContinue) {
                        checkboxSwitchContinue = true;
                        switchContinue = true;
                        return;
                    }
                    if (CONFIG.blurTypes.includes(item.itemtype)) {
                        if (isString(valueChange)) {
                        valueChange = valueChange.trim();
                        }
                    }
                    // 用于侧拉框状态下执行编辑前
                    if (!isLineStatus && CONFIG.beforeChangeTypes.includes(item.itemtype)) {
                        // 如果当前单元格被禁用，就不渲染
                        if (config && typeof config.onBeforeEvent == 'function') {
                        let isContinue = config.onBeforeEvent(
                            { ...pageScope.props, ...pageScope.output },
                            moduleId,
                            item,
                            index,
                            record.values[item.attrcode],
                            record
                        );
                        // 编辑前返回false直接return，这样才不影响逻辑
                        if (!isContinue) {
                            return;
                        }
                        }
                    }
                    // 适配多语 //这是最新适配的多语，可以了在放开 有问题看一下
                    if (item.itemtype === 'residtxt') {
                        if (model == 'open') {
                            // 当侧拉的情况下
                            Object.keys(valueChange).forEach(i => {
                                if (tableModeldata.values[i]) {
                                tableModeldata.values[i] = {
                                    ...tableModeldata.values[i],
                                    ...(valueChange[i] || {})
                                };
                                } else {
                                tableModeldata.values[i] = valueChange[i] || {};
                                }
                                // 同步侧拉更改的数据到表体
                                if (rows[index].values[i]) {
                                rows[index].values[i] = {
                                    ...rows[index].values[i],
                                    ...(valueChange[i] || {})
                                };
                                } else {
                                rows[index].values[i] = { ...(valueChange[i] || {}) };
                                }
                            }, this);
                        } else {
                        // 当表体的情况下
                        Object.keys(valueChange).forEach(i => {
                            if (rows[index].values[i]) {
                            rows[index].values[i] = {
                                ...rows[index].values[i],
                                ...(valueChange[i] || {}),
                                isEdit: true
                            };
                            } else {
                            rows[index].values[i] = { ...(valueChange[i] || {}), isEdit: true };
                            }
                        }, this);
                        }
                    }
                    // 校验输入长度
                    let flag = isInputType
                        ? item.itemtype !== 'number'
                        ? foolValue.target
                            ? foolValue.target.isFlag
                            : false
                        : false
                        : false;
                    if (!flag && item.maxlength && isInputType && valueChange && foolValue) {
                        let arr = Array(valueChange.length);
                        let count = arr.length;
                        arr.fill(1);
                        valueChange.replace(/[^\x00-\xff]/g, (a, b, c) => {
                            arr[b] = 2;
                        });
                        let reducer = arr.reduce((a, b) => {
                            if (a + b > item.maxlength) {
                                count--;
                            }
                            return a + b;
                        }, 0);
                        if (!flag && reducer > item.maxlength) {
                            valueChange = rows[index].values[item.attrcode].value;
                            toast({
                                color: 'danger',
                                title: `${json && json['table_tips']}`,
                                content: `${json && json['table_tips_content']}
                                                        ${item.maxlength}`
                            });
                            foolValue.target && foolValue.target.blur();
                        }
        
                        rows[index].values[item.attrcode].value = valueChange;
                    }
        
                    // 判断是否为多选参照start
                    let isMul;
                    editItem.props.hasOwnProperty('isMultiSelectedEnabled') && (isMul = editItem.props.isMultiSelectedEnabled);
                    item.hasOwnProperty('isMultiSelectedEnabled') && (isMul = item.isMultiSelectedEnabled);
                    let _getValue = function(init) {
                        return isObj(init) ? init.refpk : init;
                    };
                    // 判断是否为多选参照end
        
                    let attr = isObj(rows[index].values[item.attrcode]);
                    if (!attr) {
                        // 因为有些字段为空值，后台默认为过滤去了
                        rows[index].values[item.attrcode] = {};
                        if (model == 'open') {
                            tableModeldata.values[item.attrcode] = {};
                        } else {
                            rows[index].values[item.attrcode] = {};
                        }
                    }
        
                    // 因为timepicker的value特殊，所以特殊转换一下start，有问题在看一下
                    if (item.itemtype === 'timepicker') {
                        if (valueChange && valueChange.format) {
                            valueChange = valueChange.format('hh:mm:ss');
                        }
                    }
                    // 因为timepicker的value特殊，所以特殊转换一下end
        
                    // 处理单元格变化的数据zhnghengh
                    let theValue = this.handleChangeData(item.itemtype === 'refer', foolValue, valueChange, item);
                    if (item.itemtype !== 'residtxt') {
                        // 多语文本暂时不支持批改
                        this.batchData = {
                            // 在onchange时缓存列数据的key 和value  用于批量更改   zhanghengh 18/6/29
                            batchChangeIndex: index,
                            batchChangeKey: item.attrcode,
                            batchChangeValue: isMul ? theValue : theValue.value,
                            batchChangeDisplay: isMul ? null : theValue.display
                        };
                    } else {
                        // 多语批改
                        this.batchData = {
                            batchChangeIndex: index,
                            batchChangeKey: item.attrcode,
                            batchChangeValue: valueChange,
                            batchChangeDisplay: null
                        };
                    }
                    if (item.itemtype !== 'residtxt') {
                        // 多语文本不走这里
                        if (model == 'open') {
                            Object.assign(tableModeldata.values[item.attrcode], theValue);
                        } else {
                            Object.assign(rows[index].values[item.attrcode], theValue);
                        }
                    }
        
                    // 把status置为1，标识修改     状态不为1的不动 (比如用户自己set但是状态为2的)
                    if (rows[index].status == '0') {
                        rows[index].status = '1';
                    }
        
                    this.setState({ table: this.state.table });
        
                    if (unInputType) {
                        // 新的取旧值
                        let initVal = this.getChangedRowsOldValue.call(this, moduleId, index, item.attrcode);
                        let isRefpk = _getValue(initVal);
                        if (isMul) {
                        if (valueChange.length > 0) {
                            valueChange.forEach((one, ind) => {
                                changedrows.push({
                                    rowid: record.rowid,
                                    newvalue: {
                                    value: _getValue(one) || ''
                                    },
                                    oldvalue: {
                                    value: ind <= 0 ? isRefpk || '' : ''
                                    }
                                });
                            });
                        } else {
                            changedrows.push({
                            rowid: record.rowid,
                            newvalue: {
                                value: ''
                            },
                            oldvalue: {
                                value: isRefpk || ''
                            }
                            });
                        }
                        } else {
                            changedrows.push({
                                rowid: record.rowid,
                                newvalue: {
                                value: item.itemtype == 'refer' ? foolValue.value || '' : valueChange || ''
                                },
                                oldvalue: {
                                value: initVal || ''
                                }
                            });
                        }
        
                        // 判断新旧值是否相等
                        function isValEqual(newVal, oldVal) {
                        if (
                            (newVal === null || newVal === '' || newVal === ' ') &&
                            (oldVal === null || oldVal === '' || oldVal === ' ')
                        ) {
                            return true;
                        } else if (newVal == oldVal) {
                            return true;
                        }
                        return false;
                        }
        
                        if (item.editAfterFlag && !isValEqual(changedrows[0].newvalue.value, changedrows[0].oldvalue.value)) {
                        pageScope.handleRelationItems({
                            type: 'table',
                            areaCode: moduleId,
                            key: item.attrcode,
                            changedrows,
                            index,
                            rowid: record.rowid,
                            record: rows[index],
                            callback: () => {
                            config &&
                                typeof config.onAfterEvent == 'function' &&
                                config.onAfterEvent(
                                {
                                    ...pageScope.props,
                                    ...pageScope.output
                                },
                                moduleId,
                                item.attrcode,
                                valueChange,
                                changedrows,
                                index,
                                rows[index],
                                type,
                                'change'
                                );
                            /***
                             * 二开的编辑后事件 --liuxis
                             */
                            let secFns = pageScope.NCCSecondDevelop;
                            secFns &&
                                secFns.onAfterEvent &&
                                secFns.onAfterEvent({
                                moduleId,
                                record: rows[index],
                                attrcode: item.attrcode,
                                methods: pageScope.output
                                });
                            }
                        });
                        } else {
                        config &&
                            typeof config.onAfterEvent == 'function' &&
                            config.onAfterEvent(
                            { ...pageScope.props, ...pageScope.output },
                            moduleId,
                            item.attrcode,
                            valueChange,
                            changedrows,
                            index,
                            rows[index],
                            type,
                            'change'
                            );
        
                        /***
                         * 二开的编辑后事件 --liuxis
                         */
                        // let secFns = pageScope.NCCSecondDevelop;
                        let secFns;
                        secFns &&
                            secFns.onAfterEvent &&
                            secFns.onAfterEvent({
                            moduleId,
                            record: rows[index],
                            attrcode: item.attrcode,
                            methods: pageScope.output
                            });
                        }
                        let OldVal = isMul
                        ? valueChange.length > 0
                            ? valueChange[0]
                            : null
                        : item.itemtype === 'refer'
                        ? foolValue.vlaue == ''
                            ? null
                            : foolValue.vlaue
                        : valueChange;
                        this.saveChangedRowsOldValue.call(this, moduleId, index, item.attrcode, OldVal);
                    }
                    },
                    onOpenChange: val => {
                        if (!isLineStatus) {
                            if (val) {
                            return;
                            }
                            pageScope.myTable[moduleId].verify[item.attrcode].DTOpen = val;
                            this.setState({ table: this.state.table });
                        }
                    },
                    onClick: (evt, event) => {
                        // 新需求还有点问题，勿删
                        // if (((!isLineStatus || item.itemtype === 'checkbox_switch') && CONFIG.beforeClickTypes.includes(item.itemtype))) {
                        if (!isLineStatus && CONFIG.beforeClickTypes.includes(item.itemtype)) {
                            // 获取事件对象
                            let target = (evt && evt.target) || (event && event.target) || event;
                            // 侧拉编辑前回调
                            if (config && typeof config.onBeforeEvent == 'function') {
                            let isContinue = config.onBeforeEvent(
                                { ...pageScope.props, ...pageScope.output },
                                moduleId,
                                item,
                                index,
                                record.values[item.attrcode],
                                record
                            );
                            // 用于处理侧拉框编辑前所要执行的函数
                            const modelHanlder = (flag, target) => {
                                if (!flag && target) {
                                if (item.itemtype === 'checkbox_switch') {
                                    checkboxSwitchContinue = false;
                                }
                                target.blur && target.blur();
                                }
                            };
                            let result = null;
                            const type = testType(isContinue);
                            switch (type) {
                                // true/flase
                                case 'Boolean':
                                result = hanlderModelBeforeEvent(true, isContinue, null, modelHanlder, target);
                                break;
                                // 返回的是async函数
                                case 'AsyncFunction':
                                result = hanlderModelBeforeEvent(false, isContinue, false, modelHanlder, target);
                                break;
                                // 返回的Promise对象
                                case 'Promise':
                                result = hanlderModelBeforeEvent(false, isContinue, true, modelHanlder, target);
                                break;
                                // 取Boolean值
                                default:
                                result = hanlderModelBeforeEvent(true, !!isContinue, null, modelHanlder, target);
                                break;
                            }
                            // 处理日期控件编辑前
                            result.then(value => {
                                pageScope.myTable[moduleId].verify[item.attrcode].DTOpen = value;
                                this.setState({ table: this.state.table });
                            });
                            } else {
                                pageScope.myTable[moduleId].verify[item.attrcode].DTOpen = true;
                                this.setState({ table: this.state.table });
                            }
                        }
                    },
                    onFocus: (evt, event) => {
                        // 新需求还有点问题，勿删
                        // if (((!isLineStatus || item.itemtype === 'switch') && CONFIG.beforeFocusTypes.includes(item.itemtype))) {
                        if (!isLineStatus && CONFIG.beforeFocusTypes.includes(item.itemtype)) {
                            // 获取事件对象
                            let target = (evt && evt.target) || (event && event.target) || event;
                            // 侧拉编辑前回调
                            if (config && typeof config.onBeforeEvent == 'function') {
                            let isContinue = config.onBeforeEvent(
                                { ...pageScope.props, ...pageScope.output },
                                moduleId,
                                item,
                                index,
                                record.values[item.attrcode],
                                record
                            );
            
                            // 用于处理侧拉框编辑前所要执行的函数
                            const modelHanlder = (flag, target) => {
                                if (!flag && target) {
                                    if (CONFIG.blurTypes.includes(item.itemtype) || item.itemtype === 'residtxt') {
                                        blurContinue = false;
                                    }
                                    target.blur && target.blur();
                                }
                            };
                            const type = testType(isContinue);
                            let result = null;
                            switch (type) {
                                // true/flase
                                case 'Boolean':
                                    result = hanlderModelBeforeEvent(true, isContinue, null, modelHanlder, target);
                                    break;
                                // 返回的是async函数
                                case 'AsyncFunction':
                                    result = hanlderModelBeforeEvent(false, isContinue, false, modelHanlder, target);
                                    break;
                                // 返回的Promise对象
                                case 'Promise':
                                    result = hanlderModelBeforeEvent(false, isContinue, true, modelHanlder, target);
                                    break;
                                // 取Boolean值
                                default:
                                    result = hanlderModelBeforeEvent(true, !!isContinue, null, modelHanlder, target);
                                    break;
                            }
                            if (item.itemtype === 'refer') {
                                // 这里就先这么处理了，侧拉批改会有问题
                                return result;
                            }
                            if (item.itemtype === 'select') {
                                result.then(value => {
                                    if (pageScope.myTable[moduleId].verify[item.attrcode].selectOpen) {
                                        pageScope.myTable[moduleId].verify[item.attrcode].selectOpen = false;
                                        this.setState({ table: this.state.table });
                                    } else {
                                        pageScope.myTable[moduleId].verify[item.attrcode].selectOpen = value;
                                        this.setState({ table: this.state.table });
                                    }
                                });
                            }
                            } else {
                                if (item.itemtype === 'select') {
                                    if (pageScope.myTable[moduleId].verify[item.attrcode].selectOpen) {
                                        pageScope.myTable[moduleId].verify[item.attrcode].selectOpen = false;
                                        this.setState({ table: this.state.table });
                                    } else {
                                        pageScope.myTable[moduleId].verify[item.attrcode].selectOpen = true;
                                        this.setState({ table: this.state.table });
                                    }
                                }
                            }
                        }
            
                        // 检验输入字符长度
                        // if (isInputType && item.maxlength) {
                        //     evt.target.isFlag = false;
                        //     evt.target.addEventListener(
                        //         'compositionstart',
                        //         e => {
                        //             e.target.isFlag = true;
                        //         },
                        //         false
                        //     );
                        //     evt.target.addEventListener(
                        //         'compositionend',
                        //         e => {
                        //             e.target.isFlag = false;
                        //             let flag = e.target.isFlag;
                        //             let val = e.target.defaultValue;
                        //             let arr = Array(val.length);
                        //             let count = arr.length;
                        //             arr.fill(1);
                        //             val.replace(/[^\x00-\xff]/g, (a, b, c) => {
                        //                 arr[b] = 2;
                        //             });
                        //             let reducer = arr.reduce((a, b) => {
                        //                 if (a + b > item.maxlength) {
                        //                     count--;
                        //                 }
                        //                 return a + b;
                        //             }, 0);
                        //             if (!flag && reducer > item.maxlength) {
                        //                 val = val.substring(0, count);
                        //                 rows[index].values[item.attrcode].value = val;
                        //                 toast({
                        //                     color: 'danger',
                        //                     title: `${json && json['table_tips']}`,
                        //                     content: `${json && json['table_tips_content']}${item.maxlength}`
                        //                 });
                        //                 e.target && e.target.blur();
                        //             }
                        //         },
                        //         false
                        //     );
                        //     this.setState({ table: this.state.table });
                        // }
                        // 多语控件都不走这里
                        if (item.itemtype !== 'residtxt') {
                            // onFocus 和value  用于批量更改   zhanghengh 18/6/29 先注释，以后可能有用
                            this.batchData = {
                                batchChangeIndex: index,
                                batchChangeKey: item.attrcode,
                                batchChangeValue: record.values[item.attrcode] ? record.values[item.attrcode].value : '',
                                batchChangeDisplay: record.values[item.attrcode] ? record.values[item.attrcode].display : ''
                            };
                        }
            
                        // 为了兼容refer，否则报错
                        return new Promise(resolve => {
                            resolve(true);
                        });
                    },
                    onMouseDown: () => {
                        // 在这个方法里处理switch类型组件编辑前返回false的情况
                        if (!isLineStatus && item.itemtype === 'switch') {
                            // 如果当前单元格被禁用，就不渲染
                            if (config && typeof config.onBeforeEvent == 'function') {
                                let isContinue = config.onBeforeEvent(
                                    { ...pageScope.props, ...pageScope.output },
                                    moduleId,
                                    item,
                                    index,
                                    record.values[item.attrcode],
                                    record
                                );
                
                                // 用于处理侧拉框编辑前所要执行的函数
                                const modelHanlder = flag => {
                                    if (!flag) {
                                        if (item.itemtype === 'switch') {
                                            switchContinue = false;
                                        }
                                    }
                                };
                                const type = testType(isContinue);
                                let result = null;
                                switch (type) {
                                    // true/flase
                                    case 'Boolean':
                                        result = hanlderModelBeforeEvent(true, isContinue, null, modelHanlder);
                                        break;
                                    // 返回的是async函数
                                    case 'AsyncFunction':
                                        result = hanlderModelBeforeEvent(false, isContinue, false, modelHanlder);
                                        break;
                                    // 返回的Promise对象
                                    case 'Promise':
                                        result = hanlderModelBeforeEvent(false, isContinue, true, modelHanlder);
                                        break;
                                    // 取Boolean值
                                    default:
                                        result = hanlderModelBeforeEvent(true, !!isContinue, null, modelHanlder);
                                        break;
                                }
                            }
                        }
                    },
                    onBlur: val => {
                        // 处理blur类型的组件，编辑前返回false，不可以在执行编辑后的问题
                        if (!blurContinue) {
                            blurContinue = true;
                            return;
                        }
                        if (CONFIG.blurTypes.includes(item.itemtype)) {
                            if (isString(val)) {
                            val = val.trim();
                            }
                        }
                        // 当数值类型只输入一个'-'的时候就将它赋值成0
                        if (item.itemtype === 'number' && val === '-') {
                            val = 0;
                            rows[index].values[item.attrcode].value = 0;
                        }
                        if (item.itemtype === 'select') {
                            // pageScope.myTable[moduleId].verify[item.attrcode].selectOpen = false;
                            this.setState({ table: this.state.table });
                        }
                        /*
                        * onBlur编辑后 和 切换控件状态
                        * 1、input类型    line   编辑后 + 切状态
                        *                model  编辑后
                        * 2、uninput类型  line   切状态
                        *                model  无编辑后  无切状态
                        */
                        setTimeout(() => {
                            // 处理input类型编辑后，ajax同步问题，以后好办法在改一下
                            if (isInputType || item.itemtype == 'residtxt') {
                            if (isLineStatus) {
                                rows[index].values[item.attrcode].isEdit = false;
                            }
            
                            const oldValue = this.getChangedRowsOldValue.call(this, moduleId, index, item.attrcode);
                            changedrows.push({
                                rowid: record.rowid,
                                newvalue: {
                                value: val || ''
                                },
                                oldvalue: {
                                value: oldValue ? (item.itemtype === 'number' ? formatAcuracy(oldValue, scaleData) : oldValue) : ''
                                }
                            });
                            this.saveChangedRowsOldValue.call(this, moduleId, index, item.attrcode, val);
                            if (item.itemtype === 'residtxt') {
                                if (model == 'open') {
                                // 当侧拉的情况下
                                // 多语  登陆语言值 赋值给主语言
                                tableModeldata.values[item.attrcode] = {
                                    ...tableModeldata.values[item.attrcode],
                                    value: val[item.attrcode].value
                                };
                                } else {
                                // 当表体的情况下
                                // 多语  登陆语言值 赋值给主语言
                                let LangCode = getLangCode();
                                let loginLang = item.languageMeta.filter(i => i.languageCode == LangCode);
                                if (loginLang[0] && !record.values[item.attrcode].value) {
                                    loginLang[0].index = loginLang[0].index == '1' ? '' : loginLang[0].index;
                                    rows[index].values[item.attrcode] = {
                                    ...record.values[item.attrcode],
                                    ...record.values[item.attrcode + loginLang[0].index],
                                    isEdit: false
                                    };
                                }
                                }
                            }
            
                            if (item.editAfterFlag) {
                                pageScope.handleRelationItems({
                                type: 'table',
                                areaCode: moduleId,
                                key: item.attrcode,
                                changedrows,
                                index,
                                rowid: record.rowid,
                                record: rows[index],
                                callback: () => {
                                    config &&
                                    typeof config.onAfterEvent == 'function' &&
                                    config.onAfterEvent(
                                        {
                                        ...pageScope.props,
                                        ...pageScope.output
                                        },
                                        moduleId,
                                        item.attrcode,
                                        val,
                                        changedrows,
                                        index,
                                        rows[index],
                                        type,
                                        'blur'
                                    );
                                    /***
                                     * 二开的编辑后事件 --liuxis
                                     */
                                    let secFns = pageScope.NCCSecondDevelop;
                                    secFns &&
                                    secFns.onAfterEvent &&
                                    secFns.onAfterEvent({
                                        moduleId,
                                        record: rows[index],
                                        attrcode: item.attrcode,
                                        methods: pageScope.output
                                    });
                                }
                                });
                            } else {
                                config &&
                                typeof config.onAfterEvent == 'function' &&
                                config.onAfterEvent(
                                    { ...pageScope.props, ...pageScope.output },
                                    moduleId,
                                    item.attrcode,
                                    val,
                                    changedrows,
                                    index,
                                    rows[index],
                                    type,
                                    'blur'
                                );
                                /***
                                 * 二开的编辑后事件 --liuxis
                                 */
                                // let secFns = pageScope.NCCSecondDevelop;
                                // secFns &&
                                // secFns.onAfterEvent &&
                                // secFns.onAfterEvent({
                                //     moduleId,
                                //     record: rows[index],
                                //     attrcode: item.attrcode,
                                //     methods: pageScope.output
                                // });
                            }
                            } else {
                                if (isLineStatus && !isEmpty(rows)) {
                                    rows[index].values[item.attrcode].isEdit = false;
                                }
                            }
            
                            // 多语控件都不走这里
                            if (item.itemtype !== 'residtxt') {
                                // 在onblur时缓存列数据的key 和value  用于批量更改   zhanghengh 18/6/29
                                this.batchData = {
                                    batchChangeIndex: index,
                                    batchChangeKey: item.attrcode,
                                    batchChangeValue: record.values[item.attrcode] ? record.values[item.attrcode].value : '',
                                    batchChangeDisplay: record.values[item.attrcode] ? record.values[item.attrcode].display : ''
                                };
                            }
            
                            let isSwitch_browseDisabled = item.itemtype === 'switch_browse' && showDisable; // 开关且不可编辑
                            // let allRows = pageScope.editTable.getNumberOfRows(moduleId);
                            /*
                            * 增一行的条件：
                            * 1、最后一行
                            * 2、isAddRow 为true
                            * 3、当前单元格值不为空
                            */
            
                            // if (
                            // allRows == index + 1 &&
                            // config &&
                            // !!config.isAddRow &&
                            // !isSwitch_browseDisabled &&
                            // !isWrong(val) &&
                            // pageScope.state.meta[moduleId].status === 'edit'
                            // ) {
                            //     // 添加自动增行后的回调
                            //     const callback = isFunction(config.addRowCallback) ? config.addRowCallback : undefined;
                            //     pageScope.editTable.addRow(moduleId, undefined, false, null, callback, true);
                            // } else {
                            //     // 为了保证不是最后一行 渲染浏览态
                            //     this.setState({ table: this.state.table });
                            // }
                        }, 0);
                    }
                }
                }}
            />
        );
    }

    /**
     * 根据字段类型渲染单元格内容
     * @param {*} moduleId 
     * @param {*} record 
     * @param {*} item 
     * @param {*} value 
     * @param {*} scale  number的精度 这里是判断了模版和传入的之后的结果
     * @param {*} disabled 
     * @param {*} renderItem 
     * @param {*} model 
     * @param {*} status 
     * @param {*} index 
     * @param {*} type 
     * @param {*} pageScope 
     */
    _renderTableItemByType(moduleId, record, item, value, scale, disabled, renderItem, model, status, index, type, pageScope) {
        let editItem = null;
        let { renderStatus = 'edit' } = item;
        if (item.render && renderStatus === 'edit') {
            editItem = item.render.call(null, value ? value.display || value.value : '', record, index);
        } else if (renderItem.table && renderItem.table[moduleId] && renderItem.table[moduleId][item.attrcode]) {
            editItem = renderItem.table[moduleId][item.attrcode];
        } else {
            const DTOpen =
                type === 'modal'
                ? {
                    open: pageScope.myTable[moduleId].verify[item.attrcode].DTOpen
                    }
                : {};
            const selectOpen =
                type === 'modal'
                ? {
                    open: pageScope.myTable[moduleId].verify[item.attrcode].selectOpen
                    }
                : {};
            switch (item.itemtype) {
                // case 'refer':
                //     editItem = <ReferLoader />;
                //     break;
                case 'input': //编辑态
                    editItem = <NCFormControl size="sm" autoFocus={true} />;
                    break;
                case 'label': //浏览态
                    editItem = <NCFormControl size="sm" autoFocus={true} isViewMode />;
                    break;
                case 'number':
                    scale = isWrong(scale) || scale == '-1' ? +item.scale || 0 : scale;
                    editItem = <InputNumber autoFocus={true} />;
                    break;
                // case 'textarea':
                //     editItem = <NCTextArea autoFocus={true} style={{ height: '33px' }} />;
                //     break;
                // case 'datepicker':
                //     editItem = (
                //         <NCTZDatePickClientHourTime
                //         {...DTOpen}
                //         autofocus={true}
                //         tableOpen={true}
                //         format="YYYY-MM-DD"
                //         locale={zhCN}
                //         placeholder={item.placeholder || ''}
                //         />
                //     );
                //     break;
                // case 'NCTZDatePickerStart':
                //     editItem = <NCTZDatePickerStart {...DTOpen} tableOpen={true} placeholder={item.placeholder || ''} />;
                //     break;
                // case 'datetimepicker':
                //     editItem = <NCTZDatePickClientTime {...DTOpen} tableOpen={true} placeholder={item.placeholder || ''} />;
                //     break;
                // case 'NCTZDatePickerEnd':
                //     editItem = <NCTZDatePickerEnd {...DTOpen} tableOpen={true} placeholder={item.placeholder || ''} />;
                //     break;
                // case 'rangepicker':
                //     editItem = <NCRangePickerClient {...DTOpen} tableOpen={true} placeholder={item.placeholder || ''} />;
                //     break;
                // case 'datePickerNoTimeZone':
                //     editItem = <NCDatePickerNoTimeZone {...DTOpen} tableOpen={true} placeholder={item.placeholder || ''} />;
                //     break;
                // case 'timepicker':
                //     value = record.values[item.attrcode].value ? moment(record.values[item.attrcode].value, 'hh:mm:ss') : null;
                //     editItem = <NCTimepicker {...DTOpen} tableOpen={true} placeholder={item.placeholder || ''} format="HH:mm:ss" />;
                //     break;
                case 'select':
                    let fixed =
                        model == 'open'
                        ? {
                            getPopupContainer: () => document.querySelector('#tableModal')
                            }
                        : {};
                    editItem = (
                        <Select
                        {...fixed}
                        {...selectOpen}
                        size="sm"
                        isTable={true}
                        // dropdownClassName={NODE_ENV === 'test' && item.attrcode + '-' + 'select'}
                        >
                        {item.options.length &&
                            item.options.map((one, i) => (
                            <Option key={i} value={String(one.value)}>
                                {` ${one.display} `}
                            </Option>
                            ))}
                        </Select>
                    );
                    break;
                // case 'radio':
                //     // 需要value
                //     editItem = (
                //         <RadioGroup selectedValue={String(value)}>
                //         {item.options.map((e, i) => {
                //             return (
                //             <Radio key={i} value={String(e.value)}>
                //                 {e.display}
                //             </Radio>
                //             );
                //         })}
                //         </RadioGroup>
                //     );
                //     break;
                // case 'switch':
                //     // 需要value
                //     editItem = <Switch checked={!!value} />;
                //     break;
                // case 'checkbox':
                //     value = String(value);
                //     editItem = (
                //         <span>
                //         {item.options.map((item, i) => {
                //             return (
                //             <Checkbox colors="primary" checked={false} key={i}>
                //                 {item.display}
                //             </Checkbox>
                //             );
                //         })}
                //         </span>
                //     );
                //     break;
                // case 'checkbox_switch':
                //     editItem = <Checkbox colors="primary" checked={!!value} type="switch" />;
                //     break;
                // case 'switch_browse':
                //     disabled = status ? 'on' : disabled === 'on' ? 'on' : 'off';
                //     editItem = <NCPopconfirmSwitch checked={!!value} showTip={false} />;
                //     break;
                // // 密码输入框
                // case 'password':
                //     editItem = <FormControl type="password" />;
                //     break;
                // case 'residtxt':
                //     value = {};
                //     let rows = this.state.table.rows;
                //     item.languageMeta.forEach(i => {
                //         i.index = i.index === '1' ? '' : i.index;
                //     });
                //     item.languageMeta
                //         .map(i => item.attrcode + i.index)
                //         .forEach(i => {
                //         value[i] = rows[index].values[i] ? rows[index].values[i] : {};
                //         });
                //     editItem = <NCMultiLangText />;
                //     break;
            }
        }
    
        switch (item.itemtype) {
            case 'select':
                value = String(value);
                break;
            case 'refer':
                value = record.values[item.attrcode];
                break;
            default:
                break;
        }
    
        return {
            editItem,
            value,
            scale,
            isdisabled: disabled
        };
    }
    
    _createContent = () => {
        const {
            IType,
            text,
            index,
            // values,
            item,
            scale : IScale,
            // value,
            // isEdit,
            config,
            record,
            model,
            pageScope,
            edittable_dom,
            ICode,
            moduleId,
            // display,
            // disabled,
            renderItem,
            renderStatus,
            LanguageMeta,
            metaDisabled,
            hyperlinkflag,
            tableScope,
            tableStatus
        } = this.props;
        //===========================================================================================
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
        //===========================================================================================
        // tableStatus = isEdit ? 'edit' : 'browse'
        // 编辑态isEdit = 'true' 且  不是label、customer类型  走编辑态   或者switch类型
        if ((!CONFIG.noEditType.includes(IType) && tableStatus === 'edit') || IType === 'switch_browse') {
            // if (isEdit || IType === "switch_browse" || IType === "checkbox_switch" || IType === "switch") {
            if (isEdit || IType === 'switch_browse') {
                return (
                    <div
                        className={'edit-table-edit-line ' + (config.multipleRowCell ? '' : 'single-line-and-ellipsis')}
                        tabindex="0"
                    >
                        {this.createEditableItem.call(this, {
                            moduleId,
                            config,
                            type: 'line',
                            renderItem,
                            item,
                            index,
                            value: typeFormat(value, item.itemtype),
                            scale,
                            disabled,
                            record,
                            model: model,
                            status: tableStatus === 'edit',
                            edittable_dom,
                            pageScope
                        })}
                    </div>
                );
            } else {
                // !isEdit渲染td的文字区域  小铅笔这里有点问题，之后看一下
                let tableItemValue = this.handleBrowse.call(
                tableScope,
                IType,
                display,
                value,
                scale,
                ICode,
                LanguageMeta,
                values
                );
                return (
                    <div
                        style={IType === 'number' ? { textAlign: 'right' } : {}}
                        // onClick={e => {
                        // 之前在click写的切换状态时机
                        //   this.mousedown && this.handleClick(e);
                        //   this.mousedown = false;
                        // }}
                        onMouseDown={eve => {
                            // 为了解决blur的比click快的问题，将切换状态时机改到onMouseDown中执行
                            // 这里为了保持和在click中执行一样的效果, 所以将行点击事件中的逻辑在这里也写了一份，但是e不一样, 但是应该不会影响逻辑，所以将这里的e穿出去防止报错
                            this.props.focusRowByIndex.call(this,index);
                            if (config && typeof config.onRowClick === 'function') {
                                config.onRowClick.call(this, record, index, eve);
                            }
                            this.handleClick();
                            eve.preventDefault();
                        }}
                        onFocus={e => {
                            // 记录当前行，虽然表格以提供setClickRowIndex方法，但内部调用setState方法，如果tab切换频繁会导致效率问题因此用新的方法实现
                            setFocusRowIndex(index);
                            /*
                            * issue: 当业务组通过代码自动执行focus时为防止死循环添加判断
                            * resolve: 'sourceCapabilities' => which provides information about the physical device responsible for generating a touch event
                            *           如果是我们内部的代码执行focus，先给聚焦的元素添加ncExecuteFocus属性，如果有此属性就执行click方法
                            *           当前元素如果没有ncExecuteFocus就判断此事件是用户触发还是业务组的代码触发
                            * */
                            const sourceCapabilities = e.nativeEvent.sourceCapabilities;
                            // sourceCapabilities ie 下不能支持
                            if (e.target.ncExecuteFocus) {
                                !this.mousedown && this.handleClick(e);
                            } else {
                                !this.mousedown && pageScope && pageScope.output.ViewModel.shouldAutoFocus && this.handleClick(e);
                                // pageScope && (pageScope.output.ViewModel.shouldAutoFocus = false);
                            }
                        }}
                        tabindex={disabled === 'off' || (!disabled && !metaDisabled) ? '0' : '-1'}
                        className={'edit-table-edit-td ' + (config.multipleRowCell ? '' : 'single-line-and-ellipsis')}
                    >
                        {isWrong(tableItemValue) ? (
                            <span>
                                {tableItemValue}
                                &nbsp;
                                {disabled === 'off' || (!disabled && !metaDisabled) ? (
                                <span className="iconfont icon-zhengbiaobianji" />
                                ) : (
                                ''
                                )}
                            </span>
                        ) : (
                            <div className={IType === 'number' ? 'text-left edit-center' : 'edit-center'}>
                                <Tooltip inverse className="tooltip-word-color" placement="top" delay={1} overlay={tableItemValue}>
                                    <span className={config.multipleRowCell ? '' : 'single-line-and-ellipsis'}>
                                        {tableItemValue}
                                        &nbsp;
                                    </span>
                                </Tooltip>
                                {disabled === 'off' || (!disabled && !metaDisabled) ? (
                                    <span className="iconfont icon-zhengbiaobianji1" />
                                    ) : (
                                    ''
                                )}
                            </div>
                        )}
                    </div>
                );
            }
        } else {
            if (item.render && renderStatus === 'browse') {
                // 浏览态，业务组重写render的判断 ，这里只是让他返回展示内容 添加允许重写render的状态判断，业务组需要加renderstatus进行判断
                // 这里加了一个类名single-line-and-ellipsis， 让注册进来的render的内容也是一行省略的
                return (
                <Tooltip
                    inverse
                    className="tooltip-word-color"
                    placement="top"
                    delay={1}
                    overlay={item.render.call(null, text, record, index)}
                >
                    <div
                    className={`customer-style ${config.multipleRowCell ? '' : 'single-line-and-ellipsis'}`}
                    style={IType === 'number' ? { textAlign: 'right' } : {}}
                    >
                    {item.render.call(null, text, record, index)}
                    </div>
                </Tooltip>
                );
            } else {
                let tableItemValue = this.handleBrowse.call(
                tableScope,
                IType,
                display,
                value,
                scale,
                ICode,
                LanguageMeta,
                values
                );
                return (
                <div
                    className={'edit-table-browse ' + (config.multipleRowCell ? '' : 'single-line-and-ellipsis')}
                    style={IType === 'number' ? { textAlign: 'right' } : {}}
                >
                    <Tooltip inverse className="tooltip-word-color" placement="top" delay={1} overlay={tableItemValue}>
                    {// 如果模板里有hyperlinkflag:true
                    hyperlinkflag ? (
                        <a
                        href="javascript:;"
                        onClick={() => {
                            // 超链接跳转
                            // linkTo(pageScope.state.meta.pageid, moduleId, ICode, value);
                        }}
                        >
                        {tableItemValue}
                        </a>
                    ) : (
                        <span>{tableItemValue}</span>
                    )}
                    </Tooltip>
                </div>
                );
            }
        }
    };

    render() {
        // console.log('渲染cell');
        return <div style={{ width: '100%' }}>{this._createContent()}</div>;
    }
}

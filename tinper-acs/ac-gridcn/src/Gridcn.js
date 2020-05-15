import React, { Component,Fragment } from "react";
import BeeGrid from "bee-complex-grid";
import Btns from 'ac-btns';
import ButtonGroup from 'bee-button-group';
import cloneDeep from 'lodash.clonedeep';
import Icon from 'bee-icon';
import Modal from 'bee-modal';
import isequal from 'lodash.isequal';
//文本输入组件
import TextField from './RowField/TextField';
//下拉选择组件
import SelectField from './RowField/SelectField';
//数值选择组件
import NumberField from './RowField/NumberField';
//年份选择组件
import YearField from './RowField/YearField';
//日期组件
import DateField from './RowField/DateField';

import AcTips from 'ac-tips';

import classnames from 'classnames';

import { gridDefalutProps,paginationDefaultProps } from './defaultProps'



const defaultProps = {
    data: [],
    excludeKeys:[],
    delRow:()=>{},//删除回调
    getSelectedDataFunc:()=>{},//选中回调
    save:()=>{},//保存回调
    clsfix:'ac-gridcn',
    onChange:()=>{},//数据改变回调
    hideSave:false,//是否隐藏保存按钮
    isEdit:false,//是否需要表格编辑
    powerBtns:['addRow','update','delRow','copyRow','export','min','max','cancel','save','copyToEnd'],
    forcePowerBtns:['cancel','save'],//不受按钮权限控制的按钮
};

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state={
            copying:false,//是否正在拷贝
            open:props.defaultOpen!=undefined?props.defaultValue:true,//默认展开收起
            isMax:false,//是否最大化了
            columns:props.columns,
            data:props.data,
            defaultValueKeyValue:{},//每个单元格的默认值
            isMax:false,//是否最大化了
            selectData:[],//选中的数据
            allEditing:false,//是否正在修改所有数据
            adding:false,//是否正在新增
            addNum:0,//新增的条数
            canExport:false,
            pasting:false,//正在粘贴
        }
        this.oldColumns = props.columns;
        this.selectList = [];//选中的数据
        this.allData = [];//表格所有数据
        this.errors = {};//整个表格的校验错误信息
        this.selectKeyData = {};//存select类型字段  key:data(下拉列表)
    }

    /**
     *获取保存的column和table上的属性
     *
     */
    getColumnsAndTablePros = () => {
        return this.grid.getColumnsAndTablePros();
    };
    /**
     *
     * 重置grid的columns
     */
    resetColumns = () => {
        this.grid.resetColumns(this.oldColumns);
    };

    exportExcel = () => {
        this.grid.exportExcel();
    };
    getValue=(text,props)=>{
        let { renderType,fieldProps } = props;
        let { data=[],defaultValue } = fieldProps;
        let value = defaultValue!=undefined?defaultValue:'';
        if(renderType&&renderType=='select'){
            data.forEach(item => {
                if(item.value==text){
                    value = item.key
                }
            });
        }else{
            value = text;
        }
        return value;
    }

    componentWillMount(){
        this.setColumn(this.props.columns)
        this.setData(this.props.data,this.props.exportData)
    }
    componentWillReceiveProps(nextProps){
        if('data' in nextProps&&(!isequal(nextProps.data,this.state.data))){
            this.setData(nextProps.data,nextProps.exportData);
        }
    }
    setColumn=(cl)=>{
        let columns = cloneDeep(cl);
        let defaultValueKeyValue = {};
        columns.forEach(item => {
            let {
                renderType,//渲染类型 input/inputNumber/select/datepicker/year
                fieldProps={},//传给`field`的属性
                dataIndex,
                render:oldRender,
                component,//参照组件
                ...other
            } = item;
            if(!oldRender)oldRender=text=>text;
            if(renderType){
                if(item.required){
                    item.className="required"
                }
                if(fieldProps.defaultValue!=undefined){
                    defaultValueKeyValue[dataIndex]=fieldProps.defaultValue;
                }else{
                    defaultValueKeyValue[dataIndex]='';
                }
                switch(renderType){
                    case 'input':
                        item.render=(text,record,index)=>{
                            return (
                                record._edit?<TextField 
                                    {...other}
                                    fieldProps={fieldProps}
                                    index = {index}
                                    value = {oldRender&&oldRender(text,record,index)}
                                    field = {item.dataIndex}
                                    onChange = {this.onChange}
                                    status = {record._status}
                                    onValidate={this.onValidate}
                                />:<div>{oldRender&&oldRender(text,record,index)}</div>
                            )
                        }
                    break;
                    case 'inputNumber':
                        item.render=(text,record,index)=>{
                            let value = text;
                            return (
                                record._edit?<NumberField 
                                    {...other}
                                    fieldProps={fieldProps}
                                    index = {index}
                                    value = {value}
                                    field = {item.dataIndex}
                                    onChange = {this.onChange}
                                    status = {record._status}
                                    onValidate={this.onValidate}
                                />:<div>{oldRender&&oldRender(value,record,index)}</div>
                            )
                        }
                    break;
                    case 'select':
                        item.render=(text,record,index)=>{
                            let value = this.getValue(text,item);
                            if(index==0&&(!this.selectKeyData[item.dataIndex])){
                                this.selectKeyData[item.dataIndex] = fieldProps.data;
                            }
                            return (
                                record._edit?<SelectField 
                                    {...other}
                                    fieldProps={fieldProps}
                                    index = {index}
                                    value = {text+''}
                                    field = {item.dataIndex}
                                    onChange = {this.onChange}
                                    status = {record._status}
                                    onValidate={this.onValidate}
                                />:<div>{oldRender&&oldRender(value,record,index)}</div>
                            )
                        }
                    break;
                    case 'datepicker':
                        item.render=(text,record,index)=>{
                            return (
                                record._edit?<DateField 
                                    {...other}
                                    fieldProps={fieldProps}
                                    index = {index}
                                    value = {oldRender&&oldRender(text,record,index)}
                                    field = {item.dataIndex}
                                    onChange = {this.onChange}
                                    status = {record._status}
                                    onValidate={this.onValidate}
                                />:<div>{oldRender&&oldRender(text,record,index)}</div>
                            )
                        }
                    break;
                    case 'year':
                        item.render=(text,record,index)=>{
                            return (
                                record._edit?<YearField 
                                    {...other}
                                    fieldProps={fieldProps}
                                    index = {index}
                                    value = {oldRender&&oldRender(text,record,index)}
                                    field = {item.dataIndex}
                                    onChange = {this.onChange}
                                    status = {record._status}
                                    onValidate={this.onValidate}
                                />:<div>{oldRender&&oldRender(text,record,index)}</div>
                            )
                        }
                    break;
                    case 'refer':
                        item.render=(text,record,index)=>{
                            let displayName = 'name';
                            if(fieldProps&&fieldProps.displayName)name=fieldProps.displayName;
                            let value = null;
                            if(record._edit){
                                if(typeof text == 'string'){
                                    try {
                                        value = JSON.parse(text);
                                    } catch (error) {
                                        value = text
                                    }
                                }else if(Array.isArray(text)){
                                    value = text
                                }else if(typeof text == 'object'){
                                    value = text
                                }
                            }else{
                                text = oldRender&&oldRender(text,record,index);
                                if(text&&(typeof text == 'object')&&(!record._edit)){
                                    text = oldRender&&oldRender(text[displayName],record,index);
                                }
                            }
                            
                            return (
                                record._edit?<span>
                                    {
                                        React.cloneElement(component,{
                                            ...other,
                                            ...fieldProps,
                                            index : index,
                                            value ,
                                            field :item.dataIndex,
                                            onChange :this.onChange,
                                            status :record._status,
                                            onValidate:this.onValidate
                                        })
                                    }
                                </span>:<div>{text}</div>
                            )
                        }
                    break;
                }
            }
        });
        this.setState({
            columns,
            defaultValueKeyValue
        })
        this.oldColumns = columns;
    }
    setData=(da,exportData)=>{
        let data = cloneDeep(da);
        let selectData = [];
        data.forEach((item,index)=>{
            item._index = index;
            if(item._checked)selectData.push(item)
        })
        this.allData = data;
        this.selectList = selectData;
        this.setState({
            data,
            selectData,
            canExport:false,
        },()=>{
            if(exportData&&(isequal(this.props.exportData,exportData))){
                
            }else if(exportData&&(!isequal(this.props.exportData,exportData))){
                this.getExportData(exportData)
            }else if(!exportData){
                this.getExportData(data)
            }
            
        })
        
    }

    onValidate=(filed,errors,index)=>{
        let current = this.errors[index]||{};
        if(errors){
            current[filed] = errors[filed][0].message;
        }else{
           delete current[filed];
        }
        if(Object.keys(current).length==0){
            delete this.errors[index];
        }else{
            this.errors[index] = current;
        }
    }
    validate = ()=>{
        if(Object.keys(this.errors).length){
            return this.errors;
        }else{
            return null;
        }
    }
    //校验选中数据
    validateSelect = () =>{
        if(Object.keys(this.errors).length){
            let newError = {};
            this.selectList.forEach(item=>{
                if(this.errors[item._index]){
                    newError[item._index] = this.errors[item._index]
                }
            })
            if(Object.keys(newError).length){
                return newError;
            }else{
                return null
            }
        }else{
            return null;
        }
    }

    onChange=(field, value, index)=>{
        if(!isequal(this.allData[index][field],value)){
            this.allData[index]._checked = true;
            this.allData[index][field] = value;
            let selectList = [];
            this.allData.forEach(item=>{
                if(item._checked)selectList.push(item)
            })
            this.setState({
                data:this.allData,
                selectData:selectList
            })
            this.props.onChange(this.allData);
        }
    }
    //增行
    addRow=()=>{
        let defaultValueKeyValue = this.state.defaultValueKeyValue;
        let data = cloneDeep(this.state.data);
        let item = cloneDeep(defaultValueKeyValue);
        item._edit = true;
        item._status = 'edit';
        item._checked = true;
        data.unshift(item);
        let selectList = [];
        data.forEach((item,index)=>{
            if(item._checked)selectList.push(item);
            item._index = index;
        })
        this.setState({
            data,
            adding:true,
            addNum:this.state.addNum+1,
            selectData:selectList
        })
        this.selectList = selectList;
        this.allData = data;
        this.props.onChange(data)
    }

    //取消新增
    cancelAdd=()=>{
        Modal.confirm({
            title:'温馨提示',
            keyword:'警告',
            content:"数据未保存，确定离开 ?",
            onOk:()=> {
                let data = cloneDeep(this.state.data);
                data.splice(0,this.state.addNum);
                for(let i = 0;i<this.state.addNum;i++)delete this.errors[i]
                this.setState({
                    data,
                    adding:false,
                    addNum:0,
                    selectData:[]
                })
                this.selectList = [];
                this.props.onChange(data)
            },
            onCancel:()=>{
            },
            confirmType:'two'
        })
    }
    //修改
    updateAll=()=>{
        let data = cloneDeep(this.state.data);
        data.forEach(item=>{
            item._edit = true;//是否编辑态
            item._status = 'edit';//是否编辑态，用于显示是否编辑过
            item._checked = false;
        })
        this.setState({
            data,
            allEditing:true,
            selectData:[]
        })
        // this.props.onChange(data)
        this.allData = data;
    }
    
    //删除行
    delRow=()=>{
        if(this.selectList.length<=0){
            AcTips.create({
                type:'warning',
                content:"请先选择数据"
            })
        }else{
            Modal.confirm({
                title:'温馨提示',
                keyword:'删除',
                content:"单据删除后将不能恢复。",
                onOk:()=> {
                    let data = cloneDeep(this.state.data);
                    this.selectList.forEach((item,index)=>{
                        data.splice(item._index-index,1);
                    })
                    data = this.resetChecked(data,true);
                    this.allData = data;
                    this.setState({
                        data
                    },()=>{
                        this.props.delRow(this.selectList,data);
                    })
                },
                onCancel:()=>{
                },
                confirmType:'two'
            })
        }
    }

    //复制行
    copyRow=()=>{
        if(this.selectList.length<=0){
            AcTips.create({
                type:'warning',
                content:"请先选择数据"
            })
        }else{
            let copyData = [];
            let data = cloneDeep(this.state.data);
            data.forEach(item=>{
                if(item._checked)copyData.push(item)
            })
            this.setState({
                copying:true,
                selectData:copyData
            })
        }
        
    }

    //保存数据
    save=()=>{
        let selectList = [];
        this.allData.forEach(item=>{
            if(item._checked)selectList.push(item)
        })
        if(selectList.length<=0){
            AcTips.create({
                type:'warning',
                content:"请先选择数据"
            })
        }else if(this.validate()){
            AcTips.create({
                type:'warning',
                content:"数据校验失败"
            })
            console.log(this.errors)
        }else{
            let data = cloneDeep(this.state.data);
            data.forEach(item=>{
                item._edit = false;//是否编辑态
                item._status = '';//是否编辑态，用于显示是否编辑过
                item._checked = false;
            })
            this.setState({
                data,
                adding:false,
                allEditing:false,
                selectData:[],
                pasting:false
            })
            // this.props.onChange(data)
            this.allData = data;
            this.props.save(selectList);
        }
    }

    //取消复制
    cancelCopy=()=>{
        this.setState({
            copying:false,
            selectData:[]
        })
    }
    //粘贴至末行
    copyToEnd=()=>{
        let { data } = this.state;
        let selectData = this.selectList;
        selectData.forEach((item,index)=>{
            item._edit = true;
            item._status = 'edit';
            item._checked = true;
            item._needChecked = true;
            this.props.excludeKeys.forEach(it=>{
                delete item[it];
            })
        })
        data = data.concat(selectData);
        data = this.resetChecked(data,true)
        this.setState({
            data,
            copying:false,
            selectData,
            pasting:true,
            pasteOldData:this.state.data
        })
        this.props.onChange(data)
        this.allData = data;
    }

    //粘贴至此处
    copyToHere=()=>{
        let currentIndex = this.currentIndex;//从0开始
        let data = cloneDeep(this.state.data);
        let selectData = this.selectList;
        selectData.forEach((item,index)=>{
            item._edit = true;
            item._status = 'edit';
            item._checked = true;
            item._needChecked = true;
            this.props.excludeKeys.forEach(it=>{
                delete item[it];
            })
        })
        data.splice(currentIndex,0,...selectData);
        data = this.resetChecked(data,true)
        this.setState({
            data,
            copying:false,
            pasting:true,
            pasteOldData:this.state.data
        })
        this.props.onChange(data)
        this.allData = data;
    }

    //取消粘贴
    cancelPaste=()=>{
        let data = this.state.pasteOldData;
        this.setState({
            data,
            copying:false,
            pasting:false
        })
        this.allData = data;
    }

    //最大化、最小化
    max=()=>{
        if(!this.state.isMax){
            window.scrollTo(0,0)
        }
        this.setState({
            isMax:!this.state.isMax
        })
    }

    //修改取消
    cancelEdit=()=>{
        Modal.confirm({
            title:'温馨提示',
            keyword:'警告',
            content:"数据未保存，确定离开？",
            onOk:()=> {
                let data = cloneDeep(this.state.data);
                data.forEach(item=>{
                    item._edit = false;//是否编辑态
                    item._status = '';//是否编辑态，用于显示是否编辑过
                    item._checked = false;
                })
                this.setState({
                    data,
                    allEditing:false,
                    selectData:[],
                    errors:{}
                })
                // this.props.onChange(data)
                this.allData = data;
                this.errors = {};
                this.selectList = [];
            },
            onCancel:()=>{
            },
            confirmType:'two'
        })
    }
    //全不选
    resetChecked=(dataValue,needIndex)=>{
        let data = cloneDeep(dataValue);
        data.forEach((item,index)=>{
            if(item._needChecked){
                delete item._needChecked;
            }else{
                item._checked=false;
            }
            if(needIndex)item._index = index
        })
        // this.props.onChange(data)
        return data;
    }

    //行hover
    onRowHover = (index,record) => {
        this.currentIndex = index;
    }

    //粘贴至此处按钮
    hoverContent=()=>{
        if(this.state.copying){
            return <Btns btns={{
                copyToHere:{
                    onClick: this.copyToHere
                }
            }}/>
        }else{
            return ''
        }
    }

    //数据选择回调
    getSelectedDataFunc=(selectList,record,index,newData)=>{
        this.selectList = selectList;
        let data = cloneDeep(this.state.data)
        if (index != undefined) {
            data[index]['_checked'] = !data[index]['_checked'];
        } else {//点击了全选
            if (selectList.length > 0) {//全选
                data.map(item => {
                    if (!item['_disabled']) {
                        item['_checked'] = true
                    }
                });
            } else {//反选
                data.map(item => {
                    if (!item['_disabled']) {
                        item['_checked'] = false
                    }
                });
            }
        }
        this.setState({
            data:data,
            selectData:selectList
        })
        this.allData = data;
        this.props.getSelectedDataFunc(selectList,record,index,newData);
    }
    //打开关闭
    open=()=>{
        this.setState({
            open:!this.state.open
        })
    }
    
    //编辑表格导出数据select类型单独处理
    getExportData=(data)=>{
        let exportData = cloneDeep(data);
        exportData.forEach(item=>{
            for(let attr in this.selectKeyData){
                item[attr] = this.getValue(item[attr],{
                    renderType:'select',
                    fieldProps:{
                        data:this.selectKeyData[attr]
                    }
                })
            }
        })
        this.exportData = exportData;
        this.setState({
            canExport:true
        })
    }

    

    renderDom=()=>{
        let { copying,isMax,columns,data,allEditing,adding,open,selectData,canExport,pasting } = this.state;
        const { clsfix,paginationObj, exportData,disabled,title,hideSave, isEdit,powerBtns,forcePowerBtns, ...otherProps } = this.props;
        let _paginationObj ='none';
        if(paginationObj!='none'){
            _paginationObj = {...paginationDefaultProps, ...paginationObj};
            _paginationObj.disabled = paginationObj.disabled !== undefined
                ? paginationObj.disabled
                : (data.length === 0||allEditing||copying||adding);

            if((data.length === 0||allEditing||copying||adding)){
                _paginationObj.disabled = true;
            }
        }
        let btns1 = {};
        let btnSave = {};
        btns1= {
            addRow:{
                onClick:this.addRow,
                disabled:copying||allEditing||pasting||disabled
            },
            update:{
                onClick:this.updateAll,
                disabled:data.length==0||copying||allEditing||adding||pasting||disabled
            },
            delRow:{
                onClick:this.delRow,
                disabled:pasting||copying||selectData.length==0||disabled
            },
            copyRow:{
                onClick:this.copyRow,
                disabled:copying||adding||pasting||allEditing||selectData.length==0||disabled
            }
        }
        let btnsObj = {
            min:{
                onClick:this.max
            }
        };
        if(!isMax){
            delete btnsObj.min;
            btnsObj.max = {
                onClick:this.max
            };
        }
        if(allEditing){
            if(!hideSave){
                btnSave.save = {
                    onClick:this.save,
                    disabled:selectData.length==0||disabled
                }
            }
            btnSave.cancel = {
                onClick:this.cancelEdit
            }
        }else if(adding){
            if(!hideSave){
                btnSave.save = {
                    onClick:this.save,
                    disabled:selectData.length==0||disabled
                }
            }
            btnSave.cancel = {
                onClick:this.cancelAdd
            }
        }else if(copying){
            delete btns1.copyRow;
            btns1.copyToEnd = {
                onClick:this.copyToEnd
            }
            btnSave = {
                cancel:{
                    onClick:this.cancelCopy
                }
            }
        }else if(pasting){
            if(!hideSave){
                btnSave.save = {
                    onClick:this.save,
                    disabled:selectData.length==0||disabled
                }
            }
            btnSave.cancel = {
                onClick:this.cancelPaste
            }
        }
        let gridOptions={
            syncHover:true,
            autoCheckedByClickRows:false,
            multiSelect:{ type:"checkbox" },
            showFilterMenu:false,
            ...otherProps,
            data:data,
            columns:columns,
            exportData:this.exportData,
            paginationObj:_paginationObj,
            ref:el => this.grid = el,
            hoverContent:this.hoverContent,
            getSelectedDataFunc:this.getSelectedDataFunc,
            onRowHover:this.onRowHover,
        }
        gridOptions = Object.assign(gridDefalutProps,gridOptions);
        return (
            <Fragment>
                <div className={`${clsfix} ${disabled?'disabled':''} ${gridOptions.headerScroll?'header-scroll':''} ${isMax?'max':''} ${adding||allEditing||copying||pasting?'isEdit':''}`}>
                    {
                        typeof title=='string'?<div className={`${clsfix}-panel ${open?'':'close'}`}>
                        <span onClick={this.open} className={`${clsfix}-panel-header`}>
                            <span className={`${clsfix}-panel-icon`}>
                                {
                                    open?<Icon type='uf-triangle-down'/>:<Icon type='uf-triangle-right'/>
                                }
                            </span>
                            <span className={`${clsfix}-panel-title`}>
                                {title}
                            </span>
                        </span>
                        {
                            open?<div className={`${clsfix}-panel-btns`}>
                                    <ButtonGroup>
                                        <Btns btns={btns1} powerBtns={powerBtns} forcePowerBtns={forcePowerBtns}/>
                                    </ButtonGroup>
                                    <Btns btns={btnSave} powerBtns={powerBtns} forcePowerBtns={forcePowerBtns}/>
                                    <Btns btns={{
                                            export: {
                                                onClick: () => {
                                                    this.grid.exportExcel();
                                                },
                                                disabled:(!canExport)||allEditing||adding||disabled
                                            },
                                        }} powerBtns={powerBtns} forcePowerBtns={forcePowerBtns}/>
                                    <Btns btns={btnsObj} powerBtns={powerBtns} forcePowerBtns={forcePowerBtns}/>
                                </div>:''
                        }
                        
                        </div>:
                        <div className={`${clsfix}-panel`}>
                            <div></div>
                            <div className='ac-gridcn-panel-btns'>
                                <ButtonGroup>
                                    <Btns btns={btns1} powerBtns={powerBtns} forcePowerBtns={forcePowerBtns}/>
                                </ButtonGroup>
                                <Btns btns={btnSave} powerBtns={powerBtns} forcePowerBtns={forcePowerBtns}/>

                                <Btns btns={{
                                    export: {
                                        onClick: () => {
                                            this.grid.exportExcel();
                                        },
                                        disabled:(!canExport)||allEditing||adding||disabled
                                    },
                                }} powerBtns={powerBtns} forcePowerBtns={forcePowerBtns}/>
                                <Btns btns={btnsObj} powerBtns={powerBtns} forcePowerBtns={forcePowerBtns}/>
                            </div>
                        </div>
                    }
                    {
                        typeof title=='string'?<div className={`${clsfix}-inner ${open?'show':'hide'} ${isMax?'max':''}`}>
                            <BeeGrid {...gridOptions}/>
                        </div>:<BeeGrid {...gridOptions}/>
                    }
                    </div>
            </Fragment>
        );
    }

    render() {
        return (
            <span>
                {
                    this.state.isMax?ReactDOM.createPortal(this.renderDom(),document.querySelector('body')):this.renderDom()
                }

            </span>
        )
        
    }
}

Grid.defaultProps = defaultProps;
export default Grid;
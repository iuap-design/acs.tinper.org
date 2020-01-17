import React, {Component} from "react";
import PropTypes from 'prop-types';
import AcGird from "./AcGrids";
import RenderColumn from './RenderColumn';
import isequal from 'lodash.isequal';
import cloneDeep from 'lodash.clonedeep';
import ReactDOM from 'react-dom'
import Icon from 'bee-icon';
import ButtonGroup from 'bee-button-group';
import Tooltip from 'bee-tooltip';
import Btns from 'ac-btns';


const propTypes = {
    onChange:PropTypes.func,//数据改变回调
    clsfix:PropTypes.string,
    onOpenChange:PropTypes.func,//展开收起回调
    title:PropTypes.string,
    disabled:PropTypes.bool,//是否可编辑
    onDel:PropTypes.func,//删除的回调
    defaultOpen:PropTypes.bool,//默认是否打开
    showIndex:PropTypes.bool,//是否显示序号列
    excludeKeys:PropTypes.array,//粘贴时不需要粘贴的key值合计
}

const defaultProps = {
    title:'标题',
    clsfix:'ac-edit-grid',
    data: [],
    columns:[],
    onChange:()=>{},
    onOpenChange:()=>{},
    onDel:()=>{},
    showIndex:true,
    excludeKeys:[],
    getSelectedDataFunc:()=>{},
};

class EditGrid extends Component {
    constructor(props) {
        super(props);
        this.state={
            columns:props.columns,
            data:props.data||[],
            selectData:[],//选中的数据
            selectDataIds:[],//记录选中数据的id，id在这里生成，componentWillReceiveProps更新data时，设置选中的数据
            copying:false,//是否正在拷贝
            open:props.defaultOpen||true,//默认展开收起
            isMax:false,//是否最大化了
            defaultValueKeyValue:{},//带默认值的key，value键值对
        }
        this.selectDataId = 1;
        this.errors = {};
    }

    componentWillMount(){
        this.setDataColumn(this.props.disabled,this.state.columns,this.state.data)
    }

    onValidate=(errors,filed,fileds,index)=>{
        let current = this.errors[index]||{};
        if(errors){
            current[filed] = errors[0].message;
        }else{
           delete current[filed];
        }
        this.errors[index] = current;
    }
    validate = ()=>{
        if(Object.keys(this.errors).length){
            return this.errors;
        }else{
            return null;
        }
    }

    setDataColumn=(disabled,col,da)=>{
        let columns = cloneDeep(col);
        let defaultValueKeyValue = {};
        columns.forEach(item => {
            item.oldRender = item.render;
            if(item.renderType||item.customizeRender){
                if(!disabled){
                    if(item.required){
                        item.title=<span className={`${this.props.clsfix}-column-title-required`}>{item.title}</span>
                    }
                }
                if(item.filedProps&&(item.filedProps.defaultValue!=undefined))defaultValueKeyValue[item.dataIndex]=item.filedProps.defaultValue;
                item.render=(text,record,index)=>{
                    return <RenderColumn
                                valueField={item.valueField}
                                config={item.config}
                                textAlign={item.textAlign}
                                renderType={item.renderType}
                                index={index}
                                dataIndex={item.dataIndex}
                                value={text}
                                options={item.options}
                                onChange={this.onChange}
                                validate={item.validate} 
                                required={item.required}
                                pattern={item.pattern}
                                patternMessage={item.patternMessage}
                                disabled={disabled?true:item.disabled}
                                customizeRender={item.customizeRender}
                                onValidate={this.onValidate}
                                filedProps={item.filedProps}
                            />
                }
            }else{
                if(typeof item.oldRender == 'function'&&((item.oldRender.toString().indexOf('colSpan')!=-1)||(item.oldRender.toString().indexOf('rowSpan')!=-1))){
                    item.render = item.oldRender
                }else{
                    item.render=(text,record,index)=>{
                        let value = typeof item.oldRender =='function'?item.oldRender(text,record,index):text;
                        let placement = 'left';
                        if(item.textAlign)placement=item.textAlign=='center'?'bottom':item.textAlign;
                        return <Tooltip overlay={value} inverse placement={placement}>
                                    <span className='ac-grid-cell'>{value}</span>
                                </Tooltip>
                    }
                }
                
            }
        });
        this.setState({
            columns,
            defaultValueKeyValue
        })
        //给data加index
        let data  = cloneDeep(da);
        if(data[0]&&data[0].index==1){
        }else{
            data.forEach((item,index)=>{
                item.index=index+1
            })
            this.setState({
                data
            })
        }
    }

    
    onChange=(index,key,value)=>{
        //改变data
        let data  = cloneDeep(this.state.data);
        data[index][key]=value;
        this.setState({
            data:data
        })
        this.props.onChange(data);
    }

    //选中数据的回调
    getSelectedDataFunc=(selectData, record, index, newData)=>{
        let data = this.resetChecked(this.state.data)
        let selectDataIds = []
        selectData.forEach((item)=>{
            data[item.index-1]._checked=!data[item.index-1]._checked;
            let id = 'selectDataId'+this.selectDataId;
            data.selectDataId = id;
            selectDataIds.push(id);
            this.selectDataId++;
        })
        this.setState({
            selectDataIds,
            selectData,
            data
        })
        this.props.onChange(data);
        this.props.getSelectedDataFunc(selectData, record, index, newData);
    }

    resetChecked=(dataValue)=>{
        let data = cloneDeep(dataValue);
        data.forEach((item,index)=>{
            item._checked=false
            item.index=index+1,
            item.key=index+1+''
        })
        return data
    }


    componentWillReceiveProps(nextProps){
        if(!isequal(nextProps.data,this.state.data)){
            let selectDataIds = this.state.selectDataIds;
            nextProps.data.forEach((item,index)=>{
                item.index=index+1;
                if(selectDataIds.indexOf(item.selectDataId)!=-1)item._checked=true;
            })
            this.setState({
                data:nextProps.data
            })
        }
        if('disabled' in nextProps){
            this.setDataColumn(nextProps.disabled,nextProps.columns,nextProps.data)
        }
    }

    //打开关闭
    open=()=>{
        this.props.onOpenChange(!this.state.open)
        this.setState({
            open:!this.state.open
        })
    }

    //增行
    addRow=()=>{
        let defaultValueKeyValue = this.state.defaultValueKeyValue;
        let data = cloneDeep(this.state.data);
        let length = data.length;
        let obj = cloneDeep(data[0]||{});
        for(let attr in obj){
            if(attr=='index'){
                obj.index=length+1;
            }else if(attr=='key'){
                obj.key=`${length+1}`;
            }else{
                obj[attr] = ''
            }
        }
        for(let attr in defaultValueKeyValue ){
            obj[attr]=defaultValueKeyValue[attr];
        }
        data.push(obj)
        this.props.onChange(data);
        this.setState({
            data
        })
    }

    //删行
    delRow=()=>{
        let {selectData} = this.state;
        let data = cloneDeep(this.state.data)
        data.splice(selectData[0].index-1,selectData.length);
        data = this.resetChecked(data)
        this.setState({
            data,
            selectData:[]
        })
        this.props.onChange(data)
        this.props.onDel(selectData)
    }
    //复制行
    copyRow=()=>{
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
    //粘贴至末行
    copyToEnd=()=>{
        let {selectData,data} = this.state;
        selectData.forEach((item,index)=>{
            item.index = data.length+index+1;
            item.key = data.length+index+1+'';
            item._checked = false;
            this.props.excludeKeys.forEach(it=>{
                delete item[it];
            })
        })
        data = data.concat(selectData);
        data = this.resetChecked(data)
        this.setState({
            data,
            copying:false,
            selectData:[]
        })
        this.props.onChange(data)
    }
    //取消复制
    cancelCopy=()=>{
        this.setState({
            copying:false,
            selectData:[]
        })
    }

    //最大化
    max=()=>{
        this.setState({
            isMax:!this.state.isMax
        })
    }
    //行hover
    onRowHover = (index,record) => {
        this.currentIndex = index;
    }

    //粘贴至此处按钮
    hoverContent=()=>{
        if(this.state.copying){
            return <span onClick={this.copyToHere} className='copy-to-here'>粘贴至此</span>
        }else{
            return ''
        }
    }
    //粘贴至此处
    copyToHere=()=>{
        let index = this.currentIndex;
        let data = cloneDeep(this.state.data);
        let selectData = this.state.selectData;
        selectData.forEach((item,i)=>{
            item._checked=false
            item.index = i+index+1;
            item.key = i+index+1+'';
        })
        data.splice(index,0,...selectData);
        data = this.resetChecked(data)
        this.setState({
            data,
            copying:false,
            selectData:[]
        })

        this.props.onChange(data)
    }

    renderDom=()=>{
        const { exportData, clsfix,title, data:propsData,columns:cl,disabled, ...otherProps } = this.props; 
        let { data,open,columns,copying,isMax } = this.state;
        let _exportData = exportData || data;
        let btnsObj = {}
        if(isMax){
            btnsObj= {
                addRow:{
                    onClick:this.addRow,
                    disabled:disabled
                },
                delRow:{
                    onClick:this.delRow,
                    disabled:this.state.selectData==0||disabled
                },
                copyRow:{
                    onClick:this.copyRow,
                    disabled:this.state.selectData==0||disabled
                },
                min:{
                    onClick:this.max
                }
            }
        }else{
            btnsObj= {
                addRow:{
                    onClick:this.addRow,
                    disabled:disabled
                },
                delRow:{
                    onClick:this.delRow,
                    disabled:this.state.selectData==0||disabled
                },
                copyRow:{
                    onClick:this.copyRow,
                    disabled:this.state.selectData==0||disabled
                },
                max:{
                    onClick:this.max
                }
            }
        }
        if(copying){
            btnsObj={
                copyToEnd:{
                    onClick:this.copyToEnd
                },
                cancel:{
                    onClick:this.cancelCopy
                }
            }
        }

        return (
            <div className={`${clsfix} ${disabled?'disabled':''} ${isMax?'max':''}`}>
                <div className={`${clsfix}-panel ${open?'':'close'}`}>
                    <span onClick={this.open}>
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
                        open?<span className={`${clsfix}-panel-btns`}>
                            <ButtonGroup>
                                <Btns btns={btnsObj}/>
                            </ButtonGroup>
                        </span>:''
                    }
                    
                </div>
                <div className={`${clsfix}-inner ${open?'show':'hide'} ${isMax?'max':''}`}>
                            <AcGird
                                {...otherProps}
                                noReplaceColumns={true}
                                columns = {columns}
                                data={data}
                                exportData={_exportData}
                                paginationObj='none'
                                getSelectedDataFunc={this.getSelectedDataFunc}
                                hoverContent={this.hoverContent}
                                onRowHover={this.onRowHover}
                                autoCheckedByClickRows = {false}
                            />
                        </div>
            </div>
        )
        
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

EditGrid.defaultProps = defaultProps;
EditGrid.propTypes = propTypes;
export default EditGrid;

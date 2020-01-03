import React, {Component} from "react";
import PropTypes from 'prop-types'
import Grid, { GridToolBar } from "./Grid";
import Pagination from 'bee-pagination';
import Select from 'bee-select';
import Tooltip from 'bee-tooltip';
import cloneDeep from 'lodash.clonedeep';
import isequal from 'lodash.isequal';

const Option = Select.Option;


const propsTypes = {
    paginationObj:PropTypes.object,//分页参数
    showPagination:PropTypes.bool,//是否显示分页
    showTooltip:PropTypes.bool,//是否显示tooltip
    showIndex:PropTypes.bool,//是否显示index列
}

const defaultProps = {
    paginationObj:{},
    showPagination:true,
    showTooltip:false,
    showIndex:false
}

class AcGrids extends Component {
    constructor(props){
        super(props)
        this.state={
            activePage:1,
            columns:props.columns,
            data:props.data
        }
    }

    onSelectChange=(value)=>{
        this.props.paginationObj.onDataNumSelect&&this.props.paginationObj.onDataNumSelect(value)
    }
    exportExcel=()=>{
        this.grid.exportExcel();
    }

    componentWillMount(){
        this.setColumns(this.props.columns,this.props.data);
    }

    setColumns=(col,da)=>{
        let columns = cloneDeep(col);
        let { showIndex,showTooltip } = this.props;
        if(showIndex){
            //给data加index
            let data  = cloneDeep(da);
            if(data[0]&&data[0].index==1){//如果index存在
            }else{
                data.forEach((item,index)=>{
                    item.index=index+1
                })
                this.setState({
                    data
                })
            }
            columns.unshift({
                title: "序号",
                dataIndex: "index",
                key: "index",
                width: 100
              })
        }
        columns.forEach(item => {
            item.oldRender = item.render;
            if(typeof item.oldRender == 'function'&&((item.oldRender.toString().indexOf('colSpan')!=-1)||(item.oldRender.toString().indexOf('rowSpan')!=-1))){
                item.render = item.oldRender
            }else{
                item.render=(text,record,index)=>{
                    if(showTooltip){
                        let placement = 'left';
                        if(item.textAlign)placement=item.textAlign=='center'?'bottom':item.textAlign;
                        let value = typeof item.oldRender =='function'?item.oldRender(text,record,index):text
                        return <Tooltip overlay={value} inverse placement={placement}>
                                    <span>
                                        {value}
                                    </span>
                                </Tooltip>
                    }else{
                        let value = typeof item.oldRender =='function'?item.oldRender(text,record,index):text;
                        return <span className='ac-grid-cell' title={typeof value =='string'||typeof value == 'number'?value:''}>
                                    {value}
                                </span>
                    }
                }
            }
        });
        this.setState({
            columns
        })
    }

    componentWillReceiveProps(nextProps){
        if(!isequal(nextProps.data,this.state.data)){
            this.setState({
                data:nextProps.data
            })  
        }
    }
    render() {
        let { paginationObj,showPagination,columns,data,...other } = this.props;
        return (
            <div className='ac-grids-wrapper'>
              <Grid {...other} columns={this.state.columns} data={this.state.data} ref={ref=>this.grid=ref} />
              {
                  showPagination?<div className='ac-grids-wrapper-pages'>
                    <Select onChange={this.onSelectChange} defaultValue='10'>
                        <Option value='10'>10条/页</Option>
                        <Option value='20'>20条/页</Option>
                        <Option value='50'>50条/页</Option>
                        <Option value='100'>100条/页</Option>
                    </Select>
                    <Pagination 
                        prev
                        next
                        size="sm"
                        gap={true}
                        items={0}
                        {...paginationObj}
                    />
                </div>:''
              }
              
            </div>
        );
    }
}

AcGrids.defaultProps = defaultProps;
AcGrids.propsTypes = propsTypes;
AcGrids.GridToolBar = GridToolBar;
export default AcGrids;

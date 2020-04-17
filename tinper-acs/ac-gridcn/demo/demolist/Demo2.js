/**
*
* @title 编辑表格基本示例
* @description 编辑表格基本示例
*
*/
import React, { Component } from 'react';
import data from './data';
import { EditGrid } from '../../src/index'
import moment from 'moment';
import Button from 'bee-button';

class Demo2 extends Component {
    constructor(props){
        super(props);
        this.column = [
            {
                title: "员工编号",
                dataIndex: "code",
                key: "code",
                width: 150
            },
            {
                title: "员工编号",
                dataIndex: "code",
                key: "code",
                width: 150
            },
            {
                title: "员工编号",
                dataIndex: "code",
                key: "code",
                width: 150
            },
            {
                title: "员工编号",
                dataIndex: "code",
                key: "code",
                width: 150
            },
            {
                title: "员工姓名",
                dataIndex: "name",
                key: "name",
                width: 120,
                renderType:'input',
                required:true,
                validate:true,
                fieldProps:{
                    defaultValue:'姓名'
                },
            },
            {
                title: "员工性别",
                dataIndex: "sex",
                key: "sex",
                width: 120,
                renderType:'select',
                required:true,
                validate:true,
                fieldProps:{
                    allowClear:true,
                    defaultValue:'1',
                    data:[{
                        key: "请选择",
                        value: '',
                    }, {
                        key: "男",
                        value: '1'
                    }, {
                        key: "女",
                        value: '0'
                    }]
                },
            },
            {
                title: "工龄",
                dataIndex: "serviceYears",
                key: "serviceYears",
                width: 130,
                className: 'column-number-right ', // 靠右对齐
                renderType:'inputNumber',
                required:true,
                fieldProps:{
                    defaultValue:2
                }
            },
            {
                title: "司龄",
                dataIndex: "serviceYearsCompany",
                key: "serviceYearsCompany",
                width: 130,
                className: 'column-number-right ', // 靠右对齐
                renderType:'inputNumber',
                required:true,
            },
            {
                title: "年份",
                dataIndex: "year",
                key: "year",
                width: 100,
                renderType:'year',
                required:true,
                fieldProps:{
                    defaultValue:'2018'
                },
                render:(text, record, index)=>{
                    return moment(text).format('YYYY');
                }
            },
            {
                title: "月份",
                dataIndex: "month",
                key: "month",
                width: 120,
                renderType:'select',
                required:true,
                fieldProps:{
                    data:[{//月份
                        key: "请选择",
                        value: "",
                        disabled: true
                    }, {
                        key: "一月",
                        value: 1
                    }, {
                        key: "二月",
                        value: 2
                    }, {
                        key: "三月",
                        value: 3
                    }, {
                        key: "四月",
                        value: 4
                    }, {
                        key: "五月",
                        value: 5
                    }, {
                        key: "六月",
                        value: 6
                    }, {
                        key: "七月",
                        value: 7
                    }, {
                        key: "八月",
                        value: 8
                    }, {
                        key: "九月",
                        value: 9
                    }, {
                        key: "十月",
                        value: 10
                    }, {
                        key: "十一月",
                        value: 11
                    }, {
                        key: "十二月",
                        value: 12
                    }]
                },
            },
            {
                title: "补贴类别",
                dataIndex: "allowanceType",
                key: "allowanceType",
                width: 120,
                renderType:'select',
                required:true,
                fieldProps:{
                    data:[{
                        key: "请选择",
                        value: "",
                        disabled: true
                    }, {
                        key: "电脑补助",
                        value: 1
                    }, {
                        key: "住宿补助",
                        value: 2
                    }, {
                        key: "交通补助",
                        value: 3
                    }]
                },
            },
            {
                title: "补贴标准",
                dataIndex: "allowanceStandard",
                key: "allowanceStandard",
                width: 120,
                className: 'column-number-right ', // 靠右对齐
                renderType:'inputNumber',
                required:true,
                fieldProps:{
                    max: 999999,
                    min: 0,
                    step: 1,
                    precision: 2
                },
            },
            {
                title: "实际补贴",
                dataIndex: "allowanceActual",
                key: "allowanceActual",
                width: 120,
                className: 'column-number-right ', // 靠右对齐
                renderType:'inputNumber',
                required:true,
                fieldProps:{
                    max: 999999,
                    min: 0,
                    step: 1,
                    precision: 2
                },
            },
            {
                title: "是否超标",
                dataIndex: "exdeeds",
                key: "exdeeds",
                width: 120,
                required:true,
                renderType:'select',
                fieldProps:{
                    data:[{
                        key: "请选择",
                        value: "",
                        disabled: true
                    }, {
                        key: "未超标",
                        value: 0
                    }, {
                        key: "超标",
                        value: 1
                    }]
                },
            },
            {
                title: "领取方式",
                dataIndex: "pickType",
                key: "pickType",
                width: 120,
                renderType:'select',
                required:true,
                fieldProps:{
                    data:[{
                        key: "请选择",
                        value: "",
                        disabled: true
                    }, {
                        key: "转账",
                        value: 1
                    }, {
                        key: "现金",
                        value: 2
                    }]
                },
            },
            {
                title: "备注",
                dataIndex: "remark",
                key: "remark",
                width: 100,
                renderType:'input',
                required:false,
            }
        ];
        this.state={
            activePage:1,
            total:100,
            items:10
        }
    }
    /**
     * 跳转指定页码
     *
     * @param {*} pageIndex
     */
    freshData = (pageIndex) => {
        console.log('freshData')
    }

    /**
     * 分页  跳转指定页数和设置一页数据条数
     *
     * @param {*} index
     * @param {*} value
     */
    onDataNumSelect = (index, value) => {
        console.log('onDataNumSelect')
    }

    /**
     * type为0标识为pageIndex,为1标识pageSize
     *
     * @param {*} value
     * @param {*} type
     */
    onPageSelect = (value, type) => {
        console.log('onPageSelect')
    }

    getAllData=()=>{
        console.log(this.grid.allData)
    }
    getSelectData=()=>{
        console.log(this.grid.selectList)
    }
    validate=()=>{
        let error = this.grid.validate();
        if(error){
            alert('数据校验失败，错误信息见控制台');
            console.log(error)
        }else{
            alert('数据校验成功')
        }
    }
    validateSelect=()=>{
        let error = this.grid.validateSelect();
        if(error){
            alert('数据校验失败，错误信息见控制台');
            console.log(error)
        }else{
            alert('数据校验成功')
        }
    }
    changPag=()=>{
        this.setState({
            activePage:2,
            total:50,
            items:20
        })
    }
    
    render () {
        let paginationObj = {
            activePage: this.state.activePage,//当前页
            total: this.state.total,//总条数
            items: this.state.items,
            freshData: this.freshData,//刷新数据
            onDataNumSelect: this.onDataNumSelect,//选择记录行
            // disabled: false//分页条禁用状态
        }
        return (
            <div className='grid-parent'>
                <div style={{'marginBottom':'20px'}}>
                    <Button onClick={this.changPag} colors="primary" >改变分页</Button>
                    <Button onClick={this.getAllData} colors="primary" style={{'marginLeft':'20px'}} >获得所有数据</Button>
                    <Button onClick={this.getSelectData} colors="primary" style={{'marginLeft':'20px'}} >获得选中数据</Button>
                    <Button onClick={this.validate} colors="primary" style={{'marginLeft':'20px'}}>主动校验</Button>
                    <Button onClick={this.validateSelect} colors="primary" style={{'marginLeft':'20px'}}>主动校验选中数据</Button>
                </div>
                
                <EditGrid
                    ref={(el) => this.grid = el}//ref用于调用内部方法
                    data={data}//数据
                    columns={this.column}//定义列
                    paginationObj={paginationObj}//分页数据
                    excludeKeys={['id','ts','lastModified']}
                    delRow={(selectList,newData)=>{
                        console.log('删除，数据如下-----------',selectList)
                        console.log('新的数据如下-----------',newData)
                    }}
                    save={(selectList)=>{
                        console.log('保存，数据如下-----------',selectList)
                    }}
                    headerScroll={true}
                    title="我是标题"
                />
            </div>
        )
    }
}
export default Demo2
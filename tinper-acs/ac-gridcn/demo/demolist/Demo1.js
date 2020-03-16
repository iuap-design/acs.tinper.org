/**
*
* @title 普通表格基本示例
* @description 普通表格基本示例
*
*/
import React, { Component } from 'react';
import data from './data';
import { Grid } from '../../src/index';

class Demo1 extends Component {
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
                title: "员工姓名",
                dataIndex: "name",
                key: "name",
                width: 120,
            },
            {
                title: "员工性别",
                dataIndex: "sexEnumValue",
                key: "sexEnumValue",
                width: 120,
                
            },
            {
                title: "工龄",
                dataIndex: "serviceYears",
                key: "serviceYears",
                width: 130,
                
            },
            {
                title: "司龄",
                dataIndex: "serviceYearsCompany",
                key: "serviceYearsCompany",
                width: 130,
            },
            {
                title: "年份",
                dataIndex: "year",
                key: "year",
                width: 100,
            },
            {
                title: "月份",
                dataIndex: "monthEnumValue",
                key: "monthEnumValue",
                width: 120,
            },
            {
                title: "补贴类别",
                dataIndex: "allowanceTypeEnumValue",
                key: "allowanceTypeEnumValue",
                width: 120,
            },
            {
                title: "补贴标准",
                dataIndex: "allowanceStandard",
                key: "allowanceStandard",
                width: 120,
            },
            {
                title: "实际补贴",
                dataIndex: "allowanceActual",
                key: "allowanceActual",
                width: 120,
            },
            {
                title: "是否超标",
                dataIndex: "exdeedsEnumValue",
                key: "exdeedsEnumValue",
                width: 120,
            },
            {
                title: "领取方式",
                dataIndex: "pickTypeEnumValue",
                key: "pickTypeEnumValue",
                width: 120,
            },
            {
                title: "备注",
                dataIndex: "remark",
                key: "remark",
                width: 100,
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
    getSelectedDataFunc=()=>{
        console.log('getSelectedDataFunc')
    }

    getAllData=()=>{
        console.log(this.grid.allData)
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
                <Grid
                    ref={(el) => this.grid = el}//ref用于调用内部方法
                    data={data}//数据
                    columns={this.column}//定义列
                    paginationObj={paginationObj}//分页数据
                    getSelectedDataFunc={this.getSelectedDataFunc}//选择数据后的回调
                />
            </div>
        )
    }
}
export default Demo1
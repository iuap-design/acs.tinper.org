/**
*
* @title 这是标题
* @description 这是描述
*
*/
import React, { Component } from 'react';
import SearchTabs from '../../src';
import Button from 'bee-button';

const Tab = SearchTabs.Tab;



class Demo1 extends Component {
    constructor(props){
        super(props);
        this.state={
            tabList:[
                {
                    name:"待提交(9)",value:'1'
                },
                {
                    name:"审批中(99)",value:'2'
                },
                {
                    name:"执行中(999)",value:'3'
                },
                {
                    name:"已完成(99999)",value:'4'
                },
                {
                    name:"已删除",value:'5'
                },
                {
                    name:"全部(9999999)",value:'6'
                },
            ],
            selectValue:'3'
        }
    }
    getData=()=>{
        this.setState({
            selectValue:'1',
            tabList:[
                {
                    name:"已删除",value:'1'
                },
                {
                    name:"全部(0)",value:'2'
                },
                {
                    name:"待提交(9)",value:'3'
                },
                {
                    name:"审批中(99)",value:'4'
                },
            ]
        })
    }

    render () {
        return (
            <div>
                <div>
                    <Button colors='primary' onClick={this.getData}>点击请求数据</Button>
                </div>
                <SearchTabs value={this.state.selectValue} onChange={(v)=>{console.log('onchange',v)}}>
                    {
                        this.state.tabList.map(item=>
                            <Tab value={item.value}>{item.name}</Tab>)
                    }
                </SearchTabs>
            </div>
        )
    }
}
export default Demo1
/**
*
* @title 控制展开收起，自定义内容
* @description 设置 open 属性，使用 openChange 回调
*
*/
import React, { Component } from 'react';
import FormControl from 'bee-form-control';
import SplitArea from '../../src'

class Demo1 extends Component {
    constructor(props){
        super(props);
        this.state={
            open:false
        }
    }
    openChange=(open)=>{
        this.setState({
            open
        })
    }

    render () {
        return (
            <div>
                <div>
                    <FormControl placeholder='请输入基本信息'/>
                    <FormControl placeholder='请输入基本信息'/>
                    <FormControl placeholder='请输入基本信息'/>
                    <FormControl placeholder='请输入基本信息'/>
                </div>
                <SplitArea ctn={this.state.open?'我展开了':'我收起了'}
                 open={this.state.open} 
                 openChange={this.openChange}
                 >
                    <FormControl placeholder='请输入操作信息'/>
                    <FormControl placeholder='请输入操作信息'/>
                    <FormControl placeholder='请输入操作信息'/>
                    <FormControl placeholder='请输入操作信息'/>
                </SplitArea>
            </div>
        )
    }
}
export default Demo1
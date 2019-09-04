/**
*
* @title 基本示例
* @description 基本示例
*
*/
import React, { Component } from 'react';
import FormControl from 'bee-form-control';
import SplitArea from '../../src'

class Demo1 extends Component {
    render () {
        return (
            <div>
                <div>
                    <FormControl placeholder='请输入基本信息'/>
                    <FormControl placeholder='请输入基本信息'/>
                    <FormControl placeholder='请输入基本信息'/>
                    <FormControl placeholder='请输入基本信息'/>
                </div>
                <SplitArea>
                    <div>我是操作信息1</div>
                    <div></div>
                    <div>我是操作信息2</div>
                </SplitArea>
            </div>
        )
    }
}
export default Demo1
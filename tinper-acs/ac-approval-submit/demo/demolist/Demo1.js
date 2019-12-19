/**
*
* @title 基本使用
* @description  此示例仅做使用说明，需配合项目使用，无法展示
*
*/
import React, { Component } from 'react';
import ApprovalSubmit from '../../src';

class Demo1 extends Component {
    render () {
        return (
            <div>
                <ApprovalSubmit record={{}} callback={()=>{console.log('close')}}/>
            </div>
        )
    }
}
export default Demo1
/**
*
* @title 基本使用
* @description 依赖审批组件sdk，需要在 index.html引入。 此示例仅做使用说明，需配合项目使用，无法展示审批面板，查看审批面板截图请查看文档
*
*/
import React, { Component } from 'react';
import ApprovalBoard from '../../src';
import Button from 'bee-button'

class Demo1 extends Component {
    render () {
        return (
            <div>
                <ApprovalBoard>
                    <Button businessKey="testKey">点击打开审批面板</Button>
                </ApprovalBoard>
            </div>
        )
    }
}
export default Demo1
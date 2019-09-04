/**
*
* @title 基础示例2
* @description icon传图片，带返回按钮
*
*/
import React, { Component } from 'react';
import AcHeader from '../../src'
import Button from 'bee-button'
import ButtonGroup from 'bee-button-group';
class Demo2 extends Component {
    render () {
        return (
            <div>
                <AcHeader 
                icon={<img src="//design.yonyoucloud.com/static/tinper-bee/images/favicon.png"></img>}
                backClick={()=>{alert('返回按钮被点击了')}}
                title='采购订单：CD2019062700000191' showBack={true}>
                    <ButtonGroup>
                        <Button colors="primary">新增</Button>
                        <Button bordered>修改</Button>
                        <Button bordered>删除</Button>
                    </ButtonGroup>
                    <Button bordered>打印</Button>
                    <Button bordered>其它操作</Button>
                    <Button bordered>取消</Button>
                </AcHeader>
            </div>
        )
    }
}
export default Demo2
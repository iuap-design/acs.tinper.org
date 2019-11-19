/**
*
* @title 基础示例1
* @description icon传iconfont
*
*/
import React, { Component } from 'react';
import AcHeader from '../../src'
import Button from 'bee-button'
class Demo1 extends Component {
    render () {
        return (
            <div>
                <AcHeader icon={<i className='uf uf-cai-s'></i>} title='采购订单'>
                    <Button colors="primary">新增</Button>
                    <Button bordered>修改</Button>
                    <Button bordered>删除</Button>
                    <Button bordered>取消</Button>
                </AcHeader>
            </div>
        )
    }
}
export default Demo1
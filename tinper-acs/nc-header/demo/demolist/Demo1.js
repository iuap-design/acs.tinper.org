/**
*
* @title 基础示例1
* @description icon传iconfont
*
*/
import React, { Component } from 'react';
import NcHeader from '../../src'
import Button from 'bee-button'
class Demo1 extends Component {
    render () {
        return (
            <div>
                <NcHeader icon={<i className='uf uf-wechat'></i>} title='采购订单'>
                    <Button colors="primary">新增</Button>
                    <Button colors="primary">修改</Button>
                    <Button colors="primary">删除</Button>
                    <Button colors="primary">打印</Button>
                    <Button colors="primary">其它操作</Button>
                    <Button colors="primary">取消</Button>
                </NcHeader>
            </div>
        )
    }
}
export default Demo1
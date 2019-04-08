/**
 *
 * @title 基本示例
 * @description 基本示例
 *
 */

import React, { Component } from 'react';
import {openMess} from '../../src/index';
import Button from 'bee-button'

 class Demo1 extends Component {
    openFunc = (type) =>{
        openMess({
            title: `${type}提示`,
            type:type,
            duration:100,
            content:"你所提交的信息已经审核失败，可以进入个人信箱查看原因， 如有疑问，请联系客服人员。"
        });
    }
    render () {
        return (
            <div className="demoPadding">
                <Button colors="dark" onClick={ e => this.openFunc('error')}>点击 error</Button>
                <Button colors="warning" onClick={ e => this.openFunc('warning')}>点击 warning</Button>
                <Button colors="success" onClick={ e => this.openFunc('success')}>点击 success</Button>
                <Button colors="info" onClick={ e => this.openFunc('info')}>点击 info</Button>
            </div>
        )
    }
}

export default Demo1;

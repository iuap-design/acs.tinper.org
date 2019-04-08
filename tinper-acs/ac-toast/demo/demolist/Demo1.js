/**
 *
 * @title toast基本示例
 * @description toast基本示例
 *
 */

import React, { Component } from 'react';
import Toast from '../../src/index';

class Demo1 extends Component {
    fPopToast(){
        Toast.info({
            msg: '消息提示',
            mode: 'layout',
            duration: 3000,
            transition: 'fade'
        });
    }
    render () {
        return (
            <div className="demoPadding">
                <button className="btn" onClick={this.fPopToast}>基本消息</button>
            </div>
        )
    }
}

export default Demo1;

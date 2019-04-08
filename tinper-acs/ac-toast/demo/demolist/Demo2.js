/**
 *
 * @title toast图标示例
 * @description toast图标示例
 *
 */

import React, { Component } from 'react';
import Toast from '../../src/index';

class Demo2 extends Component {
    fPopToast(){
        Toast.info({
            msg: '提交中...',
            duration: 3000,
            transition: 'fade',
            icon: 'hourglass',
            className: 'submiting'
        });
    }
    fPopToast1(){
        Toast.info({
            msg: '提交成功',
            duration: 3000,
            transition: 'fade',
            icon: 'success',
            className: 'submit-success'
        });
    }
    render () {
        return (
            <div className="demoPadding">
                <button className="btn" onClick={this.fPopToast}>提交中</button>
                <button className="btn btn2" onClick={this.fPopToast1}>提交成功</button>
            </div>
        )
    }
}

export default Demo2;

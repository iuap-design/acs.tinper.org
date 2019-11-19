/**
 *
 * @title toast不同颜色示例
 * @description toast不同颜色示例
 *
 */

import React, { Component } from 'react';
import Toast from '../../src/index';

class Demo6 extends Component {
    fPopToast(type){
        const map = {
            success: '提交成功',
            warning: '提交警告',
            error: '提交错误'
        }
        const msg = map[type];
        Toast[type]({
            msg: msg,
            duration: 3000,
            transition: 'fade',
            icon: type
        });
    }
    render () {
        return (
            <div className="demoPadding">
                <button className="btn" onClick={this.fPopToast.bind(this,'success')}>success</button>
                <button className="btn" onClick={this.fPopToast.bind(this,'warning')}>warning</button>
                <button className="btn" onClick={this.fPopToast.bind(this,'error')}>error</button>
            </div>
        )
    }
}

export default Demo6;

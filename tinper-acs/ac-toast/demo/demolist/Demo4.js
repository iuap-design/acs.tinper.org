/**
 *
 * @title toast关闭回调
 * @description toast关闭回调
 *
 */

import React, { Component } from 'react';
import Toast from '../../src/index';

class Demo4 extends Component {
    fPopToast(){
        Toast.info({
            msg: '提交中...',
            duration: 2000,
            transition: 'fade',
            icon: 'hourglass',
            onClose: function(){
                Toast.info({
                    msg: '提交完成'
                })
            }
        });
    }
    render () {
        return (
            <div className="demoPadding">
                <button className="btn" onClick={this.fPopToast}>关闭回调</button>
            </div>
        )
    }
}

export default Demo4;

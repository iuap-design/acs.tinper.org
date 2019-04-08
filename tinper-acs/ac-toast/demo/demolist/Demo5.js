/**
 *
 * @title toast loading示例
 * @description toast loading示例
 *
 */

import React, { Component } from 'react';
import Toast from '../../src/index';

class Demo4 extends Component {
    fPopToast(){
        let id = '1';
        Toast.info({
            id: id,
            msg: '提交中...',
            transition: 'fade',
            icon: 'loading',
            autoClose: false
        });
        setTimeout(() => {
            Toast.close(id);
        },3000);
    }
    render () {
        return (
            <div className="demoPadding">
                <button className="btn" onClick={this.fPopToast}>loading示例</button>
            </div>
        )
    }
}

export default Demo4;

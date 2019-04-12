/**
 *
 * @title 导航栏
 * @description 基础示例
 *
 */

import React, { Component } from 'react';
import AcNavbar from '../../src/index';
class Demo1 extends Component {
    render () {
        return (
            <div className="demoPadding">
                <AcNavbar showHeader={true}/>
            </div>
        )
    }
}

export default Demo1;

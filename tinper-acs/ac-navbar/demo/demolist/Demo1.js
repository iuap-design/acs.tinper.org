/**
 *
 * @title 导航栏
 * @description 基础示例
 *
 */

import React, { Component } from 'react';
import AcNavbar from '../../src/index';
class Demo1 extends Component {

    onSidebarClick = (showSidebar) => {
        console.log('侧边栏显示状态：',showSidebar);
    }

    onInputSearch = (value) => {
        console.log(value)
    }

    render () {
        let searchInputProps = {
            placeholder: '应用搜索'
        }
        return (
            <div className="demoPadding">
                <AcNavbar 
                onSidebarClick={this.onSidebarClick} 
                onInputSearch={this.onInputSearch}
                {...searchInputProps}
                />
            </div>
        )
    }
}

export default Demo1;

/**
 *
 * @title 西瓜UI Button
 * @description 西瓜UI 其他Button样式组件
 *
 */

import React, { Component } from 'react';
import AcButton from '../../src/index';
 class Demo2 extends Component {
    constructor(props){
        super(props)
        this.state={
        }
    }
     onClick(){
        console.log('click')
     }
    render () {
        return (
            <div className="demoPadding">
                <AcButton bcolors="default_line">带边框按钮</AcButton>
                <AcButton bcolors="default_alpha">透明按钮</AcButton>

                <AcButton bcolors="default_white">默认按钮</AcButton>
                <AcButton bcolors="search_icon">默认按钮</AcButton>
                <AcButton bcolors="org">品牌色</AcButton>
                <AcButton bcolors="org_o">带边框按钮</AcButton>

            </div>
        )
    }
}

export default Demo2;

/**
 *
 * @title 西瓜UI Button
 * @description 西瓜UI 基础Button组件样式
 *
 */

import React, { Component } from 'react';
import AcButton from '../../src/index';
 class Demo1 extends Component {
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
                <AcButton bcolors="brand">品牌色</AcButton>
                <AcButton bcolors="danger">危险</AcButton>
                <AcButton bcolors="warning">警告</AcButton>
                <AcButton bcolors="default">信息</AcButton>
            </div>
        )
    }
}

export default Demo1;

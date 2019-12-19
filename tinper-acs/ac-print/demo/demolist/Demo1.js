/**
*
* @title 基本使用
* @description 此示例仅做使用说明，需配合项目使用，无法展示
*
*/
import React, { Component } from 'react';
import Button from 'bee-button';
import Print from '../../src';

class Demo1 extends Component {
    constructor(props){
        super(props);
        this.print = new Print()
    }

    printView=()=>{
        this.print.printView('testDataId',()=>{console.log('callback')})
    }
    printDesign=()=>{
        this.print.printDesign(()=>{console.log('callback')})
    }

    render () {
        return (
            <div className='ac-print-demo'>
                <Button onClick={this.printView} style={{'marginRight':'20px'}}>打印预览</Button>
                <Button onClick={this.printDesign}>打印设计</Button>
            </div>
        )
    }
}
export default Demo1
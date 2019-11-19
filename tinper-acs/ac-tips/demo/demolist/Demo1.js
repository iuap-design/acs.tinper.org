/**
*
* @title 基础示例
* @description 基础示例
*
*/
import React, { Component } from 'react';
import AcTips from '../../src';
import Button from 'bee-button'


let count = 1;
class Demo1 extends Component {

    success=()=>{
        AcTips.create({
            type:'success',
            content:"success"
        })
    }
    error=()=>{
        AcTips.create({
            type:'error',
            content:"error"+count.toString()
        })
        count++;
    }
    warning=()=>{
        AcTips.create({
            type:'warning',
            content:"warning"
        })
    }
    destoryAll=()=>{
        AcTips.destoryAll();
    }

    render () {
        return (
            <div>
                <Button
                    colors="success"
                    onClick={this.success}>
                    success
                </Button>
                <Button
                    colors="danger"
                    onClick={this.error}>
                    error
                </Button>
                <Button
                    colors="warning"
                    onClick={this.warning}>
                    warning
                </Button>
                <Button
                    onClick={this.destoryAll}>
                    destoryAll
                </Button>
            </div>
        )
    }
}
export default Demo1
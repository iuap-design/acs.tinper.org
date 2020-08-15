/**
 *
 * @title 小按钮
 * @description 用于表格悬浮操作列
 *
 */
import React, { Component } from 'react';
import Btns from '../../src'


let btns = {
    pbmapprove: {
        colors: 'dark',
        size: 'sm',
        onClick: () => {
            console.log('pbmapprove')
        }
    },
    update: {
        colors: 'dark',
        size: 'sm',
        onClick: () => {
            console.log('update')
        }
    },
    delete: {
        colors: 'dark',
        size: 'sm',
        onClick: () => {
            console.log('delete')
        }
    },
    enable:{
        colors: 'dark',
        size: 'sm',
        onClick: () => {
            console.log('enable')
        }
    },
    disabled:{
        colors: 'dark',
        size: 'sm',
        onClick: () => {
            console.log('disabled')
        }
    },
    
}
class Demo6 extends Component {

    render() {
        return (
            <div>
                <Btns btns = {btns} />
            </div>
        )
        
    }
}
export default Demo6
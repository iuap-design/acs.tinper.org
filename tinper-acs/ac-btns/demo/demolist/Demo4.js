/**
 *
 * @title 按钮扩展
 * @description 使用 addToBtns
 *
 */
import React, { Component } from 'react';
import Button from 'bee-button'
import Btns from '../../src'


let btns = {
    add: {
        onClick: () => {
            console.log('add')
        }
    },
    search:{
        onClick: () => {
            console.log('search')
        }
    },
    cancel:{
        onClick: () => {
            console.log('cancel')
        }
    },
    clear: {
        onClick: () => {
            console.log('clear')
        }
    },
    empty: {
        onClick: () => {
            console.log('empty')
        }
    },
    export: {
        onClick: () => {
            console.log('export')
        }
    },
    save: {
        onClick: () => {
            console.log('save')
        }
    },
    cancel: {
        onClick: () => {
            console.log('cancel')
        }
    },
    update: {
        onClick: () => {
            console.log('update')
        }
    },
    delete: {
        onClick: () => {
            console.log('delete')
        }
    },
    pbmsubmit: {
        onClick: () => {
            console.log('pbmsubmit')
        }
    },
    pbmcancle: {
        onClick: () => {
            console.log('pbmcancle')
        }
    },
    pbmapprove: {
        onClick: () => {
            console.log('pbmapprove')
        }
    },
    printpreview: {
        onClick: () => {
            console.log('printpreview')
        }
    },
    printdesign: {
        onClick: () => {
            console.log('printdesign')
        }
    },
    upload: {
        onClick: () => {
            console.log('upload')
        }
    },
    addRow: {
        onClick: () => {
            console.log('addRow')
        }
    },
    delRow: {
        onClick: () => {
            console.log('delRow')
        }
    },
    copyRow: {
        onClick: () => {
            console.log('copyRow')
        }
    },
    copyToEnd: {
        onClick: () => {
            console.log('copyToEnd')
        }
    },
    max: {
        onClick: () => {
            console.log('max')
        }
    },
    min: {
        onClick: () => {
            console.log('min')
        }
    },
    example1: {
        onClick: () => {
            console.log('example1')
        }
    },
    example2: {
        onClick: () => {
            console.log('example2')
        }
    },
}
class Demo1 extends Component {

    render() {
        return <Btns btns = {btns} 
            addToBtns={
                {
                    'example1':{ 
                        'colors':'write',
                        'name_zh_CN':'测试按钮1',
                        'name_zh_TW':'測試按鈕1',
                        'name_en_US':'Test Button1',
                        'className':'ac-btns-example1'
                    },
                    'example2':{ 
                        'colors':'write',
                        'name_zh_CN':'测试按钮2',
                        'name_zh_TW':'測試按鈕2',
                        'name_en_US':'Test Button2',
                        'className':'ac-btns-example2'
                    },
                }
            }
        />
    }
}
export default Demo1
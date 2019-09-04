/**
 *
 * @title 不使用 Button 按钮
 * @description type='line'  使用与表格行内操作列
 *
 */
import React, { Component } from 'react';
import Btns from '../../src'


let btnsAll = {
    add: {
        onClick: () => {
            console.log('add')
        }
    },
    confirm: {
        onClick: () => {
            console.log('confirm')
        }
    },
    search:{
        onClick: () => {
            console.log('search')
        }
    },
    detail:{
        onClick: () => {
            console.log('detail')
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
    organizationChat:{
        onClick: () => {
            console.log('organizationChat')
        }
    },
    download:{
        onClick: () => {
            console.log('download')
        }
    },
    enable:{
        onClick: () => {
            console.log('enable')
        }
    },
    disabled:{
        onClick: () => {
            console.log('disabled')
        }
    },
    download:{
        onClick: () => {
            console.log('download')
        }
    },
    
}

let btns = {
    update: {
        onClick: () => {
            console.log('add')
        }
    },
    pbmsubmit: {
        onClick: () => {
            console.log('confirm')
        }
    },
    detail:{
        onClick: () => {
            console.log('detail')
        }
    },
    enable: {
        onClick: () => {
            console.log('clear')
        }
    },
    disabled: {
        onClick: () => {
            console.log('clear')
        }
    },
}

class Demo1 extends Component {

    render() {
        return <div className='demo2'>
            <div className='demo2-title'> 超过3个换更多按钮 </div>
            <Btns type='line' btns = {btns} />
            <div className='demo2-title'>全部展示</div>
            <Btns type='line' btns = {btnsAll} maxSize={99  }/>
        </div>
    }
}
export default Demo1
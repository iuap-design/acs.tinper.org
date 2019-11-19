/**
 *
 * @title 使用按钮权限
 * @description 传入 powerBtns，最终显示按钮是 pwoerBtns和btn说的交集
 *
 */
import React, { Component } from 'react';
import Btns from '../../src'


let powerBtns = ['add', 'search', 'clear', 'export', 'save', 'cancel',
                'update', 'delete', 'pbmsubmit', 'pbmcancle', 'pbmapprove',
                'printpreview']

let btns = {
    add: {
        onClick: () => {
            console.log('add')
        }
    },
    search: {
        onClick: () => {
            console.log('search')
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
}

class Demo1 extends Component {

    render() {
        return <div>
            <Btns btns = {btns} powerBtns={powerBtns}/>
            
        </div>
    }
}
export default Demo1
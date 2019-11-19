/**
 *
 * @title 基本使用
 * @description 基本使用
 *
 */
import React, { Component } from 'react';
import Button from 'bee-button';
import ButtonGroup from 'bee-button-group';
import Btns from '../../src'


let btns = {
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
    import: {
        onClick: () => {
            console.log('import')
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
    template: {
        onClick: () => {
            console.log('template')
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
    appoint: {
        onClick: () => {
            console.log('appoint')
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
    reupload: {
        onClick: () => {
            console.log('reupload')
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
    
}
class Demo1 extends Component {

    render() {
        return (
            <div>
                <div>
                    <Btns btns = {btns} />
                </div>
                <ButtonGroup>
                    <Btns
                        btns={{
                            first:{
                                onClick: () => {
                                    console.log('first')
                                }
                            },
                            previous:{
                                onClick: () => {
                                    console.log('previous')
                                }
                            },
                            next:{
                                onClick: () => {
                                    console.log('next')
                                }
                            },
                            last:{
                                onClick: () => {
                                    console.log('last')
                                }
                            }
                        }}
                    />
                </ButtonGroup>
            </div>
            
        )
        
    }
}
export default Demo1
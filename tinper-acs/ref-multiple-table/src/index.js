import React, { Component } from 'react';
import RefMultipleTableBaseUI from './components/RefMultipeTableBaseUI';
import RefSearchPanel,{SearchPanelItem} from './components/RefSearchPanel';
import RefWithInput from 'ref-core/lib/refs/RefCoreWithInput';
import { createRefModal, createRefInput } from 'ref-core/lib/utils/createApi.js';
import RefCoreGlobal from 'ref-core/lib/refs/RefCoreGlobal';
import 'ref-core/css/refcore.css';
// import './index.less' //webpack打包需要放开
function RefMultipleTable(props){
    return (
        <RefCoreGlobal {...props}>
            <RefMultipleTableBaseUI />
        </RefCoreGlobal>
    )
}
function createRefMultipleTable(selector, props, callback){
    return createRefInput(selector, <RefMultipleTableWithInput />, props , (param) => {
        if(typeof callback === 'function'){
            callback(param)
        }
        
    });
}
function createRefMultipleTableModal(props, callback){
    return createRefModal({
        component: <RefMultipleTable />, 
        ...props 
    }, (param) => {
        if(typeof callback === 'function'){
            callback(param)
        }
        
    });
}

class RefMultipleTableWithInput extends Component {
    render(){
        return (
            <RefWithInput {...this.props}>
                <RefMultipleTable />
            </RefWithInput>
        )
    }
}

export default  RefMultipleTableBaseUI;
export {
    RefMultipleTableWithInput,
    RefMultipleTable,
    createRefMultipleTable,  
    createRefMultipleTableModal,
    RefSearchPanel,
    SearchPanelItem
}

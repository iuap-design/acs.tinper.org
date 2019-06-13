import RefTreeTableBaseUI from './components/RefTreeTableBaseUI';
import RefWithInput from 'ref-core/lib/refs/RefCoreWithInput';
import createModal from 'ref-core/lib/utils/createApi.js';
import RefCoreGlobal from 'ref-core/lib/refs/RefCoreGlobal';
import React from 'react';
import 'ref-core/css/refcore.css';
import 'ref-core/css/refcoretree.css';
// import './index.less'; //webpack打包放开

function RefTreeTable(props){
    return (
        <RefCoreGlobal {...props}>
            <RefTreeTableBaseUI />
        </RefCoreGlobal>
    )
}

function createRefTreeTable(selector, props, callback){
    return createRefInput(selector, <RefTreeTableWithInput />, props , (param) => {
        if(typeof callback === 'function'){
            callback(param)
        }
        
    });
}
function createRefTreeTableModal(props, callback){
    return createRefModal({
        component: <RefTreeTable />, 
        ...props 
    }, (param) => {
        if(typeof callback === 'function'){
            callback(param)
        }
        
    });
}


function RefTreeTableWithInput(props){

    return (
        <RefWithInput {...props}>
            <RefTreeTable/>
        </RefWithInput>
    )
}

export default RefTreeTableBaseUI;

export {
    RefTreeTable,
    RefTreeTableWithInput,
    createRefTreeTable, 
    createRefTreeTableModal
};
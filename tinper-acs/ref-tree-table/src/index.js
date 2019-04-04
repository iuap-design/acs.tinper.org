import RefTreeTableBaseUI from './components/RefTreeTableBaseUI';
import RefWithInput from 'ref-core/lib/refs/refcorewithinput.js';
import 'ref-core/lib/refs/refcorewithinput.css';
import createModal from 'ref-core/lib/utils/createApi.js';
import RefCoreGlobal from 'ref-core/lib/refs/refcoreglobal';
import React from 'react';
import './index.less';
import 'ref-core/css/refcore.css';


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
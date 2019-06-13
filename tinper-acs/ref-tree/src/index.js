import React from 'react';
import RefTreeBaseUI from './RefTreeBaseUI';
import RefWithInput from 'ref-core/lib/refs/RefCoreWithInput';
import {createRefModal, createRefInput} from 'ref-core/lib/utils/createApi.js';
import RefCoreGlobal from 'ref-core/lib/refs/RefCoreGlobal';
import 'ref-core/css/refcore.css';
import 'ref-core/css/refcoretree.css'
// import './index.less'; //webpack打包放开
const RefTree = (props) =>{
    return (
        <RefCoreGlobal {...props}>
            <RefTreeBaseUI />
        </RefCoreGlobal>
    )
};

function createRefTree(props, callback){
   return createRefModal({
        component: <RefTree />, 
        ...props 
    }, (param) => {
        if(typeof callback === 'function'){
            callback(param)
        }
        
    });
}
function createRefTreeWithInput(selector,props, callback){
    return createRefInput(selector, <RefTreeWithInput />, props , (param) => {
        if(typeof callback === 'function'){
            callback(param)
        }
        
    });
 }

function RefTreeWithInput (props){
    return (
        <RefWithInput {...props} >
            <RefTree />
        </RefWithInput>
    )
}

export default RefTreeBaseUI;
export {
    RefTreeWithInput,
    RefTree,  
    createRefTree,
    createRefTreeWithInput
};

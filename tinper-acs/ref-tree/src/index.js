import React from 'react';
import RefTreeBaseUI from './RefTreeBaseUI';
import RefWithInput from 'ref-core/lib/refs/refcorewithinput.js';
import  'ref-core/lib/refs/refcorewithinput.css';
import {createRefModal, createRefInput} from 'ref-core/lib/utils/createApi.js';
import RefCoreGlobal from 'ref-core/lib/refs/refcoreglobal';
import 'ref-core/css/refcore.css';

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

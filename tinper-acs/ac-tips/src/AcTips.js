import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';
import Tips from './Tips';

let AcTips = {
    toastList:[],
    top:50,
    hide:()=>{

    },
    destory:(id)=>{
        let index = AcTips.toastList.indexOf(id);
        let toast = document.getElementById(id);
        if(toast){
            toast.style.right=0;
            ReactDOM.unmountComponentAtNode(toast);
            document.body.removeChild(toast);
            AcTips.toastList.splice(index,1);
            for(let i = index;i<AcTips.toastList.length;i++){
                let item = document.getElementById(AcTips.toastList[i]);
                item.style.top = i*50+AcTips.top+'px';
            }
        }
        
    },
    create:(options)=>{
        let { type ='success', top=50, zIndex } = options;
        AcTips.top = top;
        let id = uuid();
        AcTips.toastList.push(id);
        let toast = document.createElement('div');
        toast.className='ac-tips-out '+type;
        toast.id=id;
        toast.style.top=AcTips.toastList.length*50+top+'px';
        if(zIndex)toast.style['z-index']=zIndex;
        document.body.appendChild(toast);
        ReactDOM.render(<Tips {...options} destory={AcTips.destory} id={id} />,toast);
        setTimeout(()=>{
            toast.style.right='5px';
        },0)
    },
    destoryAll:()=>{
        AcTips.toastList.forEach(id=>{
            let toast = document.getElementById(id);
            toast.style.right=0;
            ReactDOM.unmountComponentAtNode(toast);
            document.body.removeChild(toast);
        });
        AcTips.toastList=[];
    }
}


export default AcTips;
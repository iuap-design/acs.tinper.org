import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ToastList from './toastList';
import classNames from 'classnames';
import './index.scss';

let toastList;
let toastc;
let lock = false;

let Toast = {
    queue: [],
    append(props) {
        if(toastList){
            props = this.queue.shift() || props;
            if(props){
                toastList.add(props);
            }
        }
        else{
            if(!lock){
                lock = true;
                toastc = document.createElement('div');
                toastc.className = 'toastc';
                document.body.appendChild(toastc);
                //添加参数
                ReactDOM.render(<ToastList ref={(list) => {
                    toastList = list;
                    this.consume();
                }} />, toastc);
            }
        }
    },
    consume(){
        const queue = this.queue;
        let props;
        while(props = queue.shift()){
            this.append(props);
        }
    },
    push(props){
        this.queue.push(props);
        this.append(props);
    },
    info(props){
        //黑色
        this.push(props);
    },
    success(props){
        //绿色
        props.className = classNames(props.className,'t-success');
        this.push(props);
    },
    warning(props){
        //黄色
        props.className = classNames(props.className,'t-warning');
        this.push(props);
    },
    error(props){
        //红色
        props.className = classNames(props.className,'t-error');
        this.push(props);
    },
    close(id){
        if(toastList){
            toastList.removeToast({id:id});
        }
    },
    closeAll(){
        if(toastc){
            ReactDOM.unmountComponentAtNode(toastc);
            document.body.removeChild(toastc);
            toastList = null;
            toastc = null;
            lock = false;
        }
    }
}

export default Toast;

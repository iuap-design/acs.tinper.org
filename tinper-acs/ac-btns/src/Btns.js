import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BtnsJSON from './btnJSON';
import Button from 'bee-button';
import Icon from 'bee-icon';
import Dropdown from 'bee-dropdown';
import Menus from 'bee-menus';
import isequal from 'lodash.isequal';

const Item = Menus.Item;




const propTypes = {
    onClick:PropTypes.func,//点击按钮回调
    addToBtns:PropTypes.object,//所有的按钮，支持扩展
    powerBtns:PropTypes.array,// 按钮权限 code数组
    btns:PropTypes.object,// 按钮对象数组
    type:PropTypes.oneOfType(['button','line']),
    maxSize:PropTypes.number,
    forcePowerBtns:PropTypes.array,//不受权限控制的按钮code数组
    localeCookie:PropTypes.string,//当前语种的cookie key值
};
const defaultProps = {
    addToBtns:{},
    btns:{},
    type:'button',
    maxSize:2,
    forcePowerBtns:['cancel','search','clear'],//取消、查询、清空不受权限管理控制
    localeCookie:'locale',
    onClick:()=>{}
};

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie != '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


class Btns extends Component {
    constructor(props){
        super(props);
        this.state={
            allBtns:Object.assign(BtnsJSON,this.props.addToBtns)
        }
    }


    onHandleClick = (e,code,func=()=>{})=>{
        this.props.onClick(e,code)
        func(e)
    }

    componentWillReceiveProps(nextProps){
        if('addToBtns' in nextProps){
            if(isequal(this.state.allBtns,Object.assign(BtnsJSON,nextProps.addToBtns))){
                this.setState({
                    allBtns:Object.assign(BtnsJSON,nextProps.addToBtns)
                })
            }
        }
    }

    renderBtns=()=>{
        let { btns, type, maxSize, powerBtns,forcePowerBtns,localeCookie } = this.props;
        let more='更多'
        if(getCookie(localeCookie)=='en_US')more='more';
        let btnArray = [];
        if(powerBtns){
            Object.keys(btns).map(item=>{
                if((forcePowerBtns.indexOf(item)!=-1)||(powerBtns.indexOf(item)!=-1)){
                    let btn = this.renderBtn(item)
                    if(btn)btnArray.push(btn)
                }
            
            })
            
        }else{
            Object.keys(btns).map(item=>{
                let btn = this.renderBtn(item)
                if(btn)btnArray.push(btn)
            })
        }
        
        if(type=='line'){
            if(btnArray.length>maxSize){
                let menusList = (<Menus>
                        {
                            btnArray.map((item,index)=>{
                                if(index>maxSize-1)return <Item key={index} onClick={item.onClick}>{item}</Item>
                            })
                        }
                    </Menus>)
                let drop = (<Dropdown 
                        overlayClassName='ac-btns-dropdown'
                        trigger={['hover']}
                        overlay={menusList}
                        animation="slide-up">
                        <span className='ac-btns-item ac-btns-more'>{more}</span>
                    </Dropdown>)
                btnArray.splice(maxSize,btnArray.length-maxSize+1,drop)
                return btnArray;
            }else{
                return btnArray;
            }
        }else{
            return btnArray;
        }
        
    }

    renderBtn=(key)=>{
        if(!this.props.btns.hasOwnProperty(key))return;
        let itemProps = this.props.btns[key];
        let { colors,className,name_zh_CN:name,name_zh_TW,name_en_US} = this.state.allBtns[key];
        let clss = 'ac-btns-item '+className;
        if(itemProps){
            if(itemProps.className)clss+=' '+itemProps.className;
            if(itemProps.name)name=itemProps.name;
            if(itemProps.onClick){
                let func = itemProps.onClick;
                itemProps.onClick= (e)=>{this.onHandleClick(e,key,func)};
            }
        }
        if(getCookie(this.props.localeCookie)=='zh_TW')name=name_zh_TW;
        if(getCookie(this.props.localeCookie)=='en_US')name=name_en_US;
        if(this.state.allBtns[key]){
            if(itemProps&&itemProps.node){
                return itemProps.node
            }else{
                if(this.props.type=='button'){
                    switch(key){
                        case 'search':
                            return <Button key={key} {...itemProps} colors={colors} className={clss} title={name}>
                                        <Icon type='uf-search-light-2'/>
                                    </Button>
                        case 'clear':
                            return <Button key={key} {...itemProps} colors={colors} className={`ac-btns-write ${clss}`} title={name}>
                                        <Icon type='uf-clean'/>
                                    </Button>
                        case 'max':
                            return <Button key={key} {...itemProps} colors={colors} className={`ac-btns-write ${clss}`} title={name}>
                                        <Icon type='uf-maxmize'/>
                                    </Button>
                        case 'min':
                            return <Button key={key} {...itemProps} colors={colors} className={`ac-btns-write ${clss}`} title={name}>
                                        <Icon type='uf-minimize'/>
                                    </Button>
                        case 'first':
                            return <Button key={key} {...itemProps} colors={colors} className={`ac-btns-write ${clss}`} title={name}>
                                        <Icon type='uf-2arrow-left'/>
                                    </Button>
                        case 'next':
                            return <Button key={key} {...itemProps} colors={colors} className={`ac-btns-write ${clss}`} title={name}>
                                        <Icon type='uf-arrow-right'/>
                                    </Button>
                        case 'previous':
                            return <Button key={key} {...itemProps} colors={colors} className={`ac-btns-write ${clss}`} title={name}>
                                        <Icon type='uf-arrow-left'/>
                                    </Button>
                        case 'last':
                            return <Button key={key} {...itemProps} colors={colors} className={`ac-btns-write ${clss}`} title={name}>
                                        <Icon type='uf-2arrow-right'/>
                                    </Button>
                        default:
                            return <Button key={key} {...itemProps} colors={colors} className={`ac-btns-write ${clss}`}>{name}</Button>
                    }
                }else{
                    switch(key){
                        case 'search':
                            return <span key={key} {...itemProps} colors={colors} className={clss}>
                                        <Icon type='uf-search-light-2'/>
                                    </span>
                        case 'clear':
                            return <span key={key} {...itemProps} colors={colors} className={`ac-btns-write ${clss}`}>
                                        <Icon type='uf-clean'/>
                                    </span>
                        case 'max':
                            return <span key={key} {...itemProps} colors={colors} className={`ac-btns-write ${clss}`}>
                                        <Icon type='uf-maxmize'/>
                                    </span>
                        default:
                            return <span key={key} {...itemProps} colors={colors} className={`ac-btns-write ${clss}`}>{name}</span>
                    }
                }
            }
            
            
        }else{
            return null 
        }
        
    }

    render(){
        return(
            <span className='ac-btns'>
                {this.renderBtns()}
            </span>
        )
    }
};

Btns.propTypes = propTypes;
Btns.defaultProps = defaultProps;
export default Btns;
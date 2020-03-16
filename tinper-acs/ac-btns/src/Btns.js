import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BtnsJSON from './btnJSON';
import Button from 'bee-button';
import Icon from 'bee-icon';
import Dropdown from 'bee-dropdown';
import Menus from 'bee-menus';
import isequal from 'lodash.isequal';
import locale from './locale/zh_CN'

const Item = Menus.Item;




const propTypes = {
    onClick:PropTypes.func,//点击按钮回调
    addToBtns:PropTypes.object,//所有的按钮，支持扩展
    powerBtns:PropTypes.array,// 按钮权限 code数组
    btns:PropTypes.object,// 按钮对象数组
    type:PropTypes.oneOfType(['button','line','icon']),
    maxSize:PropTypes.number,
    forcePowerBtns:PropTypes.array,//不受权限控制的按钮code数组
    iconTypes:PropTypes.object,
    locale:PropTypes.object,
};
const defaultProps = {
    addToBtns:{},
    btns:{},
    type:'button',
    maxSize:2,
    forcePowerBtns:['cancel','search','clear','empty'],//取消、查询、清空、置空不受权限管理控制
    onClick:()=>{},
    iconTypes:{//默认code对应的图标
        add:'uf-add-c-o',
        update:'uf-pencil',
        delete:'uf-del'
    },
    locale:locale
};

class Btns extends Component {
    constructor(props){
        super(props);
        this.state={
            allBtns:Object.assign(BtnsJSON,this.props.addToBtns)
        }
    }


    onHandleClick = (e,item,func=()=>{})=>{
        this.props.onClick(e,item)
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
        let { btns, type, maxSize, powerBtns,forcePowerBtns,locale } = this.props;
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
        
        if(type=='line'||type=='icon'){
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
                        <span className='ac-btns-item ac-btns-more'>{locale['_more']}</span>
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
        let { colors,className } = this.state.allBtns[key];
        let name = this.props.locale[key]||BtnsJSON[key].name;
        let clss = 'ac-btns-item '+className;
        if(itemProps){
            if(itemProps.className)clss+=' '+itemProps.className;
            if(itemProps.name)name=itemProps.name;
            if(itemProps.onClick){
                let func = itemProps.onClick;
                itemProps.onClick= (e)=>{this.onHandleClick(e,{
                    code:key,name:name
                },func)};
            }
        }
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
                        case 'empty':
                            return <Button key={key} {...itemProps} colors={colors} className={`ac-btns-write ${clss}`} title={name}>
                                        <Icon type='uf-qingkong'/>
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
                }else if(this.props.type=='line'){
                    switch(key){
                        case 'search':
                            return <span key={key} {...itemProps} colors={colors} className={clss}>
                                        <Icon type='uf-search-light-2'/>
                                    </span>
                        case 'clear':
                            return <span key={key} {...itemProps} colors={colors} className={`ac-btns-write ${clss}`}>
                                        <Icon type='uf-clean'/>
                                    </span>
                        case 'empty':
                            return <span key={key} {...itemProps} colors={colors} className={`ac-btns-write ${clss}`}>
                                        <Icon type="uf-qingkong" />
                                    </span>
                        case 'max':
                            return <span key={key} {...itemProps} colors={colors} className={`ac-btns-write ${clss}`}>
                                        <Icon type='uf-maxmize'/>
                                    </span>
                        default:
                            return <span key={key} {...itemProps} colors={colors} className={`ac-btns-write ${clss}`}>{name}</span>
                    }
                }else if(this.props.type=='icon'){
                    let { iconType,...other } = itemProps
                    iconType = iconType?iconType:this.props.iconTypes[key];
                    return <span key={key} {...other} colors={colors} className={clss+' icon'} title={name}>
                            <Icon type={iconType} />
                        </span>
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
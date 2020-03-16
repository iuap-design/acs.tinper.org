import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'bee-icon'
import Dropdown from 'bee-dropdown';
import Menu from 'bee-menus';
import Tooltip from 'bee-tooltip'
import { Provider, create } from 'mini-store';
import Btns from 'ac-btns';
import i18n from './i18n'


const Item = Menu.Item;


const noop = ()=>{}

const propTypes = {
    title:PropTypes.node,
    clsfix:PropTypes.string,
    search:PropTypes.func,
    reset:PropTypes.func,
    selectedData:PropTypes.object,
    hasChose:PropTypes.bool,//是否可以选择查询方案
    localeCookie:PropTypes.string,//当前语种的cookie key值
};
const defaultProps = {
    clsfix:'ac-search-cn',
    search:noop,
    reset:noop,
    localeCookie:'locale'
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
class AcSearchPanel extends Component {
    constructor(props){
        super(props);
        this.state={
            open:true,
            type:'1',
            show:false,
        }
        this.store = create({
            toolTips:{}
        })
    }
    open=()=>{
        this.setState({
            open:!this.state.open
        })
    }
    onSelect=(item)=>{
        this.setState({
            type:item.selectedKeys[0]
        })
    }
    getChild=()=>{
        let { children } = this.props;
        let child = [];
        if(children.length>1){
            children.map(item=>{
                if(this.state.type=='1'&&item.type.displayName=='Sample'){
                    child = item.props.children;
                }else if(this.state.type=='2'&&item.type.displayName=='Complex'){
                    child = item.props.children;
                }
            })
        }else{
            if(this.state.type=='1'&&children.type.displayName=='Sample'){
                child = children.props.children;
            }else if(this.state.type=='2'&&children.type.displayName=='Complex'){
                child = children.props.children;
            }
        }
        return child;
    }
    getTip=()=>{
        let { clsfix } = this.props;
        let toolTips = this.store.getState().toolTips;
        return (
            <span className={`${clsfix}-selected-complex`}>
                {
                    Object.keys(toolTips).map((item,index)=>{
                        let v = toolTips[item];
                        // if(Object.prototype.toString.call(v)=='[object Array]')v=v.join(' ~ ');
                        if(toolTips[item]&&(toolTips[item]!='undefined'))return <div key={index} className={`${clsfix}-selected-complex-item`}>
                                <span className={`${clsfix}-selected-complex-item-title`}>{item}:</span>
                                <span className={`${clsfix}-selected-complex-item-ctn`}>{v}</span>
                            </div>
                        
                    })
                }
            </span>
        )
    }
    formatSearchDate=(selectedData,locale)=>{
        for(let attr in selectedData){
            if(!selectedData[attr]){
                delete selectedData[attr];
            }
        }
        let length = Object.keys(selectedData).length;
        return `${locale.query}(${length}):   ${Object.keys(selectedData).join(';')}`
    }
    render(){
        let { clsfix,search,reset,hasChose,children,title,localeCookie } = this.props;
        let locale=i18n;
        if(getCookie(localeCookie)=='zh_TW')locale=i18n.zh_TW;
        if(getCookie(localeCookie)=='en_US')locale=i18n.en_US;
        const typeText = {
            '1':locale.sample,
            '2':locale.complex
        }
        let toolTips = this.store.getState().toolTips;
        let ctns = `${clsfix}-ctns`;
        if(!this.state.open)ctns+=' close';
        const menus = (
            <Menu
              onSelect={this.onSelect}>
              <Item key="1">{locale.sample}</Item>
              <Item key="2">{locale.complex}</Item>
            </Menu>
        );
        return(
            <Provider store={this.store}>
            <div className={clsfix}>
                <div className={`${clsfix}-header`} >
                
                {
                    hasChose? <span className={`${clsfix}-case`}>
                    <Dropdown
                        overlayClassName={`${clsfix}-case-list`}
                        trigger={['click']}
                        overlay={menus}
                        animation="slide-up">
                        <span>{typeText[this.state.type]} <Icon type='uf-triangle-down'/></span>
                    </Dropdown>
                </span>:<span className={`${clsfix}-case`}>{title?title:locale.title}</span>
                }
                   

                    {/* <span className={`${clsfix}-selected`}>
                        高级
                    </span> */}
                    
                    {
                        (Object.keys(toolTips).length>0&&(!this.state.open))?
                        <span className={`${clsfix}-selected-data`}>
                            <Tooltip inverse placement="bottom" overlay={this.getTip()}>
                                <span className={`${clsfix}-selected-sample`} >
                                    {this.formatSearchDate(toolTips,locale)}
                                </span>
                            </Tooltip>
                        </span>:''
                    }
                    <span className={`${clsfix}-open`} onClick={this.open}>
                        {
                            this.state.open?
                            <span>
                            {locale.close}<Icon type='uf-arrow-up'/>
                            </span>
                            :<span>
                            {locale.open}<Icon type='uf-arrow-down'/>
                            </span>
                        }
                    </span>
                </div>
                <div className={`${clsfix}-ctns-out`}>
                    <div className={ctns}>
                        <div className={`${clsfix}-ctn`}>
                            {
                                hasChose?this.getChild():children
                            }
                        </div>
                        <div className={`${clsfix}-btns`}>
                            <Btns localeCookie={localeCookie}
                                btns={{
                                    search:{
                                        onClick:search,
                                    },
                                    empty:{
                                        onClick:reset,
                                    },
                                }}
                            />
                            {/* <Button colors='primary' className={`${clsfix}-btns-search`} onClick={search}>
                                <Icon type='uf-search-light-2'/>
                            </Button>
                            <Button colors='primary' bordered className={`${clsfix}-btns-reset`} onClick={reset}>
                                <Icon type='uf-clean'/>
                            </Button> */}
                        </div>
                    </div>
                </div>
            </div>
            </Provider>
            
            
        )
    }
};

AcSearchPanel.propTypes = propTypes;
AcSearchPanel.defaultProps = defaultProps;

export default AcSearchPanel;
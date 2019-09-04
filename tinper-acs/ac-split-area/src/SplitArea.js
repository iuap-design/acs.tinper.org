import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from './i18n'

const propTypes = {
    clsfix:PropTypes.string,
    open:PropTypes.bool,//打开关闭
    ctn:PropTypes.node,//内容
    defaultOpen:PropTypes.bool,//默认展开收起
    openChange:PropTypes.func,//展开收起
    localeCookie:PropTypes.string,//当前语种的cookie key值
};

const defaultProps = {
    clsfix:'ac-split-area',
    defaultOpen:false,
    openChange:()=>{},
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

class SplitArea extends Component {

    constructor(props){
        super(props);
        this.state={
            open:props.open==undefined?props.defaultOpen:props.open
        }
    }
    
    

    click=()=>{
        this.setState({
            open:!this.state.open
        })
        this.props.openChange(!this.state.open)
    }
    static getDerivedStateFromProps(nextProps) {
        if('open' in nextProps){
            return {
                open:nextProps.open
            }
        }
    }

    render(){
        let { children,clsfix,ctn,localeCookie } = this.props;
        let { open } = this.state;
        let locale=i18n;
        if(getCookie(localeCookie)=='zh_TW')locale=i18n.zh_TW;
        if(getCookie(localeCookie)=='en_US')locale=i18n.en_US;
        return (
            <div className={`${clsfix}`}>
                <div onClick={this.click} className={`${clsfix}-left`}>
                    <span className={`${clsfix}-left-text`}>{ctn?ctn:locale.ctn}</span>
                    <span className={`${clsfix}-left-line`}>
                        <span className={`${clsfix}-left-line-inner`}></span>
                    </span>
                </div>
                <div className={`${clsfix}-ctn ${open?'open':''}`}>
                        {open?children:''}
                </div>            
            </div>
        )
    }
};

SplitArea.propTypes = propTypes;
SplitArea.defaultProps = defaultProps;

export default SplitArea;
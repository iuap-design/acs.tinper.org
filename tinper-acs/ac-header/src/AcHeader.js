import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'bee-icon';

const propTypes = {
    clsfix:PropTypes.string,
    className:PropTypes.string,
    icon:PropTypes.node,
    title:PropTypes.string,
    showBack:PropTypes.bool,
    backClick:PropTypes.func
};
const defaultProps = {
    clsfix:'ac-header',
    className:'',
    icon:'',
    title:'',
    showBack:false,
    backClick:()=>{}
};

class AcHeader extends Component {


    backClick=()=>{
        this.props.backClick()        
    }
    render(){
        let { clsfix,className,children,icon,title,showBack } = this.props;
        let classes = clsfix+' '+className;
        return(
            <div className={`${classes}`}>
                <span className={`${clsfix}-left`}>
                    {
                        showBack?
                        <span className={`${clsfix}-back`} onClick={this.backClick}>
                            <Icon type='uf-arrow-left'/>
                        </span>:''
                    }
                    <span className={`${clsfix}-icon`}>
                        {icon}
                    </span>
                    <span className={`${clsfix}-title`}>
                        {title}
                    </span>
                </span>
                
                <span className={`${clsfix}-btns`}>
                    { children }
                </span>
            </div> 
        )
    }
};
AcHeader.propTypes = propTypes;
AcHeader.defaultProps = defaultProps;
export default AcHeader;
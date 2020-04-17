import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'bee-layout';
import Lable from 'bee-label';


const propTypes = {
    clsfix:PropTypes.string,
    lable:PropTypes.string,
    required:PropTypes.bool,
    errorMsg:PropTypes.node
};
const defaultProps = {
    clsfix:'ac-form-layout'
};

class FormItem extends Component {
    constructor(props){
        super(props);
        this.state={
            showError:false
        }
    }


    getChild=()=>{
        let { label , children, required, clsfix, errorMsg } = this.props;
        let ary = [];
        ary.push(<Lable>{required?<span className={`${clsfix}-mast`}>*</span>:''}{label}</Lable>)
        if(children.length>1){
            React.Children.map(children,child=>{
                errorMsg?ary.push(
                        <div className={`${clsfix}-item-out`} title={errorMsg}>
                            <span className={`${clsfix}-item-error-msg`}>
                                <span className={`${clsfix}-item-error-msg-text`}>{errorMsg}</span>
                            </span>
                            {child}
                        </div>
                ):ary.push(child)
            })
        }else{
            errorMsg?ary.push(
                    <div className={`${clsfix}-item-out`} title={errorMsg}>
                        <span className={`${clsfix}-item-error-msg`}>
                            <span className={`${clsfix}-item-error-msg-text`}>{errorMsg}</span>
                        </span>
                        {children}
                    </div>
            ):ary.push(children)
        }
        return ary;
    }
    render(){
        let { clsfix,children,className, errorMsg, ...other } = this.props;
        let clsses = `${clsfix}-item`;
        if(className)clsses+=' '+className;
        if(errorMsg)clsses+=' error';
        return(
            <Col className={clsses} { ...other }>
                {this.getChild()}
            </Col>
        )
    }
};
FormItem.propTypes = propTypes;
FormItem.defaultProps = defaultProps;
export default FormItem;
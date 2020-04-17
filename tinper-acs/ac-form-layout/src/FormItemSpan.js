import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'bee-layout';

const propTypes = {
    clsfix:PropTypes.string,
    disabled:PropTypes.bool
};
const defaultProps = {
    clsfix:'ac-form-layout'
};

class FormItemSpan extends Component {
    render(){
        let { clsfix,children,className, ...other} = this.props;
        let clsses = clsfix+'-span';
        if(className) clsses+=' '+className;
        return(
            <div className={clsses} { ...other }>
                {children}
            </div>
        )
    }
};
FormItemSpan.propTypes = propTypes;
FormItemSpan.defaultProps = defaultProps;
export default FormItemSpan;
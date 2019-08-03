import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    clsfix:PropTypes.string,
    disabled:PropTypes.bool
};
const defaultProps = {
    clsfix:'ac-form-layout'
};

class FormLayout extends Component {
    render(){
        let { clsfix,children,disabled,className } = this.props;
        let clsses = clsfix;
        if(className) clsses+=' '+className;
        if(disabled) clsses+=` disabled`;
        return(
            <div className={clsses}>
                {children}
            </div>
        )
    }
};
FormLayout.propTypes = propTypes;
FormLayout.defaultProps = defaultProps;
export default FormLayout;
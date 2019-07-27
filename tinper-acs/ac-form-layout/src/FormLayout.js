import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    clsfix:PropTypes.string
};
const defaultProps = {
    clsfix:'ac-form-layout'
};

class FormLayout extends Component {


    render(){
        let { clsfix,children } = this.props;
        return(
            <div className={clsfix}>
                {children}
            </div>
        )
    }
};
FormLayout.propTypes = propTypes;
FormLayout.defaultProps = defaultProps;
export default FormLayout;
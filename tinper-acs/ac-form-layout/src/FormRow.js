import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'bee-layout';

const propTypes = {
    clsfix:PropTypes.string
};
const defaultProps = {
    clsfix:'ac-form-layout'
};

class FormRow extends Component {
    render(){
        let { clsfix,children,className } = this.props;
        return(
            <Row className={className?`${clsfix}-row ${className}`:`${clsfix}-row`}>
                {children}
            </Row>
        )
    }
};
FormRow.propTypes = propTypes;
FormRow.defaultProps = defaultProps;
export default FormRow;
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {};
const defaultProps = {};


class Pagelayout extends Component {
    render() {
        let { className, children, ...other } = this.props;
        let classes = 'ac-pagelayout';
        if(className)classes+=' '+className;
        return ( 
            <div className={classes} {...other} >
                {this.props.children}
            </div>
        )
    }
}


Pagelayout.propTypes = propTypes; 
Pagelayout.defaultProps = defaultProps;

export default Pagelayout;
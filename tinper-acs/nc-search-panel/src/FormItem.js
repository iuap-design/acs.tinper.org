import React, { Component } from 'react';
import PropTypes from 'prop-types';
const propTypes = {};
const defaultProps = {};

class FormItem extends Component {

    getChild=()=>{
        let { label , children } = this.props;
        if(children.length>1){
            let ary = [];
            React.Children.map(children,child=>{
                    ary.push(React.cloneElement(child,{
                        placeholder:label,
                    }))
                })
            return ary;
            
        }else{
            return React.cloneElement(children,{
                        placeholder:label,
                    })
        }
    }
    render(){
        let { required } = this.props;
        let classes = 'nc-search-panel-formitem';
        if(required)classes+=' require'
        return(
            <div className={classes}>
                {
                    required?<span className='nc-search-panel-formitem-mast'>*</span>:''
                }
                { this.getChild() }
            </div>
        )
    }
};

FormItem.propTypes = propTypes;
FormItem.defaultProps = defaultProps;
export default FormItem;
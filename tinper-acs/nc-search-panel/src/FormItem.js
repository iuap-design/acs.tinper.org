import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'bee-tooltip';

const propTypes = {
    label:PropTypes.string.isRequired,
    required:PropTypes.bool,
    value:PropTypes.string
};
const defaultProps = {

};

class FormItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            show:false
        }
        
    }

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
    onClick=(str)=>{
        let show = this.state.show;
        if(show){

        }else{
            if(str){
                this.setState({
                    show:true
                })
            }
        }
    }

    getStr=()=>{
        let { children, label} = this.props;
        let value = children.props.value||'';
        let str = '';
        if(children.type.displayName=='InputNumberGroup'){//金额区间
            if(value.length>0&&((value[0])||(value[1]))){
                str = `${label[0]}: ${value[0]} , ${label[1]}: ${value[1]}`;
            }
        }else if(children.type.displayName=='acRangepicker'){//日期区间
            let format = children.props.format;
            if(value.length>0){
                str = `${label}: ${value[0].format(format)} ~ ${value[1].format(format)}`;
            }
        }else if(value){
            str = `${label}: ${value}`;
        }
        return str;
    }
    render(){
        let { required } = this.props;
        let classes = 'nc-search-panel-formitem';
        if(required)classes+=' require';
        let str = this.getStr();
        return (
            <div className={classes} 
            onMouseEnter={()=>{this.onClick(str)}} onMouseLeave={()=>{
                this.setState({
                    show:false
                })
            }} >
                {
                    this.state.show?<span className='nc-search-panel-formitem-value'>
                                        <span className='nc-search-panel-formitem-value-text'>{str}</span>
                                    </span>:''
                }
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
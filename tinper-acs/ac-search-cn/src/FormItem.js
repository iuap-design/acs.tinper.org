import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'mini-store';

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
            show:false,
            strTop:'-28px'
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
    getStr=()=>{
        let { children, label, tooltip,store} = this.props;
        let toolTips = store.getState().toolTips;
        let value = children.props.value||'';
        let str = '';
        if('tooltip' in this.props){
            if(tooltip){
                str = `${label}: ${tooltip}`;
                toolTips[label]=tooltip;
            }else{
                str = '';
                delete toolTips[label];
            }
        }else if(children&&children.type&&children.type.displayName=='InputNumberGroup'){//金额区间
            if(value.length>0&&((value[0])||(value[1]))){
                str = `${label[0]}: ${value[0]||''} , ${label[1]}: ${value[1]||''}`;
                toolTips[label[0]]=value[0]||''
                toolTips[label[1]]=value[1]||''
            }else{
                delete toolTips[label[0]]
                delete toolTips[label[1]]
            }
        }else if(children&&children.type&&children.type.displayName=='acRangepicker'){//日期区间
            let format = children.props.format;
            if(value.length==2){
                str = `${label}: ${value[0].format(format)} ~ ${value[1].format(format)}`;
                toolTips[label]=`${value[0].format(format)} ~ ${value[1].format(format)}`;
            }else{
                delete toolTips[label]
            }
        }else if(value){
            str = `${label}: ${value}`;
            toolTips[label]=value;
        }else{
            delete toolTips[label]
        }
        store.setState({toolTips})
        return str;
    }

    onMouseEnter=(str)=>{
        let show = this.state.show;
        if(!show){
            if(str){
                this.timer&&clearTimeout(this.timer)
                this.timer=setTimeout(()=>{
                    this.setState({
                        show:true
                    },()=>{
                        let top = this.str&&this.str.offsetHeight;
                        if(top){
                            this.setState({
                                strTop:`-${top+5}px`
                            })
                        }
                    })
                },1000)
                
            }
        }
    }

    mouseLeave = ()=>{
        this.timer&&clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
            this.setState({
                show:false
            })
        },1000)
    }

    innerMouseEnter=()=>{
        this.timer&&clearTimeout(this.timer);
    }

    inneronMouseLeave=()=>{
        this.timer&&clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
            this.setState({
                show:false
            })
        },2000)
    }

    componentWillReceiveProps(){
        let top = this.str&&this.str.offsetHeight;
        if(top&&(`-${top}px`!=this.state.strTop)){
            this.setState({
                strTop:`-${top+5}px`
            })
        }
    }

    render(){
        let { required } = this.props;
        let classes = 'ac-search-cn-formitem';
        if(required)classes+=' require';
        let str = this.getStr();
        return (
            <div className={classes} 
            onMouseEnter={()=>{this.onMouseEnter(str)}} 
            onMouseLeave={this.mouseLeave} >
                {
                    this.state.show&&str?<span className='ac-search-cn-formitem-value' 
                                    onMouseEnter={this.innerMouseEnter} 
                                    onMouseLeave={this.inneronMouseLeave} 
                                    style={{'top':this.state.strTop}}>
                                        <span className={`ac-search-cn-formitem-value-text ${this.state.strTop=='-28px'?'':'top'}`} ref={ref=>this.str = ref}>{str}</span>
                                    </span>:''
                }
                {
                    required?<span className='ac-search-cn-formitem-mast'>*</span>:''
                }
                { this.getChild() }
            </div>
        )

    }
};

FormItem.propTypes = propTypes;
FormItem.defaultProps = defaultProps;
export default connect()(FormItem);
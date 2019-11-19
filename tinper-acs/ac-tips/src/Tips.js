import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'bee-icon';

const propTypes = {
    clsfix:PropTypes.string,
    content:PropTypes.node,
    duration:PropTypes.number,
    type:PropTypes.oneOfType['success','error','warning']
};
const defaultProps = {
    clsfix:'ac-tips',
    content:'',
    type:'success',
    duration:5000
};

class Tips extends Component {
    constructor(props){
        super(props);
        this.state={
            hide:false
        }
    }
    componentDidMount(){
        let { duration, destory, type, id } = this.props;
        if(duration){
            this.timer&&clearTimeout(this.timer)
            if(type=='success'||type=='warning'){
                this.timer=setTimeout(()=>{
                    destory(id);
                },duration)
            }else{
                this.timer=setTimeout(()=>{
                    this.hide()
                },duration)
            }
        }
    }
    hide=()=>{
        this.setState({
            hide:true
        })
    }
    onMouseEnter=()=>{
        if(!this.state.hide)return;
        this.setState({
            hide:false
        })
        this.timer&&clearTimeout(this.timer);
        this.timer=setTimeout(()=>{
            this.timer=setTimeout(()=>{
                this.hide()
            },this.props.duration)
        })
    }
    render(){
        let IconTypes = {
            warning:'uf-exc-c',
            error:'uf-close-c',
            success:'uf-correct'
        } 
        let { clsfix,content,type, destory, id} = this.props;
        let { hide } = this.state;
        return (
            <div className={`${clsfix} ${type}`} onMouseEnter={this.onMouseEnter}>
                <Icon type={IconTypes[type]}/>
                {
                    hide?'':<span className={`${clsfix}-inner`}>
                            {content}
                        </span>
                }
                {
                    hide?'':<span className={`${clsfix}-close`} onClick={()=>{destory(id)}}>
                                关闭
                            </span>
                    
                }
            </div>
        )
    }
};

Tips.propTypes = propTypes;
Tips.defaultProps = defaultProps;

export default Tips;
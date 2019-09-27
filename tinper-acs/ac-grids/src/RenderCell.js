
import React, { Component } from 'react';
import ToolTip from 'bee-tooltip'

class RenderCell extends Component {
    constructor(props){
        super(props)
        this.state={
            visible:true,
            enter:false
        }
    }

    click=()=>{
        if(this.state.visible){
            setTimeout(() => {
                let input = document.querySelector('.triangle-flag .u-form-control');
                if(input)input.focus()
            }, 0);
        }
        this.setState({
            visible:!this.state.visible
        })
    }

    onMouseEnter=()=>{
        this.setState({
            enter:true
        })
    }

    onMouseLeave=()=>{
        this.setState({
            visible:true,
            enter:false
        })
    }
    renderSpan=()=>{
        if(this.state.visible){
            let textAlign = this.props.textAlign;
            let placement = 'left';
            if(textAlign)placement=textAlign=='center'?'bottom':textAlign;
            return (
                <ToolTip inverse overlay={this.props.text} placement={placement}>
                    <span className={`ac-grid-cell ${this.state.enter?'enter':''}`} 
                    onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter} 
                    onClick={this.click}>{this.props.text}</span>
                </ToolTip> 
            )
        }else{
            return React.cloneElement(this.props.children,{
                onBlur:()=>{
                    this.setState({
                        visible:true,
                        enter:false
                    })
                }
            })
        }
    }

    render() {
        return this.renderSpan();
    }
}
export default RenderCell;
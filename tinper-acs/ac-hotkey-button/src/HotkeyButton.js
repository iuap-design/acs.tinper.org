import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hotkeys from 'react-hot-keys';
import Button from 'bee-button';
import Tooltip from 'bee-tooltip';


const propTypes = {
    keyName:PropTypes.string,
    onClick:PropTypes.func,
    onKeyDown:PropTypes.func,
    onKeyUp:PropTypes.func,
    tooltip:PropTypes.node
};

const defaultProps = {
    keyName:'',
    onClick:()=>{},
    onKeyDown:()=>{},
    onKeyUp:()=>{}
};

class HotkeyButton extends Component {
    
    click=()=>{
        this.props.onClick();
        this.props.onKeyDown();
    }
    render(){
        let { keyName, onKeyUp, tooltip, ...other } = this.props
        return(
            <Hotkeys 
                keyName={this.props.keyName}
                onKeyDown={this.click}
                onKeyUp={this.props.onKeyUp}
            >
                {
                    tooltip?<Tooltip inverse overlay={tooltip} placement="bottom" className='ac-hotkey-tooltip'>
                                <Button {...other} onClick={this.click}/>
                            </Tooltip>:
                            <Button {...other} onClick={this.click}/>
                }
                
            </Hotkeys> 
        )
    }
};
HotkeyButton.propTypes = propTypes;
HotkeyButton.defaultProps = defaultProps;
export default HotkeyButton;
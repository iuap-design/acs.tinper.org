import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from 'bee-button';
import Dropdown from 'bee-dropdown';
import Icon from 'bee-icon';
import classnames  from 'classnames'

const propTypes = {
    onListIconClick:PropTypes.func,
    menuList:PropTypes.node.isRequired
};
const defaultProps = {
    onListIconClick:()=>{}
};

class SplitButton extends Component {
    constructor(props){
        super(props);
        this.state={
            show:false,
            height:'25px'
        }
    }
    componentDidMount(){
        this.setState({
            height:ReactDOM.findDOMNode(this.btn).offsetHeight
        })
    }
    onVisibleChange=(show)=>{
        console.log(show)
        this.setState({
            show
        })
    }
    getMenuElement() {
        const {  menuList } = this.props;
        return React.cloneElement(menuList, {
          onClick: this.onClick,
        });
    }
    onClick=(e)=>{
        const overlayProps = this.props.menuList.props;
        if (overlayProps.onClick) {
            overlayProps.onClick(e);
        }
        this.setState({
            show:!this.state.show
        })
    }
    render(){
        let { children,menuList,onListIconClick,colors,size='',...other } = this.props;
        
        return(
            <div className={'ac-split-button '+colors+' '+size}>
                <Button {...other} ref={btn=>this.btn=btn} colors={colors} bordered size={size} className='split-btn'>
                    {children}
                </Button>
               <Dropdown
                    trigger={['click']}
                    overlay={this.getMenuElement()}
                    animation="slide-up"
                    onVisibleChange={this.onVisibleChange}
                    onClick={onListIconClick}
                    >
                    <span className='icon-out'
                        style={{
                            'height':this.state.height
                        }}
                    >
                        <Icon 
                            type='uf-anglearrowdown' 
                            className={classnames({'show':this.state.show})}
                            
                        />
                    </span>
                    
                </Dropdown>
            </div> 
        )
    }
};

SplitButton.propTypes = propTypes;
SplitButton.defaultProps = defaultProps;
export default SplitButton;
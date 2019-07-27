import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'bee-icon'
import Button from 'bee-button'
import Dropdown from 'bee-dropdown';
import Menu from 'bee-menus';

const Item = Menu.Item;


const noop = ()=>{}

const propTypes = {
    clsfix:PropTypes.string,
    search:PropTypes.func,
    reset:PropTypes.func
};
const defaultProps = {
    clsfix:'nc-search-panel',
    search:noop,
    reset:noop
};

class NcSearchPanel extends Component {
    constructor(props){
        super(props);
        this.state={
            open:true,
            text:'简单查询'
        }
    }
    open=()=>{
        this.setState({
            open:!this.state.open
        })
    }
    onSelect=(item)=>{
        this.setState({
            text:item.item.props.children
        })
    }
    getChild=()=>{
        let { children } = this.props;
        let child = [];
        if(children.length>1){
            children.map(item=>{
                if(this.state.text=='简单查询'&&item.type.name=='Sample'){
                    child = item.props.children;
                }else if(this.state.text=='复杂查询'&&item.type.name=='Complex'){
                    child = item.props.children;
                }
            })
        }else{
            if(this.state.text=='简单查询'&&children.type.name=='Sample'){
                child = children.props.children;
            }else if(this.state.text=='复杂查询'&&children.type.name=='Complex'){
                child = children.props.children;
            }
        }
        return child;
    }
    render(){
        let { clsfix,search,reset } = this.props;
        let ctns = `${clsfix}-ctns`;
        if(!this.state.open)ctns+=' close';
        const menus = (
            <Menu
              onSelect={this.onSelect}>
              <Item key="1">简单查询</Item>
              <Item key="2">复杂查询</Item>
            </Menu>
        );

        return(
            <div className={clsfix}>
                <div className={`${clsfix}-header`} >
                    <span className={`${clsfix}-case`}>
                        <Dropdown
                            overlayClassName={`${clsfix}-case-list`}
                            trigger={['click']}
                            overlay={menus}
                            animation="slide-up">
                            <span>{this.state.text} <Icon type='uf-triangle-down'/></span>
                        </Dropdown>
                    </span>

                    <span className={`${clsfix}-selected`}>
                        高级(暂不可用)
                    </span>
                </div>
                <div className={`${clsfix}-ctns-out`}>
                    <div className={ctns}>
                        <div className={`${clsfix}-ctn`}>
                            {
                                this.getChild()
                            }
                        </div>
                        <div className={`${clsfix}-btns`}>
                            <Button colors='primary' className={`${clsfix}-btns-search`} onClick={search}>
                                <Icon type='uf-search-light-2'/>
                            </Button>
                            <Button colors='primary' bordered className={`${clsfix}-btns-reset`} onClick={reset}>
                                <Icon type='uf-clean'/>
                            </Button>
                        </div>
                    </div>
                    <div className={`${clsfix}-open`} onClick={this.open}>
                        {
                            this.state.open?<Icon type='uf-2arrow-up'/>:<Icon type='uf-2arrow-down'/>
                        }
                    </div>
                </div>
            </div>
            
        )
    }
};

NcSearchPanel.propTypes = propTypes;
NcSearchPanel.defaultProps = defaultProps;

export default NcSearchPanel;
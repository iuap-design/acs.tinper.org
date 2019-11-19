import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button  from 'bee-button';
import { Panel }  from 'bee-panel';
import classnames from 'classnames';
import Hotkeys from 'react-hot-keys';


/**
 * 部分不能通过this.props.form.resetFields()清空的组件，需要传reset方法，在reset方法中自行清空
 */
const propTypes = {
    form:PropTypes.object.isRequired,//将from组件传入
    searchOpen:PropTypes.bool,//是否默认展开更多查询条件，false默认关闭
    search: PropTypes.func,//查询的回调
    reset:PropTypes.func,//重置的回调
    resetName:PropTypes.string,//重置的文字
    searchName:PropTypes.string,//查询的文字
    btnPosition:PropTypes.oneOfType(['left', 'right','center']),//按钮位置
    searchBtnPosition:PropTypes.oneOfType(['left', 'right']),//查询按钮位置
    openName:PropTypes.string,//展开名字
    closeName:PropTypes.string,//收起名字
    showIcon:PropTypes.bool,//是否显示展开收起的图标
    clsPrefix:PropTypes.string,
    renderHeader:PropTypes.func,
    renderFooter:PropTypes.func,
};

const defaultProps = {
    searchOpen:false,
    search: () => {},
    reset: () => {},
    btnPosition:'right',
    openName:'展开',
    closeName:'收起',
    showIcon:true,
    resetName:'重置',
    searchName:'查询',
    clsPrefix:'search',
    searchHead:'查询面板',
    searchBtnPosition:'left'
};


class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchOpen:this.props.searchOpen,
            showBtn:(!this.props.searchOpen)&&(!this.props.simple)?false:true
        };
    }
    open=()=>{
        let searchOpen = this.state.searchOpen;
        let showBtn=null;
        if(this.props.simple){
            showBtn=true;
        }else{
            searchOpen?showBtn=false:showBtn=true;
        }
        this.setState({
            searchOpen: !searchOpen,
            showBtn
        });
        this.props.openHandle&&this.props.openHandle(!searchOpen)
    }
    componentWillReceiveProps(nextProps){
        let { open ,sample } = nextProps;
        let showBtn=null;
        if(this.props.simple){
            showBtn=true;
        }else{
            open?showBtn=true:showBtn=false;
        }
        if('open' in nextProps){
            this.setState({
                searchOpen: open,
                showBtn
            });
        }
    }
    search=()=>{
        let self=this;
        this.props.form.validateFields((err, values) => {
            self.props.search(err, values);
        });
    }
    reset=()=>{
        this.props.form.resetFields();
        this.props.reset();
    }
    enter=(e)=>{
        if(e.keyCode === 13){
           this.search();
        }
    }
    render() {
        const {children,className,form,resetName,searchName,clsPrefix,searchBtnProps,resetBtnProps,
            btnPosition,openName,closeName,showIcon,simple,renderHeader,searchHead,renderFooter,searchBtnPosition } = this.props;
        let classes = `${clsPrefix}-panel`;
        if(className){
            classes += ' '+className
        }
        return (
            <div className={classes} >
                <div className={`${clsPrefix}-panel-header`} onClick={this.open}>
                    {
                        renderHeader?renderHeader():(
                            <span>
                                <span className={`${clsPrefix}-header-title`}>
                                    {searchHead}
                                </span>
                                <span className={`${clsPrefix}-panel-icon`}>
                                    <span >
                                        {
                                            showIcon?( <i className={classnames({
                                                'uf': true,
                                                'uf-2arrow-up': this.state.searchOpen,
                                                'uf-2arrow-down': !this.state.searchOpen
                                            })}/>):''
                                        }
                                        {this.state.searchOpen ? closeName : openName}
                                    </span>
                                </span>
                            </span>
                        )
                    }
                </div>
                {
                    simple?(
                        <div className={`${clsPrefix}-panel-simple`}>
                            {simple}
                        </div>
                    ):''
                }
                <Panel collapsible expanded={this.state.searchOpen}>
                    { children }
                </Panel>
                <div className={`${clsPrefix}-panel-btn`} style={{'textAlign':btnPosition,'display':this.state.showBtn?'block':'none'}}>
                    {
                        searchBtnPosition=='left'?(
                            <span>
                                <Hotkeys
                                    keyName="enter"
                                    onKeyDown={this.search}
                                >
                                <Button size='sm' colors='primary' {...searchBtnProps} onClick={this.search}>
                                    {searchName}
                                </Button>
                                </Hotkeys>
                                <Hotkeys
                                    keyName="alt+c,command+c"
                                    onKeyDown={this.reset}
                                >
                                    <Button size='sm' {...resetBtnProps}  onClick={this.reset}>
                                        {resetName}
                                    </Button>
                                </Hotkeys>
                            </span>
                        ):(
                            <span>
                                <Hotkeys
                                    keyName="alt+c,command+c"
                                    onKeyDown={this.reset}
                                >
                                    <Button size='sm' {...resetBtnProps}  onClick={this.reset}>
                                        {resetName}
                                    </Button>
                                </Hotkeys>
                                <Hotkeys
                                    keyName="enter"
                                    onKeyDown={this.search}
                                >
                                <Button size='sm' colors='primary' {...searchBtnProps} onClick={this.search}>
                                    {searchName}
                                </Button>
                                </Hotkeys>
                            </span>
                        )
                    }   
                    {renderFooter?renderFooter():''}
                 </div>
            </div>
          
        )
    }
}


SearchPanel.propTypes = propTypes;
SearchPanel.defaultProps = defaultProps;
export default SearchPanel;

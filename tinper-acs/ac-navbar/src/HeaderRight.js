import React,{Component} from "react";
import Icon from 'bee-icon';

class HeaderRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxed: props.maxed || false,
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.maxed !== this.props.maxed){
            this.setState({
                maxed: nextProps.maxed
            })
        }
    }
    maxfunc(e) {
      this.props.headerRightOper.maxfunc(e);
    }
    minifunc(e) {
      this.props.headerRightOper.minifunc(e);
    }
    handleDefault(e) {
      this.props.headerRightOper.handleDefault(e);
      this.props.handleClick(e);
    }
    handleClick(e) {
      this.props.headerRightOper.handleClick(e);
    }
    render() {
      var self = this;
      let {maxed} = this.state;
        return (
            <div className="header-right">
                {!maxed ?
                  <a id="maxBox" onClick={(e)=>self.maxfunc(e)}   data-ref="taskcenter" name={"最大化"} title={"最大化"}  className="navbar-avatar" titlekey={"最大化"} >
                    <Icon type="uf-maxmize" style={{"fontSize":"18px"}}></Icon>
                  </a>:
                  <a id="maxBox" onClick={(e)=>self.minifunc(e)} data-ref="taskcenter" name={"最小化"} title={"最小化"}  className="navbar-avatar" titlekey={"最大化"} >
                    <Icon type="uf-minimize" style={{"fontSize":"18px"}}></Icon>
                  </a>
                }
                {/* <a id="taskCenterBox" value="taskcenter" onClick={(e)=>self.handleDefault(e)} data-ref="taskcenter" name={"任务中心"} title={"任务中心"} href="##" className="navbar-avatar" titlekey={"任务中心"} >
                  <Icon type="uf-pass-s-o" className="pap pap-task" style={{"fontSize":"18px"}}></Icon>
                </a>
                <a id="messageCount" value="msgCenter" onClick={(e)=>self.handleDefault(e)} data-ref="msgCenter" name={"消息中心"} title={"消息中心"} href="##" className="navbar-avatar" titlekey={"消息中心"}>
                  <Icon type="uf-bell-o" className="pap pap-massage u-badge" style={{"fontSize":"18px"}}></Icon>
                </a> */}
            </div>
        );
    }
}
export default HeaderRight;

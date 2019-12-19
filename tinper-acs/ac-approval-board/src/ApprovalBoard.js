import React, { Component } from 'react';
import PropTypes from 'prop-types';


const propTypes = {
    width: PropTypes.number, // 弹框宽度
    height: PropTypes.number, // 弹框高度
    appsource: PropTypes.string, // 业务标识
    businessKey: PropTypes.string, // 业务实例id
    callback:PropTypes.func,//回调函数
};

const defaultProps = {
    width: 850,
    height: 510,
    appsource: 'caep',
    callback:()=>{}
};


class ApprovalBoard extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() { }

    onBpmFlow = () =>{
        let {width, height, appsource, businessKey,callback} = this.props;
        let data = {
            width: width,
            height: height,
            appsource: appsource,
            businessKey: businessKey
        };
        this.flowCompIns = window.flowComp(data)
        this.flowCompIns.showFlowBox({
            onClose(data){
                callback()
            }
        })
    }

    render() {
        return (
            <span onClick={this.onBpmFlow} className={this.props.className}>{this.props.children}</span>

        )
    }
}
ApprovalBoard.propTypes = propTypes;
ApprovalBoard.defaultProps = defaultProps;
export default ApprovalBoard;

import React, { Component } from 'react';
import Button from 'bee-button';

var AcButton = class extends Component {

    static defaultProps = {
        className: '',
        onClick: {},
        colors:'default',
    }
    render() {
        let btn = 'button'
        const { className, onClick } = this.props;
        let clas = this.props["bcolors"]+"_btn";
        return (
            <Button
                {...this.props}
                className={`${btn} ${clas} ${className}`}
                onClick={(e) => { onClick(e, this) }}
            />
        );
    }
}
export {
    AcButton
};

/**
参数

type: PropTypes.string, 后续拓展，暂无
label: PropTypes.string, 显示文字
onClick:PropTypes.fun,   按钮回调事件
data:PropTypes.object   回调事件回带数据Object格式

<div style={{width:"500px",height:"600px",padding:"10px"}}>
<ButtonBrand />  品牌色
<ButtonDefault />  通用按钮
<ButtonDefaultLine /> 通用按钮带边框
<ButtonDefaultAlpha /> 通用按钮无背景
<ButtonWarning />   告警
<ButtonDanger />  危险

</div>
**/

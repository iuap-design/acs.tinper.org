/**
*
* @title 基本示例
* @description keyName定义键盘
*
*/
import React, { Component } from 'react';
import HotKeyButton from '../../src'
class Demo1 extends Component {
    render () {
            return (
                <div>
                    <HotKeyButton 
                        onClick={()=>{alert('我的点击事件被触发了')}} 
                        keyName='command+k' colors="primary"
                        tooltip="确认(command+k)"
                        >
                        确认
                    </HotKeyButton>
                </div>
            )
        }
}
export default Demo1
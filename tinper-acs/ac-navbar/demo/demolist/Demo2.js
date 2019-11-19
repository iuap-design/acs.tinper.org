/**
 *
 * @title 控制导航栏显示和隐藏
 * @description 通过`showHeader`参数控制导航栏显示和隐藏
 *
 */

import React, { Component } from 'react';
import Button from 'bee-button';
import AcNavbar from '../../src/index';

class Demo2 extends Component {
    state={
        showHeader:true 
    }
    
    handleClick = () => {
        this.setState({
            showHeader: !this.state.showHeader
        })
    }
    render () {
        let text = this.state.showHeader? '隐藏导航栏':'显示导航栏';
        return (
            <div className="demoPadding">
                <Button colors="primary" onClick={this.handleClick} style={{margin:'8px'}}>{text}</Button>
                <AcNavbar showHeader={this.state.showHeader}/>
            </div>
        )
    }
}

export default Demo2;

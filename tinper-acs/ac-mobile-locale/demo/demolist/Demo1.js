/**
 *
 * @title ac-mobile-locale 手机号多语控件
 * @description 使用默认参数
 *
 */

import React, { Component } from 'react';
import AcMobileLocale from '../../src/index';
class Demo1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      account: {}
    }
    this.mobileChangeHandle = this.mobileChangeHandle.bind(this)
  }
  mobileChangeHandle(mobile, account){
    console.log(mobile, account)
  }
  render () {
      return (
          <div className="demoPadding">
            <AcMobileLocale 
              mobileChangeHandle = {this.mobileChangeHandle}
            />
          </div>
      )
  }
}

export default Demo1;

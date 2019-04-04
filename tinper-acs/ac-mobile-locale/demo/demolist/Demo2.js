/**
 *
 * @title ac-mobile-locale手机号多语控件
 * @description 传入语种列表、默认手机号
 *
 */

import React, { Component } from 'react';
import AcMobileLocale from '../../src/index';
import Form from 'bee-form';
import Button from 'bee-button'
class Demo1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {},
      accountInfo: [

      ],
      selectContryPhoneCode: {

      },
      mobile: ''
    }
    this.mobileChangeHandle = this.mobileChangeHandle.bind(this)
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        accountInfo: [
          {
            country_code: '+86',
            country: '中国'
          },
          {
            country_code: '+886',
            country: '中国台湾'
          }
        ],
        selectContryPhoneCode: {
          country_code: '+886',
          country: '中国台湾'
        },
        mobile: '138012312312'
      })
    },1000)
  }
  mobileChangeHandle(mobile, account){
    console.log(mobile, account)
  }
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (err) {
            console.log('校验失败', values);
        } else {
            console.log('提交成功', values)
        }
    });
  }
  render () {
    const { mobile, accountInfo, selectContryPhoneCode } = this.state
      return (
          <div className="demoPadding">
            <AcMobileLocale 
              mobileChangeHandle={this.mobileChangeHandle}
              mobile={mobile}
              accountInfo={accountInfo}
              selectContryPhoneCode={selectContryPhoneCode}
              countryCodeId="globalCode"
              form={this.props.form}
            />
            <Button onClick={this.submit} style={{marginTop: '10px'}} colors={'success'}>提交</Button>
          </div>
      )
  }
}

export default Form.createForm()(Demo1);

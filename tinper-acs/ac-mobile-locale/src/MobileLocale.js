
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'tinper-bee';

const propTypes = {
  className: PropTypes.string,
  accountInfo: PropTypes.array,
  selectContryPhoneCode: PropTypes.object,
  mobile: PropTypes.string,
  mobileChangeHandle: PropTypes.func,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  inputId: PropTypes.string,
  countryCodeId: PropTypes.string,
  ifShowError: PropTypes.string,
}
const defaultProps = {
  className: '',
  accountInfo: [
    {
      country_code: '+86',
      country: '中国'
    },
    {
      country_code: '+852',
      country: '中国香港'
    },
    {
      country_code: '+853',
      country: '中国澳门'
    },
    {
      country_code: '+886',
      country: '中国台湾'
    },
    {
      country_code: '+65',
      country: '新加坡'
    },
    {
      country_code: '+60',
      country: '马来西亚'
    },
    {
      country_code: '+62',
      country: '印度尼西亚'
    },
    {
      country_code: '+66',
      country: '泰国'
    },
    {
      country_code: '+63',
      country: '菲律宾'
    },
    {
      country_code: '+84',
      country: '越南'
    },
    {
      country_code: '+95',
      country: '缅甸'
    },
    {
      country_code: '+61',
      country: '澳大利亚'
    },
  ],
  selectContryPhoneCode: {
    country_code: '+86',
    country: '中国'
  },
  placeholder: '请输入您的手机号',
  mobile: '',
  errorMessage: '手机号不能为空',
  inputId: 'mobile',
  countryCodeId: 'countryCode',
  ifShowError: true
}

class MobileLocale extends Component {
  constructor(props) {
    super(props);
    const { accountInfo, selectContryPhoneCode, mobile, className, errorMessage } = props
    this.state = {
      ifShowList: false,
      mobile,
      accountInfo,
      selectContryPhoneCode,
      className,
      errorMessage
    }
    this.mouseOverHandle = this.mouseOverHandle.bind(this)
    this.mouseLeaveHandle = this.mouseLeaveHandle.bind(this)
    this.itemClickHandle = this.itemClickHandle.bind(this)
  }

  mouseOverHandle() {
    this.setState({
      ifShowList: true
    })
  }

  mouseLeaveHandle(){
    this.setState({
      ifShowList: false
    })
  }

  componentWillReceiveProps(nextProps) {
    const { accountInfo, selectContryPhoneCode, mobile } = nextProps
    if (mobile !== this.props.mobile || accountInfo !== this.props.accountInfo || selectContryPhoneCode !== this.props.selectContryPhoneCode) {
      this.setState({
        mobile,
        accountInfo,
        selectContryPhoneCode
      })
    }
  }

  itemClickHandle(account){
    this.setState({
      selectContryPhoneCode: account,
      ifShowList: false
    })
    const { mobile } = this.state
    this.props.mobileChangeHandle && this.props.mobileChangeHandle(mobile, account)
  }

  mobileChangeHandle(e){
    this.setState({
      mobile: e.target.value
    })
    const { selectContryPhoneCode } = this.state
    this.props.mobileChangeHandle && this.props.mobileChangeHandle(e.target.value, selectContryPhoneCode)
  }

  render() {
    const { ifShowList, accountInfo, selectContryPhoneCode, mobile, className, placeholder, errorMessage } = this.state
    const { form, ifShowError,disabled } = this.props
    let getFieldProps, getFieldError
    if (form) {
      getFieldProps = form.getFieldProps
      getFieldError = form.getFieldError
    }
    let locationCls = disabled?"mobile-box disabled":"mobile-box"
    return (
      <div className={`login-account-locale ${className}`}>
        <div className={locationCls}>
          <div className="location" onMouseOver={disabled?()=>{}:this.mouseOverHandle} onMouseLeave={disabled?()=>{}:this.mouseLeaveHandle}>
            <span className="current-country">
              {selectContryPhoneCode.country}
            </span>
            <div className="arrow-bottom arrow-box">
              <b className="bottom">
                <i className="bottom-arrow1"></i>
                <i className="bottom-arrow2"></i>
              </b>
            </div>
            {
              ifShowList ? (
                <ul className="locaton-list" >
                  {
                    accountInfo.map((account) => <li key={account.country_code} onClick={() => this.itemClickHandle(account)}>{account.country}({account.country_code})</li>)
                  }
                </ul>
              ) : null
            }
          </div>
          <div className="mobile">
            <span className="country-code">
              {
                form ? (
                  <FormControl
                    className="country-code-input"
                    readOnly
                    {...getFieldProps(this.props.countryCodeId, {
                      validateTrigger: 'onChange',
                      initialValue: selectContryPhoneCode.country_code || '',
                      getValueProps: (value) =>{
                        return {
                          value: selectContryPhoneCode.country_code || ''
                        }
                      },
                    }) }
                  />
                ) : selectContryPhoneCode.country_code
              }

            </span>
            {
              form ? (
                <div className="position-relative">
                  <FormControl
                    disabled={disabled}
                    placeholder={placeholder}
                    {...getFieldProps(this.props.inputId, {
                      validateTrigger: 'onBlur',
                      initialValue: mobile,
                      value: mobile,
                      rules: [{
                        required: true, message: errorMessage,
                      }],
                      onChange:(v)=> {
                        if (!/^[0-9]*$/.test(v)) {
                          this.setState({
                            mobile
                          })
                          return
                        }
                        this.setState({
                          mobile: v
                        })
                        const { selectContryPhoneCode } = this.state
                        this.props.mobileChangeHandle && this.props.mobileChangeHandle(v, selectContryPhoneCode)
                      }
                    }) }
                  />
                  {
                    ifShowError ? (
                      <span className='error'>
                        {getFieldError(this.props.inputId)}
                      </span>
                    ) : null
                  }
                </div>
              ) : (
                <input
                  disabled={disabled}
                  type="text"
                  name="mobile"
                  className="u-form-control login-input"
                  placeholder={placeholder}
                  autoComplete="off"
                  onChange={(e) => this.mobileChangeHandle(e)}
                  value={mobile}
                />
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

MobileLocale.propTypes = propTypes;
MobileLocale.defaultProps = defaultProps;
export default MobileLocale

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 



var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var DemoArray = [{"example":<Demo1 />,"title":" ac-mobile-locale 手机号多语控件","code":"/**\n *\n * @title ac-mobile-locale 手机号多语控件\n * @description 使用默认参数\n *\n */\n\nimport React, { Component } from 'react';\nimport AcMobileLocale from \"ac-input-locale\";\nclass Demo1 extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      mobile: '',\n      account: {}\n    }\n    this.mobileChangeHandle = this.mobileChangeHandle.bind(this)\n  }\n  mobileChangeHandle(mobile, account){\n    console.log(mobile, account)\n  }\n  render () {\n      return (\n          <div className=\"demoPadding\">\n            <AcMobileLocale \n              mobileChangeHandle = {this.mobileChangeHandle}\n            />\n          </div>\n      )\n  }\n}\n\n\n","desc":" 使用默认参数"},{"example":<Demo2 />,"title":" ac-mobile-locale手机号多语控件","code":"/**\n *\n * @title ac-mobile-locale手机号多语控件\n * @description 传入语种列表、默认手机号\n *\n */\n\nimport React, { Component } from 'react';\nimport AcMobileLocale from \"tinper-bee/lib/AcMobileLocale\";\nimport { Button, Form } from 'tinper-bee';\nclass Demo1 extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      account: {},\n      accountInfo: [\n\n      ],\n      selectContryPhoneCode: {\n\n      },\n      mobile: ''\n    }\n    this.mobileChangeHandle = this.mobileChangeHandle.bind(this)\n  }\n  componentDidMount() {\n    setTimeout(() => {\n      this.setState({\n        accountInfo: [\n          {\n            country_code: '+86',\n            country: '中国'\n          },\n          {\n            country_code: '+886',\n            country: '中国台湾'\n          }\n        ],\n        selectContryPhoneCode: {\n          country_code: '+886',\n          country: '中国台湾'\n        },\n        mobile: '138012312312'\n      })\n    },1000)\n  }\n  mobileChangeHandle(mobile, account){\n    console.log(mobile, account)\n  }\n  submit = (e) => {\n    e.preventDefault();\n    this.props.form.validateFields((err, values) => {\n        if (err) {\n            console.log('校验失败', values);\n        } else {\n            console.log('提交成功', values)\n        }\n    });\n  }\n  render () {\n    const { mobile, accountInfo, selectContryPhoneCode } = this.state\n      return (\n          <div className=\"demoPadding\">\n            <AcMobileLocale \n              mobileChangeHandle={this.mobileChangeHandle}\n              mobile={mobile}\n              accountInfo={accountInfo}\n              selectContryPhoneCode={selectContryPhoneCode}\n              countryCodeId=\"globalCode\"\n              form={this.props.form}\n            />\n            <Button onClick={this.submit} style={{marginTop: '10px'}} colors={'success'}>提交</Button>\n          </div>\n      )\n  }\n}\n\n\n","desc":" 传入语种列表、默认手机号"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    handleClick=()=> {
        this.setState({ open: !this.state.open })
    }
    fCloseDrawer=()=>{
        this.setState({
            open: false
        })
    }

    render () {
        const { title, example, code, desc, scss_code  } = this.props;

        const header = (
            <div>
                <p className='component-title'>{ title }</p>
                <p>{ desc }</p>
                <span className='component-code' onClick={this.handleClick}> 查看源码 <i className='uf uf-arrow-right'/> </span>
            </div>
        );
        return (
            <Col md={12} id={title.trim()} className='component-demo'>
            <Panel header={header}>
                {example}
            </Panel>
           
            <Drawer className='component-drawerc' title={title} show={this.state.open} placement='right' onClose={this.fCloseDrawer}>
            <div className='component-code-copy'> JS代码 
                <Clipboard action="copy" text={code}/>
            </div>
            <pre className="pre-js">
                <code className="hljs javascript">{ code }</code>
            </pre >
            {!!scss_code ?<div className='component-code-copy copy-css'> SCSS代码 
                <Clipboard action="copy" text={scss_code}/>
            </div>:null }
                { !!scss_code ? <pre className="pre-css">
                 <code className="hljs css">{ scss_code }</code>
                 </pre> : null }
            </Drawer>
        </Col>
    )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <Row>
            {DemoArray.map((child,index) => {

                return (
            <Demo example= {child.example} title= {child.title} code= {child.code} scss_code= {child.scss_code} desc= {child.desc} key= {index}/>
    )

    })}
    </Row>
    )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
